import React, { KeyboardEvent } from 'react'
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
import {
    changeDatePickerDate,
    getDateMonthUnit,
    gmtTimeToTimeObject,
    dateInsertHypen,
} from '@Helper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import Codes from '@Codes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        HandleGetList()
    }

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
                                    value: riskFctrListState.search.INST_NO
                                        ? Number(
                                              riskFctrListState.search.INST_NO
                                          )
                                        : null,
                                    text: riskFctrListState.search.instNm
                                        ? riskFctrListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setRiskFctrListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: instNo
                                                ? String(instNo)
                                                : ``,
                                            instNm: instNm ? instNm : ``,
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
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
                            />
                        </SearchItem>
                    </SearchItemWapper>

                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                MinDate={
                                    new Date(
                                        dateInsertHypen(
                                            getDateMonthUnit(
                                                changeDatePickerDate(
                                                    riskFctrListState.search
                                                        .ENDDE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
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
            <RightSearchButton
                Item={'end'}
                WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default RiskFctrSearchBox
