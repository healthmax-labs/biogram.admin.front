import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
// import { gmtTimeToTimeObject } from '@Helper'
import {
    PstinstSelector,
    // VaryButton,
    // VaryDatepickerInput,
    VaryLabel,
    // VaryLabelCheckBox,
    DefaultSearchButton,
} from '@Elements'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    // DatepickerLine,
    SearchItem,
    // SearchItemGap,
} = SearchBoxStyle

const AnalyticsSearchBox = () => {
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

export default AnalyticsSearchBox
