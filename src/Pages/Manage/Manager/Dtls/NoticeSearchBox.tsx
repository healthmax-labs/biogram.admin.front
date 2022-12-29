import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryLabel } from '@Elements'

const { Container, SearchWapper, SearchItemWapper, SearchLabel, SearchButton } =
    SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const SelectBox = () => {
        //TRGET_SVC_CODE	A:전체, 1:공지, 2:보도자료, 3:웹, 4:안드로이드, 5:아이폰, 6:안드로이드&아이폰
        return (
            <select>
                <option key="A" value="A">
                    전체
                </option>
                <option key="1" value="1">
                    공지
                </option>
                <option key="2" value="2">
                    보도자료
                </option>
                <option key="3" value="3">
                    웹
                </option>
                <option key="4" value="4">
                    안드로이드
                </option>
                <option key="5" value="5">
                    아이폰
                </option>
                <option key="6" value="6">
                    아이폰,안드로이드
                </option>
            </select>
        )
    }
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`유형:`} />
                    </SearchLabel>
                    <SelectBox />
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox
