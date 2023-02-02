import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

import { useRecoilValue } from 'recoil'
import { ImprvmAnalyticsListState } from '@Recoil/AnalyticsPagesState'

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
    const imprvmAnalyticsListState = useRecoilValue(ImprvmAnalyticsListState)

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number
    ) => {
        let cellHtml
        if (imprvmAnalyticsListState.status) {
            if (area === 'AGE' && imprvmAnalyticsListState.list !== null) {
                const getAgeData =
                    imprvmAnalyticsListState.list.MYBODY_SCORE_IMPRVM_STAT_LIST[
                        lineNum
                    ]
                const AGES_GROUP = getAgeData.AGES_GROUP
                const TT_TOT_SCORE = getAgeData.TT_TOT_SCORE
                const IW_TOT_SCORE = getAgeData.IW_TOT_SCORE
                const OW_TOT_SCORE = getAgeData.OW_TOT_SCORE
                const TT_BP_SCORE = getAgeData.TT_BP_SCORE
                const IW_BP_SCORE = getAgeData.IW_BP_SCORE
                const OW_BP_SCORE = getAgeData.OW_BP_SCORE
                const TT_FBS_SCORE = getAgeData.TT_FBS_SCORE
                const IW_FBS_SCORE = getAgeData.IW_FBS_SCORE
                const OW_FBS_SCORE = getAgeData.OW_FBS_SCORE
                const TT_TG_SCORE = getAgeData.TT_TG_SCORE
                const IW_TG_SCORE = getAgeData.IW_TG_SCORE
                const OW_TG_SCORE = getAgeData.OW_TG_SCORE
                const TT_HDLC_SCORE = getAgeData.TT_HDLC_SCORE
                const IW_HDLC_SCORE = getAgeData.IW_HDLC_SCORE
                const OW_HDLC_SCORE = getAgeData.OW_HDLC_SCORE
                const TT_WAIST_SCORE = getAgeData.TT_WAIST_SCORE
                const IW_WAIST_SCORE = getAgeData.IW_WAIST_SCORE
                const OW_WAIST_SCORE = getAgeData.OW_WAIST_SCORE

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.CellW colSpan={colspan}>{AGES_GROUP}</T.CellW>
                            <T.CellW>{TT_TOT_SCORE}</T.CellW>
                            <T.CellW>{IW_TOT_SCORE}</T.CellW>
                            <T.CellW>{OW_TOT_SCORE}</T.CellW>
                            <T.CellW>{TT_BP_SCORE}</T.CellW>
                            <T.CellW>{IW_BP_SCORE}</T.CellW>
                            <T.CellW>{OW_BP_SCORE}</T.CellW>
                            <T.CellW>{TT_FBS_SCORE}</T.CellW>
                            <T.CellW>{IW_FBS_SCORE}</T.CellW>
                            <T.CellW>{OW_FBS_SCORE}</T.CellW>
                            <T.CellW>{TT_TG_SCORE}</T.CellW>
                            <T.CellW>{IW_TG_SCORE}</T.CellW>
                            <T.CellW>{OW_TG_SCORE}</T.CellW>
                            <T.CellW>{TT_HDLC_SCORE}</T.CellW>
                            <T.CellW>{IW_HDLC_SCORE}</T.CellW>
                            <T.CellW>{OW_HDLC_SCORE}</T.CellW>
                            <T.CellW>{TT_WAIST_SCORE}</T.CellW>
                            <T.CellW>{IW_WAIST_SCORE}</T.CellW>
                            <T.CellW>{OW_WAIST_SCORE}</T.CellW>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>
                                {AGES_GROUP}
                            </T.TFootCell>
                            <T.TFootCell>{TT_TOT_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_TOT_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_TOT_SCORE}%</T.TFootCell>
                            <T.TFootCell>{TT_BP_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_BP_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_BP_SCORE}%</T.TFootCell>
                            <T.TFootCell>{TT_FBS_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_FBS_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_FBS_SCORE}%</T.TFootCell>
                            <T.TFootCell>{TT_TG_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_TG_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_TG_SCORE}%</T.TFootCell>
                            <T.TFootCell>{TT_HDLC_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_HDLC_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_HDLC_SCORE}%</T.TFootCell>
                            <T.TFootCell>{TT_WAIST_SCORE}%</T.TFootCell>
                            <T.TFootCell>{IW_WAIST_SCORE}%</T.TFootCell>
                            <T.TFootCell>{OW_WAIST_SCORE}%</T.TFootCell>
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
                        HandleClick={() => {
                            //
                        }}
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
                            <T.Row>{cellMaker(0, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(1, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(2, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(3, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(4, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(5, 'AGE', '', 2)}</T.Row>
                            <T.Row>{cellMaker(6, 'AGE', '', 2)}</T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                {cellMaker(7, 'AGE', 'footer', 2)}
                            </T.TFootRow>
                        </T.TFoot>
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default HealthIndicatorsTable
