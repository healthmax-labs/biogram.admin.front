import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import QnaListTable from './QnaListTable'
import QnaManageBox from './QnaManageBox'
import React, { useCallback, useEffect, useState } from 'react'
import QnaSearchBox from './QnaSearchBox'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useMainLayouts, useRecoilReset } from '@Hook/index'
import { QnaListState } from '@Recoil/HelperPageState'
import { getQuestionlist } from '@Service/HelperService'
import { AtomRootState } from '@Recoil/AppRootState'
import _ from 'lodash'
import { VaryModal } from '@Elements'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const initializeState = {
    modal: {
        voidLoading: false,
        likeMessage: false,
    },
}

const QnaListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(QnaListState)
    const RootState = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        modal: {
            voidLoading: boolean
            likeMessage: boolean
        }
    }>(initializeState)
    const { handlMainAlert } = useMainLayouts()

    const getList = useCallback(async () => {
        const {
            userinfo: { MBER_NO },
        } = RootState

        if (MBER_NO) {
            setListState(prevState => ({
                ...prevState,
                status: `loading`,
            }))

            const { status, payload } = await getQuestionlist()
            if (status) {
                setListState(prevState => ({
                    ...prevState,
                    status: `success`,
                    list: {
                        QUESTION_LIST: _.map(payload.QUESTION_LIST, e => {
                            return {
                                ...e,
                                MBER_NO: MBER_NO,
                            }
                        }),
                    },
                }))
            } else {
                setListState(prevState => ({
                    ...prevState,
                    status: `failure`,
                    list: {
                        QUESTION_LIST: [],
                    },
                }))
            }
        } else {
            setListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: {
                    QUESTION_LIST: [],
                },
            }))
        }
    }, [RootState, setListState])

    useEffect(() => {
        /**
         *  리스트에서 like 버튼을 클릭후 리스트를 다시 가지고 와야 하는데 like 보여지는 부분에서 Recoil, 에 접근을 할수 없기 때문에
         *  버튼 클릭시 강제로 2초동안 로빙 모달을 보여주고 강제로 리스트를 다시 가지고 오는 로직으로 처리함
         */
        const funCLoseVoidModal = () => {
            getList().then(() =>
                setPageState(prevState => ({
                    ...prevState,
                    modal: {
                        ...prevState.modal,
                        voidLoading: false,
                    },
                }))
            )
        }

        if (pageState.modal.voidLoading) {
            const timer = setTimeout(() => {
                funCLoseVoidModal()
            }, 2000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [getList, pageState.modal.voidLoading])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status === `idle`) {
                getList().then()
            }
        }

        pageStart()
    }, [getList, listState.status])

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
                <QnaSearchBox HandleGetList={() => getList()} />
            </SearchWapper>
            <ManageWapper>
                <QnaManageBox />
            </ManageWapper>
            <TableWapper>
                <QnaListTable
                    VoidLoadingModal={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                voidLoading: true,
                            },
                        }))
                    }
                    LikeButtonMessageModal={({ message }) => {
                        handlMainAlert({ state: true, message: message })
                    }}
                />
            </TableWapper>
            {pageState.modal.voidLoading && (
                <VaryModal
                    ModalLoading={true}
                    MaxWidth={'sm'}
                    Children={<></>}
                />
            )}
        </Container>
    )
}

export default QnaListMain
