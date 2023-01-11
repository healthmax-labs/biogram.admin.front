import React, { useCallback, useEffect } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const {
    Container,
    RowWapper,
    TitleBox,
    ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const MemberTable = () => {
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

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number
    ) => {
        let cellHtml
        if (mberAnalyticsListState.status) {
            if (area === 'AGE') {
                const TOT_MBER_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .TOT_MBER_CNT
                const TOT_MAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .TOT_MAN_CNT
                const TOT_WOMAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .TOT_WOMAN_CNT
                const NEW_MBER_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .NEW_MBER_CNT
                const NEW_WOMAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .NEW_WOMAN_CNT
                const NEW_MAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .NEW_MAN_CNT
                const DEL_MBER_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .DEL_MBER_CNT
                const DLE_WOMAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .DLE_WOMAN_CNT
                const DEL_MAN_CNT =
                    mberAnalyticsListState.list?.AGE_GROUP_STAT_LIST[lineNum]
                        .DEL_MAN_CNT
                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.Cell colSpan={colspan}>{TOT_MBER_CNT}</T.Cell>
                            <T.Cell>{TOT_MAN_CNT}</T.Cell>
                            <T.Cell>{TOT_WOMAN_CNT}</T.Cell>
                            <T.Cell>{NEW_MBER_CNT}</T.Cell>
                            <T.Cell>{NEW_WOMAN_CNT}</T.Cell>
                            <T.Cell>{NEW_MAN_CNT}</T.Cell>
                            <T.Cell>{DEL_MBER_CNT}</T.Cell>
                            <T.Cell>{DLE_WOMAN_CNT}</T.Cell>
                            <T.Cell>{DEL_MAN_CNT}</T.Cell>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>합계</T.TFootCell>
                            <T.TFootCell>{TOT_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{TOT_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{TOT_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{NEW_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{NEW_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{NEW_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{DEL_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{DLE_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{DEL_MAN_CNT}</T.TFootCell>
                        </>
                    )
                }
            } else {
                const TOT_MBER_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .TOT_MBER_CNT
                const TOT_MAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .TOT_MAN_CNT
                const TOT_WOMAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .TOT_WOMAN_CNT
                const NEW_MBER_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .NEW_MBER_CNT
                const NEW_WOMAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .NEW_WOMAN_CNT
                const NEW_MAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .NEW_MAN_CNT
                const DEL_MBER_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .DEL_MBER_CNT
                const DLE_WOMAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .DLE_WOMAN_CNT
                const DEL_MAN_CNT =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .DEL_MAN_CNT
                const PERIOD =
                    mberAnalyticsListState.list?.PERIOD_STAT_LIST[lineNum]
                        .PERIOD
                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.Cell colSpan={colspan}>{PERIOD}</T.Cell>
                            <T.Cell>{TOT_MBER_CNT}</T.Cell>
                            <T.Cell>{TOT_MAN_CNT}</T.Cell>
                            <T.Cell>{TOT_WOMAN_CNT}</T.Cell>
                            <T.Cell>{NEW_MBER_CNT}</T.Cell>
                            <T.Cell>{NEW_WOMAN_CNT}</T.Cell>
                            <T.Cell>{NEW_MAN_CNT}</T.Cell>
                            <T.Cell>{DEL_MBER_CNT}</T.Cell>
                            <T.Cell>{DLE_WOMAN_CNT}</T.Cell>
                            <T.Cell>{DEL_MAN_CNT}</T.Cell>
                        </>
                    )
                }
            }
        } else {
            if (area !== 'AGE') {
                cellHtml = (
                    <>
                        <T.Cell colSpan={colspan}>-</T.Cell>
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
            } else {
                cellHtml = (
                    <>
                        <T.Cell colSpan={colspan}>-</T.Cell>
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
        }

        return cellHtml
    }
    return (
        <Container>
            <RowWapper>
                <TitleBox>연령별 통계</TitleBox>
                <ChartBox>차트</ChartBox>
            </RowWapper>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName="엑셀다운로드"
                        HandleClick={() => console.debug('HandleClick')}
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell rowSpan={2} colSpan={2}>
                                    연령
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    전체회원수
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    신규회원수
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    탈퇴회원수
                                </T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>
                            <T.Row>
                                <T.Cell colSpan={2}>10대 이하</T.Cell>
                                {cellMaker(0, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>20대</T.Cell>
                                {cellMaker(1, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>30대</T.Cell>
                                {cellMaker(2, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>40대</T.Cell>
                                {cellMaker(3, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>50대</T.Cell>
                                {cellMaker(4, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>60대</T.Cell>
                                {cellMaker(5, 'AGE', '', 0)}
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>70대 이상</T.Cell>
                                {cellMaker(6, 'AGE', '', 0)}
                            </T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                {cellMaker(7, 'AGE', 'footer', 2)}
                            </T.TFootRow>
                        </T.TFoot>
                    </T.Table>
                </TableBox>
            </RowWapper>
            <RowWapper>
                <TitleBox>기간별 통계</TitleBox>
                <ChartBox>차트</ChartBox>
            </RowWapper>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName="엑셀다운로드"
                        HandleClick={() => console.debug('HandleClick')}
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell rowSpan={2} colSpan={2}>
                                    기간
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    전체회원수
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    신규회원수
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    탈퇴회원수
                                </T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>여성</T.TheadCell>
                                <T.TheadCell>남성</T.TheadCell>
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>
                            <T.Row>{cellMaker(0, 'PERIOD', '', 2)}</T.Row>
                            <T.Row>{cellMaker(1, 'PERIOD', '', 2)}</T.Row>
                            <T.Row>{cellMaker(2, 'PERIOD', '', 2)}</T.Row>
                            <T.Row>{cellMaker(3, 'PERIOD', '', 2)}</T.Row>
                            <T.Row>{cellMaker(4, 'PERIOD', '', 2)}</T.Row>
                            <T.Row>{cellMaker(5, 'PERIOD', '', 2)}</T.Row>
                        </T.Body>
                        {/* <T.TFoot>
                            <T.TFootRow>
                                <T.TFootCell colSpan={2}>
                                    합계
                                </T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                            </T.TFootRow>   //불요영역 주석처리
                        </T.TFoot> */}
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default MemberTable
