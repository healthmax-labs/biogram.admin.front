import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import DeviceUseTable from './DeviceUseTable'

import { useRecoilState } from 'recoil'
import { getDeviceAnalyticsList } from '@Service/AnalyticsService'
import { DeviceListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    const [deviceListState, setDeviceListState] =
        useRecoilState(DeviceListState)

    const getTableList = useCallback(async () => {
        setDeviceListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { INST_NO, BGNDE, ENDDE, AGEGROUP, CYCLE },
        } = deviceListState

        const { status, payload } = await getDeviceAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            setDeviceListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setDeviceListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
                },
            }))
        }
    }, [deviceListState, setDeviceListState])

    useEffect(() => {
        const pageStart = () => {
            if (deviceListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, deviceListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'default'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={(instNo, instNm) => {
                        setDeviceListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                                instNm: instNm,
                            },
                        }))
                    }}
                    HandleStartDate={e => {
                        setDeviceListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    StartDate={deviceListState.search.BGNDE}
                    HandleEndDate={e => {
                        setDeviceListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    EndDate={deviceListState.search.ENDDE}
                    AgeGroup={deviceListState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setDeviceListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={deviceListState.search.CYCLE}
                    HandleCycle={e => {
                        setDeviceListState(prevState => ({
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
                <DeviceUseTable />
            </TableWapper>
        </Container>
    )
}

export default DeviceUseMain
