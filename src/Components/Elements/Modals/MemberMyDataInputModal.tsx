import React, { useEffect, useState } from 'react'
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
        HBA1C: null,
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
    Saved,
    CancleButtonClick,
}: {
    MemberNo: number
    Saved: () => void
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
            HBA1C: string | null //당화혈색소
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

        // 당화혈색소 범위체크 4~15
        if (
            !_.isEmpty(pageState.input.HBA1C) &&
            !(
                Number(pageState.input.HBA1C) >= 4 &&
                Number(pageState.input.HBA1C) <= 15
            )
        ) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.rangeHba1c,
            })
            return
        }

        if (userinfo.MBER_NO) {
            const stepPayload: {
                SLM?: number | null // 근육량
                PBF?: number | null // 체지방률
                VFL?: number | null // 내장지방(레벨)
                EST_BN_MAS?: number | null // 추정골량
                BMI?: number | null // BMI
                HEIGHT?: number | null // 신장
                BDWGH?: number | null //몸무게
                WAIST_CRCMFRNC?: number | null // 허리둘레
                BDHEAT?: number | null //체온
                SYSTOLIC?: number | null // 수축기
                DIASTOLIC?: number | null /// 이완기
                PULS?: number | null // 맥박
                FBS?: number | null // 식전혈당
                PP2?: number | null //식후혈당
                HBA1C?: number | null //당화혈색소
                T_CHOL?: number | null // 총콜레스테롤
                HDLC?: number | null //HDLC
                LDLC?: number | null //LDLC
                TG?: number | null //중성지방
            } = {
                SLM: pageState.input.SLM ? Number(pageState.input.SLM) : null,
                PBF: pageState.input.PBF ? Number(pageState.input.PBF) : null,
                VFL: pageState.input.VFL ? Number(pageState.input.VFL) : null,
                EST_BN_MAS: pageState.input.EST_BN_MAS
                    ? Number(pageState.input.EST_BN_MAS)
                    : null,
                BMI: pageState.input.BMI ? Number(pageState.input.BMI) : null,
                HEIGHT: pageState.input.HEIGHT
                    ? Number(pageState.input.HEIGHT)
                    : null,
                BDWGH: pageState.input.BDWGH
                    ? Number(pageState.input.BDWGH)
                    : null,
                WAIST_CRCMFRNC: pageState.input.WAIST_CRCMFRNC
                    ? Number(pageState.input.WAIST_CRCMFRNC)
                    : null,
                BDHEAT: pageState.input.BDHEAT
                    ? Number(pageState.input.BDHEAT)
                    : null,
                SYSTOLIC: pageState.input.SYSTOLIC
                    ? Number(pageState.input.SYSTOLIC)
                    : null,
                DIASTOLIC: pageState.input.DIASTOLIC
                    ? Number(pageState.input.DIASTOLIC)
                    : null,
                PULS: pageState.input.PULS
                    ? Number(pageState.input.PULS)
                    : null,
                FBS: pageState.input.FBS ? Number(pageState.input.FBS) : null,
                PP2: pageState.input.PP2 ? Number(pageState.input.PP2) : null,
                HBA1C: pageState.input.HBA1C
                    ? Number(pageState.input.HBA1C)
                    : null,
                T_CHOL: pageState.input.T_CHOL
                    ? Number(pageState.input.T_CHOL)
                    : null,
                HDLC: pageState.input.HDLC
                    ? Number(pageState.input.HDLC)
                    : null,
                LDLC: pageState.input.LDLC
                    ? Number(pageState.input.LDLC)
                    : null,
                TG: pageState.input.TG ? Number(pageState.input.TG) : null,
            }

            const payload = _.omitBy(stepPayload, _.isNil)

            const { status } = await postDataMesureInfoManual({
                MBER_NO: MemberNo,
                MESURE_DATA: [
                    {
                        ...payload,
                        REGIST_MBER_NO: userinfo.MBER_NO,
                        MESURE_DE: pageState.input.MESURE_DE.substring(0, 8),
                        MESURE_TIME: pageState.input.MESURE_TIME.substring(
                            8,
                            14
                        ),
                    },
                ],
            })

            if (status) {
                Saved()
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

    useEffect(() => {
        setPageState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                MESURE_DE: getNowDateDetail(), // 측정일
                MESURE_TIME: getNowDateDetail(), //측정시분초
            },
        }))
    }, [])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <>
                        <div className="py-2 text-left text-xl">
                            마이데이터 수기입력
                        </div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2 items-center gap-2">
                                <VaryDatepickerInput
                                    InputeType={`default`}
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
                                    ShowType={`time`}
                                    InputeType={`default`}
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
                            ButtonType={'default'}
                            ButtonName={'취소'}
                            HandleClick={() => CancleButtonClick()}
                        />
                        <VaryButton
                            ButtonType={'default'}
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
