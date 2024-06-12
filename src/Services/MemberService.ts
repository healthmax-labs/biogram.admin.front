import { _Axios_ } from '@Modules'
import {
    SendSmsInterface,
    ServicesDefaultResult,
    MemberSearchItemInterface,
} from '@Type/CommonTypes'
import {
    ConsultInfoListInterface,
    ConsultMealDiaryItemInterface,
    ConsultMyGraphBldvssResultInterface,
    ConsultMyGraphBodyResultInterface,
    ConsultMyGraphBrainResultInterface,
    ConsultMyGraphBrssrResultInterface,
    ConsultMyGraphCholResultInterface,
    ConsultMyGraphDdsgResultInterface,
    ConsultMyGraphHeightResultInterface,
    ConsultMyGraphLifeLogResultInterface,
    ConsultMyGraphStrsResultInterface,
    ConsultMyGraphWaistResultInterface,
    ConsultRawAgeMiInfoItemInterface,
    ConsultRawAgeObiInfoItemInterface,
    ManageCounselInterface,
    ManageCounselMsgBoxListInterface,
    ManageCounselMycoachInterface,
    ManageCounselQustnrAnswerDataInterface,
    ManageCounselQustnrAnswerInterface,
    MemberInfoInterface,
    MemberInfoListInterface,
    MesureInfoListInterface,
    ConsultGroupListResultInterface,
    ConsultMemberGroupListResultInterface,
    ConsultMemberGroupInfoResultInterface,
    ConsultMemberJoinListGroupListResultItemInterface,
} from '@Type/MemberTypes'
import _ from 'lodash'

/**
 * 회원 리스트
 * @param curPage
 * @param instNo
 * @param searchKey
 * @param registDtFrom
 * @param registDtTo
 */
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
    const payload: {
        INST_NO?: string
        SEARCH_KEY: string
        REGIST_DT_FROM: string
        REGIST_DT_TO: string
    } = {
        INST_NO: instNo,
        SEARCH_KEY: searchKey,
        REGIST_DT_FROM: registDtFrom,
        REGIST_DT_TO: registDtTo,
    }

    if (_.isEmpty(payload.INST_NO)) {
        delete payload.INST_NO
    }

    return _Axios_({
        method: 'post',
        url: `/mng/v1/mber/list/${curPage}`,
        payload: payload,
    })
}

/**
 * 회원 등록
 * @param payload
 */
export const postMberMberInfo = (payload: {
    BDWGH: number
    BMI: number
    BRTHDY: string
    EMAIL_ADRES: string
    HEIGHT: number
    INDVDLINFO_AGRE_AT: string | 'Y' | 'N'
    INDVDLINFO_THIRD_AGRE_AT: string | 'Y' | 'N'
    INST_NO?: string
    MARKTINFO_AGRE_AT: string | 'Y' | 'N'
    MARKTINFO_PURPOSE_AGRE_AT: string | 'Y' | 'N'
    MBER_PURPS: string
    MBTLNUM: string
    MBTLNUM_CRTFC_AT: string | 'Y' | 'N'
    NCM: string
    NM: string
    PASSWORD: string
    SBSCRB_COURS_CODE: string | 'WS'
    SEXDSTN: string | 'M' | 'F'
    SNSTIIVEINFO_AGRE_AT: string | 'Y' | 'N'
    SNSTIIVEINFO_THIRD_AGRE_AT: string | 'Y' | 'N'
    TELNO: string
    USE_STPLAT_AGRE_AT: string | 'Y' | 'N'
    USID: string
    WAIST_CRCMFRNC: number
}) => {
    if (_.isEmpty(payload.INST_NO)) {
        delete payload.INST_NO
    }

    return _Axios_({
        method: 'post',
        url: `/mber/v1/mber_info`,
        payload: payload,
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
    SEXDSTN: string | 'M' | 'F'
    MBTLNUM: string
    EMAIL_ADRES: string
    MBTLNUM_CRTFC_AT: string | 'Y' | 'N'
    MEMO: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/update`,
        payload: payload,
    })
}

/**
 * 회원 아이디 중복 확인.
 * @param usid
 */
export const getMberCheckUsid = (
    usid: string
): Promise<ServicesDefaultResult<{ MBER_USID_USE_AT: 'Y' | 'N' }>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/check/usid/${usid}`,
        payload: {},
    })
}

/**
 * 상담회원 리스트
 * @param curPage
 * @param instNo
 * @param searchKey
 * @param riskFctr
 * @param endDt
 * @param startDt
 * @param groupNo
 */
export const getMberCnsltlist = ({
    curPage,
    instNo,
    searchKey,
    riskFctr,
    endDt,
    startDt,
    groupNo,
}: {
    curPage: number
    instNo: string
    searchKey: string
    riskFctr: string
    endDt: string
    startDt: string
    groupNo: string
}): Promise<ServicesDefaultResult<ConsultInfoListInterface>> => {
    const payload: {
        INST_NO?: string
        SEARCH_KEY: string
        RISK_FCTR: string
        ENDDT: string
        STARTDT: string
        CNST_GRP_NO?: string
    } = {
        INST_NO: instNo,
        SEARCH_KEY: searchKey,
        RISK_FCTR: riskFctr,
        ENDDT: endDt,
        STARTDT: startDt,
        CNST_GRP_NO: groupNo,
    }

    if (_.isEmpty(payload.INST_NO)) {
        delete payload.INST_NO
    }

    if (_.isEmpty(payload.CNST_GRP_NO)) {
        delete payload.CNST_GRP_NO
    }

    return _Axios_({
        method: 'post',
        url: `/mng/v1/mber/cnsltlist/${curPage}`,
        payload: payload,
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
 * 측정 데이터 삭제
 * @param memNo
 * @param mesureDt
 * @param mesureCode
 */
export const postMesureInfoDelete = ({
    memNo,
    mesureDt,
    mesureCode,
}: {
    memNo: number
    mesureDt: string
    mesureCode: string
}): Promise<ServicesDefaultResult<MesureInfoListInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/mesure_info/manual/delete`,
        payload: {
            MBER_NO: memNo,
            MESURE_DT: mesureDt,
            MESURE_CODE: mesureCode,
        },
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
 * @param payload
 */
export const postDataMesureInfoManual = (payload: {
    MBER_NO: number
    MESURE_DATA: Array<{
        REGIST_MBER_NO: number // 작성자 회원번호
        MESURE_DE: string // 측정일
        MESURE_TIME: string //측정시분초
        SLM?: number // 근육량
        PBF?: number // 체지방률
        VFL?: number // 내장지방(레벨)
        EST_BN_MAS?: number // 추정골량
        BMI?: number // BMI
        HEIGHT?: number // 신장
        BDWGH?: number //몸무게
        WAIST_CRCMFRNC?: number // 허리둘레
        BDHEAT?: number //체온
        SYSTOLIC?: number // 수축기
        DIASTOLIC?: number /// 이완기
        PULS?: number // 맥박
        FBS?: number // 식전혈당
        PP2?: number //식후혈당
        HBA1C?: number //당화혈색소
        T_CHOL?: number // 총콜레스테롤
        HDLC?: number //HDLC
        LDLC?: number //LDLC
        TG?: number //중성지방
    }>
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/mesure_info/manual`,
        payload: payload,
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

/**
 * 마이코치 데이터 조회.
 * @param memNo
 * @param searchDate
 */
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

/**
 * 상담회원 설문 조사 정보 조회.
 * @param memNo
 */
export const getMngQustnrAnswer = ({
    memNo,
}: {
    memNo: number
}): Promise<ServicesDefaultResult<ManageCounselQustnrAnswerInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/qustnr_answer/${memNo}`,
        payload: {},
    })
}

/**
 * 상담 회원 설문 조사 등록
 * @param payload
 */
export const postDataQustnrAnswer = (
    payload: ManageCounselQustnrAnswerDataInterface
): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/qustnr/answer`,
        payload: payload,
    })
}

/**
 * 메시지 발송함 리스트 조회.
 * @param mber_no
 * @param START_DT
 * @param END_DT
 * @param SNDNG_FAILR
 * @param SNDNG_STDR
 * @param SEARCH_KEY
 * @param MSG_TYPE
 */
export const getMsgBoxList = ({
    mber_no,
    START_DT,
    END_DT,
    SNDNG_FAILR,
    SNDNG_STDR,
    MSG_TYPE,
    SEARCH_KEY,
}: {
    mber_no: number
    START_DT: string
    END_DT: string
    SNDNG_FAILR: string
    MSG_TYPE: string
    SNDNG_STDR: string
    SEARCH_KEY: string
}): Promise<ServicesDefaultResult<ManageCounselMsgBoxListInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/list/msg/${mber_no}`,
        payload: {
            START_DT: START_DT,
            END_DT: END_DT,
            SNDNG_FAILR: SNDNG_FAILR,
            MSG_TYPE: MSG_TYPE,
            SNDNG_STDR: SNDNG_STDR,
            SEARCH_KEY: SEARCH_KEY,
        },
    })
}

/**
 * 회원 탈퇴 처리
 * @param memNo
 * @param secsnResnCode
 * @param secsnResnEtc
 */
export const postMberInfoDelete = ({
    memNo,
    secsnResnCode,
    secsnResnEtc,
}: {
    memNo: string
    secsnResnCode: string
    secsnResnEtc: string
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/delete`,
        payload: {
            MBER_NO: memNo,
            SECSN_RESN_CODE: secsnResnCode,
            SECSN_RESN_ETC: secsnResnEtc,
        },
    })
}

/**
 * 예약 메시지 발송 취소.
 * @param CMIDS
 */
export const postMberCanclSmsresve = ({
    CMIDS,
}: {
    CMIDS: string
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/cancl/smsresve`,
        payload: {
            CMIDS: CMIDS,
        },
    })
}

/**
 * 상담회원 생체나이
 * @param memNo
 */
export const getMngUserObmtInfo = ({
    memNo,
}: {
    memNo: number
}): Promise<
    ServicesDefaultResult<{
        BO_INFOS: {
            OBI_INFO: ConsultRawAgeObiInfoItemInterface[]
            MI_INFO: ConsultRawAgeMiInfoItemInterface[]
            META_PDF_PATH: string | null
            OBSITY_PDF_PATH: string | null
        }
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/obmt_info/${memNo}`,
        payload: {},
    })
}

/**
 * 회원 키워드검색
 * @param keyWord
 */
export const getMberSendMberSearch = ({
    keyWord,
}: {
    keyWord: string
}): Promise<
    ServicesDefaultResult<{
        SEND_MBER_INFO_LIST: MemberSearchItemInterface[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/send/mber_search?keyword=${keyWord}`,
        payload: {},
    })
}

/**
 * 관리자 권한 부여전 부여 가능한지 체크(이미 있는지 체크)
 * @param permiCode
 * @param memberNo
 * @param instNo
 */
export const getInstChargerCheck = ({
    permiCode,
    memberNo,
    instNo,
}: {
    permiCode: string
    memberNo: number
    instNo: number
}): Promise<
    ServicesDefaultResult<{
        REGIST_AT: 'D' | 'Y' | 'N'
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/charger/${permiCode}/${memberNo}/${instNo}`,
        payload: {},
    })
}

/**
 * 상담회원 식사일기
 * @param mealDe
 * @param startDay
 * @param mberNo
 */
export const getDataDiaryMeal = ({
    mealDe,
    startDay,
    mberNo,
}: {
    mealDe: string
    startDay: number
    mberNo: number
}): Promise<ServicesDefaultResult<ConsultMealDiaryItemInterface[]>> => {
    return _Axios_({
        method: 'get',
        url: `/data/v1/diary/meal/${mealDe}/${startDay}/${mberNo}`,
        payload: {},
    })
}

// 마이그래프
/*
체성분 : /mng/v1/user/body/:mber_no/:std_day
혈압 : /mng/v1/user/brssr/:mberno/:std_day
혈당 : /mng/v1/user/bdsg/:mberno/:std_day
콜레스테롤: /mng/v1/user/chol/:mberno/:std_day
혈관 : /mng/v1/user/bldvss/:mberno/:std_day
스트레스: /mng/v1/user/strs/:mberno/:std_day
신장 : /mng/v1/user/height/:mberno/:std_day
허리둘레: /mng/v1/user/waist/:mberno/:std_day
뇌기능: /mng/v1/user/brain/:mberno/:std_day
활동량 & 수면 : /data/v1/user/life_log/:mberno/:std_day

체성분 : body
혈압 : brssr
혈당 : bdsg
콜레스테롤: chol
혈관 : bldvss
스트레스: strs
신장 : height
허리둘레: waist
뇌기능: brain
활동량 & 수면 : life_log
 */
/**
 * 체성분
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphBody = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphBodyResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/body/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 혈압
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphBrssr = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphBrssrResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/brssr/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 혈당
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphBdsg = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphDdsgResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/bdsg/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 콜레스테롤
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphChol = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphCholResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/chol/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 혈관
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphBldvss = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphBldvssResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/bldvss/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 스트레스
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphStrs = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphStrsResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/strs/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 신장
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphHeight = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphHeightResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/height/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 허리둘레
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphWaist = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphWaistResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/waist/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 뇌기능
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphBrain = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphBrainResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/user/brain/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 활동량 & 수면
 * @param memNo
 * @param startDay
 */
export const getMngUserMyGraphLifeLog = ({
    memNo,
    startDay,
}: {
    memNo: number
    startDay: string
}): Promise<ServicesDefaultResult<ConsultMyGraphLifeLogResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/data/v1/user/life_log/${memNo}/${startDay}`,
        payload: {},
    })
}

/**
 * 상담회원그룹 목록
 * @param instNo
 */
export const getMngCnstgrpList = ({
    instNo,
}: {
    instNo: string
}): Promise<ServicesDefaultResult<ConsultGroupListResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/cnstgrp/list${instNo ? `/${instNo}` : ''}`, // FIXME: 'instNo 가 없으면 에러발생해서 임시로....'
        payload: {},
    })
}

/**
 * 상담회원 그룹 목록 ( 회원 등록되어있는지 체크 )
 * @param memNo
 */
export const getMngCnstgrpJoinlist = ({
    memNo,
}: {
    memNo: number
}): Promise<
    ServicesDefaultResult<ConsultMemberJoinListGroupListResultItemInterface[]>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/cnstgrp/joinlist/${memNo}`,
        payload: {},
    })
}

/**
 * 상담회원 그룹 등록
 * @param instNm
 * @param name
 * @param perm
 */
export const postMngCnstgrpAdd = ({
    instNo,
    name,
    perm,
}: {
    instNo: string
    name: string
    perm: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/cnstgrp/add`,
        payload: {
            INST_NO: instNo,
            CNST_GRP_NM: name,
            PERM: perm,
        },
    })
}

/**
 * 상담회원 그룹 수정
 * @param groupNo
 * @param instNo
 * @param name
 * @param perm
 */
export const postMngCnstgrpUpdate = ({
    groupNo,
    instNo,
    name,
    perm,
}: {
    groupNo: number
    instNo: string
    name: string
    perm: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/cnstgrp/update/${groupNo}`,
        payload: {
            INST_NO: instNo,
            CNST_GRP_NM: name,
            PERM: perm,
        },
    })
}

/**
 * 삼담회원 그룹 삭제
 * @param groupNo
 */
export const getMngCnstgrpDelete = ({
    groupNo,
}: {
    groupNo: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/cnstgrp/delete/${groupNo}`,
        payload: {},
    })
}

/**
 * 상담회원 그룹 멤버 추가
 * @param groupNo
 * @param memberNo
 */
export const postMngCnstgrpMberAdd = ({
    groupNo,
    memberNo,
}: {
    groupNo: string
    memberNo: Array<{ CNST_MBER_NO: string }>
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/cnstgrp/mber/add`,
        payload: {
            CNST_GRP_NO: groupNo,
            CNST_MBER_LIST: memberNo,
        },
    })
}

/**
 * 상담회원 그룹 멤버 제거
 * @param groupNo
 * @param memberNo
 */
export const postMngCnstgrpMberRemove = ({
    groupNo,
    memberNo,
}: {
    groupNo: number
    memberNo: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/cnstgrp/mber/remove`,
        payload: {
            CNST_GRP_NO: groupNo,
            CNST_MBER_NO: memberNo,
        },
    })
}

/**
 * 회원이 등록되어있는 상담회원 그룹 리스트
 * @param memberNo
 */
export const postMemberMngCnstgrpMberList = ({
    memberNo,
}: {
    memberNo: number
}): Promise<ServicesDefaultResult<ConsultMemberGroupListResultInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/cnstgrp/mber/list`,
        payload: {
            CNST_MBER_NO: `${memberNo}`,
        },
    })
}

/**
 * 상담회원 그룹 상세
 * @param groupNo
 */
export const getMngCnstgrpInfo = ({
    groupNo,
}: {
    groupNo: number
}): Promise<ServicesDefaultResult<ConsultMemberGroupInfoResultInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/cnstgrp/info/${groupNo}`,
        payload: {},
    })
}

/**
 * 회원 상세 메모 삭제
 * @param MBER_NO
 */
export const postMemberInfoMemoDelete = ({ MBER_NO }: { MBER_NO: number }) => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/memo/delete`,
        payload: {
            MBER_NO: MBER_NO,
        },
    })
}
