import { useRecoilState } from 'recoil'
import { DetailSelector } from '@Recoil/MemberPagesState'

import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { VaryLabelTextArea } from '@Elements'
import React from 'react'

const { MemoContainer } = DetailPageStyle

const MemoBox = () => {
    const [detailState, setDetailState] = useRecoilState(DetailSelector)
    return (
        <MemoContainer>
            <VaryLabelTextArea
                Rows={22}
                Placeholder={`메모를 입력해 주세요`}
                Value={
                    detailState.MEMO && detailState.MEMO ? detailState.MEMO : ``
                }
                HandleOnChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setDetailState(prevState => ({
                        ...prevState,
                        MEMO: e.target.value,
                    }))
                }}
            />
        </MemoContainer>
    )
}

export default MemoBox
