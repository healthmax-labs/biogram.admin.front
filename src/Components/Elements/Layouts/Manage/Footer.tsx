import { FooterStyle } from '@Style/Layouts/Manage/MainStyles'

const {
    Box,
    RightBox: { UL, Link, LI },
    CopyRight,
    CopyRightLink,
    Right,
    Hr,
    Left,
    Wapper,
    Container,
} = FooterStyle

const Footer = () => {
    return (
        <>
            <Box>
                <Container>
                    <Hr />
                    <Wapper>
                        <Left>
                            <CopyRight>
                                Copyright © {new Date().getFullYear()}
                                <CopyRightLink href="https://www.creative-tim.com?ref=nr-footer-admin">
                                    HealthMax
                                </CopyRightLink>
                            </CopyRight>
                        </Left>
                        <Right>
                            <UL>
                                <LI>
                                    <Link href="https://www.creative-tim.com?ref=nr-footer-admin">
                                        HealthMax
                                    </Link>
                                </LI>
                                <LI>
                                    <Link href="https://www.creative-tim.com/presentation?ref=nr-footer-admin">
                                        About Us
                                    </Link>
                                </LI>
                                <LI>
                                    <Link href="http://blog.creative-tim.com?ref=nr-footer-admin">
                                        Blog
                                    </Link>
                                </LI>
                                <LI>
                                    <Link href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin">
                                        MIT License
                                    </Link>
                                </LI>
                            </UL>
                        </Right>
                    </Wapper>
                </Container>
            </Box>
        </>
    )
}

export default Footer
