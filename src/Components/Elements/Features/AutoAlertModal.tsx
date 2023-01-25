import React, { useState } from 'react'
import { StplatItemInterface } from '@Type/MemberTypes'
import {
    VaryButton,
    VaryModal,
    VaryInput,
    VaryTextArea,
    VaryLabel,
    VaryDatepickerInput,
} from '@Elements'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { gmtTimeToTimeObject } from '@Helper'

const { Container, RowWapper, TableBox, Table: T } = ContentsStyle
const { SearchItemWapper, SearchLabel, SearchItem } = SearchBoxStyle

const initializeState = {
    checkAutoInfo: {
        bp: 7,
        bs: 7,
        bc: 7,
        hba1c: 7,
        bmi: 7,
        st: 7,
        brain: 7,
    },
    pushType: 'S',
    endDT: '',
    msg: '[미측정 알림] 본 문자를 수신하신 경우 가까운 바이오그램 존에서 건강을 측정 해주세요.',
}

const AutoAlertModal = ({
    CancleButtonClick,
}: //CallBackResturn,
{
    CancleButtonClick: () => void
    MemberStplatList?: StplatItemInterface
    CallBackResturn: (e: StplatItemInterface) => void
}) => {
    const [pageState, setPageState] = useState<{
        checkAutoInfo: {
            bp: number
            bs: number
            bc: number
            hba1c: number
            bmi: number
            st: number
            brain: number
        }
        pushType: string
        endDT: string
        msg: string
    }>(initializeState)

    // 저장
    const handleClickSaveButton = () => {
        //저장 api 태우기
    }

    // 리셋
    const handleClickResetButton = () => {
        setPageState(initializeState)
    }

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <Container>
                        {/* <TitleBox>미측정 자동알림 팝업</TitleBox> */}
                        <div className="flex flex-nowrap w-full pt-2">
                            <div className="flex text-lg items-center text-gray-500 font-semibold">
                                미측정 자동 알림 설정
                            </div>
                        </div>
                        <div className="flex pt-5">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-gray-500 w-12/12">
                                    일정 기간 동안 측정 데이터가 없는(미측정)
                                    회원에게 예약 알림을 발송 합니다.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-nowrap pt-4">
                            <div className="text-sm text-gray-500">
                                대사나이
                            </div>
                        </div>
                        <div className="pt-3">
                            <div className="w-full">
                                <RowWapper>
                                    <TableBox>
                                        <T.Table>
                                            <T.Thead>
                                                <T.TheadRow>
                                                    <T.TheadCell>
                                                        구분
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        혈압
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        혈당
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        콜레스테롤
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        당화혈색소
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        체성분
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        스트레스
                                                    </T.TheadCell>
                                                    <T.TheadCell>
                                                        뇌기능검사
                                                    </T.TheadCell>
                                                </T.TheadRow>
                                            </T.Thead>
                                            <T.Body>
                                                <T.Row>
                                                    <T.Cell>
                                                        미측정 알림기준
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                bp: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .bp
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                bs: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .bs
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                bc: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .bc
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                hba1c: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .hba1c
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                bmi: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .bmi
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                st: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .st
                                                            }
                                                        />
                                                    </T.Cell>
                                                    <T.Cell>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkAutoInfo:
                                                                            {
                                                                                ...prevState.checkAutoInfo,
                                                                                brain: Number(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ),
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .checkAutoInfo
                                                                    .brain
                                                            }
                                                        />
                                                    </T.Cell>
                                                </T.Row>
                                            </T.Body>
                                        </T.Table>
                                    </TableBox>
                                </RowWapper>
                            </div>
                        </div>
                        <div className="flex w-full items-end justify-end">
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
                        <div className="flex pt-4">
                            <div className="text-sm text-gray-500">
                                알림기간
                            </div>
                        </div>
                        <SearchItemWapper>
                            <SearchLabel>
                                <VaryLabel LabelName={`종료일`} />
                            </SearchLabel>
                            <SearchItem>
                                <VaryDatepickerInput
                                    ContentsType={`search`}
                                    Value={
                                        pageState.endDT
                                            ? new Date(pageState.endDT)
                                            : new Date()
                                    }
                                    CallBackReturn={e => {
                                        const { year, monthPad, dayPad } =
                                            gmtTimeToTimeObject(e)

                                        setPageState(prevState => ({
                                            ...prevState,
                                            endDT: year + monthPad + dayPad,
                                        }))
                                    }}
                                />
                            </SearchItem>
                        </SearchItemWapper>
                        <div className="flex pt-4">
                            <div className="text-sm text-gray-500">
                                알림메세지 작성
                            </div>
                        </div>
                        <VaryTextArea
                            HandleOnChange={e =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    msg: e.target.value,
                                }))
                            }
                            Placeholder={`메세지 내용을입력해 주세요`}
                            Value={
                                pageState.msg
                                    ? pageState.msg
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
                            HandleClick={() => CancleButtonClick()}
                            ButtonName={'취소'}
                        />
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => handleClickSaveButton()}
                            ButtonName={'저장하기'}
                        />
                    </>
                }
            />
        </>
    )
}

export default AutoAlertModal
