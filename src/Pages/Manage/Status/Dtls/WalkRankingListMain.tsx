import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import WalkRankingSearchBox from './WalkRankingSearchBox'
import WalkRankingTable from './WalkRankingListTable'
import { useRecoilState } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'
import { getWalkRankingList } from '@Service/StatusService'
import { isNull } from 'lodash'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { RecoilStateKeyNameType } from '@CommonTypes'
import ManageBox from './WalkRankingManageBox'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const WalkRankingListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(WalkRankingListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { MESURE_MT, INST_NO, curPage },
        } = listState

        const { status, payload } = await getWalkRankingList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            MESURE_MT: !isNull(MESURE_MT) ? MESURE_MT.substring(0, 6) : ``,
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
                    STEP_RANK_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [listState, setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, listState.status])

    useEffect(() => {
        /**
         * 현재 활성화 되어 있는 텝을 닫았을때 MainTabComponent 에서 recoil을 리셋 했을경우
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

        // FIXME : 종속성에서 recoilReset, setTabState, tabState.close.recoilKey, tabState.close.recoilResetWhere 업데이트 되면
        // 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabState.close])

    return (
        <Container>
            <SearchWapper>
                <WalkRankingSearchBox />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <WalkRankingTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default WalkRankingListMain
