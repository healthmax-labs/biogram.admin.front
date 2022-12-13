import React, { useCallback, useEffect, useState } from 'react'
import {
    DefaultManageButton,
    ElementLoading,
    VaryDatepickerInput,
    VaryModal,
} from '@Elements'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { gmtTimeToTimeObject } from '@Helper'
import { MesureInfoListItemInterface } from '@Type/MemberTypes'
import Messages from '@Messages'
import Codes from '@Codes'
import { getMesureInfo } from '@Service/MemberService'

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
        page: 1,
        startDate: null,
        endDate: null,
    },
    list: [],
    loading: false,
    title: ``,
}

const MemberMyDataModal = ({
    MemberNo,
    DataCode,
    DataName,
    CancleButtonClick,
}: {
    MemberNo: number | null
    DataCode: string
    DataName: string
    CancleButtonClick: () => void
}) => {
    const [pageState, setPageState] = useState<{
        search: {
            page: number
            startDate: string | null
            endDate: string | null
        }
        list: MesureInfoListItemInterface[]
        loading: boolean
        title: string
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        if (
            MemberNo &&
            DataCode &&
            pageState.search.startDate &&
            pageState.search.endDate &&
            pageState.search.page
        ) {
            const { status, payload } = await getMesureInfo({
                memNo: MemberNo,
                dataCode: DataCode,
                startDate: pageState.search.startDate,
                endDate: pageState.search.endDate,
                pageNo: pageState.search.page,
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    list: payload.MESURE_INFO_LIST,
                }))
            } else {
                // FIXME: 에러처리.
                // handlMainAlert({
                //     state: true,
                //     message: Messages.Default.pageError,
                // })
            }
        }
    }, [
        DataCode,
        MemberNo,
        pageState.search.endDate,
        pageState.search.page,
        pageState.search.startDate,
    ])

    useEffect(() => {
        const funcSetState = () => {
            console.debug(DataCode, Codes.myData, MemberNo)

            handleGetList().then()
        }

        funcSetState()
    }, [DataCode, MemberNo, handleGetList])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <>
                        <div className="py-2 text-left text-2xl">
                            {DataName}
                        </div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2">
                                <VaryDatepickerInput
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
                                <DefaultManageButton
                                    ButtonName={'조회'}
                                    ButtonClick={() =>
                                        console.debug('ButtonClick')
                                    }
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
                                        <HeaderCell>기록구분</HeaderCell>
                                        <HeaderCell>측정일시</HeaderCell>
                                        <HeaderCell>마지막 측정값</HeaderCell>
                                        <HeaderCell>정상수치</HeaderCell>
                                        <HeaderCell>평가</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody>
                                    {pageState.list.length > 0 ? (
                                        pageState.list.map((el, index) => {
                                            const MNVL = el.MNVL
                                            const MVL = el.MVL
                                            const MNVLMVL =
                                                MNVL && MVL
                                                    ? `${MNVL} ~ ${MVL}`
                                                    : '-'

                                            return (
                                                <TableBodyRow
                                                    key={`main-table-body-row-${index}`}
                                                    BgState={index % 2 === 0}>
                                                    <TableBodyCell>
                                                        {el.MESURE_MTHD_NM}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_DT}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.DATAS}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {MNVLMVL}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_GRAD_NM}
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

export default MemberMyDataModal
