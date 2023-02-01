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
import { useRecoilState } from 'recoil'
import { ImprvmAnalyticsListState } from '@Recoil/AnalyticsPagesState'

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

const HealthIndicatorsSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(ImprvmAnalyticsListState)

    console.log(listState)
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
                                            INST_NO: String(instNo),
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default HealthIndicatorsSearchBox
