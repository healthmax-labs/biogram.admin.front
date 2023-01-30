import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import MemberSearchBox from './MemberSearchBox'
import MemberTable from './MemberTable'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MemberMain = () => {
    const [mberAnalyticsListState, setMberAnalyticsListState] = useRecoilState(
        MberAnalyticsListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: { /*SEARCH_KEY,*/ BGNDE, ENDDE, INST_NO /*, curPage */ },
        } = mberAnalyticsListState

        const { status, payload } = await getMemberAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            // SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            // BGNDE: !isNull(BGNDE) ? BGNDE : `${year}${monthPad}${dayPad}`,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setMberAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setMberAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
        console.log(mberAnalyticsListState)
    }, [mberAnalyticsListState, setMberAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (mberAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, mberAnalyticsListState.status])

    return (
        <Container>
            <SearchWapper>
                <MemberSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <MemberTable />
            </TableWapper>
        </Container>
    )
}

export default MemberMain
