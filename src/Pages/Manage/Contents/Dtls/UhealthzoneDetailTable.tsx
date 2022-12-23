import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    ConfirmModal,
    KaKaoMapModal,
    KaKaoPostCodeModal,
    PstinstSelectBox,
    VaryButton,
    VaryDatepickerInput,
    VaryImageUpload,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryLabelInput,
    VaryLabelRadioButton,
    VarySelectBox,
} from '@Elements'
import { gmtTimeToTimeObject, toDateWithOutTimeZone } from '@Helper'
import {
    CommonListTableStyle as CT,
    DetailTableStyle,
} from '@Style/Elements/TableStyles'
import { DetailPageStyle as DPS } from '@Style/Pages/ContentsPageStyle'
import { WapperStyle as WS } from '@Style/Pages/CommonStyle'
import { UhealthzoneDetailState } from '@Recoil/ContentsPagesState'
import { useRecoilState } from 'recoil'
import {
    getDataCheckInstlPlace,
    postDataUhealthZone,
} from '@Service/ContentsService'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import _ from 'lodash'
import Codes from '@Codes'
import { UhealthzoneInfoOperTimeInfoInterface } from '@Type/ContentsTypes'

const { TableContainer, TableWapper, Row, LabelCell, InputCell, InputItem } =
    DetailTableStyle

// 시간 설정
interface timeInterface {
    step1: {
        start: Date
        end: Date
    }
    step2: {
        start: Date
        end: Date
    }
}

const getOperTime = (
    times: UhealthzoneInfoOperTimeInfoInterface[]
): timeInterface => {
    let returnData: timeInterface = {
        step1: {
            start: new Date(),
            end: new Date(),
        },
        step2: {
            start: new Date(),
            end: new Date(),
        },
    }
    const ckStep1FindIndex = times.findIndex(e => e.TIME_KND_CODE === 'BSTM')
    const ckStep2FindIndex = times.findIndex(e => e.TIME_KND_CODE === 'BMTM')
    if (ckStep1FindIndex > -1) {
        const step1Info = times[ckStep1FindIndex]

        const beginIime = step1Info.BEGIN_TIME
        const endTime = step1Info.END_TIME

        returnData = {
            ...returnData,
            step1: {
                start: toDateWithOutTimeZone(beginIime),
                end: toDateWithOutTimeZone(endTime),
            },
        }
    }

    if (ckStep2FindIndex > -1) {
        const step2Info = times[ckStep2FindIndex]

        const beginIime = step2Info.BEGIN_TIME
        const endTime = step2Info.END_TIME

        returnData = {
            ...returnData,
            step2: {
                start: toDateWithOutTimeZone(beginIime),
                end: toDateWithOutTimeZone(endTime),
            },
        }
    }

    return returnData
}

const initializeState = {
    selectMeasureCode: {
        code: '',
        key: '',
    },
    modal: {
        postcode: false,
        kakaomap: false,
        saveConfirm: false,
    },
}

const UhealthzoneDetailTable = ({
    pageMode,
}: {
    pageMode: `new` | `modify`
}) => {
    const params = useParams<{ UhealthZoneNo: string | undefined }>()
    const [detailState, setDetailState] = useRecoilState(UhealthzoneDetailState)
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        selectMeasureCode: {
            code: string
            key: string
        }
        modal: {
            postcode: boolean
            kakaomap: boolean
            saveConfirm: boolean
        }
    }>(initializeState)

    const handleInstlPlaceCheck = useCallback(async () => {
        const { status, payload } = await getDataCheckInstlPlace({
            instlPlace: detailState.detail.INSTL_PLACE,
        })

        if (status) {
            const { INSTL_PLACE_USE_AT } = payload

            if (INSTL_PLACE_USE_AT === 'N') {
                console.debug(INSTL_PLACE_USE_AT)
                setDetailState(prevState => ({
                    ...prevState,
                    sub: {
                        ...prevState.sub,
                        instlPlaceCheck: true,
                    },
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.duplicate.uhealthzoneNamePoss,
                })
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    sub: {
                        ...prevState.sub,
                        instlPlaceCheck: false,
                    },
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.duplicate.uhealthzoneNameDup,
                })
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [detailState.detail.INSTL_PLACE, handlMainAlert, setDetailState])

    const handleSave = async () => {
        const payload = detailState.detail

        const { status } = await postDataUhealthZone(payload)

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

    const handleClickSaveButton = () => {
        handleSave().then()
    }

    useEffect(() => {
        const funcSetDetail = () => {
            if (params.UhealthZoneNo) {
                // handleGetInfo(Number(params.UhealthZoneNo)).then()
            }
        }

        if (pageMode === `modify` && params.UhealthZoneNo) {
            funcSetDetail()
        }
        // FIXME : 종속성에서 handleGetInfo 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageMode, params.UhealthZoneNo])

    useEffect(() => {
        console.debug(detailState)
    }, [detailState])

    return (
        <DPS.DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`지점명`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <InputItem>
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    INSTL_PLACE: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'지점명'}
                                        Value={detailState.detail.INSTL_PLACE}
                                    />
                                </InputItem>
                                <InputItem>
                                    <VaryButton
                                        Name={`지점 중복확인`}
                                        HandleClick={() =>
                                            handleInstlPlaceCheck()
                                        }
                                    />
                                </InputItem>
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 위치`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <PstinstSelectBox
                                    Value={{
                                        status: 'loading',
                                        infoStep:
                                            detailState.sub.pstinst.infoStep,
                                        instNo: !_.isEmpty(
                                            detailState.sub.pstinst.step3
                                        )
                                            ? detailState.sub.pstinst.step3
                                            : !_.isEmpty(
                                                  detailState.sub.pstinst.step2
                                              )
                                            ? detailState.sub.pstinst.step2
                                            : !_.isEmpty(
                                                  detailState.sub.pstinst.step1
                                              )
                                            ? detailState.sub.pstinst.step1
                                            : null,
                                        step1: detailState.sub.pstinst.step1,
                                        step2: detailState.sub.pstinst.step2,
                                        step3: detailState.sub.pstinst.step3,
                                    }}
                                    ReturnCallback={e => {
                                        const { step1, step2, step3 } = e
                                        if (
                                            !_.isEmpty(step1.value) &&
                                            _.isEmpty(step2.value) &&
                                            _.isEmpty(step3.value)
                                        ) {
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                sub: {
                                                    ...prevState.sub,
                                                    pstinst: {
                                                        ...prevState.sub
                                                            .pstinst,
                                                        infoStep: 'step1',
                                                        step1: step1.value,
                                                        step2: '',
                                                        step3: '',
                                                    },
                                                },
                                                detail: {
                                                    ...prevState.detail,
                                                    INST_NO: step1.value,
                                                },
                                            }))
                                        } else if (
                                            !_.isEmpty(step1.value) &&
                                            !_.isEmpty(step2.value) &&
                                            _.isEmpty(step3.value)
                                        ) {
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                sub: {
                                                    ...prevState.sub,
                                                    pstinst: {
                                                        ...prevState.sub
                                                            .pstinst,
                                                        infoStep: 'step2',
                                                        step2: step2.value,
                                                        step3: '',
                                                    },
                                                },
                                                detail: {
                                                    ...prevState.detail,
                                                    INST_NO: step1.value,
                                                },
                                            }))
                                        } else if (
                                            !_.isEmpty(step1.value) &&
                                            !_.isEmpty(step2.value) &&
                                            !_.isEmpty(step3.value)
                                        ) {
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                sub: {
                                                    ...prevState.sub,
                                                    pstinst: {
                                                        ...prevState.sub
                                                            .pstinst,
                                                        infoStep: 'step3',
                                                        step3: step3.value,
                                                    },
                                                },
                                                detail: {
                                                    ...prevState.detail,
                                                    INST_NO: step1.value,
                                                },
                                            }))
                                        }
                                    }}
                                />
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`전화번호`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <InputItem>
                                    <VaryInput
                                        InputType={'text'}
                                        id={'id'}
                                        Placeholder={'전화번호'}
                                        Value={detailState.detail.TELNO}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    TELNO: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                </InputItem>
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`주소 정보`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    <DPS.Address.Button>
                                        <VaryButton
                                            Name={`주소 검색`}
                                            HandleClick={() =>
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    modal: {
                                                        ...prevState.modal,
                                                        postcode: true,
                                                    },
                                                }))
                                            }
                                        />
                                    </DPS.Address.Button>
                                    <DPS.Address.Input>
                                        <VaryInput
                                            InputType={'text'}
                                            HandleOnChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => console.debug(e)}
                                            id={'id'}
                                            Placeholder={'주소를 입력해 주세요'}
                                            Value={
                                                detailState.detail.INSTL_ADRES
                                            }
                                        />
                                    </DPS.Address.Input>
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarapGap>
                                    <WS.FullNoWarap>
                                        <DPS.Geo>
                                            <VaryLabelInput
                                                LabelName="위도"
                                                HandleOnChange={e =>
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                LA: e.target
                                                                    .value,
                                                            },
                                                        })
                                                    )
                                                }
                                                InputValue={
                                                    detailState.detail.LA
                                                }
                                            />
                                        </DPS.Geo>
                                        <DPS.Geo>
                                            <VaryLabelInput
                                                LabelName="경도"
                                                HandleOnChange={e =>
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                LO: e.target
                                                                    .value,
                                                            },
                                                        })
                                                    )
                                                }
                                                InputValue={
                                                    detailState.detail.LO
                                                }
                                            />
                                        </DPS.Geo>
                                    </WS.FullNoWarap>
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarapGap>
                                    <WS.FullNoWarap>
                                        <DPS.MapURL>
                                            <VaryInput
                                                InputType={'text'}
                                                id={'id'}
                                                Placeholder={
                                                    'URL을 입력해 주세요'
                                                }
                                                Value={
                                                    detailState.detail.MAP_ADRES
                                                }
                                                HandleOnChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    setDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                MAP_ADRES:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    )
                                                }
                                            />
                                        </DPS.MapURL>
                                        <DPS.MapURL>
                                            <WS.FlexNoWarapGap>
                                                <VaryButton
                                                    Name={`지도보기`}
                                                    HandleClick={() => {
                                                        if (
                                                            detailState.detail
                                                                .MAP_ADRES
                                                        ) {
                                                            window.open(
                                                                `${detailState.detail.MAP_ADRES}`
                                                            )
                                                        } else {
                                                            setPageState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    modal: {
                                                                        ...prevState.modal,
                                                                        kakaomap:
                                                                            true,
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }}
                                                />
                                                {detailState.detail.LO &&
                                                    detailState.detail.LA && (
                                                        <VaryButton
                                                            Name={`지도 URL 생성`}
                                                            HandleClick={() => {
                                                                setDetailState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        detail: {
                                                                            ...prevState.detail,
                                                                            MAP_ADRES: `https://map.kakao.com/link/map/${detailState.detail.INSTL_PLACE},${detailState.detail.LA},${detailState.detail.LO}`,
                                                                        },
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    )}
                                            </WS.FlexNoWarapGap>
                                        </DPS.MapURL>
                                    </WS.FullNoWarap>
                                </WS.FlexNoWarapGap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`운영시간`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    {Codes.week.map((el, index) => {
                                        const ckFindIndex =
                                            detailState.detail.OPER_WIK_INFO.findIndex(
                                                element =>
                                                    element.TIME_KND_CODE ===
                                                    'BSTM'
                                            )

                                        return (
                                            <VaryLabelCheckBox
                                                key={`uhealth-zone-detail-table-week1-item-${index}`}
                                                Checked={
                                                    ckFindIndex > -1 &&
                                                    Number(
                                                        detailState.detail
                                                            .OPER_WIK_INFO[
                                                            ckFindIndex
                                                        ].WIK_CODE
                                                    ) >= el.code
                                                }
                                                LabelName={`${el.name2}`}
                                                HandleOnChange={() => {
                                                    if (ckFindIndex > -1) {
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    OPER_WIK_INFO:
                                                                        prevState.detail.OPER_WIK_INFO.map(
                                                                            e => {
                                                                                if (
                                                                                    e.TIME_KND_CODE ===
                                                                                    'BSTM'
                                                                                ) {
                                                                                    return {
                                                                                        ...e,
                                                                                        WIK_CODE:
                                                                                            String(
                                                                                                Number(
                                                                                                    e.WIK_CODE
                                                                                                ) +
                                                                                                    el.code
                                                                                            ),
                                                                                    }
                                                                                } else {
                                                                                    return e
                                                                                }
                                                                            }
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    } else {
                                                        setDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    OPER_WIK_INFO:
                                                                        [
                                                                            ...prevState
                                                                                .detail
                                                                                .OPER_WIK_INFO,
                                                                            {
                                                                                TIME_KND_CODE:
                                                                                    'BSTM',
                                                                                WIK_SE_CODE:
                                                                                    'RD',
                                                                                WIK_CODE:
                                                                                    String(
                                                                                        el.code
                                                                                    ),
                                                                            },
                                                                        ],
                                                                },
                                                            })
                                                        )
                                                    }
                                                }}
                                            />
                                        )
                                    })}
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarap>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
                                            DateFormat={`aa h:mm`}
                                            Value={(() => {
                                                const time = getOperTime(
                                                    detailState.detail
                                                        .OPER_TIME_INFO
                                                )

                                                return time.step1.start
                                            })()}
                                            CallBackReturn={e => {
                                                const { hourPad, minutePad } =
                                                    gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        OPER_TIME_INFO:
                                                            prevState.detail.OPER_TIME_INFO.map(
                                                                e => {
                                                                    if (
                                                                        e.TIME_KND_CODE ===
                                                                        'BSTM'
                                                                    ) {
                                                                        return {
                                                                            ...e,
                                                                            BEGIN_TIME: `${hourPad}${minutePad}`,
                                                                        }
                                                                    } else {
                                                                        return e
                                                                    }
                                                                }
                                                            ),
                                                    },
                                                }))
                                            }}
                                        />
                                    </DPS.DatePicker>
                                    <DPS.DatePickerLine>~</DPS.DatePickerLine>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
                                            DateFormat={`aa h:mm`}
                                            Value={(() => {
                                                const time = getOperTime(
                                                    detailState.detail
                                                        .OPER_TIME_INFO
                                                )

                                                return time.step1.end
                                            })()}
                                            CallBackReturn={e => {
                                                const { hourPad, minutePad } =
                                                    gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        OPER_TIME_INFO:
                                                            prevState.detail.OPER_TIME_INFO.map(
                                                                e => {
                                                                    if (
                                                                        e.TIME_KND_CODE ===
                                                                        'BSTM'
                                                                    ) {
                                                                        return {
                                                                            ...e,
                                                                            END_TIME: `${hourPad}${minutePad}`,
                                                                        }
                                                                    } else {
                                                                        return e
                                                                    }
                                                                }
                                                            ),
                                                    },
                                                }))
                                            }}
                                        />
                                    </DPS.DatePicker>
                                </WS.FlexNoWarap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`혈액 측정 시간`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    {Codes.week.map((el, index) => {
                                        return (
                                            <VaryLabelCheckBox
                                                key={`uhealth-zone-detail-table-week2-item-${index}`}
                                                Checked={false}
                                                LabelName={`${el.name2}`}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        )
                                    })}
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarap>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
                                            DateFormat={`aa h:mm`}
                                            Value={(() => {
                                                const time = getOperTime(
                                                    detailState.detail
                                                        .OPER_TIME_INFO
                                                )

                                                return time.step2.start
                                            })()}
                                            CallBackReturn={e => {
                                                const { hourPad, minutePad } =
                                                    gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        OPER_TIME_INFO:
                                                            prevState.detail.OPER_TIME_INFO.map(
                                                                e => {
                                                                    if (
                                                                        e.TIME_KND_CODE ===
                                                                        'BMTM'
                                                                    ) {
                                                                        return {
                                                                            ...e,
                                                                            BEGIN_TIME: `${hourPad}${minutePad}`,
                                                                        }
                                                                    } else {
                                                                        return e
                                                                    }
                                                                }
                                                            ),
                                                    },
                                                }))
                                            }}
                                        />
                                    </DPS.DatePicker>
                                    <DPS.DatePickerLine>~</DPS.DatePickerLine>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
                                            DateFormat={`aa h:mm`}
                                            Value={(() => {
                                                const time = getOperTime(
                                                    detailState.detail
                                                        .OPER_TIME_INFO
                                                )

                                                return time.step2.start
                                            })()}
                                            CallBackReturn={e => {
                                                const { hourPad, minutePad } =
                                                    gmtTimeToTimeObject(e)
                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        OPER_TIME_INFO:
                                                            prevState.detail.OPER_TIME_INFO.map(
                                                                e => {
                                                                    if (
                                                                        e.TIME_KND_CODE ===
                                                                        'BMTM'
                                                                    ) {
                                                                        return {
                                                                            ...e,
                                                                            END_TIME: `${hourPad}${minutePad}`,
                                                                        }
                                                                    } else {
                                                                        return e
                                                                    }
                                                                }
                                                            ),
                                                    },
                                                }))
                                            }}
                                        />
                                    </DPS.DatePicker>
                                </WS.FlexNoWarap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`설치 기기`} />
                        </LabelCell>
                        <InputCell>
                            <TableContainer>
                                <TableWapper>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`모델`} />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.modal.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelRadioButton
                                                                key={`uhealth-zone-detail-table-deviceGubun-modal-item-${index}`}
                                                                RedioName={`uhealth-zone-detail-table-deviceGubun-modal-item-${index}`}
                                                                Checked={
                                                                    detailState
                                                                        .detail
                                                                        .INSTL_TY_CD ===
                                                                    el.code
                                                                }
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={() => {
                                                                    setDetailState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            detail: {
                                                                                ...prevState.detail,
                                                                                INSTL_TY_CD:
                                                                                    el.code,
                                                                            },
                                                                        })
                                                                    )
                                                                }}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`로그인 방식`}
                                            />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.loginType.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelRadioButton
                                                                key={`uhealth-zone-detail-table-deviceGubun-login-type-item-${index}`}
                                                                RedioName={`uhealth-zone-detail-table-deviceGubun-login-type-item-${index}`}
                                                                Checked={
                                                                    detailState
                                                                        .detail
                                                                        .LOGIN_AT ===
                                                                    el.code
                                                                }
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={() =>
                                                                    setDetailState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            detail: {
                                                                                ...prevState.detail,
                                                                                LOGIN_AT:
                                                                                    el.code,
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`외부인 사용`}
                                            />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.outSiderUse.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelRadioButton
                                                                key={`uhealth-zone-detail-table-deviceGubun-out-sider-use-item-${index}`}
                                                                RedioName={`uhealth-zone-detail-table-deviceGubun-out-sider-use-item-${index}`}
                                                                Checked={
                                                                    detailState
                                                                        .detail
                                                                        .EXTRL_PERSON_USE_AT ===
                                                                    el.code
                                                                }
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={() =>
                                                                    setDetailState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            detail: {
                                                                                ...prevState.detail,
                                                                                EXTRL_PERSON_USE_AT:
                                                                                    el.code,
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`오픈`} />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.deviceOpen.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelRadioButton
                                                                key={`uhealth-zone-detail-table-deviceGubun-device-open-item-${index}`}
                                                                RedioName={`uhealth-zone-detail-table-deviceGubun-device-open-item-${index}`}
                                                                Checked={
                                                                    detailState
                                                                        .detail
                                                                        .OPEN_AT ===
                                                                    el.code
                                                                }
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={() =>
                                                                    setDetailState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            detail: {
                                                                                ...prevState.detail,
                                                                                OPEN_AT:
                                                                                    el.code,
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`프린트`} />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.printUse.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelRadioButton
                                                                key={`uhealth-zone-detail-table-deviceGubun-print-use-item-${index}`}
                                                                RedioName={`uhealth-zone-detail-table-deviceGubun-print-use-item-${index}`}
                                                                Checked={
                                                                    detailState
                                                                        .detail
                                                                        .PRINT_AT ===
                                                                    el.code
                                                                }
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={() =>
                                                                    setDetailState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            detail: {
                                                                                ...prevState.detail,
                                                                                PRINT_AT:
                                                                                    el.code,
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`설치기기`} />
                                        </LabelCell>
                                        <InputCell>
                                            <WS.FlexNoWarap>
                                                {Codes.deviceGubun.mhrls.list.map(
                                                    (el, index) => {
                                                        return (
                                                            <VaryLabelCheckBox
                                                                key={`uhealth-zone-detail-table-deviceGubun-mhrls-item-${index}`}
                                                                Checked={(() => {
                                                                    const ckFindIndex =
                                                                        detailState.detail.MHRLS_INFO.findIndex(
                                                                            e =>
                                                                                e.MHRLS_CODE ===
                                                                                el.code
                                                                        )
                                                                    return (
                                                                        ckFindIndex >
                                                                        -1
                                                                    )
                                                                })()}
                                                                LabelName={`${el.name}`}
                                                                HandleOnChange={e => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setDetailState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                detail: {
                                                                                    ...prevState.detail,
                                                                                    MHRLS_INFO:
                                                                                        [
                                                                                            ...prevState
                                                                                                .detail
                                                                                                .MHRLS_INFO,
                                                                                            {
                                                                                                MHRLS_CODE:
                                                                                                    el.code,
                                                                                            },
                                                                                        ],
                                                                                },
                                                                            })
                                                                        )
                                                                    } else {
                                                                        setDetailState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                detail: {
                                                                                    ...prevState.detail,
                                                                                    MHRLS_INFO:
                                                                                        prevState.detail.MHRLS_INFO.filter(
                                                                                            e =>
                                                                                                e.MHRLS_CODE !==
                                                                                                el.code
                                                                                        ),
                                                                                },
                                                                            })
                                                                        )
                                                                    }
                                                                }}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </WS.FlexNoWarap>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <InputCell colSpan={2}>
                                            <WS.FullWapperGap>
                                                <WS.FlexNoWarapGap>
                                                    <DPS.DeviceKeySelect>
                                                        <VarySelectBox
                                                            Elements={Codes.deviceGubun.measureCode.list.map(
                                                                el => {
                                                                    return {
                                                                        value: el.code,
                                                                        text: `${el.name}`,
                                                                    }
                                                                }
                                                            )}
                                                            Placeholder={`측정 코드를 선택해 주세요`}
                                                            HandleOnChange={e =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        selectMeasureCode:
                                                                            {
                                                                                ...prevState.selectMeasureCode,
                                                                                code: e.value,
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            Value={
                                                                pageState
                                                                    .selectMeasureCode
                                                                    .code
                                                            }
                                                        />
                                                    </DPS.DeviceKeySelect>
                                                    <DPS.DeviceKeySelect>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            id={'id'}
                                                            Placeholder={
                                                                '시리얼 번호를 입력해 주세요.'
                                                            }
                                                            Value={
                                                                pageState
                                                                    .selectMeasureCode
                                                                    .key
                                                            }
                                                            HandleOnChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) =>
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        selectMeasureCode:
                                                                            {
                                                                                ...prevState.selectMeasureCode,
                                                                                key: e
                                                                                    .target
                                                                                    .value,
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                        />
                                                    </DPS.DeviceKeySelect>
                                                    <DPS.DeviceKeySelectButton>
                                                        <VaryButton
                                                            Name={`추가`}
                                                            HandleClick={() => {
                                                                if (
                                                                    _.isEmpty(
                                                                        pageState
                                                                            .selectMeasureCode
                                                                            .code
                                                                    )
                                                                ) {
                                                                    handlMainAlert(
                                                                        {
                                                                            state: true,
                                                                            message:
                                                                                Messages
                                                                                    .Default
                                                                                    .contents
                                                                                    .selectMeasureCodeEmpty,
                                                                        }
                                                                    )
                                                                    return
                                                                }

                                                                if (
                                                                    _.isEmpty(
                                                                        pageState
                                                                            .selectMeasureCode
                                                                            .key
                                                                    )
                                                                ) {
                                                                    handlMainAlert(
                                                                        {
                                                                            state: true,
                                                                            message:
                                                                                Messages
                                                                                    .Default
                                                                                    .contents
                                                                                    .selectMeasureCodeKeyEmpty,
                                                                        }
                                                                    )
                                                                    return
                                                                }

                                                                setDetailState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        detail: {
                                                                            ...prevState.detail,
                                                                            VEIN_RCIVR:
                                                                                [
                                                                                    ...prevState
                                                                                        .detail
                                                                                        .VEIN_RCIVR,
                                                                                    {
                                                                                        MHRLS_CODE:
                                                                                            pageState
                                                                                                .selectMeasureCode
                                                                                                .code,
                                                                                        SERIAL_NO:
                                                                                            pageState
                                                                                                .selectMeasureCode
                                                                                                .key,
                                                                                    },
                                                                                ],
                                                                        },
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </DPS.DeviceKeySelectButton>
                                                </WS.FlexNoWarapGap>
                                            </WS.FullWapperGap>
                                            <WS.FullWapperGap>
                                                <CT.TableWapper>
                                                    <CT.TableHeader>
                                                        <CT.HeaderRow>
                                                            <CT.HeaderCell>
                                                                측정코드
                                                            </CT.HeaderCell>
                                                            <CT.HeaderCell>
                                                                지정맥 시리얼
                                                                번호
                                                            </CT.HeaderCell>
                                                            <CT.HeaderCell>
                                                                삭제
                                                            </CT.HeaderCell>
                                                        </CT.HeaderRow>
                                                    </CT.TableHeader>
                                                    <CT.TableBodyS>
                                                        {detailState.detail.VEIN_RCIVR.map(
                                                            (el, index) => {
                                                                let codeName =
                                                                    ''
                                                                const ckFindIndex =
                                                                    Codes.deviceGubun.measureCode.list.findIndex(
                                                                        e =>
                                                                            e.code ===
                                                                            el.MHRLS_CODE
                                                                    )

                                                                if (
                                                                    ckFindIndex >
                                                                    -1
                                                                ) {
                                                                    codeName =
                                                                        Codes
                                                                            .deviceGubun
                                                                            .measureCode
                                                                            .list[
                                                                            ckFindIndex
                                                                        ].name
                                                                } else {
                                                                    codeName =
                                                                        el.MHRLS_CODE
                                                                }

                                                                return (
                                                                    <CT.TableBodyRow
                                                                        key={`uhealth-zone-detail-table-vein-rcivr-item-${index}`}
                                                                        BgState={
                                                                            false
                                                                        }>
                                                                        <CT.TableBodyCell>
                                                                            {
                                                                                codeName
                                                                            }
                                                                        </CT.TableBodyCell>
                                                                        <CT.TableBodyCell>
                                                                            {
                                                                                el.SERIAL_NO
                                                                            }
                                                                        </CT.TableBodyCell>
                                                                        <CT.TableBodyCell>
                                                                            <VaryButton
                                                                                Name={`삭제`}
                                                                                HandleClick={() =>
                                                                                    setDetailState(
                                                                                        prevState => ({
                                                                                            ...prevState,
                                                                                            detail: {
                                                                                                ...prevState.detail,
                                                                                                VEIN_RCIVR:
                                                                                                    prevState.detail.VEIN_RCIVR.filter(
                                                                                                        e =>
                                                                                                            e.MHRLS_CODE !==
                                                                                                            el.MHRLS_CODE
                                                                                                    ),
                                                                                            },
                                                                                        })
                                                                                    )
                                                                                }
                                                                            />
                                                                        </CT.TableBodyCell>
                                                                    </CT.TableBodyRow>
                                                                )
                                                            }
                                                        )}
                                                    </CT.TableBodyS>
                                                </CT.TableWapper>
                                            </WS.FullWapperGap>
                                        </InputCell>
                                    </Row>
                                </TableWapper>
                            </TableContainer>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`로고 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                ReturnCallback={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        detail: {
                                            ...prevState.detail,
                                            LOGO_ATCHMNFL_NO: e.ATCHMNFL_NO,
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`장소 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                ReturnCallback={e =>
                                    setDetailState(prevState => ({
                                        ...prevState,
                                        detail: {
                                            ...prevState.detail,
                                            BCRN_ATCHMNFL_NO: e.ATCHMNFL_NO,
                                        },
                                    }))
                                }
                            />
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            <DPS.ButtonBox>
                <DPS.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`취소`}
                        HandleClick={() => {
                            console.debug('HandleClick')
                        }}
                    />
                </DPS.ButtonItem>
                <DPS.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`확인`}
                        HandleClick={() => {
                            const { instlPlaceCheck } = detailState.sub
                            const {
                                INSTL_PLACE,
                                INST_NO,
                                INSTL_ADRES,
                                LA,
                                LO,
                                MAP_ADRES,
                                MHRLS_INFO,
                            } = detailState.detail

                            if (_.isEmpty(INSTL_PLACE)) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents
                                            .instlPlaceEmpty,
                                })
                                return
                            }

                            if (!instlPlaceCheck) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents
                                            .instlPlaceDuplicate,
                                })
                                return
                            }

                            if (_.isEmpty(INST_NO)) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents.pstinstEmpty,
                                })
                                return
                            }

                            if (_.isEmpty(INSTL_ADRES)) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents.addressEmpty,
                                })
                                return
                            }

                            if (_.isEmpty(LA) || _.isEmpty(LO)) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents.locationEmpty,
                                })
                                return
                            }

                            if (_.isEmpty(MAP_ADRES)) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents
                                            .mapAddresEmpty,
                                })
                                return
                            }

                            if (MHRLS_INFO.length === 0) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.contents.mhrlsEmpty,
                                })
                                return
                            }

                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    saveConfirm: true,
                                },
                            }))
                        }}
                    />
                </DPS.ButtonItem>
            </DPS.ButtonBox>
            {pageState.modal.postcode && (
                <KaKaoPostCodeModal
                    Complete={address => {
                        setDetailState(prevState => ({
                            ...prevState,
                            detail: {
                                ...prevState.detail,
                                INSTL_ADRES: address.fullAddress
                                    ? address.fullAddress
                                    : '',
                                LA: address.y ? address.y : '',
                                LO: address.x ? address.x : '',
                                MAP_ADRES: `https://map.kakao.com/link/map/${detailState.detail.INSTL_PLACE},${address.y},${address.x}`,
                            },
                        }))
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                postcode: false,
                            },
                        }))
                    }}
                />
            )}
            {pageState.modal.kakaomap && (
                <KaKaoMapModal
                    Lat={Number(detailState.detail.LA)}
                    Lng={Number(detailState.detail.LO)}
                    MarkeName={detailState.detail.INSTL_PLACE}
                    Complete={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                kakaomap: false,
                            },
                        }))
                    }}
                />
            )}
            {pageState.modal.saveConfirm && (
                <ConfirmModal
                    Title={Messages.Default.contents.saveConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                saveConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                saveConfirm: false,
                            },
                        }))
                        handleClickSaveButton()
                    }}
                />
            )}
        </DPS.DetailContainer>
    )
}

export default UhealthzoneDetailTable
