export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure'
export type defaultYesNo = 'Y' | 'N'

export interface ServicesDefaultResult<T> {
    status: boolean
    message: string
    payload: T
}

export interface LocalTokenInterface {
    TOKEN_INFO: string
    VTOKEN_INFO: string
}

export interface INSTDEPT_LIST {
    BRTHDY: string
    CONFM_AT: string
    CONFM_DE: string
    DEPT_NM: null
    DEPT_NO: null
    INST_NM: string
    INST_NO: number
    MBER_NO: number
    MBTLNUM: string
    MEBER_NM: string
    NO: string
    SEXDSTN: string
    STAT: string
}
