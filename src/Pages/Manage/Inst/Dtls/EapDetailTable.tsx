import { WapperStyle } from '@Style/Pages/CommonStyle'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/InstPageStyle'
import {
    VaryInput,
    VaryLabel,
    PstinstSelector,
    VaryDatepickerInput,
    VaryLabelCheckBox,
    VaryButton,
    ConfirmModal,
    ElementLoading,
} from '@Element/index'
import React, { useEffect, useState } from 'react'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useRecoilState } from 'recoil'
import { EapDetailState } from '@Recoil/InstPagesState'
import _ from 'lodash'
import { useMainLayouts, useTab } from '@Hook/index'
import { useNavigate } from 'react-router-dom'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCellLong,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer } = DetailPageStyle
const { TableCellInputWapper, TableCellInputItem } = WapperStyle

const initializeState = {
    modal: {
        confirm: false,
        delete: false,
    },
}

const EapDetailTable = ({
    pageMode,
    HandleSave,
    HandleUpdate,
    HandleDelete,
}: {
    pageMode: `new` | `modify`
    HandleSave: () => void
    HandleUpdate: () => void
    HandleDelete: ({ eapNo }: { eapNo: string }) => void
}) => {
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
            delete: boolean
        }
    }>(initializeState)

    const [detailState, setDetailState] = useRecoilState(EapDetailState)

    const generateDatepicker = (): Date => {
        const { year, monthPad, dayPad, hourPad } = gmtTimeToTimeObject(
            new Date()
        )

        return changeDatePickerDate(`${year}${monthPad}${dayPad}${hourPad}00`)
    }

    useEffect(() => {
        const pageStart = () => {
            if (pageMode === 'new') {
                //
                const { year, monthPad, dayPad } = gmtTimeToTimeObject(
                    new Date()
                )
                setDetailState(prevState => ({
                    ...prevState,
                    info: {
                        ...prevState.info,
                        START_DE: `${year}-${monthPad}-${dayPad}`,
                        END_DE: `${year}-${monthPad}-${dayPad}`,
                    },
                }))
            }
        }

        pageStart()
    }, [pageMode, setDetailState])

    return (
        <DetailContainer>
            {detailState.status === `loading` ? (
                <div className="h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableContainer>
                    <TableWapper>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`소속`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <PstinstSelector
                                            SelectorType={`input`}
                                            InputType={`default`}
                                            SelectElement={{
                                                value: _.isEmpty(
                                                    detailState.info.INST_NO
                                                )
                                                    ? null
                                                    : Number(
                                                          detailState.info
                                                              .INST_NO
                                                      ),
                                                text: _.isEmpty(
                                                    detailState.info.INST_NM
                                                )
                                                    ? null
                                                    : detailState.info.INST_NM,
                                            }}
                                            HandleSelectValue={({
                                                instNo,
                                                instNm,
                                            }) => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        INST_NO: String(instNo),
                                                        INST_NM: String(instNm),
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`신청기간`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryDatepickerInput
                                            Width={`w40`}
                                            InputeType={`default`}
                                            OnBlurPass={true}
                                            Value={
                                                detailState.info.START_DE
                                                    ? changeDatePickerDate(
                                                          detailState.info.START_DE.replaceAll(
                                                              '-',
                                                              ''
                                                          )
                                                              .replaceAll(
                                                                  ' ',
                                                                  ''
                                                              )
                                                              .replaceAll(
                                                                  ':',
                                                                  ''
                                                              )
                                                      )
                                                    : generateDatepicker()
                                            }
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                } = gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        START_DE: `${year}-${monthPad}-${dayPad}`,
                                                    },
                                                }))
                                            }}
                                            MinDate={generateDatepicker()}
                                        />
                                    </TableCellInputItem>
                                    <TableCellInputItem>
                                        <VaryDatepickerInput
                                            Width={`w40`}
                                            InputeType={`default`}
                                            OnBlurPass={true}
                                            Value={
                                                detailState.info.END_DE
                                                    ? changeDatePickerDate(
                                                          detailState.info.END_DE.replaceAll(
                                                              '-',
                                                              ''
                                                          )
                                                              .replaceAll(
                                                                  ' ',
                                                                  ''
                                                              )
                                                              .replaceAll(
                                                                  ':',
                                                                  ''
                                                              )
                                                      )
                                                    : generateDatepicker()
                                            }
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                } = gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        END_DE: `${year}-${monthPad}-${dayPad}`,
                                                    },
                                                }))
                                            }}
                                            MinDate={generateDatepicker()}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`마음 상담`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryLabelCheckBox
                                            LabelName={`사용`}
                                            LabelWidth={`w60`}
                                            Checked={
                                                detailState.info.MIND_YN === 'Y'
                                            }
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MIND_YN: e.target
                                                            .checked
                                                            ? 'Y'
                                                            : 'N',
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`마음 상담 제한 인원수`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w20`}
                                            InputType={`number`}
                                            ContentsType={`default`}
                                            Value={
                                                detailState.info.MIND_MAX_COUNT
                                            }
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MIND_MAX_COUNT:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`마음 상담 신청자수`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w20`}
                                            ContentsType={`default`}
                                            InputType={`number`}
                                            Value={
                                                detailState.info
                                                    .MIND_CURRENT_COUNT
                                            }
                                            HandleOnChange={e => {
                                                if (
                                                    Number(e.target.value) >
                                                    Number(
                                                        detailState.info
                                                            .MIND_MAX_COUNT
                                                    )
                                                ) {
                                                    handlMainAlert({
                                                        state: true,
                                                        message: `제한 인원수를 초과 할수 없습니다.`,
                                                    })
                                                    return
                                                }
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MIND_CURRENT_COUNT:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`링크 URL`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w96`}
                                            ContentsType={`default`}
                                            Value={detailState.info.MIND_URL}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MIND_URL:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`링크 코드`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w60`}
                                            ContentsType={`default`}
                                            Value={detailState.info.MIND_CODE}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MIND_CODE:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`건강 상담`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryLabelCheckBox
                                            LabelName={`사용`}
                                            LabelWidth={`w60`}
                                            Checked={
                                                detailState.info.HEALTH_YN ===
                                                'Y'
                                            }
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        HEALTH_YN: e.target
                                                            .checked
                                                            ? 'Y'
                                                            : 'N',
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`건강 상담 제한 인원수`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w20`}
                                            InputType={`number`}
                                            ContentsType={`default`}
                                            Value={
                                                detailState.info
                                                    .HEALTH_MAX_COUNT
                                            }
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        HEALTH_MAX_COUNT:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`건강 상담 신청자수`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w20`}
                                            InputType={`number`}
                                            ContentsType={`default`}
                                            Value={
                                                detailState.info
                                                    .HEALTH_CURRENT_COUNT
                                            }
                                            HandleOnChange={e => {
                                                if (
                                                    Number(e.target.value) >
                                                    Number(
                                                        detailState.info
                                                            .HEALTH_MAX_COUNT
                                                    )
                                                ) {
                                                    handlMainAlert({
                                                        state: true,
                                                        message: `제한 인원수를 초과 할수 없습니다.`,
                                                    })
                                                    return
                                                }

                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        HEALTH_CURRENT_COUNT:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`링크 URL`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryInput
                                            Width={`w96`}
                                            ContentsType={`default`}
                                            Value={detailState.info.HEALTH_URL}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        HEALTH_URL:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCellLong>
                                <VaryLabel
                                    LabelName={`상담 진행 여부`}
                                    LabelWidth={`w40`}
                                />
                            </LabelCellLong>
                            <InputCell>
                                <TableCellInputWapper>
                                    <TableCellInputItem>
                                        <VaryLabelCheckBox
                                            LabelName={`진행중`}
                                            Checked={
                                                detailState.info.IS_LIVE === 'Y'
                                            }
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                IS_LIVE: 'Y',
                                                            },
                                                        })
                                                    )
                                                }
                                            }}
                                        />
                                    </TableCellInputItem>
                                    <TableCellInputItem>
                                        <VaryLabelCheckBox
                                            LabelName={`종료`}
                                            Checked={
                                                detailState.info.IS_LIVE === 'N'
                                            }
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                IS_LIVE: 'N',
                                                            },
                                                        })
                                                    )
                                                }
                                            }}
                                        />
                                    </TableCellInputItem>
                                </TableCellInputWapper>
                            </InputCell>
                        </Row>
                    </TableWapper>
                </TableContainer>
            )}
            <ButtonBox>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`취소`}
                        HandleClick={() => {
                            handleDeleteTabbyMatchRouter(
                                '/manage/inst/eap-list/new'
                            )

                            handleDeleteTabbyMatchRouter(
                                `/manage/inst/eap-list/:eapNo/detail`
                            )

                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/inst/eap-list`,
                            })
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`확인`}
                        HandleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    confirm: true,
                                },
                            }))
                        }}
                    />
                </ButtonItem>
                {pageMode === 'modify' && (
                    <ButtonItem>
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`삭제`}
                            HandleClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        delete: true,
                                    },
                                }))
                            }}
                        />
                    </ButtonItem>
                )}
            </ButtonBox>

            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.saveConfirm}
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

                        if (pageMode === `new`) {
                            HandleSave()
                            return
                        }

                        if (pageMode === `modify`) {
                            HandleUpdate()
                            return
                        }
                    }}
                />
            )}

            {pageState.modal.delete && (
                <ConfirmModal
                    Title={Messages.Default.deleteConfirm}
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

                        HandleDelete({
                            eapNo: detailState.info.EAP_INST_REGISTER_NO,
                        })
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default EapDetailTable
