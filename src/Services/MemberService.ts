import { _Axios_ } from '@Modules'
import { SendSmsInterface, ServicesDefaultResult } from '@Type/CommonTypes'
import {
    ConsultInfoListInterface,
    ManageCounselInterface,
    ManageCounselMycoachInterface,
    MemberInfoInterface,
    MemberInfoListInterface,
    MesureInfoListInterface,
} from '@Type/MemberTypes'

export const getMemberList = ({
    curPage,
    instNo,
    searchKey,
    registDtFrom,
    registDtTo,
}: {
    curPage: number
    instNo: string
    searchKey: string
    registDtFrom: string
    registDtTo: string
}): Promise<ServicesDefaultResult<MemberInfoListInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/mber/list/${curPage}`,
        payload: {
            INST_NO: instNo,
            SEARCH_KEY: searchKey,
            REGIST_DT_FROM: registDtFrom,
            REGIST_DT_TO: registDtTo,
        },
    })
}

/**
 * 회원 상세 정보 조회.
 * @param mber_no
 */
export const getMemberInfo = ({
    mber_no,
}: {
    mber_no: number
}): Promise<ServicesDefaultResult<MemberInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/info/${mber_no}`,
        payload: {},
    })
}

/**
 * 전화 번호 중복체크
 * @param mbtlnum
 */
export const getMbtlnum = ({
    mbtlnum,
}: {
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ MBER_MBTLNUM_USE_AT: 'Y' | 'N' }>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/check/mbtlnum?mbtlnum=${mbtlnum}`,
        payload: {},
    })
}

/**
 * 인증번호 전송
 * @param mbtlnum
 */
export const postMbtlnumCrtfc = ({
    mbtlnum,
}: {
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/mbtlnum_crtfc/${mbtlnum}`,
        payload: {},
    })
}

/**
 * 인증 번호 확인
 * @param mbtlnum
 * @param crtfc_key
 */
export const getCrtfcKey = ({
    mbtlnum,
    crtfc_key,
}: {
    mbtlnum: string
    crtfc_key: string
}): Promise<
    ServicesDefaultResult<{ MBTLNUM_CRTFC_AT: { CRTFC_RESULT: string } }>
> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/mbtlnum_crtfc/${mbtlnum}?crtfc_key=${crtfc_key}`,
        payload: {},
    })
}

/**
 * 회원 데이터 통합 처리.
 * @param mbrno
 * @param mbtlnum
 */
export const mberUnityUpdate = ({
    mbrno,
    mbtlnum,
}: {
    mbrno: string
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/mber/unity/${mbrno}/${mbtlnum}/update`,
        payload: {},
    })
}

/**
 * 비밀번호 리셋
 * @param mbrno
 */
export const postPasswordReset = ({
    mbrno,
}: {
    mbrno: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/${mbrno}/password/reset/update`,
        payload: {},
    })
}

/**
 * 소속 탈퇴 처리.
 * @param mbrNo
 * @param instNo
 * @param leaveText
 */
export const postMemberPstinstLeave = ({
    mbrNo,
    instNo,
    leaveText,
}: {
    mbrNo: number
    instNo: number
    leaveText: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/pstinst/${mbrNo}/${instNo}/${encodeURIComponent(
            leaveText
        )}/update`,
        payload: {},
    })
}

/**
 * 회원 소속 추가.
 * @param mberNo
 * @param instNo
 */
export const postInstPstinst = ({
    mberNo,
    instNo,
}: {
    mberNo: number
    instNo: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/pstinst/${instNo}`,
        payload: {
            MBER_NO: mberNo,
        },
    })
}

/**
 * 회원 약관 동의 처리.
 * @param payload
 */
export const postMberStplatInfoUpdate = (payload: {
    MBER_NO: number
    USE_STPLAT_AGRE_AT: 'Y' | 'N'
    INDVDLINFO_AGRE_AT: 'Y' | 'N'
    SNSTIIVEINFO_AGRE_AT: 'Y' | 'N'
    MARKTINFO_AGRE_AT: 'Y' | 'N'
    INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N'
    SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N'
    MARKTINFO_PURPOSE_AGRE_AT: 'Y' | 'N'
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/stplat/info/update`,
        payload: payload,
    })
}

/**
 * 회원 정보 업데이트
 * @param payload
 */
export const postMemberInfoUpdate = (payload: {
    MBER_NO: number
    NM: string
    BRTHDY: string
    SEXDSTN: 'M' | 'F'
    MBTLNUM: string
    EMAIL_ADRES: string
    MBTLNUM_CRTFC_AT: 'Y' | 'N'
    MEMO: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/update`,
        payload: payload,
    })
}

/**
 * 상담회원 리스트
 * @param curPage
 * @param instNo
 * @param searchKey
 * @param riskFctr
 */
export const getMberCnsltlist = ({
    curPage,
    instNo,
    searchKey,
    riskFctr,
}: {
    curPage: number
    instNo: string
    searchKey: string
    riskFctr: string
}): Promise<ServicesDefaultResult<ConsultInfoListInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/mber/cnsltlist/${curPage}`,
        payload: {
            INST_NO: instNo,
            SEARCH_KEY: searchKey,
            RISK_FCTR: riskFctr,
        },
    })
}

/**
 * 상담회원 상세 히스토리.
 * @param memNo
 * @param dataCode
 * @param startDate
 * @param endDate
 * @param pageNo
 */
export const getMesureInfo = ({
    memNo,
    dataCode,
    startDate,
    endDate,
    pageNo,
}: {
    memNo: number
    dataCode: string
    startDate: string
    endDate: string
    pageNo: number
}): Promise<ServicesDefaultResult<MesureInfoListInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/info/${memNo}/mesure_info/${dataCode}/${startDate}/${endDate}/${pageNo}`,
        payload: {},
    })
}

/**
 * 상담회원 히스토리 데이터 수기 입력
 * @param MBER_NO
 * @param MESURE_CODE
 * @param MESURE_DATA
 * @param MESURE_DT
 * @param REGIST_MBER_NO
 */
export const postDataMesureInfoManualUpdate = ({
    MBER_NO,
    MESURE_CODE,
    MESURE_DATA,
    MESURE_DT,
    REGIST_MBER_NO,
}: {
    MBER_NO: number
    MESURE_CODE: string
    MESURE_DATA: string
    MESURE_DT: string
    REGIST_MBER_NO: number | null
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/mesure_info/manual/update`,
        payload: {
            MBER_NO,
            MESURE_CODE,
            MESURE_DATA,
            MESURE_DT,
            REGIST_MBER_NO,
        },
    })
}

/**
 * 상담회원 MyData 수기 입력
 * @param MBER_NO
 * @param REGIST_MBER_NO
 * @param MESURE_DE
 * @param MESURE_TIME
 * @param SLM
 * @param PBF
 * @param VFL
 * @param EST_BN_MAS
 * @param BMI
 * @param HEIGHT
 * @param BDWGH
 * @param WAIST_CRCMFRNC
 * @param BDHEAT
 * @param SYSTOLIC
 * @param DIASTOLIC
 * @param PULS
 * @param FBS
 * @param PP2
 * @param T_CHOL
 * @param HDLC
 * @param LDLC
 * @param TG
 */
export const postDataMesureInfoManual = ({
    MBER_NO,
    REGIST_MBER_NO,
    MESURE_DE,
    MESURE_TIME,
    SLM,
    PBF,
    VFL,
    EST_BN_MAS,
    BMI,
    HEIGHT,
    BDWGH,
    WAIST_CRCMFRNC,
    BDHEAT,
    SYSTOLIC,
    DIASTOLIC,
    PULS,
    FBS,
    PP2,
    T_CHOL,
    HDLC,
    LDLC,
    TG,
}: {
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
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/mesure_info/manual`,
        payload: {
            MBER_NO: MBER_NO,
            MESURE_DATA: [
                {
                    REGIST_MBER_NO, // 작성자 회원번호
                    MESURE_DE, // 측정일
                    MESURE_TIME, //측정시분초
                    SLM, // 근육량
                    PBF, // 체지방률
                    VFL, // 내장지방(레벨)
                    EST_BN_MAS, // 추정골량
                    BMI, // BMI
                    HEIGHT, // 신장
                    BDWGH, //몸무게
                    WAIST_CRCMFRNC, // 허리둘레
                    BDHEAT, //체온
                    SYSTOLIC, // 수축기
                    DIASTOLIC, /// 이완기
                    PULS, // 맥박
                    FBS, // 식전혈당
                    PP2, //식후혈당
                    T_CHOL, // 총콜레스테롤
                    HDLC, //HDLC
                    LDLC, //LDLC
                    TG, //중성지방
                },
            ],
        },
    })
}

/**
 * 상담 차트 리스트
 * @param END_DT
 * @param MBER_NO
 * @param START_DT
 */
export const postManageCounsel = ({
    END_DT,
    MBER_NO,
    START_DT,
}: {
    END_DT: string
    MBER_NO: string
    START_DT: string
}): Promise<ServicesDefaultResult<ManageCounselInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/manage/v1/counsel`,
        payload: {
            END_DT,
            MBER_NO,
            START_DT,
        },
    })
}

/**
 * 상담 차트 작성
 * @param CNST
 * @param MBER_NO
 * @param PLN
 * @param REG_NM
 */
export const postManageaddCounsel = ({
    CNST,
    MBER_NO,
    PLN,
    REG_NM,
}: {
    CNST: string
    MBER_NO: string
    PLN: string
    REG_NM: string
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/manage/v1/add_counsel`,
        payload: {
            CNST,
            MBER_NO,
            PLN,
            REG_NM,
        },
    })
}

/**
 * 상담 차트 수정.
 * @param CNST
 * @param CNST_NO
 * @param MBER_NO
 * @param PLN
 * @param REG_NM
 */
export const postManageUpdateCounsel = ({
    CNST,
    CNST_NO,
    MBER_NO,
    PLN,
    REG_NM,
}: {
    CNST: string
    CNST_NO: string
    MBER_NO: string
    PLN: string
    REG_NM: string
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/manage/v1/update_counsel`,
        payload: {
            CNST,
            CNST_NO,
            MBER_NO,
            PLN,
            REG_NM,
        },
    })
}

/**
 * 회원 메지시 보내기
 * @param SMS_SJ
 * @param SMS_CN
 * @param SNDNG_NO
 * @param SNDNG_DT
 * @param SEND_ALL_MBER
 * @param SEND_MBER_INFO_LIST
 */
export const mberSendSms = ({
    SMS_SJ,
    SMS_CN,
    SNDNG_NO,
    SNDNG_DT,
    SEND_ALL_MBER,
    SEND_MBER_INFO_LIST,
}: SendSmsInterface): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/send/sms`,
        payload: {
            SMS_SJ,
            SMS_CN,
            SNDNG_NO,
            SNDNG_DT,
            SEND_ALL_MBER,
            SEND_MBER_INFO_LIST,
        },
    })
}

/**
 * 상차트 삭제 처리.
 * @param CNST_LIST
 */
export const manageRemoveCounsel = ({
    CNST_LIST,
}: {
    CNST_LIST: Array<{
        CNST_NO: number
    }>
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/manage/v1/remove_counsel`,
        payload: {
            CNST_LIST,
        },
    })
}

// /mng/v1/my_coach/:mber_no/:coach_de
export const getMngMyCoach = ({
    memNo,
    searchDate,
}: {
    memNo: number
    searchDate: string
}): Promise<ServicesDefaultResult<ManageCounselMycoachInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/my_coach/${memNo}/${searchDate}`,
        payload: {},
    })
}
