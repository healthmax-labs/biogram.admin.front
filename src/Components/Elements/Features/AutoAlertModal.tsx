import React, { useCallback, useEffect, useState } from 'react'
import {
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryModal,
    VaryTextArea,
} from '@Elements'
import { AutoAlertModalStyle } from '@Style/Elements/FeaturesStyles'
import { changeDatePickerDate, getNowDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilValue } from 'recoil'
import { NonMeasureAlertItemInterface } from '@Type/StatusTypes'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { getNonMeasureAlert, postNonMeasureAlert } from '@Service/StatusService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { DefaultStatus } from '@CommonTypes'

const {
    Container,
    Title,
    SubTitle,
    InstText,
    RowWapper,
    ButtonBox,
    TableStyle: { Table, Thead, TheadRow, TheadCell, Body, Row, Cell },
} = AutoAlertModalStyle

const initializeState = {
    status: 'idle',
    instNo: '',
    info: {
        INST_NO: 0,
        NTCN_STTUS_AT: '',
        BP_NTCN_AT: '',
        BC_N_MESURE_DAY: 7,
        SB_NTCN_AT: '',
        HA_N_MESURE_DAY: 7,
        IS_N_MESURE_DAY: 7,
        N_MESURE_NTCN_DAY: 0,
        NTCN_TY_CODE: 'PUSH',
        NTCN_CN:
            '[미측정 알림] 본 문자를 수신하신 경우 가까운 바이오그램존에서 건강을 측정 해주세요.',
        BP_N_MESURE_DAY: 7,
        IS_NTCN_AT: '',
        BS_N_MESURE_DAY: 7,
        HA_NTCN_AT: '',
        BS_NTCN_AT: '',
        AL_SELECT_AT: '',
        SR_N_MESURE_DAY: 7,
        BC_NTCN_AT: '',
        SB_N_MESURE_DAY: 7,
        SR_NTCN_AT: '',
        N_MESURE_PD_ETC: '',
        N_MESURE_NTCN_ENDDE: getNowDate(),
    },
}

const AutoAlertModal = ({
    CancleButtonClick,
}: {
    CancleButtonClick: () => void
}) => {
    const nonMeasureListState = useRecoilValue(NonMeasureListState)
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        status: string | DefaultStatus
        instNo: string
        info: NonMeasureAlertItemInterface
    }>(initializeState)

    const getAlertSetting = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { INST_NO },
        } = nonMeasureListState
        const { status, payload } = await getNonMeasureAlert({
            INST_NO: INST_NO,
        })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                status: 'success',
                info: payload.NOT_MESURE_NTCN_SET_INFO,
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [nonMeasureListState])

    // 자동알림 셋팅 저장
    const handleClickSaveButton = async () => {
        const { status } = await postNonMeasureAlert(pageState.info)

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
        setPageState(prevState => ({
            ...prevState,
            info: initializeState.info,
        }))
    }

    useEffect(() => {
        const pageStart = () => {
            getAlertSetting().then()
        }

        pageStart()
    }, [getAlertSetting])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <Container>
                        <Title>미측정 자동 알림 설정</Title>
                        <RowWapper>
                            <SubTitle>
                                일정 기간 동안 측정 데이터가 없는(미측정)
                                회원에게 예약 알림을 발송 합니다.
                            </SubTitle>
                            <Table>
                                <Thead>
                                    <TheadRow>
                                        <TheadCell>구분</TheadCell>
                                        <TheadCell>혈압</TheadCell>
                                        <TheadCell>혈당</TheadCell>
                                        <TheadCell>콜레스테롤</TheadCell>
                                        <TheadCell>당화혈색소</TheadCell>
                                        <TheadCell>체성분</TheadCell>
                                        <TheadCell>스트레스</TheadCell>
                                        <TheadCell>뇌기능검사</TheadCell>
                                    </TheadRow>
                                </Thead>
                                <Body>
                                    <Row>
                                        <Cell>미측정 알림기준</Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            BP_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .BP_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            BS_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .BS_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            BC_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .BC_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            HA_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .HA_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            IS_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .IS_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            SR_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .SR_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                        <Cell>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={e =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            SB_N_MESURE_DAY:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        },
                                                    }))
                                                }
                                                Value={
                                                    pageState.info
                                                        .SB_N_MESURE_DAY
                                                }
                                            />
                                        </Cell>
                                    </Row>
                                </Body>
                            </Table>
                            <InstText>
                                *당일기준 설정된 기간내 측정기록이 없는
                                대상자에게 알림이 발송됩니다.
                            </InstText>
                        </RowWapper>
                        <RowWapper>
                            <SubTitle>알림방법</SubTitle>
                            <ButtonBox>
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
                            </ButtonBox>
                        </RowWapper>
                        <RowWapper>
                            <SubTitle>종료일</SubTitle>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Width={`w40`}
                                Value={changeDatePickerDate(
                                    pageState.info.N_MESURE_NTCN_ENDDE
                                )}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)

                                    setPageState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            N_MESURE_NTCN_ENDDE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </RowWapper>
                        <RowWapper>
                            <SubTitle>알림메세지 작성</SubTitle>
                            <VaryTextArea
                                HandleOnChange={e =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        info: {
                                            ...prevState.info,
                                            NTCN_CN: e.target.value,
                                        },
                                    }))
                                }
                                Placeholder={`메세지 내용을 입력해 주세요`}
                                Value={pageState.info.NTCN_CN}
                                Rows={5}
                            />
                        </RowWapper>
                    </Container>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'default'}
                            HandleClick={() => handleClickResetButton()}
                            ButtonName={'초기화'}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            HandleClick={() => handleClickSaveButton()}
                            ButtonName={'저장하기'}
                        />
                        <VaryButton
                            ButtonType={'default'}
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
