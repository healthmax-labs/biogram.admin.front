import React, { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import _ from 'lodash'
import {
    ConfirmModal,
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryTextArea,
} from '@Elements'
import {
    ConsultDetailChartListState,
    ConsultDetailChartState,
} from '@Recoil/MemberPagesState'
import {
    postManageaddCounsel,
    postManageCounsel,
    postManageUpdateCounsel,
} from '@Service/MemberService'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const {
    Message: {
        Memo: { Container, Row, ButtonBox, LabelCell, ItemCell },
    },
} = ConsultDetailStyle

const initializeState = {
    modal: {
        confirm: false,
    },
}

const ConsultDetailTableMemo = () => {
    const { handlMainAlert } = useMainLayouts()
    const [chartState, setChartState] = useRecoilState(ConsultDetailChartState)
    const [chartListState, setChartListState] = useRecoilState(
        ConsultDetailChartListState
    )

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        if (
            chartListState.status === 'success' &&
            chartListState.search.mberNo &&
            chartListState.search.endDt &&
            chartListState.search.startDt
        ) {
            setChartListState(prevState => ({
                ...prevState,
                listStatus: 'loading',
            }))
            const { status, payload } = await postManageCounsel({
                MBER_NO: chartListState.search.mberNo,
                END_DT: chartListState.search.endDt,
                START_DT: chartListState.search.startDt,
            })

            if (status) {
                const { CHART_LIST } = payload
                setChartListState(prevState => ({
                    ...prevState,
                    listStatus: 'success',
                    list: CHART_LIST,
                }))
            } else {
                // FIXME: 에러 처리
                setChartListState(prevState => ({
                    ...prevState,
                    listStatus: 'failure',
                }))
            }
        }
    }, [
        chartListState.search.endDt,
        chartListState.search.mberNo,
        chartListState.search.startDt,
        chartListState.status,
        setChartListState,
    ])

    const handleSave = async () => {
        if (
            chartState.PLN &&
            chartState.CNST &&
            chartState.REG_NM &&
            chartState.MBER_NO
        ) {
            let resultState: boolean
            if (chartState.CNST_NO) {
                const { status } = await postManageUpdateCounsel({
                    MBER_NO: String(chartState.MBER_NO),
                    PLN: chartState.PLN,
                    REG_NM: chartState.REG_NM,
                    CNST: chartState.CNST,
                    CNST_NO: String(chartState.CNST_NO),
                })

                resultState = status
            } else {
                const { status } = await postManageaddCounsel({
                    PLN: chartState.PLN,
                    CNST: chartState.CNST,
                    REG_NM: chartState.REG_NM,
                    MBER_NO: String(chartState.MBER_NO),
                })

                resultState = status
            }

            if (resultState) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                handleGetList().then()

                setChartState(prevState => ({
                    ...prevState,
                    REG_NM: null,
                    CNST: null,
                    PLN: null,
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <LabelCell>
                        <VaryLabel LabelName={`작성자명`} TextAlign={`left`} />
                    </LabelCell>
                    <ItemCell>
                        <VaryInput
                            HandleOnChange={e =>
                                setChartState(prevState => ({
                                    ...prevState,
                                    REG_NM: e.target.value,
                                }))
                            }
                            id={'id'}
                            Placeholder={'작성자명'}
                            Value={chartState.REG_NM ? chartState.REG_NM : ``}
                        />
                    </ItemCell>
                </Row>
                <Row>
                    <LabelCell>
                        <VaryLabel LabelName={`상담내역`} TextAlign={`left`} />
                    </LabelCell>
                </Row>
                <Row>
                    <ItemCell>
                        <VaryTextArea
                            HandleOnChange={e =>
                                setChartState(prevState => ({
                                    ...prevState,
                                    CNST: e.target.value,
                                }))
                            }
                            Placeholder={`상담내역을 입력해 주세요`}
                            Value={chartState.CNST ? chartState.CNST : ``}
                            Rows={15}
                        />
                    </ItemCell>
                </Row>
                <Row>
                    <LabelCell>
                        <VaryLabel LabelName={`추후계획`} TextAlign={`left`} />
                    </LabelCell>
                </Row>
                <Row>
                    <ItemCell>
                        <VaryTextArea
                            HandleOnChange={e =>
                                setChartState(prevState => ({
                                    ...prevState,
                                    PLN: e.target.value,
                                }))
                            }
                            Placeholder={`추후계획을 입력해 주세요`}
                            Value={chartState.PLN ? chartState.PLN : ``}
                            Rows={15}
                        />
                    </ItemCell>
                </Row>

                <Row>
                    <ButtonBox>
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`저장`}
                            HandleClick={() => {
                                if (_.isEmpty(chartState.REG_NM)) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default.consult
                                                .chartSaveEmptyRegNm,
                                    })
                                    return
                                }

                                if (_.isEmpty(chartState.CNST)) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default.consult
                                                .chartSaveEmptyCnst,
                                    })
                                    return
                                }

                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        confirm: true,
                                    },
                                }))
                            }}
                        />
                    </ButtonBox>
                </Row>
            </Container>

            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.consult.chartSaveConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))

                        handleSave().then()
                    }}
                />
            )}
        </>
    )
}

export default ConsultDetailTableMemo
