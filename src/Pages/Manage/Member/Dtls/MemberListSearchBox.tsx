import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [listState, setListState] = useRecoilState(MemberListState)

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
                                                instNo: instNo
                                                    ? String(instNo)
                                                    : ``,
                                                instNm: instNm ? instNm : ``,
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
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default MemberListSearchBox
