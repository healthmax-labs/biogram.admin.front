import React, { useCallback, useEffect } from 'react'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ContentsPageStyle'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import {
    ConfirmModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
} from '@Elements'
import VaryImageUpload from '@Element/Inputs/VaryImageUpload'
import {
    getMagazineDetail,
    postMagazineDetail,
    postMagazineDetailUpdate,
} from '@Service/ContentsService'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useMainLayouts } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
    MagazineDetailState,
    MagazineListState,
} from '@Recoil/ContentsPagesState'
import { MagazineItemInterface } from '@Type/ContentsTypes'
import _ from 'lodash'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer, DatePickerLine } = DetailPageStyle

const textMaxLength: { title: number; subTitle: number } = {
    title: 25,
    subTitle: 35,
}

const MagazineDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ misn_step: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(MagazineDetailState)
    const resetMagazineDetailState = useResetRecoilState(MagazineDetailState)
    const setMagazineListState = useSetRecoilState(MagazineListState)

    const handleGetInfo = useCallback(
        async (misn_step: string) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const { status, payload } = await getMagazineDetail({
                misn_step: misn_step,
            })

            if (status) {
                const {
                    MISN_MAGAZINE_INFO: {
                        MISN_CD,
                        MISN_DC,
                        MISN_COMPT_REWARD_POINT,
                        MISN_STEP,
                        ATCHMNFL_NM,
                        ATCHMNFL_NO,
                        ATCHMNFL_PATH,
                        CN_ATCHMNFL_NO,
                        CN_ATCHMNFL_PATH,
                        CN_ATCHMNFL_NM,
                        BEGIN_DT,
                        END_DT,
                        MISN_SUBNAME1,
                        MISN_SUBNAME2,
                        MULTI_FILE_SN,
                        MULTI_FILE_LIST,
                        USE_AT,
                    },
                } = payload
                const MGZ_nm = MISN_SUBNAME1.split('\n')
                const MGZ_subNm = MISN_SUBNAME2.split('\n')

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    info: {
                        ...prevState.info,
                        MISN_CD: MISN_CD,
                        MISN_DC: MISN_DC,
                        MISN_STEP: MISN_STEP,
                        ATCHMNFL_NO: ATCHMNFL_NO,
                        ATCHMNFL_NM: ATCHMNFL_NM,
                        ATCHMNFL_PATH: ATCHMNFL_PATH,
                        CN_ATCHMNFL_NO: CN_ATCHMNFL_NO,
                        CN_ATCHMNFL_NM: CN_ATCHMNFL_NM,
                        CN_ATCHMNFL_PATH: CN_ATCHMNFL_PATH,
                        MISN_COMPT_REWARD_POINT: MISN_COMPT_REWARD_POINT,
                        MULTI_FILE_SN: MULTI_FILE_SN,
                        MISN_SUBNAME1: MISN_SUBNAME1,
                        MISN_SUBNAME1_u: MGZ_nm[0],
                        MISN_SUBNAME1_d: MGZ_nm[1],
                        MISN_SUBNAME2: MISN_SUBNAME2,
                        MISN_SUBNAME2_u: MGZ_subNm[0],
                        MISN_SUBNAME2_d: MGZ_subNm[1],
                        MULTI_FILE_LIST: MULTI_FILE_LIST,
                        BEGIN_DT: BEGIN_DT,
                        END_DT: END_DT,
                        USE_AT: USE_AT,
                    },
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
        },
        [handlMainAlert, setDetailState]
    )

    const handleMagazine = async () => {
        const {
            MISN_COMPT_REWARD_POINT,
            MISN_STEP,
            ATCHMNFL_PATH,
            ATCHMNFL_NO,
            ATCHMNFL_NM,
            CN_ATCHMNFL_PATH,
            CN_ATCHMNFL_NO,
            CN_ATCHMNFL_NM,
            BEGIN_DT,
            END_DT,
            MISN_SUBNAME1_u,
            MISN_SUBNAME1_d,
            MISN_SUBNAME2_u,
            MISN_SUBNAME2_d,
            USE_AT,
        } = detailState.info

        let payload: MagazineItemInterface = {
            BEGIN_DT: BEGIN_DT ? BEGIN_DT.replaceAll('-', '') : null,
            END_DT: END_DT ? END_DT.replaceAll('-', '') : null,
            MISN_CD: null,
            MISN_COMPT_REWARD_POINT: MISN_COMPT_REWARD_POINT
                ? MISN_COMPT_REWARD_POINT
                : null,
            MISN_STEP: MISN_STEP ? MISN_STEP : null,
            MISN_DC: null,
            ATCHMNFL_NM: ATCHMNFL_NM,
            ATCHMNFL_NO: ATCHMNFL_NO,
            ATCHMNFL_PATH: ATCHMNFL_PATH,
            CN_ATCHMNFL_NO: CN_ATCHMNFL_NO,
            CN_ATCHMNFL_PATH: CN_ATCHMNFL_PATH,
            CN_ATCHMNFL_NM: CN_ATCHMNFL_NM,
            MISN_SUBNAME1: MISN_SUBNAME1_u + '\n' + MISN_SUBNAME1_d,
            MISN_SUBNAME2: MISN_SUBNAME2_u + '\n' + MISN_SUBNAME2_d,
            MULTI_FILE_SN: null,
            MULTI_FILE_LIST: [],
            EXPOSCD: null,
            MISN_NAME: null,
            FIX_AT: 'N',
            USE_AT: USE_AT ? USE_AT : 'N',
        }

        // 등록
        if (pageMode === 'new') {
            payload.MISN_CD = 'FT_INFO'
            payload.MISN_DC = null
            payload.EXPOSCD = 'DALY_REPEAT'
            payload.MISN_NAME = '건강 매거진 평가'
            payload.MISN_STEP = null
        }

        let serviceStatus: boolean

        if (pageMode === 'modify' && params.misn_step) {
            payload = {
                ...payload,
            }
            const { status } = await postMagazineDetailUpdate(payload)
            serviceStatus = status
        } else {
            const { status } = await postMagazineDetail(payload)
            serviceStatus = status
        }

        if (serviceStatus) {
            // 리스트로 가기전에 상태 변경.
            setMagazineListState(prevState => ({
                ...prevState,
                status: 'idle',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/contents/magazine-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleClickApplyButton = () => {
        if (detailState.info.MISN_COMPT_REWARD_POINT === 0) {
            handlMainAlert({
                state: true,
                message:
                    Messages.Default.contents.magazine.empty
                        .misnComptRewardPoint,
            })
            return
        }

        if (
            _.isEmpty(detailState.info.MISN_SUBNAME1_u) ||
            _.isEmpty(detailState.info.MISN_SUBNAME1_d)
        ) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.empty.subname,
            })
            return
        }

        if (
            _.isEmpty(detailState.info.MISN_SUBNAME2_u) ||
            _.isEmpty(detailState.info.MISN_SUBNAME2_d)
        ) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.empty.misnSubname,
            })
            return
        }

        if (_.isNull(detailState.info.ATCHMNFL_NO)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.empty.atchmnflNo,
            })
            return
        }

        if (!detailState.info.CN_ATCHMNFL_NO) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.empty.cnAtchmnflNo,
            })
            return
        }

        handleMagazine().then()
    }

    useEffect(() => {
        const funcSetDetail = () => {
            if (params.misn_step) {
                handleGetInfo(String(params.misn_step)).then()
            }
        }
        if (pageMode === `modify` && params.misn_step) {
            funcSetDetail()
        } else {
            resetMagazineDetailState()
        }
    }, [
        handleGetInfo,
        pageMode,
        params.misn_step,
        resetMagazineDetailState,
        setDetailState,
    ])

    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`매거진 포인트`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    MISN_COMPT_REWARD_POINT:
                                                        Number(e.target.value),
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'매거진 획득 포인트'}
                                        Value={
                                            detailState.info
                                                .MISN_COMPT_REWARD_POINT
                                                ? detailState.info
                                                      .MISN_COMPT_REWARD_POINT
                                                : 0
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell rowSpan={2}>
                            <VaryLabel LabelName={`매거진 제목`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.title
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    MISN_SUBNAME1_u:
                                                        e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 제목 1번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME1_u
                                                ? detailState.info
                                                      .MISN_SUBNAME1_u
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    ({detailState.info.MISN_SUBNAME1_u?.length}/
                                    {textMaxLength.title})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.title
                                            ) {
                                                return
                                            }

                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    MISN_SUBNAME1_d:
                                                        e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 제목 2번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME1_d
                                                ? detailState.info
                                                      .MISN_SUBNAME1_d
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    ({detailState.info.MISN_SUBNAME1_d?.length}/
                                    {textMaxLength.title})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell rowSpan={2}>
                            <VaryLabel LabelName={`매거진 설명(34자)`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.subTitle
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    MISN_SUBNAME2_u:
                                                        e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 설명 1번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME2_u
                                                ? detailState.info
                                                      .MISN_SUBNAME2_u
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    ({detailState.info.MISN_SUBNAME2_u?.length}/
                                    {textMaxLength.subTitle})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.subTitle
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    MISN_SUBNAME2_d:
                                                        e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 설명 2번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME2_d
                                                ? detailState.info
                                                      .MISN_SUBNAME2_d
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    ({detailState.info.MISN_SUBNAME2_d?.length}/
                                    {textMaxLength.subTitle})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`매거진 메인 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                Image={{
                                    AtchmnflPath: String(
                                        detailState.info.ATCHMNFL_PATH
                                    ),
                                    OrginlFileNm: String(
                                        detailState.info.ATCHMNFL_NM
                                    ),
                                    Category: 'MISN',
                                }}
                                ReturnCallback={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            ATCHMNFL_NO: e.ATCHMNFL_NO,
                                            ATCHMNFL_NM: '',
                                            ATCHMNFL_PATH: '',
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`내용 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                Image={{
                                    AtchmnflPath: String(
                                        detailState.info.CN_ATCHMNFL_PATH
                                    ),
                                    OrginlFileNm: String(
                                        detailState.info.CN_ATCHMNFL_NM
                                    ),
                                    Category: 'MISN',
                                }}
                                ReturnCallback={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            CN_ATCHMNFL_NO: e.ATCHMNFL_NO,
                                            CN_ATCHMNFL_NM: '',
                                            CN_ATCHMNFL_PATH: '',
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell rowSpan={2}>
                            <VaryLabel LabelName={`매거진 노출`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap px-0">
                                <div className="mr-2">
                                    <VaryLabelRadioButton
                                        LabelName={`노출`}
                                        Checked={
                                            !!(
                                                detailState.info.USE_AT &&
                                                detailState.info.USE_AT === 'Y'
                                            )
                                        }
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    USE_AT: e.target.checked
                                                        ? 'Y'
                                                        : 'N',
                                                },
                                            }))
                                        }
                                    />
                                </div>

                                <div className="mr-2">
                                    <VaryLabelRadioButton
                                        LabelName={`비노출`}
                                        Checked={
                                            !!(
                                                detailState.info.USE_AT &&
                                                detailState.info.USE_AT === 'N'
                                            )
                                        }
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    USE_AT: e.target.checked
                                                        ? 'N'
                                                        : 'Y',
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <InputCell>
                            <WapperStyle.InputFlexNoWarpWapperGap>
                                <div className="flex w-1/5">
                                    <VaryDatepickerInput
                                        InputeType={`search`}
                                        Value={
                                            detailState.info.BEGIN_DT
                                                ? changeDatePickerDate(
                                                      detailState.info.BEGIN_DT.replaceAll(
                                                          '-',
                                                          ''
                                                      )
                                                  )
                                                : new Date()
                                        }
                                        CallBackReturn={e => {
                                            const { year, monthPad, dayPad } =
                                                gmtTimeToTimeObject(e)
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    BEGIN_DT: `${year}-${monthPad}-${dayPad}`,
                                                },
                                            }))
                                        }}
                                    />
                                </div>

                                <div className="flex w-4 items-center justify-center">
                                    <DatePickerLine>~</DatePickerLine>
                                </div>

                                <div className="flex w-1/5">
                                    <VaryDatepickerInput
                                        InputeType={`search`}
                                        Value={
                                            detailState.info.END_DT
                                                ? changeDatePickerDate(
                                                      detailState.info.END_DT.replaceAll(
                                                          '-',
                                                          ''
                                                      )
                                                  )
                                                : new Date()
                                        }
                                        CallBackReturn={e => {
                                            const { year, monthPad, dayPad } =
                                                gmtTimeToTimeObject(e)
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    END_DT: `${year}-${monthPad}-${dayPad}`,
                                                },
                                            }))
                                        }}
                                    />
                                </div>
                            </WapperStyle.InputFlexNoWarpWapperGap>
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>

            <ButtonBox>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`돌아가기`}
                        HandleClick={() => {
                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/contents/magazine-list`,
                            })
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`확인`}
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
            </ButtonBox>
            {detailState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.contents.magazine.update}
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
        </DetailContainer>
    )
}

export default MagazineDetailTable
