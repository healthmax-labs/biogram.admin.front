import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import HealthIndicatorsSearchBox from './HealthIndicatorsSearchBox'
import HealthIndicatorsTable from './HealthIndicatorsTable'

import { useRecoilState } from 'recoil'
import { getImprvmCountAnalyticsList } from '@Service/AnalyticsService'
import { ImprvmAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    const [imprvmAnalyticsListState, setImprvmAnalyticsListState] =
        useRecoilState(ImprvmAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO },
        } = imprvmAnalyticsListState

        const { status, payload } = await getImprvmCountAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
        })

        if (status) {
            setImprvmAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setImprvmAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [imprvmAnalyticsListState, setImprvmAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (imprvmAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, imprvmAnalyticsListState.status])

    return (
        <Container>
            <SearchWapper>
                <HealthIndicatorsSearchBox
                    HandleGetList={() => getTableList()}
                />
            </SearchWapper>
            <TableWapper>
                <HealthIndicatorsTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
