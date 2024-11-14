import { ElementLoading } from '@Element/index'
import React, { useEffect, useState } from 'react'
import { ModalStyle } from '@Style/Elements/ModalStyles'
import { MaxWidthType } from '@CommonTypes'

const {
    Container,
    ModalBackground,
    MainWapper,
    Wapper,
    MainBox,
    CenterBox,
    ButtonCenterBox,
} = ModalStyle

const initializeState = {
    loading: false,
}

const VaryModal = ({
    ModalLoading = false,
    NeedMax = false,
    Children,
    Buttons,
    MaxWidth,
}: {
    ModalLoading: boolean
    NeedMax?: boolean
    Children: React.ReactNode
    Buttons?: React.ReactNode
    MaxWidth?: MaxWidthType
}) => {
    const [pageState, setPageState] = useState<{
        loading: boolean
    }>(initializeState)

    useEffect(() => {
        setPageState(prevState => ({
            ...prevState,
            loading: ModalLoading,
        }))
    }, [ModalLoading])

    return (
        <Container>
            <ModalBackground></ModalBackground>
            <MainWapper needMax={NeedMax}>
                <Wapper maxWidth={MaxWidth ? MaxWidth : `xl7`}>
                    <MainBox>
                        <CenterBox>
                            {pageState.loading ? (
                                <ElementLoading FullScreen={false} />
                            ) : (
                                <>{Children}</>
                            )}
                        </CenterBox>
                        {Buttons && (
                            <ButtonCenterBox>{Buttons}</ButtonCenterBox>
                        )}
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default VaryModal
