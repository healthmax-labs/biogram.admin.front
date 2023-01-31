import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, MainTable } from '@Elements'
import {
    MemberAgeTableConfig,
    MemberAgeTableListItemInterface,
    MemberPeriodTableConfig,
    MemberPeriodTableListItemInterface,
} from '@Common/TableConfig/Manage/Analytics'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'

interface tableAgeOption {
    Loading: boolean
    Options: OptionsInterface<MemberAgeTableListItemInterface>
    Columns: Array<ColumnsInterface<MemberAgeTableListItemInterface>[]>
    Lists: MemberAgeTableListItemInterface[]
}
interface tablePeriodOption {
    Loading: boolean
    Options: OptionsInterface<MemberPeriodTableListItemInterface>
    Columns: Array<ColumnsInterface<MemberPeriodTableListItemInterface>[]>
    Lists: MemberPeriodTableListItemInterface[]
}

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
    // eslint-disable-next-line
    const [mberAnalyticsListState, setMberAnalyticsListState] = useRecoilState(
        MberAnalyticsListState
    )

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number,
        title: string
    ) => {
        let cellHtml
        if (mberAnalyticsListState.status) {
            if (area === 'AGE' && mberAnalyticsListState.list !== null) {
                const getAgeData =
                    mberAnalyticsListState.list.AGE_GROUP_STAT_LIST[lineNum]
                const TOT_MBER_CNT = getAgeData.TOT_MBER_CNT
                const TOT_MAN_CNT = getAgeData.TOT_MAN_CNT
                const TOT_WOMAN_CNT = getAgeData.TOT_WOMAN_CNT
                const NEW_MBER_CNT = getAgeData.NEW_MBER_CNT
                const NEW_WOMAN_CNT = getAgeData.NEW_WOMAN_CNT
                const NEW_MAN_CNT = getAgeData.NEW_MAN_CNT
                const DEL_MBER_CNT = getAgeData.DEL_MBER_CNT
                const DLE_WOMAN_CNT = getAgeData.DLE_WOMAN_CNT
                const DEL_MAN_CNT = getAgeData.DEL_MAN_CNT

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.Cell colSpan={colspan}>{title}</T.Cell>
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
            } else if (mberAnalyticsListState.list !== null) {
                const data = mberAnalyticsListState.list.PERIOD_STAT_LIST

                return data.map((data, index) => (
                    <T.Row key={`analytics-member-table-body-row-${index}`}>
                        <T.Cell colSpan={colspan}>{data.PERIOD}</T.Cell>
                        <T.Cell>{data.TOT_MBER_CNT}</T.Cell>
                        <T.Cell>{data.TOT_MAN_CNT}</T.Cell>
                        <T.Cell>{data.TOT_WOMAN_CNT}</T.Cell>
                        <T.Cell>{data.NEW_MBER_CNT}</T.Cell>
                        <T.Cell>{data.NEW_WOMAN_CNT}</T.Cell>
                        <T.Cell>{data.NEW_MAN_CNT}</T.Cell>
                        <T.Cell>{data.DEL_MBER_CNT}</T.Cell>
                        <T.Cell>{data.DLE_WOMAN_CNT}</T.Cell>
                        <T.Cell>{data.DEL_MAN_CNT}</T.Cell>
                    </T.Row>
                ))
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

    const listState = useRecoilValue(MberAnalyticsListState)

    const [tableAgeOptions, setTableAgeOptions] =
        useState<tableAgeOption>(MemberAgeTableConfig)

    const [tablePeriodOptions, setTablePeriodOptions] =
        useState<tablePeriodOption>(MemberPeriodTableConfig)

    useEffect(() => {
        if (listState.list !== null) {
            setTableAgeOptions(prevState => ({
                ...prevState,
                Loading: listState.status === 'loading',
                Lists: listState.list ? listState.list.AGE_GROUP_STAT_LIST : [],
            }))

            setTablePeriodOptions(prevState => ({
                ...prevState,
                Loading: listState.status === 'loading',
                Lists: listState.list ? listState.list.PERIOD_STAT_LIST : [],
            }))
        }
    }, [listState.list, listState.status])

    const laterFnc = () => {
        console.log('later fnc')
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
                <MainTable {...tableAgeOptions} RowClick={laterFnc} />
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
                        <T.Body>{cellMaker(0, 'PERIOD', '', 2, '기간')}</T.Body>
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
                <MainTable {...tablePeriodOptions} RowClick={laterFnc} />
            </RowWapper>
        </Container>
    )
}

export default MemberTable
