import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import MemberListSearchBox from './MemberListSearchBox'
import MemberListManageBox from './MemberListManageBox'
import MemberListTable from './MemberListTable'
import { getMemberList } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import queryString from 'query-string'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const MemberListMain = () => {
    const navigate = useNavigate()
    const [listState, setListState] = useRecoilState(MemberListState)
    const locationState = useLocation()

    const getList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { searchKey, registDtFrom, registDtTo, instNo, curPage },
        } = listState

        const { status, payload } = await getMemberList({
            curPage: curPage,
            instNo: instNo,
            searchKey: searchKey,
            registDtFrom: registDtFrom,
            registDtTo: registDtTo,
        })

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
                    MBER_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [listState, setListState])

    // 다시 가지고 오거나 가지고 오는 버튼 클릭 처리.
    const handleGetListButton = () => {
        const pageParams = JSON.stringify({
            ...listState.search,
            curPage: 1,
        })

        navigate({
            pathname: process.env.PUBLIC_URL + `/manage/member/member-list`,
            search: `?params=${pageParams}`,
        })
    }

    useEffect(() => {
        const funcParamCheck = () => {
            const { params } = queryString.parse(locationState.search)

            if (params) {
                const parseParams: {
                    curPage: number
                    instNo: string
                    searchKey: string
                    registDtFrom: string
                    registDtTo: string
                } = JSON.parse(params as string)

                setListState(prevState => ({
                    ...prevState,
                    status: 'ready',
                    search: {
                        ...prevState.search,
                        curPage: parseParams.curPage,
                        instNo: parseParams.instNo,
                        searchKey: parseParams.searchKey,
                        registDtFrom: parseParams.registDtFrom,
                        registDtTo: parseParams.registDtTo,
                    },
                }))
            } else {
                if (listState.status === 'idle') getList().then()
            }
        }

        funcParamCheck()

        // FIXME : 종속성에서 getList, listState.status, setListState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState.search])

    useEffect(() => {
        if (listState.status === 'ready') {
            getList().then()
        }
    }, [getList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <MemberListSearchBox
                    HandleGetList={() => handleGetListButton()}
                />
            </SearchWapper>
            <ManageWapper>
                <MemberListManageBox
                    HandleGetList={() => handleGetListButton()}
                />
            </ManageWapper>
            <TableWapper>
                <MemberListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default MemberListMain
