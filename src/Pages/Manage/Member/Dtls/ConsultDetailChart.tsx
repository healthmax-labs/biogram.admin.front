import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import {
    DefaultManageButton,
    ElementLoading,
    VaryDatepickerInput,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import React, { useState } from 'react'
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

const ConsultDetailChart = () => {
    const [pageState] = useState<{
        loading: boolean
        list: Array<{
            step1: string
            step2: string
            step3: string
            step4: string
            step5: string
            step6: string
            step7: string
        }>
    }>({
        loading: false,
        list: [],
    })
    return (
        <div className="">
            <div className="flex flex-nowrap">
                <div className="flex py-2 items-center w-1/3 justify-start">
                    <VaryDatepickerInput
                        CallBackReturn={e => {
                            const dateObj = gmtTimeToTimeObject(e)
                            console.debug(dateObj)
                        }}
                    />
                    ~
                    <VaryDatepickerInput
                        CallBackReturn={e => {
                            const dateObj = gmtTimeToTimeObject(e)
                            console.debug(dateObj)
                        }}
                    />
                </div>
                <div className="flex py-2 items-center w-full justify-end">
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'조회'}
                            ButtonClick={() =>
                                console.debug('DefaultManageButton')
                            }
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'신규'}
                            ButtonClick={() => console.debug('ButtonClick')}
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'삭제'}
                            ButtonClick={() => console.debug('ButtonClick')}
                        />
                    </div>
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
                            <HeaderCell></HeaderCell>
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
                        {pageState.list.length > 0 ? (
                            pageState.list.map((el, index) => {
                                return (
                                    <TableBodyRow
                                        key={`main-table-body-row-${index}`}
                                        BgState={index % 2 === 0}>
                                        <TableBodyCell>
                                            {el.step1}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step2}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step3}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step4}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step5}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step6}
                                        </TableBodyCell>
                                        <TableBodyCell>
                                            {el.step7}
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
        </div>
    )
}

export default ConsultDetailChart
