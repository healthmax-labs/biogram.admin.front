import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import HealthIndicatorsTable from './HealthIndicatorsTable'
import { useRecoilState } from 'recoil'
import { getImprvmCountAnalyticsList } from '@Service/AnalyticsService'
import { ImprvmListState } from '@Recoil/AnalyticsPagesState'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { RecoilStateKeyNameType } from '@CommonTypes'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(ImprvmListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = listState

        const { status, payload } = await getImprvmCountAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
        })

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload.MYBODY_SCORE_IMPRVM_STAT_LIST.map(list => {
                    return {
                        ...list,
                        AGES_GROUP: String(list.AGES_GROUP),
                    }
                }),
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: [],
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
                    SearchType={'healthIndicators'}
                    HandleGetList={() => getTableList()}
                    InstSelectElement={{
                        instNo: listState.search.INST_NO
                            ? Number(listState.search.INST_NO)
                            : null,
                        instNm: listState.search.instNm
                            ? listState.search.instNm
                            : null,
                    }}
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
                    StartDate={listState.search.BGNDE}
                    HandleStartDate={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    EndDate={listState.search.ENDDE}
                    HandleEndDate={e => {
                        setListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                />
            </SearchWapper>
            <TableWapper>
                <HealthIndicatorsTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
