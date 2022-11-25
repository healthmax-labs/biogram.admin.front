import { _Axios_ } from '@Modules'
import {
    MberCashInfoInterface,
    MybodyManageScoreInterface,
    ServicesDefaultResult,
} from '@CommonTypes'

/**
 * 내몸관리지수
 * @param memNo
 * @param startDate
 * @param endDate
 */
export const getDataMybodyManageScore = ({
    memNo,
    startDate,
    endDate,
}: {
    memNo: number
    startDate: string
    endDate: string
}): Promise<ServicesDefaultResult<MybodyManageScoreInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/data/v1/mybody_manage_score/${memNo}/${startDate}/${endDate}`,
        payload: {},
    })
}

///mber/v1/cash/info/87334?start_de=20221025&end_de=20221124&change_se_code=&order_gbn=D
export const getCashInfo = ({
    memNo,
    startDate,
    endDate,
}: {
    memNo: number
    startDate: string
    endDate: string
}): Promise<ServicesDefaultResult<MberCashInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `mber/v1/cash/info/${memNo}?start_de=${startDate}&end_de=${endDate}&change_se_code=&order_gbn=D`,
        payload: {},
    })
}
