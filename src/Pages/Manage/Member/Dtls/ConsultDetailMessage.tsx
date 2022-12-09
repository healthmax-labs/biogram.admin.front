import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { ElementLoading } from '@Elements'
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

const ConsultDetailMessage = () => {
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
            {pageState.loading ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableWapper>
                    <TableHeader>
                        <HeaderRow>
                            <HeaderCell>결과</HeaderCell>
                            <HeaderCell>메시지 발송시각</HeaderCell>
                            <HeaderCell>수신인</HeaderCell>
                            <HeaderCell>수신번호</HeaderCell>
                            <HeaderCell>내용</HeaderCell>
                            <HeaderCell>작성일시</HeaderCell>
                            <HeaderCell>발신자</HeaderCell>
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

export default ConsultDetailMessage
