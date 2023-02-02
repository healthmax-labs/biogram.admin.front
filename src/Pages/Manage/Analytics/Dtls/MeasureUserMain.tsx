import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import MeasureUserSearchBox from './MeasureUserSearchBox'
import MeasureUserTable from './MeasureUserTable'

import { useRecoilState } from 'recoil'
import { getMesureAnalyticsList } from '@Service/AnalyticsService'
import { MesureAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MeasureUserMain = () => {
    const [mesureAnalyticsListState, setMesureAnalyticsListState] =
        useRecoilState(MesureAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = mesureAnalyticsListState

        const { status, payload } = await getMesureAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setMesureAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setMesureAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [mesureAnalyticsListState, setMesureAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (mesureAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, mesureAnalyticsListState.status])
    return (
        <Container>
            <SearchWapper>
                <MeasureUserSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <MeasureUserTable />
            </TableWapper>
        </Container>
    )
}

export default MeasureUserMain
