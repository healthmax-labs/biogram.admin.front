import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { gmtTimeToTimeObject } from '@Helper'
import {
    PstinstSelector,
    // VaryButton,
    VaryInput,
    VaryDatepickerInput,
    VaryLabel,
    DefaultSearchButton,
} from '@Elements'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    DatepickerLine,
    SearchItem,
    RightSearchButton,
} = SearchBoxStyle

const NonMeasureSearchBox = () => {
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
                                HandleSelectValue={({ instNo, instNm }) =>
                                    console.debug(instNo, instNm)
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
                                HandleOnChange={e => console.debug(e)}
                                id={'id'}
                                Placeholder={'검색어'}
                                Value={
                                    'sch api연결'
                                    // isNull(instJoinListState.search.SEARCH_KEY)
                                    //     ? ''
                                    //     : instJoinListState.search.SEARCH_KEY
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={new Date()}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    console.debug(year, monthPad, dayPad)
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={new Date()}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    console.debug(year, monthPad, dayPad)
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton
                    ButtonClick={() => console.log('api 연결')}
                />
            </RightSearchButton>
        </RowContainer>
    )
}

export default NonMeasureSearchBox
