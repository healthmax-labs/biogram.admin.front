import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton /*, VarySelectBox, VaryLabel*/ } from '@Elements'
// import Codes from '@Codes'
// import { useRecoilState } from 'recoil'
// import { NoticeListState } from '@Recoil/ManagerPagesState'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    /*SearchLabel,*/ SearchButton,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    // const [noticeListState, setNoticeListState] =
    //     useRecoilState(NoticeListState)
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    {/* <SearchLabel>
                        <VaryLabel LabelName={`유형:`} />
                    </SearchLabel>
                    <VarySelectBox
                        Value={
                            noticeListState.search.TRGET_SVC_CODE
                                ? noticeListState.search.TRGET_SVC_CODE
                                : 'A'
                        }
                        Elements={Codes.boardSchCode.list.map(e => {
                            return {
                                value: e.code,
                                text: e.name,
                            }
                        })}
                        HandleOnChange={e =>
                            setNoticeListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    TRGET_SVC_CODE: e.value,
                                    TRGET_SVC_CODE_NM: e.text,
                                },
                            }))
                        }
                    /> */}
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox
