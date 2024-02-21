import React, {
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    DefaultSearchButton,
    VaryButton,
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
    SearchInputWapper,
    SearchInputGrow,
    SearchInputFlex,
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
    InputType,
    HandleSelectValue,
    HandleCancleClick,
    SelectElement,
}: {
    SelectorType?: 'input' | 'OnlyModal' | 'CloseModal'
    InputType?: 'search' | 'default'
    HandleCancleClick?: () => void
    HandleSelectValue: ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => void
    SelectElement?: {
        value: number | null
        text: string | null
    }
}) => {
    // ref...
    const enterInputRef = useRef<HTMLInputElement[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null) // 최초 검색창 focus

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

        if (SelectorType === 'input' || SelectorType === 'CloseModal') {
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

    const handleSearch = () => {
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

    // 엔터 키 입력 처리.
    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return

        handleSearch()
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

            enterInputRef.current[refIndex].scrollIntoView({
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
        if (searchInputRef.current !== null) {
            searchInputRef.current.focus()
        }

        const funcSetModalByType = () => {
            if (
                (SelectorType === 'OnlyModal' ||
                    SelectorType === 'CloseModal') &&
                !showModal
            ) {
                handleShowModal(true)
            }
        }

        funcSetModalByType()
    }, [SelectorType, handleShowModal, showModal])

    useEffect(() => {
        const funcSetSelectElement = ({
            value,
            text,
        }: {
            value: number
            text: string
        }) => {
            setPageState(prevState => ({
                ...prevState,
                selectElement: {
                    value: value,
                    text: text,
                },
            }))
        }

        if (
            pageState.PSTINST_INFO_LIST.list.length === 0 &&
            SelectElement &&
            SelectElement.value &&
            SelectElement.text
        ) {
            funcSetSelectElement({
                value: SelectElement.value,
                text: SelectElement.text,
            })
        }
        // FIXME : 종속성에서 pageState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectElement])

    return (
        <>
            {SelectorType && SelectorType === 'input' && (
                <VaryInput
                    ContentsType={InputType ? InputType : `search`}
                    Width={`w40`}
                    ReadOnly={true}
                    Placeholder={`소속을 선택해 주세요.`}
                    Value={
                        pageState.selectElement.text
                            ? pageState.selectElement.text
                            : ''
                    }
                    HandleOnFocus={() => handleShowModal(true)}
                />
            )}
            {showModal && (
                <VaryModal
                    ModalLoading={pageState.loading}
                    Children={
                        <>
                            <InputWapper>
                                <SearchInputWapper>
                                    <SearchInputGrow>
                                        <VaryInput
                                            Ref={searchInputRef}
                                            InputType={`search`}
                                            Placeholder={`검색어를 입력해 주세요`}
                                            HandleOnChange={
                                                handleSearchInputOnChange
                                            }
                                            Value={pageState.searchValue}
                                            HandleOnKeyDown={
                                                handleSearchInputOnKeyDown
                                            }
                                        />
                                    </SearchInputGrow>
                                    <SearchInputFlex>
                                        <DefaultSearchButton
                                            ButtonClick={() => {
                                                handleSearch()
                                            }}
                                        />
                                    </SearchInputFlex>
                                </SearchInputWapper>
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
                                                                    disabled={
                                                                        step1.CHK_INST_1 ===
                                                                        'N'
                                                                    }
                                                                    ref={el =>
                                                                        (enterInputRef.current[
                                                                            step1.INST_NO
                                                                        ] =
                                                                            el as HTMLInputElement)
                                                                    }
                                                                    id={`item-checkbox-step1-${step1.INST_NO_1}-${step1Index}`}
                                                                    type="checkbox"
                                                                    value={
                                                                        step1.INST_NO
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            step1.CHK_INST_1 ===
                                                                            'N'
                                                                        ) {
                                                                            return
                                                                        }
                                                                        handleItemClick(
                                                                            {
                                                                                instNo: step1.INST_NO,
                                                                                instNm: step1.INST_NM_1,
                                                                            }
                                                                        )
                                                                    }}
                                                                />
                                                                <ItemLabel
                                                                    htmlFor={`item-checkbox-step1-${step1.INST_NO_1}-${step1Index}`}>
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
                                                                                    key={`pstinst-selector-step2-item-key-${step2Index}`}>
                                                                                    <ItemCheckBox
                                                                                        disabled={
                                                                                            step2.CHK_INST_2 ===
                                                                                            'N'
                                                                                        }
                                                                                        ref={el =>
                                                                                            (enterInputRef.current[
                                                                                                step2.INST_NO
                                                                                            ] =
                                                                                                el as HTMLInputElement)
                                                                                        }
                                                                                        id={`pstinst-selector-step2-item-id-${step2.INST_NO_2}-${step2Index}`}
                                                                                        type="checkbox"
                                                                                        value={
                                                                                            step2.INST_NO
                                                                                        }
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                step2.CHK_INST_2 ===
                                                                                                'N'
                                                                                            ) {
                                                                                                return
                                                                                            }
                                                                                            handleItemClick(
                                                                                                {
                                                                                                    instNo: step2.INST_NO,
                                                                                                    instNm: step2.INST_NM_2,
                                                                                                }
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                    <ItemLabel
                                                                                        htmlFor={`pstinst-selector-step2-item-id-${step2.INST_NO_2}-${step2Index}`}>
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
                                                                                        disabled={
                                                                                            step3.CHK_INST_3 ===
                                                                                            'N'
                                                                                        }
                                                                                        ref={el =>
                                                                                            (enterInputRef.current[
                                                                                                step3.INST_NO
                                                                                            ] =
                                                                                                el as HTMLInputElement)
                                                                                        }
                                                                                        id={`pstinst-selector-step3-item-${step3.INST_NO_3}-${step3Index}`}
                                                                                        type="checkbox"
                                                                                        value={
                                                                                            step3.INST_NO
                                                                                        }
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                step3.CHK_INST_3 ===
                                                                                                'N'
                                                                                            ) {
                                                                                                return
                                                                                            }
                                                                                            handleItemClick(
                                                                                                {
                                                                                                    instNo: step3.INST_NO,
                                                                                                    instNm: step3.INST_NM_3,
                                                                                                }
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                    <ItemLabel
                                                                                        htmlFor={`pstinst-selector-step3-item-${step3.INST_NO_3}-${step3Index}`}>
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
                            <VaryButton
                                ButtonType={'default'}
                                HandleClick={() => handleCLickCancleButton()}
                                ButtonName={'취소'}
                            />

                            {SelectorType === 'OnlyModal' && (
                                <VaryButton
                                    ButtonType={'default'}
                                    HandleClick={() => handleCLickApplyButton()}
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
