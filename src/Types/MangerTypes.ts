import { DefaultYesNo, StplatKndCodeType, StplatSeCodeType } from '@CommonTypes'

//이용 약관 리스트
export interface StplatListItemInterface {
    STPLAT_SE_CODE: string
    STPLAT_SE_CODE_NM: string
    STPLAT_KND_CODE: string
    STPLAT_KND_CODE_NM: string
    STPLAT_SN: string
    STPLAT_CHANGE_DE: string
    STPLAT_CHANGE_RESN: string
}

export interface StplatListInterface {
    STPLAT_MANAGE_INFO_LIST: StplatListItemInterface[]
    TOTAL_COUNT: number
}

// 이용약관 상세

export interface StplatInfoHistListItemInterface {
    STPLAT_KND_CODE: StplatKndCodeType
    STPLAT_CHANGE_DE: string
    STPLAT_SN: number
    STPLAT_CHANGE_RESN: string
    STPLAT_SE_CODE: StplatSeCodeType
}

export interface StplatInfoInterface {
    STPLAT_MANAGE_HIST_LIST: StplatInfoHistListItemInterface[]
    STPLAT_MANAGE_INFO: {
        STPLAT_KND_CODE: StplatKndCodeType
        STPLAT_SE_CODE_NM: string
        USE_AT: DefaultYesNo
        REGIST_ID: string
        STPLAT_CHANGE_DE: string
        STPLAT_SN: number
        STPLAT_CHANGE_RESN: string
        REGIST_DT: string
        STPLAT_SE_CODE: StplatSeCodeType
        STPLAT_KND_CODE_NM: string
        STPLAT_DC: string
    }
}
