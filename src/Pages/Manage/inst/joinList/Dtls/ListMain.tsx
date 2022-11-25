import React, { useEffect, useState } from 'react'
import { MainStyle, SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'
import { getInstJoinList } from '@Service/InstService'
import { InstJoinListItemInterface } from '@Type/InstTypes'
import { tableListItemInterface } from './TableConfig'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const { Container } = SearchBoxStyle

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
        const response = await getInstJoinList({
            CUR_PAGE: 1,
            INST_NO: 1254,
        })

        const listData: InstJoinListItemInterface[] =
            response.payload.PSTINST_REQUEST_INFO_LIST

        setPageState(prevState => ({
            ...prevState,
            loading: false,
            memberList: listData.map(_ => {
                return {
                    MBER_NO: _.MBER_NO,
                    NM: _.NM,
                    BRTHDY: _.BRTHDY,
                    SEXDSTN: _.SEXDSTN,
                    MBTLNUM: _.MBTLNUM,
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
