// 회원 테이블 데이터
export interface tableListItemInterface {
    MBER_NO: number
    TG_3: null | string
    TG_2: null | string
    TG_1: null | string
    TG_0: null | string
    WAIST_0: null | number
    WAIST_1: null | number
    WAIST_2: null | number
    WAIST_3: null | number
    BP_MESURE_DT_3: null | string
    BP_MESURE_DT_2: null | string
    BP_MESURE_DT_1: null | string
    BP_MESURE_DT_0: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    FBS_MESURE_DT_0: null | string
    FBS_MESURE_DT_1: null | string
    FBS_MESURE_DT_MESURE_DT_2: null | string
    FBS_MESURE_DT_MESURE_DT_3: null | string
    HDLC_0: null | number
    HDLC_1: null | number
    HDLC_2: null | number
    HDLC_3: null | number
    BP_3: null | number
    BP_2: null | number
    BP_1: null | number
    BP_0: null | number
    TG_MESURE_DT_0: null | string
    TG_MESURE_DT_1: null | string
    TG_MESURE_DT_2: null | string
    TG_MESURE_DT_3: null | string
    FBS_0: null | number
    FBS_1: null | number
    FBS_2: null | number
    FBS_3: null | number
    HDLC_MESURE_DT_0: null | string
    HDLC_MESURE_DT_1: null | string
    HDLC_MESURE_DT_2: null | string
    HDLC_MESURE_DT_3: null | string
    WAIST_MESURE_DT_0: null | string
    WAIST_MESURE_DT_1: null | string
    WAIST_MESURE_DT_2: null | string
    WAIST_MESURE_DT_3: null | string
    NM: string
}

// 테이블 설정.
export const TableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `회원번호`,
            key: `MBER_NO`,
        },
        {
            name: `회원명`,
            key: `NM`,
        },
        {
            name: `생년월일`,
            key: `BRTHDY`,
        },
        {
            name: `성별`,
            key: `SEXDSTN`,
        },
        {
            name: `허리둘레(최초)`,
            key: `WAIST_0`,
        },
        {
            name: `허리둘레(최근1)`,
            key: `WAIST_1`,
        },
        {
            name: `허리둘레(최근2)`,
            key: `WAIST_2`,
        },
        {
            name: `허리둘레(최근3)`,
            key: `WAIST_3`,
        },
        {
            name: `허리둘레DT(최초)`,
            key: `WAIST_MESURE_DT_0`,
        },
        {
            name: `허리둘레DT(최근1)`,
            key: `WAIST_MESURE_DT_1`,
        },
        {
            name: `허리둘레DT(최근2)`,
            key: `WAIST_MESURE_DT_2`,
        },
        {
            name: `허리둘레DT(최근3)`,
            key: `WAIST_MESURE_DT_3`,
        },
        {
            name: `혈압(최초)`,
            key: `BP_0`,
        },
        {
            name: `혈압(최근1)`,
            key: `BP_1`,
        },
        {
            name: `혈압(최근2)`,
            key: `BP_2`,
        },
        {
            name: `혈압(최근3)`,
            key: `BP_3`,
        },
        {
            name: `혈압DT(최초)`,
            key: `BP_MESURE_DT_0`,
        },
        {
            name: `혈압DT(최근1)`,
            key: `BP_MESURE_DT_1`,
        },
        {
            name: `혈압DT(최근2)`,
            key: `BP_MESURE_DT_2`,
        },
        {
            name: `혈압DT(최근3)`,
            key: `BP_MESURE_DT_3`,
        },
        {
            name: `식전혈당(최초)`,
            key: `FBS_0`,
        },
        {
            name: `식전혈당(최근1)`,
            key: `FBS_1`,
        },
        {
            name: `식전혈당(최근2)`,
            key: `FBS_2`,
        },
        {
            name: `식전혈당(최근3)`,
            key: `FBS_3`,
        },
        {
            name: `식전혈당DT(최초)`,
            key: `FBS_MESURE_DT_0`,
        },
        {
            name: `식전혈당DT(최근1)`,
            key: `FBS_MESURE_DT_1`,
        },
        {
            name: `식전혈당DT(최근2)`,
            key: `FBS_MESURE_DT_MESURE_DT_2`,
        },
        {
            name: `식전혈당DT(최근3)`,
            key: `FBS_MESURE_DT_MESURE_DT_3`,
        },
        {
            name: `중성지방(최초)`,
            key: `TG_0`,
        },
        {
            name: `중성지방(최근1)`,
            key: `TG_1`,
        },
        {
            name: `중성지방(최근2)`,
            key: `TG_2`,
        },
        {
            name: `중성지방(최근3)`,
            key: `TG_3`,
        },
        {
            name: `중성지방DT(최초)`,
            key: `TG_MESURE_DT_0`,
        },
        {
            name: `중성지방DT(최근1)`,
            key: `TG_MESURE_DT_1`,
        },
        {
            name: `중성지방DT(최근2)`,
            key: `TG_MESURE_DT_2`,
        },
        {
            name: `중성지방DT(최근3)`,
            key: `TG_MESURE_DT_3`,
        },
        {
            name: `HDLC(최초)`,
            key: `HDLC_0`,
        },
        {
            name: `HDLC(최근1)`,
            key: `HDLC_1`,
        },
        {
            name: `HDLC(최근2)`,
            key: `HDLC_2`,
        },
        {
            name: `HDLC(최근3)`,
            key: `HDLC_3`,
        },
        {
            name: `HDLCDT(최초)`,
            key: `HDLC_MESURE_DT_0`,
        },
        {
            name: `HDLCDT(최근1)`,
            key: `HDLC_MESURE_DT_1`,
        },
        {
            name: `HDLCDT(최근2)`,
            key: `HDLC_MESURE_DT_2`,
        },
        {
            name: `HDLCDT(최근3)`,
            key: `HDLC_MESURE_DT_3`,
        },
    ],
    Lists: [],
}
