import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ManagerPageStyle'
import { WapperStyle } from '@Style/Pages/CommonStyle'
import {
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
    VarySelectBox,
    VaryImageUpload,
    VaryButton,
    ConfirmModal,
    ElementLoading,
} from '@Element/index'
import React, { useEffect, useState } from 'react'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { PopupManageDetailState } from '@Recoil/ManagerPagesState'
import _ from 'lodash'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'
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

const {
    DetailContainer,
    PopupManage: {
        Detail: {
            ShortcutsWapper,
            ShortcutsCol,
            ShortcutsItem,
            ShortcutsItemFull,
        },
    },
} = DetailPageStyle

const {
    FlexNoWarapGap,
    PickerDateWapper,
    PickerTimeWapper,
    FlexNowrapGapOneHalf,
} = WapperStyle

const initializeState = {
    modal: {
        confirm: false,
        deleteConfirm: false,
    },
}

const PopupManageDetailTable = ({
    PageMode,
    HandleDelete,
    DetailPk,
    HandleGetInfo,
    HandleInfoSave,
    HandleInfoUpdate,
}: {
    PageMode: string | `new` | `detail`
    DetailPk: string
    HandleGetInfo: ({ popupPk }: { popupPk: string }) => void
    HandleDelete: ({ popupPk }: { popupPk: string }) => void
    HandleInfoSave: () => void
    HandleInfoUpdate: () => void
}) => {
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
            deleteConfirm: boolean
        }
    }>(initializeState)

    const { handleDeleteTabbyMatchRouter } = useTab()

    const resetPopupManageDetailState = useResetRecoilState(
        PopupManageDetailState
    )
    const [popupManageDetailState, setPopupManageDetailState] = useRecoilState(
        PopupManageDetailState
    )

    const generateDatepicker = (): Date => {
        const { year, monthPad, dayPad, hourPad } = gmtTimeToTimeObject(
            new Date()
        )

        return changeDatePickerDate(`${year}${monthPad}${dayPad}${hourPad}00`)
    }

    useEffect(() => {
        const funcSetInfoData = () => {
            const { year, monthPad, dayPad, hourPad } = gmtTimeToTimeObject(
                new Date()
            )
            if (popupManageDetailState.info.POPUP_BGNDT === ``) {
                setPopupManageDetailState(prevState => ({
                    ...prevState,
                    info: {
                        ...prevState.info,
                        POPUP_BGNDT: `${year}-${monthPad}-${dayPad} ${hourPad}:00`,
                        POPUP_ENDDT: `${year}-${monthPad}-${dayPad} ${hourPad}:00`,
                    },
                }))
            }
        }

        funcSetInfoData()
    }, [popupManageDetailState.info, setPopupManageDetailState])

    useEffect(() => {
        const funcGlanSet = () => {
            if (
                popupManageDetailState.info.GLAN_TY === `A` &&
                !_.find(popupManageDetailState.linkList, {
                    IEM_CODE: popupManageDetailState.info.GLAN_VALUE,
                })
            ) {
                setPopupManageDetailState(prevState => ({
                    ...prevState,
                    info: {
                        ...prevState.info,
                        GLAN_VALUE: ``,
                    },
                }))

                return
            }

            if (
                popupManageDetailState.info.GLAN_TY === `W` &&
                _.find(popupManageDetailState.linkList, {
                    IEM_CODE: popupManageDetailState.info.GLAN_VALUE,
                })
            ) {
                setPopupManageDetailState(prevState => ({
                    ...prevState,
                    info: {
                        ...prevState.info,
                        GLAN_VALUE: ``,
                    },
                }))

                return
            }
        }

        funcGlanSet()
    }, [
        popupManageDetailState.info.GLAN_TY,
        popupManageDetailState.info.GLAN_VALUE,
        popupManageDetailState.linkList,
        setPopupManageDetailState,
    ])

    useEffect(() => {
        const funcGetInfo = () => {
            HandleGetInfo({ popupPk: DetailPk })
        }

        if (PageMode === `detail` && DetailPk !== ``) {
            funcGetInfo()
        }

        // FIXME : 종속성에서 HandleGetInfo 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PageMode, DetailPk])

    return (
        <DetailContainer>
            {popupManageDetailState.status === 'loading' ? (
                <div className="h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <TableContainer>
                        <TableWapper>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`제목`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryInput
                                        Width={'w60'}
                                        InputType={'text'}
                                        id={'id'}
                                        Placeholder={`제목을 입력해 주세요`}
                                        Value={
                                            popupManageDetailState.info.POPUP_SJ
                                        }
                                        HandleOnChange={e =>
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        POPUP_SJ:
                                                            e.target.value,
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`시작 일자`} />
                                </LabelCell>
                                <InputCell>
                                    <FlexNowrapGapOneHalf>
                                        <PickerDateWapper>
                                            <VaryDatepickerInput
                                                Width={`w32`}
                                                OnBlurPass={true}
                                                InputeType={`search`}
                                                Value={
                                                    popupManageDetailState.info
                                                        .POPUP_BGNDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_BGNDT.replaceAll(
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
                                                        hourPad,
                                                        minutePad,
                                                    } = gmtTimeToTimeObject(e)
                                                    setPopupManageDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                POPUP_BGNDT: `${year}-${monthPad}-${dayPad} ${hourPad}:${minutePad}`,
                                                            },
                                                        })
                                                    )
                                                }}
                                                MinDate={new Date()}
                                            />
                                        </PickerDateWapper>
                                        <PickerTimeWapper>
                                            <VaryDatepickerInput
                                                Width={`w20`}
                                                ShowType={`time`}
                                                InputeType={`default`}
                                                DateFormat={'HH:mm'}
                                                Value={
                                                    popupManageDetailState.info
                                                        .POPUP_BGNDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_BGNDT.replaceAll(
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
                                                        hourPad,
                                                        minutePad,
                                                    } = gmtTimeToTimeObject(e)
                                                    setPopupManageDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                POPUP_BGNDT: `${year}-${monthPad}-${dayPad} ${hourPad}:${minutePad}`,
                                                            },
                                                        })
                                                    )
                                                }}
                                                MinDate={new Date()}
                                            />
                                        </PickerTimeWapper>
                                    </FlexNowrapGapOneHalf>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`종료 일자`} />
                                </LabelCell>
                                <InputCell>
                                    <FlexNowrapGapOneHalf>
                                        <PickerDateWapper>
                                            <VaryDatepickerInput
                                                Width={`w32`}
                                                InputeType={`search`}
                                                OnBlurPass={true}
                                                Value={
                                                    popupManageDetailState.info
                                                        .POPUP_ENDDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_ENDDT.replaceAll(
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
                                                        hourPad,
                                                        minutePad,
                                                    } = gmtTimeToTimeObject(e)
                                                    setPopupManageDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                POPUP_ENDDT: `${year}-${monthPad}-${dayPad} ${hourPad}:${minutePad}`,
                                                            },
                                                        })
                                                    )
                                                }}
                                                MinDate={
                                                    popupManageDetailState.info
                                                        .POPUP_BGNDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_BGNDT.replaceAll(
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
                                            />
                                        </PickerDateWapper>
                                        <PickerTimeWapper>
                                            <VaryDatepickerInput
                                                Width={`w20`}
                                                ShowType={`time`}
                                                InputeType={`default`}
                                                DateFormat={'HH:mm'}
                                                Value={
                                                    popupManageDetailState.info
                                                        .POPUP_ENDDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_ENDDT.replaceAll(
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
                                                        hourPad,
                                                        minutePad,
                                                    } = gmtTimeToTimeObject(e)
                                                    setPopupManageDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            info: {
                                                                ...prevState.info,
                                                                POPUP_ENDDT: `${year}-${monthPad}-${dayPad} ${hourPad}:${minutePad}`,
                                                            },
                                                        })
                                                    )
                                                }}
                                                MinDate={
                                                    popupManageDetailState.info
                                                        .POPUP_BGNDT
                                                        ? changeDatePickerDate(
                                                              popupManageDetailState.info.POPUP_BGNDT.replaceAll(
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
                                            />
                                        </PickerTimeWapper>
                                    </FlexNowrapGapOneHalf>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`노출 페이지`} />
                                </LabelCell>
                                <InputCell>
                                    <VarySelectBox
                                        Width={`w60`}
                                        Placeholder={`노출 페이지를 선택해주세요`}
                                        Value={
                                            popupManageDetailState.info
                                                .DISPLAY_CODE
                                        }
                                        Elements={_.map(
                                            popupManageDetailState.viewPageList,
                                            element => {
                                                return {
                                                    text: element.IEM_NM,
                                                    value: element.IEM_CODE,
                                                }
                                            }
                                        )}
                                        HandleOnChange={e => {
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        DISPLAY_CODE: e.value,
                                                    },
                                                })
                                            )
                                        }}
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`바로가기`} />
                                </LabelCell>
                                <InputCell>
                                    <ShortcutsWapper>
                                        <ShortcutsCol>
                                            <ShortcutsItem>
                                                <VaryLabelRadioButton
                                                    LabelWidth={`wMin`}
                                                    LabelName={`앱 내 바로가기`}
                                                    Checked={
                                                        popupManageDetailState
                                                            .info.GLAN_TY ===
                                                        'A'
                                                    }
                                                    HandleOnChange={() => {
                                                        setPopupManageDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    GLAN_TY: `A`,
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                            </ShortcutsItem>
                                            <ShortcutsItem>
                                                <VarySelectBox
                                                    Width={`w60`}
                                                    PlaceholderDisable={
                                                        popupManageDetailState
                                                            .info.GLAN_TY ===
                                                        'W'
                                                    }
                                                    Placeholder={`앱 내 바로가기를 선택해 주세요.`}
                                                    Value={(() => {
                                                        if (
                                                            popupManageDetailState
                                                                .info
                                                                .GLAN_TY === 'W'
                                                        ) {
                                                            return ``
                                                        } else {
                                                            return popupManageDetailState
                                                                .info.GLAN_VALUE
                                                        }
                                                    })()}
                                                    Elements={_.map(
                                                        popupManageDetailState.linkList,
                                                        element => {
                                                            return {
                                                                text: element.IEM_NM,
                                                                value: element.IEM_CODE,
                                                            }
                                                        }
                                                    )}
                                                    HandleOnChange={e => {
                                                        setPopupManageDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    GLAN_VALUE:
                                                                        e.value,
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                            </ShortcutsItem>
                                        </ShortcutsCol>
                                        <ShortcutsCol>
                                            <ShortcutsItem>
                                                <VaryLabelRadioButton
                                                    LabelWidth={`wMin`}
                                                    LabelName={`웹 URL 링크`}
                                                    Checked={
                                                        popupManageDetailState
                                                            .info.GLAN_TY ===
                                                        'W'
                                                    }
                                                    HandleOnChange={() => {
                                                        setPopupManageDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    GLAN_TY: `W`,
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                            </ShortcutsItem>
                                            <ShortcutsItemFull>
                                                <VaryInput
                                                    InputType={'text'}
                                                    id={'id'}
                                                    Placeholder={``}
                                                    Value={
                                                        popupManageDetailState
                                                            .info.GLAN_TY ===
                                                        `W`
                                                            ? popupManageDetailState
                                                                  .info
                                                                  .GLAN_VALUE
                                                            : ``
                                                    }
                                                    HandleOnChange={e =>
                                                        setPopupManageDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                info: {
                                                                    ...prevState.info,
                                                                    GLAN_VALUE:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </ShortcutsItemFull>
                                        </ShortcutsCol>
                                    </ShortcutsWapper>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`큰이미지`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryImageUpload
                                        Image={{
                                            AtchmnflPath:
                                                popupManageDetailState.info
                                                    .BIG_IMG_ATCHMNFL_INFO
                                                    .ATCHMNFL_DOWN_PATH,
                                            OrginlFileNm:
                                                popupManageDetailState.info
                                                    .BIG_IMG_ATCHMNFL_INFO
                                                    .ATCHMNFL_NM,

                                            Category: 'ETC',
                                        }}
                                        ShowInform={false}
                                        HandleDelete={() => {
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        BIG_IMG_ATCHMNFL_INFO: {
                                                            ATCHMNFL_NO: ``,
                                                            ATCHMNFL_DOWN_PATH: ``,
                                                            ATCHMNFL_NM: ``,
                                                            ATCHMNFL_PATH: ``,
                                                            ORIGINL_FILE_NM: ``,
                                                        },
                                                    },
                                                })
                                            )
                                        }}
                                        ReturnCallback={e => {
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        BIG_IMG_ATCHMNFL_INFO: {
                                                            ATCHMNFL_NO: `${e.ATCHMNFL_NO}`,
                                                            ATCHMNFL_DOWN_PATH: ``,
                                                            ATCHMNFL_NM: ``,
                                                            ATCHMNFL_PATH: ``,
                                                            ORIGINL_FILE_NM: ``,
                                                        },
                                                    },
                                                })
                                            )
                                        }}
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`작은이미지`} />
                                </LabelCell>
                                <InputCell>
                                    <VaryImageUpload
                                        Image={{
                                            AtchmnflPath:
                                                popupManageDetailState.info
                                                    .SMALL_IMG_ATCHMNFL_INFO
                                                    .ATCHMNFL_DOWN_PATH,
                                            OrginlFileNm:
                                                popupManageDetailState.info
                                                    .SMALL_IMG_ATCHMNFL_INFO
                                                    .ATCHMNFL_NM,

                                            Category: 'ETC',
                                        }}
                                        ShowInform={false}
                                        HandleDelete={() => {
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        SMALL_IMG_ATCHMNFL_INFO:
                                                            {
                                                                ATCHMNFL_NO: ``,
                                                                ATCHMNFL_DOWN_PATH: ``,
                                                                ATCHMNFL_NM: ``,
                                                                ATCHMNFL_PATH: ``,
                                                                ORIGINL_FILE_NM: ``,
                                                            },
                                                    },
                                                })
                                            )
                                        }}
                                        ReturnCallback={e => {
                                            setPopupManageDetailState(
                                                prevState => ({
                                                    ...prevState,
                                                    info: {
                                                        ...prevState.info,
                                                        SMALL_IMG_ATCHMNFL_INFO:
                                                            {
                                                                ATCHMNFL_NO: `${e.ATCHMNFL_NO}`,
                                                                ATCHMNFL_DOWN_PATH: ``,
                                                                ATCHMNFL_NM: ``,
                                                                ATCHMNFL_PATH: ``,
                                                                ORIGINL_FILE_NM: ``,
                                                            },
                                                    },
                                                })
                                            )
                                        }}
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`닫기 설정`} />
                                </LabelCell>
                                <InputCell>
                                    <FlexNoWarapGap>
                                        <VaryLabelRadioButton
                                            LabelWidth={`wMin`}
                                            LabelName={`오늘 하루 보지 않기`}
                                            Checked={
                                                popupManageDetailState.info
                                                    .CLOSE_TYPE === `T`
                                            }
                                            HandleOnChange={() => {
                                                setPopupManageDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            CLOSE_TYPE: `T`,
                                                        },
                                                    })
                                                )
                                            }}
                                        />
                                        <VaryLabelRadioButton
                                            LabelWidth={`wMin`}
                                            LabelName={`다시 보지 않기`}
                                            Checked={
                                                popupManageDetailState.info
                                                    .CLOSE_TYPE === `N`
                                            }
                                            HandleOnChange={() => {
                                                setPopupManageDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            CLOSE_TYPE: `N`,
                                                        },
                                                    })
                                                )
                                            }}
                                        />
                                    </FlexNoWarapGap>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`사용 여부`} />
                                </LabelCell>
                                <InputCell>
                                    <FlexNoWarapGap>
                                        <VaryLabelRadioButton
                                            LabelWidth={`wMin`}
                                            LabelName={`사용`}
                                            Checked={
                                                popupManageDetailState.info
                                                    .USE_AT === `Y`
                                            }
                                            HandleOnChange={() => {
                                                setPopupManageDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            USE_AT: `Y`,
                                                        },
                                                    })
                                                )
                                            }}
                                        />
                                        <VaryLabelRadioButton
                                            LabelWidth={`wMin`}
                                            LabelName={`미사용`}
                                            Checked={
                                                popupManageDetailState.info
                                                    .USE_AT === `N`
                                            }
                                            HandleOnChange={() => {
                                                setPopupManageDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        info: {
                                                            ...prevState.info,
                                                            USE_AT: `N`,
                                                        },
                                                    })
                                                )
                                            }}
                                        />
                                    </FlexNoWarapGap>
                                </InputCell>
                            </Row>
                        </TableWapper>
                    </TableContainer>
                    <ButtonBox>
                        {PageMode === `detail` && (
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`삭제`}
                                    HandleClick={() => {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                deleteConfirm: true,
                                            },
                                        }))
                                    }}
                                />
                            </ButtonItem>
                        )}
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={`${
                                    PageMode === 'detail' ? '수정' : '등록'
                                }`}
                                HandleClick={() => {
                                    const {
                                        POPUP_SJ,
                                        GLAN_TY,
                                        DISPLAY_CODE,
                                        GLAN_VALUE,
                                        SMALL_IMG_ATCHMNFL_INFO: {
                                            ATCHMNFL_NO: SMALL_IMG_ATCHMNFL_NO,
                                        },
                                        BIG_IMG_ATCHMNFL_INFO: {
                                            ATCHMNFL_NO: BIG_IMG_ATCHMNFL_NO,
                                        },
                                    } = popupManageDetailState.info
                                    if (POPUP_SJ === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .titleEmpty,
                                        })
                                        return
                                    }

                                    if (GLAN_TY === `A` && GLAN_VALUE === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .aTypeGlanValueEmpty,
                                        })
                                        return
                                    }

                                    if (GLAN_TY === `W` && GLAN_VALUE === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .wTypeGlanValueEmpty,
                                        })
                                        return
                                    }

                                    if (DISPLAY_CODE === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .displayCodeEmpty,
                                        })
                                        return
                                    }

                                    if (SMALL_IMG_ATCHMNFL_NO === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .smallImageEmpty,
                                        })
                                        return
                                    }

                                    if (BIG_IMG_ATCHMNFL_NO === ``) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.popManage
                                                    .bigImageEmpty,
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
                                }}
                            />
                        </ButtonItem>
                        <ButtonItem>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={`취소`}
                                HandleClick={() => {
                                    resetPopupManageDetailState()
                                    handleDeleteTabbyMatchRouter(
                                        '/manage/manager/popup-manage-list/new'
                                    )

                                    handleDeleteTabbyMatchRouter(
                                        '/manage/manager/popup-manage-list/:POPUP_PK/detail'
                                    )

                                    navigate({
                                        pathname:
                                            process.env.PUBLIC_URL +
                                            `/manage/manager/popup-manage-list`,
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
                                if (PageMode === `detail`) {
                                    HandleInfoUpdate()
                                } else {
                                    HandleInfoSave()
                                }
                            }}
                        />
                    )}
                    {pageState.modal.deleteConfirm && (
                        <ConfirmModal
                            Title={Messages.Default.deleteConfirm}
                            CancleButtonName={`취소`}
                            ApplyButtonName={`확인`}
                            CancleButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        deleteConfirm: false,
                                    },
                                }))
                            }}
                            ApplyButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        deleteConfirm: false,
                                    },
                                }))

                                HandleDelete({
                                    popupPk: popupManageDetailState.info.PK,
                                })
                            }}
                        />
                    )}
                </>
            )}
        </DetailContainer>
    )
}

export default PopupManageDetailTable
