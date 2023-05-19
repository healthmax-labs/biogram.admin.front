import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import _ from 'lodash'
import {
    ConfirmModal,
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryTextArea,
    ConsultChartPrintModal,
} from '@Elements'
import {
    ConsultDetailChartListState,
    ConsultDetailChartState,
    ConsultDetailState,
} from '@Recoil/MemberPagesState'
import {
    postManageaddCounsel,
    postManageCounsel,
    postManageUpdateCounsel,
} from '@Service/MemberService'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { timeStringParse } from '@Helper'

const {
    Message: {
        Memo: { Container, Row, ButtonBox, LabelCell, ItemCell },
    },
} = ConsultDetailStyle

const initializeState = {
    memberInfo: {
        NM: '',
        MBTLNUM: '',
        SEXDSTN: '',
        BRTHDY: '',
    },
    modal: {
        confirm: false,
        chartPrint: false,
    },
}

const ConsultDetailRightBoxChart = () => {
    const { handlMainAlert } = useMainLayouts()
    const [chartState, setChartState] = useRecoilState(ConsultDetailChartState)
    const [chartListState, setChartListState] = useRecoilState(
        ConsultDetailChartListState
    )
    const detailState = useRecoilValue(ConsultDetailState)

    const [pageState, setPageState] = useState<{
        memberInfo: {
            NM: string
            BRTHDY: string
        }
        modal: {
            confirm: boolean
            chartPrint: boolean
        }
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        const {
            memNo,
            search: { endDt, startDt },
        } = chartListState

        if (endDt && startDt) {
            setChartListState(prevState => ({
                ...prevState,
                listStatus: 'loading',
            }))
            const { status, payload } = await postManageCounsel({
                MBER_NO: String(memNo),
                END_DT: endDt,
                START_DT: startDt,
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
                    list: [],
                }))
            }
        }
    }, [chartListState, setChartListState])

    // 기존 내용 업데이트
    const handleUpdate = async () => {
        const { PLN, CNST, REG_NM, MBER_NO, CNST_NO } = chartState

        const { status } = await postManageUpdateCounsel({
            MBER_NO: String(MBER_NO),
            PLN: PLN,
            REG_NM: REG_NM,
            CNST: CNST,
            CNST_NO: String(CNST_NO),
        })

        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            handleGetList().then()

            setChartState(prevState => ({
                ...prevState,
                REG_NM: '',
                CNST: '',
                PLN: '',
            }))
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    // 추가.
    const handleSave = async () => {
        const { PLN, CNST, REG_NM, MBER_NO } = chartState
        const { status } = await postManageaddCounsel({
            PLN: PLN,
            CNST: CNST,
            REG_NM: REG_NM,
            MBER_NO: String(MBER_NO),
        })

        if (status) {
            setChartState(prevState => ({
                ...prevState,
                REG_NM: '',
                CNST: '',
                PLN: '',
            }))
            handleGetList().then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        const funcSetData = () => {
            if (detailState.detail) {
                const { NM, BRTHDY } = detailState.detail.MBER_INFO
                setPageState(prevState => ({
                    ...prevState,
                    memberInfo: {
                        NM: NM,
                        BRTHDY: BRTHDY,
                    },
                }))
            }
        }

        if (detailState.status === 'success') {
            funcSetData()
        }
    }, [detailState])

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
                        <VaryLabel LabelName={`비고`} TextAlign={`left`} />
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
                        {!_.isEmpty(chartState.REGDT) &&
                            !_.isEmpty(chartState.REG_NM) &&
                            (!_.isEmpty(chartState.CNST) ||
                                !_.isEmpty(chartState.PLN)) && (
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`프린트`}
                                    HandleClick={() => {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                chartPrint: true,
                                            },
                                        }))
                                    }}
                                />
                            )}

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
                    Title={
                        chartState.CNST_NO
                            ? Messages.Default.consult.chartModifyConfirm
                            : Messages.Default.consult.chartSaveConfirm
                    }
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

                        chartState.CNST_NO
                            ? handleUpdate().then()
                            : handleSave().then()
                    }}
                />
            )}

            {pageState.modal.chartPrint && (
                <ConsultChartPrintModal
                    MemberName={pageState.memberInfo.NM}
                    BirthDate={pageState.memberInfo.BRTHDY}
                    ConsultDate={
                        chartState.REGDT && timeStringParse(chartState.REGDT)
                            ? `${timeStringParse(chartState.REGDT)}`
                            : ``
                    }
                    AuthorName={chartState.REG_NM ? chartState.REG_NM : ``}
                    History={chartState.CNST ? chartState.CNST : ``}
                    Planning={chartState.PLN ? chartState.PLN : ``}
                    CloseModal={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                chartPrint: false,
                            },
                        }))
                    }}
                />
            )}
        </>
    )
}

export default ConsultDetailRightBoxChart
