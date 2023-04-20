import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import {
    ConfirmModal,
    ElementLoading,
    VaryButton,
    VaryCheckBox,
    VaryDatepickerInput,
} from '@Elements'
import {
    changeDatePickerDate,
    gmtTimeToTimeObject,
    timeStringParse,
} from '@Helper'
import React, { useCallback, useEffect, useState } from 'react'
import Messages from '@Messages'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    ConsultDetailChartListState,
    ConsultDetailChartState,
} from '@Recoil/MemberPagesState'
import { manageRemoveCounsel, postManageCounsel } from '@Service/MemberService'
import { ManageCounselItemInterface } from '@Type/MemberTypes'
import { useMainLayouts } from '@Hook/index'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import _ from 'lodash'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
} = CommonListTableStyle

const {
    Detail: {
        Chart: { Container, Search },
    },
} = ConsultDetailStyle

const initializeState = {
    select: [],
    modal: {
        removeConfirm: false,
    },
}

const ConsultDetailPartChart = () => {
    const { handlMainAlert } = useMainLayouts()
    const { memNo } = useParams<{ memNo: string }>()

    const [chartState, setChartState] = useRecoilState(
        ConsultDetailChartListState
    )
    const setConsultChart = useSetRecoilState(ConsultDetailChartState)

    const [pageState, setPageState] = useState<{
        select: number[]
        modal: {
            removeConfirm: boolean
        }
    }>(initializeState)

    const handleGetList = useCallback(
        async (memNo: number) => {
            setChartState(prevState => ({
                ...prevState,
                listStatus: 'loading',
                memNo: memNo,
            }))
            const { status, payload } = await postManageCounsel({
                MBER_NO: String(memNo),
                END_DT: chartState.search.endDt,
                START_DT: chartState.search.startDt,
            })

            if (status) {
                const { CHART_LIST } = payload
                setChartState(prevState => ({
                    ...prevState,
                    listStatus: 'success',
                    list: CHART_LIST,
                }))
            } else {
                // FIXME: 에러 처리
                setChartState(prevState => ({
                    ...prevState,
                    listStatus: 'failure',
                    list: [],
                }))
            }
        },
        [chartState.search.endDt, chartState.search.startDt, setChartState]
    )

    const handleRowClick = (element: ManageCounselItemInterface) => {
        setConsultChart(prevState => ({
            ...prevState,
            CNST: element.CNST,
            PLN: element.PLN,
            REG_NM: element.REG_NM,
            CNST_NO: element.CNST_NO,
            MNG_ID: element.MNG_ID,
            MNG_NM: element.MNG_NM,
            MOD_DT: element.MOD_DT,
            MOD_MNG_NM: element.MOD_MNG_NM,
            REGDT: element.REGDT,
        }))
    }

    const handleChartItemRemove = useCallback(async () => {
        if (pageState.select.length === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.remove.removeSelectEmpty,
            })
            return
        }

        const { status } = await manageRemoveCounsel({
            CNST_LIST: pageState.select.map(e => {
                return {
                    CNST_NO: e,
                }
            }),
        })

        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            handleGetList(Number(memNo)).then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, handleGetList, memNo, pageState.select])

    useEffect(() => {
        const pageStart = () => {
            handleGetList(Number(memNo)).then()
        }

        if (memNo && Number(memNo) !== chartState.memNo) {
            pageStart()
        }
    }, [chartState, handleGetList, memNo])

    return (
        <Container>
            <Search.SearchBox>
                <Search.SearchItem>
                    <VaryDatepickerInput
                        InputeType={`default`}
                        Value={
                            chartState.search.startDt
                                ? changeDatePickerDate(
                                      chartState.search.startDt
                                  )
                                : new Date()
                        }
                        CallBackReturn={e => {
                            const dateObj = gmtTimeToTimeObject(e)
                            setChartState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    startDt: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                },
                            }))
                        }}
                    />
                    <Search.DateLine>~</Search.DateLine>
                    <VaryDatepickerInput
                        InputeType={`default`}
                        Value={
                            chartState.search.endDt
                                ? changeDatePickerDate(chartState.search.endDt)
                                : new Date()
                        }
                        CallBackReturn={e => {
                            const dateObj = gmtTimeToTimeObject(e)
                            setChartState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    endDt: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                },
                            }))
                        }}
                    />
                </Search.SearchItem>
                <Search.SearchItem>
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'조회'}
                        HandleClick={() => {
                            handleGetList(Number(memNo)).then()
                        }}
                    />
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'신규'}
                        HandleClick={() => {
                            setConsultChart(prevState => ({
                                ...prevState,
                                CNST: '',
                                PLN: '',
                                REG_NM: '',
                                CNST_NO: null,
                                MNG_ID: '',
                                MNG_NM: '',
                                MOD_DT: '',
                                MOD_MNG_NM: '',
                                REGDT: '',
                            }))
                        }}
                    />
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'삭제'}
                        HandleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    removeConfirm: true,
                                },
                            }))
                        }}
                    />
                </Search.SearchItem>
            </Search.SearchBox>
            {chartState.listStatus === 'loading' ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableWapper>
                    <TableHeader>
                        <HeaderRow>
                            <HeaderCell>
                                <VaryCheckBox
                                    Flex={true}
                                    Checked={
                                        chartState.list.length > 0 &&
                                        chartState.list.length ===
                                            pageState.select.length
                                    }
                                    HandleOnChange={e => {
                                        if (chartState.list.length > 0) {
                                            if (e.target.checked) {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    select: chartState.list.map(
                                                        e => Number(e.CNST_NO)
                                                    ),
                                                }))
                                            } else {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    select: initializeState.select,
                                                }))
                                            }
                                        }
                                    }}
                                />
                            </HeaderCell>
                            <HeaderCell>등록일시</HeaderCell>
                            <HeaderCell>작성 아이디</HeaderCell>
                            <HeaderCell>작성자</HeaderCell>
                            <HeaderCell>최종 수정일</HeaderCell>
                            <HeaderCell>최종 수정자</HeaderCell>
                            <HeaderCell>추후 계획</HeaderCell>
                            <HeaderCell>관리</HeaderCell>
                        </HeaderRow>
                    </TableHeader>
                    <TableBody HeightLimit={false} Scroll={true}>
                        {chartState.list.length > 0 ? (
                            chartState.list.map((el, index) => {
                                return (
                                    <TableBodyRow
                                        key={`main-table-body-row-${index}`}
                                        BgState={index % 2 === 0}
                                        onClick={() => handleRowClick(el)}>
                                        <TableBodyCell>
                                            <VaryCheckBox
                                                Flex={true}
                                                Checked={
                                                    pageState.select.findIndex(
                                                        e =>
                                                            e ===
                                                            Number(el.CNST_NO)
                                                    ) > -1
                                                }
                                                HandleOnChange={e => {
                                                    if (e.target.checked) {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                select: [
                                                                    ...prevState.select,
                                                                    Number(
                                                                        el.CNST_NO
                                                                    ),
                                                                ],
                                                            })
                                                        )
                                                    } else {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                select: prevState.select.filter(
                                                                    e =>
                                                                        e !==
                                                                        Number(
                                                                            el.CNST_NO
                                                                        )
                                                                ),
                                                            })
                                                        )
                                                    }
                                                }}
                                            />
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {timeStringParse(el.REGDT)}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.MNG_ID}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.REG_NM}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {timeStringParse(el.MOD_DT)}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.MOD_MNG_NM}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {_.truncate(el.CNST, {
                                                length: 15,
                                                omission: '...',
                                            })}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {_.truncate(el.PLN, {
                                                length: 15,
                                                omission: '...',
                                            })}
                                        </TableBodyCell>
                                    </TableBodyRow>
                                )
                            })
                        ) : (
                            <TableBodyRow BgState={false}>
                                <TableBodyCell colSpan={8}>
                                    {`${Messages.Default.searchEmpty}`}
                                </TableBodyCell>
                            </TableBodyRow>
                        )}
                    </TableBody>
                </TableWapper>
            )}
            {pageState.modal.removeConfirm && (
                <ConfirmModal
                    Title={Messages.Default.remove.removeConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                removeConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                removeConfirm: false,
                            },
                        }))
                        handleChartItemRemove().then()
                    }}
                />
            )}
        </Container>
    )
}

export default ConsultDetailPartChart
