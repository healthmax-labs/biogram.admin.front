import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import HealthIndicatorsTable from './HealthIndicatorsTable'
import { useRecoilState } from 'recoil'
import { getImprvmCountAnalyticsList } from '@Service/AnalyticsService'
import { ImprvmListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    const [imprvmListState, setImprvmListState] =
        useRecoilState(ImprvmListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO },
        } = imprvmListState

        const { status, payload } = await getImprvmCountAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
        })

        if (status) {
            setImprvmListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setImprvmListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [imprvmListState, setImprvmListState])

    useEffect(() => {
        const pageStart = () => {
            if (imprvmListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, imprvmListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'healthIndicators'}
                    HandleGetList={() => console.debug('HandleGetList')}
                    HandleInstNo={instNo => console.debug(instNo)}
                    StartDate={imprvmListState.search.BGNDE}
                    HandleStartDate={e => console.debug(e)}
                    EndDate={imprvmListState.search.ENDDE}
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
                <HealthIndicatorsTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
