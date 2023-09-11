import AnalyticsSearchBox from './AnalyticsSearchBox'
import StressTable from './StressTable'
import React, { useCallback, useEffect } from 'react'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilState } from 'recoil'
import { StressState } from '@Recoil/AnalyticsPagesState'
import { postStress } from '@Service/AnalyticsService'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const StressMain = () => {
    const [listState, setListState] = useRecoilState(StressState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { BGNDE, ENDDE, INST_NO, AGEGROUP, CYCLE },
        } = listState

        const { status, payload } = await postStress({
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
                    AGE_GROUP_STAT_LIST: AGE_GROUP_STAT_LIST,
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
                                INST_NO: String(instNo),
                                instNm: instNm,
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
                <StressTable />
            </TableWapper>
        </Container>
    )
}

export default StressMain
