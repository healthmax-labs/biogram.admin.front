import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import NonMeasureSearchBox from './NonMeasureSearchBox'
import NonMeasureManageBox from './NonMeasureManageBox'
import NonMeasureTable from './NonMeasureListTable'

import { getNonMeasureList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { RecoilStateKeyNameType } from '@CommonTypes'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const NonMeasureListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(NonMeasureListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
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
        } = listState

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
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    NOT_MESURE_NTCN_INFO_LIST: [],
                },
            }))
        }
    }, [listState, setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, listState.status])

    useEffect(() => {
        /**
         * 현재 활성화 되어 있는 텝을 닫았을때 MainTabComponent 에서 recoil을 리셋 했을경우
         * pageStart 함수에서 idle 로 인식해서 api를 다시 콜하는 버그를 해결하기 위해
         * 현재 텝에서 리셋해야 하는경우를 구분을 해서 현재 component가 사라질때 recoil을 리셋해준다.
         */
        return () => {
            if (tabState.close.recoilResetWhere === 'mainComponent') {
                recoilReset(tabState.close.recoilKey as RecoilStateKeyNameType)

                setTabState(prevState => ({
                    ...prevState,
                    close: {
                        closeIndex: null,
                        recoilKey: null,
                        recoilResetWhere: null,
                    },
                }))
            }
        }

        // FIXME : 종속성에서 recoilReset, setTabState, tabState.close.recoilKey, tabState.close.recoilResetWhere 업데이트 되면
        // 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabState.close])

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
