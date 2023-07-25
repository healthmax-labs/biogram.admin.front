import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VarySelectBox,
} from '@Elements'
import { useRecoilState } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import Codes from '@Codes'
import _ from 'lodash'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

const ConsultListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(ConsultListState)

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
                                    value: listState.search.instNo
                                        ? Number(listState.search.instNo)
                                        : null,
                                    text: listState.search.instNm
                                        ? listState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            instNo: String(instNo),
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
                                HandleOnChange={e =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            searchKey: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'이름/아이디/휴대폰번호'}
                                Value={
                                    _.isNull(listState.search.searchKey)
                                        ? ''
                                        : listState.search.searchKey
                                }
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
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
                                                    LabelWidth={`wMin`}
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
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`그룹명`} />
                        </SearchLabel>
                        <SearchItem>
                            <VarySelectBox
                                Width={`w60`}
                                ContentsType={`search`}
                                PlaceholderDisable={false}
                                Placeholder={`그룹명을 선택해 주세요.`}
                                Value={listState.search.groupNo}
                                Elements={_.map(listState.group, group => {
                                    return {
                                        value: group.CNST_GRP_NO,
                                        text: group.CNST_GRP_NM,
                                    }
                                })}
                                HandleOnChange={e => {
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            groupNo: e.value,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper></SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default ConsultListSearchBox
