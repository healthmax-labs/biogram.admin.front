import React, { useCallback, useEffect } from 'react'
import { StplatItemInterface } from '@Type/MemberTypes'
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

import { useRecoilState } from 'recoil'
import {
    NonMeasureListState,
    NonMeasureAlertState,
} from '@Recoil/StatusPagesState'
import { getNonMeasureAlert } from '@Service/StatusService'
import { isNull } from 'lodash'

const { Container, RowWapper, TableBox, Table: T } = ContentsStyle
const { SearchItemWapper, SearchLabel, SearchItem } = SearchBoxStyle

const initializeState = {
    NTCN_STTUS_AT: 'Y',
    BP_NTCN_AT: 'Y',
    BC_N_MESURE_DAY: 7,
    SB_NTCN_AT: 'Y',
    HA_N_MESURE_DAY: 7,
    IS_N_MESURE_DAY: 7,
    N_MESURE_NTCN_DAY: 7,
    NTCN_TY_CODE: 'PUSH',
    NTCN_CN:
        '[미측정 알림] 본 문자를 수신하신 경우 가까운 바이오그램 존에서 건강을 측정 해주세요.',
    BP_N_MESURE_DAY: 7,
    IS_NTCN_AT: 'Y',
    BS_N_MESURE_DAY: 7,
    HA_NTCN_AT: 'Y',
    BS_NTCN_AT: 'Y',
    AL_SELECT_AT: 'Y',
    SR_N_MESURE_DAY: 7,
    BC_NTCN_AT: 'Y',
    SB_N_MESURE_DAY: 7,
    REGIST_DT: 1673332279000,
    SR_NTCN_AT: 'Y',
    N_MESURE_PD_ETC: '',
    N_MESURE_PD_CODE: '00',
}

const AutoAlertModal = ({
    CancleButtonClick,
}: //CallBackResturn,
{
    CancleButtonClick: () => void
    MemberStplatList?: StplatItemInterface
    CallBackResturn: (e: StplatItemInterface) => void
}) => {
    const [nonMeasureListState, setNonMeasureListState] =
        useRecoilState(NonMeasureListState)

    const [nonMeasureAlertSettingState, setNonMeasureAlertSettingState] =
        useRecoilState(NonMeasureAlertState)

    const getAlertSetting = useCallback(async () => {
        const instNo = nonMeasureListState.search.INST_NO

        const { status, payload } = await getNonMeasureAlert({
            INST_NO: !isNull(instNo) ? instNo : 1000,
        })

        if (status) {
            setNonMeasureAlertSettingState(prevState => ({
                ...prevState,
                status: 'success',
                data: payload,
            }))
        } else {
            setNonMeasureAlertSettingState(prevState => ({
                ...prevState,
                status: 'failure',
                data: null,
            }))
        }

        console.log(nonMeasureAlertSettingState)
        // eslint-disable-next-line
    }, [nonMeasureAlertSettingState.status, setNonMeasureAlertSettingState])

    // 저장
    const handleClickSaveButton = () => {
        //저장 api 태우기
    }

    // 리셋
    const handleClickResetButton = () => {
        // setNonMeasureAlertState(initializeState)
    }

    // const getSettingVal = useCallback(async () => {})

    useEffect(() => {
        const pageStart = () => {
            getAlertSetting().then()
        }

        pageStart()
    }, [getAlertSetting, nonMeasureListState.status])

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
                                                        setNonMeasureAlertSettingState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    BP_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .BP_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .BP_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    BS_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .BS_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .BS_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    BC_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .BC_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .BC_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    HA_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .HA_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .HA_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    IS_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .IS_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .IS_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    SR_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .SR_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .SR_N_MESURE_DAY
                                                            : 7
                                                    }
                                                />
                                            </T.Cell>
                                            <T.Cell>
                                                <VaryInput
                                                    InputType={'text'}
                                                    HandleOnChange={e =>
                                                        setNonMeasureListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    SB_N_MESURE_DAY:
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                    Value={
                                                        nonMeasureAlertSettingState
                                                            .data
                                                            ?.NOT_MESURE_NTCN_SET_INFO
                                                            .SB_N_MESURE_DAY
                                                            ? nonMeasureAlertSettingState
                                                                  .data
                                                                  ?.NOT_MESURE_NTCN_SET_INFO
                                                                  .SB_N_MESURE_DAY
                                                            : 7
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
                                    ButtonType={'manage'}
                                    HandleClick={() => alert('준비 중입니다.')}
                                    ButtonName={'카톡/SMS(유료)'}
                                />
                            </>
                        </div>
                        <div className="flex pt-4">
                            <div className="text-sm text-gray-500">
                                알림기간(비사용)
                            </div>
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
                                            initializeState.REGIST_DT
                                                ? new Date(
                                                      initializeState.REGIST_DT
                                                  )
                                                : new Date()
                                        }
                                        CallBackReturn={e => {
                                            const { year, monthPad, dayPad } =
                                                gmtTimeToTimeObject(e)

                                            setNonMeasureListState(
                                                prevState => ({
                                                    ...prevState,
                                                    endDT:
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
                                setNonMeasureListState(prevState => ({
                                    ...prevState,
                                    msg: e.target.value,
                                }))
                            }
                            Placeholder={`메세지 내용을입력해 주세요`}
                            Value={
                                initializeState.NTCN_CN
                                    ? initializeState.NTCN_CN
                                    : `[미측정 알림] 본 문자를 수신하신 경우 가까운 바이오그램존에서 건강을 측정 해주세요.`
                            }
                            Rows={15}
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
                            ButtonName={'취소'}
                        />
                    </>
                }
            />
        </>
    )
}

export default AutoAlertModal
