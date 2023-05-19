import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useResetRecoilState } from 'recoil'
import { UhealthzoneDetailState } from '@Recoil/ContentsPagesState'
import { useTab } from '@Hook/index'

const { Wapper, Buttons } = ManageBoxStyle

const UhealthzoneListManageBox = () => {
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
                            `/manage/contents/uhealthzone/:UhealthZoneNo/detail`
                        )
                        resetDetail()
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/contents/uhealthzone/new`,
                        })
                    }}
                    ButtonName={'바이오그램 존 신규 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default UhealthzoneListManageBox
