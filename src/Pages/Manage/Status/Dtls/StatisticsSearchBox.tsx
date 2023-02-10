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
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    DatepickerLine,
    SearchItem,
} = SearchBoxStyle

const StatisticsSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)
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
                                    setStatisticsListState(prevState => ({
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
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`검색어`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={e =>
                                    setStatisticsListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH_KEY: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'검색어'}
                                Value={
                                    isNull(
                                        statisticsListState.search.SEARCH_KEY
                                    )
                                        ? ''
                                        : statisticsListState.search.SEARCH_KEY
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
                                    statisticsListState.search.BEGIN_DE
                                        ? changeDatePickerDate(
                                              statisticsListState.search
                                                  .BEGIN_DE
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
                                InputeType={`search`}
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
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`측정기기`} />
                        </SearchLabel>
                        <SearchItem>
                            <WapperStyle.FlexNoWarapGap>
                                {(() => {
                                    const items =
                                        Codes.StatisticsDeviceCode.filter(
                                            e => e.key === 'devices'
                                        ).shift()
                                    if (items && items.list) {
                                        return items.list.map((el, index) => {
                                            const mesureCode =
                                                statisticsListState.search
                                                    .MESURE_CODE
                                                    ? statisticsListState.search.MESURE_CODE.split(
                                                          ','
                                                      ).map(element =>
                                                          element.trim()
                                                      )
                                                    : []

                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    key={`statistics-search-box-riksdctr-item-${index}`}
                                                    Checked={
                                                        mesureCode.findIndex(
                                                            e => e === el.code
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (
                                                            mesureCode &&
                                                            e.target.checked
                                                        ) {
                                                            const newMesureCode =
                                                                [
                                                                    ...mesureCode,
                                                                    el.code,
                                                                ]
                                                            setStatisticsListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        MESURE_CODE:
                                                                            newMesureCode.join(
                                                                                ','
                                                                            ),
                                                                    },
                                                                })
                                                            )
                                                        } else if (
                                                            mesureCode &&
                                                            !e.target.checked
                                                        ) {
                                                            const newMesureCode =
                                                                mesureCode.filter(
                                                                    e =>
                                                                        e !==
                                                                        el.code
                                                                )
                                                            setStatisticsListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        MESURE_CODE:
                                                                            newMesureCode.join(
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
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default StatisticsSearchBox
