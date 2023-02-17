import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MeasureUserTable from './MeasureUserTable'
import { useRecoilState } from 'recoil'
import { getMesureAnalyticsList } from '@Service/AnalyticsService'
import { MesureListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MeasureUserMain = () => {
    const [mesureListState, setMesureListState] =
        useRecoilState(MesureListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = mesureListState

        const { status, payload } = await getMesureAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setMesureListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setMesureListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
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
                    HandleGetList={() => console.debug('HandleGetList')}
                    HandleInstNo={instNo => console.debug(instNo)}
                    StartDate={mesureListState.search.BGNDE}
                    HandleStartDate={e => console.debug(e)}
                    EndDate={mesureListState.search.ENDDE}
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
                <MeasureUserTable />
            </TableWapper>
        </Container>
    )
}

export default MeasureUserMain
