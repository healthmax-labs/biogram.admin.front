import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './StatisticsSearchBox'
import ManageBox from './StatisticsManageBox'
import ListTable from './StatisticsListTable'
import { getStatisticsList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const StatisticsListMain = () => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)

    const getTableList = useCallback(async () => {
        setStatisticsListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: {
                SEARCH_KEY,
                BEGIN_DE,
                END_DE,
                INST_NO,
                curPage,
                MESURE_CODE,
            },
        } = statisticsListState

        const { status, payload } = await getStatisticsList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            MESURE_CODE: MESURE_CODE.join(','),
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
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
                list: {
                    DEVICE_MESURE_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
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
