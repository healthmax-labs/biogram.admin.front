import { VarySelectBox } from '@Element/index'
import React, { useCallback, useEffect, useState } from 'react'
import { getSiGunCode, getSiGunGroup } from '@Service/CommonService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

interface StepItemInterface {
    value: string
    text: string
}

const initializeState = {
    SiGuGun: {
        step1: [],
        step2: [],
    },
    SelectList: {
        step1: {
            value: '',
            text: '',
        },
        step2: {
            value: '',
            text: '',
        },
    },
}

const SiGunSelectBox = ({
    SigunguCd,
    ReturnCallback,
}: {
    SigunguCd: string
    ReturnCallback: ({
        step1,
        step2,
    }: {
        step1: StepItemInterface
        step2: StepItemInterface
    }) => void
}) => {
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        SiGuGun: {
            step1: StepItemInterface[]
            step2: StepItemInterface[]
        }
        SelectList: {
            step1: StepItemInterface
            step2: StepItemInterface
        }
    }>(initializeState)

    const handleGroupCode = useCallback(async () => {
        const { status, payload } = await getSiGunGroup()

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                SiGuGun: {
                    ...prevState.SiGuGun,
                    step1: payload.IEM_CODE_LIST.map(e => {
                        return {
                            value: String(e.IEM_CODE),
                            text: e.IEM_NM,
                        }
                    }),
                    step2: [],
                },
            }))
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.getInfoError,
            })
        }
    }, [handlMainAlert])

    const handleSiDoOnChange = useCallback(
        async ({ value }: { text: string; value: string }) => {
            const valueSubString = value.substring(0, 2)
            const { status, payload } = await getSiGunCode({
                GuBun: valueSubString,
            })

            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    SiGuGun: {
                        ...prevState.SiGuGun,
                        step2: payload.IEM_CODE_LIST.map(e => {
                            return {
                                value: e.IEM_CODE,
                                text: e.IEM_NM,
                            }
                        }),
                    },
                    SelectList: {
                        ...prevState.SelectList,
                        step1: {
                            value: valueSubString,
                            text: '',
                        },
                    },
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
                })
            }
        },
        [handlMainAlert]
    )

    useEffect(() => {
        const pageStart = () => {
            handleGroupCode().then()
        }

        pageStart()
    }, [handleGroupCode])

    useEffect(() => {
        const funcSetSelectValue = () => {
            if (SigunguCd && SigunguCd !== pageState.SelectList.step2.value) {
                handleSiDoOnChange({ value: SigunguCd, text: '' }).then(() =>
                    setPageState(prevState => ({
                        ...prevState,

                        SelectList: {
                            ...prevState.SelectList,
                            step2: {
                                value: SigunguCd,
                                text: '',
                            },
                        },
                    }))
                )
            }
        }

        funcSetSelectValue()
        // FIXME : 종속성에서 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        SigunguCd,
        // handleSiDoOnChange,
        // pageState,
        // pageState.SelectList.step2.value,
    ])

    useEffect(() => {
        ReturnCallback(pageState.SelectList)
        // FIXME : 종속성에서 ReturnCallback 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState.SelectList])

    return (
        <div className="flex flex-nowrap w-full">
            <div className="min-w-1/4 pr-2">
                <VarySelectBox
                    Placeholder={Messages.Default.sidoCodeSelect}
                    Value={pageState.SelectList.step1.value}
                    Elements={[{ value: `99`, text: `B2B` }].concat(
                        pageState.SiGuGun.step1
                    )}
                    HandleOnChange={e => {
                        handleSiDoOnChange(e).then()
                    }}
                />
            </div>
            <div className="w-1/4 pr-2">
                <VarySelectBox
                    Placeholder={Messages.Default.sigunCodeSelect}
                    Value={pageState.SelectList.step2.value}
                    // Elements={[{ value: `99999`, text: `B2B` }].concat(
                    //     pageState.SiGuGun.step2
                    // )}
                    Elements={(() => {
                        if (pageState.SelectList.step1.value === '99') {
                            return [{ value: `99999`, text: `B2B` }].concat(
                                pageState.SiGuGun.step2
                            )
                        } else {
                            return pageState.SiGuGun.step2
                        }
                    })()}
                    HandleOnChange={e =>
                        setPageState(prevState => ({
                            ...prevState,
                            SelectList: {
                                ...prevState.SelectList,
                                step2: {
                                    value: e.value,
                                    text: e.text,
                                },
                            },
                        }))
                    }
                />
            </div>
        </div>
    )
}

export default SiGunSelectBox
