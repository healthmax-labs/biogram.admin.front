import React, { useState } from 'react'
import {
    ConfirmModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryModal,
} from '@Elements'
import {
    changeDatePickerDate,
    getNowDateDetail,
    gmtTimeToTimeObject,
} from '@Helper'
import Codes from '@Codes'
import Messages from '@Messages'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { useMainLayouts } from '@Hook/index'
import { postDataMesureInfoManual } from '@Service/MemberService'

const initializeState = {
    loading: false,
    input: {
        MESURE_DE: getNowDateDetail(), // 측정일
        MESURE_TIME: getNowDateDetail(), //측정시분초
        SLM: null,
        PBF: null,
        VFL: null,
        EST_BN_MAS: null,
        BMI: null,
        HEIGHT: null,
        BDWGH: null,
        WAIST_CRCMFRNC: null,
        BDHEAT: null,
        SYSTOLIC: null,
        DIASTOLIC: null,
        PULS: null,
        FBS: null,
        PP2: null,
        T_CHOL: null,
        HDLC: null,
        LDLC: null,
        TG: null,
    },
    modal: {
        confirm: false,
    },
}

const MemberMyDataInputModal = ({
    MemberNo,
    CancleButtonClick,
}: {
    MemberNo: number
    CancleButtonClick: () => void
}) => {
    const { handlMainAlert } = useMainLayouts()
    const { userinfo } = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        loading: boolean
        input: {
            MESURE_DE: string // 측정일
            MESURE_TIME: string //측정시분초
            SLM: string | null // 근육량
            PBF: string | null // 체지방률
            VFL: string | null // 내장지방(레벨)
            EST_BN_MAS: string | null // 추정골량
            BMI: string | null // BMI
            HEIGHT: string | null // 신장
            BDWGH: string | null //몸무게
            WAIST_CRCMFRNC: string | null // 허리둘레
            BDHEAT: string | null //체온
            SYSTOLIC: string | null // 수축기
            DIASTOLIC: string | null /// 이완기
            PULS: string | null // 맥박
            FBS: string | null // 식전혈당
            PP2: string | null //식후혈당
            T_CHOL: string | null // 총콜레스테롤
            HDLC: string | null //HDLC
            LDLC: string | null //LDLC
            TG: string | null //중성지방
        }
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const handleInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const prevInputState = pageState.input

        if (e.target.name === 'FBS' && !_.isEmpty(prevInputState.PP2)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.mydataFBSPP2,
            })

            return
        }

        if (e.target.name === 'PP2' && !_.isEmpty(prevInputState.FBS)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.mydataFBSPP2,
            })

            return
        }

        setPageState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [e.target.name]: e.target.value ? e.target.value : null,
            },
        }))
    }

    const handleInputSave = async () => {
        if (pageState.input.FBS && pageState.input.PP2) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.mydataFBSPP2,
            })

            return
        }

        if (userinfo.MBER_NO) {
            const payload: {
                MBER_NO: number
                REGIST_MBER_NO: number // 작성자 회원번호
                MESURE_DE: string // 측정일
                MESURE_TIME: string //측정시분초
                SLM: string // 근육량
                PBF: string // 체지방률
                VFL: string // 내장지방(레벨)
                EST_BN_MAS: string // 추정골량
                BMI: string // BMI
                HEIGHT: string // 신장
                BDWGH: string //몸무게
                WAIST_CRCMFRNC: string // 허리둘레
                BDHEAT: string //체온
                SYSTOLIC: string // 수축기
                DIASTOLIC: string /// 이완기
                PULS: string // 맥박
                FBS?: string // 식전혈당
                PP2?: string //식후혈당
                T_CHOL: string // 총콜레스테롤
                HDLC: string //HDLC
                LDLC: string //LDLC
                TG: string //중성지방
            } = {
                MBER_NO: MemberNo,
                REGIST_MBER_NO: userinfo.MBER_NO,
                MESURE_DE: pageState.input.MESURE_DE.substring(0, 8),
                MESURE_TIME: pageState.input.MESURE_TIME.substring(8, 14),
                SLM: pageState.input.SLM !== null ? pageState.input.SLM : '',
                PBF: pageState.input.PBF !== null ? pageState.input.PBF : '',
                VFL: pageState.input.VFL !== null ? pageState.input.VFL : '',
                EST_BN_MAS:
                    pageState.input.EST_BN_MAS !== null
                        ? pageState.input.EST_BN_MAS
                        : '',
                BMI: pageState.input.BMI !== null ? pageState.input.BMI : '',
                HEIGHT:
                    pageState.input.HEIGHT !== null
                        ? pageState.input.HEIGHT
                        : '',
                BDWGH:
                    pageState.input.BDWGH !== null ? pageState.input.BDWGH : '',
                WAIST_CRCMFRNC:
                    pageState.input.WAIST_CRCMFRNC !== null
                        ? pageState.input.WAIST_CRCMFRNC
                        : '',
                BDHEAT:
                    pageState.input.BDHEAT !== null
                        ? pageState.input.BDHEAT
                        : '',
                SYSTOLIC:
                    pageState.input.SYSTOLIC !== null
                        ? pageState.input.SYSTOLIC
                        : '',
                DIASTOLIC:
                    pageState.input.DIASTOLIC !== null
                        ? pageState.input.DIASTOLIC
                        : '',
                PULS: pageState.input.PULS !== null ? pageState.input.PULS : '',
                FBS: pageState.input.FBS !== null ? pageState.input.FBS : '',
                PP2: pageState.input.PP2 !== null ? pageState.input.PP2 : '',
                T_CHOL:
                    pageState.input.T_CHOL !== null
                        ? pageState.input.T_CHOL
                        : '',
                HDLC: pageState.input.HDLC !== null ? pageState.input.HDLC : '',
                LDLC: pageState.input.LDLC !== null ? pageState.input.LDLC : '',
                TG: pageState.input.TG !== null ? pageState.input.TG : '',
            }

            if (payload.FBS !== '') {
                delete payload.PP2
            } else if (payload.PP2 !== '') {
                delete payload.FBS
            }

            const { status } = await postDataMesureInfoManual(payload)

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    // useEffect(() => {
    //     const funcSetState = () => {
    //         // console.debug(Codes.myData, MemberNo)
    //     }
    //
    //     funcSetState()
    // }, [MemberNo])

    // useEffect(() => {
    //     console.debug(pageState.input)
    // }, [pageState])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <>
                        <div className="py-2 text-left text-2xl">
                            마이데이터 수기입력
                        </div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2 items-center gap-2">
                                <VaryDatepickerInput
                                    Value={changeDatePickerDate(
                                        pageState.input.MESURE_DE
                                    )}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            input: {
                                                ...prevState.input,
                                                MESURE_DE: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}${dateObj.hourPad}${dateObj.minutePad}${dateObj.secondPad}`,
                                            },
                                        }))
                                    }}
                                />
                                ~
                                <VaryDatepickerInput
                                    Value={changeDatePickerDate(
                                        pageState.input.MESURE_TIME
                                    )}
                                    ContentsType={`time`}
                                    DateFormat={'h:mm'}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            input: {
                                                ...prevState.input,
                                                MESURE_TIME: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}${dateObj.hourPad}${dateObj.minutePad}${dateObj.secondPad}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 border">
                            {Codes.myData
                                .filter(
                                    e =>
                                        e.key !== '0050' &&
                                        e.key !== '0060' &&
                                        e.key !== '0080'
                                )
                                .map((el, index) => {
                                    return (
                                        <table
                                            className="table-fixed border"
                                            key={`member-mydata-input-modal-table-${index}`}>
                                            <tbody>
                                                {el.list
                                                    .filter(
                                                        e =>
                                                            e.keyCode !==
                                                            undefined
                                                    )
                                                    .map((e, i) => {
                                                        return (
                                                            <tr
                                                                className="border max-h-8"
                                                                key={`member-mydata-input-modal-table-row-item-${index}-${i}`}>
                                                                {i === 0 && (
                                                                    <td
                                                                        className="border w-1/4 text-xs"
                                                                        rowSpan={
                                                                            el
                                                                                .list
                                                                                .length
                                                                        }>
                                                                        {
                                                                            el.name
                                                                        }
                                                                    </td>
                                                                )}

                                                                <td className="border w-1/4 text-xs max-h-8">
                                                                    {e.name}
                                                                </td>
                                                                <td className="border w-2/4 max-h-8">
                                                                    <VaryInput
                                                                        Value={
                                                                            _.get(
                                                                                pageState.input,
                                                                                e.keyCode as string
                                                                            )
                                                                                ? _.get(
                                                                                      pageState.input,
                                                                                      e.keyCode as string
                                                                                  )
                                                                                : ''
                                                                        }
                                                                        Name={
                                                                            e.keyCode
                                                                        }
                                                                        Placeholder={
                                                                            e.name
                                                                        }
                                                                        HandleOnChange={e =>
                                                                            handleInputUpdate(
                                                                                e
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    )
                                })}
                        </div>
                    </>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'취소'}
                            HandleClick={() => CancleButtonClick()}
                        />
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'저장'}
                            HandleClick={() =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        confirm: true,
                                    },
                                }))
                            }
                        />
                    </>
                }
            />
            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.memberConfirmMesure}
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
                        handleInputSave().then()
                    }}
                />
            )}
        </>
    )
}

export default MemberMyDataInputModal
