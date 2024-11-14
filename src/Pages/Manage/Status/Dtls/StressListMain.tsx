import React, { useCallback, useEffect } from 'react'
import StressListSearchBox from './StressListSearchBox'
import StressListTable from './StressListTable'
import StressListManageBox from './StressListManageBox'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { postStressList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { StressListState } from '@Recoil/StatusPagesState'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const StressListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(StressListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            END_DE,
            INST_NO,
            SEARCH_KEY,
            INQUIRY_ITEMS,
            BEGIN_DE,
            curPage,
            CONDITIONS,
        } = listState.search

        const { status, payload } = await postStressList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
            INQUIRY_ITEMS: INQUIRY_ITEMS,
            CONDITIONS: CONDITIONS,
            SEARCH_KEY: SEARCH_KEY,
        })

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: {
                    TOTAL_COUNT: payload.TOTAL_COUNT,
                    STRESS_STATE_LIST: payload.STRESS_STATE_LIST,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    STRESS_STATE_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [listState.search, setListState])

    useEffect(() => {
        const startPage = () => {
            if (listState.status == 'idle') {
                getTableList().then()
            }
        }

        startPage()
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
                <StressListSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <StressListManageBox />
            </ManageWapper>
            <TableWapper>
                <StressListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default StressListMain
