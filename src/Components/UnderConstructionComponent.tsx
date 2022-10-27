import React from 'react'
import { UnderConstruction } from '@Style/Pages/EtcPageStyles'

const UnderConstructionComponent = () => {
    return (
        <UnderConstruction.MainContainer>
            <UnderConstruction.Container>
                <UnderConstruction.Wapper>
                    <UnderConstruction.TextBox>
                        <UnderConstruction.TextH2>
                            서버
                            <UnderConstruction.TextSpan>
                                작업중
                            </UnderConstruction.TextSpan>
                        </UnderConstruction.TextH2>
                        <UnderConstruction.TextP>
                            <UnderConstruction.TextLink href="https://www.quicktoolz.com">
                                HealthMax
                            </UnderConstruction.TextLink>
                            서버 작업 중입니다. 잠시후 다시 시도해 주세요.
                        </UnderConstruction.TextP>
                    </UnderConstruction.TextBox>
                </UnderConstruction.Wapper>
            </UnderConstruction.Container>
        </UnderConstruction.MainContainer>
    )
}

export default UnderConstructionComponent
