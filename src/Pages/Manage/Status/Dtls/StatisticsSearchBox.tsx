import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
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
                    <SearchItem>
                        {(() => {
                            const items = Codes.riksCode
                                .filter(e => e.key === 'riksDctr')
                                .shift()
                            if (items && items.list) {
                                return items.list.map((el, i) => {
                                    const riskFctrs = statisticsListState.search
                                        .RISK_FCTR
                                        ? statisticsListState.search.RISK_FCTR.split(
                                              ','
                                          ).map(element => element.trim())
                                        : []

                                    return (
                                        <div
                                            className="pr-1"
                                            key={`risk-fctr-search-box-tisk-item-${i}`}>
                                            <VaryLabelCheckBox
                                                LabelName={`${el.name}`}
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
                                        </div>
                                    )
                                })
                            }
                        })()}
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`기간:`} />
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
