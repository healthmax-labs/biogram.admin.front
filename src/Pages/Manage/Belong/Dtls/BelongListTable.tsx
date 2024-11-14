import React, { useEffect, useState } from 'react'
import { getInstdeptList } from '@Service/InstdeptService'
import { InstdeptListInterface } from '@Type/CommonTypes'
import {
    Table,
    TableTbody,
    TableTbodyTh,
    TableTbodyTr,
    TableTh,
    TableThead,
    TableTr,
} from '@Style/Pages/BelongMain'

export default function BelongListTable() {
    const [resList, setResList] = useState<InstdeptListInterface[]>([])

    const getTableList = async () => {
        const response = await getInstdeptList({
            CUR_PAGE: 1,
            INST_NO: '',
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
                {resList.map((el: InstdeptListInterface, index) => {
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
