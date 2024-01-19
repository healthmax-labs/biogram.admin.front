import React, { useCallback, useEffect, useState } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import ManageBox from './NoticeManageBox'
import SearchBox from './NoticeSearchBox'
import ListTable from './NoticeListTable'
import { useRecoilState } from 'recoil'
import { NoticeListState } from '@Recoil/HelperPageState'
import { getNoticeList, getNoticeLog } from '@Service/HelperService'
import { useMainLayouts, useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { DefaultStatus, RecoilStateKeyNameType } from '@CommonTypes'
import { VaryButton, VaryModal } from '@Element/index'
import { ModalDefaultTableStyle as MDTS } from '@Style/Elements/TableStyles'
import _ from 'lodash'
import Messages from '@Messages'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const initialzeState = {
    clickCountPostID: ``,
    modal: {
        clickCount: false,
    },
    clickCountList: {
        status: `idle`,
        list: [],
    },
}

const NoticeListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        clickCountPostID: string
        modal: {
            clickCount: boolean
        }
        clickCountList: {
            status: string | DefaultStatus
            list: Array<{
                INST_NO: string
                INST_NM: string
                NM: string
                REGIST_ID: string
                REGIST_DT: string
            }>
        }
    }>(initialzeState)

    const [noticeListState, setNoticeListState] =
        useRecoilState(NoticeListState)

    const getList = useCallback(async () => {
        setNoticeListState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status, payload } = await getNoticeList()

        if (status) {
            setNoticeListState(prevState => ({
                ...prevState,
                status: `success`,
                list: payload,
            }))
        } else {
            setNoticeListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: {
                    POST_NOTICE_INFO: [],
                },
            }))
        }
    }, [setNoticeListState])

    const handleViewCountModal = async ({ POST_ID }: { POST_ID: string }) => {
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                clickCount: true,
            },
        }))

        const { status, payload } = await getNoticeLog({ POST_ID: POST_ID })
        if (status) {
            setPageState(prevState => ({
                ...prevState,
                clickCountList: {
                    ...prevState.clickCountList,
                    status: `success`,
                    list: payload.POST_VIEW_LOG_LIST,
                },
            }))
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        const pageStart = () => {
            if (noticeListState.status === 'idle') {
                getList().then()
            }
        }

        pageStart()
    }, [getList, noticeListState])

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
                <SearchBox HandleGetList={() => getList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable
                    HandleViewCountModal={e =>
                        handleViewCountModal({ POST_ID: e.POST_ID })
                    }
                />
            </TableWapper>

            {pageState.modal.clickCount && (
                <VaryModal
                    ModalLoading={pageState.clickCountList.status === 'loading'}
                    Children={
                        <MDTS.TableBox>
                            <MDTS.TableWapper>
                                <MDTS.TableHeader>
                                    <MDTS.HeaderRow>
                                        <MDTS.HeaderCell>소속</MDTS.HeaderCell>
                                        <MDTS.HeaderCell>이름</MDTS.HeaderCell>
                                        <MDTS.HeaderCell>일시</MDTS.HeaderCell>
                                    </MDTS.HeaderRow>
                                </MDTS.TableHeader>
                                <MDTS.TableBody>
                                    {pageState.clickCountList.list.length ==
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
                                            pageState.clickCountList.list,
                                            (e, index) => {
                                                return (
                                                    <MDTS.TableBodyRow
                                                        key={`helper-notice-list-click-count-modal-table-row-item-${index}`}
                                                        BgState={true}>
                                                        <MDTS.TableBodyCell>
                                                            <MDTS.ItemWapper>
                                                                {e.INST_NM}
                                                            </MDTS.ItemWapper>
                                                        </MDTS.TableBodyCell>
                                                        <MDTS.TableBodyCell>
                                                            <MDTS.ItemWapper>
                                                                {e.NM}
                                                            </MDTS.ItemWapper>
                                                        </MDTS.TableBodyCell>
                                                        <MDTS.TableBodyCell>
                                                            <MDTS.ItemWapper>
                                                                {e.REGIST_DT}
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
                    }
                    MaxWidth={'lg'}
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'닫기'}
                                HandleClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            clickCount: false,
                                        },
                                        clickCountList: {
                                            ...prevState.clickCountList,
                                            status: `idle`,
                                            list: [],
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

export default NoticeListMain
