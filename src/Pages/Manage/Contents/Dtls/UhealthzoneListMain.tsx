import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/Contents/Dtls/UhealthzoneListSearchBox'
import ManageBox from '@Page/Manage/Contents/Dtls/UhealthzoneListManageBox'
import ListTable from '@Page/Manage/Contents/Dtls/UhealthzoneListTable'
import { getUhealthzoneList } from '@Service/ContentsService'
import { useRecoilState } from 'recoil'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'
import { isNull } from 'lodash'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InitListMain = () => {
    const [uhealthzoneListState, setUhealthzoneListState] =
        useRecoilState(UhealthzoneListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        setUhealthzoneListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { CUR_PAGE, search_Key },
        } = uhealthzoneListState

        const { status, payload } = await getUhealthzoneList({
            CUR_PAGE: !isNull(CUR_PAGE) ? String(CUR_PAGE) : '0',
            SEARCH_KEY: !isNull(search_Key) ? String(search_Key) : '',
        })

        if (status) {
            setUhealthzoneListState(prevState => ({
                ...prevState,
                status: 'success',
                uhealthzoneList: {
                    UHEALTH_ZONE_LIST: payload.UHEALTH_ZONE_LIST,
                },
            }))
        } else {
            setUhealthzoneListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            // handlMainAlert({
            //     state: true,
            //     message: Messages.Default.processFail,
            // })
        }
    }, [handlMainAlert, uhealthzoneListState, setUhealthzoneListState])

    useEffect(() => {
        const pageStart = () => {
            if (uhealthzoneListState.status === 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, uhealthzoneListState.status])

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

export default InitListMain
