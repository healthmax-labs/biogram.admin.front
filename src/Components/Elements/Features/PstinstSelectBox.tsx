import React, { useCallback, useEffect, useState } from 'react'
import { VarySelectBox } from '@Elements'
import { PstinstSelectBoxStyle } from '@Style/Elements/FeaturesStyles'
import { getInstLowInstCode, getInstTopInstCode } from '@Service/CommonService'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import { DefaultStatus } from '@CommonTypes'

const { Wapper } = PstinstSelectBoxStyle

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
    status: {
        step1: 'idle',
        step2: 'idle',
        step3: 'idle',
    },
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
        status: DefaultStatus

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
        status: {
            step1: string | DefaultStatus
            step2: string | DefaultStatus
            step3: string | DefaultStatus
        }
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
                status: {
                    step1: 'success',
                    step2: 'idle',
                    step3: 'idle',
                },
                InstList: {
                    ...prevState.InstList,
                    step1: [{ value: `1000`, text: `(주)헬스맥스` }].concat(
                        payload.INST_CODE_LIST.map(e => {
                            return {
                                value: String(e.INST_NO),
                                text: e.INST_NM,
                            }
                        })
                    ),
                    step2: initializeState.InstList.step2,
                    step3: initializeState.InstList.step3,
                },
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                status: {
                    ...prevState.status,
                    step1: 'failure',
                },
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.getInfoError,
            })
        }
    }, [handlMainAlert])

    const handleStep1Change = useCallback(
        async ({ value, text }: { value: string; text: string }) => {
            setPageState(prevState => ({
                ...prevState,
                status: {
                    ...prevState.status,
                    step2: 'loading',
                    step3: 'idle',
                },
            }))

            const { status, payload } = await getInstLowInstCode({
                instNo: Number(value),
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    status: {
                        ...prevState.status,
                        step2: 'success',
                    },
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
                setPageState(prevState => ({
                    ...prevState,
                    status: {
                        ...prevState.status,
                        step2: 'failure',
                    },
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
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

            setPageState(prevState => ({
                ...prevState,
                status: {
                    ...prevState.status,
                    step3: 'loading',
                },
            }))

            const { status, payload } = await getInstLowInstCode({
                instNo: Number(value),
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    status: {
                        ...prevState.status,
                        step3: 'success',
                    },
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
                setPageState(prevState => ({
                    ...prevState,
                    status: {
                        ...prevState.status,
                        step3: 'failure',
                    },
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
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
        if (
            Value.step1 !== pageState.InstSelectList.step1.value ||
            Value.step2 !== pageState.InstSelectList.step2.value ||
            Value.step3 !== pageState.InstSelectList.step3.value
        ) {
            ReturnCallback(pageState.InstSelectList)
        }

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
    }, [handleGetTopInst, pageState.InstList.step1])

    useEffect(() => {
        const funcSetInst = () => {
            if (Value) {
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
        }

        if (
            Value.status === 'success' &&
            Value.infoStep &&
            (Value.step1 !== pageState.InstSelectList.step1.value ||
                Value.step2 !== pageState.InstSelectList.step2.value ||
                Value.step3 !== pageState.InstSelectList.step3.value)
        ) {
            funcSetInst()
        }
        // FIXME : 종속성에서 ReturnCallback 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Value])

    return (
        <Wapper>
            {pageState.status.step1 === 'success' &&
                pageState.InstList.step1.length > 0 && (
                    <VarySelectBox
                        Width={`w60`}
                        Placeholder={Messages.Default.instSelectStep1}
                        Value={pageState.InstSelectList.step1.value}
                        Elements={pageState.InstList.step1}
                        HandleOnChange={e => handleStep1Change(e)}
                    />
                )}
            {pageState.status.step2 === 'success' &&
                pageState.InstList.step2.length > 0 && (
                    <VarySelectBox
                        Width={`w60`}
                        Placeholder={Messages.Default.instSelectStep2}
                        Value={pageState.InstSelectList.step2.value}
                        Elements={pageState.InstList.step2}
                        HandleOnChange={e => handleStep2Change(e)}
                    />
                )}
            {pageState.status.step3 === 'success' &&
                pageState.InstList.step3.length > 0 && (
                    <VarySelectBox
                        Width={`w60`}
                        Value={pageState.InstSelectList.step3.value}
                        Elements={pageState.InstList.step3}
                        HandleOnChange={e => handleStep3Change(e)}
                    />
                )}
        </Wapper>
    )
}

export default PstinstSelectBox
