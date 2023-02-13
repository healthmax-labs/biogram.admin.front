import { useRecoilState } from 'recoil'
import { MemberDetailState } from '@Recoil/MemberPagesState'
import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { VaryTextArea } from '@Elements'
import React from 'react'

const { MemoContainer } = DetailPageStyle

const MemberDetailMemoBox = () => {
    const [detailState, setDetailState] = useRecoilState(MemberDetailState)
    return (
        <MemoContainer>
            <VaryTextArea
                Rows={22}
                Placeholder={`메모를 입력해 주세요`}
                Value={
                    detailState.detail.MEMO && detailState.detail.MEMO
                        ? detailState.detail.MEMO
                        : ``
                }
                HandleOnChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setDetailState(prevState => ({
                        ...prevState,
                        detail: {
                            ...prevState.detail,
                            MEMO: e.target.value,
                        },
                    }))
                }}
            />
        </MemoContainer>
    )
}

export default MemberDetailMemoBox
