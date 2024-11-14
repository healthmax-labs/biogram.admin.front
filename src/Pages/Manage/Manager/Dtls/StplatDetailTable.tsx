import React, { useEffect, useState } from 'react'
import {
    ConfirmModal,
    ReactQuillEditor,
    VaryButton,
    VaryModal,
} from '@Elements'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { VaryInput, VaryLabel } from '@Element/index'
import { DetailPageStyle as DPS } from '@Style/Pages/ManagerPageStyle'
import Messages from '@Messages'
import { useRecoilState } from 'recoil'
import { StplatDetailState } from '@Recoil/ManagerPagesState'
import { dateInsertHypen, timeStringDateParse } from '@Helper'
import _ from 'lodash'
import { StplatKndCodeType, StplatSeCodeType } from '@CommonTypes'
import {
    getCommonStplatStplatSeCodeStplatKndCodeStplatSn,
    postCommonStplat,
    postCommonStplatDelete,
    postCommonStplatUpdate,
} from '@Service/ManagerService'
import { useMainLayouts } from '@Hook/index'
import { useNavigate, useParams } from 'react-router-dom'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    InputItem,
    QuilEditorLabelCell,
    QuilEditorCell,
} = DetailTableStyle

const initializeState = {
    selectHistoryStplatDc: '',
    pageMode: 'detail',
    modal: {
        updateConfirm: false,
        deleteConfirm: false,
        stplatConfirm: false,
        history: false,
    },
}

const resnLength = 50

const StplatDetailTable = ({
    HandleGetInfo,
}: {
    HandleGetInfo: ({
        seCode,
        kndCode,
        SN,
    }: {
        seCode: StplatSeCodeType
        kndCode: StplatKndCodeType
        SN: number
    }) => void
}) => {
    const navigate = useNavigate()
    const params = useParams<{
        seCode: string | undefined
        kndCode: string | undefined
        SN: string | undefined
        STPLAT: string | undefined
    }>()
    const { handlMainAlert } = useMainLayouts()
    const [detailState, setDetailState] = useRecoilState(StplatDetailState)
    const [pageState, setPageState] = useState<{
        selectHistoryStplatDc: string
        pageMode: string | 'detail' | 'stplat'
        modal: {
            updateConfirm: boolean
            deleteConfirm: boolean
            stplatConfirm: boolean
            history: boolean
        }
    }>(initializeState)

    const handleGoListPage = () => {
        navigate(
            {
                pathname: process.env.PUBLIC_URL + `/manage/manager/stplat`,
            },
            { state: { renew: true } }
        )
    }

    const handleClickHistoryRow = async ({
        seCode,
        kndCode,
        SN,
    }: {
        seCode: StplatSeCodeType
        kndCode: StplatKndCodeType
        SN: number
    }) => {
        const { status, payload } =
            await getCommonStplatStplatSeCodeStplatKndCodeStplatSn({
                stplatSn: SN,
                stplatKndCode: kndCode,
                stplatSeCode: seCode,
            })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                selectHistoryStplatDc: payload.STPLAT_MANAGE_INFO.STPLAT_DC,
            }))
        }
    }

    // 약관 수정.
    const handleInfoUpdate = async () => {
        const {
            STPLAT_DC,
            STPLAT_SN,
            STPLAT_KND_CODE,
            STPLAT_SE_CODE,
            STPLAT_CHANGE_RESN,
        } = detailState.detail

        if (STPLAT_SN) {
            const { status } = await postCommonStplatUpdate({
                STPLAT_DC: STPLAT_DC,
                STPLAT_SN: STPLAT_SN,
                STPLAT_KND_CODE: STPLAT_KND_CODE,
                STPLAT_SE_CODE: STPLAT_SE_CODE,
                STPLAT_CHANGE_RESN: STPLAT_CHANGE_RESN,
            })

            if (status) {
                HandleGetInfo({
                    seCode: STPLAT_SE_CODE,
                    kndCode: STPLAT_KND_CODE,
                    SN: STPLAT_SN,
                })

                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                handleGoListPage()
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }

    // 약관 개정
    const handleInfoStplat = async () => {
        const {
            STPLAT_DC,
            STPLAT_CHANGE_DE,
            STPLAT_KND_CODE,
            STPLAT_SE_CODE,
            STPLAT_CHANGE_RESN,
            STPLAT_SN,
        } = detailState.detail

        const { status } = await postCommonStplat({
            STPLAT_DC: STPLAT_DC,
            STPLAT_SE_CODE: STPLAT_SE_CODE,
            STPLAT_CHANGE_RESN: STPLAT_CHANGE_RESN,
            STPLAT_KND_CODE: STPLAT_KND_CODE,
            STPLAT_CHANGE_DE: STPLAT_CHANGE_DE,
        })

        if (status) {
            if (STPLAT_SN) {
                HandleGetInfo({
                    seCode: STPLAT_SE_CODE,
                    kndCode: STPLAT_KND_CODE,
                    SN: STPLAT_SN,
                })
            }

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            handleGoListPage()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleInfoDelete = async () => {
        const {
            STPLAT_DC,
            STPLAT_SN,
            STPLAT_KND_CODE,
            STPLAT_SE_CODE,
            STPLAT_CHANGE_RESN,
        } = detailState.detail

        if (STPLAT_SN) {
            const { status } = await postCommonStplatDelete({
                STPLAT_SN: STPLAT_SN,
                STPLAT_DC: STPLAT_DC,
                STPLAT_KND_CODE: STPLAT_KND_CODE,
                STPLAT_SE_CODE: STPLAT_SE_CODE,
                STPLAT_CHANGE_RESN: STPLAT_CHANGE_RESN,
            })

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }

    useEffect(() => {
        if (params && params.STPLAT && params.STPLAT === 'STPLAT') {
            setPageState(prevState => ({
                ...prevState,
                pageMode: 'stplat',
            }))
        }
    }, [params])

    return (
        <DPS.DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관명`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                id={'id'}
                                Placeholder={'약관명'}
                                // Disabled={true}
                                ReadOnly={true}
                                Value={
                                    detailState.detail.STPLAT_KND_CODE_NM
                                        ? detailState.detail.STPLAT_KND_CODE_NM
                                        : ''
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`버전`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                id={'id'}
                                Placeholder={'약관명'}
                                ReadOnly={true}
                                Value={
                                    detailState.detail.STPLAT_SN
                                        ? `ver. ${detailState.detail.STPLAT_SN}`
                                        : ''
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관 소속`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                id={'id'}
                                Placeholder={'약관명'}
                                ReadOnly={true}
                                Value={
                                    detailState.detail.STPLAT_SE_CODE_NM
                                        ? detailState.detail.STPLAT_SE_CODE_NM
                                        : ''
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`최종 수정자`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w60'}
                                InputType={'text'}
                                id={'id'}
                                Placeholder={'약관명'}
                                ReadOnly={true}
                                Value={
                                    detailState.detail.REGIST_ID
                                        ? detailState.detail.REGIST_ID
                                        : ''
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`등록일`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <InputItem>
                                <div className="flex items-center h-8 text-xs text-gray-500">
                                    {detailState.detail.REGIST_DT
                                        ? timeStringDateParse(
                                              detailState.detail.REGIST_DT
                                          )
                                        : ''}
                                </div>
                            </InputItem>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`시행일`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <InputItem>
                                <div className="flex items-center h-8 text-xs text-gray-500">
                                    {detailState.detail.STPLAT_CHANGE_DE
                                        ? dateInsertHypen(
                                              detailState.detail
                                                  .STPLAT_CHANGE_DE
                                          )
                                        : ''}
                                </div>
                            </InputItem>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관 변경 사유`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <div className="flex flex-nowrap w-1/2 items-center">
                                <div className="grow">
                                    <VaryInput
                                        Width={'w96'}
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    STPLAT_CHANGE_RESN:
                                                        e.target.value.substring(
                                                            0,
                                                            resnLength
                                                        ),
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'약관명'}
                                        Value={
                                            detailState.detail
                                                .STPLAT_CHANGE_RESN
                                                ? detailState.detail
                                                      .STPLAT_CHANGE_RESN
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="grow text-sm text-gray-500">
                                    {`${_.size(
                                        detailState.detail.STPLAT_CHANGE_RESN
                                    )}/50`}
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <QuilEditorLabelCell>
                            <VaryLabel LabelName={`약관 내용`} />
                        </QuilEditorLabelCell>
                        <QuilEditorCell colSpan={3}>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="grow">
                                    <ReactQuillEditor
                                        Value={
                                            detailState.detail.STPLAT_DC
                                                ? detailState.detail.STPLAT_DC
                                                : ''
                                        }
                                        OnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    STPLAT_DC: e,
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </QuilEditorCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            <DPS.Stplat.ButtonBox>
                <DPS.Stplat.ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`취소`}
                        HandleClick={() => {
                            handleGoListPage()
                        }}
                    />
                </DPS.Stplat.ButtonItem>
                <DPS.Stplat.ButtonItem>
                    {pageState.pageMode === 'stplat' ? (
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`약관개정`}
                            HandleClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        stplatConfirm: true,
                                    },
                                }))
                            }}
                        />
                    ) : (
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`수정`}
                            HandleClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        updateConfirm: true,
                                    },
                                }))
                            }}
                        />
                    )}
                </DPS.Stplat.ButtonItem>
                <DPS.Stplat.ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`삭제`}
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    deleteConfirm: true,
                                },
                            }))
                        }
                    />
                </DPS.Stplat.ButtonItem>
            </DPS.Stplat.ButtonBox>
            <DPS.Stplat.Table.Wapper>
                <DPS.Stplat.Table.Head>
                    <DPS.Stplat.Table.HeadRow>
                        <DPS.Stplat.Table.HeadCell colSpan={3}>
                            약관 변경 히스트리
                        </DPS.Stplat.Table.HeadCell>
                        <DPS.Stplat.Table.HeadCell>
                            약관 변경 사유
                        </DPS.Stplat.Table.HeadCell>
                    </DPS.Stplat.Table.HeadRow>
                </DPS.Stplat.Table.Head>
                <DPS.Stplat.Table.Body>
                    {detailState.detail.history &&
                        detailState.detail.history.length > 0 &&
                        detailState.detail.history.map((el, index) => {
                            return (
                                <DPS.Stplat.Table.BodyRow
                                    key={`stplat-detail-table-history-row-${index}`}
                                    onClick={() => {
                                        if (
                                            el.STPLAT_SE_CODE &&
                                            el.STPLAT_KND_CODE &&
                                            el.STPLAT_SN
                                        ) {
                                            handleClickHistoryRow({
                                                seCode: el.STPLAT_SE_CODE,
                                                kndCode: el.STPLAT_KND_CODE,
                                                SN: el.STPLAT_SN,
                                            }).then(() =>
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    modal: {
                                                        ...prevState.modal,
                                                        history: true,
                                                    },
                                                }))
                                            )
                                        }
                                    }}>
                                    <DPS.Stplat.Table.BodyCell>
                                        {`Ver.${el.STPLAT_SN}`}
                                    </DPS.Stplat.Table.BodyCell>
                                    <DPS.Stplat.Table.BodyCell>
                                        변경일
                                    </DPS.Stplat.Table.BodyCell>
                                    <DPS.Stplat.Table.BodyCell>
                                        {`Ver.${el.STPLAT_CHANGE_DE}`}
                                    </DPS.Stplat.Table.BodyCell>
                                    <DPS.Stplat.Table.BodyCell>
                                        {`${el.STPLAT_CHANGE_RESN}`}
                                    </DPS.Stplat.Table.BodyCell>
                                </DPS.Stplat.Table.BodyRow>
                            )
                        })}
                </DPS.Stplat.Table.Body>
            </DPS.Stplat.Table.Wapper>

            {pageState.modal.updateConfirm && (
                <ConfirmModal
                    Title={Messages.Default.updateConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                updateConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        handleInfoUpdate().then(() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    updateConfirm: false,
                                },
                            }))
                        )
                    }}
                />
            )}

            {pageState.modal.stplatConfirm && (
                <ConfirmModal
                    Title={Messages.Default.stplatConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                stplatConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        handleInfoStplat().then(() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    stplatConfirm: false,
                                },
                            }))
                        )
                    }}
                />
            )}

            {pageState.modal.deleteConfirm && (
                <ConfirmModal
                    Title={Messages.Default.deleteConfirm}
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
                        handleInfoDelete().then(() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    deleteConfirm: false,
                                },
                            }))
                        })
                        handleGoListPage()
                    }}
                />
            )}

            {pageState.modal.history && (
                <VaryModal
                    ModalLoading={false}
                    Children={
                        <>
                            <div className="rounded overflow-hidden">
                                <div className="px-6 py-4">
                                    <p className="text-gray-700 text-xs text-justify">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: pageState.selectHistoryStplatDc,
                                            }}></div>
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                    MaxWidth={'xl4'}
                    Buttons={
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`닫기`}
                            HandleClick={() =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        history: false,
                                    },
                                }))
                            }
                        />
                    }
                />
            )}
        </DPS.DetailContainer>
    )
}

export default StplatDetailTable
