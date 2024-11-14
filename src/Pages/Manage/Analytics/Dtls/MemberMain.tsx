import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MemberTable from './MemberTable'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MemberListState } from '@Recoil/AnalyticsPagesState'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { RecoilStateKeyNameType } from '@CommonTypes'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MemberMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(MemberListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { BGNDE, ENDDE, INST_NO, AGEGROUP, CYCLE },
        } = listState

        const { status, payload } = await getMemberAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            const { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST } = payload

            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: {
                    AGE_GROUP_STAT_LIST: AGE_GROUP_STAT_LIST.map(ageGroup => {
                        return {
                            ...ageGroup,
                            AGES_GROUP: String(ageGroup.AGES_GROUP),
                        }
                    }),
                    PERIOD_STAT_LIST: PERIOD_STAT_LIST,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
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
                <AnalyticsSearchBox
                    SearchType={'default'}
                    InstSelectElement={{
                        instNo: listState.search.INST_NO
                            ? Number(listState.search.INST_NO)
                            : null,
                        instNm: listState.search.instNm
                            ? listState.search.instNm
                            : null,
                    }}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={(instNo, instNm) => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: instNo ? String(instNo) : ``,
                                instNm: instNm ? instNm : ``,
                            },
                        }))
                    }}
                    HandleStartDate={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    StartDate={listState.search.BGNDE}
                    HandleEndDate={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    EndDate={listState.search.ENDDE}
                    AgeGroup={listState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={listState.search.CYCLE}
                    HandleCycle={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                CYCLE: e,
                            },
                        }))
                    }}
                />
            </SearchWapper>
            <TableWapper>
                <MemberTable />
            </TableWapper>
        </Container>
    )
}

export default MemberMain
