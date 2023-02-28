import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MemberTable from './MemberTable'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MemberListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MemberMain = () => {
    const [memberListState, setMemberListState] =
        useRecoilState(MemberListState)

    const getTableList = useCallback(async () => {
        setMemberListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { BGNDE, ENDDE, INST_NO, AGEGROUP, CYCLE },
        } = memberListState

        const { status, payload } = await getMemberAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            const { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST } = payload

            setMemberListState(prevState => ({
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
            setMemberListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
                },
            }))
        }
    }, [memberListState, setMemberListState])

    useEffect(() => {
        const pageStart = () => {
            if (memberListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, memberListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'default'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={instNo => {
                        setMemberListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                            },
                        }))
                    }}
                    HandleStartDate={e => {
                        setMemberListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    StartDate={memberListState.search.BGNDE}
                    HandleEndDate={e => {
                        setMemberListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    EndDate={memberListState.search.ENDDE}
                    AgeGroup={memberListState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setMemberListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={memberListState.search.CYCLE}
                    HandleCycle={e => {
                        setMemberListState(prevState => ({
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
