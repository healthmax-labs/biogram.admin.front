import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
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
                                HandleSelectValue={() => {
                                    //
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
                                Width={'w40'}
                                HandleOnChange={() => {
                                    //
                                }}
                                id={'id'}
                                Placeholder={'검색어'}
                                Value={'sch api연결'}
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
                                CallBackReturn={() => {
                                    //
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={new Date()}
                                CallBackReturn={() => {
                                    //
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>

                    <RightSearchButton Item={'end'}>
                        <DefaultSearchButton
                            ButtonClick={() => {
                                //
                            }}
                        />
                    </RightSearchButton>
                </SearchItemRow>
            </SearchRowWapper>
        </RowContainer>
    )
}

export default NonMeasureSearchBox
