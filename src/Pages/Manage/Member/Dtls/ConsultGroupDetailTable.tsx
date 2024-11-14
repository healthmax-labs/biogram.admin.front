import React, { useCallback, useEffect, useState } from 'react'
import {
    ConfirmModal,
    ElementLoading,
    VaryButton,
    VaryInput,
    VaryLabel,
    VarySelectBox,
} from '@Elements'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { ConsultGroupDetailStyle } from '@Style/Pages/MemberPageStyles'
import Codes from '@Codes'
import { useRecoilValue, useRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import {
    ConsultGroupDetailState,
    ConsultGroupListState,
} from '@Recoil/MemberPagesState'
import { gmtTimeToTimeObject } from '@Helper'
import { postMngCnstgrpAdd, postMngCnstgrpUpdate } from '@Service/MemberService'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'
import _ from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer } = ConsultGroupDetailStyle

const initializeState = {
    modal: {
        confirm: false,
    },
}

const ConsultGroupDetailTable = ({
    pageMode,
}: {
    pageMode: 'new' | 'modify'
}) => {
    const navigate = useNavigate()
    const params = useParams<{ groupNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)
    const atomRootState = useRecoilValue(AtomRootState)
    const { handlMainAlert } = useMainLayouts()
    const [detailState, setDetailState] = useRecoilState(
        ConsultGroupDetailState
    )
    const [listState, setListState] = useRecoilState(ConsultGroupListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    // 등록 처리
    const handleAddGroup = useCallback(async () => {
        setDetailState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { CNST_GRP_NM, PERM } = detailState.detail
        if (listState.search.instNo) {
            const { status } = await postMngCnstgrpAdd({
                instNo: listState.search.instNo,
                name: CNST_GRP_NM,
                perm: PERM,
            })

            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                setListState(prevState => ({
                    ...prevState,
                    status: 'idle',
                }))

                handleDeleteTabbyMatchRouter(
                    `/manage/member/consult-group-list/new`
                )

                navigate({
                    pathname:
                        process.env.PUBLIC_URL +
                        `/manage/member/consult-group-list`,
                })
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }, [
        detailState.detail,
        handlMainAlert,
        handleDeleteTabbyMatchRouter,
        listState.search.instNo,
        navigate,
        setDetailState,
        setListState,
    ])

    // 수정 처리
    const handleUpdateGroup = useCallback(async () => {
        setDetailState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { CNST_GRP_NM, PERM } = detailState.detail
        if (params.groupNo) {
            const { status } = await postMngCnstgrpUpdate({
                groupNo: Number(params.groupNo),
                instNo: String(detailState.detail.INST_NO),
                perm: PERM,
                name: CNST_GRP_NM,
            })

            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                setListState(prevState => ({
                    ...prevState,
                    status: 'idle',
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }, [
        detailState.detail,
        handlMainAlert,
        params.groupNo,
        setDetailState,
        setListState,
    ])

    // 등록 버튼 클릭
    const handleClickAddButton = () => {
        if (_.isEmpty(detailState.detail.CNST_GRP_NM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.emptyGroupName,
            })
            return
        }

        if (_.isEmpty(detailState.detail.PERM)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.consult.emptyGroupCategory,
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
    }

    useEffect(() => {
        const funcInstnoCheck = () => {
            if (
                _.isEmpty(listState.search.instNo) ||
                _.isEmpty(listState.search.instNm)
            ) {
                handleDeleteTabbyMatchRouter(
                    `/manage/member/consult-group-list/new`
                )

                navigate({
                    pathname:
                        process.env.PUBLIC_URL +
                        `/manage/member/consult-group-list`,
                })

                handlMainAlert({
                    state: true,
                    message: Messages.Default.pstinstSelectEmpty,
                })
            }
        }

        if (pageMode === 'new') {
            funcInstnoCheck()
        }

        // FIXME : 종속성에서 handlMainAlert, handleDeleteTabbyMatchRouter, listState.search.instNm, listState.search.instNo, navigate, pageMode 업데이트 되면
        // 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listState.search.instNm, listState.search.instNo])

    return (
        <DetailContainer>
            {detailState.status === 'loading' ? (
                <div className="flex w-full h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={true} />
                </div>
            ) : (
                <>
                    <TableContainer>
                        <TableWapper>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`소속`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryInput
                                        ReadOnly={true}
                                        Width={`w60`}
                                        InputType={'text'}
                                        Placeholder={'소속'}
                                        Value={
                                            pageMode === 'modify'
                                                ? detailState.detail.INST_NM
                                                : listState.search.instNm
                                        }
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`그룹명`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryInput
                                        Width={`w60`}
                                        InputType={'text'}
                                        id={'id'}
                                        Placeholder={'그룹명을 입력해 주세요'}
                                        Value={detailState.detail.CNST_GRP_NM}
                                        HandleOnChange={e => {
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    CNST_GRP_NM: e.target.value,
                                                },
                                            }))
                                        }}
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`구분`} />
                                </LabelCell>
                                <InputCell>
                                    <VarySelectBox
                                        Width={`w60`}
                                        Placeholder={`구분을 선택해 주세요.`}
                                        Value={detailState.detail.PERM}
                                        Elements={Codes.ConsultGroup.map(
                                            group => {
                                                return {
                                                    value: group.code,
                                                    text: group.name,
                                                }
                                            }
                                        )}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    PERM: e.value,
                                                },
                                            }))
                                        }
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`생성자`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryInput
                                        ReadOnly={true}
                                        Width={`w60`}
                                        InputType={'text'}
                                        Placeholder={'생성자'}
                                        Value={
                                            pageMode === 'modify'
                                                ? detailState.detail.MBER_NM
                                                : atomRootState.userinfo.NM
                                                ? atomRootState.userinfo.NM
                                                : ''
                                        }
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`생성일자`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryInput
                                        ReadOnly={true}
                                        Width={`w60`}
                                        InputType={'text'}
                                        Placeholder={'생성일자'}
                                        Value={(() => {
                                            if (pageMode === 'modify') {
                                                return detailState.detail
                                                    .REGIST_DT
                                            }

                                            const newDateObject =
                                                gmtTimeToTimeObject(new Date())
                                            return `${newDateObject.year}.${newDateObject.monthPad}.${newDateObject.dayPad}`
                                        })()}
                                    />
                                </InputCell>
                            </Row>
                        </TableWapper>
                    </TableContainer>
                    <ButtonBox>
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={`취소`}
                                HandleClick={() => {
                                    pageMode === 'modify'
                                        ? handleDeleteTabbyMatchRouter(
                                              `/manage/member/consult-group/:groupNo/detail`
                                          )
                                        : handleDeleteTabbyMatchRouter(
                                              `/manage/member/consult-group-list/new`
                                          )

                                    navigate({
                                        pathname:
                                            process.env.PUBLIC_URL +
                                            `/manage/member/consult-group-list`,
                                    })
                                }}
                            />
                        </ButtonItem>
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={
                                    pageMode === 'modify' ? `수정` : `등록`
                                }
                                HandleClick={() => {
                                    handleClickAddButton()
                                }}
                            />
                        </ButtonItem>
                    </ButtonBox>
                </>
            )}

            {/*등록 확인 모달*/}
            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={
                        pageMode === 'modify'
                            ? Messages.Default.consult.updateConfirm
                            : Messages.Default.consult.addConfirm
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
                        pageMode === 'modify'
                            ? handleUpdateGroup().then()
                            : handleAddGroup().then()
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default ConsultGroupDetailTable
