import React, { useEffect, useState } from 'react'
import { Members } from '@Style/Pages/MemberPageStyles'
import { INSTDEPT_LIST } from '@Type/CommonTypes'
import { getList } from '@Service/InstdeptService'
import { DefaultCheckBox } from '@Element/Inputs'

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
        <Members.Table.Table>
            <Members.Table.Thead>
                <Members.Table.Tr>
                    <Members.Table.ThCheckbox>
                        <DefaultCheckBox />
                    </Members.Table.ThCheckbox>
                    <Members.Table.Th>회원번호</Members.Table.Th>
                    <Members.Table.Th>회원명</Members.Table.Th>
                    <Members.Table.Th>휴대폰번호</Members.Table.Th>
                    <Members.Table.Th>생년월일</Members.Table.Th>
                    <Members.Table.Th>성별</Members.Table.Th>
                    <Members.Table.Th>소속이름</Members.Table.Th>
                    <Members.Table.Th>부서</Members.Table.Th>
                    <Members.Table.Th>소속가입일</Members.Table.Th>
                    <Members.Table.Th>상태</Members.Table.Th>
                </Members.Table.Tr>
            </Members.Table.Thead>
            <Members.Table.Tbody>
                {resList.map((el: INSTDEPT_LIST, index) => {
                    return (
                        <Members.Table.TbodyTr
                            key={index}
                            BgState={index % 2 === 0}>
                            <Members.Table.TbodyTdCheckbox>
                                <DefaultCheckBox />
                            </Members.Table.TbodyTdCheckbox>
                            <Members.Table.TbodyTd>
                                {el.MBER_NO}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.MEBER_NM}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.MBTLNUM}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.MBTLNUM}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.SEXDSTN}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.INST_NM}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.DEPT_NM}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.CONFM_DE}
                            </Members.Table.TbodyTd>
                            <Members.Table.TbodyTd>
                                {el.STAT}
                            </Members.Table.TbodyTd>
                        </Members.Table.TbodyTr>
                    )
                })}
            </Members.Table.Tbody>
        </Members.Table.Table>
    )
}
