import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'

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

const MemberListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(MemberListState)

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
                                HandleSelectValue={({ instNo }) =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            instNo: String(instNo),
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`가입일자`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    listState.search.registDtFrom
                                        ? changeDatePickerDate(
                                              listState.search.registDtFrom
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            registDtFrom: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    listState.search.registDtTo
                                        ? changeDatePickerDate(
                                              listState.search.registDtTo
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            registDtTo: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
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
                                Width={'w60'}
                                HandleOnChange={e =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            searchKey: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                                Value={
                                    isNull(listState.search.searchKey)
                                        ? ''
                                        : listState.search.searchKey
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default MemberListSearchBox
