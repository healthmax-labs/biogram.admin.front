import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ManagerPageStyle'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import {
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryButton,
    ConfirmModal,
    ElementLoading,
    PstinstSelector,
} from '@Elements'
import { BudgetDetailState } from '@Recoil/ManagerPagesState'
import { useRecoilState, useResetRecoilState } from 'recoil'
import React, { useState } from 'react'
import _ from 'lodash'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useMainLayouts, useTab } from '@Hook/index'
import { useNavigate } from 'react-router-dom'

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

const { TableCellInputWapper, TableCellInputItem } = WapperStyle

const initializeState = {
    modal: {
        confirm: false,
    },
}
const BudgetDetailTable = ({ HandleSave }: { HandleSave: () => void }) => {
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const [detailState, setDetailState] = useRecoilState(BudgetDetailState)
    const detailStateReset = useResetRecoilState(BudgetDetailState)

    const { handleDeleteTabbyMatchRouter } = useTab()

    const generateDatepicker = (): Date => {
        const { year, monthPad, dayPad, hourPad } = gmtTimeToTimeObject(
            new Date()
        )

        return changeDatePickerDate(`${year}${monthPad}${dayPad}${hourPad}00`)
    }

    return (
        <DetailContainer>
            {detailState.status === 'loading' ? (
                <div className="h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <TableContainer>
                        <TableWapper>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`소속`} />
                                </LabelCell>
                                <InputCell>
                                    <PstinstSelector
                                        SelectorType={`input`}
                                        InputType={`default`}
                                        SelectElement={{
                                            value: _.isEmpty(
                                                detailState.info.INST_NO
                                            )
                                                ? null
                                                : Number(
                                                      detailState.info.INST_NO
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
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`기간`} />
                                </LabelCell>
                                <InputCell>
                                    <TableCellInputWapper>
                                        <TableCellInputItem>
                                            <VaryDatepickerInput
                                                Width={`w40`}
                                                InputeType={`default`}
                                                OnBlurPass={true}
                                                Value={
                                                    detailState.info
                                                        .BUDGET_BGNDE
                                                        ? changeDatePickerDate(
                                                              detailState.info.BUDGET_BGNDE.replaceAll(
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
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                BUDGET_BGNDE: `${year}${monthPad}${dayPad}`,
                                                            },
                                                        })
                                                    )
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
                                                    detailState.info
                                                        .BUDGET_ENDDE
                                                        ? changeDatePickerDate(
                                                              detailState.info.BUDGET_ENDDE.replaceAll(
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
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                BUDGET_ENDDE: `${year}${monthPad}${dayPad}`,
                                                            },
                                                        })
                                                    )
                                                }}
                                                MinDate={generateDatepicker()}
                                            />
                                        </TableCellInputItem>
                                    </TableCellInputWapper>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`총예산`} />
                                </LabelCell>
                                <InputCell>
                                    <TableCellInputWapper>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'number'}
                                            id={'id'}
                                            Placeholder={`총예산을 입력해 주세요.`}
                                            Value={
                                                detailState.info
                                                    .BUDGET_ASIGN_AMOUNT
                                            }
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        BUDGET_ASIGN_AMOUNT:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                        <p className="flex h-8 items-end text-center text-xs truncate text-gray-600">
                                            원
                                        </p>
                                    </TableCellInputWapper>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`최대금액`} />
                                </LabelCell>
                                <InputCell>
                                    <TableCellInputWapper>
                                        <VaryInput
                                            Width={'w60'}
                                            InputType={'number'}
                                            id={'id'}
                                            Placeholder={`총예산을 입력해 주세요.`}
                                            Value={detailState.info.MAX_CASH}
                                            HandleOnChange={e => {
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        MAX_CASH:
                                                            e.target.value,
                                                    },
                                                }))
                                            }}
                                        />
                                        <p className="flex h-8 items-end text-center text-xs truncate text-gray-600">
                                            원 ( 선물상자 당 최대발생 가능금액
                                            제한설정, 제한이 경우 0입력)
                                        </p>
                                    </TableCellInputWapper>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`잔금 처리 방법`} />
                                </LabelCell>
                                <InputCell>
                                    <TableCellInputWapper>
                                        <div className="flex h-8 items-center text-center text-xs truncate text-gray-600">
                                            (마지막날은, 전날 까지 남은 금액을
                                            예산에 추가해서 최대금액 없이 1/n,
                                            마지막날 잔금은 마지막 사람에게)
                                        </div>
                                    </TableCellInputWapper>
                                </InputCell>
                            </Row>
                        </TableWapper>
                    </TableContainer>
                    <ButtonBox>
                        <ButtonItem>
                            <VaryButton
                                ButtonName={`등록`}
                                ButtonType={`default`}
                                HandleClick={() => {
                                    if (detailState.info.INST_NO === '') {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default
                                                    .pstinstSelectEmpty,
                                        })
                                        return
                                    }
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            confirm: true,
                                        },
                                    }))
                                }}
                            />
                        </ButtonItem>
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={`취소`}
                                HandleClick={() => {
                                    detailStateReset()
                                    handleDeleteTabbyMatchRouter(
                                        '/manage/manager/budget-list/new'
                                    )

                                    handleDeleteTabbyMatchRouter(
                                        '/manage/manager/budget-list/:BUDGET_SN/detail'
                                    )

                                    navigate({
                                        pathname:
                                            process.env.PUBLIC_URL +
                                            `/manage/manager/budget-list`,
                                    })
                                }}
                            />
                        </ButtonItem>
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
                                HandleSave()
                            }}
                        />
                    )}
                </>
            )}
        </DetailContainer>
    )
}

export default BudgetDetailTable
