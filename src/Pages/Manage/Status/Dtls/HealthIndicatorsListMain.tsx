import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import HealthIndicatorsSearchBox from './HealthIndicatorsSearchBox'
import HealthIndicatorsListTable from './HealthIndicatorsListTable'
import HealthIndicatorsManageBox from './HealthIndicatorsManageBox'
import { useRecoilState } from 'recoil'
import { HealthIndicatorsListState } from '@Recoil/StatusPagesState'
import { getHealthIndicatorsList } from '@Service/StatusService'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    const [healthIndicatorsListState, setHealthIndicatorsState] =
        useRecoilState(HealthIndicatorsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { SEARCH_KEY, BGNDE, ENDDE, INST_NO, curPage },
        } = healthIndicatorsListState

        const { status, payload } = await getHealthIndicatorsList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
        })

        if (status) {
            setHealthIndicatorsState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setHealthIndicatorsState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    MYBODY_SCORE_IMPRVM_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [healthIndicatorsListState, setHealthIndicatorsState])

    useEffect(() => {
        const pageStart = () => {
            if (healthIndicatorsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, healthIndicatorsListState.status])

    return (
        <Container>
            <SearchWapper>
                <HealthIndicatorsSearchBox
                    HandleGetList={() => getTableList()}
                />
            </SearchWapper>
            <ManageWapper>
                <HealthIndicatorsManageBox />
            </ManageWapper>
            <TableWapper>
                <HealthIndicatorsListTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
