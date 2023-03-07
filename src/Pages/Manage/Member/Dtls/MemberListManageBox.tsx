import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import {
    VaryButton,
    VaryModal,
    VaryTextArea,
    PstinstAgreeModal,
} from '@Elements'
import { useMainLayouts, useTab } from '@Hook/index'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { MemberListState, MemberDetailState } from '@Recoil/MemberPagesState'
import Messages from '@Messages'
import _ from 'lodash'
import { postMberInfoDelete } from '@Service/MemberService'
import Const from '@Const'
import { AtomRootState } from '@Recoil/AppRootState'
import { useNavigate } from 'react-router-dom'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        memDelete: false,
        pstinstAgree: false,
    },
}

const MemberListManageBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const [listState, setListState] = useRecoilState(MemberListState)
    const memberDetailStateReset = useResetRecoilState(MemberDetailState)
    const rootState = useRecoilValue(AtomRootState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        modal: {
            memDelete: boolean
            pstinstAgree: boolean
        }
    }>(initializeState)

    return (
        <>
            <Wapper>
                <Buttons>
                    <VaryButton
                        ButtonType={`manage`}
                        HandleClick={() => {
                            handleDeleteTabbyMatchRouter(
                                '/manage/member/:MEMBER_NO/detail'
                            )
                            memberDetailStateReset()
                            navigate({
                                pathname: `${process.env.PUBLIC_URL}/manage/member/new-member`,
                            })
                        }}
                        ButtonName={'신규회원등록'}
                    />
                    <VaryButton
                        ButtonType={`manage`}
                        ButtonName={'회원 탈퇴'}
                        HandleClick={() => {
                            const {
                                manage: { checkRow },
                                list: { MBER_INFO_LIST },
                            } = listState

                            if (checkRow.length === 0) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.member.leave.empty,
                                })

                                return
                            }

                            if (checkRow.length > 1) {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.member.leave.over,
                                })

                                return
                            }

                            const findTask = _.find(MBER_INFO_LIST, {
                                MBER_NO: Number(checkRow[0]),
                            })

                            if (_.isEmpty(findTask)) {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.dataGetFail,
                                })

                                return
                            }

                            setListState(prevState => ({
                                ...prevState,
                                manage: {
                                    ...prevState.manage,
                                    checkRowName: findTask.NM,
                                },
                            }))

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    memDelete: true,
                                },
                            }))
                        }}
                    />
                    <VaryButton
                        ButtonType={`manage`}
                        HandleClick={() => {
                            //
                        }}
                        ButtonName={'엑셀내려받기'}
                    />
                </Buttons>
            </Wapper>
            {pageState.modal.memDelete && (
                <VaryModal
                    MaxWidth={`lg`}
                    ModalLoading={false}
                    NeedMax={false}
                    Children={
                        <div className={`w-full justify-evenly`}>
                            <div className="break-normal">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: _.replace(
                                            Messages.Default.memberDeleteTitle,
                                            `_NAME_`,
                                            listState.manage.checkRowName
                                        ),
                                    }}></div>
                            </div>

                            <VaryTextArea
                                Rows={10}
                                Placeholder={`사유를 입력해 주세요`}
                                Value={listState.manage.memDeleteMemo}
                                HandleOnChange={e =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        manage: {
                                            ...prevState.manage,
                                            memDeleteMemo: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                    }
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'취소'}
                                HandleClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            memDelete: false,
                                        },
                                    }))
                                }
                            />
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={'확인'}
                                HandleClick={async () => {
                                    const { checkRow, memDeleteMemo } =
                                        listState.manage

                                    if (_.isEmpty(memDeleteMemo)) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default
                                                    .memberDeleteMemoEmpty,
                                        })

                                        return
                                    }

                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            memDelete: false,
                                        },
                                    }))

                                    const { status } = await postMberInfoDelete(
                                        {
                                            memNo: checkRow[0],
                                            secsnResnCode:
                                                Const.memberDeleteResnCode,
                                            secsnResnEtc: memDeleteMemo,
                                        }
                                    )

                                    setListState(prevState => ({
                                        ...prevState,
                                        manage: {
                                            ...prevState.manage,
                                            checkRowName: '',
                                            memDeleteMemo: '',
                                            checkRow: [],
                                        },
                                    }))

                                    if (status) {
                                        HandleGetList()

                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default
                                                    .memberDeleteSuccess,
                                        })
                                    } else {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.processFail,
                                        })
                                    }
                                }}
                            />
                        </>
                    }
                />
            )}
            {pageState.modal.pstinstAgree && (
                <PstinstAgreeModal
                    InfoNo={
                        rootState.userinfo.INST_NM
                            ? Number(rootState.userinfo.INST_NM)
                            : 1000
                    }
                    InfoType={`stplat`}
                    HandleClickApplyButton={e => {
                        const checked = _.filter(e, ck => ck.check === 'Y')

                        if (checked.length !== e.length) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.notAllAgree,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                pstinstAgree: false,
                            },
                        }))
                    }}
                    HandleClickCancleButtion={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                pstinstAgree: false,
                            },
                        }))
                    }
                />
            )}
        </>
    )
}

export default MemberListManageBox
