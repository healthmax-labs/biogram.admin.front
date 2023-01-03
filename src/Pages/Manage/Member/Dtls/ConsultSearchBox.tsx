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
import { ConsultListState } from '@Recoil/MemberPagesState'
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

const ConsultSearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [listState, setListState] = useRecoilState(ConsultListState)

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
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    listState.search.startDt
                                        ? changeDatePickerDate(
                                              listState.search.startDt
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
                                            startDt: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    listState.search.endDt
                                        ? changeDatePickerDate(
                                              listState.search.endDt
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
                                            endDt: `${year}${monthPad}${dayPad}`,
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
                                Width={'w64'}
                                HandleOnChange={e => console.debug(e)}
                                id={'id'}
                                Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                                Value={``}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper ColSpan={true}>
                        <SearchLabel>
                            <VaryLabel LabelName={`요인`} />
                        </SearchLabel>
                        <SearchItem>
                            <WapperStyle.FlexNoWarapGap>
                                {(() => {
                                    const items = Codes.riksCode
                                        .filter(e => e.key === 'riks')
                                        .shift()

                                    if (items && items.list) {
                                        return items.list.map((el, index) => {
                                            const riskFctrs = listState.search
                                                .riskFctr
                                                ? listState.search.riskFctr
                                                      .split(',')
                                                      .map(element =>
                                                          element.trim()
                                                      )
                                                : []

                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    key={`consult-search-box-risk-checkbox-${index}`}
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
                                                            const newRiskFctrs =
                                                                [
                                                                    ...riskFctrs,
                                                                    el.code,
                                                                ]
                                                            setListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        riskFctr:
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
                                                            setListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        riskFctr:
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
                    <SearchItemWapper></SearchItemWapper>
                    <SearchItemWapper></SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default ConsultSearchBox
