import React, { useEffect, useState } from 'react'
import { getList } from '@Service/InstdeptService'
import { INSTDEPT_LIST } from '@Type/CommonTypes'
import {
    Table,
    TableThead,
    TableTr,
    TableTh,
    TableTbody,
    TableTbodyTr,
    TableTbodyTh,
} from '@Style/Pages/BelongMain'

export default function BelongListTable() {
    const [resList, setResList] = useState<INSTDEPT_LIST[]>([])

    const getTableList = async () => {
        const response = await getList({
            CUR_PAGE: 1,
            INST_NO: 0,
            ITEM_COUNT: 200,
            SEARCH_KEY: '',
        })

        setResList(response.payload.INSTDEPT_LIST)
    }

    useEffect(() => {
        getTableList().then()
    }, [])

    return (
        <Table>
            <TableThead>
                <TableTr>
                    <TableTh>회원번호</TableTh>
                    <TableTh>회원명</TableTh>
                    <TableTh>휴대폰번호</TableTh>
                    <TableTh>생년월일</TableTh>
                    <TableTh>성별</TableTh>
                    <TableTh>소속이름</TableTh>
                    <TableTh>부서</TableTh>
                    <TableTh>소속가입일</TableTh>
                    <TableTh>상태</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {resList.map((el: INSTDEPT_LIST, index) => {
                    return (
                        <TableTbodyTr key={index}>
                            <TableTbodyTh>{el.MBER_NO}</TableTbodyTh>
                            <TableTbodyTh>{el.MEBER_NM}</TableTbodyTh>
                            <TableTbodyTh>{el.MBTLNUM}</TableTbodyTh>
                            <TableTbodyTh>{el.MBTLNUM}</TableTbodyTh>
                            <TableTbodyTh>{el.SEXDSTN}</TableTbodyTh>
                            <TableTbodyTh>{el.INST_NM}</TableTbodyTh>
                            <TableTbodyTh>{el.DEPT_NM}</TableTbodyTh>
                            <TableTbodyTh>{el.CONFM_DE}</TableTbodyTh>
                            <TableTbodyTh>{el.STAT}</TableTbodyTh>
                        </TableTbodyTr>
                    )
                })}
            </TableTbody>
        </Table>
    )
}
