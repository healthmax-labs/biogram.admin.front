import React, { useCallback, useEffect, useState } from 'react'
import {
    ElementLoading,
    VaryButton,
    VaryDatepickerInput,
    VaryModal,
} from '@Elements'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { gmtTimeToTimeObject } from '@Helper'
import { getDataMybodyManageScore } from '@Service/DataService'
import { MybodyManageScoreItemInterface } from '@CommonTypes'
import Messages from '@Messages'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
} = CommonListTableStyle

const initializeState = {
    search: {
        startDate: null,
        endDate: null,
    },
    list: [],
    loading: false,
}

const TotalScoreModal = ({
    MemberNo,
    CancleButtonClick,
}: {
    MemberNo: number
    CancleButtonClick: () => void
}) => {
    // 측정일시	내몸관리지수	허리둘레	혈압	혈당	HDL-C	중성지방
    // 조회된 데이터가 없습니다.

    const [pageState, setPageState] = useState<{
        search: {
            startDate: string | null
            endDate: string | null
        }
        list: MybodyManageScoreItemInterface[]
        loading: boolean
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }))
        const { startDate, endDate } = pageState.search

        if (startDate && endDate) {
            const { status, payload } = await getDataMybodyManageScore({
                memNo: MemberNo,
                startDate: startDate,
                endDate: endDate,
            })

            if (status) {
                const { MYBODY_MANAGE_SCORE_LIST } = payload
                setPageState(prevState => ({
                    ...prevState,
                    list: MYBODY_MANAGE_SCORE_LIST,
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
                        <div className="py-2 text-left text-2xl">
                            내몸관리지수
                        </div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2">
                                <VaryDatepickerInput
                                    InputeType={`default`}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                startDate: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                            },
                                        }))
                                    }}
                                />
                                ~
                                <VaryDatepickerInput
                                    InputeType={`default`}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                endDate: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                            <div className="flex py-2">
                                <VaryButton
                                    ButtonType={'manage'}
                                    ButtonName={'조회'}
                                    HandleClick={() => handleGetData()}
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
                                        <HeaderCell>측정일시</HeaderCell>
                                        <HeaderCell>내몸관리지수</HeaderCell>
                                        <HeaderCell>허리둘레</HeaderCell>
                                        <HeaderCell>혈압</HeaderCell>
                                        <HeaderCell>혈당</HeaderCell>
                                        <HeaderCell>HDL-C</HeaderCell>
                                        <HeaderCell>중성지방</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody HeightLimit={true}>
                                    {pageState.list.length > 0 ? (
                                        pageState.list.map((el, index) => {
                                            return (
                                                <TableBodyRow
                                                    key={`main-table-body-row-${index}`}
                                                    BgState={index % 2 === 0}>
                                                    <TableBodyCell>
                                                        {el.CALC_DT}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.TOT_SCORE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.WAIST_SCORE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.BP_SCORE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.FBS_SCORE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.HDLC_SCORE}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.TG_SCORE}
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
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'닫기'}
                            HandleClick={() => CancleButtonClick()}
                        />
                    </>
                }
            />
        </>
    )
}

export default TotalScoreModal
