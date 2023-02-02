import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import DeviceUseSearchBox from './DeviceUseSearchBox'
import DeviceUseTable from './DeviceUseTable'

import { useRecoilState } from 'recoil'
import { getDeviceAnalyticsList } from '@Service/AnalyticsService'
import { DeviceAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    const [deviceAnalyticsListState, setDeviceAnalyticsListState] =
        useRecoilState(DeviceAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = deviceAnalyticsListState

        const { status, payload } = await getDeviceAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setDeviceAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setDeviceAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [deviceAnalyticsListState, setDeviceAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (deviceAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, deviceAnalyticsListState.status])

    return (
        <Container>
            <SearchWapper>
                <DeviceUseSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <DeviceUseTable />
            </TableWapper>
        </Container>
    )
}

export default DeviceUseMain
