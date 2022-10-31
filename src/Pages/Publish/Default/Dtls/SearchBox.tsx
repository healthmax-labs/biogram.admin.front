import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/PublishPageStyle'
import { DefaultSearchButton } from '@Element/Buttons'
import { DatepickerInput } from '@Element/Inputs'
import { PstinstSelector } from '@Element/Features'

const {
    DatepickerLine,
    Item,
    LabelItem,
    Label,
    LabelItemBox,
    LabelText,
    SearchButtonBox,
    Input,
    Wapper,
    Relative,
    Container,
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
                        <PstinstSelector />
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
                        <div className="flex flex-row">
                            <DatepickerInput />
                            <DatepickerLine>~</DatepickerLine>
                            <DatepickerInput />
                        </div>
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
