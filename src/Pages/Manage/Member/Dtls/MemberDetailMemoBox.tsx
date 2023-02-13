import React from 'react'
import { useRecoilState } from 'recoil'
import { MemberDetailState } from '@Recoil/MemberPagesState'
import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { VaryTextArea } from '@Elements'
import _ from 'lodash'

const { MemoContainer, MemoTextLength } = DetailPageStyle

const memoMaxLength = 250

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
                    if (_.size(e.target.value) > memoMaxLength) {
                        return
                    }
                    setDetailState(prevState => ({
                        ...prevState,
                        detail: {
                            ...prevState.detail,
                            MEMO: e.target.value,
                        },
                    }))
                }}
            />
            <MemoTextLength>{`${_.size(
                detailState.detail.MEMO
            )} / ${memoMaxLength}`}</MemoTextLength>
        </MemoContainer>
    )
}

export default MemberDetailMemoBox
