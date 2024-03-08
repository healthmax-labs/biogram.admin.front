import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hook/index'
import { useResetRecoilState } from 'recoil'
import { PopupManageDetailState } from '@Recoil/ManagerPagesState'

const { Wapper, Buttons } = ManageBoxStyle

const BudgetListManageBox = () => {
    const navigate = useNavigate()

    const { handleDeleteTabbyMatchRouter } = useTab()

    const resetPopupManageDetailState = useResetRecoilState(
        PopupManageDetailState
    )

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        resetPopupManageDetailState()
                        handleDeleteTabbyMatchRouter(
                            '/manage/manager/budget-list/new'
                        )

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/manager/budget-list/new`,
                        })
                    }}
                    ButtonName={'등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default BudgetListManageBox
