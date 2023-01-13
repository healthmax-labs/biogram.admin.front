import React, { useEffect, useState } from 'react'
import { ListTableStyle } from '@Style/Pages/PublishPageStyle'
import { InstdeptListInterface } from '@Type/CommonTypes'
import { getList } from '@Service/InstdeptService'
import { VaryButton, VaryCheckBox } from '@Elements'

const {
    Tbody,
    TbodyTd,
    TbodyTdCheckbox,
    ThCheckbox,
    TbodyTr,
    Thead,
    TheadTh,
    TheadTr,
    Table,
} = ListTableStyle

export default function ListTable() {
    const [resList, setResList] = useState<InstdeptListInterface[]>([])

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
                        <VaryCheckBox
                            Flex={true}
                            Checked={false}
                            HandleOnChange={() => console.debug(1111)}
                        />
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
                {resList.map((el: InstdeptListInterface, index) => {
                    return (
                        <TbodyTr key={index} BgState={index % 2 === 0}>
                            <TbodyTdCheckbox>
                                <VaryCheckBox
                                    Flex={true}
                                    Checked={false}
                                    HandleOnChange={() => console.debug(1111)}
                                />
                            </TbodyTdCheckbox>
                            <TbodyTd>{el.MBER_NO}</TbodyTd>
                            <TbodyTd>{el.MEBER_NM}</TbodyTd>
                            <TbodyTd>{el.MBTLNUM}</TbodyTd>
                            <TbodyTd>{el.MBTLNUM}</TbodyTd>
                            <TbodyTd>{el.SEXDSTN}</TbodyTd>
                            <TbodyTd>{el.INST_NM}</TbodyTd>
                            <TbodyTd>{el.DEPT_NM}</TbodyTd>
                            <TbodyTd>
                                <VaryButton
                                    ButtonType={`manage`}
                                    HandleClick={() =>
                                        console.debug('DefaultManageButton')
                                    }
                                    ButtonName={'소승승인4'}
                                />
                            </TbodyTd>
                            <TbodyTd>
                                <select
                                    className="form-select block w-30 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                                    id="country"
                                    name="country"
                                    autoComplete="country">
                                    <option>소속 선택</option>
                                    <option>서울</option>
                                    <option>경기도</option>
                                    <option>부산</option>
                                </select>
                            </TbodyTd>
                        </TbodyTr>
                    )
                })}
            </Tbody>
        </Table>
    )
}
