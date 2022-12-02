import React, { useEffect, useState } from 'react'
import {
    DefaultManageButton,
    ElementLoading,
    VaryDatepickerInput,
    VaryModal,
} from '@Elements'
import { TotalScoreModalStyle } from '@Style/Elements/ModalStyles'
import { gmtTimeToTimeObject } from '@Helper'
import { MybodyManageScoreItemInterface } from '@CommonTypes'
import Messages from '@Messages'
import Codes from '@Codes'

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
    title: ``,
}

const MemberMyDataModal = ({
    MemberNo,
    DataCode,
    DataName,
    CancleButtonClick,
}: {
    MemberNo: number
    DataCode: string
    DataName: string
    CancleButtonClick: () => void
}) => {
    const [pageState, setPageState] = useState<{
        search: {
            startDate: string | null
            endDate: string | null
        }
        list: MybodyManageScoreItemInterface[]
        loading: boolean
        title: string
    }>(initializeState)

    useEffect(() => {
        const funcSetState = () => {
            console.debug(DataCode, Codes.myData, MemberNo)
        }

        funcSetState()
    }, [DataCode, MemberNo])

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
