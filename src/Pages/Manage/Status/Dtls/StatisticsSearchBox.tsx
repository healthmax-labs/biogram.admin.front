import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { DefaultCheckBox } from '@Element/index'
import { gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchItem,
    DatepickerLine,
    SearchButton,
    LabelItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속:`} />
                    </SearchLabel>
                    <PstinstSelector
                        HandleSelectValue={({ instNo }) =>
                            setStatisticsListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    instNo: String(instNo),
                                },
                            }))
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`요인:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <DefaultCheckBox />
                        허리둘레
                        <DefaultCheckBox />
                        혈압
                        <DefaultCheckBox />
                        TG
                        <DefaultCheckBox />
                        HDL
                    </LabelItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`기간:`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setStatisticsListState(prevState => ({
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
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setStatisticsListState(prevState => ({
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
                        <VaryLabel LabelName={`검색어:`} />
                    </SearchLabel>
                    <VaryInput
                        ContentsType={`search`}
                        Width={'w64'}
                        HandleOnChange={e =>
                            setStatisticsListState(prevState => ({
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
                            isNull(statisticsListState.search.SEARCH_KEY)
                                ? ''
                                : statisticsListState.search.SEARCH_KEY
                        }
                    />
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox
