import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/Contents/Dtls/UhealthzoneListSearchBox'
import ManageBox from '@Page/Manage/Contents/Dtls/UhealthzoneListManageBox'
import ListTable from '@Page/Manage/Contents/Dtls/UhealthzoneListTable'
import { getUhealthzoneList } from '@Service/ContentsService'
import { useRecoilState } from 'recoil'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'
import { has, isNull } from 'lodash'
import { useLocation } from 'react-router'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const UhealthzoneListMain = () => {
    const [uhealthzoneListState, setUhealthzoneListState] =
        useRecoilState(UhealthzoneListState)

    const location = useLocation()

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
        }
    }, [uhealthzoneListState, setUhealthzoneListState])

    useEffect(() => {
        const pageStart = () => {
            if (uhealthzoneListState.status === 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, uhealthzoneListState.status])

    // 다시 가지고 오기.
    useEffect(() => {
        const funcCheckLocationState = () => {
            if (location.state && has(location.state, 'renew')) {
                if (location.state.renew) {
                    getTableList().then()
                }
            }
        }

        if (location.state) {
            funcCheckLocationState()
        }
        // FIXME : 종속성에서 getTableList 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state])

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

export default UhealthzoneListMain
