import React from 'react'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import Codes from '@Codes'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchItem,
    DatepickerLine,
    SearchButton,
} = SearchBoxStyle

const StatisticsSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속`} />
                    </SearchLabel>
                    <SearchItem>
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
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`요인`} />
                    </SearchLabel>
                    <SearchItem>
                        <WapperStyle.FlexNoWarapGap>
                            {(() => {
                                const items = Codes.riksCode
                                    .filter(e => e.key === 'riksDctr')
                                    .shift()
                                if (items && items.list) {
                                    return items.list.map((el, index) => {
                                        const riskFctrs = statisticsListState
                                            .search.RISK_FCTR
                                            ? statisticsListState.search.RISK_FCTR.split(
                                                  ','
                                              ).map(element => element.trim())
                                            : []

                                        return (
                                            <VaryLabelCheckBox
                                                LabelName={`${el.name}`}
                                                key={`statistics-search-box-riksdctr-item-${index}`}
                                                Checked={
                                                    riskFctrs.findIndex(
                                                        e => e === el.code
                                                    ) > -1
                                                }
                                                HandleOnChange={e => {
                                                    if (
                                                        riskFctrs &&
                                                        e.target.checked
                                                    ) {
                                                        const newRiskFctrs = [
                                                            ...riskFctrs,
                                                            el.code,
                                                        ]
                                                        setStatisticsListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    RISK_FCTR:
                                                                        newRiskFctrs.join(
                                                                            ', '
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    } else if (
                                                        riskFctrs &&
                                                        !e.target.checked
                                                    ) {
                                                        const newRiskFctrs =
                                                            riskFctrs.filter(
                                                                e =>
                                                                    e !==
                                                                    el.code
                                                            )
                                                        setStatisticsListState(
                                                            prevState => ({
                                                                ...prevState,
                                                                search: {
                                                                    ...prevState.search,
                                                                    RISK_FCTR:
                                                                        newRiskFctrs.join(
                                                                            ','
                                                                        ),
                                                                },
                                                            })
                                                        )
                                                    }
                                                }}
                                            />
                                        )
                                    })
                                }
                            })()}
                        </WapperStyle.FlexNoWarapGap>
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`기간`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={
                                statisticsListState.search.BEGIN_DE
                                    ? changeDatePickerDate(
                                          statisticsListState.search.BEGIN_DE
                                      )
                                    : new Date()
                            }
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setStatisticsListState(prevState => ({
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
                            ContentsType={`search`}
                            Value={
                                statisticsListState.search.END_DE
                                    ? changeDatePickerDate(
                                          statisticsListState.search.END_DE
                                      )
                                    : new Date()
                            }
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setStatisticsListState(prevState => ({
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
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryInput
                            ContentsType={`search`}
                            Width={'w60'}
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
                    </SearchItem>
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default StatisticsSearchBox
