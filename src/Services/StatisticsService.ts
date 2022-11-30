import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { StatisticsListItemInterface } from '@Type/StatusTypes'

/**
 * 기기측정 현황 리스트
 */
export function getStatisticsList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BEGIN_DE,
    END_DE,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    BEGIN_DE: string
    END_DE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        DEVICE_MESURE_INFO_LIST: StatisticsListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/device_mesure/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BEGIN_DE,
            END_DE,
        },
    })
}
