import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'

import { useRecoilState, useRecoilValue } from 'recoil'
import { HealthIndicatorsListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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

const HealthIndicatorsSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [healthIndicatorsListState, setHealthIndicatorsListState] =
        useRecoilState(HealthIndicatorsListState)

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
                                    value: healthIndicatorsListState.search
                                        .INST_NO
                                        ? Number(
                                              healthIndicatorsListState.search
                                                  .INST_NO
                                          )
                                        : null,
                                    text: healthIndicatorsListState.search
                                        .instNm
                                        ? healthIndicatorsListState.search
                                              .instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setHealthIndicatorsListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: String(instNo),
                                            instNm: instNm,
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
                                id={'id'}
                                Placeholder={'이름/아이디/휴대폰번호'}
                                Value={
                                    isNull(
                                        healthIndicatorsListState.search
                                            .SEARCH_KEY
                                    )
                                        ? ''
                                        : healthIndicatorsListState.search
                                              .SEARCH_KEY
                                }
                                HandleOnChange={e =>
                                    setHealthIndicatorsListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH_KEY: e.target.value,
                                        },
                                    }))
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
                                InputeType={`search`}
                                Value={
                                    healthIndicatorsListState.search.BGNDE
                                        ? changeDatePickerDate(
                                              healthIndicatorsListState.search
                                                  .BGNDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setHealthIndicatorsListState(prevState => ({
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
                                    healthIndicatorsListState.search.ENDDE
                                        ? changeDatePickerDate(
                                              healthIndicatorsListState.search
                                                  .ENDDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setHealthIndicatorsListState(prevState => ({
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
            <RightSearchButton
                Item={'end'}
                WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default HealthIndicatorsSearchBox
