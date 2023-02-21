import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import WalkRankingSearchBox from './WalkRankingSearchBox'
import WalkRankingTable from './WalkRankingListTable'

import { useRecoilState } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'
import { getWalkRankingList } from '@Service/StatusService'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const WalkRankingListMain = () => {
    const [walkRankingListState, setWalkRankingState] =
        useRecoilState(WalkRankingListState)

    const getTableList = useCallback(async () => {
        const {
            search: { MESURE_MT, INST_NO, curPage },
        } = walkRankingListState

        const { status, payload } = await getWalkRankingList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            MESURE_MT: !isNull(MESURE_MT) ? MESURE_MT : ``,
        })

        if (status) {
            setWalkRankingState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setWalkRankingState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    STEP_RANK_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [walkRankingListState, setWalkRankingState])

    useEffect(() => {
        const pageStart = () => {
            if (walkRankingListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, walkRankingListState.status])

    return (
        <Container>
            <SearchWapper>
                <WalkRankingSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <WalkRankingTable />
            </TableWapper>
        </Container>
    )
}

export default WalkRankingListMain
