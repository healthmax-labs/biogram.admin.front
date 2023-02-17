import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import DeviceUseTable from './DeviceUseTable'

import { useRecoilState } from 'recoil'
import { getDeviceAnalyticsList } from '@Service/AnalyticsService'
import { DeviceListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    const [deviceListState, setDeviceListState] =
        useRecoilState(DeviceListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = deviceListState

        const { status, payload } = await getDeviceAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
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
                list: null,
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
                    HandleGetList={() => console.debug('HandleGetList')}
                    HandleInstNo={instNo => console.debug(instNo)}
                    StartDate={deviceListState.search.BGNDE}
                    HandleStartDate={e => console.debug(e)}
                    EndDate={deviceListState.search.ENDDE}
                    HandleEndDate={e => console.debug(e)}
                    AgeGroup={[]}
                    HandleAgeGroup={e => {
                        console.debug(e)
                    }}
                    Cycle={``}
                    HandleCycle={e => {
                        console.debug(e)
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
