import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    VaryLabel,
    VaryInput,
    VarySelectBox,
} from '@Elements'
import { useRecoilValue, useRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { QnaListState } from '@Recoil/HelperPageState'
import _ from 'lodash'
import Codes from '@Codes'

const {
    Container,
    SearchWapper,
    RightSearchButton,
    SearchItemWapper,
    SearchLabel,
    SearchItemRow,
    SearchItem,
} = SearchBoxStyle

const QnaSearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [qnaListState, setQnaListState] = useRecoilState(QnaListState)

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        HandleGetList()
    }

    return (
        <Container>
            <SearchWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`검색`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={e =>
                                    setQnaListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            TITLE:
                                                e.target.value === ``
                                                    ? null
                                                    : e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'제목'}
                                Value={
                                    _.isNull(qnaListState.search.TITLE)
                                        ? ``
                                        : qnaListState.search.TITLE
                                }
                                HandleOnKeyDown={e =>
                                    handleSearchInputOnKeyDown(e)
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`답변 여부`} />
                        </SearchLabel>
                        <SearchItem>
                            <VarySelectBox
                                Width={`w40`}
                                ContentsType={`search`}
                                PlaceholderDisable={false}
                                Value={qnaListState.search.COMPLETE_YN}
                                Elements={_.map(
                                    Codes.HelperQnalistCompleteSearchcode,
                                    search => {
                                        return {
                                            value: search.code,
                                            text: search.name,
                                        }
                                    }
                                )}
                                HandleOnChange={e =>
                                    setQnaListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            COMPLETE_YN: e.value,
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchWapper>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </Container>
    )
}

export default QnaSearchBox
