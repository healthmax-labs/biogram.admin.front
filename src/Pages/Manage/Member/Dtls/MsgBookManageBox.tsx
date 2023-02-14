import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ConfirmModal, VaryButton } from '@Elements'
import { MsgBookListState } from '@Recoil/MemberPagesState'
import { useRecoilValue } from 'recoil'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { postMberCanclSmsresve } from '@Service/MemberService'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        confirm: false,
    },
}

const MsgBookManageBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const { handlMainAlert } = useMainLayouts()
    const listState = useRecoilValue(MsgBookListState)

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        const {
                            manage: { checkRow },
                        } = listState

                        if (checkRow.length === 0) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.msgCancleSend.empty,
                            })

                            return
                        }

                        if (checkRow.length > 1) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.msgCancleSend.over,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: true,
                            },
                        }))
                    }}
                    ButtonName={'예약 발송 취소'}
                />
            </Buttons>
            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={`예약 취소 하시겠습니까?`}
                    ApplyButtonClick={async () => {
                        const {
                            manage: { checkRow },
                        } = listState
                        const { status } = await postMberCanclSmsresve({
                            CMIDS: checkRow[0],
                        })

                        if (status) {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    confirm: false,
                                },
                            }))

                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.msgCancleSend
                                        .success,
                            })
                            HandleGetList()
                        } else {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.processFail,
                            })
                        }
                    }}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                />
            )}
        </Wapper>
    )
}

export default MsgBookManageBox
