import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './StatisticsSearchBox'
import ManageBox from './StatisticsManageBox'
import ListTable from './StatisticsListTable'
import { getStatisticsList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const StatisticsListMain = () => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { SEARCH_KEY, BEGIN_DE, END_DE, INST_NO, curPage },
        } = statisticsListState

        const { status, payload } = await getStatisticsList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : `${year}${monthPad}${dayPad}`,
            BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : ``,
            END_DE: !isNull(END_DE) ? END_DE : ``,
        })

        if (status) {
            setStatisticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setStatisticsListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [statisticsListState, setStatisticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (statisticsListState.status == 'idle') {
                getTableList().then()
            }
        }
        pageStart()
    }, [getTableList, statisticsListState.status])
    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default StatisticsListMain
