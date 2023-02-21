import React, { useCallback, useEffect } from 'react'
import {
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryModal,
    VaryTextArea,
} from '@Elements'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { gmtTimeToTimeObject } from '@Helper'
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil'
import {
    NonMeasureAlertState,
    NonMeasureListState,
} from '@Recoil/StatusPagesState'
import { getNonMeasureAlert, postNonMeasureAlert } from '@Service/StatusService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const { Container, RowWapper, TableBox, Table: T } = ContentsStyle
const { SearchItemWapper, SearchLabel, SearchItem } = SearchBoxStyle

const AutoAlertModal = ({
    CancleButtonClick,
}: {
    CancleButtonClick: () => void
}) => {
    const [nonMeasureAlertState, setNonMeasureAlertState] =
        useRecoilState(NonMeasureAlertState)
    const resetNonMeasureAlertState = useResetRecoilState(NonMeasureAlertState)
    const nonMeasureListState = useRecoilValue(NonMeasureListState)
    const { handlMainAlert } = useMainLayouts()

    const getAlertSetting = useCallback(async () => {
        const {
            search: { INST_NO },
        } = nonMeasureListState
        const { status, payload } = await getNonMeasureAlert({
            INST_NO: INST_NO,
        })

        if (status) {
            setNonMeasureAlertState(prevState => ({
                ...prevState,
                status: 'success',
                data: payload,
            }))
        } else {
            setNonMeasureAlertState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [nonMeasureListState, setNonMeasureAlertState])

    // 자동알림 셋팅 저장
    const handleClickSaveButton = async () => {
        const { status } = await postNonMeasureAlert(
            nonMeasureAlertState.data.NOT_MESURE_NTCN_SET_INFO
        )

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

    // 초기화
    const handleClickResetButton = () => {
        resetNonMeasureAlertState()
    }

    useEffect(() => {
        const pageStart = () => {
            getAlertSetting().then()
        }

        pageStart()
    }, [getAlertSetting, nonMeasureAlertState.status])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <Container>
                        {/* <TitleBox>미측정 자동알림 팝업</TitleBox> */}
                        <div className="flex flex-nowrap w-full">
                            <div className="flex text-lg items-center text-gray-500 font-semibold">
                                미측정 자동 알림 설정
                            </div>
                        </div>
                        <div className="flex pt-5">
                            <div className="text-xs text-gray-500 w-12/12">
                                일정 기간 동안 측정 데이터가 없는(미측정)
                                회원에게 예약 알림을 발송 합니다.
                            </div>
                        </div>
                        <RowWapper>
                            <TableBox>
                                <T.Table>
                                    <T.Thead>
                                        <T.TheadRow>
                                            <T.TheadCell>구분</T.TheadCell>
                                            <T.TheadCell>혈압</T.TheadCell>
                                            <T.TheadCell>혈당</T.TheadCell>
                                            <T.TheadCell>
                                                콜레스테롤
                                            </T.TheadCell>
                                            <T.TheadCell>
                                                당화혈색소
                                            </T.TheadCell>
                                            <T.TheadCell>체성분</T.TheadCell>
                                            <T.TheadCell>스트레스</T.TheadCell>
                                            <T.TheadCell>
                                                뇌기능검사
                                            </T.TheadCell>
                                        </T.TheadRow>
                                    </T.Thead>
                                    <T.Body>
                                        <T.Row>
                                            <T.Cell>미측정 알림기준</T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            BP_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .BP_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            BS_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .BS_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            BC_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .BC_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            HA_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .HA_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            IS_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .IS_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            SR_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .SR_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureAlertState(
                                                            prevState => ({
                                                                ...prevState,
                                                                data: {
                                                                    ...prevState.data,
                                                                    NOT_MESURE_NTCN_SET_INFO:
                                                                        {
                                                                            ...prevState
                                                                                .data
                                                                                .NOT_MESURE_NTCN_SET_INFO,
                                                                            SB_N_MESURE_DAY:
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                        },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertState
                                                            .data
                                                            .NOT_MESURE_NTCN_SET_INFO
                                                            .SB_N_MESURE_DAY
                                                    }
                                                />
                                            </T.Cell>
                                        </T.Row>
                                    </T.Body>
                                </T.Table>
                            </TableBox>
                        </RowWapper>
                        <div className="flex w-full items-end">
                            {/* justify-end */}
                            <div className="text-xs text-gray-500">
                                *당일기준 설정된 기간내 측정기록이 없는
                                대상자에게 알림이 발송됩니다.
                            </div>
                        </div>
                        <div className="flex flex-nowrap pt-4">
                            <div className="text-sm text-gray-500">
                                알림방법
                            </div>
                        </div>
                        <div className="flex w-full items-end">
                            <>
                                <VaryButton
                                    ButtonType={'default'}
                                    HandleClick={() => handleClickResetButton()}
                                    ButtonName={'앱 알림(무료)'}
                                />
                                <VaryButton
                                    ButtonType={'default'}
                                    HandleClick={() => {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.comingSoon,
                                        })
                                    }}
                                    ButtonName={'카톡/SMS(유료)'}
                                />
                            </>
                        </div>
                        <div className="flex pt-4">
                            <div className="text-sm text-gray-500">종료일</div>
                        </div>
                        <SearchItemWapper>
                            <SearchLabel>
                                <VaryLabel LabelName={`종료일`} />
                            </SearchLabel>
                            <SearchItem>
                                <div className={`flex px-3`}>
                                    <VaryDatepickerInput
                                        InputeType={`search`}
                                        Value={
                                            nonMeasureAlertState.data
                                                .NOT_MESURE_NTCN_SET_INFO
                                                .N_MESURE_NTCN_ENDDE
                                                ? new Date(
                                                      nonMeasureAlertState.data.NOT_MESURE_NTCN_SET_INFO.N_MESURE_NTCN_ENDDE
                                                  )
                                                : new Date()
                                        }
                                        CallBackReturn={e => {
                                            const { year, monthPad, dayPad } =
                                                gmtTimeToTimeObject(e)

                                            setNonMeasureAlertState(
                                                prevState => ({
                                                    ...prevState,
                                                    N_MESURE_NTCN_ENDDE:
                                                        year +
                                                        monthPad +
                                                        dayPad,
                                                })
                                            )
                                        }}
                                    />
                                </div>
                            </SearchItem>
                        </SearchItemWapper>
                        <div className="flex pt-4">
                            <div className="text-sm text-gray-500">
                                알림메세지 작성
                            </div>
                        </div>
                        <VaryTextArea
                            HandleOnChange={e =>
                                setNonMeasureAlertState(prevState => ({
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        NOT_MESURE_NTCN_SET_INFO: {
                                            ...prevState.data
                                                .NOT_MESURE_NTCN_SET_INFO,
                                            NTCN_CN: e.target.value,
                                        },
                                    },
                                }))
                            }
                            Placeholder={`메세지 내용을입력해 주세요`}
                            Value={
                                nonMeasureAlertState.data
                                    .NOT_MESURE_NTCN_SET_INFO.NTCN_CN
                            }
                            Rows={5}
                        />
                    </Container>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => handleClickResetButton()}
                            ButtonName={'초기화'}
                        />
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => handleClickSaveButton()}
                            ButtonName={'저장하기'}
                        />
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => CancleButtonClick()}
                            ButtonName={'닫기'}
                        />
                    </>
                }
            />
        </>
    )
}

export default AutoAlertModal
