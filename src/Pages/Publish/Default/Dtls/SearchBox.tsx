import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/PublishPageStyle'
import {
    DatepickerInput,
    DefaultSearchButton,
    PstinstSelector,
} from '@Elements'

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
    const handlePstinstSelect = ({}: { instNo: number; instNm: string }) => {
        //
    }
    return (
        <Container>
            <Wapper>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>소속</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <PstinstSelector
                            HandleSelectValue={({ instNo, instNm }) =>
                                handlePstinstSelect({
                                    instNo: instNo ? instNo : 0,
                                    instNm: instNm ? instNm : ``,
                                })
                            }
                        />
                    </LabelItemBox>
                </Item>
                <Item></Item>
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>가입일자</LabelText>
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
                            <LabelText>검색어</LabelText>
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
                        ButtonClick={() => {
                            //
                        }}
                    />
                </SearchButtonBox>
            </Relative>
        </Container>
    )
}
