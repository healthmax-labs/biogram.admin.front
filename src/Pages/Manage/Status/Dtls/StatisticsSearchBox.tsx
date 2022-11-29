import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import {
    DatepickerInput,
    DefaultSearchButton,
    PstinstSelector,
    DefaultCheckBox,
} from '@Elements'

const {
    SearchButtonBox,
    DatepickerLine,
    Datepicker,
    Input,
    LabelText,
    LabelItem,
    Item,
    Label,
    LabelItemBox,
    Wapper,
    Container,
    Relative,
} = SearchBoxStyle

const SearchBox = () => {
    const handlePstinstSelect = ({
        instNo,
        instNm,
    }: {
        instNo: number
        instNm: string
    }) => {
        console.debug(instNo, instNm)
        //
    }
    return (
        <Container>
            <Wapper>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>소속 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <PstinstSelector
                            HandleSelectValue={({ instNo, instNm }) =>
                                handlePstinstSelect({
                                    instNo,
                                    instNm,
                                })
                            }
                        />
                    </LabelItemBox>
                </Item>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>요인 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <DefaultCheckBox />
                        체성분
                        <DefaultCheckBox />
                        혈압
                        <DefaultCheckBox />
                        혈당
                        <DefaultCheckBox />
                        콜레스테롤
                        <DefaultCheckBox />
                        스트레스
                        <DefaultCheckBox />
                        기타
                    </LabelItemBox>
                </Item>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>기간 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <Datepicker>
                            <DatepickerInput />
                            <DatepickerLine>~</DatepickerLine>
                            <DatepickerInput />
                        </Datepicker>
                    </LabelItemBox>
                </Item>
                <Item></Item>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>검색어 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <Input
                            type="search"
                            id="search-dropdown"
                            placeholder="ID / 이름 / 연락처 / 전화번호"
                            required
                        />
                    </LabelItemBox>
                </Item>
            </Wapper>
            <Relative>
                <SearchButtonBox>
                    <DefaultSearchButton
                        ButtonClick={() => console.debug('DefaultSearchButton')}
                    />
                </SearchButtonBox>
            </Relative>
        </Container>
    )
}
export default SearchBox
