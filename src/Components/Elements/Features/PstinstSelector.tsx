import React, { useState } from 'react'
import { DefaultManageButton, SearchSelect, VaryModal } from '@Elements'
import { PstinstSelectorStyle } from '@Style/Elements/FeaturesStyles'
import { getPstinst } from '@Service/MemberService'
import { PstinstInfoItemInterface } from '@Type/MemberTypes'

const {
    TableBox,
    HeaderCell,
    HeaderRow,
    TableBodyCell,
    TableBody,
    TableBodyRow,
    TableWapper,
    TableHeader,
    ItemWapper,
    ItemCheckBox,
    ItemLabel,
    ItemCols,
} = PstinstSelectorStyle

const initializeState = {
    loading: false,
    PSTINST_INFO_LIST: {
        step1: [],
        step2: [],
        step3: [],
        list: [],
    },
    selectElement: [{ value: 1, text: `소속선택` }],
}

export default function PstinstSelector({
    HandleSelectValue,
}: {
    HandleSelectValue: ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => void
}) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [pageState, setPageState] = useState<{
        loading: boolean
        PSTINST_INFO_LIST: {
            step1: PstinstInfoItemInterface[]
            step2: PstinstInfoItemInterface[]
            step3: PstinstInfoItemInterface[]
            list: any
        }
        selectElement: Array<{ value: number; text: string }>
    }>(initializeState)

    const getList = async () => {
        const response = await getPstinst()
        if (response.status) {
            const { PSTINST_INFO_LIST } = response.payload

            const step1 = PSTINST_INFO_LIST.filter(
                (el: PstinstInfoItemInterface) =>
                    el.INST_NO_1 &&
                    el.INST_NO_2 === null &&
                    el.INST_NO_3 === null
            )

            const step2 = PSTINST_INFO_LIST.filter(
                (el: PstinstInfoItemInterface) =>
                    el.INST_NO_1 && el.INST_NO_2 && el.INST_NO_3 === null
            )

            const step3 = PSTINST_INFO_LIST.filter(
                (el: PstinstInfoItemInterface) =>
                    el.INST_NO_1 && el.INST_NO_2 && el.INST_NO_3
            )

            const resultList = step1.map((step1: PstinstInfoItemInterface) => {
                return {
                    ...step1,
                    list: step2
                        .filter(
                            (step2: PstinstInfoItemInterface) =>
                                step2.INST_NO_1 === step1.INST_NO_1
                        )
                        .map((step2: PstinstInfoItemInterface) => {
                            return {
                                ...step2,
                                list: step3.filter(
                                    (step3: PstinstInfoItemInterface) =>
                                        step3.INST_NO_1 === step1.INST_NO_1 &&
                                        step3.INST_NO_2 === step2.INST_NO_2
                                ),
                            }
                        }),
                }
            })

            setPageState(prevState => ({
                ...prevState,
                PSTINST_INFO_LIST: {
                    ...prevState.PSTINST_INFO_LIST,
                    step1: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 === null &&
                            el.INST_NO_3 === null
                    ),
                    step2: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 &&
                            el.INST_NO_3 === null
                    ),
                    step3: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 && el.INST_NO_2 && el.INST_NO_3
                    ),
                    list: resultList,
                },
            }))
        } else {
            // 에러
        }
    }

    const handleItemClick = ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => {
        HandleSelectValue({ instNo: instNo, instNm: instNm })
        setPageState(prevState => ({
            ...prevState,
            selectElement: [{ value: instNo, text: instNm }],
        }))
        handleShowModal(false)
    }

    const handleShowModal = (flag: boolean) => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }))

        setShowModal(flag)

        if (flag) {
            getList().then(() => {
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                }))
            })
        }
    }

    return (
        <>
            <SearchSelect
                id={`id`}
                name={`name`}
                autoComplete={`autoComplete`}
                handleOnFocus={() => handleShowModal(true)}
                elements={pageState.selectElement}
            />

            {showModal && (
                <VaryModal
                    ModalLoading={pageState.loading}
                    Children={
                        <TableBox>
                            <TableWapper>
                                <TableHeader>
                                    <HeaderRow>
                                        <HeaderCell>1차</HeaderCell>
                                        <HeaderCell>2차</HeaderCell>
                                        <HeaderCell>3차</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody>
                                    {pageState.PSTINST_INFO_LIST.step1.map(
                                        (
                                            step1: PstinstInfoItemInterface,
                                            step1Index: number
                                        ) => {
                                            return (
                                                <TableBodyRow
                                                    key={`pstinst-selector-table-row-item-${step1Index}`}
                                                    BgState={true}>
                                                    <TableBodyCell>
                                                        <ItemWapper>
                                                            <ItemCheckBox
                                                                id={`item-checkbox-step1-${step1Index}`}
                                                                type="checkbox"
                                                                value={
                                                                    step1.INST_NO
                                                                }
                                                                onClick={() =>
                                                                    handleItemClick(
                                                                        {
                                                                            instNo: step1.INST_NO,
                                                                            instNm: step1.INST_NM_1,
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <ItemLabel
                                                                htmlFor={`item-checkbox-step1-${step1Index}`}>
                                                                {
                                                                    step1.INST_NM_1
                                                                }
                                                            </ItemLabel>
                                                        </ItemWapper>
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        <ItemCols>
                                                            {pageState.PSTINST_INFO_LIST.step2
                                                                .filter(
                                                                    el =>
                                                                        el.INST_NO_1 ===
                                                                        step1.INST_NO_1
                                                                )
                                                                .map(
                                                                    (
                                                                        step2,
                                                                        step2Index
                                                                    ) => {
                                                                        return (
                                                                            <ItemWapper
                                                                                key={`pstinst-selector-step2-item-${step2Index}`}>
                                                                                <ItemCheckBox
                                                                                    id={`pstinst-selector-step2-item-${step2Index}`}
                                                                                    type="checkbox"
                                                                                    value={
                                                                                        step2.INST_NO
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleItemClick(
                                                                                            {
                                                                                                instNo: step2.INST_NO,
                                                                                                instNm: step2.INST_NM_2,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <ItemLabel
                                                                                    htmlFor={`pstinst-selector-step2-item-${step2Index}`}>
                                                                                    {
                                                                                        step2.INST_NM_2
                                                                                    }
                                                                                </ItemLabel>
                                                                            </ItemWapper>
                                                                        )
                                                                    }
                                                                )}
                                                        </ItemCols>
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        <ItemCols>
                                                            {pageState.PSTINST_INFO_LIST.step3
                                                                .filter(
                                                                    el =>
                                                                        el.INST_NO_1 ===
                                                                        step1.INST_NO_1
                                                                )
                                                                .map(
                                                                    (
                                                                        step3,
                                                                        step3Index
                                                                    ) => {
                                                                        return (
                                                                            <ItemWapper
                                                                                key={`pstinst-selector-step3-item-${step3Index}`}>
                                                                                <ItemCheckBox
                                                                                    id={`pstinst-selector-step3-item-${step3Index}`}
                                                                                    type="checkbox"
                                                                                    value={
                                                                                        step3.INST_NO
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleItemClick(
                                                                                            {
                                                                                                instNo: step3.INST_NO,
                                                                                                instNm: step3.INST_NM_3,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <ItemLabel
                                                                                    htmlFor={`pstinst-selector-step3-item-${step3Index}`}>
                                                                                    {
                                                                                        step3.INST_NM_3
                                                                                    }
                                                                                </ItemLabel>
                                                                            </ItemWapper>
                                                                        )
                                                                    }
                                                                )}
                                                        </ItemCols>
                                                    </TableBodyCell>
                                                </TableBodyRow>
                                            )
                                        }
                                    )}
                                </TableBody>
                            </TableWapper>
                        </TableBox>
                    }
                    Buttons={
                        <>
                            <DefaultManageButton
                                ButtonClick={() => handleShowModal(false)}
                                ButtonName={'취소'}
                            />
                        </>
                    }
                />
            )}
        </>
    )
}
