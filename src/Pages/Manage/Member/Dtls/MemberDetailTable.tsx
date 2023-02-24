import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
    getMbtlnum,
    mberUnityUpdate,
    postInstPstinst,
    postMberStplatInfoUpdate,
    postMemberInfoUpdate,
    postMemberPstinstLeave,
    postPasswordReset,
} from '@Service/MemberService'
import { MemberDetailState } from '@Recoil/MemberPagesState'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { WapperStyle as WS } from '@Style/Pages/CommonStyle'
import {
    ConfirmModal,
    PhoneAuthModal,
    PstinstAgreeModal,
    PstinstSelector,
    StplatInfoAgreeModal,
    TotalCashModal,
    TotalScoreModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
    VaryModal,
    VaryTextArea,
} from '@Elements'
import { getOnlyNumber, gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import {
    StplatItemInterface,
    ThptyStplatInfoInterface,
} from '@Type/MemberTypes'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    InputCellFull,
} = DetailTableStyle
const {
    DetailContainer,
    PstinstInfoList: P,
    ButtonBox,
    ButtonItem,
    PstinstLeaveModalContentBox,
    PstinstLeaveModalContentMessage,
} = DetailPageStyle

const initializeState = {
    MbtlnumCheck: false,
    UseStplatAgreAt: {
        state: false,
        text: null,
    },
    modal: {
        phoneDuplicate: {
            title: ``,
            state: false,
        },
        phoneAuth: {
            title: ``,
            state: false,
        },
        unityUpdate: {
            title: ``,
            state: false,
        },
        useStplatAgreAt: false,
        changePassword: {
            title: ``,
            state: false,
        },
        pstinstInfoListLeave: {
            title: ``,
            state: false,
        },
        pstinstInfoListLeaveConfirm: {
            title: ``,
            state: false,
        },
        pstinstSelector: {
            state: false,
        },
        pstinstAgree: {
            state: false,
        },
        pstinstAgreeConfirm: {
            state: false,
        },
        totalScore: {
            state: false,
        },
        totCash: {
            state: false,
        },
        phoneAuthVal: {
            state: false,
        },
        updateAttempt: {
            state: false,
        },
    },
    addSelectPstinst: {
        instNo: null,
        instNm: null,
    },
}

const MemberDetailTable = ({
    HandleGetInfo,
}: {
    HandleGetInfo: (memNo: number) => void
}) => {
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(MemberDetailState)
    const { handlMainAlert, handleOutletLoading } = useMainLayouts()

    const inputPhoneNumberRef = useRef<HTMLInputElement>()

    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [pageState, setPageState] = useState<{
        MbtlnumCheck: boolean
        UseStplatAgreAt: {
            state: boolean
            text: '선택' | '필수' | null
        }
        modal: {
            phoneDuplicate: {
                title: string
                state: boolean
            }
            phoneAuth: {
                title: string
                state: boolean
            }
            unityUpdate: {
                title: string
                state: boolean
            }
            useStplatAgreAt: boolean
            changePassword: {
                title: string
                state: boolean
            }
            pstinstInfoListLeave: {
                title: string
                state: boolean
            }
            pstinstInfoListLeaveConfirm: {
                title: string
                state: boolean
            }
            pstinstSelector: {
                state: boolean
            }
            pstinstAgree: {
                state: boolean
            }
            pstinstAgreeConfirm: {
                state: boolean
            }
            totalScore: {
                state: boolean
            }
            totCash: {
                state: boolean
            }
            phoneAuthVal: {
                state: boolean
            }
            updateAttempt: {
                state: boolean
            }
        }
        addSelectPstinst: {
            instNo: number | null
            instNm: string | null
        }
    }>(initializeState)

    const hadleMemberStplatInfoUpdate = async (e: StplatItemInterface) => {
        if (detailState.origin.MBER_NO) {
            const { status } = await postMberStplatInfoUpdate({
                MBER_NO: detailState.origin.MBER_NO,
                USE_STPLAT_AGRE_AT:
                    e.USE_STPLAT_AGRE_AT == 'Y' ? e.USE_STPLAT_AGRE_AT : 'N',
                INDVDLINFO_AGRE_AT:
                    e.INDVDLINFO_AGRE_AT == 'Y' ? e.INDVDLINFO_AGRE_AT : 'N',
                SNSTIIVEINFO_AGRE_AT:
                    e.SNSTIIVEINFO_AGRE_AT == 'Y'
                        ? e.SNSTIIVEINFO_AGRE_AT
                        : 'N',
                MARKTINFO_AGRE_AT:
                    e.MARKTINFO_AGRE_AT == 'Y' ? e.MARKTINFO_AGRE_AT : 'N',
                INDVDLINFO_THIRD_AGRE_AT:
                    e.INDVDLINFO_THIRD_AGRE_AT == 'Y'
                        ? e.INDVDLINFO_THIRD_AGRE_AT
                        : 'N',
                SNSTIIVEINFO_THIRD_AGRE_AT:
                    e.SNSTIIVEINFO_THIRD_AGRE_AT == 'Y'
                        ? e.SNSTIIVEINFO_THIRD_AGRE_AT
                        : 'N',
                MARKTINFO_PURPOSE_AGRE_AT:
                    e.MARKTINFO_PURPOSE_AGRE_AT == 'Y'
                        ? e.MARKTINFO_PURPOSE_AGRE_AT
                        : 'N',
            })

            if (status) {
                if (detailState.origin.MBER_NO) {
                    HandleGetInfo(detailState.origin.MBER_NO)
                }
                handlMainAlert({
                    state: true,
                    message: Messages.Default.stplatSuccess,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
            setPageState(prevState => ({
                ...prevState,
                modal: {
                    ...prevState.modal,
                    useStplatAgreAt: false,
                },
            }))
        }
    }

    // 휴대폰 번호 변경.
    const handleChangeMbtlnum = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailState(prevState => ({
            ...prevState,
            detail: {
                ...prevState.detail,
                MBTLNUM: e.target.value,
            },
            phoneAuth: false,
        }))
    }

    // 휴대폰번호 중복 체크.
    const handleGetMbtlnum = async () => {
        if (detailState.detail.MBTLNUM) {
            const { status, payload } = await getMbtlnum({
                mbtlnum: getOnlyNumber(detailState.detail.MBTLNUM),
            })

            if (!status) {
                // 에러 처리.
            }

            if (payload.MBER_MBTLNUM_USE_AT === 'Y') {
                // 중복 일때.
                setPageState(prevState => ({
                    ...prevState,
                    modal: {
                        ...prevState.modal,
                        phoneDuplicate: {
                            title: `${detailState.detail.MBTLNUM} ${Messages.Default.phoneAuth.duplicate}`,
                            state: true,
                        },
                    },
                }))
            } else {
                // 중복 아닐때.
                handleMbtlnumCrtfc()
            }
        }
    }

    // 인증 번호 전송 처리.
    const handleMbtlnumCrtfc = () => {
        if (detailState.detail.MBTLNUM) {
            setPageState(prevState => ({
                ...prevState,
                modal: {
                    ...prevState.modal,
                    phoneDuplicate: initializeState.modal.phoneDuplicate,
                    phoneAuth: {
                        title: detailState.detail.MBTLNUM
                            ? getOnlyNumber(detailState.detail.MBTLNUM)
                            : '',
                        state: true,
                    },
                },
            }))
        }
    }

    // 데이터 통합 처리.
    const handleMemberUnityUpdate = async () => {
        handleOutletLoading(true)
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                unityUpdate: {
                    state: false,
                    title: ``,
                },
            },
        }))

        if (detailState.origin.MBTLNUM && detailState.origin.MBER_NO) {
            const { status } = await mberUnityUpdate({
                mbtlnum: getOnlyNumber(detailState.origin.MBTLNUM),
                mbrno: String(detailState.origin.MBER_NO),
            })

            if (status) {
                handlMainAlert({
                    state: true,
                    message:
                        Messages.Default.member.unityChange.unityUpdateSuccess,
                })
                HandleGetInfo(detailState.origin.MBER_NO)
            } else {
                handlMainAlert({
                    state: true,
                    message:
                        Messages.Default.member.unityChange.unityUpdateFail,
                })
            }
        }

        handleOutletLoading(false)
    }

    // 소속 처리 후 처리.
    const handlePstinstLeave = async () => {
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                pstinstInfoListLeave:
                    initializeState.modal.pstinstInfoListLeave,
                pstinstInfoListLeaveConfirm:
                    initializeState.modal.pstinstInfoListLeaveConfirm,
            },
        }))
        setDetailState(prevState => ({
            ...prevState,
            pstinstLeave: {
                selectNo: null,
                text: null,
            },
        }))
        if (detailState.origin.MBER_NO) {
            HandleGetInfo(detailState.origin.MBER_NO)
        }
    }

    // 회원 정보 업데이트 처리
    const handleMemberInfoUpdate = async () => {
        if (isEmpty(detailState.detail.NM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.validation.name,
            })

            return
        }

        if (isEmpty(detailState.detail.MBTLNUM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.validation.phoneNumer,
            })
            return
        }

        const {
            MBER_NO,
            NM,
            BRTHDY,
            SEX,
            MBTLNUM,
            EMAIL_ADRES,
            MBTLNUM_CRTFC_AT,
            WORK_TY_CODE,
            MEMO,
        } = detailState.detail

        if (MBER_NO) {
            const payload = {
                MBER_NO: MBER_NO,
                NM: NM ? NM : '',
                BRTHDY: BRTHDY ? getOnlyNumber(BRTHDY) : '',
                SEXDSTN: SEX ? SEX : 'M',
                MBTLNUM: MBTLNUM ? getOnlyNumber(MBTLNUM) : '',
                EMAIL_ADRES: EMAIL_ADRES ? EMAIL_ADRES : '',
                MBTLNUM_CRTFC_AT: MBTLNUM_CRTFC_AT ? MBTLNUM_CRTFC_AT : 'N',
                WORK_TY_CODE: WORK_TY_CODE,
                MEMO: MEMO ? MEMO : '',
            }

            const { status } = await postMemberInfoUpdate(payload)

            if (status) {
                HandleGetInfo(MBER_NO)
                handlMainAlert({
                    state: true,
                    message: Messages.Default.member.infoUpdateSuccess,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: '1' + Messages.Default.processFail,
                })
            }

            return
        }

        handlMainAlert({
            state: true,
            message: '2' + Messages.Default.processFail,
        })
        return
    }

    // 저장하기 버튼 클릭.
    const handleClickUpdateButton = () => {
        handleMemberInfoUpdate().then()
    }

    useEffect(() => {
        // 휴대폰 번호 변경 되었는지 체크
        const funcCheckMbtlnum = () => {
            if (detailState.detail.MBTLNUM !== detailState.origin.MBTLNUM) {
                setDetailState(prevState => ({
                    ...prevState,
                    detail: {
                        ...prevState.detail,
                        MBTLNUM_CRTFC_AT: 'N',
                    },
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    detail: {
                        ...prevState.detail,
                        MBTLNUM_CRTFC_AT: detailState.origin.MBTLNUM_CRTFC_AT,
                    },
                }))
            }
        }

        funcCheckMbtlnum()
    }, [
        detailState.detail.MBTLNUM,
        detailState.origin.MBTLNUM,
        detailState.origin.MBTLNUM_CRTFC_AT,
        setDetailState,
    ])

    useEffect(() => {
        // 데이터 통합 가능한지 체크.
        const funcCheckMbtlnumCnt = () => {
            const { MBTLNUM_CRTFC_AT, MBTLNUM_CNT } = detailState.origin

            if (
                MBTLNUM_CRTFC_AT &&
                MBTLNUM_CRTFC_AT === 'Y' &&
                MBTLNUM_CNT &&
                MBTLNUM_CNT > 1
            ) {
                setPageState(prevState => ({
                    ...prevState,
                    MbtlnumCheck: true,
                }))
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    MbtlnumCheck: false,
                }))
            }
        }

        // 약관 동의 체크.
        const funcUseStplatAgreAt = () => {
            const {
                USE_STPLAT_AGRE_AT,
                INDVDLINFO_AGRE_AT,
                SNSTIIVEINFO_AGRE_AT,
                INDVDLINFO_THIRD_AGRE_AT,
                SNSTIIVEINFO_THIRD_AGRE_AT,
                MARKTINFO_AGRE_AT,
                MARKTINFO_PURPOSE_AGRE_AT,
            } = detailState.origin

            if (
                USE_STPLAT_AGRE_AT === 'Y' &&
                INDVDLINFO_AGRE_AT === 'Y' &&
                SNSTIIVEINFO_AGRE_AT === 'Y' &&
                INDVDLINFO_THIRD_AGRE_AT === 'Y' &&
                SNSTIIVEINFO_THIRD_AGRE_AT === 'Y' &&
                MARKTINFO_AGRE_AT === 'Y' &&
                MARKTINFO_PURPOSE_AGRE_AT === 'Y'
            ) {
                setPageState(prevState => ({
                    ...prevState,
                    UseStplatAgreAt: {
                        state: false,
                        text: null,
                    },
                }))
                return
            }

            if (
                USE_STPLAT_AGRE_AT !== 'Y' ||
                INDVDLINFO_AGRE_AT !== 'Y' ||
                SNSTIIVEINFO_AGRE_AT !== 'Y' ||
                INDVDLINFO_THIRD_AGRE_AT !== 'Y' ||
                SNSTIIVEINFO_THIRD_AGRE_AT !== 'Y'
            ) {
                setPageState(prevState => ({
                    ...prevState,
                    UseStplatAgreAt: {
                        state: true,
                        text: '필수',
                    },
                }))
                return
            }

            if (
                MARKTINFO_AGRE_AT !== 'Y' ||
                MARKTINFO_PURPOSE_AGRE_AT !== 'Y'
            ) {
                setPageState(prevState => ({
                    ...prevState,
                    UseStplatAgreAt: {
                        state: true,
                        text: '선택',
                    },
                }))
                return
            }

            setPageState(prevState => ({
                ...prevState,
                UseStplatAgreAt: {
                    state: false,
                    text: null,
                },
            }))
            return
        }

        funcUseStplatAgreAt()
        funcCheckMbtlnumCnt()
    }, [
        detailState.detail.MBTLNUM_CNT,
        detailState.detail.MBTLNUM_CRTFC_AT,
        detailState.origin,
    ])

    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`이름`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                HandleOnChange={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        detail: {
                                            ...prevState.detail,
                                            NM: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'이름'}
                                Value={
                                    detailState.detail.NM
                                        ? detailState.detail.NM
                                        : ``
                                }
                                Children={
                                    <>
                                        {pageState.UseStplatAgreAt.state && (
                                            <WS.FlexRightButton>
                                                <VaryButton
                                                    ButtonType={`default`}
                                                    ButtonName={`미동의 약관 (${pageState.UseStplatAgreAt.text})`}
                                                    HandleClick={() =>
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                modal: {
                                                                    ...prevState.modal,
                                                                    useStplatAgreAt:
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </WS.FlexRightButton>
                                        )}
                                    </>
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`회원번호`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                HandleOnChange={() => {
                                    //
                                }}
                                id={'id'}
                                Placeholder={'회원번호'}
                                Value={
                                    detailState.detail.MBER_NO
                                        ? detailState.detail.MBER_NO
                                        : ``
                                }
                                Disabled={true}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`핸드폰번호`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Ref={inputPhoneNumberRef}
                                Width={'w60'}
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChangeMbtlnum(e)}
                                id={'id'}
                                Placeholder={'핸드폰번호'}
                                Value={
                                    detailState.detail.MBTLNUM
                                        ? detailState.detail.MBTLNUM
                                        : ``
                                }
                                Children={
                                    <>
                                        <WS.FlexRightButton>
                                            <VaryButton
                                                ButtonType={`default`}
                                                ButtonName={
                                                    detailState.detail
                                                        .MBTLNUM_CRTFC_AT &&
                                                    detailState.detail
                                                        .MBTLNUM_CRTFC_AT ===
                                                        'Y'
                                                        ? `재인증`
                                                        : `미인증`
                                                }
                                                HandleClick={() =>
                                                    handleGetMbtlnum().then()
                                                }
                                            />
                                        </WS.FlexRightButton>
                                        {pageState.MbtlnumCheck && (
                                            <WS.FlexRightButton>
                                                <VaryButton
                                                    ButtonType={`default`}
                                                    ButtonName={`데이터통합`}
                                                    HandleClick={() =>
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                modal: {
                                                                    ...prevState.modal,
                                                                    unityUpdate:
                                                                        {
                                                                            title: Messages
                                                                                .Default
                                                                                .member
                                                                                .unityChange
                                                                                .unityUpdate,
                                                                            state: true,
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </WS.FlexRightButton>
                                        )}
                                    </>
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`이메일`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                HandleOnChange={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        detail: {
                                            ...prevState.detail,
                                            EMAIL_ADRES: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'이메일'}
                                Value={
                                    detailState.detail.EMAIL_ADRES
                                        ? detailState.detail.EMAIL_ADRES
                                        : ``
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`생년월일`} />
                        </LabelCell>
                        <InputCell>
                            <VaryDatepickerInput
                                InputeType={'default'}
                                Width={`w60`}
                                Value={
                                    detailState.detail.BRTHDY
                                        ? new Date(detailState.detail.BRTHDY)
                                        : null
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        detail: {
                                            ...prevState.detail,
                                            BRTHDY: `${year}-${monthPad}-${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`성별`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FlexNoWarapGap>
                                <VaryLabelRadioButton
                                    LabelName={`남성`}
                                    Checked={
                                        !!(
                                            detailState.detail.SEX &&
                                            detailState.detail.SEX === 'M'
                                        )
                                    }
                                    HandleOnChange={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            detail: {
                                                ...prevState.detail,
                                                SEX: e.target.checked
                                                    ? 'M'
                                                    : 'F',
                                            },
                                        }))
                                    }
                                />

                                <VaryLabelRadioButton
                                    LabelName={`여성`}
                                    Checked={
                                        !!(
                                            detailState.detail.SEX &&
                                            detailState.detail.SEX === 'F'
                                        )
                                    }
                                    HandleOnChange={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            detail: {
                                                ...prevState.detail,
                                                SEX: e.target.checked
                                                    ? 'F'
                                                    : 'M',
                                            },
                                        }))
                                    }
                                />
                            </WS.FlexNoWarapGap>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`가입일자`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                HandleOnChange={() => {
                                    //
                                }}
                                id={'id'}
                                Placeholder={'가입일자'}
                                Value={
                                    detailState.detail.REGIST_DT
                                        ? detailState.detail.REGIST_DT
                                        : ``
                                }
                                Disabled={true}
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`아이디`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                HandleOnChange={() => {
                                    //
                                }}
                                id={'id'}
                                Placeholder={'아이디'}
                                Value={
                                    detailState.detail.USID
                                        ? detailState.detail.USID
                                        : ``
                                }
                                Disabled={true}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`내몸관리지수`} />
                        </LabelCell>
                        <InputCell>
                            <VaryButton
                                ButtonType={`info`}
                                ButtonName={`${
                                    detailState.detail.TOT_SCORE
                                        ? detailState.detail.TOT_SCORE
                                        : '0.0'
                                }`}
                                HandleClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            totalScore: {
                                                state: true,
                                            },
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`캐쉬`} />
                        </LabelCell>
                        <InputCell>
                            <VaryButton
                                ButtonType={`info`}
                                ButtonName={`${
                                    detailState.detail.TOT_CASH
                                        ? detailState.detail.TOT_CASH
                                        : '0'
                                }`}
                                HandleClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            totCash: {
                                                state: true,
                                            },
                                        },
                                    }))
                                }}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`비밀번호`} />
                        </LabelCell>
                        <InputCell>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={`비밀번호 초기화`}
                                HandleClick={() => {
                                    if (
                                        !(
                                            detailState.detail
                                                .MBTLNUM_CRTFC_AT &&
                                            detailState.detail
                                                .MBTLNUM_CRTFC_AT === 'Y'
                                        )
                                    ) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.phoneAuth
                                                    .authYet,
                                        })
                                        return
                                    }

                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            changePassword: {
                                                title: `${Messages.Default.member.password.change}`,
                                                state: true,
                                            },
                                        },
                                    }))
                                }}
                            />
                        </InputCell>
                        {mainLayoutState.Theme === 'GeonDaon' ? (
                            <>
                                <LabelCell>
                                    <VaryLabel LabelName={`내/외근직`} />
                                </LabelCell>
                                <InputCell>
                                    <WS.FlexNoWarapGap>
                                        <VaryLabelRadioButton
                                            LabelName={`내근직`}
                                            Checked={
                                                detailState.detail
                                                    .WORK_TY_CODE === 'I'
                                            }
                                            HandleOnChange={() =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        WORK_TY_CODE: 'I',
                                                    },
                                                }))
                                            }
                                        />

                                        <VaryLabelRadioButton
                                            LabelName={`외근직`}
                                            Checked={
                                                detailState.detail
                                                    .WORK_TY_CODE === 'O'
                                            }
                                            HandleOnChange={() =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        WORK_TY_CODE: 'O',
                                                    },
                                                }))
                                            }
                                        />
                                    </WS.FlexNoWarapGap>
                                </InputCell>
                            </>
                        ) : (
                            <>
                                <LabelCell></LabelCell>
                                <InputCell></InputCell>
                            </>
                        )}
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel
                                LabelName={`소속정보`}
                                Children={
                                    <VaryButton
                                        ButtonType={`default`}
                                        ButtonName={`추가`}
                                        HandleClick={() =>
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    pstinstSelector: {
                                                        state: true,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                }
                            />
                        </LabelCell>
                        <InputCellFull colSpan={3}>
                            <P.Container>
                                <P.Table>
                                    <P.Tbody>
                                        {detailState.detail.PSTINST_INFO_LIST &&
                                            detailState.detail.PSTINST_INFO_LIST.map(
                                                (el, index) => {
                                                    return (
                                                        <P.TableRow
                                                            key={`member-detail-pstinst-table-row-item-${index}`}
                                                            BgState={
                                                                index % 2 === 0
                                                            }>
                                                            <P.TableCell>
                                                                {el.INST_NO}
                                                            </P.TableCell>
                                                            <P.TableCell>
                                                                {el.INST_NM}
                                                            </P.TableCell>
                                                            <P.TableCell>
                                                                {el.CONFM_DE}
                                                            </P.TableCell>
                                                            <P.TableCell>
                                                                <VaryButton
                                                                    ButtonType={`default`}
                                                                    ButtonName={`소속 탈퇴`}
                                                                    HandleClick={() => {
                                                                        setDetailState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                pstinstLeave:
                                                                                    {
                                                                                        selectNo:
                                                                                            el.INST_NO,
                                                                                        text: null,
                                                                                    },
                                                                            })
                                                                        )
                                                                        setPageState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                modal: {
                                                                                    ...prevState.modal,
                                                                                    pstinstInfoListLeave:
                                                                                        {
                                                                                            title: `${Messages.Default.member.pstinstLeave.confirm}`,
                                                                                            state: true,
                                                                                        },
                                                                                },
                                                                            })
                                                                        )
                                                                    }}
                                                                />
                                                            </P.TableCell>
                                                        </P.TableRow>
                                                    )
                                                }
                                            )}
                                    </P.Tbody>
                                </P.Table>
                            </P.Container>
                        </InputCellFull>
                    </Row>
                </TableWapper>
            </TableContainer>

            <ButtonBox>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`회원정보 저장하기`}
                        HandleClick={() => {
                            if (
                                detailState.detail.MBTLNUM !==
                                    detailState.origin.MBTLNUM &&
                                !detailState.phoneAuth
                            ) {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        phoneAuthVal: { state: true },
                                    },
                                }))
                            } else {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        updateAttempt: {
                                            state: true,
                                        },
                                    },
                                }))
                            }
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`목록으로`}
                        HandleClick={() => {
                            navigate({
                                pathname: `${process.env.PUBLIC_URL}/manage/member/member-list`,
                            })
                        }}
                    />
                </ButtonItem>
            </ButtonBox>
            <>
                {pageState.modal.updateAttempt.state && (
                    <ConfirmModal
                        Title={Messages.Default.member.infoUpdate}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    updateAttempt: {
                                        state: false,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    updateAttempt: {
                                        state: false,
                                    },
                                },
                            }))
                            handleClickUpdateButton()
                        }}
                    />
                )}

                {/*휴대폰 번호 변경 미인증 확인 모달*/}
                {pageState.modal.phoneAuthVal.state && (
                    <ConfirmModal
                        Title={Messages.Default.phoneAuth.authConfirm}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`회원정보 저장하기`}
                        CancleButtonClick={() => {
                            inputPhoneNumberRef.current?.focus()
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuthVal: {
                                        state: false,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuthVal: {
                                        state: false,
                                    },
                                },
                            }))
                            handleMemberInfoUpdate().then()
                        }}
                    />
                )}

                {/*캐쉬 모달*/}
                {pageState.modal.totCash.state && (
                    <TotalCashModal
                        MemberNo={Number(detailState.origin.MBER_NO)}
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    totCash: {
                                        state: false,
                                    },
                                },
                            }))
                        }
                    />
                )}

                {/*내몸관리 지수 모달*/}
                {pageState.modal.totalScore.state && (
                    <TotalScoreModal
                        MemberNo={Number(detailState.origin.MBER_NO)}
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    totalScore: {
                                        state: false,
                                    },
                                },
                            }))
                        }
                    />
                )}
                {/*소속 추가 확인 모달*/}
                {pageState.modal.pstinstAgreeConfirm.state && (
                    <ConfirmModal
                        Title={Messages.Default.member.pstinstAdd.agreeConfirm}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstAgree: {
                                        state: true,
                                    },
                                    pstinstAgreeConfirm: {
                                        state: false,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={async () => {
                            if (pageState.addSelectPstinst.instNo !== null) {
                                const { status } = await postInstPstinst({
                                    instNo: pageState.addSelectPstinst.instNo,
                                    mberNo: Number(detailState.origin.MBER_NO),
                                })
                                if (status) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default.member.pstinstAdd
                                                .addSuccess,
                                    })
                                    if (detailState.origin.MBER_NO) {
                                        HandleGetInfo(
                                            detailState.origin.MBER_NO
                                        )
                                    }
                                } else {
                                    handlMainAlert({
                                        state: true,
                                        message: Messages.Default.processFail,
                                    })
                                }
                            } else {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.processFail,
                                })
                            }

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    addSelectPstinst: {
                                        instNo: null,
                                        instNm: null,
                                    },
                                    pstinstAgree: {
                                        state: false,
                                    },
                                    pstinstAgreeConfirm: {
                                        state: false,
                                    },
                                },
                            }))
                        }}
                    />
                )}

                {/*소속 추가시 약관 모달*/}
                {pageState.modal.pstinstAgree.state && (
                    <PstinstAgreeModal
                        infoNo={pageState.addSelectPstinst.instNo}
                        HandleClickCancleButtion={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstAgree: {
                                        state: false,
                                    },
                                    pstinstSelector: {
                                        state: true,
                                    },
                                },
                            }))
                        }
                        HandleClickApplyButton={(
                            e: ThptyStplatInfoInterface
                        ) => {
                            const filtered = Object.entries(e).filter(
                                ([, value]) => value === 'Y'
                            )

                            if (Object.keys(e).length !== filtered.length) {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.notAllAgree,
                                })

                                return
                            }
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstAgree: {
                                        state: false,
                                    },
                                    pstinstAgreeConfirm: {
                                        state: true,
                                    },
                                },
                            }))
                        }}
                    />
                )}
                {/*소속 선택*/}
                {pageState.modal.pstinstSelector.state && (
                    <PstinstSelector
                        SelectorType={`OnlyModal`}
                        HandleSelectValue={({ instNo, instNm }) => {
                            setPageState(prevState => ({
                                ...prevState,
                                addSelectPstinst: {
                                    instNo: instNo,
                                    instNm: instNm,
                                },
                                modal: {
                                    ...prevState.modal,
                                    pstinstSelector: {
                                        state: false,
                                    },
                                    pstinstAgree: {
                                        state: true,
                                    },
                                },
                            }))
                        }}
                        HandleCancleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstSelector: {
                                        state: false,
                                    },
                                },
                            }))
                        }}
                    />
                )}

                {/*소속 탈퇴 처리 확인*/}
                {pageState.modal.pstinstInfoListLeaveConfirm.state && (
                    <ConfirmModal
                        Title={
                            pageState.modal.pstinstInfoListLeaveConfirm.title
                        }
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstInfoListLeaveConfirm: {
                                        title: ``,
                                        state: false,
                                    },
                                    pstinstInfoListLeave: {
                                        ...prevState.modal.pstinstInfoListLeave,
                                        state: true,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={async () => {
                            if (
                                detailState.pstinstLeave.text &&
                                detailState.pstinstLeave.text !== '' &&
                                detailState.pstinstLeave.selectNo
                            ) {
                                const { status } = await postMemberPstinstLeave(
                                    {
                                        mbrNo: Number(
                                            detailState.origin.MBER_NO
                                        ),
                                        instNo: detailState.pstinstLeave
                                            .selectNo,
                                        leaveText:
                                            detailState.pstinstLeave.text,
                                    }
                                )
                                if (status) {
                                    handlePstinstLeave().then(() => {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.member
                                                    .pstinstLeave.leaveSuccess,
                                        })
                                    })
                                } else {
                                    handlePstinstLeave().then(() => {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.processFail,
                                        })
                                    })
                                }
                            }
                        }}
                    />
                )}

                {/*소속 탈퇴 처리*/}
                {pageState.modal.pstinstInfoListLeave.state && (
                    <VaryModal
                        MaxWidth={`lg`}
                        ModalLoading={false}
                        NeedMax={false}
                        Children={
                            <PstinstLeaveModalContentBox>
                                <PstinstLeaveModalContentMessage
                                    dangerouslySetInnerHTML={{
                                        __html: `${detailState.origin.NM} ${Messages.Default.member.pstinstLeave.confirm}`,
                                    }}></PstinstLeaveModalContentMessage>
                                <VaryTextArea
                                    Rows={10}
                                    Placeholder={`메모를 입력해 주세요`}
                                    Value={
                                        detailState.pstinstLeave.text
                                            ? detailState.pstinstLeave.text
                                            : ''
                                    }
                                    HandleOnChange={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            pstinstLeave: {
                                                ...prevState.pstinstLeave,
                                                text: e.target.value,
                                            },
                                        }))
                                    }
                                />
                            </PstinstLeaveModalContentBox>
                        }
                        Buttons={
                            <>
                                <VaryButton
                                    ButtonType={'default'}
                                    ButtonName={'취소'}
                                    HandleClick={() => {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                pstinstInfoListLeave: {
                                                    title: ``,
                                                    state: false,
                                                },
                                            },
                                        }))
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            pstinstLeave: {
                                                selectNo: null,
                                                text: null,
                                            },
                                        }))
                                    }}
                                />
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={'확인'}
                                    HandleClick={async () => {
                                        if (
                                            !detailState.pstinstLeave.text ||
                                            detailState.pstinstLeave.text === ''
                                        ) {
                                            handlMainAlert({
                                                state: true,
                                                message:
                                                    Messages.Default.member
                                                        .contentEmpty,
                                            })

                                            return
                                        }

                                        if (
                                            detailState.pstinstLeave.text &&
                                            detailState.pstinstLeave.text !==
                                                '' &&
                                            detailState.pstinstLeave.selectNo
                                        ) {
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    pstinstInfoListLeave: {
                                                        ...prevState.modal
                                                            .pstinstInfoListLeave,
                                                        state: false,
                                                    },
                                                    pstinstInfoListLeaveConfirm:
                                                        {
                                                            title: `${Messages.Default.member.pstinstLeave.confirmModal}`,
                                                            state: true,
                                                        },
                                                },
                                            }))
                                        } else {
                                            // FIXME: 에러 처리.
                                        }
                                    }}
                                />
                            </>
                        }
                    />
                )}
                {/* 비밀번호 초기화 모달 */}
                {pageState.modal.changePassword.state && (
                    <ConfirmModal
                        Title={pageState.modal.changePassword.title}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`보내기`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    changePassword: {
                                        title: ``,
                                        state: false,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={async () => {
                            const { status } = await postPasswordReset({
                                mbrno: Number(detailState.origin.MBER_NO),
                            })
                            if (status) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.member.password
                                            .changeSuccess,
                                })
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        changePassword: {
                                            title: ``,
                                            state: false,
                                        },
                                    },
                                }))
                            } else {
                            }
                        }}
                    />
                )}
                {/* 확인 모달 */}
                {pageState.modal.unityUpdate.state && (
                    <ConfirmModal
                        Title={pageState.modal.unityUpdate.title}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    unityUpdate: {
                                        title: ``,
                                        state: false,
                                    },
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            handleMemberUnityUpdate().then()
                        }}
                    />
                )}
                {/* 휴대폰 번호 중복 모달 */}
                {pageState.modal.phoneDuplicate.state && (
                    <ConfirmModal
                        Title={pageState.modal.phoneDuplicate.title}
                        CancleButtonName={`다시입력`}
                        ApplyButtonName={`맞습니다`}
                        CancleButtonClick={() => {
                            inputPhoneNumberRef.current?.focus()
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneDuplicate:
                                        initializeState.modal.phoneDuplicate,
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            handleMbtlnumCrtfc()
                        }}
                    />
                )}
                {/*휴대폰 번호 인증 모달*/}
                {pageState.modal.phoneAuth.state && (
                    <PhoneAuthModal
                        PhoneNumber={
                            detailState.detail.MBTLNUM
                                ? detailState.detail.MBTLNUM
                                : ``
                        }
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuth: {
                                        title: ``,
                                        state: false,
                                    },
                                },
                            }))
                        }
                        HandleSuccess={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuth: {
                                        title: ``,
                                        state: false,
                                    },
                                },
                            }))
                            setDetailState(prevState => ({
                                ...prevState,
                                detail: {
                                    ...prevState.detail,
                                    MBTLNUM_CRTFC_AT: 'Y',
                                },
                            }))
                        }}
                    />
                )}
                {/*약관 동의 모달*/}
                {pageState.modal.useStplatAgreAt && (
                    <StplatInfoAgreeModal
                        MemberStplatList={{
                            USE_STPLAT_AGRE_AT: detailState.origin
                                .USE_STPLAT_AGRE_AT
                                ? detailState.origin.USE_STPLAT_AGRE_AT
                                : 'N',

                            INDVDLINFO_AGRE_AT: detailState.origin
                                .INDVDLINFO_AGRE_AT
                                ? detailState.origin.INDVDLINFO_AGRE_AT
                                : 'N',

                            SNSTIIVEINFO_AGRE_AT: detailState.origin
                                .SNSTIIVEINFO_AGRE_AT
                                ? detailState.origin.SNSTIIVEINFO_AGRE_AT
                                : 'N',
                            INDVDLINFO_THIRD_AGRE_AT: detailState.origin
                                .INDVDLINFO_THIRD_AGRE_AT
                                ? detailState.origin.INDVDLINFO_THIRD_AGRE_AT
                                : 'N',
                            SNSTIIVEINFO_THIRD_AGRE_AT: detailState.origin
                                .SNSTIIVEINFO_THIRD_AGRE_AT
                                ? detailState.origin.SNSTIIVEINFO_THIRD_AGRE_AT
                                : 'N',
                            MARKTINFO_AGRE_AT: detailState.origin
                                .MARKTINFO_AGRE_AT
                                ? detailState.origin.MARKTINFO_AGRE_AT
                                : 'N',
                            MARKTINFO_PURPOSE_AGRE_AT: detailState.origin
                                .MARKTINFO_PURPOSE_AGRE_AT
                                ? detailState.origin.MARKTINFO_PURPOSE_AGRE_AT
                                : 'N',
                        }}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    useStplatAgreAt: false,
                                },
                            }))
                        }}
                        CallBackResturn={e => {
                            hadleMemberStplatInfoUpdate(e).then()
                        }}
                    />
                )}
            </>
        </DetailContainer>
    )
}

export default MemberDetailTable
