import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import {
    ConfirmModal,
    DefaultManageButton,
    ElementLoading,
    VaryCheckBox,
    VaryDatepickerInput,
} from '@Elements'
import {
    changeDatePickerDate,
    getNowDate,
    getOneMonthAgo,
    gmtTimeToTimeObject,
    timeStringParse,
} from '@Helper'
import React, { useCallback, useEffect, useState } from 'react'
import Messages from '@Messages'
import { useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
    ConsultDetailChartListState,
    ConsultDetailChartState,
} from '@Recoil/MemberPagesState'
import { manageRemoveCounsel, postManageCounsel } from '@Service/MemberService'
import { ManageCounselItemInterface } from '@Type/MemberTypes'
import { useMainLayouts } from '@Hook/index'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    HeaderCheckbox,
} = CommonListTableStyle

const initializeState = {
    select: [],
    modal: {
        removeConfirm: false,
    },
}

const ConsultDetailChart = () => {
    const { handlMainAlert } = useMainLayouts()
    const { memNo } = useParams<{ memNo: string }>()

    const [chartState, setChartState] = useRecoilState(
        ConsultDetailChartListState
    )
    const setConsultChart = useSetRecoilState(ConsultDetailChartState)
    const resetConsultChart = useResetRecoilState(ConsultDetailChartState)

    const [pageState, setPageState] = useState<{
        select: number[]
        modal: {
            removeConfirm: boolean
        }
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        if (
            chartState.status === 'success' &&
            chartState.search.mberNo &&
            chartState.search.endDt &&
            chartState.search.startDt
        ) {
            setChartState(prevState => ({
                ...prevState,
                listStatus: 'loading',
            }))
            const { status, payload } = await postManageCounsel({
                MBER_NO: chartState.search.mberNo,
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
        }
    }, [
        chartState.search.endDt,
        chartState.search.mberNo,
        chartState.search.startDt,
        chartState.status,
        setChartState,
    ])

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

    const handleChartItemRemove = async () => {
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
            handleGetList().then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        const pageStart = () => {
            if (memNo && chartState.status === 'idle') {
                setChartState(prevState => ({
                    ...prevState,
                    status: 'success',
                    search: {
                        endDt: getNowDate(),
                        startDt: getOneMonthAgo(),
                        mberNo: memNo,
                    },
                }))
            }
        }

        pageStart()
    }, [chartState.status, setChartState, memNo])

    useEffect(() => {
        const funcGetList = () => {
            handleGetList().then()
        }

        if (
            chartState.status === 'success' &&
            chartState.listStatus === 'idle'
        ) {
            funcGetList()
        }
    }, [chartState, handleGetList])

    useEffect(() => {
        console.debug(pageState)
    }, [pageState])

    return (
        <>
            <div className="flex flex-nowrap">
                <div className="flex py-2 items-center w-1/3 justify-start">
                    <VaryDatepickerInput
                        Value={
                            chartState.status === 'success' &&
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
                                    startDt: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                },
                            }))
                        }}
                    />
                    ~
                    <VaryDatepickerInput
                        Value={
                            chartState.status === 'success' &&
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
                                    endDt: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                },
                            }))
                        }}
                    />
                </div>
                <div className="flex py-2 items-center w-full justify-end">
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'조회'}
                            ButtonClick={() => handleGetList().then()}
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'신규'}
                            ButtonClick={() => resetConsultChart()}
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'삭제'}
                            ButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        removeConfirm: true,
                                    },
                                }))
                            }}
                        />
                    </div>
                </div>
            </div>
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
                    <TableBody>
                        {chartState.list.length > 0 ? (
                            chartState.list.map((el, index) => {
                                return (
                                    <TableBodyRow
                                        key={`main-table-body-row-${index}`}
                                        BgState={index % 2 === 0}
                                        onClick={() => handleRowClick(el)}>
                                        <TableBodyCell>
                                            <VaryCheckBox
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
                                        <TableBodyCell>{el.CNST}</TableBodyCell>
                                        <TableBodyCell>{el.PLN}</TableBodyCell>
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
        </>
    )
}

export default ConsultDetailChart
