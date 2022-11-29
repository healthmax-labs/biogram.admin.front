import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { ListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'

const { Container } = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [listState, setListState] = useRecoilState(ListState)

    return (
        <Container>
            <div className="grid grid-cols-4 gap-1">
                <div className="flex flex-nowrap">
                    <div className="flex object-center content-center w-1/5">
                        <VaryLabel LabelName={`소속:`} />
                    </div>
                    <PstinstSelector
                        HandleSelectValue={({ instNo }) =>
                            setListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    instNo: String(instNo),
                                },
                            }))
                        }
                    />
                </div>
                <div className="flex flex-nowrap">
                    <div className="flex object-center content-center w-1/4">
                        <VaryLabel LabelName={`가입일자:`} />
                    </div>
                    <div className="flex flex-nowrap">
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtFrom: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                        <div className="flex px-2 items-center">~</div>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtTo: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap">
                    <div className="flex object-center content-center w-1/4">
                        <VaryLabel LabelName={`검색어:`} />
                    </div>
                    <VaryInput
                        ContentsType={`search`}
                        Width={'w64'}
                        HandleOnChange={e =>
                            setListState(prevState => ({
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
                            isNull(listState.search.searchKey)
                                ? ''
                                : listState.search.searchKey
                        }
                    />
                </div>

                <div className="flex object-center item-center justify-end pr-10">
                    <DefaultSearchButton ButtonClick={() => HandleGetList()} />
                </div>
            </div>
        </Container>
    )
}
export default SearchBox
