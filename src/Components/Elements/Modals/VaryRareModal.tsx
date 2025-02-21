import React, { useEffect, useState } from 'react'
import { ModalStyle } from '@Style/Elements/ModalStyles'
import { MaxWidthType } from '@CommonTypes'

const { Container, ModalBackground, MainWapper, RareWapper } = ModalStyle

const initializeState = {
    loading: false,
}

const VaryRereModal = ({
    ModalLoading = false,
    NeedMax = false,
    Children,
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
                <RareWapper maxWidth={MaxWidth ? MaxWidth : `xl7`}>
                    {Children}
                </RareWapper>
            </MainWapper>
        </Container>
    )
}

export default VaryRereModal
