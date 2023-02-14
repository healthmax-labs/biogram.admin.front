import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import NonMeasureSearchBox from './NonMeasureSearchBox'
import NonMeasureTable from './NonMeasureListTable'

import { getNonMeasureList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper } = MainStyle

const NonMeasureListMain = () => {
    const [nonMeasureListState, setNonMeasureListState] =
        useRecoilState(NonMeasureListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                INST_NO,
                MESURE_DT,
                BP_NTCN_AT,
                BS_NTCN_AT,
                BC_NTCN_AT,
                HA_NTCN_AT,
                IS_NTCN_AT,
                SR_NTCN_AT,
                SB_NTCN_AT,
                AND_AT,
                cur_page,
                SEARCH_KEY,
            },
        } = nonMeasureListState

        const { status, payload } = await getNonMeasureList({
            cur_page: !isNull(cur_page) ? cur_page : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : 1000,
            MESURE_DT: !isNull(MESURE_DT) ? MESURE_DT : '',
            BP_NTCN_AT: !isNull(BP_NTCN_AT) ? BP_NTCN_AT : '',
            BS_NTCN_AT: !isNull(BS_NTCN_AT) ? BS_NTCN_AT : '',
            BC_NTCN_AT: !isNull(BC_NTCN_AT) ? BC_NTCN_AT : '',
            HA_NTCN_AT: !isNull(HA_NTCN_AT) ? HA_NTCN_AT : '',
            IS_NTCN_AT: !isNull(IS_NTCN_AT) ? IS_NTCN_AT : '',
            SR_NTCN_AT: !isNull(SR_NTCN_AT) ? SR_NTCN_AT : '',
            SB_NTCN_AT: !isNull(SB_NTCN_AT) ? SB_NTCN_AT : '',
            AND_AT: !isNull(AND_AT) ? AND_AT : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
        })

        if (status) {
            setNonMeasureListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setNonMeasureListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    NOT_MESURE_NTCN_INFO_LIST: [],
                },
            }))
        }
    }, [nonMeasureListState, setNonMeasureListState])

    useEffect(() => {
        const pageStart = () => {
            if (nonMeasureListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, nonMeasureListState.status])

    return (
        <Container>
            <SearchWapper>
                <NonMeasureSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <NonMeasureTable />
            </TableWapper>
        </Container>
    )
}

export default NonMeasureListMain
