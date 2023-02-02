import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton, VaryModal, VaryTextArea } from '@Elements'
import { useMainLayouts } from '@Hook/index'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import Messages from '@Messages'
import _ from 'lodash'
import { postMberInfoDelete } from '@Service/MemberService'
import Const from '@Const'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        memDelete: false,
    },
}

const MemberListManageBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const { handlMainAlert } = useMainLayouts()
    const [listState, setListState] = useRecoilState(MemberListState)

    const [pageState, setPageState] = useState<{
        modal: {
            memDelete: boolean
        }
    }>(initializeState)

    return (
        <>
            <Wapper>
                <Buttons>
                    <VaryButton
                        ButtonType={`manage`}
                        HandleClick={() => {
                            //
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
                            <div
                                className={`mt-0 text-base leading-relaxed pb-3`}
                                dangerouslySetInnerHTML={{
                                    __html: _.replace(
                                        Messages.Default.memberDeleteTitle,
                                        `_NAME_`,
                                        listState.manage.checkRowName
                                    ),
                                }}></div>
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
        </>
    )
}

export default MemberListManageBox
