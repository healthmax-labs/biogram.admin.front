import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import {
    DatepickerInput,
    DefaultSearchButton,
    PstinstSelector,
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

export default function SearchBox() {
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
