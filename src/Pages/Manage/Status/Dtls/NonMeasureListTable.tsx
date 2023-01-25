import React, { useCallback, useEffect, useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, AutoAlertModal } from '@Elements'
import { useRecoilState } from 'recoil'
import { getMemberAnalyticsList } from '@Service/AnalyticsService'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { Container, RowWapper, ButtonBox, TableBox, Table: T } = ContentsStyle
const initializeState = {
    modal: {
        autoAlert: {
            title: ``,
            state: false,
        },
    },
}

const NonMeasureListTable = () => {
    const [mberAnalyticsListState, setMberAnalyticsListState] = useRecoilState(
        MberAnalyticsListState
    )
    const [pageState, setPageState] = useState<{
        modal: {
            autoAlert: {
                title: string
                state: boolean
            }
        }
    }>(initializeState)

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
            const DLE_WOMAN_CNT = getAgeData.DLE_WOMAN_CNT
            const DEL_MAN_CNT = getAgeData.DEL_MAN_CNT

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
                    <T.Cell>{DLE_WOMAN_CNT}</T.Cell>
                    <T.Cell>{DEL_MAN_CNT}</T.Cell>
                    <T.Cell>{DEL_MAN_CNT}</T.Cell>
                    <T.Cell>{DEL_MAN_CNT}</T.Cell>
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
                    <T.Cell>-</T.Cell>
                </>
            )
        }

        return cellHtml
    }

    return (
        <Container>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName="자동알림"
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    autoAlert: {
                                        title: '12334',
                                        state: true,
                                    },
                                },
                            }))
                        }
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell>이름</T.TheadCell>
                                <T.TheadCell>성별</T.TheadCell>
                                <T.TheadCell>생년월일</T.TheadCell>
                                <T.TheadCell>휴대폰번호</T.TheadCell>
                                <T.TheadCell>아이디</T.TheadCell>
                                <T.TheadCell>혈압</T.TheadCell>
                                <T.TheadCell>혈당</T.TheadCell>
                                <T.TheadCell>콜레스테롤</T.TheadCell>
                                <T.TheadCell>당화혈색소</T.TheadCell>
                                <T.TheadCell>체성분</T.TheadCell>
                                <T.TheadCell>스트레스</T.TheadCell>
                                <T.TheadCell>뇌기능검사</T.TheadCell>
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
            {pageState.modal.autoAlert.state && (
                <AutoAlertModal
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                autoAlert: {
                                    title: '',
                                    state: false,
                                },
                            },
                        }))
                    }}
                    ResetButtonClick={() => {
                        console.log('reset')
                    }}
                    CallBackResturn={e => {
                        console.log(e)
                    }}
                />
            )}
        </Container>
    )
}

export default NonMeasureListTable
