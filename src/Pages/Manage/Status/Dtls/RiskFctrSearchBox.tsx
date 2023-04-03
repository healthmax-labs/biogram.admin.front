import React from 'react'

import { SearchBoxStyle, WapperStyle as WS } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryLabelRadioButton,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
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

const RiskFctrSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)

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
                                    setRiskFctrListState(prevState => ({
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
                                Placeholder={'검색어'}
                                Value={
                                    isNull(riskFctrListState.search.SEARCH_KEY)
                                        ? ''
                                        : riskFctrListState.search.SEARCH_KEY
                                }
                                HandleOnChange={e =>
                                    setRiskFctrListState(prevState => ({
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
                                    riskFctrListState.search.BGNDE
                                        ? changeDatePickerDate(
                                              riskFctrListState.search.BGNDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setRiskFctrListState(prevState => ({
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
                                    riskFctrListState.search.ENDDE
                                        ? changeDatePickerDate(
                                              riskFctrListState.search.ENDDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setRiskFctrListState(prevState => ({
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
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`요인`} />
                        </SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                {(() => {
                                    const items = Codes.riksCode
                                        .filter(e => e.key === 'riksDctr')
                                        .shift()
                                    if (items && items.list) {
                                        return items.list.map((el, index) => {
                                            const riskFctrs = riskFctrListState
                                                .search.RISK_FCTR
                                                ? riskFctrListState.search.RISK_FCTR.split(
                                                      ','
                                                  ).map(element =>
                                                      element.trim()
                                                  )
                                                : []

                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    LabelWidth={`wMin`}
                                                    key={`risk-fctr-search-box-risk-fctr-item-${index}`}
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
                                                            setRiskFctrListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        RISK_FCTR_CNT:
                                                                            '',
                                                                        RISK_FCTR:
                                                                            newRiskFctrs.join(
                                                                                ','
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
                                                            setRiskFctrListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        RISK_FCTR_CNT:
                                                                            '',
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
                            </WS.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`위험군별`} />
                        </SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                {(() => {
                                    const items = Codes.riksCode
                                        .filter(e => e.key === 'riskFctrCnt')
                                        .shift()
                                    if (items && items.list) {
                                        return items.list.map((el, elIndex) => {
                                            return (
                                                <VaryLabelRadioButton
                                                    LabelWidth={`wMin`}
                                                    key={`risk-fctr-search-box-risk-fctr-cnt-item-${elIndex}`}
                                                    LabelName={`${el.name}`}
                                                    Checked={
                                                        riskFctrListState.search
                                                            .RISK_FCTR_CNT ===
                                                        el.code
                                                    }
                                                    HandleOnChange={e => {
                                                        if (e.target.checked) {
                                                            setRiskFctrListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        RISK_FCTR:
                                                                            'WS,BP,BS,TG,HD',
                                                                        RISK_FCTR_CNT:
                                                                            el.code,
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        })
                                    }

                                    return <></>
                                })()}
                            </WS.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`복약`} />
                        </SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                {(() => {
                                    const items = Codes.riksCode
                                        .filter(e => e.key === 'takngMdcin')
                                        .shift()
                                    if (items && items.list) {
                                        return items.list.map((el, index) => {
                                            const takngMdcin = riskFctrListState
                                                .search.TAKNG_MDCIN
                                                ? riskFctrListState.search.TAKNG_MDCIN.split(
                                                      ','
                                                  ).map(element =>
                                                      element.trim()
                                                  )
                                                : []

                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    key={`risk-fctr-search-box-risks-takng-mdcin-item-${index}`}
                                                    LabelWidth={`wMin`}
                                                    Checked={
                                                        takngMdcin.findIndex(
                                                            e => e === el.code
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (
                                                            takngMdcin &&
                                                            e.target.checked
                                                        ) {
                                                            const newTakngMdcin =
                                                                [
                                                                    ...takngMdcin,
                                                                    el.code,
                                                                ]
                                                            setRiskFctrListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        TAKNG_MDCIN:
                                                                            newTakngMdcin.join(
                                                                                ', '
                                                                            ),
                                                                    },
                                                                })
                                                            )
                                                        } else if (
                                                            takngMdcin &&
                                                            !e.target.checked
                                                        ) {
                                                            const newTakngMdcin =
                                                                takngMdcin.filter(
                                                                    e =>
                                                                        e !==
                                                                        el.code
                                                                )
                                                            setRiskFctrListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        TAKNG_MDCIN:
                                                                            newTakngMdcin.join(
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
                            </WS.FlexNoWarapGap>
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
export default RiskFctrSearchBox
