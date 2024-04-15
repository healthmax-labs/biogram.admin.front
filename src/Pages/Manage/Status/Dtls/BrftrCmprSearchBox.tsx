import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'
import {
    changeDatePickerDate,
    dateInsertHypen,
    getDateMonthUnit,
    gmtTimeToTimeObject,
} from '@Helper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    DatepickerLine,
    SearchItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [brftrCmprListState, setBrftrCmprListState] =
        useRecoilState(BrftrCmprListState)

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        HandleGetList()
    }

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`소속`} />
                        </SearchLabel>
                        <SearchItem>
                            <PstinstSelector
                                SelectElement={{
                                    value: brftrCmprListState.search.INST_NO
                                        ? Number(
                                              brftrCmprListState.search.INST_NO
                                          )
                                        : null,
                                    text: brftrCmprListState.search.instNm
                                        ? brftrCmprListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setBrftrCmprListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: instNo
                                                ? String(instNo)
                                                : ``,
                                            instNm: instNm ? instNm : ``,
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`검색어`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={e =>
                                    setBrftrCmprListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH_KEY: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'이름/아이디/휴대폰번호'}
                                Value={
                                    isNull(brftrCmprListState.search.SEARCH_KEY)
                                        ? ''
                                        : brftrCmprListState.search.SEARCH_KEY
                                }
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                MinDate={
                                    new Date(
                                        dateInsertHypen(
                                            getDateMonthUnit(
                                                changeDatePickerDate(
                                                    brftrCmprListState.search
                                                        .ENDDE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
                                InputeType={`search`}
                                Value={
                                    brftrCmprListState.search.BGNDE
                                        ? changeDatePickerDate(
                                              brftrCmprListState.search.BGNDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setBrftrCmprListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BGNDE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    brftrCmprListState.search.ENDDE
                                        ? changeDatePickerDate(
                                              brftrCmprListState.search.ENDDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setBrftrCmprListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            ENDDE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox
