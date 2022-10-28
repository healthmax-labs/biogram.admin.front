import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import { DefaultSearchButton } from '@Element/Buttons'
import { DatepickerInput } from '@Element/Inputs'

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
    Select,
    Container,
    Relative,
} = SearchBoxStyle

export default function SearchBox() {
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
                        <Select
                            id="country"
                            name="country"
                            autoComplete="country">
                            <option>소속 선택</option>
                        </Select>
                    </LabelItemBox>
                </Item>
                <Item></Item>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>가입일자 :</LabelText>
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
