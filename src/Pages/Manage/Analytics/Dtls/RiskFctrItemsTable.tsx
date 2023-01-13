import React, { useCallback, useEffect } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

import { useRecoilState } from 'recoil'
import { RiskFctrItemsAnalyticsListState } from '@Recoil/AnalyticsPagesState'

import { getRiskFctrItemsAnalyticsList } from '@Service/AnalyticsService'
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

const RiskFctrItemsTable = () => {
    const [
        riskFctrItemsAnalyticsListState,
        setRiskFctrItemsAnalyticsListState,
    ] = useRecoilState(RiskFctrItemsAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                /*SEARCH_KEY, BEGIN_DE, END_DE, */ INST_NO /*, curPage */,
            },
        } = riskFctrItemsAnalyticsListState

        const { status, payload } = await getRiskFctrItemsAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            // SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : `${year}${monthPad}${dayPad}`,
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : ``,
            // END_DE: !isNull(END_DE) ? END_DE : ``,
        })

        if (status) {
            setRiskFctrItemsAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrItemsAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [riskFctrItemsAnalyticsListState, setRiskFctrItemsAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrItemsAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }
        pageStart()
    }, [getTableList, riskFctrItemsAnalyticsListState.status])

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number,
        title: string
    ) => {
        let cellHtml
        if (riskFctrItemsAnalyticsListState.status) {
            if (
                area === 'AGE' &&
                riskFctrItemsAnalyticsListState.list !== null
            ) {
                const getAgeData =
                    riskFctrItemsAnalyticsListState.list.AGE_GROUP_STAT_LIST[
                        lineNum
                    ]

                const RF_ALL_TT_CNT = getAgeData.RF_ALL_TT_CNT
                const RF_622E_TT_CNT = getAgeData.RF_622E_TT_CNT
                const RF_622E_GD_CNT = getAgeData.RF_622E_GD_CNT
                const RF_622E_BD_CNT = getAgeData.RF_622E_BD_CNT
                const RF_8072_TT_CNT = getAgeData.RF_8072_TT_CNT
                const RF_8072_GD_CNT = getAgeData.RF_8072_GD_CNT
                const RF_8072_BD_CNT = getAgeData.RF_8072_BD_CNT
                const RF_624A_TT_CNT = getAgeData.RF_624A_TT_CNT
                const RF_624A_GD_CNT = getAgeData.RF_624A_GD_CNT
                const RF_624A_BD_CNT = getAgeData.RF_624A_BD_CNT
                const RF_624D_TT_CNT = getAgeData.RF_624D_TT_CNT
                const RF_624D_GD_CNT = getAgeData.RF_624D_GD_CNT
                const RF_624D_BD_CNT = getAgeData.RF_624D_BD_CNT
                const RF_624E_TT_CNT = getAgeData.RF_624E_TT_CNT
                const RF_624E_GD_CNT = getAgeData.RF_624E_GD_CNT
                const RF_624E_BD_CNT = getAgeData.RF_624E_BD_CNT

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.CellW colSpan={colspan}>{title}</T.CellW>
                            <T.CellW>{RF_ALL_TT_CNT}</T.CellW>
                            <T.CellW>{RF_622E_TT_CNT}</T.CellW>
                            <T.CellW>{RF_622E_GD_CNT}</T.CellW>
                            <T.CellW>{RF_622E_BD_CNT}</T.CellW>
                            <T.CellW>{RF_8072_TT_CNT}</T.CellW>
                            <T.CellW>{RF_8072_GD_CNT}</T.CellW>
                            <T.CellW>{RF_8072_BD_CNT}</T.CellW>
                            <T.CellW>{RF_624A_TT_CNT}</T.CellW>
                            <T.CellW>{RF_624A_GD_CNT}</T.CellW>
                            <T.CellW>{RF_624A_BD_CNT}</T.CellW>
                            <T.CellW>{RF_624D_TT_CNT}</T.CellW>
                            <T.CellW>{RF_624D_GD_CNT}</T.CellW>
                            <T.CellW>{RF_624D_BD_CNT}</T.CellW>
                            <T.CellW>{RF_624E_TT_CNT}</T.CellW>
                            <T.CellW>{RF_624E_GD_CNT}</T.CellW>
                            <T.CellW>{RF_624E_BD_CNT}</T.CellW>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>합계</T.TFootCell>
                            <T.TFootCell>{RF_ALL_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_622E_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_622E_GD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_622E_BD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_8072_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_8072_GD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_8072_BD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624A_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624A_GD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624A_BD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624D_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624D_GD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624D_BD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624E_TT_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624E_GD_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_624E_BD_CNT}</T.TFootCell>
                        </>
                    )
                }
            } else if (riskFctrItemsAnalyticsListState.list !== null) {
                const data =
                    riskFctrItemsAnalyticsListState.list.PERIOD_STAT_LIST

                return data.map(data => (
                    <T.Row key={data.RF_PERIOD}>
                        <T.CellW colSpan={colspan}>{data.RF_PERIOD}</T.CellW>
                        <T.CellW>{data.RF_ALL_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_622E_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_622E_GD_CNT}</T.CellW>
                        <T.CellW>{data.RF_622E_BD_CNT}</T.CellW>
                        <T.CellW>{data.RF_8072_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_8072_GD_CNT}</T.CellW>
                        <T.CellW>{data.RF_8072_BD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624A_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_624A_GD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624A_BD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624D_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_624D_GD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624D_BD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624E_TT_CNT}</T.CellW>
                        <T.CellW>{data.RF_624E_GD_CNT}</T.CellW>
                        <T.CellW>{data.RF_624E_BD_CNT}</T.CellW>
                    </T.Row>
                ))
            }
        } else {
            if (area !== 'AGE') {
                cellHtml = (
                    <>
                        <T.CellW colSpan={colspan}>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                    </>
                )
            } else {
                cellHtml = (
                    <>
                        <T.CellW colSpan={colspan}>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
                        <T.CellW>-</T.CellW>
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
                                <T.TheadCell rowSpan={2}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압</T.TheadCell>
                                <T.TheadCell colSpan={3}>허리둘레</T.TheadCell>
                                <T.TheadCell colSpan={3}>식전혈당</T.TheadCell>
                                <T.TheadCell colSpan={3}>중성지방</T.TheadCell>
                                <T.TheadCell colSpan={3}>HDLC</T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>
                            <T.Row>
                                {cellMaker(0, 'AGE', '', 2, '10대 이하')}
                            </T.Row>
                            <T.Row>{cellMaker(1, 'AGE', '', 2, '20대')}</T.Row>
                            <T.Row>{cellMaker(2, 'AGE', '', 2, '30대')}</T.Row>
                            <T.Row>{cellMaker(3, 'AGE', '', 2, '40대')}</T.Row>
                            <T.Row>{cellMaker(4, 'AGE', '', 2, '50대')}</T.Row>
                            <T.Row>{cellMaker(5, 'AGE', '', 2, '60대')}</T.Row>
                            <T.Row>
                                {cellMaker(6, 'AGE', '', 2, '70대 이상')}
                            </T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                {cellMaker(7, 'AGE', 'footer', 2, '합계')}
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
                                <T.TheadCell rowSpan={2}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압</T.TheadCell>
                                <T.TheadCell colSpan={3}>허리둘레</T.TheadCell>
                                <T.TheadCell colSpan={3}>식전혈당</T.TheadCell>
                                <T.TheadCell colSpan={3}>중성지방</T.TheadCell>
                                <T.TheadCell colSpan={3}>HDLC</T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>정상</T.TheadCell>
                                <T.TheadCell>위험</T.TheadCell>
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>{cellMaker(0, 'PERIOD', '', 2, '기간')}</T.Body>
                        {/* <T.TFoot>
                            <T.TFootRow>
                                <T.TFootCell colSpan={2}>합계</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                            </T.TFootRow>
                        </T.TFoot> */}
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default RiskFctrItemsTable
