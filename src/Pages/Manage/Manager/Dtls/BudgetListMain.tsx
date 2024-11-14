import ManageBox from './BudgetListManageBox'
import ListTable from './BudgetListTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import React, { useCallback, useEffect, useState } from 'react'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { BudgetListState } from '@Recoil/ManagerPagesState'
import { useRecoilReset } from '@Hook/index'
import {
    getInstInfoBudgetAsign,
    getInstInfoBdgetAsignDaly,
} from '@Service/ManagerService'
import { ModalDefaultTableStyle as MDTS } from '@Style/Elements/TableStyles'
import { VaryButton, VaryModal } from '@Element/index'
import _ from 'lodash'
import { addComma } from '@Helper'

const {
    ListPage: { Container },
} = PageContainerStyle
const { TableWapper, ManageWapper } = MainStyle

const initializeState = {
    modal: {
        countModal: false,
    },
}

const BudgetListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(BudgetListState)

    const [pageState, setPageState] = useState<{
        modal: {
            countModal: boolean
        }
    }>(initializeState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status, payload } = await getInstInfoBudgetAsign()
        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: `success`,
                list: payload,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: {
                    BUDGET_ASIGN_INFO_LIST: [],
                },
            }))
        }
    }, [setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status === 'idle') {
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
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable
                    HandleDayHisoryModal={async ({ INST_NO, BUDGET_SN }) => {
                        setListState(prevState => ({
                            ...prevState,
                            history: {
                                ...prevState.history,
                                status: `loading`,
                            },
                        }))
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                countModal: true,
                            },
                        }))
                        const { status, payload } =
                            await getInstInfoBdgetAsignDaly({
                                INST_NO: String(INST_NO),
                                BUDGET_SN: String(BUDGET_SN),
                            })

                        if (status) {
                            setListState(prevState => ({
                                ...prevState,
                                history: {
                                    ...prevState.history,
                                    status: `success`,
                                    list: payload,
                                },
                            }))
                        } else {
                            setListState(prevState => ({
                                ...prevState,
                                history: {
                                    ...prevState.history,
                                    status: `failure`,
                                    list: {
                                        DALY_BUDGET_ASIGN_INFO_LIST: [],
                                    },
                                },
                            }))
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    countModal: false,
                                },
                            }))
                        }
                    }}
                />
            </TableWapper>
            {pageState.modal.countModal && (
                <VaryModal
                    ModalLoading={listState.history.status === 'loading'}
                    Children={
                        <>
                            <MDTS.TableBox>
                                <MDTS.TableWapper>
                                    <MDTS.TableHeader>
                                        <MDTS.HeaderRow>
                                            <MDTS.HeaderCell>
                                                날짜
                                            </MDTS.HeaderCell>
                                            <MDTS.HeaderCell>
                                                예산
                                            </MDTS.HeaderCell>
                                            <MDTS.HeaderCell>
                                                사용금액
                                            </MDTS.HeaderCell>
                                        </MDTS.HeaderRow>
                                    </MDTS.TableHeader>
                                    <MDTS.TableBody>
                                        {listState.history.list
                                            .DALY_BUDGET_ASIGN_INFO_LIST
                                            .length == 0 ? (
                                            <MDTS.TableBodyRow BgState={true}>
                                                <MDTS.TableBodyEmptyCell
                                                    colSpan={3}>
                                                    <MDTS.ItemWapper>
                                                        {`데이터가 존재 하지 않습니다`}
                                                    </MDTS.ItemWapper>
                                                </MDTS.TableBodyEmptyCell>
                                            </MDTS.TableBodyRow>
                                        ) : (
                                            _.map(
                                                listState.history.list
                                                    .DALY_BUDGET_ASIGN_INFO_LIST,
                                                (e, index) => {
                                                    return (
                                                        <MDTS.TableBodyRow
                                                            key={`popup-manage-list-cliek-modal-table-row-item-${index}`}
                                                            BgState={true}>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {
                                                                        e.BUDGET_USE_DE
                                                                    }
                                                                </MDTS.ItemWapper>
                                                            </MDTS.TableBodyCell>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {addComma(
                                                                        e.BUDGET_AMOUNT
                                                                    )}
                                                                </MDTS.ItemWapper>
                                                            </MDTS.TableBodyCell>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {addComma(
                                                                        e.BUDGET_BLCE
                                                                    )}
                                                                </MDTS.ItemWapper>
                                                            </MDTS.TableBodyCell>
                                                        </MDTS.TableBodyRow>
                                                    )
                                                }
                                            )
                                        )}
                                    </MDTS.TableBody>
                                </MDTS.TableWapper>
                            </MDTS.TableBox>
                        </>
                    }
                    MaxWidth={'lg'}
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'닫기'}
                                HandleClick={() => {
                                    setListState(prevState => ({
                                        ...prevState,
                                        countModal: {
                                            satus: 'idle',
                                            list: [],
                                        },
                                    }))
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            countModal: false,
                                        },
                                    }))
                                }}
                            />
                        </>
                    }
                />
            )}
        </Container>
    )
}

export default BudgetListMain
