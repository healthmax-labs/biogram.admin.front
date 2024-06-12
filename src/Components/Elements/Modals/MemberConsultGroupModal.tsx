import React, { useCallback, useEffect, useState } from 'react'
import { ConfirmModal, VaryButton, VaryModal } from '@Element/index'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import { MemberConsultGroupModalStyle } from '@Style/Elements/ModalStyles'
import { ConsultGroupListResultItemInterface } from '@Type/MemberTypes'
import {
    getMngCnstgrpList,
    postMngCnstgrpMberAdd,
    getMngCnstgrpJoinlist,
    postMngCnstgrpMberRemove,
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
    MemberNo: Array<number>
    InstNo: string
    CloseModal: () => void
}) => {
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        loading: boolean
        list: ConsultGroupListResultItemInterface[]
        memberGroup: number[]
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

    const handleGetListForRemove = async ({ memNo }: { memNo: number }) => {
        const { status, payload } = await getMngCnstgrpJoinlist({
            memNo: memNo,
        })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                memberGroup: payload.map(e => {
                    return e.CNST_GRP_NO
                }),
            }))
        }
    }

    const handleAdd = useCallback(
        async ({
            groupNo,
            memberNo,
        }: {
            groupNo: number
            memberNo: Array<number>
        }) => {
            const { status } = await postMngCnstgrpMberAdd({
                groupNo: String(groupNo),
                memberNo: memberNo.map(e => {
                    return {
                        CNST_MBER_NO: `${e}`,
                    }
                }),
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
            if (ModalType == `add`) {
                handleGetList().then()
                return
            }

            if (ModalType == `remove` && _.first(MemberNo)) {
                handleGetList().then()
                handleGetListForRemove({
                    memNo: Number(_.first(MemberNo)),
                }).then()
                return
            }
        }

        startPage()
    }, [MemberNo, ModalType, handleGetList])

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
                                                        if (
                                                            ModalType ===
                                                            'remove'
                                                        ) {
                                                            console.debug(
                                                                pageState.memberGroup
                                                            )
                                                            console.debug(
                                                                pageState.memberGroup,
                                                                list.CNST_GRP_NO
                                                            )
                                                            if (
                                                                !_.includes(
                                                                    pageState.memberGroup,
                                                                    list.CNST_GRP_NO
                                                                )
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
                                                        }

                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                selectGroupNo:
                                                                    list.CNST_GRP_NO,
                                                                modal: {
                                                                    ...prevState.modal,
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
                                      memberNo: Number(_.first(MemberNo)),
                                  }).then()
                        }
                    }}
                />
            )}
        </>
    )
}

export default MemberConsultGroupModal
