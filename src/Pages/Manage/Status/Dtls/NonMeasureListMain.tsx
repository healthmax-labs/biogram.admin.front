import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import NonMeasureSearchBox from './NonMeasureSearchBox'
import NonMeasureManageBox from './NonMeasureManageBox'
import NonMeasureTable from './NonMeasureListTable'

import { getNonMeasureList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { NonMeasureListState } from '@Recoil/StatusPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const NonMeasureListMain = () => {
    const [nonMeasureListState, setNonMeasureListState] =
        useRecoilState(NonMeasureListState)

    const getTableList = useCallback(async () => {
        setNonMeasureListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
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
                BF_N_MESURE_DAY,
                WORK_TY_CODE,
            },
        } = nonMeasureListState

        const { status, payload } = await getNonMeasureList({
            cur_page: cur_page,
            INST_NO: INST_NO,
            MESURE_DT: MESURE_DT,
            BP_NTCN_AT: BP_NTCN_AT,
            BS_NTCN_AT: BS_NTCN_AT,
            BC_NTCN_AT: BC_NTCN_AT,
            HA_NTCN_AT: HA_NTCN_AT,
            IS_NTCN_AT: IS_NTCN_AT,
            SR_NTCN_AT: SR_NTCN_AT,
            SB_NTCN_AT: SB_NTCN_AT,
            AND_AT: AND_AT,
            SEARCH_KEY: SEARCH_KEY,
            BF_N_MESURE_DAY: BF_N_MESURE_DAY,
            WORK_TY_CODE: WORK_TY_CODE,
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
            <ManageWapper>
                <NonMeasureManageBox />
            </ManageWapper>
            <TableWapper>
                <NonMeasureTable />
            </TableWapper>
        </Container>
    )
}

export default NonMeasureListMain
