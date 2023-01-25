import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './ActivityWalkSearchBox'
import ManageBox from './ActivityWalkManageBox'
import ListTable from './ActivityWalkListTable'
import { getActivityWalkList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ActivityWalkListMain = () => {
    const [activityWalkListState, setActivityWalkListState] = useRecoilState(
        ActivityWalkListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: { SEARCH, BEGIN_DE, END_DE, INST_NO, curPage },
        } = activityWalkListState

        const { status, payload } = await getActivityWalkList({
            curPage: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH: !isNull(SEARCH) ? SEARCH : '',
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : `${year}${monthPad}${dayPad}`,
            BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : ``,
            END_DE: !isNull(END_DE) ? END_DE : ``,
        })

        if (status) {
            setActivityWalkListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setActivityWalkListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    ACTIVITY_STATE_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [activityWalkListState, setActivityWalkListState])

    useEffect(() => {
        const pageStart = () => {
            if (activityWalkListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, activityWalkListState.status])
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

export default ActivityWalkListMain
