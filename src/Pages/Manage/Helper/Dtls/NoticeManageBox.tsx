import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { NoticeDetailState } from '@Recoil/HelperPageState'
import { useTab } from '@Hook/index'

const { Wapper, Buttons } = ManageBoxStyle

const ManageBox = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const RootState = useRecoilValue(AtomRootState)
    const noticeDetailStateReset = useResetRecoilState(NoticeDetailState)

    return (
        <Wapper>
            {RootState.userinfo.INST_NO === `1000` &&
                RootState.userinfo.AUTH_CODE === `SM00` && (
                    <Buttons>
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => {
                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/notice/:POST_ID/detail'
                                )

                                noticeDetailStateReset()

                                navigate({
                                    pathname:
                                        process.env.PUBLIC_URL +
                                        `/manage/helper/notice/new`,
                                })
                            }}
                            ButtonName={'게시물 등록'}
                        />
                    </Buttons>
                )}
        </Wapper>
    )
}

export default ManageBox
