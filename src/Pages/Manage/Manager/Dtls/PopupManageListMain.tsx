import React, { useCallback, useEffect, useState } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { DetailPageStyle } from '@Style/Pages/ManagerPageStyle'
import { ModalDefaultTableStyle as MDTS } from '@Style/Elements/TableStyles'
import PopupManageListTable from './PopupManageListTable'
import {
    getPopupList,
    getPopupViewMberList,
    getPopupClickMberList,
} from '@Service/ManagerService'
import { useRecoilState } from 'recoil'
import { PopupManageListState } from '@Recoil/ManagerPagesState'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import {
    DefaultStatus,
    ExcelDownloadPropsInterface,
    RecoilStateKeyNameType,
} from '@CommonTypes'
import PopupManageListMangeBox from './PopupManageListMangeBox'
import { ExcelDownload, VaryButton, VaryModal } from '@Elements'
import _ from 'lodash'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { getNowDateDetail } from '@Helper'

const {
    ListPage: { Container },
} = PageContainerStyle
const { TableWapper, ManageWapper } = MainStyle

const { ListClickModal: ListClickModalStyle } = DetailPageStyle.PopupManage

const initializeState = {
    modal: {
        countModal: false,
        excelDownload: false,
    },
    countKey: null,
    excel: {
        status: 'idle',
    },
}

const PopupManageListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(PopupManageListState)

    const [pageState, setPageState] = useState<{
        modal: {
            countModal: boolean
            excelDownload: boolean
        }
        countKey: string | null
        excel: {
            status: string | DefaultStatus
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Manager.PopupManageCountModal
        )

    const handleGetExcelData = useCallback(async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: (() => {
                if (pageState.countKey === 'DISPLAY_CNT') {
                    return `팝업_노출수_${getNowDateDetail()}`
                } else if (pageState.countKey === 'CLICK_CNT') {
                    return `팝업_클릭수_${getNowDateDetail()}`
                }

                return `팝업_노출수_${getNowDateDetail()}`
            })(),
            Data: listState.countModal.list.map(m => {
                return [String(m.MBER_NO), m.NM, m.REGIST_DT]
            }),
        }))
    }, [listState.countModal.list, pageState.countKey])

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { status, payload } = await getPopupList()

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
                    POPUP_INFO: [],
                },
            }))
        }
    }, [setListState])

    const handleGetDisplayCountModalData = async ({ pk }: { pk: string }) => {
        setListState(prevState => ({
            ...prevState,
            countModal: {
                ...prevState.countModal,
                satus: 'loading',
            },
        }))
        const { status, payload } = await getPopupViewMberList({ PK: pk })
        if (status) {
            setListState(prevState => ({
                ...prevState,
                countModal: {
                    ...prevState.countModal,
                    satus: 'failure',
                    list: payload.DISPLAY_MEMBER_LIST,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                countModal: {
                    ...prevState.countModal,
                    satus: 'failure',
                    list: [],
                },
            }))
        }
    }

    const handleGetClickCountModalData = async ({ pk }: { pk: string }) => {
        setListState(prevState => ({
            ...prevState,
            countModal: {
                ...prevState.countModal,
                satus: 'loading',
            },
        }))
        const { status, payload } = await getPopupClickMberList({ PK: pk })
        if (status) {
            setListState(prevState => ({
                ...prevState,
                countModal: {
                    ...prevState.countModal,
                    satus: 'failure',
                    list: payload.CLICK_MEMBER_LIST,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                countModal: {
                    ...prevState.countModal,
                    satus: 'failure',
                    list: [],
                },
            }))
        }
    }

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
            <ManageWapper>
                <PopupManageListMangeBox />
            </ManageWapper>
            <TableWapper>
                <PopupManageListTable
                    HandleCountModal={e => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                countModal: true,
                            },
                            countKey: e.countKey,
                        }))
                        if (e.countKey === 'DISPLAY_CNT') {
                            handleGetDisplayCountModalData({
                                pk: e.countIndex,
                            }).then()
                        } else if (e.countKey === 'CLICK_CNT') {
                            handleGetClickCountModalData({
                                pk: e.countIndex,
                            }).then()
                        }
                    }}
                />
            </TableWapper>
            {pageState.modal.countModal && (
                <VaryModal
                    ModalLoading={listState.countModal.satus === 'loading'}
                    Children={
                        <>
                            <ListClickModalStyle.ButtonBox>
                                <ListClickModalStyle.ButtonWapper>
                                    <ListClickModalStyle.ButtonFlex>
                                        <VaryButton
                                            Loading={false}
                                            ButtonType={'manage'}
                                            HandleClick={() => {
                                                handleGetExcelData().then(() =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        modal: {
                                                            ...prevState.modal,
                                                            excelDownload: true,
                                                        },
                                                    }))
                                                )
                                            }}
                                            ButtonName={'엑셀 다운로드'}
                                        />
                                    </ListClickModalStyle.ButtonFlex>
                                </ListClickModalStyle.ButtonWapper>
                            </ListClickModalStyle.ButtonBox>
                            <MDTS.TableBox>
                                <MDTS.TableWapper>
                                    <MDTS.TableHeader>
                                        <MDTS.HeaderRow>
                                            <MDTS.HeaderCell>
                                                회원번호
                                            </MDTS.HeaderCell>
                                            <MDTS.HeaderCell>
                                                이름
                                            </MDTS.HeaderCell>
                                            <MDTS.HeaderCell>
                                                일시
                                            </MDTS.HeaderCell>
                                        </MDTS.HeaderRow>
                                    </MDTS.TableHeader>
                                    <MDTS.TableBody>
                                        {listState.countModal.list.length ==
                                        0 ? (
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
                                                listState.countModal.list,
                                                (e, index) => {
                                                    return (
                                                        <MDTS.TableBodyRow
                                                            key={`popup-manage-list-cliek-modal-table-row-item-${index}`}
                                                            BgState={true}>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {e.MBER_NO}
                                                                </MDTS.ItemWapper>
                                                            </MDTS.TableBodyCell>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {e.NM}
                                                                </MDTS.ItemWapper>
                                                            </MDTS.TableBodyCell>
                                                            <MDTS.TableBodyCell>
                                                                <MDTS.ItemWapper>
                                                                    {
                                                                        e.REGIST_DT
                                                                    }
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
            {pageState.modal.excelDownload && (
                <ExcelDownload
                    {...excelDownloadProps}
                    DownloadEnd={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                excelDownload: false,
                            },
                        }))
                    }
                />
            )}
        </Container>
    )
}

export default PopupManageListMain
