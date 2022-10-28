import React from 'react'
import { UnderConstruction } from '@Style/Pages/EtcPageStyles'

const {
    Container,
    MainContainer,
    TextP,
    TextH2,
    TextLink,
    TextBox,
    TextSpan,
    Wapper,
} = UnderConstruction

const UnderConstructionComponent = () => {
    return (
        <MainContainer>
            <Container>
                <Wapper>
                    <TextBox>
                        <TextH2>
                            서버
                            <TextSpan>작업중</TextSpan>
                        </TextH2>
                        <TextP>
                            <TextLink href="https://www.healthmax.co.kr/">
                                HealthMax
                            </TextLink>
                            서버 작업 중입니다. 잠시후 다시 시도해 주세요.
                        </TextP>
                    </TextBox>
                </Wapper>
            </Container>
        </MainContainer>
    )
}

export default UnderConstructionComponent
