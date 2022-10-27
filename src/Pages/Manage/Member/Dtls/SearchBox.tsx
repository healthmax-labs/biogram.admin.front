import React from 'react'
import { Members } from '@Style/Pages/MemberPageStyles'
import { DefaultSearchButton } from '@Element/Buttons'
import { DatepickerInput } from '@Element/Inputs'

export default function SearchBox() {
    return (
        <Members.SearchBox.Container>
            <Members.SearchBox.Wapper>
                <Members.SearchBox.Item>
                    <Members.SearchBox.LabelItem>
                        <Members.SearchBox.Label htmlFor="forms-labelLeftInputCode">
                            <Members.SearchBox.LabelText>
                                소속 :
                            </Members.SearchBox.LabelText>
                        </Members.SearchBox.Label>
                    </Members.SearchBox.LabelItem>
                    <Members.SearchBox.LabelItemBox>
                        <Members.SearchBox.Select
                            id="country"
                            name="country"
                            autoComplete="country">
                            <option>소속 선택</option>
                        </Members.SearchBox.Select>
                    </Members.SearchBox.LabelItemBox>
                </Members.SearchBox.Item>
                <Members.SearchBox.Item></Members.SearchBox.Item>
                <Members.SearchBox.Item>
                    <Members.SearchBox.LabelItem>
                        <Members.SearchBox.Label htmlFor="forms-labelLeftInputCode">
                            <Members.SearchBox.LabelText>
                                가입일자 :
                            </Members.SearchBox.LabelText>
                        </Members.SearchBox.Label>
                    </Members.SearchBox.LabelItem>
                    <Members.SearchBox.LabelItemBox>
                        <Members.SearchBox.Datepicker>
                            <DatepickerInput />
                            <Members.SearchBox.DatepickerLine>
                                ~
                            </Members.SearchBox.DatepickerLine>
                            <DatepickerInput />
                        </Members.SearchBox.Datepicker>
                    </Members.SearchBox.LabelItemBox>
                </Members.SearchBox.Item>
                <Members.SearchBox.Item></Members.SearchBox.Item>
                <Members.SearchBox.Item>
                    <Members.SearchBox.LabelItem>
                        <Members.SearchBox.Label htmlFor="forms-labelLeftInputCode">
                            <Members.SearchBox.LabelText>
                                검색어 :
                            </Members.SearchBox.LabelText>
                        </Members.SearchBox.Label>
                    </Members.SearchBox.LabelItem>
                    <Members.SearchBox.LabelItemBox>
                        <Members.SearchBox.Input
                            type="search"
                            id="search-dropdown"
                            placeholder="ID / 이름 / 연락처 / 전화번호"
                            required
                        />
                    </Members.SearchBox.LabelItemBox>
                </Members.SearchBox.Item>
            </Members.SearchBox.Wapper>
            <Members.SearchBox.Relative>
                <Members.SearchBox.SearchButtonBox>
                    <DefaultSearchButton
                        ButtonClick={() => console.debug('DefaultSearchButton')}
                    />
                </Members.SearchBox.SearchButtonBox>
            </Members.SearchBox.Relative>
        </Members.SearchBox.Container>
    )
}
