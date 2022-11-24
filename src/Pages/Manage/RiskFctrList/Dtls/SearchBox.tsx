import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import {
    DatepickerInput,
    DefaultSearchButton,
    PstinstSelector,
    DefaultCheckBox,
    VaryRadioButton,
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
                        허리둘레
                        <DefaultCheckBox />
                        혈압
                        <DefaultCheckBox />
                        TG
                        <DefaultCheckBox />
                        HDL
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
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>갯수 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <div className="flex flex-nowrap px-0">
                            <div className="mr-2">
                                <VaryRadioButton LabelName="0개" />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton LabelName="1개" />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton LabelName="2개" />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton LabelName="3개" />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton LabelName="4개" />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton LabelName="5개" />
                            </div>
                        </div>
                    </LabelItemBox>
                </Item>
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
                <Item>
                    <LabelItem>
                        <Label htmlFor="forms-labelLeftInputCode">
                            <LabelText>복약 :</LabelText>
                        </Label>
                    </LabelItem>
                    <LabelItemBox>
                        <DefaultCheckBox />
                        고혈압
                        <DefaultCheckBox />
                        당뇨
                        <DefaultCheckBox />
                        고지혈
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
