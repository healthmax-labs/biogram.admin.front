import React, { useEffect, useState } from 'react'
import { ListTableStyle } from '@Style/Pages/MemberPageStyles'
import { INSTDEPT_LIST } from '@Type/CommonTypes'
import { getList } from '@Service/InstdeptService'
import { DefaultCheckBox } from '@Element/Inputs'

const {
    Table,
    Thead,
    TheadTr,
    TheadTh,
    ThCheckbox,
    Tbody,
    TbodyTd,
    TbodyTdCheckbox,
    TbodyTr,
} = ListTableStyle

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
            <Thead>
                <TheadTr>
                    <ThCheckbox>
                        <DefaultCheckBox />
                    </ThCheckbox>
                    <TheadTh>회원번호</TheadTh>
                    <TheadTh>회원명</TheadTh>
                    <TheadTh>휴대폰번호</TheadTh>
                    <TheadTh>생년월일</TheadTh>
                    <TheadTh>성별</TheadTh>
                    <TheadTh>소속이름</TheadTh>
                    <TheadTh>부서</TheadTh>
                    <TheadTh>소속가입일</TheadTh>
                    <TheadTh>상태</TheadTh>
                </TheadTr>
            </Thead>
            <Tbody>
                {resList.map((el: INSTDEPT_LIST, index) => {
                    return (
                        <TbodyTr key={index} BgState={index % 2 === 0}>
                            <TbodyTdCheckbox>
                                <DefaultCheckBox />
                            </TbodyTdCheckbox>
                            <TbodyTd>{el.MBER_NO}</TbodyTd>
                            <TbodyTd>{el.MEBER_NM}</TbodyTd>
                            <TbodyTd>{el.MBTLNUM}</TbodyTd>
                            <TbodyTd>{el.MBTLNUM}</TbodyTd>
                            <TbodyTd>{el.SEXDSTN}</TbodyTd>
                            <TbodyTd>{el.INST_NM}</TbodyTd>
                            <TbodyTd>{el.DEPT_NM}</TbodyTd>
                            <TbodyTd>{el.CONFM_DE}</TbodyTd>
                            <TbodyTd>{el.STAT}</TbodyTd>
                        </TbodyTr>
                    )
                })}
            </Tbody>
        </Table>
    )
}
