import React, { useCallback, useEffect } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

import { useRecoilState } from 'recoil'
import { DeviceAnalyticsListState } from '@Recoil/AnalyticsPagesState'

import { getDeviceAnalyticsList } from '@Service/AnalyticsService'
import { isNull } from 'lodash'

const {
    Container,
    RowWapper,
    // TitleBox,
    // ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const HealthIndicatorsTable = () => {
    const [deviceAnalyticsListState, setDeviceAnalyticsListState] =
        useRecoilState(DeviceAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                /*SEARCH_KEY, BEGIN_DE, END_DE, */ INST_NO /*, curPage */,
            },
        } = deviceAnalyticsListState

        const { status, payload } = await getDeviceAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            // SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : `${year}${monthPad}${dayPad}`,
            // BEGIN_DE: !isNull(BEGIN_DE) ? BEGIN_DE : ``,
            // END_DE: !isNull(END_DE) ? END_DE : ``,
        })

        if (status) {
            setDeviceAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setDeviceAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [deviceAnalyticsListState, setDeviceAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (deviceAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, deviceAnalyticsListState.status])

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number,
        title: string
    ) => {
        let cellHtml
        if (deviceAnalyticsListState.status) {
            if (area === 'AGE' && deviceAnalyticsListState.list !== null) {
                const getAgeData =
                    deviceAnalyticsListState.list.AGE_GROUP_STAT_LIST[lineNum]

                const TOT_MBER_CNT = getAgeData.TOT_MBER_CNT
                const TOT_WOMAN_CNT = getAgeData.TOT_WOMAN_CNT
                const TOT_MAN_CNT = getAgeData.TOT_MAN_CNT
                const IS_MBER_CNT = getAgeData.IS_MBER_CNT
                const IS_WOMAN_CNT = getAgeData.IS_WOMAN_CNT
                const IS_MAN_CNT = getAgeData.IS_MAN_CNT
                const BP_MBER_CNT = getAgeData.BP_MBER_CNT
                const BP_WOMAN_CNT = getAgeData.BP_WOMAN_CNT
                const BP_MAN_CNT = getAgeData.BP_MAN_CNT
                const BS_MBER_CNT = getAgeData.BS_MBER_CNT
                const BS_WOMAN_CNT = getAgeData.BS_WOMAN_CNT
                const BS_MAN_CNT = getAgeData.BS_MAN_CNT
                const BC_MBER_CNT = getAgeData.BC_MBER_CNT
                const BC_WOMAN_CNT = getAgeData.BC_WOMAN_CNT
                const BC_MAN_CNT = getAgeData.BC_MAN_CNT
                const ST_MBER_CNT = getAgeData.ST_MBER_CNT
                const ST_WOMAN_CNT = getAgeData.ST_WOMAN_CNT
                const ST_MAN_CNT = getAgeData.ST_MAN_CNT

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.CellW colSpan={colspan}>{title}</T.CellW>
                            <T.CellW>{TOT_MBER_CNT}</T.CellW>
                            <T.CellW>{TOT_WOMAN_CNT}</T.CellW>
                            <T.CellW>{TOT_MAN_CNT}</T.CellW>
                            <T.CellW>{IS_MBER_CNT}</T.CellW>
                            <T.CellW>{IS_WOMAN_CNT}</T.CellW>
                            <T.CellW>{IS_MAN_CNT}</T.CellW>
                            <T.CellW>{BP_MBER_CNT}</T.CellW>
                            <T.CellW>{BP_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BP_MAN_CNT}</T.CellW>
                            <T.CellW>{BS_MBER_CNT}</T.CellW>
                            <T.CellW>{BS_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BS_MAN_CNT}</T.CellW>
                            <T.CellW>{BC_MBER_CNT}</T.CellW>
                            <T.CellW>{BC_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BC_MAN_CNT}</T.CellW>
                            <T.CellW>{ST_MBER_CNT}</T.CellW>
                            <T.CellW>{ST_WOMAN_CNT}</T.CellW>
                            <T.CellW>{ST_MAN_CNT}</T.CellW>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>{title}</T.TFootCell>
                            <T.TFootCell>{TOT_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{TOT_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{TOT_MAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{IS_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{IS_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{IS_MAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BP_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{BP_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BP_MAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BS_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{BS_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BS_MAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BC_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{BC_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{BC_MAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{ST_MBER_CNT}%</T.TFootCell>
                            <T.TFootCell>{ST_WOMAN_CNT}%</T.TFootCell>
                            <T.TFootCell>{ST_MAN_CNT}%</T.TFootCell>
                        </>
                    )
                }
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
                                    개선성공률
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압</T.TheadCell>
                                <T.TheadCell colSpan={3}>공복혈당</T.TheadCell>
                                <T.TheadCell colSpan={3}>중성지방</T.TheadCell>
                                <T.TheadCell colSpan={3}>HDL-C</T.TheadCell>
                                <T.TheadCell colSpan={3}>허리둘레</T.TheadCell>
                            </T.TheadRow>
                            <T.TheadRow>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
                                <T.TheadCell>전체</T.TheadCell>
                                <T.TheadCell>내근직</T.TheadCell>
                                <T.TheadCell>외근직</T.TheadCell>
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
                                {cellMaker(7, 'AGE', 'footer', 2, '평균')}
                            </T.TFootRow>
                        </T.TFoot>
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default HealthIndicatorsTable
