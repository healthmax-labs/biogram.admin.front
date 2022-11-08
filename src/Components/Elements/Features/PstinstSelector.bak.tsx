import React, { useEffect, useState } from 'react'
import { ElementLoading, SearchSelect } from '@Elements'
import { ModalStyle } from '@Style/Elements/ModalStyles'
import { PstinstSelectorStyle } from '@Style/Elements/FeaturesStyles'
import { getPstinst } from '@Service/MemberService'
import { PstinstInfoItemInterface } from '@Type/MemberTypes'

const { Container, ModalBackground, MainWapper, Wapper, MainBox, CenterBox } =
    ModalStyle

const {
    TableBox,
    HeaderCell,
    HeaderRow,
    TableBodyCell,
    TableBody,
    TableBodyRow,
    TableWapper,
    TableHeader,
} = PstinstSelectorStyle

const initializeState = {
    loading: false,
    PSTINST_INFO_LIST: {
        step1: [],
        step2: [],
        step3: [],
    },
}

export default function PstinstSelector() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [pageState, setPageState] = useState<{
        loading: boolean
        PSTINST_INFO_LIST: {
            step1: PstinstInfoItemInterface[]
            step2: PstinstInfoItemInterface[]
            step3: PstinstInfoItemInterface[]
        }
    }>(initializeState)

    const getList = async () => {
        const response = await getPstinst()
        if (response.status) {
            const { PSTINST_INFO_LIST } = response.payload

            setPageState(prevState => ({
                ...prevState,
                PSTINST_INFO_LIST: {
                    ...prevState.PSTINST_INFO_LIST,
                    step1: PSTINST_INFO_LIST.filter(
                        el =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 === null &&
                            el.INST_NO_3 === null
                    ),
                    step2: PSTINST_INFO_LIST.filter(
                        el =>
                            el.INST_NO_1 &&
                            el.INST_NO_2 &&
                            el.INST_NO_3 === null
                    ),
                    step3: PSTINST_INFO_LIST.filter(
                        el => el.INST_NO_1 && el.INST_NO_2 && el.INST_NO_3
                    ),
                },
            }))
        } else {
            // 에러
        }
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

    useEffect(() => {
        console.debug(pageState.PSTINST_INFO_LIST)
    }, [pageState])

    return (
        <>
            <SearchSelect
                id={`id`}
                name={`name`}
                autoComplete={`autoComplete`}
                handleOnFocus={() => handleShowModal(true)}
                elements={[{ value: 1, text: `소속선택` }]}
            />

            {showModal && (
                <Container>
                    <ModalBackground></ModalBackground>
                    <MainWapper>
                        <Wapper>
                            <MainBox>
                                <CenterBox>
                                    {pageState.loading ? (
                                        <ElementLoading />
                                    ) : (
                                        <>
                                            <TableBox>
                                                <TableWapper>
                                                    <TableHeader>
                                                        <HeaderRow>
                                                            <HeaderCell>
                                                                1차
                                                            </HeaderCell>
                                                            <HeaderCell>
                                                                2차
                                                            </HeaderCell>
                                                            <HeaderCell>
                                                                3차
                                                            </HeaderCell>
                                                        </HeaderRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableBodyRow
                                                            BgState={true}>
                                                            <TableBodyCell>
                                                                헬스 맥스
                                                            </TableBodyCell>
                                                            <TableBodyCell>
                                                                헬스 맥스
                                                            </TableBodyCell>
                                                            <TableBodyCell>
                                                                헬스 맥스
                                                            </TableBodyCell>
                                                        </TableBodyRow>
                                                    </TableBody>
                                                </TableWapper>
                                            </TableBox>
                                        </>
                                    )}
                                </CenterBox>
                            </MainBox>
                        </Wapper>
                    </MainWapper>
                </Container>
            )}
        </>
    )
}
