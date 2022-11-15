import React, { useEffect, useState } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'
import { getList } from '@Service/InstdeptService'
import { InstdeptListInterface } from '@CommonTypes'
import { tableListItemInterface } from './TableConfig'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const initializeState = {
    loading: true,
    memberList: [],
}

const ListMain = () => {
    const [pageState, setPageState] = useState<{
        loading: boolean
        memberList: tableListItemInterface[]
    }>(initializeState)

    const getTableList = async () => {
        const response = await getList({
            CUR_PAGE: 1,
            INST_NO: 0,
            ITEM_COUNT: 200,
            SEARCH_KEY: '',
        })

        const listData: InstdeptListInterface[] = response.payload.INSTDEPT_LIST

        setPageState(prevState => ({
            ...prevState,
            loading: false,
            memberList: listData.map(_ => {
                return {
                    MBER_NO: _.MBER_NO,
                    MEBER_NM: _.MEBER_NM,
                    MBTLNUM: _.MBTLNUM,
                    BRTHDY: _.BRTHDY,
                    SEXDSTN: _.SEXDSTN,
                    INST_NM: _.INST_NM,
                    DEPT_NM: _.DEPT_NM,
                    CONFM_DE: _.CONFM_DE,
                    STAT: _.STAT,
                }
            }),
        }))
    }

    useEffect(() => {
        const pageStart = () => {
            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))
            getTableList().then()
        }

        pageStart()
    }, [])
    return (
        <Container>
            <SearchWapper>
                <SearchBox />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable
                    MemberList={pageState.memberList}
                    Loading={pageState.loading}
                />
            </TableWapper>
        </Container>
    )
}

export default ListMain
