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
    InstSelectElement,
}: {
    SearchType: 'default' | 'healthIndicators'
    HandleGetList: () => void
    HandleInstNo: (instNo: number, instNm: string) => void
    StartDate: string
    HandleStartDate: (startDate: string) => void
    EndDate: string
    HandleEndDate: (startDate: string) => void
    AgeGroup?: string[]
    HandleAgeGroup?: (age: string[]) => void
    Cycle?: string
    HandleCycle?: (cycle: string) => void
    InstSelectElement: {
        instNo: number | null
        instNm: string | null
    }
}) => {
    const [pageState, setPageState] = useState<{
        button: {
            dateUnits: string
        }
    }>(initializeState)

    useEffect(() => {
        const startDate = changeDatePickerDate(StartDate)
        const endDate = changeDatePickerDate(EndDate)
        const btDay: number = endDate.getTime() - startDate.getTime()
        const cMonth: number = 24 * 60 * 60 * 1000 * 30
        const result: number = btDay / cMonth

        setPageState(prevState => ({
            ...prevState,
            button: {
                ...prevState.button,
                dateUnits: `${parseInt(String(result))}`,
            },
        }))
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
                                SelectElement={{
                                    value: InstSelectElement.instNo
                                        ? Number(InstSelectElement.instNo)
                                        : null,
                                    text: InstSelectElement.instNm
                                        ? InstSelectElement.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) => {
                                    HandleInstNo(instNo, instNm)
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
                                                getDateMonthUnit(
                                                    changeDatePickerDate(
                                                        EndDate
                                                    ),
                                                    Number(e.code)
                                                )
                                            )
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
                            {AgeGroup && HandleAgeGroup && (
                                <>
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
                                        {Codes.ageGroup.list.map(
                                            (age, index) => {
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
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                HandleAgeGroup([
                                                                    ...AgeGroup,
                                                                    age.code,
                                                                ])
                                                            } else {
                                                                HandleAgeGroup(
                                                                    _.filter(
                                                                        AgeGroup,
                                                                        ag =>
                                                                            ag !==
                                                                            age.key
                                                                    )
                                                                )
                                                            }
                                                        }}
                                                    />
                                                )
                                            }
                                        )}
                                    </SearchItemGap>
                                </>
                            )}
                        </SearchItemWapper>
                        <SearchItemWapper>
                            {HandleCycle && (
                                <>
                                    <SearchLabel>
                                        <VaryLabel LabelName={`주기`} />
                                    </SearchLabel>
                                    <SearchItemGap>
                                        {Codes.etc.cycleCode.list.map(
                                            (e, index) => {
                                                return (
                                                    <VaryButton
                                                        key={`analytics-search-box-search-cyucle-button-item-${index}`}
                                                        ButtonType={`button`}
                                                        ButtonName={e.name}
                                                        Active={
                                                            Cycle === e.code
                                                        }
                                                        HandleClick={() => {
                                                            HandleCycle(e.code)
                                                        }}
                                                    />
                                                )
                                            }
                                        )}
                                    </SearchItemGap>
                                </>
                            )}
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
