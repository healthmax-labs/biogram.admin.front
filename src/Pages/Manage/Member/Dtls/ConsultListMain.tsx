import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { getMberCnsltlist } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import ConsultSearchBox from './ConsultSearchBox'
import ConsultManageBox from './ConsultManageBox'
import ConsultListTable from './ConsultListTable'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ConsultListMain = () => {
    const [listState, setListState] = useRecoilState(ConsultListState)
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)

    const handleGetList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { curPage, searchKey, instNo, riskFctr, endDt, startDt },
        } = listState

        const { status, payload } = await getMberCnsltlist({
            curPage: curPage,
            instNo: instNo,
            searchKey: searchKey,
            riskFctr: riskFctr,
            startDt: startDt,
            endDt: endDt,
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
    }, [setListState, listState])

    // 다시 가지고 오거나 가지고 오는 버튼 클릭 처리.
    const handleGetListButton = () => {
        setListState(prevState => ({
            ...prevState,
            status: 'idle',
            search: {
                ...prevState.search,
                curPage: 1,
            },
        }))

        handleGetList().then()
    }

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') handleGetList().then()
        }

        pageStart()
    }, [handleGetList, listState.status])

    useEffect(() => {
        /**
         * 현제 활성화 되어 있는 텝을 닫았을때 MainTabComponent 에서 recoil을 리셋 했을경우
         * pageStart 함수에서 idle 로 인식해서 api를 다시 콜하는 버그를 해결하기 위해
         * 현재 텝에서 리셋해야 하는경우를 구분을 해서 현재 component가 사라질때 recoil을 리셋해준다.
         */
        return () => {
            if (tabState.close.recoilResetWhere === 'mainComponent') {
                recoilReset(tabState.close.recoilKey as RecoilStateKeyNameType)

                setTabState(prevState => ({
                    ...prevState,
                    close: {
                        closeIndex: null,
                        recoilKey: null,
                        recoilResetWhere: null,
                    },
                }))
            }
        }

        // FIXME : 종속성에서 recoilReset, setTabState, tabState.close.recoilKey, tabState.close.recoilResetWhere 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabState.close])

    return (
        <Container>
            <SearchWapper>
                <ConsultSearchBox HandleGetList={() => handleGetListButton()} />
            </SearchWapper>
            <ManageWapper>
                <ConsultManageBox />
            </ManageWapper>
            <TableWapper>
                <ConsultListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default ConsultListMain
