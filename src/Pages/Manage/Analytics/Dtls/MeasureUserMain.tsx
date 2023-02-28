import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MeasureUserTable from './MeasureUserTable'
import { useRecoilState } from 'recoil'
import { getMesureAnalyticsList } from '@Service/AnalyticsService'
import { MesureListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MeasureUserMain = () => {
    const [mesureListState, setMesureListState] =
        useRecoilState(MesureListState)

    const getTableList = useCallback(async () => {
        setMesureListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { INST_NO, BGNDE, ENDDE, AGEGROUP, CYCLE },
        } = mesureListState

        const { status, payload } = await getMesureAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            const { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST } = payload
            setMesureListState(prevState => ({
                ...prevState,
                status: 'success',
                list: {
                    AGE_GROUP_STAT_LIST: AGE_GROUP_STAT_LIST.map(ageGroup => {
                        return {
                            ...ageGroup,
                            AGE_GROUP: String(ageGroup.AGE_GROUP),
                        }
                    }),
                    PERIOD_STAT_LIST: PERIOD_STAT_LIST,
                },
            }))
        } else {
            setMesureListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
                },
            }))
        }
    }, [mesureListState, setMesureListState])

    useEffect(() => {
        const pageStart = () => {
            if (mesureListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, mesureListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'default'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={instNo => {
                        setMesureListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                            },
                        }))
                    }}
                    StartDate={mesureListState.search.BGNDE}
                    HandleStartDate={e => {
                        setMesureListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    EndDate={mesureListState.search.ENDDE}
                    HandleEndDate={e => {
                        setMesureListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    AgeGroup={mesureListState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setMesureListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={mesureListState.search.CYCLE}
                    HandleCycle={e => {
                        setMesureListState(prevState => ({
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
                <MeasureUserTable />
            </TableWapper>
        </Container>
    )
}

export default MeasureUserMain
