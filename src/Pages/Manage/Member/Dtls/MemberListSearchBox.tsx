import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

const MemberListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(MemberListState)

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`소속`} />
                        </SearchLabel>
                        <SearchItem>
                            <div className="flex w-full">
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
                            </div>
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
                                    isNull(listState.search.searchKey)
                                        ? ''
                                        : listState.search.searchKey
                                }
                            />
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
export default MemberListSearchBox
