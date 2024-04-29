import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { DownloadlistDetailState } from '@Recoil/HelperPageState'
import { useTab } from '@Hook/index'

const { Wapper, Buttons } = ManageBoxStyle

const DownloadManageBox = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const RootState = useRecoilValue(AtomRootState)
    const downloadlistDetailStateReset = useResetRecoilState(
        DownloadlistDetailState
    )

    return (
        <Wapper>
            {RootState.userinfo.INST_NO === `1000` &&
                RootState.userinfo.AUTH_CODE === `SM00` && (
                    <Buttons>
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => {
                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/download-list/:POST_ID/detail'
                                )

                                downloadlistDetailStateReset()

                                navigate({
                                    pathname:
                                        process.env.PUBLIC_URL +
                                        `/manage/helper/download-list/new`,
                                })
                            }}
                            ButtonName={'등록'}
                        />
                    </Buttons>
                )}
        </Wapper>
    )
}

export default DownloadManageBox
