import React from 'react'
import {
    DatepickerLine,
    SearchBoxContainer,
    SearchBoxInput,
    SearchBoxItem,
    SearchBoxLabel,
    SearchBoxLabelItem,
    SearchBoxLabelItemBox,
    SearchBoxLabelText,
    SearchBoxRelative,
    SearchBoxSearchButtonBox,
    SearchBoxSelect,
    SearchBoxWapper,
} from '@Style/Pages/PublishPage'
import { DatepickerButton, DefaultSearchButton } from '@Element/Buttons'

export default function SearchBox() {
    return (
        <SearchBoxContainer>
            <SearchBoxWapper>
                <SearchBoxItem>
                    <SearchBoxLabelItem>
                        <SearchBoxLabel htmlFor="forms-labelLeftInputCode">
                            <SearchBoxLabelText>소속 :</SearchBoxLabelText>
                        </SearchBoxLabel>
                    </SearchBoxLabelItem>
                    <SearchBoxLabelItemBox>
                        <SearchBoxSelect
                            id="country"
                            name="country"
                            autoComplete="country">
                            <option>소속 선택</option>
                        </SearchBoxSelect>
                    </SearchBoxLabelItemBox>
                </SearchBoxItem>
                <SearchBoxItem></SearchBoxItem>
                <SearchBoxItem>
                    <SearchBoxLabelItem>
                        <SearchBoxLabel htmlFor="forms-labelLeftInputCode">
                            <SearchBoxLabelText>가입일자 :</SearchBoxLabelText>
                        </SearchBoxLabel>
                    </SearchBoxLabelItem>
                    <SearchBoxLabelItemBox>
                        <div className="flex flex-row">
                            <DatepickerButton />
                            <DatepickerLine>~</DatepickerLine>
                            <DatepickerButton />
                        </div>
                    </SearchBoxLabelItemBox>
                </SearchBoxItem>
                <SearchBoxItem></SearchBoxItem>
                <SearchBoxItem>
                    <SearchBoxLabelItem>
                        <SearchBoxLabel htmlFor="forms-labelLeftInputCode">
                            <SearchBoxLabelText>검색어 :</SearchBoxLabelText>
                        </SearchBoxLabel>
                    </SearchBoxLabelItem>
                    <SearchBoxLabelItemBox>
                        <SearchBoxInput
                            type="search"
                            id="search-dropdown"
                            placeholder="ID / 이름 / 연락처 / 전화번호"
                            required
                        />
                    </SearchBoxLabelItemBox>
                </SearchBoxItem>
            </SearchBoxWapper>
            <SearchBoxRelative>
                <SearchBoxSearchButtonBox>
                    <DefaultSearchButton
                        ButtonClick={() => console.debug('DefaultSearchButton')}
                    />
                </SearchBoxSearchButtonBox>
            </SearchBoxRelative>
        </SearchBoxContainer>
    )
}
