import React, { useCallback, useEffect } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
// import { VaryButton } from '@Elements'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const {
    Container,
    RowWapper,
    /*ButtonBox, */ TableBox,
    Table: T,
} = ContentsStyle

const WalkRankingTable = () => {
    const [mberAnalyticsListState, setMberAnalyticsListState] = useRecoilState(
        MberAnalyticsListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: {
                /*SEARCH_KEY, BEGIN_DE, END_DE, */ INST_NO /*, curPage */,
            },
        } = mberAnalyticsListState

        const { status, payload } = await getMemberAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            // SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : `${year}${monthPad}${dayPad}`,
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : ``,
            // END_DE: !isNull(END_DE) ? END_DE : ``,
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
            }))
        }
    }, [mberAnalyticsListState, setMberAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (mberAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }
        pageStart()
    }, [getTableList, mberAnalyticsListState.status])

    const cellMaker = (lineNum: number, title: string) => {
        let cellHtml
        if (
            mberAnalyticsListState.status &&
            mberAnalyticsListState.list !== null
        ) {
            const getAgeData =
                mberAnalyticsListState.list.AGE_GROUP_STAT_LIST[lineNum]
            const TOT_MBER_CNT = getAgeData.TOT_MBER_CNT
            const TOT_MAN_CNT = getAgeData.TOT_MAN_CNT
            const TOT_WOMAN_CNT = getAgeData.TOT_WOMAN_CNT
            const NEW_MBER_CNT = getAgeData.NEW_MBER_CNT
            const NEW_WOMAN_CNT = getAgeData.NEW_WOMAN_CNT
            const NEW_MAN_CNT = getAgeData.NEW_MAN_CNT
            const DEL_MBER_CNT = getAgeData.DEL_MBER_CNT

            cellHtml = (
                <>
                    <T.Cell>{title}</T.Cell>
                    <T.Cell>{TOT_MBER_CNT}</T.Cell>
                    <T.Cell>{TOT_MAN_CNT}</T.Cell>
                    <T.Cell>{TOT_WOMAN_CNT}</T.Cell>
                    <T.Cell>{NEW_MBER_CNT}</T.Cell>
                    <T.Cell>{NEW_WOMAN_CNT}</T.Cell>
                    <T.Cell>{NEW_MAN_CNT}</T.Cell>
                    <T.Cell>{DEL_MBER_CNT}</T.Cell>
                </>
            )
        } else {
            cellHtml = (
                <>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                    <T.Cell>-</T.Cell>
                </>
            )
        }

        return cellHtml
    }

    return (
        <Container>
            <RowWapper>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell>랭킹</T.TheadCell>
                                <T.TheadCell>이름</T.TheadCell>
                                <T.TheadCell>성별</T.TheadCell>
                                <T.TheadCell>생년월일</T.TheadCell>
                                <T.TheadCell>휴대폰번호</T.TheadCell>
                                <T.TheadCell>아이디</T.TheadCell>
                                <T.TheadCell>혈압</T.TheadCell>
                                <T.TheadCell>총 보행수</T.TheadCell>
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>
                            <T.Row>{cellMaker(0, '10대 이하')}</T.Row>
                            <T.Row>{cellMaker(1, '20대')}</T.Row>
                            <T.Row>{cellMaker(2, '30대')}</T.Row>
                            <T.Row>{cellMaker(3, '40대')}</T.Row>
                            <T.Row>{cellMaker(4, '50대')}</T.Row>
                            <T.Row>{cellMaker(5, '60대')}</T.Row>
                            <T.Row>{cellMaker(6, '70대 이상')}</T.Row>
                        </T.Body>
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default WalkRankingTable
