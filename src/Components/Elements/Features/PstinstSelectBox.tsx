import React, { useCallback, useEffect, useState } from 'react'
import { VarySelectBox } from '@Elements'
import { getInstLowInstCode, getInstTopInstCode } from '@Service/CommonService'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'

interface StepItemInfoInterface {
    INST_NO: number | null
    MBER_CNT: number | null
    REPRSNT_TELNO: string | null
    SIGUNGU_CD: null | string
}

interface StepItemInterface {
    value: string
    text: string
}

const initializeState = {
    InstList: {
        step1: [],
        step2: [],
        step3: [],
    },
    InstSelectList: {
        selectinfo: null,
        step1: {
            value: '',
            text: '',
        },
        step2: {
            value: '',
            text: '',
        },
        step3: {
            value: '',
            text: '',
        },
    },
}

const PstinstSelectBox = ({
    Value,
    ReturnCallback,
}: {
    Value: {
        infoStep: string | 'step1' | 'step2' | 'step3'
        instNo: string | null
        step1: string
        step2: string
        step3: string
    }
    ReturnCallback: ({
        selectinfo,
        step1,
        step2,
        step3,
    }: {
        selectinfo: StepItemInfoInterface | null
        step1: StepItemInterface
        step2: StepItemInterface
        step3: StepItemInterface
    }) => void
}) => {
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        InstList: {
            step1: StepItemInterface[]
            step2: StepItemInterface[]
            step3: StepItemInterface[]
        }
        InstSelectList: {
            selectinfo: StepItemInfoInterface | null
            step1: StepItemInterface
            step2: StepItemInterface
            step3: StepItemInterface
        }
    }>(initializeState)

    const handleGetTopInst = useCallback(async () => {
        const { status, payload } = await getInstTopInstCode()

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                InstList: {
                    ...prevState.InstList,
                    step1: payload.INST_CODE_LIST.map(e => {
                        return {
                            value: String(e.INST_NO),
                            text: e.INST_NM,
                        }
                    }),
                    step2: initializeState.InstList.step2,
                    step3: initializeState.InstList.step3,
                },
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                status: false,
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }, [handlMainAlert])

    const handleStep1Change = useCallback(
        async ({ value, text }: { value: string; text: string }) => {
            const { status, payload } = await getInstLowInstCode({
                instNo: Number(value),
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    InstList: {
                        ...prevState.InstList,
                        step2: payload.INST_CODE_LIST.map(e => {
                            return {
                                value: String(e.INST_NO),
                                text: e.INST_NM,
                            }
                        }),
                        step3: [],
                    },
                    InstSelectList: {
                        selectinfo: payload.INST_INFO,
                        step1: {
                            value: value,
                            text: text,
                        },
                        step2: initializeState.InstSelectList.step2,
                        step3: initializeState.InstSelectList.step3,
                    },
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        },
        [handlMainAlert]
    )

    const handleStep2Change = useCallback(
        async ({ value, text }: { value: string; text: string }) => {
            setPageState(prevState => ({
                ...prevState,
                InstSelectList: {
                    ...prevState.InstSelectList,
                    step2: {
                        value: value,
                        text: text,
                    },
                },
            }))

            const { status, payload } = await getInstLowInstCode({
                instNo: Number(value),
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    InstList: {
                        ...prevState.InstList,
                        step3: payload.INST_CODE_LIST.map(e => {
                            return {
                                value: String(e.INST_NO),
                                text: e.INST_NM,
                            }
                        }),
                    },
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        },
        [handlMainAlert]
    )

    const handleStep3Change = ({
        value,
        text,
    }: {
        value: string
        text: string
    }) => {
        setPageState(prevState => ({
            ...prevState,
            InstSelectList: {
                ...prevState.InstSelectList,
                step3: {
                    value: value,
                    text: text,
                },
            },
        }))
    }

    useEffect(() => {
        ReturnCallback(pageState.InstSelectList)
        // FIXME : 종속성에서 ReturnCallback 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState.InstSelectList])

    useEffect(() => {
        const pageStart = () => {
            if (pageState.InstList.step1.length === 0) {
                handleGetTopInst().then()
            }
        }

        pageStart()
    }, [handleGetTopInst, pageState.InstList.step1.length])

    useEffect(() => {
        const funcSetInst = () => {
            const { infoStep, instNo, step1, step2 } = Value

            if (
                instNo &&
                infoStep === 'step1' &&
                step1 !== pageState.InstSelectList.step1.value
            ) {
                handleStep1Change({ value: step1, text: '' }).then()
                return
            }

            if (
                instNo &&
                infoStep === 'step2' &&
                step2 !== pageState.InstSelectList.step2.value
            ) {
                handleStep1Change({ value: step1, text: '' }).then(() =>
                    handleStep2Change({
                        value: instNo,
                        text: '',
                    }).then()
                )

                return
            }

            if (
                instNo &&
                infoStep === 'step3' &&
                instNo !== pageState.InstSelectList.step3.value
            ) {
                handleStep1Change({ value: step1, text: '' }).then(() =>
                    handleStep2Change({
                        value: step2,
                        text: '',
                    }).then(() =>
                        handleStep3Change({ value: instNo, text: '' })
                    )
                )

                return
            }
        }

        if (Value.infoStep) {
            funcSetInst()
        }
        // FIXME : 종속성에서 ReturnCallback 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Value])

    return (
        <>
            <div className="flex flex-nowrap w-full">
                <div className="min-w-1/4 pr-2">
                    <VarySelectBox
                        Placeholder={Messages.Default.instSelectStep1}
                        Value={pageState.InstSelectList.step1.value}
                        Elements={pageState.InstList.step1}
                        HandleOnChange={e => handleStep1Change(e)}
                    />
                </div>
                <div className="w-1/4 pr-2">
                    {pageState.InstList.step2.length > 0 && (
                        <VarySelectBox
                            Placeholder={Messages.Default.instSelectStep2}
                            Value={pageState.InstSelectList.step2.value}
                            Elements={pageState.InstList.step2}
                            HandleOnChange={e => handleStep2Change(e)}
                        />
                    )}
                </div>
                <div className="w-1/4 pr-2">
                    {pageState.InstList.step3.length > 0 && (
                        <VarySelectBox
                            Value={pageState.InstSelectList.step3.value}
                            Elements={pageState.InstList.step3}
                            HandleOnChange={e => handleStep3Change(e)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default PstinstSelectBox
