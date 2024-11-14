import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ConfirmModal, VaryButton } from '@Element/index'
import { useNavigate } from 'react-router-dom'
import { useMainLayouts, useTab } from '@Hook/index'
import { getMngCnstgrpDelete } from '@Service/MemberService'
import {
    ConsultGroupDetailState,
    ConsultGroupListState,
} from '@Recoil/MemberPagesState'
import { useResetRecoilState, useRecoilValue } from 'recoil'
import Messages from '@Messages'
import _ from 'lodash'
import { AtomRootState } from '@Recoil/AppRootState'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        deleteConfirm: false,
    },
}

const ConsultGroupManageBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [pageState, setPageState] = useState<{
        modal: {
            deleteConfirm: boolean
        }
    }>(initializeState)
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const consultGroupDetailStateReset = useResetRecoilState(
        ConsultGroupDetailState
    )
    const consultGroupListState = useRecoilValue(ConsultGroupListState)
    const { handleDeleteTabbyMatchRouter } = useTab()
    const rootState = useRecoilValue(AtomRootState)

    const handleDeleteGroup = useCallback(async () => {
        const {
            manage: { checkRow },
        } = consultGroupListState

        const selectGroup = checkRow[0]
        let checkPermission = true

        const findGroup = _.find(consultGroupListState.list.CNST_GRP_LIST, {
            CNST_GRP_NO: Number(selectGroup),
        })

        // 조회 안되면 삭제 불가증
        if (!findGroup) {
            checkPermission = false
        }

        // 조회 되고 구분이 공유면 삭제 가능
        if (findGroup && findGroup.PERM !== 'G-') {
            checkPermission = true
        }

        // 조회되고 개인 일때 다른 사람이 등록한거면 불가능
        if (findGroup && findGroup.PERM !== '-U') {
            checkPermission = findGroup.MBER_NO === rootState.userinfo.MBER_NO
        }

        if (!checkPermission) {
            handlMainAlert({
                state: true,
                message: Messages.Default.member.groupControll.deletePermission,
            })
            return
        }

        const { status } = await getMngCnstgrpDelete({
            groupNo: Number(selectGroup),
        })
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            HandleGetList()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [
        HandleGetList,
        consultGroupListState,
        handlMainAlert,
        rootState.userinfo.MBER_NO,
    ])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'등록'}
                    HandleClick={() => {
                        if (
                            _.isEmpty(consultGroupListState.search.instNo) ||
                            _.isEmpty(consultGroupListState.search.instNm)
                        ) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.pstinstSelectEmpty,
                            })
                            return
                        }

                        handleDeleteTabbyMatchRouter(
                            `/manage/member/consult-group/:groupNo/detail`
                        )

                        consultGroupDetailStateReset()

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/member/consult-group-list/new`,
                        })
                    }}
                />
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'삭제'}
                    HandleClick={() => {
                        if (
                            consultGroupListState.manage.checkRow.length === 0
                        ) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.consult.emptyCheckRow,
                            })

                            return
                        }

                        if (consultGroupListState.manage.checkRow.length > 1) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.consult.manyCheckRow,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState,
                                deleteConfirm: true,
                            },
                        }))
                    }}
                />
            </Buttons>
            {pageState.modal.deleteConfirm && (
                <ConfirmModal
                    Title={Messages.Default.consult.deleteConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                deleteConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                deleteConfirm: false,
                            },
                        }))
                        handleDeleteGroup().then()
                    }}
                />
            )}
        </Wapper>
    )
}

export default ConsultGroupManageBox
