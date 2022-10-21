import {
    FooterBox,
    FooterContainer,
    FooterHr,
    FooterWapper,
    FooterLeftBox,
    FooterRightBox,
    FooterCopyrightBox,
    FooterCopyrightLink,
    FooterRightBoxUl,
    FooterRightBoxLi,
    FooterRightLink,
} from '@Style/Layouts/Manage/Footer'

export default function Footer() {
    return (
        <>
            <FooterBox>
                <FooterContainer>
                    <FooterHr />
                    <FooterWapper>
                        <FooterLeftBox>
                            <FooterCopyrightBox>
                                Copyright © {new Date().getFullYear()}{' '}
                                <FooterCopyrightLink href="https://www.creative-tim.com?ref=nr-footer-admin">
                                    HealthMax
                                </FooterCopyrightLink>
                            </FooterCopyrightBox>
                        </FooterLeftBox>
                        <FooterRightBox>
                            <FooterRightBoxUl>
                                <FooterRightBoxLi>
                                    <FooterRightLink href="https://www.creative-tim.com?ref=nr-footer-admin">
                                        HealthMax
                                    </FooterRightLink>
                                </FooterRightBoxLi>
                                <FooterRightBoxLi>
                                    <FooterRightLink href="https://www.creative-tim.com/presentation?ref=nr-footer-admin">
                                        About Us
                                    </FooterRightLink>
                                </FooterRightBoxLi>
                                <FooterRightBoxLi>
                                    <FooterRightLink href="http://blog.creative-tim.com?ref=nr-footer-admin">
                                        Blog
                                    </FooterRightLink>
                                </FooterRightBoxLi>
                                <FooterRightBoxLi>
                                    <FooterRightLink href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin">
                                        MIT License
                                    </FooterRightLink>
                                </FooterRightBoxLi>
                            </FooterRightBoxUl>
                        </FooterRightBox>
                    </FooterWapper>
                </FooterContainer>
            </FooterBox>
        </>
    )
}
