import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from '@Page/Manage/Contents/Dtls/LoungeListSearchBox'
import ManageBox from '@Page/Manage/Contents/Dtls/LoungeListManageBox'
import ListTable from '@Page/Manage/Contents/Dtls/LoungeListTable'
import { getLoungeList } from '@Service/ContentsService'
import { useRecoilState } from 'recoil'
import { LoungeListState } from '@Recoil/ContentsPagesState'
import { has } from 'lodash'
import { useLocation } from 'react-router'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const LoungeListMain = () => {
    const [loungeListState, setLoungeListState] =
        useRecoilState(LoungeListState)

    const location = useLocation()

    const getTableList = useCallback(async () => {
        setLoungeListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { page, size, sortType },
        } = loungeListState

        const { status, payload } = await getLoungeList({
            page,
            size,
            sortType,
        })

        if (status) {
            setLoungeListState(prevState => ({
                ...prevState,
                status: 'success',
                loungeList: {
                    MIND_LOUNGE_LIST: payload.responseData.content,
                    TOTAL_COUNT: payload.responseData.totalElements,
                },
                search: {
                    ...prevState.search,
                },
            }))
        } else {
            setLoungeListState(prevState => ({
                ...prevState,
                status: 'failure',
                loungeList: {
                    MIND_LOUNGE_LIST: [],
                    TOTAL_COUNT: 0,
                },
                search: {
                    ...prevState.search,
                    cursorRegistDt: '',
                    cursorLikeCount: 0,
                    cursorPostId: 0,
                },
            }))
        }
    }, [loungeListState, setLoungeListState])

    useEffect(() => {
        const pageStart = () => {
            if (loungeListState.status === 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, loungeListState.status])

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
                <ListTable CurrentPage={loungeListState.search.page} />
            </TableWapper>
        </Container>
    )
}

export default LoungeListMain
