import React, { useEffect, useState } from 'react'
import {
    Table,
    TableTbody,
    TableTbodyTd,
    TableTbodyTr,
    TableTh,
    TableThead,
    TableTr,
} from '@Style/Pages/PublishPage'
import { INSTDEPT_LIST } from '@Type/CommonTypes'
import { getList } from '@Service/InstdeptService'

export default function ListTable() {
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
                        <TableTbodyTr
                            key={index}
                            BgState={index % 2 === 0 ? true : false}>
                            <TableTbodyTd>{el.MBER_NO}</TableTbodyTd>
                            <TableTbodyTd>{el.MEBER_NM}</TableTbodyTd>
                            <TableTbodyTd>{el.MBTLNUM}</TableTbodyTd>
                            <TableTbodyTd>{el.MBTLNUM}</TableTbodyTd>
                            <TableTbodyTd>{el.SEXDSTN}</TableTbodyTd>
                            <TableTbodyTd>{el.INST_NM}</TableTbodyTd>
                            <TableTbodyTd>{el.DEPT_NM}</TableTbodyTd>
                            <TableTbodyTd>{el.CONFM_DE}</TableTbodyTd>
                            <TableTbodyTd>{el.STAT}</TableTbodyTd>
                        </TableTbodyTr>
                    )
                })}
            </TableTbody>
        </Table>
    )
}
