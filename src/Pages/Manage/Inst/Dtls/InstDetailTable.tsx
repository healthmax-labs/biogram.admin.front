import React, { useCallback, useEffect, useState } from 'react'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/InstPageStyle'
import {
    ConfirmModal,
    PstinstSelectBox,
    SiGunSelectBox,
    VaryButton,
    VaryImageUpload,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    MemberSearchModal,
} from '@Elements'
import {
    getInstCheckInstNm,
    getInstInfo,
    postInstInfo,
    postInstInfoDelete,
    postInstInfoUpdate,
    postInstChargerDelete,
} from '@Service/InstService'
import { useMainLayouts } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import { InstInfoInterface } from '@Type/InstTypes'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { InstDetailState, InstListState } from '@Recoil/InstPagesState'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer, ChargerList: P } = DetailPageStyle

const initializeState = {
    modal: {
        memberSearch: false,
        confirm: false,
        delete: false,
        permitDelete: {
            already: false,
            memberNo: null,
            memberName: '',
            modal: false,
        },
    },
}

const InstDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ instNo: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(InstDetailState)
    const setInstListState = useSetRecoilState(InstListState)
    const [pageState, setPageState] = useState<{
        modal: {
            memberSearch: boolean
            confirm: boolean
            delete: boolean
            permitDelete: {
                already: boolean
                memberNo: number | null
                memberName: string
                modal: boolean
            }
        }
    }>(initializeState)

    const handleDeletePermit = async ({ memberNo }: { memberNo: number }) => {
        const { status } = await postInstChargerDelete({
            instNo: Number(params.instNo),
            memberNo: memberNo,
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
            CHARGER_LIST,
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

        // 등록
        if (pageMode === 'new') {
            if (
                _.isEmpty(TOP_INST_NO) &&
                _.isEmpty(MIDDLE_INST_NO) &&
                _.isEmpty(UPPER_INST_NO)
            ) {
                //
                // 2차 일 경우
            } else if (
                !_.isEmpty(TOP_INST_NO) &&
                _.isEmpty(MIDDLE_INST_NO) &&
                _.isEmpty(UPPER_INST_NO)
            ) {
                payload = {
                    ...payload,
                    TOP_INST_NO: TOP_INST_NO,
                    UPPER_INST_NO: TOP_INST_NO,
                }
                // 3차 일 경우
            } else if (!_.isEmpty(TOP_INST_NO) && !_.isEmpty(MIDDLE_INST_NO)) {
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

            if (CHARGER_LIST.length > 0) {
                payload = {
                    ...payload,
                    CHARGER_LIST: CHARGER_LIST.map(cl => {
                        return {
                            CRUD: cl.Already ? 'U' : 'C',
                            MBER_NO: String(cl.MBER_NO),
                            CONECT_IP: cl.CONECT_IP ? cl.CONECT_IP : '',
                            CONECT_LMTT_AT: cl.CONECT_LMTT_AT,
                            CNSLTNT_AT: cl.CNSLTNT_AT,
                        }
                    }),
                }
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

            // 리스트 다시 받아 올수 있게.
            setInstListState(prevState => ({
                ...prevState,
                status: 'idle',
            }))

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
                    CHARGER_LIST,
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
                    CHARGER_LIST: CHARGER_LIST.map(cl => {
                        return {
                            ...cl,
                            Already: true,
                        }
                    }),
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

    const handleChargerListDataChange = useCallback(
        ({
            value,
            name,
            dataIndex,
        }: {
            dataIndex: number
            name: string
            value: string
        }) => {
            setDetailState(prevState => ({
                ...prevState,
                info: {
                    ...prevState.info,
                    CHARGER_LIST: prevState.info.CHARGER_LIST.map(
                        (cl, clIndex) => {
                            if (clIndex === dataIndex) {
                                return {
                                    ...cl,
                                    [name]: value,
                                }
                            }

                            return cl
                        }
                    ),
                },
            }))
        },
        [setDetailState]
    )

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
                                <VaryInput
                                    ReadOnly={true}
                                    Width={`w60`}
                                    InputType={'text'}
                                    HandleOnChange={() => {
                                        //
                                    }}
                                    id={'id'}
                                    Placeholder={'가입일자'}
                                    Value={`${params.instNo}`}
                                />
                            </InputCell>
                        </Row>
                    )}
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속명`} />
                        </LabelCell>
                        <InputCell>
                            <WapperStyle.InputFlexNoWarpWapperGap>
                                <VaryInput
                                    Width={`w60`}
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
                                <VaryButton
                                    ButtonType={`default`}
                                    HandleClick={async () => {
                                        if (
                                            detailState.info.INST_NM &&
                                            detailState.info.INST_NM.length > 0
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
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        INST_NM_CHECK: false,
                                                    },
                                                }))
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
                                    ButtonName={`소속 중복 확인`}
                                />
                            </WapperStyle.InputFlexNoWarpWapperGap>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 위치`} />
                        </LabelCell>
                        <InputCell>
                            <PstinstSelectBox
                                Value={{
                                    status: detailState.status,
                                    infoStep: detailState.infoStep
                                        ? detailState.infoStep
                                        : 'step1',
                                    instNo: String(detailState.info.INST_NO),
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
                                                    ? e.selectinfo.SIGUNGU_CD
                                                    : '',
                                        },
                                    }))
                                }}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`시군구 코드`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`사업정보`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={`w60`}
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`대표번호`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={`w60`}
                                InputType={'text'}
                                HandleOnChange={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            REPRSNT_TELNO: e.target.value,
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`승인여부`} />
                        </LabelCell>
                        <InputCell>
                            <WapperStyle.InputFlexNoWarpWapper>
                                <VaryLabelCheckBox
                                    Checked={
                                        detailState.info.INST_TY_CODE === 'M'
                                    }
                                    LabelName={`가입시 관리자의 승인이 필요합니다. (미 체크시 바로 가입 할수 있습니다)`}
                                    HandleOnChange={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            info: {
                                                ...prevState.info,
                                                INST_TY_CODE: e.target.checked
                                                    ? 'M'
                                                    : 'O',
                                            },
                                        }))
                                    }
                                />
                            </WapperStyle.InputFlexNoWarpWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`별도약관여부`} />
                        </LabelCell>
                        <InputCell>
                            <WapperStyle.InputFlexNoWarpWapper>
                                <VaryLabelCheckBox
                                    Checked={
                                        detailState.info.SPUSE_STPLAT_AT === 'Y'
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
                            </WapperStyle.InputFlexNoWarpWapper>
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
                                    Category: 'INST',
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
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`관리자`} />
                        </LabelCell>
                        <InputCell>
                            <WapperStyle.FullWapperGap>
                                <div>
                                    <VaryButton
                                        ButtonType={`default`}
                                        HandleClick={() =>
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    memberSearch: true,
                                                },
                                            }))
                                        }
                                        ButtonName={`관리자 추가`}
                                    />
                                </div>
                                <div>
                                    <P.Container>
                                        <P.Table>
                                            <P.Tbody>
                                                {detailState.info.CHARGER_LIST.map(
                                                    (el, elIndex) => {
                                                        return (
                                                            <P.TableRowNonBg
                                                                key={`member-detail-pstinst-table-row-item-${elIndex}`}>
                                                                <P.TableCell>
                                                                    {el.MBER_NO}
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    {el.USID}
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    {el.NM}
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    {el.MBTLNUM}
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    <VaryInput
                                                                        Width={`w40`}
                                                                        InputType={
                                                                            'text'
                                                                        }
                                                                        HandleOnChange={e => {
                                                                            handleChargerListDataChange(
                                                                                {
                                                                                    dataIndex:
                                                                                        elIndex,
                                                                                    name: `CONECT_IP`,
                                                                                    value: e
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                            )
                                                                        }}
                                                                        Placeholder={
                                                                            'IP'
                                                                        }
                                                                        Value={
                                                                            el.CONECT_IP
                                                                                ? el.CONECT_IP
                                                                                : ''
                                                                        }
                                                                    />
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    <VaryLabelCheckBox
                                                                        LabelWidth={
                                                                            'wMin'
                                                                        }
                                                                        Checked={
                                                                            el.CONECT_LMTT_AT ===
                                                                            'Y'
                                                                        }
                                                                        HandleOnChange={e => {
                                                                            handleChargerListDataChange(
                                                                                {
                                                                                    dataIndex:
                                                                                        elIndex,
                                                                                    name: `CONECT_LMTT_AT`,
                                                                                    value: e
                                                                                        .target
                                                                                        .checked
                                                                                        ? 'Y'
                                                                                        : 'N',
                                                                                }
                                                                            )
                                                                        }}
                                                                        LabelName={`IP 제한 사용`}
                                                                    />
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    <VaryLabelCheckBox
                                                                        LabelWidth={
                                                                            'wMin'
                                                                        }
                                                                        Checked={
                                                                            el.CNSLTNT_AT ===
                                                                            'Y'
                                                                        }
                                                                        HandleOnChange={e => {
                                                                            handleChargerListDataChange(
                                                                                {
                                                                                    dataIndex:
                                                                                        elIndex,
                                                                                    name: `CNSLTNT_AT`,
                                                                                    value: e
                                                                                        .target
                                                                                        .checked
                                                                                        ? 'Y'
                                                                                        : 'N',
                                                                                }
                                                                            )
                                                                        }}
                                                                        LabelName={`상담자 사용`}
                                                                    />
                                                                </P.TableCell>
                                                                <P.TableCell>
                                                                    <VaryButton
                                                                        ButtonType={`default`}
                                                                        ButtonName={`관리자 삭제`}
                                                                        HandleClick={() => {
                                                                            setPageState(
                                                                                prevState => ({
                                                                                    ...prevState,
                                                                                    modal: {
                                                                                        ...prevState.modal,
                                                                                        permitDelete:
                                                                                            {
                                                                                                ...prevState
                                                                                                    .modal
                                                                                                    .permitDelete,
                                                                                                memberName:
                                                                                                    el.NM,
                                                                                                memberNo:
                                                                                                    el.MBER_NO,
                                                                                                already:
                                                                                                    !!el.Already,
                                                                                                modal: true,
                                                                                            },
                                                                                    },
                                                                                })
                                                                            )
                                                                        }}
                                                                    />
                                                                </P.TableCell>
                                                            </P.TableRowNonBg>
                                                        )
                                                    }
                                                )}
                                            </P.Tbody>
                                        </P.Table>
                                    </P.Container>
                                </div>
                            </WapperStyle.FullWapperGap>
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
                        ButtonType={`default`}
                        ButtonName={`확인`}
                        HandleClick={() =>
                            setPageState(prevState => ({
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
                            ButtonType={`default`}
                            ButtonName={`삭제`}
                            HandleClick={() =>
                                setPageState(prevState => ({
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

            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.inst.newConfirm}
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
                        handleClickApplyButton()
                    }}
                />
            )}

            {/*권한 삭제 모달*/}
            {pageState.modal.permitDelete.modal &&
                pageState.modal.permitDelete.memberNo && (
                    <ConfirmModal
                        Title={_.replace(
                            Messages.Default.inst.deletePermit,
                            `_NAME_`,
                            pageState.modal.permitDelete.memberName
                        )}
                        CancleButtonName={`취소`}
                        ApplyButtonName={`확인`}
                        CancleButtonClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    permitDelete:
                                        initializeState.modal.permitDelete,
                                },
                            }))
                        }}
                        ApplyButtonClick={() => {
                            if (
                                pageState.modal.permitDelete.already &&
                                pageState.modal.permitDelete.memberNo
                            ) {
                                handleDeletePermit({
                                    memberNo:
                                        pageState.modal.permitDelete.memberNo,
                                }).then()
                            }

                            setDetailState(prevState => ({
                                ...prevState,
                                info: {
                                    ...prevState.info,
                                    CHARGER_LIST:
                                        prevState.info.CHARGER_LIST.filter(
                                            cl =>
                                                cl.MBER_NO !==
                                                pageState.modal.permitDelete
                                                    .memberNo
                                        ),
                                },
                            }))

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    permitDelete:
                                        initializeState.modal.permitDelete,
                                },
                            }))
                        }}
                    />
                )}

            {pageState.modal.delete && (
                <ConfirmModal
                    Title={Messages.Default.inst.deleteConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                delete: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
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

            {pageState.modal.memberSearch && (
                <MemberSearchModal
                    InstNo={Number(params.instNo)}
                    PermiCode={Number(params.instNo) === 1000 ? 'SM00' : 'IM00'}
                    CloseButtonClick={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: { ...prevState.modal, memberSearch: false },
                        }))
                    }
                    SaveButtonClick={e => {
                        setDetailState(prevState => ({
                            ...prevState,
                            info: {
                                ...prevState.info,
                                CHARGER_LIST: _.union(
                                    prevState.info.CHARGER_LIST,
                                    e.selected.map(sel => {
                                        return {
                                            Already: false,
                                            INST_NO: Number(params.instNo),
                                            INST_NM: '',
                                            CONECT_LMTT_AT: 'N',
                                            CNSLTNT_AT: 'N',
                                            MBER_NO: sel.MBER_NO,
                                            AUTHOR_CODE: 'SM00',
                                            CONECT_IP: null,
                                            BRTHDY: '',
                                            SEXDSTN: '남',
                                            MBTLNUM: sel.MBTLNUM,
                                            REGIST_DT: 0,
                                            USID: sel.USID,
                                            MBTLNUM_CRTFC_AT: 'Y',
                                            AUTHOR_NM: '',
                                            NM: sel.NM,
                                        }
                                    })
                                ),
                            },
                        }))

                        setPageState(prevState => ({
                            ...prevState,
                            modal: { ...prevState.modal, memberSearch: false },
                        }))
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default InstDetailTable
