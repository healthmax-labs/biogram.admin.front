import { ElementLoading } from '@Element/index'
import React, { useEffect, useState } from 'react'
import { ModalStyle } from '@Style/Elements/ModalStyles'

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
    Children,
    Buttons,
}: {
    ModalLoading: boolean
    Children: React.ReactNode
    Buttons?: React.ReactNode
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
            <MainWapper>
                <Wapper maxWidth={`xl2`}>
                    <MainBox>
                        <CenterBox>
                            {pageState.loading ? (
                                <ElementLoading />
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
