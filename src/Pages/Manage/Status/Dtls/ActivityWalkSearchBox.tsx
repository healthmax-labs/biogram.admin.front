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
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
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
    const [activityWalkListState, setActivityWalkListState] = useRecoilState(
        ActivityWalkListState
    )

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
                                    value: activityWalkListState.search.INST_NO
                                        ? Number(
                                              activityWalkListState.search
                                                  .INST_NO
                                          )
                                        : null,
                                    text: activityWalkListState.search.instNm
                                        ? activityWalkListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setActivityWalkListState(prevState => ({
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
                                    setActivityWalkListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'이름/아이디/휴대폰번호'}
                                Value={
                                    isNull(activityWalkListState.search.SEARCH)
                                        ? ''
                                        : activityWalkListState.search.SEARCH
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
                                                    activityWalkListState.search
                                                        .END_DE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
                                InputeType={`search`}
                                Value={
                                    activityWalkListState.search.BEGIN_DE
                                        ? changeDatePickerDate(
                                              activityWalkListState.search
                                                  .BEGIN_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setActivityWalkListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BEGIN_DE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    activityWalkListState.search.END_DE
                                        ? changeDatePickerDate(
                                              activityWalkListState.search
                                                  .END_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setActivityWalkListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            END_DE: `${year}${monthPad}${dayPad}`,
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
