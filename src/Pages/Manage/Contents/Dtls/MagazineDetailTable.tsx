import React, { useState } from 'react'
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
    postMagazineDetail,
    postMagazineDetailUpdate,
} from '@Service/ContentsService'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useMainLayouts, useTab } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    MagazineDetailState,
    MagazineListState,
} from '@Recoil/ContentsPagesState'
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
    subTitle: 34,
}

const initializeState = {
    modal: {
        confirm: false,
    },
}

const MagazineDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ misn_step: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(MagazineDetailState)
    const setMagazineListState = useSetRecoilState(MagazineListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    // 등록처리
    const handleSave = async () => {
        const {
            ATCHMNFL_NO,
            BEGIN_DT,
            CN_ATCHMNFL_NO,
            END_DT,
            MISN_COMPT_REWARD_POINT,
            MISN_SUBNAME1,
            MISN_SUBNAME2,
            USE_AT,
        } = detailState.info

        const { status } = await postMagazineDetail({
            ATCHMNFL_NO: Number(ATCHMNFL_NO),
            BEGIN_DT: BEGIN_DT,
            CN_ATCHMNFL_NO: Number(CN_ATCHMNFL_NO),
            END_DT: END_DT,
            EXPOSCD: 'DALY_REPEAT',
            FIX_AT: 'N',
            MISN_CD: 'FT_INFO',
            MISN_COMPT_REWARD_POINT: String(MISN_COMPT_REWARD_POINT),
            MISN_DC: MISN_SUBNAME1.first,
            MISN_NAME: '건강 매거진 평가',
            MISN_SUBNAME1: MISN_SUBNAME1.first + '\n' + MISN_SUBNAME1.second,
            MISN_SUBNAME2: MISN_SUBNAME2.first + '\n' + MISN_SUBNAME2.second,
            USE_AT: USE_AT,
        })

        if (status) {
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

    // 수정 처리.
    const handleModify = async () => {
        if (params.misn_step) {
            const { status } = await postMagazineDetailUpdate({
                MISN_STEP: Number(params.misn_step),
                BEGIN_DT: detailState.info.BEGIN_DT,
                END_DT: detailState.info.END_DT,
                MISN_COMPT_REWARD_POINT: String(
                    detailState.info.MISN_COMPT_REWARD_POINT
                ),
                MISN_DC: detailState.info.MISN_SUBNAME1.first,
                MISN_SUBNAME1:
                    detailState.info.MISN_SUBNAME1.first +
                    '\n' +
                    detailState.info.MISN_SUBNAME1.second,
                MISN_SUBNAME2:
                    detailState.info.MISN_SUBNAME2.first +
                    '\n' +
                    detailState.info.MISN_SUBNAME2.second,
                USE_AT: detailState.info.USE_AT,
            })

            if (status) {
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
                        process.env.PUBLIC_URL +
                        `/manage/contents/magazine-list`,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        }
    }

    // 저장 버튼 벨리데이션.
    const handleClickApplyButton = () => {
        const { MISN_COMPT_REWARD_POINT, MISN_SUBNAME1, MISN_SUBNAME2 } =
            detailState.info

        if (MISN_COMPT_REWARD_POINT === null || MISN_COMPT_REWARD_POINT === 0) {
            handlMainAlert({
                state: true,
                message:
                    Messages.Default.contents.magazine.empty
                        .misnComptRewardPoint,
            })
            return
        }

        if (_.isEmpty(MISN_SUBNAME1.first) || _.isEmpty(MISN_SUBNAME1.second)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.empty.subname,
            })
            return
        }

        if (_.isEmpty(MISN_SUBNAME2.first) || _.isEmpty(MISN_SUBNAME2.second)) {
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

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                confirm: true,
            },
        }))
    }

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
                                                    MISN_SUBNAME1: {
                                                        ...prevState.info
                                                            .MISN_SUBNAME1,
                                                        first: e.target.value,
                                                    },
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 제목 1번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME1.first
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {
                                        detailState.info.MISN_SUBNAME1.first
                                            .length
                                    }
                                    /{textMaxLength.title})
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
                                                    MISN_SUBNAME1: {
                                                        ...prevState.info
                                                            .MISN_SUBNAME1,
                                                        second: e.target.value,
                                                    },
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 제목 2번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME1
                                                .second
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {detailState.info.MISN_SUBNAME1 &&
                                        detailState.info.MISN_SUBNAME1.second
                                            .length}
                                    /{textMaxLength.title})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell rowSpan={2}>
                            <VaryLabel LabelName={`매거진 설명`} />
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
                                                    MISN_SUBNAME2: {
                                                        ...prevState.info
                                                            .MISN_SUBNAME2,
                                                        first: e.target.value,
                                                    },
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 설명 1번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME2.first
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {
                                        detailState.info.MISN_SUBNAME2.first
                                            .length
                                    }
                                    /{textMaxLength.subTitle})
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
                                                    MISN_SUBNAME2: {
                                                        ...prevState.info
                                                            .MISN_SUBNAME2,
                                                        second: e.target.value,
                                                    },
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={
                                            '매거진 설명 2번째 줄 내용'
                                        }
                                        Value={
                                            detailState.info.MISN_SUBNAME2
                                                .second
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {
                                        detailState.info.MISN_SUBNAME2.second
                                            .length
                                    }
                                    /{textMaxLength.subTitle})
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
                                            detailState.info.USE_AT === 'Y'
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
                                            detailState.info.USE_AT === 'N'
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
                                        InputeType={`default`}
                                        Value={
                                            detailState.info.BEGIN_DT
                                                ? changeDatePickerDate(
                                                      detailState.info.BEGIN_DT
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
                                                    BEGIN_DT: `${year}${monthPad}${dayPad}`,
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
                                        InputeType={`default`}
                                        Value={
                                            detailState.info.END_DT
                                                ? changeDatePickerDate(
                                                      detailState.info.END_DT
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
                                                    END_DT: `${year}${monthPad}${dayPad}`,
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
                            handleDeleteTabbyMatchRouter(
                                '/manage/contents/magazine-list/new'
                            )
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
                        ButtonName={`저장`}
                        HandleClick={() => handleClickApplyButton()}
                    />
                </ButtonItem>
            </ButtonBox>

            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.contents.magazine.update}
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
                        if (pageMode === 'modify') {
                            handleModify().then()
                        } else {
                            handleSave().then()
                        }
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default MagazineDetailTable
