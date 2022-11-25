import React, {
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    DefaultManageButton,
    SearchSelect,
    VaryInput,
    VaryModal,
} from '@Elements'
import { PstinstSelectorStyle } from '@Style/Elements/FeaturesStyles'
import { useMainLayouts, usePstinst } from '@Hooks'
import { PstinstInfoItemType } from '@Hook/usePstinst'
import Messages from '@Messages'

const {
    TableBox,
    InputWapper,
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
    ItemLavelText,
} = PstinstSelectorStyle

const initializeState = {
    loading: false,
    PSTINST_INFO_LIST: {
        step1: [],
        step2: [],
        step3: [],
        list: [],
    },
    selectElements: [],
    selectElement: { value: null, text: `` },
    searchValue: ``,
    searchFocus: null,
}

const PstinstSelector = ({
    SelectorType = 'input',
    HandleSelectValue,
    HandleCancleClick,
}: {
    SelectorType?: 'input' | 'OnlyModal'
    HandleCancleClick?: () => void
    HandleSelectValue: ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => void
}) => {
    // ref...
    const inputRef = useRef<HTMLInputElement[]>([])

    const {
        pstinstState,
        getPstinstList,
        pstinstSearch,
        pstinstSearchState,
        pstinstSearchReset,
    } = usePstinst()
    const { handlMainAlert } = useMainLayouts()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [pageState, setPageState] = useState<{
        loading: boolean
        PSTINST_INFO_LIST: {
            step1: PstinstInfoItemType[]
            step2: PstinstInfoItemType[]
            step3: PstinstInfoItemType[]
            list: any
        }
        selectElements: Array<{ value: number; text: string }>
        selectElement: { value: number | null; text: string | null }
        searchValue: string
        searchFocus: number | null
    }>(initializeState)

    // 소속 선택.
    const handleItemClick = ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => {
        setPageState(prevState => ({
            ...prevState,
            selectElements: [{ value: instNo, text: instNm }],
            selectElement: { value: instNo, text: instNm },
        }))

        if (SelectorType === 'input') {
            HandleSelectValue({
                instNo: instNo,
                instNm: instNm,
            })
            handleShowModal(false)
        }
    }

    // 확인 버튼 클릭
    const handleCLickApplyButton = () => {
        if (
            pageState.selectElement.value !== null &&
            pageState.selectElement.text !== null
        ) {
            HandleSelectValue({
                instNo: pageState.selectElement.value,
                instNm: pageState.selectElement.text,
            })
            handleShowModal(false)
        } else {
            handlMainAlert({
                state: true,
                message: `${Messages.Default.pstinstSelectEmpty}`,
            })
        }
    }

    // 모달 처리.
    const handleShowModal = useCallback(
        (flag: boolean) => {
            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))

            setShowModal(flag)

            if (flag) {
                getPstinstList().then(() => {
                    setPageState(prevState => ({
                        ...prevState,
                        loading: false,
                    }))
                })
            } else {
            }
        },
        [getPstinstList]
    )

    // 검색 input 변경시.
    const handleSearchInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageState(prevState => ({
            ...prevState,
            searchValue: event.target.value,
            searchFocus: null,
        }))

        pstinstSearchReset()
    }

    // 엔터 키 입력 처리.
    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return

        if (pstinstSearchState.length === 0) {
            pstinstSearch(pageState.searchValue)
        } else {
            if (pageState.searchFocus === null) return

            if (pstinstSearchState.length === pageState.searchFocus + 1) {
                setPageState({
                    ...pageState,
                    searchFocus: 0,
                })
                return
            }

            setPageState({
                ...pageState,
                searchFocus: pageState.searchFocus + 1,
            })
        }
    }

    // 취소 버튼 클릭 처리.
    const handleCLickCancleButton = () => {
        handleShowModal(false)
        if (HandleCancleClick) {
            HandleCancleClick()
        }
    }

    // 소속 리스트 업데이트 되었을때.
    useEffect(() => {
        const funcSetPstinst = () => {
            setPageState(prevState => ({
                ...prevState,
                PSTINST_INFO_LIST: pstinstState.pstinsts,
            }))
        }

        funcSetPstinst()
    }, [pstinstState])

    // 검색 리스트 업데이트 되었을때.
    useEffect(() => {
        if (pstinstSearchState.length > 0) {
            setPageState(prevState => ({
                ...prevState,
                searchFocus: 0,
            }))
        }
    }, [pstinstSearchState])

    // 엔테키 입력시 다름 검색어로 스크롤.
    useEffect(() => {
        const funcSetSearchFocus = () => {
            if (pageState.searchFocus === null) return
            const refIndex = pstinstSearchState[pageState.searchFocus]

            inputRef.current[refIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }

        if (pstinstSearchState.length > 0 && pageState.searchFocus !== null) {
            funcSetSearchFocus()
        }
    }, [pageState.searchFocus, pstinstSearchState])

    //clean...........
    useEffect(() => {
        return () => {
            setPageState(prevState => ({
                ...prevState,
                loading: false,
                PSTINST_INFO_LIST: initializeState.PSTINST_INFO_LIST,
                searchValue: initializeState.searchValue,
                searchFocus: initializeState.searchFocus,
            }))
        }
    }, [showModal])

    // 보이는 타입 처리
    useEffect(() => {
        const funcSetModalByType = () => {
            if (SelectorType === 'OnlyModal' && !showModal) {
                handleShowModal(true)
            }
        }

        funcSetModalByType()
    }, [SelectorType, handleShowModal, showModal])

    return (
        <>
            {SelectorType && SelectorType === 'input' && (
                <SearchSelect
                    id={`id`}
                    name={`name`}
                    autoComplete={`autoComplete`}
                    handleOnFocus={() => handleShowModal(true)}
                    elements={
                        pageState.selectElements && pageState.selectElements
                    }
                />
            )}
            {showModal && (
                <VaryModal
                    ModalLoading={pageState.loading}
                    Children={
                        <>
                            <InputWapper>
                                <VaryInput
                                    InputType={`search`}
                                    Placeholder={`검색어를 입력해 주세요`}
                                    HandleOnChange={handleSearchInputOnChange}
                                    Value={pageState.searchValue}
                                    HandleOnKeyDown={handleSearchInputOnKeyDown}
                                />
                            </InputWapper>
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
                                                step1: PstinstInfoItemType,
                                                step1Index: number
                                            ) => {
                                                return (
                                                    <TableBodyRow
                                                        key={`pstinst-selector-table-row-item-${step1Index}`}
                                                        BgState={true}>
                                                        <TableBodyCell>
                                                            <ItemWapper>
                                                                <ItemCheckBox
                                                                    ref={el =>
                                                                        (inputRef.current[
                                                                            step1.INST_NO
                                                                        ] = el as HTMLInputElement)
                                                                    }
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
                                                                    <ItemLavelText
                                                                        BgState={
                                                                            step1.checkSearch
                                                                        }>
                                                                        {
                                                                            step1.INST_NM_1
                                                                        }
                                                                    </ItemLavelText>
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
                                                                                        ref={el =>
                                                                                            (inputRef.current[
                                                                                                step2.INST_NO
                                                                                            ] =
                                                                                                el as HTMLInputElement)
                                                                                        }
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
                                                                                        <ItemLavelText
                                                                                            BgState={
                                                                                                step2.checkSearch
                                                                                            }>
                                                                                            {
                                                                                                step2.INST_NM_2
                                                                                            }
                                                                                        </ItemLavelText>
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
                                                                                        ref={el =>
                                                                                            (inputRef.current[
                                                                                                step3.INST_NO
                                                                                            ] =
                                                                                                el as HTMLInputElement)
                                                                                        }
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
                                                                                        <ItemLavelText
                                                                                            BgState={
                                                                                                step3.checkSearch
                                                                                            }>
                                                                                            {
                                                                                                step3.INST_NM_3
                                                                                            }
                                                                                        </ItemLavelText>
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
                        </>
                    }
                    Buttons={
                        <>
                            <DefaultManageButton
                                ButtonClick={() => handleCLickCancleButton()}
                                ButtonName={'취소'}
                            />

                            {SelectorType === 'OnlyModal' && (
                                <DefaultManageButton
                                    ButtonClick={() => handleCLickApplyButton()}
                                    ButtonName={'확인'}
                                />
                            )}
                        </>
                    }
                />
            )}
        </>
    )
}

export default PstinstSelector
