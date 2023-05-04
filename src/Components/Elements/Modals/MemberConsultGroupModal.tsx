import React, { useCallback, useEffect, useState } from 'react'
import { ConfirmModal, VaryButton, VaryModal } from '@Element/index'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import { MemberConsultGroupModalStyle } from '@Style/Elements/ModalStyles'
import {
    ConsultGroupListResultItemInterface,
    ConsultMemberGroupListResultItemInterface,
} from '@Type/MemberTypes'
import {
    getMngCnstgrpList,
    postMngCnstgrpMberAdd,
    postMngCnstgrpMberRemove,
    postMemberMngCnstgrpMberList,
} from '@Service/MemberService'
import _ from 'lodash'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import Codes from '@Codes'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
} = CommonListTableStyle

const { FullWapper, FlexColFulWapper } = WapperStyle
const { TitleWapper, TitleBox } = MemberConsultGroupModalStyle

const initializeState = {
    loading: false,
    list: [],
    memberGroup: [],
    selectGroupNo: null,
    modal: {
        confirm: false,
    },
}

const MemberConsultGroupModal = ({
    ModalType,
    MemberNo,
    InstNo,
    CloseModal,
}: {
    ModalType: 'add' | 'remove'
    MemberNo: number
    InstNo: string
    CloseModal: () => void
}) => {
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        loading: boolean
        list: ConsultGroupListResultItemInterface[]
        memberGroup: ConsultMemberGroupListResultItemInterface[]
        selectGroupNo: number | null
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }))

        const { status, payload } = await getMngCnstgrpList({ instNo: InstNo })
        if (status) {
            setPageState(prevState => ({
                ...prevState,
                list: payload.CNST_GRP_LIST,
            }))

            setPageState(prevState => ({
                ...prevState,
                loading: false,
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                list: [],
                loading: false,
            }))
        }

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }))
    }, [InstNo])

    const handleGetMemberGroupList = useCallback(async () => {
        const { status, payload } = await postMemberMngCnstgrpMberList({
            memberNo: MemberNo,
        })
        if (status) {
            setPageState(prevState => ({
                ...prevState,
                memberGroup: payload.MBER_CNST_GRP_LIST,
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                memberGroup: [],
            }))
        }
    }, [MemberNo])

    const handleAdd = useCallback(
        async ({
            groupNo,
            memberNo,
        }: {
            groupNo: number
            memberNo: number
        }) => {
            const { status } = await postMngCnstgrpMberAdd({
                groupNo: groupNo,
                memberNo: memberNo,
            })
            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                CloseModal()
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        },
        [CloseModal, handlMainAlert]
    )

    const handleRemove = useCallback(
        async ({
            groupNo,
            memberNo,
        }: {
            groupNo: number
            memberNo: number
        }) => {
            const { status } = await postMngCnstgrpMberRemove({
                groupNo: groupNo,
                memberNo: memberNo,
            })
            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                CloseModal()
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        },
        [CloseModal, handlMainAlert]
    )

    useEffect(() => {
        const startPage = () => {
            handleGetList().then()
            handleGetMemberGroupList().then()
        }

        startPage()
    }, [handleGetList, handleGetMemberGroupList])

    return (
        <>
            <VaryModal
                ModalLoading={pageState.loading}
                NeedMax={false}
                MaxWidth={'sm'}
                Children={
                    <FlexColFulWapper>
                        <TitleWapper>
                            <TitleBox>
                                {ModalType === 'add'
                                    ? '추가할 그룹을 선택 하세요'
                                    : '삭제할 그룹을 선택 하세요'}
                            </TitleBox>
                        </TitleWapper>
                        <FullWapper>
                            <TableWapper>
                                <TableHeader>
                                    <HeaderRow>
                                        <HeaderCell>그룹명</HeaderCell>
                                        <HeaderCell>구분</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody HeightLimit={true} Scroll={true}>
                                    {_.map(
                                        pageState.list,
                                        (list, listIndex) => {
                                            const findCode = _.find(
                                                Codes.ConsultGroup,
                                                {
                                                    code: list.PERM,
                                                }
                                            )

                                            const codeName = findCode
                                                ? findCode.name
                                                : list.PERM

                                            return (
                                                <TableBodyRow
                                                    key={`member-consult-group-modal-item-row-${listIndex}`}
                                                    BgState={false}
                                                    onClick={() => {
                                                        const findData = _.find(
                                                            pageState.memberGroup,
                                                            {
                                                                CNST_GRP_NO:
                                                                    list.CNST_GRP_NO,
                                                            }
                                                        )

                                                        if (
                                                            findData &&
                                                            ModalType === 'add'
                                                        ) {
                                                            handlMainAlert({
                                                                state: true,
                                                                message:
                                                                    Messages
                                                                        .Default
                                                                        .member
                                                                        .groupControll
                                                                        .alreadyGruopMember,
                                                            })

                                                            return
                                                        }

                                                        if (
                                                            ModalType ===
                                                                'remove' &&
                                                            !findData
                                                        ) {
                                                            handlMainAlert({
                                                                state: true,
                                                                message:
                                                                    Messages
                                                                        .Default
                                                                        .member
                                                                        .groupControll
                                                                        .withoutGruopMember,
                                                            })

                                                            return
                                                        }

                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                selectGroupNo:
                                                                    list.CNST_GRP_NO,
                                                                modal: {
                                                                    confirm:
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    }}>
                                                    <TableBodyCell>
                                                        {`${list.CNST_GRP_NM}`}
                                                    </TableBodyCell>
                                                    <TableBodyCell>{`${codeName}`}</TableBodyCell>
                                                </TableBodyRow>
                                            )
                                        }
                                    )}
                                </TableBody>
                            </TableWapper>
                        </FullWapper>
                    </FlexColFulWapper>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'닫기'}
                            HandleClick={() => CloseModal()}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'저장'}
                            HandleClick={() => {
                                //
                            }}
                        />
                    </>
                }
            />
            {pageState.modal.confirm && pageState.selectGroupNo && (
                <ConfirmModal
                    Title={
                        ModalType === 'add'
                            ? Messages.Default.member.groupControll.addMember
                            : Messages.Default.member.groupControll.removeMember
                    }
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))

                        if (pageState.selectGroupNo) {
                            ModalType === 'add'
                                ? handleAdd({
                                      groupNo: pageState.selectGroupNo,
                                      memberNo: MemberNo,
                                  }).then()
                                : handleRemove({
                                      groupNo: pageState.selectGroupNo,
                                      memberNo: MemberNo,
                                  }).then()
                        }
                    }}
                />
            )}
        </>
    )
}

export default MemberConsultGroupModal
