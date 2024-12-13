import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useResetRecoilState } from 'recoil'
import { UhealthzoneDetailState } from '@Recoil/ContentsPagesState'
import { useTab } from '@Hook/index'

const { Wapper, Buttons } = ManageBoxStyle

const LoungeListManageBox = () => {
    const { handleDeleteTabbyMatchRouter } = useTab()
    const navigate = useNavigate()
    const resetDetail = useResetRecoilState(UhealthzoneDetailState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        handleDeleteTabbyMatchRouter(
                            `/manage/contents/lounge/:postId/detail`
                        )
                        resetDetail()
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/contents/lounge/new`,
                        })
                    }}
                    ButtonName={'마인드 라운지 게시글 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default LoungeListManageBox
