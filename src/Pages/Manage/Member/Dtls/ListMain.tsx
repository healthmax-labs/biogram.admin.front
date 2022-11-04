import React, { useEffect, useState } from 'react'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'
import { getList } from '@Service/InstdeptService'
import { InstdeptListInterface } from '@CommonTypes'
import { tableListInterface } from './TableConfig'

const { Container, SearchWapper, TableWapper, ManageWapper } = MainStyle

export default function ListMain() {
    const [memberList, setMemberList] = useState<tableListInterface[]>([])

    const getTableList = async () => {
        const response = await getList({
            CUR_PAGE: 1,
            INST_NO: 0,
            ITEM_COUNT: 200,
            SEARCH_KEY: '',
        })

        const listData: InstdeptListInterface[] = response.payload.INSTDEPT_LIST

        setMemberList(
            listData.map(_ => {
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
            })
        )
    }

    useEffect(() => {
        const pageStart = async () => {
            getTableList().then()
        }

        pageStart().then()
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
                <ListTable MemberList={memberList} />
            </TableWapper>
        </Container>
    )
}
