import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/inst/Dtls/InstListSearchBox'
import ManageBox from '@Page/Manage/inst/Dtls/InstListManageBox'
import ListTable from '@Page/Manage/inst/Dtls/InstListTable'
import { getInstList } from '@Service/InstService'
import { useRecoilState } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InstListMain = () => {
    const [listState, setListState] = useRecoilState(InstListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const { status, payload } = await getInstList()

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.stplatSuccess,
            })
        }
    }, [handlMainAlert, setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status !== 'success') {
                getTableList().then()
            }
        }
        pageStart()
    }, [getTableList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default InstListMain
