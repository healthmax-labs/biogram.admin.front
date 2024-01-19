import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'

const { Wapper, Buttons } = ManageBoxStyle

const ManageBox = () => {
    const navigate = useNavigate()
    const RootState = useRecoilValue(AtomRootState)

    return (
        <Wapper>
            {RootState.userinfo.INST_NO === `1000` &&
                RootState.userinfo.AUTH_CODE === `SM00` && (
                    <Buttons>
                        <VaryButton
                            ButtonType={'manage'}
                            HandleClick={() => {
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
