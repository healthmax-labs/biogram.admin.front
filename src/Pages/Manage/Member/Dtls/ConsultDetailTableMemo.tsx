import {
    ConfirmModal,
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryLabelTextArea,
} from '@Elements'
import {
    ConsultDetailChartListState,
    ConsultDetailChartState,
} from '@Recoil/MemberPagesState'
import { useRecoilState } from 'recoil'
import React, { useCallback, useState } from 'react'
import Messages from '@Messages'
import _ from 'lodash'
import { useMainLayouts } from '@Hook/index'
import {
    postManageaddCounsel,
    postManageCounsel,
    postManageUpdateCounsel,
} from '@Service/MemberService'

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
            <div className="flex flex-col break-words bg-white pt-3 ">
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`작성자명:`} />
                    </div>
                    <div className="w-full">
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
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`상담내역: `} />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 ">
                        <VaryLabelTextArea
                            HandleOnChange={e =>
                                setChartState(prevState => ({
                                    ...prevState,
                                    CNST: e.target.value,
                                }))
                            }
                            Placeholder={`상담내역`}
                            Value={chartState.CNST ? chartState.CNST : ``}
                            Rows={15}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`추후계획: `} />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 border">
                        <VaryLabelTextArea
                            HandleOnChange={e =>
                                setChartState(prevState => ({
                                    ...prevState,
                                    PLN: e.target.value,
                                }))
                            }
                            Placeholder={`추후계획`}
                            Value={chartState.PLN ? chartState.PLN : ``}
                            Rows={15}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex pt-3 items-right justify-end">
                    <VaryButton
                        BgColor={`eggplant`}
                        Name={`저장`}
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
                </div>
            </div>
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
