import {
    DefaultManageButton,
    ElementLoading,
    VaryDatepickerInput,
    VaryModal,
} from '@Element/index'
import React, { useCallback, useEffect, useState } from 'react'
import { gmtTimeToTimeObject } from '@Helper'
import { getCashInfo } from '@Service/DataService'
import Messages from '@Messages'
import { TotalScoreModalStyle } from '@Style/Elements/ModalStyles'
import { MberCashInfoItemInterface } from '@CommonTypes'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
} = TotalScoreModalStyle

const initializeState = {
    search: {
        startDate: null,
        endDate: null,
    },
    list: [],
    loading: false,
}

const TotalCashModal = ({
    MemberNo,
    CancleButtonClick,
}: {
    MemberNo: number
    CancleButtonClick: () => void
}) => {
    const [pageState, setPageState] = useState<{
        search: {
            startDate: string | null
            endDate: string | null
        }
        list: MberCashInfoItemInterface[]
        loading: boolean
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }))
        const { startDate, endDate } = pageState.search

        if (startDate && endDate) {
            const { status, payload } = await getCashInfo({
                memNo: MemberNo,
                startDate: startDate,
                endDate: endDate,
            })

            if (status) {
                const { MBER_CASH_LIST } = payload
                setPageState(prevState => ({
                    ...prevState,
                    list: MBER_CASH_LIST,
                }))
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    list: [],
                }))
            }
        }
        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }))
    }, [MemberNo, pageState.search])

    useEffect(() => {
        handleGetData().then()
        // FIXME : 종속성에서 tabState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MemberNo])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <>
                        <div className="py-2 text-left text-2xl">캐쉬현황</div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2">
                                <VaryDatepickerInput
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                startDate: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                                ~
                                <VaryDatepickerInput
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                endDate: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                            <div className="flex py-2">
                                <DefaultManageButton
                                    ButtonName={'조회'}
                                    ButtonClick={() => handleGetData()}
                                />
                            </div>
                        </div>

                        {pageState.loading ? (
                            <div className="h-[calc(100vh-10rem)]">
                                <ElementLoading FullScreen={false} />
                            </div>
                        ) : (
                            <TableWapper>
                                <TableHeader>
                                    <HeaderRow>
                                        <HeaderCell>일시</HeaderCell>
                                        <HeaderCell>구분</HeaderCell>
                                        <HeaderCell>금액</HeaderCell>
                                        <HeaderCell>평가</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody>
                                    {pageState.list.length > 0 ? (
                                        pageState.list.map((el, index) => {
                                            return (
                                                <TableBodyRow
                                                    key={`main-table-body-row-${index}`}
                                                    BgState={index % 2 === 0}>
                                                    <TableBodyCell>
                                                        {el.CHANGE_DE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.CHANGE_SE_CODE_NM}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.CHANGE_CASH}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.CHANGE_RESN}
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
                    </>
                }
                Buttons={
                    <>
                        <DefaultManageButton
                            ButtonName={'닫기'}
                            ButtonClick={() => CancleButtonClick()}
                        />
                    </>
                }
            />
        </>
    )
}

export default TotalCashModal
