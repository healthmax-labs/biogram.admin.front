import { useRecoilState } from 'recoil'
import { EapListState } from '@Recoil/InstPagesState'
import ManageBox from './EspListManageBox'
import SearchBox from './EspListSearchBox'
import ListTable from './EspListTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import React, { useCallback, useEffect } from 'react'
import { getInstEapInfoList } from '@Service/InstService'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const EapListMain = () => {
    const [listState, setListState] = useRecoilState(EapListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { status, payload } = await getInstEapInfoList()
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
                list: {
                    EAP_INFO_LIST: [],
                },
            }))
        }
    }, [setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status === 'idle') {
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

export default EapListMain
