import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
    getMbtlnum,
    mberUnityUpdate,
    postInstPstinst,
    postMberStplatInfoUpdate,
    postMemberInfoUpdate,
    postMemberPstinstLeave,
    postPasswordReset,
    getMberCheckUsid,
    postMberMberInfo,
} from '@Service/MemberService'
import { MemberDetailState, MemberListState } from '@Recoil/MemberPagesState'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { WapperStyle as WS } from '@Style/Pages/CommonStyle'
import {
    ConfirmModal,
    ElementLoading,
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
import {
    getOnlyNumber,
    gmtTimeToTimeObject,
    memberUsidCheck,
    stringCodeCheck,
} from '@Helper'
import Messages from '@Messages'
import { useMainLayouts, useTab } from '@Hook/index'
import { StplatItemInterface } from '@Type/MemberTypes'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { AtomRootState } from '@Recoil/AppRootState'

const { TableContainer, TableWapper, Row, LabelCell, InputCell } =
    DetailTableStyle
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
    checkUsid: false,
    UseStplatAgreAt: {
        state: false,
        text: null,
    },
    modal: {
        phoneDuplicate: false,
        phoneAuth: false,
        unityUpdate: false,
        useStplatAgreAt: false,
        changePassword: false,
        pstinstInfoListLeave: false,
        pstinstInfoListLeaveConfirm: false,
        pstinstSelector: false,
        pstinstAgree: false,
        pstinstAgreeConfirm: false,
        totalScore: false,
        totCash: false,
        phoneAuthVal: false,
        confirm: false,
    },
    addSelectPstinst: {
        instNo: null,
        instNm: null,
    },
}

const MemberDetailTable = ({
    PageMode,
    HandleGetInfo,
}: {
    PageMode: string | 'new' | 'modify'
    HandleGetInfo: (memNo: number) => void
}) => {
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(MemberDetailState)
    const memberListState = useSetRecoilState(MemberListState)
    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const inputPhoneNumberRef = useRef<HTMLInputElement>()

    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const atomRootState = useRecoilValue(AtomRootState)

    const [pageState, setPageState] = useState<{
        MbtlnumCheck: boolean
        checkUsid: boolean
        UseStplatAgreAt: {
            state: boolean
            text: '선택' | '필수' | null
        }
        modal: {
            phoneDuplicate: boolean
            phoneAuth: boolean
            unityUpdate: boolean
            useStplatAgreAt: boolean
            changePassword: boolean
            pstinstInfoListLeave: boolean
            pstinstInfoListLeaveConfirm: boolean
            pstinstSelector: boolean
            pstinstAgree: boolean
            pstinstAgreeConfirm: boolean
            totalScore: boolean
            totCash: boolean
            phoneAuthVal: boolean
            confirm: boolean
        }
        addSelectPstinst: {
            instNo: number | null
            instNm: string | null
        }
    }>(initializeState)

    // 회원 약관 업데이트
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
        }
    }

    // 휴대폰 번호 변경.
    const handleChangeMbtlnum = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (PageMode === 'new') {
            setDetailState(prevState => ({
                ...prevState,
                detail: {
                    ...prevState.detail,
                    MBTLNUM: e.target.value,
                },
                origin: {
                    ...prevState.origin,
                    MBTLNUM: e.target.value,
                },
                phoneAuth: false,
            }))
        } else {
            setDetailState(prevState => ({
                ...prevState,
                detail: {
                    ...prevState.detail,
                    MBTLNUM: e.target.value,
                },
                phoneAuth: false,
            }))
        }
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
                        phoneDuplicate: true,
                    },
                }))
            } else {
                // 중복 아닐때.
                handleMbtlnumCrtfc()
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.mbtlnum,
            })
            return
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
                    phoneAuth: true,
                },
            }))
        }
    }

    // 데이터 통합 처리.
    const handleMemberUnityUpdate = async () => {
        setDetailState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                unityUpdate: false,
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

        setDetailState(prevState => ({
            ...prevState,
            status: 'success',
        }))
    }

    // 소속 처리 후 처리.
    const handlePstinstLeave = async () => {
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                pstinstInfoListLeave: false,
                pstinstInfoListLeaveConfirm: false,
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
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const payload = {
                MBER_NO: MBER_NO,
                NM: NM ? NM : '',
                BRTHDY: BRTHDY ? getOnlyNumber(BRTHDY) : '',
                SEXDSTN: SEX,
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

            setDetailState(prevState => ({
                ...prevState,
                status: 'success',
            }))
            return
        }

        handlMainAlert({
            state: true,
            message: Messages.Default.processFail,
        })
        return
    }

    // 신규회원 등록
    const handleNewMember = async () => {
        const {
            detail: {
                USE_STPLAT_AGRE_AT,
                INDVDLINFO_AGRE_AT,
                SNSTIIVEINFO_AGRE_AT,
                INDVDLINFO_THIRD_AGRE_AT,
                SNSTIIVEINFO_THIRD_AGRE_AT,
                MARKTINFO_AGRE_AT,
                MARKTINFO_PURPOSE_AGRE_AT,
                USID,
                PASSWORD,
                NM,
                MBTLNUM,
                MBTLNUM_CRTFC_AT,
                SEX,
                HEIGHT,
                BDWGH,
                WAIST_CRCMFRNC,
                BRTHDY,
            },
        } = detailState

        if (
            BDWGH &&
            BRTHDY &&
            HEIGHT &&
            MBTLNUM &&
            INDVDLINFO_AGRE_AT == 'Y' &&
            MBTLNUM_CRTFC_AT &&
            NM &&
            PASSWORD &&
            SEX &&
            USID &&
            WAIST_CRCMFRNC
        ) {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const payload = {
                BDWGH: BDWGH,
                BMI: 0,
                BRTHDY: BRTHDY.replaceAll('-', ''),
                EMAIL_ADRES: '',
                HEIGHT: HEIGHT,
                INDVDLINFO_AGRE_AT: INDVDLINFO_AGRE_AT,
                INDVDLINFO_THIRD_AGRE_AT: INDVDLINFO_THIRD_AGRE_AT,
                INST_NO: atomRootState.userinfo.INST_NM
                    ? atomRootState.userinfo.INST_NM
                    : '',
                MARKTINFO_AGRE_AT: MARKTINFO_AGRE_AT,
                MARKTINFO_PURPOSE_AGRE_AT: MARKTINFO_PURPOSE_AGRE_AT,
                MBER_PURPS: '',
                MBTLNUM: MBTLNUM,
                MBTLNUM_CRTFC_AT: MBTLNUM_CRTFC_AT,
                NCM: '',
                NM: NM,
                PASSWORD: PASSWORD,
                SBSCRB_COURS_CODE: 'WS',
                SEXDSTN: SEX,
                SNSTIIVEINFO_AGRE_AT: SNSTIIVEINFO_AGRE_AT,
                SNSTIIVEINFO_THIRD_AGRE_AT: SNSTIIVEINFO_THIRD_AGRE_AT,
                TELNO: MBTLNUM,
                USE_STPLAT_AGRE_AT: USE_STPLAT_AGRE_AT,
                USID: USID,
                WAIST_CRCMFRNC: WAIST_CRCMFRNC,
            }

            const { status } = await postMberMberInfo(payload)

            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                }))

                memberListState(prevState => ({
                    ...prevState,
                    status: 'idle',
                }))

                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                handleDeleteTabbyMatchRouter(`/manage/member/new-member`)

                navigate({
                    pathname:
                        process.env.PUBLIC_URL + `/manage/member/member-list`,
                })
                return
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))

                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
                return
            }
        }

        handlMainAlert({
            state: true,
            message: Messages.Default.processFail,
        })
        return
    }

    // 변경하기 버튼 클릭.
    const handleClickUpdateButton = () => {
        if (_.isEmpty(detailState.detail.NM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.validation.name,
            })

            return
        }

        if (_.isEmpty(detailState.detail.MBTLNUM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.validation.phoneNumer,
            })
            return
        }

        // 변경 확인 모달.
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                confirm: true,
            },
        }))
    }

    // 신규 등록 버튼 클릭.
    const handleClickNewButton = () => {
        const {
            detail: {
                USE_STPLAT_AGRE_AT,
                INDVDLINFO_AGRE_AT,
                SNSTIIVEINFO_AGRE_AT,
                INDVDLINFO_THIRD_AGRE_AT,
                SNSTIIVEINFO_THIRD_AGRE_AT,
                MARKTINFO_AGRE_AT,
                MARKTINFO_PURPOSE_AGRE_AT,
                USID,
                PASSWORD,
                PASSWORD_CHK,
                NM,
                MBTLNUM,
                MBTLNUM_CRTFC_AT,
                SEX,
                HEIGHT,
                BDWGH,
                WAIST_CRCMFRNC,
                BRTHDY,
            },
            checkUsid,
        } = detailState

        // 약관 동의 체크.
        if (
            USE_STPLAT_AGRE_AT !== 'Y' ||
            INDVDLINFO_AGRE_AT !== 'Y' ||
            SNSTIIVEINFO_AGRE_AT !== 'Y' ||
            INDVDLINFO_THIRD_AGRE_AT !== 'Y' ||
            SNSTIIVEINFO_THIRD_AGRE_AT !== 'Y' ||
            MARKTINFO_AGRE_AT !== 'Y' ||
            MARKTINFO_PURPOSE_AGRE_AT !== 'Y'
        ) {
            setPageState(prevState => ({
                ...prevState,
                modal: {
                    ...prevState.modal,
                    useStplatAgreAt: true,
                },
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.notAllAgree,
            })
            return
        }

        // 아이디 체크
        if (_.isEmpty(USID)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.usid,
            })
            return
        }

        // 아이디 길이 체크.
        if (!memberUsidCheck(USID)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.usid,
            })
            return
        }

        // 아이디 중복 확인 체크
        if (!checkUsid) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.checkUsid,
            })
            return
        }

        // 비밀번호 체크.
        if (_.isEmpty(PASSWORD)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.password,
            })
            return
        }

        // 비밀번호 확인 체크.
        if (_.isEmpty(PASSWORD_CHK)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.password_chk,
            })
            return
        }

        // 비밀번호 확인 체크
        if (PASSWORD !== PASSWORD_CHK) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.password,
            })
            return
        }

        // 이름 체크.
        if (_.isEmpty(NM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.nm,
            })
            return
        }

        // 휴대폰 번호 체크.
        if (_.isEmpty(MBTLNUM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.mbtlnum,
            })
            return
        }

        // 휴대폰 인증 체크.
        if (MBTLNUM_CRTFC_AT === 'N') {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.mbtlnumCrtfcAt,
            })
            return
        }
        // 성별 체크.
        if (_.isEmpty(SEX)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.sex,
            })
            return
        }

        // 키
        if (Number(HEIGHT) === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.height,
            })
            return
        }

        // 키 입력값 체크.
        if (!(Number(HEIGHT) > 20 && Number(HEIGHT) < 250)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.height,
            })
            return
        }

        // 체중
        if (Number(BDWGH) === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.bdwgh,
            })
            return
        }

        // 체중 입력값 체크.
        if (!(Number(BDWGH) > 1 && Number(BDWGH) < 200)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.bdwgh,
            })
            return
        }

        // 허리둘레
        if (Number(WAIST_CRCMFRNC) === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.empty.waistCrcmfrnc,
            })
            return
        }

        // 허리둘레 입력값 체크.
        if (!(Number(WAIST_CRCMFRNC) > 20 && Number(WAIST_CRCMFRNC) < 150)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.waistCrcmfrnc,
            })
            return
        }

        // 비밀 번호 체크.
        const password = PASSWORD ? PASSWORD : ''

        if (!stringCodeCheck(password)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.passwordCodeCheck,
            })
            return
        }

        const chkPhone = MBTLNUM ? MBTLNUM.substring(3, 7) : ''
        const chkId = USID ? USID : ''
        const chkBirth = BRTHDY
            ? BRTHDY.replaceAll('-', '').substring(4, 8)
            : ''

        // 전화 번호 포함 체크
        if (password.indexOf(chkPhone) > -1) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.passwordPhoneNumber,
            })
            return
        }

        // id 포함 체크
        if (password.indexOf(chkId) > -1) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.passwordId,
            })
            return
        }

        // 생일 포함 체크
        if (password.indexOf(chkBirth) > -1) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.info.check.passwordBirth,
            })
            return
        }

        // 등록 확인 모달.
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                confirm: true,
            },
        }))
    }

    useEffect(() => {
        // 휴대폰 번호 변경 되었는지 체크 회원 정보 수정일때.
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

        if (PageMode === 'modify') {
            funcCheckMbtlnumCnt()
        }
    }, [
        PageMode,
        detailState.detail.MBTLNUM_CNT,
        detailState.detail.MBTLNUM_CRTFC_AT,
        detailState.origin,
    ])

    // 아이디 중복 확인 후 변경 되었을떄.
    useEffect(() => {
        // 중복확인후 변경되면 중복확인 초기화.
        const funcResetCheckUsid = () => {
            setDetailState(prevState => ({
                ...prevState,
                checkUsid: false,
            }))
        }

        // 중복확인후
        const funcChangeCheckUsid = () => {
            setDetailState(prevState => ({
                ...prevState,
                checkUsid: true,
            }))
        }

        if (
            detailState.checkUsid &&
            detailState.origin.USID !== detailState.detail.USID
        ) {
            funcResetCheckUsid()
        } else if (
            !detailState.checkUsid &&
            detailState.origin.USID === detailState.detail.USID
        ) {
            funcChangeCheckUsid()
        }
    }, [
        detailState.checkUsid,
        detailState.detail.USID,
        detailState.origin.USID,
        setDetailState,
    ])

    // FIXME: 최초 페이지 들어 왔을때 약관 동의 모달이 먼저 뜨게 하려면 주석 제거
    // useEffect(() => {
    //     const newPageStart = () => {
    //         // 회원 등록 페이지로 들어 왔을떄 약관 동의 모달
    //         setPageState(prevState => ({
    //             ...prevState,
    //             modal: {
    //                 ...prevState.modal,
    //                 useStplatAgreAt: true,
    //             },
    //         }))
    //     }
    //
    //     if (PageMode === 'new') {
    //         newPageStart()
    //     }
    // }, [PageMode])

    return (
        <DetailContainer>
            {detailState.status === 'loading' ? (
                <div className="h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <TableContainer>
                        <TableWapper>
                            {PageMode === 'new' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`아이디`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <VaryInput
                                            Width={
                                                detailState.checkUsid &&
                                                pageState.UseStplatAgreAt
                                                    ? 'w60'
                                                    : 'w036'
                                            }
                                            HandleOnChange={e =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        USID: e.target.value,
                                                    },
                                                }))
                                            }
                                            Placeholder={'아이디'}
                                            Value={
                                                detailState.detail.USID
                                                    ? detailState.detail.USID
                                                    : ``
                                            }
                                            Children={
                                                <>
                                                    {!detailState.checkUsid && (
                                                        <WS.FlexRightButton>
                                                            <VaryButton
                                                                ButtonType={`default`}
                                                                ButtonName={`아이디 중복 확인`}
                                                                HandleClick={async () => {
                                                                    // 아이디 체크
                                                                    const {
                                                                        USID,
                                                                    } =
                                                                        detailState.detail
                                                                    if (
                                                                        _.isEmpty(
                                                                            USID
                                                                        )
                                                                    ) {
                                                                        handlMainAlert(
                                                                            {
                                                                                state: true,
                                                                                message:
                                                                                    Messages
                                                                                        .Default
                                                                                        .member
                                                                                        .info
                                                                                        .empty
                                                                                        .usid,
                                                                            }
                                                                        )
                                                                        return
                                                                    }

                                                                    // 아이디 길이 체크.
                                                                    if (
                                                                        !memberUsidCheck(
                                                                            USID
                                                                        )
                                                                    ) {
                                                                        handlMainAlert(
                                                                            {
                                                                                state: true,
                                                                                message:
                                                                                    Messages
                                                                                        .Default
                                                                                        .member
                                                                                        .info
                                                                                        .check
                                                                                        .usid,
                                                                            }
                                                                        )
                                                                        return
                                                                    }

                                                                    if (USID) {
                                                                        const {
                                                                            status,
                                                                            payload,
                                                                        } =
                                                                            await getMberCheckUsid(
                                                                                USID
                                                                            )
                                                                        if (
                                                                            status
                                                                        ) {
                                                                            const {
                                                                                MBER_USID_USE_AT,
                                                                            } =
                                                                                payload

                                                                            if (
                                                                                MBER_USID_USE_AT ===
                                                                                'N'
                                                                            ) {
                                                                                handlMainAlert(
                                                                                    {
                                                                                        state: true,
                                                                                        message:
                                                                                            Messages
                                                                                                .Default
                                                                                                .member
                                                                                                .info
                                                                                                .check
                                                                                                .usid_not_use,
                                                                                    }
                                                                                )
                                                                                setDetailState(
                                                                                    prevState => ({
                                                                                        ...prevState,
                                                                                        checkUsid:
                                                                                            true,
                                                                                        origin: {
                                                                                            ...prevState.origin,
                                                                                            USID: USID,
                                                                                        },
                                                                                    })
                                                                                )
                                                                                return
                                                                            } else {
                                                                                handlMainAlert(
                                                                                    {
                                                                                        state: true,
                                                                                        message:
                                                                                            Messages
                                                                                                .Default
                                                                                                .member
                                                                                                .info
                                                                                                .check
                                                                                                .usid_use,
                                                                                    }
                                                                                )
                                                                                return
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </WS.FlexRightButton>
                                                    )}

                                                    {!(
                                                        detailState.detail
                                                            .USE_STPLAT_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .INDVDLINFO_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .SNSTIIVEINFO_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .INDVDLINFO_THIRD_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .SNSTIIVEINFO_THIRD_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .MARKTINFO_AGRE_AT ===
                                                            'Y' &&
                                                        detailState.detail
                                                            .MARKTINFO_PURPOSE_AGRE_AT ===
                                                            'Y'
                                                    ) && (
                                                        <WS.FlexRightButton>
                                                            <VaryButton
                                                                ButtonType={`default`}
                                                                ButtonName={`약관 등의`}
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
                                </Row>
                            )}

                            {PageMode === 'new' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`비밀번호`} />
                                    </LabelCell>
                                    <InputCell>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'password'}
                                            HandleOnChange={e =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        PASSWORD:
                                                            e.target.value,
                                                    },
                                                }))
                                            }
                                            Placeholder={'비밀번호'}
                                            Value={
                                                detailState.detail.PASSWORD
                                                    ? detailState.detail
                                                          .PASSWORD
                                                    : ``
                                            }
                                        />
                                    </InputCell>
                                    <LabelCell>
                                        <VaryLabel
                                            LabelName={`회원번호 확인`}
                                        />
                                    </LabelCell>
                                    <InputCell>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'password'}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        PASSWORD_CHK:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                            Placeholder={'비밀번호 확인'}
                                            Value={
                                                detailState.detail.PASSWORD_CHK
                                                    ? detailState.detail
                                                          .PASSWORD_CHK
                                                    : ``
                                            }
                                        />
                                    </InputCell>
                                </Row>
                            )}

                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`이름`} />
                                </LabelCell>
                                <InputCell colSpan={PageMode === 'new' ? 3 : 1}>
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
                                        Placeholder={'이름'}
                                        Value={
                                            detailState.detail.NM
                                                ? detailState.detail.NM
                                                : ``
                                        }
                                        Children={
                                            <>
                                                {PageMode === 'modify' &&
                                                    pageState.UseStplatAgreAt
                                                        .state && (
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
                                {PageMode === 'modify' && (
                                    <>
                                        <LabelCell>
                                            <VaryLabel LabelName={`회원번호`} />
                                        </LabelCell>
                                        <InputCell>
                                            <VaryInput
                                                Width={'w60'}
                                                HandleOnChange={() => {
                                                    //
                                                }}
                                                Placeholder={'회원번호'}
                                                Value={
                                                    detailState.detail.MBER_NO
                                                        ? detailState.detail
                                                              .MBER_NO
                                                        : ``
                                                }
                                                Disabled={true}
                                            />
                                        </InputCell>
                                    </>
                                )}
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`핸드폰번호`} />
                                </LabelCell>
                                <InputCell
                                    colSpan={PageMode === 'new' ? 3 : 1}
                                    NoWarp={true}>
                                    <div className="flex flex-nowrap">
                                        <VaryInput
                                            Ref={inputPhoneNumberRef}
                                            Width={'w60'}
                                            InputType={'text'}
                                            HandleOnChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleChangeMbtlnum(e)}
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
                                                                detailState
                                                                    .detail
                                                                    .MBTLNUM_CRTFC_AT &&
                                                                detailState
                                                                    .detail
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
                                                </>
                                            }
                                        />
                                        {pageState.MbtlnumCheck && (
                                            <WS.FlexFreeRightButton>
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
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </WS.FlexFreeRightButton>
                                        )}
                                    </div>
                                </InputCell>
                                {PageMode === 'modify' && (
                                    <>
                                        <LabelCell>
                                            <VaryLabel LabelName={`이메일`} />
                                        </LabelCell>
                                        <InputCell>
                                            <VaryInput
                                                Width={'w60'}
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                EMAIL_ADRES:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    )
                                                }
                                                Placeholder={'이메일'}
                                                Value={
                                                    detailState.detail
                                                        .EMAIL_ADRES
                                                        ? detailState.detail
                                                              .EMAIL_ADRES
                                                        : ``
                                                }
                                            />
                                        </InputCell>
                                    </>
                                )}
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
                                                ? new Date(
                                                      detailState.detail.BRTHDY
                                                  )
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
                                            LabelWidth={`wMin`}
                                            LabelName={`남성`}
                                            Checked={
                                                !!(
                                                    detailState.detail.SEX &&
                                                    detailState.detail.SEX ===
                                                        'M'
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
                                            LabelWidth={`wMin`}
                                            LabelName={`여성`}
                                            Checked={
                                                !!(
                                                    detailState.detail.SEX &&
                                                    detailState.detail.SEX ===
                                                        'F'
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
                            {PageMode === 'modify' && (
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
                                            Placeholder={'가입일자'}
                                            Value={
                                                detailState.detail.REGIST_DT
                                                    ? detailState.detail
                                                          .REGIST_DT
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
                            )}

                            {PageMode === 'modify' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`내몸관리지수`} />
                                    </LabelCell>
                                    <InputCell>
                                        <VaryButton
                                            ButtonType={`info`}
                                            ButtonName={`${
                                                detailState.detail.TOT_SCORE
                                                    ? detailState.detail
                                                          .TOT_SCORE
                                                    : '0.0'
                                            }`}
                                            HandleClick={() =>
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    modal: {
                                                        ...prevState.modal,
                                                        totalScore: true,
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
                                                    ? detailState.detail
                                                          .TOT_CASH
                                                    : '0'
                                            }`}
                                            HandleClick={() => {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    modal: {
                                                        ...prevState.modal,
                                                        totCash: true,
                                                    },
                                                }))
                                            }}
                                        />
                                    </InputCell>
                                </Row>
                            )}

                            {PageMode === 'new' &&
                                mainLayoutState.Theme === 'GeonDaon' && (
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`내/외근직`}
                                            />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarapGap>
                                                <VaryLabelRadioButton
                                                    LabelWidth={`wMin`}
                                                    LabelName={`내근직`}
                                                    Checked={
                                                        detailState.detail
                                                            .WORK_TY_CODE ===
                                                        'I'
                                                    }
                                                    HandleOnChange={() =>
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    WORK_TY_CODE:
                                                                        'I',
                                                                },
                                                            })
                                                        )
                                                    }
                                                />

                                                <VaryLabelRadioButton
                                                    LabelWidth={`wMin`}
                                                    LabelName={`외근직`}
                                                    Checked={
                                                        detailState.detail
                                                            .WORK_TY_CODE ===
                                                        'O'
                                                    }
                                                    HandleOnChange={() =>
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    WORK_TY_CODE:
                                                                        'O',
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </WS.FlexNoWarapGap>
                                        </InputCell>
                                        <LabelCell></LabelCell>
                                        <InputCell></InputCell>
                                    </Row>
                                )}

                            {PageMode === 'modify' && (
                                <Row>
                                    <>
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
                                                                .MBTLNUM_CRTFC_AT ===
                                                                'Y'
                                                        )
                                                    ) {
                                                        handlMainAlert({
                                                            state: true,
                                                            message:
                                                                Messages.Default
                                                                    .phoneAuth
                                                                    .authYet,
                                                        })
                                                        return
                                                    }

                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        modal: {
                                                            ...prevState.modal,
                                                            changePassword:
                                                                true,
                                                        },
                                                    }))
                                                }}
                                            />
                                        </InputCell>
                                    </>

                                    {mainLayoutState.Theme === 'GeonDaon' ? (
                                        <>
                                            <LabelCell>
                                                <VaryLabel
                                                    LabelName={`내/외근직`}
                                                />
                                            </LabelCell>
                                            <InputCell>
                                                <WS.FlexNoWarapGap>
                                                    <VaryLabelRadioButton
                                                        LabelWidth={`wMin`}
                                                        LabelName={`내근직`}
                                                        Checked={
                                                            detailState.detail
                                                                .WORK_TY_CODE ===
                                                            'I'
                                                        }
                                                        HandleOnChange={() =>
                                                            setDetailState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    detail: {
                                                                        ...prevState.detail,
                                                                        WORK_TY_CODE:
                                                                            'I',
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    />

                                                    <VaryLabelRadioButton
                                                        LabelWidth={`wMin`}
                                                        LabelName={`외근직`}
                                                        Checked={
                                                            detailState.detail
                                                                .WORK_TY_CODE ===
                                                            'O'
                                                        }
                                                        HandleOnChange={() =>
                                                            setDetailState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    detail: {
                                                                        ...prevState.detail,
                                                                        WORK_TY_CODE:
                                                                            'O',
                                                                    },
                                                                })
                                                            )
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
                            )}
                            {PageMode === 'modify' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel
                                            LabelName={`소속정보`}
                                            Children={
                                                <VaryButton
                                                    ButtonType={`default`}
                                                    ButtonName={`추가`}
                                                    HandleClick={() =>
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                modal: {
                                                                    ...prevState.modal,
                                                                    pstinstSelector:
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <P.Container>
                                            <P.Table>
                                                <P.Tbody>
                                                    {detailState.detail
                                                        .PSTINST_INFO_LIST &&
                                                        detailState.detail.PSTINST_INFO_LIST.map(
                                                            (el, index) => {
                                                                return (
                                                                    <P.TableRow
                                                                        key={`member-detail-pstinst-table-row-item-${index}`}
                                                                        BgState={
                                                                            index %
                                                                                2 ===
                                                                            0
                                                                        }>
                                                                        <P.TableCell>
                                                                            {
                                                                                el.INST_NO
                                                                            }
                                                                        </P.TableCell>
                                                                        <P.TableCell>
                                                                            {
                                                                                el.INST_NM
                                                                            }
                                                                        </P.TableCell>
                                                                        <P.TableCell>
                                                                            {
                                                                                el.CONFM_DE
                                                                            }
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
                                                                                                    true,
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
                                    </InputCell>
                                </Row>
                            )}
                            {PageMode === 'new' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`키`} />
                                    </LabelCell>
                                    <InputCell>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'number'}
                                            HandleOnChange={e =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        HEIGHT: Number(
                                                            e.target.value
                                                        ),
                                                    },
                                                }))
                                            }
                                            Placeholder={'키'}
                                            Value={
                                                detailState.detail.HEIGHT
                                                    ? detailState.detail.HEIGHT
                                                    : ``
                                            }
                                            Children={
                                                <div className="flex text-xs items-end justify-end object-bottom h-8">
                                                    &#13213;
                                                </div>
                                            }
                                        />
                                    </InputCell>
                                    <LabelCell>
                                        <VaryLabel LabelName={`체중`} />
                                    </LabelCell>
                                    <InputCell>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'number'}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        BDWGH: Number(
                                                            e.target.value
                                                        ),
                                                    },
                                                }))
                                            }}
                                            Placeholder={'체중'}
                                            Value={
                                                detailState.detail.BDWGH
                                                    ? detailState.detail.BDWGH
                                                    : ``
                                            }
                                            Children={
                                                <div className="flex text-xs items-end justify-end object-bottom h-8">
                                                    &#13199;
                                                </div>
                                            }
                                        />
                                    </InputCell>
                                </Row>
                            )}
                            {PageMode === 'new' && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`허리둘레`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'number'}
                                            HandleOnChange={e =>
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        WAIST_CRCMFRNC: Number(
                                                            e.target.value
                                                        ),
                                                    },
                                                }))
                                            }
                                            Placeholder={'허리둘레'}
                                            Value={
                                                detailState.detail
                                                    .WAIST_CRCMFRNC
                                                    ? detailState.detail
                                                          .WAIST_CRCMFRNC
                                                    : ``
                                            }
                                            Children={
                                                <div className="flex text-xs items-end justify-end object-bottom h-8">
                                                    &#13213;
                                                </div>
                                            }
                                        />
                                    </InputCell>
                                </Row>
                            )}
                        </TableWapper>
                    </TableContainer>
                    <ButtonBox>
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={
                                    PageMode === 'modify'
                                        ? `회원정보 변경`
                                        : `회원등록`
                                }
                                HandleClick={() => {
                                    if (PageMode === 'new') {
                                        handleClickNewButton()
                                        return
                                    }

                                    if (
                                        detailState.detail.MBTLNUM !==
                                            detailState.origin.MBTLNUM &&
                                        !detailState.phoneAuth
                                    ) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                phoneAuthVal: true,
                                            },
                                        }))
                                        return
                                    }

                                    handleClickUpdateButton()
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
                </>
            )}

            <>
                {pageState.modal.confirm && (
                    <ConfirmModal
                        Title={
                            PageMode === 'modify'
                                ? Messages.Default.member.infoUpdate
                                : Messages.Default.member.newInfo
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

                            if (PageMode === 'modify') {
                                handleMemberInfoUpdate().then()
                            } else {
                                handleNewMember().then()
                            }
                        }}
                    />
                )}

                {/*휴대폰 번호 변경 미인증 확인 모달*/}
                {pageState.modal.phoneAuthVal && (
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
                                    phoneAuthVal: false,
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuthVal: false,
                                },
                            }))
                            handleMemberInfoUpdate().then()
                        }}
                    />
                )}

                {/*캐쉬 모달*/}
                {pageState.modal.totCash && (
                    <TotalCashModal
                        MemberNo={Number(detailState.origin.MBER_NO)}
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    totCash: false,
                                },
                            }))
                        }
                    />
                )}

                {/*내몸관리 지수 모달*/}
                {pageState.modal.totalScore && (
                    <TotalScoreModal
                        MemberNo={Number(detailState.origin.MBER_NO)}
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    totalScore: false,
                                },
                            }))
                        }
                    />
                )}

                {/*소속 추가 확인 모달*/}
                {pageState.modal.pstinstAgreeConfirm && (
                    <ConfirmModal
                        Title={Messages.Default.member.pstinstAdd.agreeConfirm}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstAgree: true,
                                    pstinstAgreeConfirm: false,
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
                                    pstinstAgree: false,
                                    pstinstAgreeConfirm: false,
                                },
                            }))
                        }}
                    />
                )}

                {/*소속 추가시 약관 모달*/}
                {pageState.modal.pstinstAgree && (
                    <PstinstAgreeModal
                        InfoNo={pageState.addSelectPstinst.instNo}
                        InfoType={`thpty`}
                        HandleClickCancleButtion={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstAgree: false,
                                    pstinstSelector: true,
                                },
                            }))
                        }
                        HandleClickApplyButton={e => {
                            const checked = _.filter(e, ck => ck.check === 'Y')

                            if (checked.length !== e.length) {
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
                                    pstinstAgree: false,
                                    pstinstAgreeConfirm: true,
                                },
                            }))
                        }}
                    />
                )}

                {/*소속 선택*/}
                {pageState.modal.pstinstSelector && (
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
                                    pstinstSelector: false,
                                    pstinstAgree: true,
                                },
                            }))
                        }}
                        HandleCancleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstSelector: false,
                                },
                            }))
                        }}
                    />
                )}

                {/*소속 탈퇴 처리 확인*/}
                {pageState.modal.pstinstInfoListLeaveConfirm && (
                    <ConfirmModal
                        Title={`${Messages.Default.member.pstinstLeave.confirmModal}`}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    pstinstInfoListLeaveConfirm: false,
                                    pstinstInfoListLeave: true,
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
                {pageState.modal.pstinstInfoListLeave && (
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
                                                pstinstInfoListLeave: false,
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
                                                    pstinstInfoListLeave: false,
                                                    pstinstInfoListLeaveConfirm:
                                                        true,
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
                {pageState.modal.changePassword && (
                    <ConfirmModal
                        Title={`${Messages.Default.member.password.change}`}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`보내기`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    changePassword: false,
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
                                        changePassword: false,
                                    },
                                }))
                            } else {
                            }
                        }}
                    />
                )}

                {/* 확인 모달 */}
                {pageState.modal.unityUpdate && (
                    <ConfirmModal
                        Title={Messages.Default.member.unityChange.unityUpdate}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    unityUpdate: false,
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            handleMemberUnityUpdate().then()
                        }}
                    />
                )}

                {/* 휴대폰 번호 중복 모달 */}
                {pageState.modal.phoneDuplicate && (
                    <ConfirmModal
                        Title={`${detailState.detail.MBTLNUM} ${Messages.Default.phoneAuth.duplicate}`}
                        CancleButtonName={`다시입력`}
                        ApplyButtonName={`맞습니다`}
                        CancleButtonClick={() => {
                            inputPhoneNumberRef.current?.focus()
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneDuplicate: false,
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            handleMbtlnumCrtfc()
                        }}
                    />
                )}

                {/*휴대폰 번호 인증 모달*/}
                {pageState.modal.phoneAuth && (
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
                                    phoneAuth: false,
                                },
                            }))
                        }
                        HandleSuccess={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    phoneAuth: false,
                                },
                            }))
                            if (PageMode === 'modify') {
                                setDetailState(prevState => ({
                                    ...prevState,
                                    detail: {
                                        ...prevState.detail,
                                        MBTLNUM_CRTFC_AT: 'Y',
                                    },
                                }))
                            } else {
                                setDetailState(prevState => ({
                                    ...prevState,
                                    detail: {
                                        ...prevState.detail,
                                        MBTLNUM_CRTFC_AT: 'Y',
                                    },
                                    origin: {
                                        ...prevState.detail,
                                        MBTLNUM_CRTFC_AT: 'Y',
                                    },
                                }))
                            }
                        }}
                    />
                )}

                {/*약관 동의 모달*/}
                {pageState.modal.useStplatAgreAt && (
                    <StplatInfoAgreeModal
                        AgreeTitleType={PageMode === 'new' ? 'new' : 're'}
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
                            const filtered = Object.entries(e).filter(
                                ([, value]) => value === 'Y'
                            )

                            // 전체 동의 안했을때.
                            if (Object.keys(e).length !== filtered.length) {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.notAllAgree,
                                })

                                return
                            }

                            if (PageMode === 'new') {
                                setDetailState(prevState => ({
                                    ...prevState,
                                    detail: {
                                        ...prevState.detail,
                                        USE_STPLAT_AGRE_AT:
                                            e.USE_STPLAT_AGRE_AT == 'Y'
                                                ? e.USE_STPLAT_AGRE_AT
                                                : 'N',
                                        INDVDLINFO_AGRE_AT:
                                            e.INDVDLINFO_AGRE_AT == 'Y'
                                                ? e.INDVDLINFO_AGRE_AT
                                                : 'N',
                                        SNSTIIVEINFO_AGRE_AT:
                                            e.SNSTIIVEINFO_AGRE_AT == 'Y'
                                                ? e.SNSTIIVEINFO_AGRE_AT
                                                : 'N',
                                        MARKTINFO_AGRE_AT:
                                            e.MARKTINFO_AGRE_AT == 'Y'
                                                ? e.MARKTINFO_AGRE_AT
                                                : 'N',
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
                                    },
                                }))
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        useStplatAgreAt: false,
                                    },
                                }))
                            } else {
                                hadleMemberStplatInfoUpdate(e).then(() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            useStplatAgreAt: false,
                                        },
                                    }))
                                )
                            }
                        }}
                    />
                )}
            </>
        </DetailContainer>
    )
}

export default MemberDetailTable
