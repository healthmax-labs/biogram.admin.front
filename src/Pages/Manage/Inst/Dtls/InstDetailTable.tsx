import React, { useEffect } from 'react'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/InstPageStyle'
import {
    ConfirmModal,
    PstinstSelectBox,
    SiGunSelectBox,
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import VaryImageUpload from '@Element/Inputs/VaryImageUpload'
import {
    getInstCheckInstNm,
    getInstInfo,
    postInstInfo,
    postInstInfoDelete,
    postInstInfoUpdate,
} from '@Service/InstService'
import { useMainLayouts } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { InstInfoInterface } from '@Type/InstTypes'
import { useRecoilState } from 'recoil'
import { InstDetailState } from '@Recoil/InstPagesState'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer } = DetailPageStyle

const InstDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ instNo: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(InstDetailState)

    const handleNewInst = async () => {
        const {
            UPPER_INST_NO,
            MIDDLE_INST_NO,
            TOP_INST_NO,
            INST_TY_CODE,
            INST_NM,
            SPUSE_STPLAT_AT,
            BIZ_INFO,
            ATCHMNFL_NO,
            SIGUNGU_CD,
            REPRSNT_TELNO,
        } = detailState.info

        let payload: InstInfoInterface = {
            ATCHMNFL_NO: ATCHMNFL_NO ? ATCHMNFL_NO : null,
            BIZ_INFO: BIZ_INFO,
            INST_NM: INST_NM,
            INST_TY_CODE: INST_TY_CODE,
            REPRSNT_TELNO: REPRSNT_TELNO,
            SIGUNGU_CD: SIGUNGU_CD,
            SPUSE_STPLAT_AT: SPUSE_STPLAT_AT,
        }

        /*
        1차
        ~

        2차
        TOP_INST_NO: "1001"
        MIDDLE_INST_NO: "1455"
        UPPER_INST_NO: "1455"

        3차
        TOP_INST_NO: "1001"
        UPPER_INST_NO: "1001"
         */

        // 등록
        if (pageMode === 'new') {
            if (
                isEmpty(TOP_INST_NO) &&
                isEmpty(MIDDLE_INST_NO) &&
                isEmpty(UPPER_INST_NO)
            ) {
                //
                // 2차 일 경우
            } else if (
                !isEmpty(TOP_INST_NO) &&
                isEmpty(MIDDLE_INST_NO) &&
                isEmpty(UPPER_INST_NO)
            ) {
                payload = {
                    ...payload,
                    TOP_INST_NO: TOP_INST_NO,
                    UPPER_INST_NO: TOP_INST_NO,
                }
                // 3차 일 경우
            } else if (!isEmpty(TOP_INST_NO) && !isEmpty(MIDDLE_INST_NO)) {
                payload = {
                    ...payload,
                    TOP_INST_NO: TOP_INST_NO,
                    MIDDLE_INST_NO: MIDDLE_INST_NO,
                    UPPER_INST_NO: MIDDLE_INST_NO,
                }
            }
        } else if (pageMode === 'modify') {
            if (detailState.infoStep === 'step1') {
            } else if (detailState.infoStep === 'step2') {
                payload = {
                    ...payload,
                    TOP_INST_NO: TOP_INST_NO,
                    UPPER_INST_NO: TOP_INST_NO,
                }
            } else if (detailState.infoStep === 'step3') {
                payload = {
                    ...payload,
                    TOP_INST_NO: TOP_INST_NO,
                    MIDDLE_INST_NO: MIDDLE_INST_NO,
                    UPPER_INST_NO: MIDDLE_INST_NO,
                }
            }
        }

        let serviceStatus: boolean

        if (pageMode === 'modify' && params.instNo) {
            payload = {
                ...payload,
                INST_NO: String(params.instNo),
            }
            const { status } = await postInstInfoUpdate(payload)
            serviceStatus = status
        } else {
            const { status } = await postInstInfo(payload)
            serviceStatus = status
        }

        if (serviceStatus) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/inst/inst-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleClickApplyButton = () => {
        if (!detailState.info.INST_NM_CHECK) {
            handlMainAlert({
                state: true,
                message: Messages.Default.inst.instNmCheckYet,
            })
            return
        }

        handleNewInst().then()
    }

    const handleGetInfo = async (instNo: number) => {
        setDetailState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const { status, payload } = await getInstInfo({ instNo: instNo })
        if (status) {
            const {
                INST_INFO: {
                    INST_NO,
                    ATCHMNFL_NO,
                    BIZ_INFO,
                    INST_NM,
                    INST_TY_CODE,
                    REPRSNT_TELNO,
                    SIGUNGU_CD,
                    SPUSE_STPLAT_AT,
                    TOP_INST_NO,
                    MIDDLE_INST_NO,
                    UPPER_INST_NO,
                    BOTTOM_INST_NO,
                    ATCHMNFL_PATH,
                    ORGINL_FILE_NM,
                },
            } = payload

            let infoStep: string | 'step1' | 'step2' | 'step3'

            if (MIDDLE_INST_NO === null && BOTTOM_INST_NO === null) {
                infoStep = 'step1'
            } else if (MIDDLE_INST_NO !== null && BOTTOM_INST_NO === null) {
                infoStep = 'step2'
            } else {
                infoStep = 'step3'
            }

            setDetailState(prevState => ({
                ...prevState,
                status: 'success',
                info: {
                    ...prevState.info,
                    INST_NO: INST_NO,
                    ATCHMNFL_NO: ATCHMNFL_NO,
                    BIZ_INFO: BIZ_INFO,
                    INST_NM: INST_NM,
                    INST_TY_CODE: INST_TY_CODE,
                    REPRSNT_TELNO: REPRSNT_TELNO,
                    SIGUNGU_CD: SIGUNGU_CD,
                    SPUSE_STPLAT_AT: SPUSE_STPLAT_AT,
                    TOP_INST_NO: TOP_INST_NO ? String(TOP_INST_NO) : '',
                    MIDDLE_INST_NO: MIDDLE_INST_NO
                        ? String(MIDDLE_INST_NO)
                        : '',
                    UPPER_INST_NO: UPPER_INST_NO ? String(UPPER_INST_NO) : '',
                    ORGINL_FILE_NM: ORGINL_FILE_NM,
                    ATCHMNFL_PATH: ATCHMNFL_PATH,
                    INST_NM_CHECK: true,
                },
                infoStep: infoStep,
            }))
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleDelete = async () => {
        if (detailState.info.INST_NO) {
            const { status } = await postInstInfoDelete({
                instNo: detailState.info.INST_NO,
            })

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                navigate({
                    pathname: process.env.PUBLIC_URL + `/manage/inst/inst-list`,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        }
    }

    useEffect(() => {
        const funcSetDetail = () => {
            if (params.instNo) {
                handleGetInfo(Number(params.instNo)).then()
            }
        }

        if (pageMode === `modify` && params.instNo) {
            funcSetDetail()
        }
        // FIXME : 종속성에서 handleGetInfo 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageMode, params.instNo])

    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    {pageMode === 'modify' && (
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`소속코드`} />
                            </LabelCell>
                            <InputCell>
                                <div className="flex flex-nowrap w-full items-center">
                                    <div className="w-2/4">
                                        <VaryInput
                                            Bg={`white`}
                                            ReadOnly={true}
                                            InputType={'text'}
                                            HandleOnChange={() =>
                                                console.debug('HandleOnChange')
                                            }
                                            id={'id'}
                                            Placeholder={'가입일자'}
                                            Value={`1000`}
                                        />
                                    </div>
                                </div>
                            </InputCell>
                        </Row>
                    )}
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속명`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    INST_NM: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'소속명'}
                                        Value={
                                            detailState.info.INST_NM
                                                ? detailState.info.INST_NM
                                                : ``
                                        }
                                    />
                                </div>
                                <div className="w-2/4">
                                    <VaryButton
                                        HandleClick={async () => {
                                            if (
                                                detailState.info.INST_NM &&
                                                detailState.info.INST_NM
                                                    .length > 0
                                            ) {
                                                const { status, payload } =
                                                    await getInstCheckInstNm({
                                                        instNm: detailState.info
                                                            .INST_NM,
                                                    })

                                                if (status) {
                                                    if (
                                                        payload.INST_NM_USE_AT ===
                                                        'N'
                                                    ) {
                                                        handlMainAlert({
                                                            state: true,
                                                            message:
                                                                Messages.Default
                                                                    .inst
                                                                    .instNmCheckSuccess,
                                                        })
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    INST_NM_CHECK:
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    } else {
                                                        handlMainAlert({
                                                            state: true,
                                                            message:
                                                                Messages.Default
                                                                    .inst
                                                                    .instNmCheckFail,
                                                        })
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    INST_NM_CHECK:
                                                                        false,
                                                                },
                                                            })
                                                        )
                                                    }
                                                } else {
                                                    handlMainAlert({
                                                        state: true,
                                                        message:
                                                            Messages.Default
                                                                .pageError,
                                                    })
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                INST_NM_CHECK:
                                                                    false,
                                                            },
                                                        })
                                                    )
                                                }
                                            } else {
                                                handlMainAlert({
                                                    state: true,
                                                    message:
                                                        Messages.Default.inst
                                                            .instNmEmpty,
                                                })
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        INST_NM_CHECK: false,
                                                    },
                                                }))
                                            }
                                        }}
                                        Name={`소속 중복 확인`}
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 위치`} />
                        </LabelCell>
                        <InputCell>
                            <div className="w-full items-center">
                                <PstinstSelectBox
                                    Value={{
                                        status: detailState.status,
                                        infoStep: detailState.infoStep
                                            ? detailState.infoStep
                                            : 'step1',
                                        instNo: String(
                                            detailState.info.INST_NO
                                        ),
                                        step1: detailState.info.TOP_INST_NO,
                                        step2: detailState.info.MIDDLE_INST_NO,
                                        step3: detailState.info.UPPER_INST_NO,
                                    }}
                                    ReturnCallback={e => {
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            info: {
                                                ...prevState.info,
                                                TOP_INST_NO: e.step1.value,
                                                MIDDLE_INST_NO: e.step2.value,
                                                UPPER_INST_NO: e.step3.value,
                                                SIGUNGU_CD:
                                                    e.selectinfo &&
                                                    e.selectinfo.SIGUNGU_CD
                                                        ? e.selectinfo
                                                              .SIGUNGU_CD
                                                        : '',
                                            },
                                        }))
                                    }}
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`시군구 코드`} />
                        </LabelCell>
                        <InputCell>
                            <div className="w-full items-center">
                                <SiGunSelectBox
                                    SigunguCd={
                                        detailState.info.SIGUNGU_CD
                                            ? detailState.info.SIGUNGU_CD
                                            : ''
                                    }
                                    ReturnCallback={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            info: {
                                                ...prevState.info,
                                                SIGUNGU_CD: e.step2.value,
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`사업정보`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        Bg={`gray1`}
                                        InputType={'text'}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    BIZ_INFO: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'사업정보'}
                                        Value={
                                            detailState.info.BIZ_INFO
                                                ? detailState.info.BIZ_INFO
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`대표번호`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        Bg={`gray1`}
                                        InputType={'text'}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    REPRSNT_TELNO:
                                                        e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'대표번호'}
                                        Value={
                                            detailState.info.REPRSNT_TELNO
                                                ? detailState.info.REPRSNT_TELNO
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`승인여부`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryLabelCheckBox
                                        Checked={
                                            detailState.info.INST_TY_CODE ===
                                            'M'
                                        }
                                        LabelName={`가입시 관리자의 승인이 필요합니다. (미 체크시 바로 가입 할수 있습니다)`}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    INST_TY_CODE: e.target
                                                        .checked
                                                        ? 'M'
                                                        : 'O',
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`별도약관여부`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryLabelCheckBox
                                        Checked={
                                            detailState.info.SPUSE_STPLAT_AT ===
                                            'Y'
                                        }
                                        LabelName={`별도의 약관이 존재하는 경우 체크합니다.`}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    SPUSE_STPLAT_AT: e.target
                                                        .checked
                                                        ? 'Y'
                                                        : 'N',
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 로고`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                Image={{
                                    AtchmnflPath:
                                        detailState.info.ATCHMNFL_PATH,
                                    OrginlFileNm:
                                        detailState.info.ORGINL_FILE_NM,
                                }}
                                ReturnCallback={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            ATCHMNFL_NO: e.ATCHMNFL_NO,
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>

            <ButtonBox>
                <ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`취소`}
                        HandleClick={() => {
                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/inst/inst-list`,
                            })
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`확인`}
                        HandleClick={() =>
                            setDetailState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    confirm: true,
                                },
                            }))
                        }
                    />
                </ButtonItem>
                {pageMode === 'modify' && (
                    <ButtonItem>
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`삭제`}
                            HandleClick={() =>
                                setDetailState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        delete: true,
                                    },
                                }))
                            }
                        />
                    </ButtonItem>
                )}
            </ButtonBox>
            {detailState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.inst.newConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                        handleClickApplyButton()
                    }}
                />
            )}
            {detailState.modal.delete && (
                <ConfirmModal
                    Title={Messages.Default.inst.deleteConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                delete: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                delete: false,
                            },
                        }))
                        handleDelete().then()
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default InstDetailTable
