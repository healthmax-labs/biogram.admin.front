import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryRadioButton,
} from '@Elements'
import { DefaultCheckBox } from '@Element/index'
import { gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MsgSendListState } from '@Recoil/MsgPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchItem,
    DatepickerLine,
    SearchButton,
    LabelItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속:`} />
                    </SearchLabel>
                    <PstinstSelector
                        HandleSelectValue={({ instNo }) =>
                            setMsgSendListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    instNo: String(instNo),
                                },
                            }))
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어:`} />
                    </SearchLabel>
                    <VaryInput
                        ContentsType={`search`}
                        Width={'w64'}
                        HandleOnChange={e =>
                            setMsgSendListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    searchKey: e.target.value,
                                },
                            }))
                        }
                        id={'id'}
                        Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                        Value={
                            isNull(msgSendListState.search.SEARCH_KEY)
                                ? ''
                                : msgSendListState.search.SEARCH_KEY
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`발송:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <DefaultCheckBox />
                        실패만
                    </LabelItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`기간:`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setMsgSendListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtFrom: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                        <DatepickerLine>~</DatepickerLine>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setMsgSendListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtTo: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`조회 기준:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <div className="flex flex-nowrap px-0">
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="발송일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="작성일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                        </div>
                    </LabelItem>
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox
