import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import ListTable from './StplatListTable'
import { getStplatList } from '@Service/ManagerService'
import { useRecoilState } from 'recoil'
import { StplatListState } from '@Recoil/ManagerPagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { TableWapper } = MainStyle

const StplatListMain = () => {
    const [stplatListState, setStplatListState] =
        useRecoilState(StplatListState)

    const getTableList = useCallback(async () => {
        const {
            search: { CUR_PAGE },
        } = stplatListState

        const { status, payload } = await getStplatList({
            CUR_PAGE: !isNull(CUR_PAGE) ? CUR_PAGE : 1,
        })

        if (status) {
            setStplatListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setStplatListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [stplatListState, setStplatListState])

    useEffect(() => {
        const pageStart = () => {
            if (stplatListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, stplatListState.status])
    return (
        <Container>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default StplatListMain
