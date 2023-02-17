import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import {
    changeDatePickerDate,
    gmtTimeToTimeObject,
    getNowDate,
    getDateMonthUnit,
} from '@Helper'
import Codes from '@Codes'
import { useEffect, useState } from 'react'
import _ from 'lodash'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    DatepickerLine,
    SearchItem,
    SearchItemGap,
    RightSearchButton,
} = SearchBoxStyle

const initializeState = {
    button: {
        dateUnits: `1`,
    },
}

const AnalyticsSearchBox = ({
    SearchType,
    HandleGetList,
    HandleInstNo,
    StartDate,
    HandleStartDate,
    EndDate,
    HandleEndDate,
    AgeGroup,
    HandleAgeGroup,
    Cycle,
    HandleCycle,
}: {
    SearchType: 'default' | 'healthIndicators'
    HandleGetList: () => void
    HandleInstNo: (instNo: number) => void
    StartDate: string
    HandleStartDate: (startDate: string) => void
    EndDate: string
    HandleEndDate: (startDate: string) => void
    AgeGroup: string[]
    HandleAgeGroup: (age: string[]) => void
    Cycle: string
    HandleCycle: (cycle: string) => void
}) => {
    const [pageState, setPageState] = useState<{
        button: {
            dateUnits: string
        }
    }>(initializeState)

    useEffect(() => {
        const funcDateUnitsButtonCheck = () => {
            if (StartDate === getDateMonthUnit(1)) {
                setPageState(prevState => ({
                    ...prevState,
                    button: {
                        ...prevState.button,
                        dateUnits: `1`,
                    },
                }))
            } else if (StartDate === getDateMonthUnit(3)) {
                setPageState(prevState => ({
                    ...prevState,
                    button: {
                        ...prevState.button,
                        dateUnits: `3`,
                    },
                }))
            } else if (StartDate === getDateMonthUnit(6)) {
                setPageState(prevState => ({
                    ...prevState,
                    button: {
                        ...prevState.button,
                        dateUnits: `6`,
                    },
                }))
            } else if (StartDate === getDateMonthUnit(12)) {
                setPageState(prevState => ({
                    ...prevState,
                    button: {
                        ...prevState.button,
                        dateUnits: `12`,
                    },
                }))
            }
        }

        if (EndDate === getNowDate()) {
            funcDateUnitsButtonCheck()
        }
    }, [StartDate, EndDate])

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
                                HandleSelectValue={({ instNo }) => {
                                    HandleInstNo(instNo)
                                }}
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
                                Value={changeDatePickerDate(StartDate)}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    HandleStartDate(
                                        `${year}${monthPad}${dayPad}`
                                    )
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={changeDatePickerDate(EndDate)}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    HandleEndDate(`${year}${monthPad}${dayPad}`)
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`빠른설정`} />
                        </SearchLabel>
                        <SearchItemGap>
                            {Codes.etc.dateUnits.list.map((e, index) => {
                                return (
                                    <VaryButton
                                        key={`analytics-search-box-search-date-unit-button-item-${index}`}
                                        ButtonType={`button`}
                                        ButtonName={e.name}
                                        Active={
                                            pageState.button.dateUnits ===
                                            e.code
                                        }
                                        HandleClick={() => {
                                            HandleStartDate(
                                                getDateMonthUnit(Number(e.code))
                                            )
                                            HandleEndDate(getNowDate())
                                        }}
                                    />
                                )
                            })}
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
                {SearchType === 'default' && (
                    <SearchItemRow>
                        <SearchItemWapper ColSpan={true}>
                            <SearchLabel>
                                <VaryLabel LabelName={`연령`} />
                            </SearchLabel>
                            <SearchItemGap>
                                <VaryLabelCheckBox
                                    LabelWidth={'wMin'}
                                    Checked={
                                        AgeGroup.length ===
                                        Codes.ageGroup.list.length
                                    }
                                    HandleOnChange={e => {
                                        if (e.target.checked) {
                                            HandleAgeGroup(
                                                Codes.ageGroup.list.map(
                                                    e => e.code
                                                )
                                            )
                                        } else {
                                            HandleAgeGroup([])
                                        }
                                    }}
                                    LabelName={`전체`}
                                />
                                {Codes.ageGroup.list.map((age, index) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`analytics-search-box-search-age-group-button-item-${index}`}
                                            LabelWidth={'wMin'}
                                            LabelName={`${age.name}`}
                                            Checked={_.includes(
                                                AgeGroup,
                                                age.key
                                            )}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    HandleAgeGroup([
                                                        ...AgeGroup,
                                                        age.code,
                                                    ])
                                                } else {
                                                    HandleAgeGroup(
                                                        _.filter(
                                                            AgeGroup,
                                                            ag => ag !== age.key
                                                        )
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                })}
                            </SearchItemGap>
                        </SearchItemWapper>
                        <SearchItemWapper>
                            <SearchLabel>
                                <VaryLabel LabelName={`주기`} />
                            </SearchLabel>
                            <SearchItemGap>
                                {Codes.etc.cycleCode.list.map((e, index) => {
                                    return (
                                        <VaryButton
                                            key={`analytics-search-box-search-cyucle-button-item-${index}`}
                                            ButtonType={`button`}
                                            ButtonName={e.name}
                                            Active={Cycle === e.code}
                                            HandleClick={() => {
                                                HandleCycle(e.code)
                                            }}
                                        />
                                    )
                                })}
                            </SearchItemGap>
                        </SearchItemWapper>
                    </SearchItemRow>
                )}
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default AnalyticsSearchBox
