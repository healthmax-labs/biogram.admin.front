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
