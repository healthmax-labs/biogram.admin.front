import { PstinstInfoItemInterface } from '@Type/MemberTypes'
import { useState } from 'react'
import { getPstinst } from '@Service/CommonService'

export interface PstinstInfoItemType extends PstinstInfoItemInterface {
    checkSearch: boolean
}

const initializeState = {
    loading: false,
    pstinsts: {
        step1: [],
        step2: [],
        step3: [],
        list: [],
    },
}

export default function usePstinst() {
    const [pstinstState, setPstinstState] = useState<{
        pstinsts: {
            step1: PstinstInfoItemType[]
            step2: PstinstInfoItemType[]
            step3: PstinstInfoItemType[]
            list: any
        }
    }>(initializeState)

    const [pstinstSearchState, setSstinstSearchState] = useState<number[]>([])

    // 리스트 가지고 오기.
    const getPstinstList = async () => {
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

            setPstinstState(prevState => ({
                ...prevState,
                pstinsts: {
                    ...prevState.pstinsts,
                    step1: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 === null &&
                            el.INST_NO_3 === null
                    ).map((el: PstinstInfoItemInterface) => {
                        return {
                            ...el,
                            checkSearch: false,
                        }
                    }),
                    step2: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 &&
                            el.INST_NO_3 === null
                    ).map((el: PstinstInfoItemInterface) => {
                        return {
                            ...el,
                            checkSearch: false,
                        }
                    }),
                    step3: PSTINST_INFO_LIST.filter(
                        (el: PstinstInfoItemInterface) =>
                            el.INST_NO_1 && el.INST_NO_2 && el.INST_NO_3
                    ).map((el: PstinstInfoItemInterface) => {
                        return {
                            ...el,
                            checkSearch: false,
                        }
                    }),
                    list: resultList,
                },
            }))
        } else {
            // 에러
        }
    }

    // 소속 검색 처리.
    const pstinstSearch = (searchStr: string) => {
        const searchList: number[] = []

        const testList: {
            step1: PstinstInfoItemType[]
            step2: PstinstInfoItemType[]
            step3: PstinstInfoItemType[]
        } = {
            step1: pstinstState.pstinsts.step1.map(
                (el: PstinstInfoItemInterface) => {
                    const searchCheck =
                        searchStr.length > 0 && el.INST_NM_1.includes(searchStr)

                    if (searchCheck) {
                        searchList.push(el.INST_NO)
                    }

                    return {
                        ...el,
                        checkSearch: searchCheck,
                    }
                }
            ),
            step2: pstinstState.pstinsts.step2.map(
                (el: PstinstInfoItemInterface) => {
                    const searchCheck =
                        searchStr.length > 0 && el.INST_NM_2.includes(searchStr)

                    if (searchCheck) {
                        searchList.push(el.INST_NO)
                    }

                    return {
                        ...el,
                        checkSearch: searchCheck,
                    }
                }
            ),
            step3: pstinstState.pstinsts.step3.map(
                (el: PstinstInfoItemInterface) => {
                    const searchCheck =
                        searchStr.length > 0 && el.INST_NM_3.includes(searchStr)

                    if (searchCheck) {
                        searchList.push(el.INST_NO)
                    }
                    return {
                        ...el,
                        checkSearch: searchCheck,
                    }
                }
            ),
        }

        setPstinstState(prevState => ({
            ...prevState,
            pstinsts: {
                ...prevState.pstinsts,
                step1: testList.step1,
                step2: testList.step2,
                step3: testList.step3,
            },
        }))
        setSstinstSearchState(searchList)
    }

    // 검색 리셋처리.
    const pstinstSearchReset = () => {
        pstinstSearch('')
    }

    // 전체 스테이트 리셋처리.
    const pstinstStateReset = () => {
        setPstinstState(initializeState)
    }

    return {
        pstinstState,
        getPstinstList,
        pstinstSearch,
        pstinstSearchState,
        pstinstSearchReset,
        pstinstStateReset,
    }
}
