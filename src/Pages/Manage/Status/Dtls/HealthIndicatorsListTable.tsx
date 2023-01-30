import React, { useCallback, useEffect } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { Container, RowWapper, TableBox, Table: T } = ContentsStyle

const NonMeasureTable = () => {
    const [mberAnalyticsListState, setMberAnalyticsListState] = useRecoilState(
        MberAnalyticsListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: { /*SEARCH_KEY,  */ BGNDE, ENDDE, INST_NO /*, curPage */ },
        } = mberAnalyticsListState

        const { status, payload } = await getMemberAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            // SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BGNDE: !isNull(BGNDE) ? BGNDE : `${year}${monthPad}${dayPad}`,
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
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
                    <T.Cell>{DEL_MBER_CNT}</T.Cell>
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
                                <T.TheadCell rowSpan={2}>연령</T.TheadCell>
                                <T.TheadCell colSpan={3}>개인 정보</T.TheadCell>
                                <T.TheadCell colSpan={6}>측정 수치</T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>이름</T.TheadCell>
                                <T.TheadCell>성별</T.TheadCell>
                                <T.TheadCell>생년월일</T.TheadCell>
                                <T.TheadCell>개선성공률</T.TheadCell>
                                <T.TheadCell>혈압</T.TheadCell>
                                <T.TheadCell>공복혈당</T.TheadCell>
                                <T.TheadCell>중성지방</T.TheadCell>
                                <T.TheadCell>H-DLC</T.TheadCell>
                                <T.TheadCell>허리둘레</T.TheadCell>
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
                        {/* <T.TFoot>
                            <T.TFootRow>
                                {cellMaker(7, 'AGE', 'footer', 2, '합계')}
                            </T.TFootRow>
                        </T.TFoot> */}
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default NonMeasureTable
