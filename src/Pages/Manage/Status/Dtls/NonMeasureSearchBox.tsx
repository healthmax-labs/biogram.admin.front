import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryLabelCheckBox,
    VaryLabel,
    VaryInput,
    VaryLabelRadioButton,
} from '@Elements'

import { useRecoilState } from 'recoil'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import Codes from '@Codes'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    SearchItem,
    SearchItemGap,
    RightSearchButton,
} = SearchBoxStyle

const NonMeasureSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [nonMeasureListState, setNonMeasureListState] =
        useRecoilState(NonMeasureListState)

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
                                    setNonMeasureListState(prevState => ({
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
                                id={'id'}
                                Placeholder={'검색어'}
                                Value={nonMeasureListState.search.SEARCH_KEY}
                                HandleOnChange={e =>
                                    setNonMeasureListState(prevState => ({
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
                            <VaryLabel LabelName={`측정일자`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                Width={'w40'}
                                InputeType={`search`}
                                Value={
                                    nonMeasureListState.search.MESURE_DT
                                        ? changeDatePickerDate(
                                              nonMeasureListState.search
                                                  .MESURE_DT
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            MESURE_DT: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper ColSpan={true}>
                        <SearchLabel>
                            <VaryLabel LabelName={`측정`} />
                        </SearchLabel>
                        <SearchItemGap>
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.BP_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BP_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`혈압`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.BS_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BS_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`혈당`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.BC_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BC_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`콜레스테롤`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.HA_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            HA_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`당화혈색소`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.IS_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            IS_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`체성분`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.SR_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SR_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`스트레스`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={
                                    nonMeasureListState.search.SB_NTCN_AT ===
                                    'Y'
                                }
                                HandleOnChange={e => {
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SB_NTCN_AT: e.target.checked
                                                ? 'Y'
                                                : 'N',
                                        },
                                    }))
                                }}
                                LabelName={`뇌기능`}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`직종구분`} />
                        </SearchLabel>
                        <SearchItemGap>
                            {Codes.etc.workType.list.map((work, index) => {
                                return (
                                    <VaryLabelCheckBox
                                        key={`status-non-measure-search-work-type-checkbox-${index}`}
                                        LabelWidth={'wMin'}
                                        Checked={
                                            nonMeasureListState.search
                                                .WORK_TY_CODE === work.code
                                        }
                                        HandleOnChange={() => {
                                            setNonMeasureListState(
                                                prevState => ({
                                                    ...prevState,
                                                    search: {
                                                        ...prevState.search,
                                                        WORK_TY_CODE: work.code,
                                                    },
                                                })
                                            )
                                        }}
                                        LabelName={`${work.name}`}
                                    />
                                )
                            })}
                        </SearchItemGap>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItemGap>
                            {[3, 7, 30, 90].map((day, index) => {
                                return (
                                    <VaryLabelRadioButton
                                        key={`status-non-measure-search-day-checkbox-${index}`}
                                        LabelName={`${day}일`}
                                        Checked={
                                            nonMeasureListState.search
                                                .BF_N_MESURE_DAY === day
                                        }
                                        HandleOnChange={e => {
                                            if (e.target.checked) {
                                                setNonMeasureListState(
                                                    prevState => ({
                                                        ...prevState,
                                                        search: {
                                                            ...prevState.search,
                                                            BF_N_MESURE_DAY:
                                                                day,
                                                        },
                                                    })
                                                )
                                            }
                                        }}
                                    />
                                )
                            })}
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default NonMeasureSearchBox
