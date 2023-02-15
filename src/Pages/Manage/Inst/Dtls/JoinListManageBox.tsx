import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ConfirmModal, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { postInstPstinstConfmUpdate } from '@Service/InstService'
import _ from 'lodash'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        approval: false,
        reject: false,
    },
}

const ManageBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const { handlMainAlert } = useMainLayouts()
    const listState = useRecoilValue(InstJoinListState)

    const [pageState, setPageState] = useState<{
        modal: {
            approval: boolean
            reject: boolean
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
                                    Messages.Default.inst.approval.appEmpty,
                            })

                            return
                        }

                        if (checkRow.length > 1) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.inst.approval.appOver,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                approval: true,
                            },
                        }))
                    }}
                    ButtonName={'승인'}
                />
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
                                    Messages.Default.inst.approval.appEmpty,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                reject: true,
                            },
                        }))
                    }}
                    ButtonName={'거절'}
                />
            </Buttons>

            {pageState.modal.approval && (
                <ConfirmModal
                    Title={`승인 처리 하시겠습니까?`}
                    ApplyButtonClick={async () => {
                        const {
                            manage: { checkRow },
                        } = listState

                        let instNo: number | null = 0

                        _.forEach(checkRow, e => {
                            const findTask = _.find(
                                listState.list.PSTINST_REQUEST_INFO_LIST,
                                {
                                    MBER_NO: Number(e),
                                }
                            )

                            instNo = _.isEmpty(findTask)
                                ? null
                                : findTask.INST_NO
                        })

                        if (instNo) {
                            const { status } = await postInstPstinstConfmUpdate(
                                {
                                    flag: 'Y',
                                    INST_NO: instNo,
                                    MBER_LIST: checkRow.map(e => {
                                        return {
                                            MBER_NO: e,
                                        }
                                    }),
                                    REJECT_RESN: '',
                                }
                            )

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    approval: false,
                                },
                            }))

                            if (status) {
                                HandleGetList()

                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.inst.approval
                                            .appSuccess,
                                })
                            } else {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.processFail,
                                })
                            }
                        } else {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.infoGetFail,
                            })
                        }
                    }}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                approval: false,
                            },
                        }))
                    }}
                />
            )}

            {pageState.modal.reject && (
                <ConfirmModal
                    Title={`거절 처리 하시겠습니까?`}
                    ApplyButtonClick={async () => {
                        const {
                            manage: { checkRow },
                        } = listState

                        let instNo: number | null = 0

                        _.forEach(checkRow, e => {
                            const findTask = _.find(
                                listState.list.PSTINST_REQUEST_INFO_LIST,
                                {
                                    MBER_NO: Number(e),
                                }
                            )

                            instNo = _.isEmpty(findTask)
                                ? null
                                : findTask.INST_NO
                        })
                        if (instNo) {
                            const { status } = await postInstPstinstConfmUpdate(
                                {
                                    flag: 'N',
                                    INST_NO: instNo,
                                    MBER_LIST: checkRow.map(e => {
                                        return {
                                            MBER_NO: e,
                                        }
                                    }),
                                    REJECT_RESN: '관리자에 의한 가입 승인거부',
                                }
                            )

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    reject: false,
                                },
                            }))

                            if (status) {
                                HandleGetList()
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.inst.approval
                                            .rejectSuccess,
                                })
                            } else {
                                handlMainAlert({
                                    state: true,
                                    message: Messages.Default.processFail,
                                })
                            }
                        } else {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.infoGetFail,
                            })
                        }
                    }}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                reject: false,
                            },
                        }))
                    }}
                />
            )}
        </Wapper>
    )
}

export default ManageBox
