import { Mains } from '@Style/Layouts/Manage/MainStyles'

export default function Footer() {
    return (
        <>
            <Mains.Footer.Box>
                <Mains.Footer.Container>
                    <Mains.Footer.Hr />
                    <Mains.Footer.Wapper>
                        <Mains.Footer.Left>
                            <Mains.Footer.CopyRight>
                                Copyright © {new Date().getFullYear()}{' '}
                                <Mains.Footer.CopyRightLink href="https://www.creative-tim.com?ref=nr-footer-admin">
                                    HealthMax
                                </Mains.Footer.CopyRightLink>
                            </Mains.Footer.CopyRight>
                        </Mains.Footer.Left>
                        <Mains.Footer.Right>
                            <Mains.Footer.RightBox.ul>
                                <Mains.Footer.RightBox.li>
                                    <Mains.Footer.RightBox.link href="https://www.creative-tim.com?ref=nr-footer-admin">
                                        HealthMax
                                    </Mains.Footer.RightBox.link>
                                </Mains.Footer.RightBox.li>
                                <Mains.Footer.RightBox.li>
                                    <Mains.Footer.RightBox.link href="https://www.creative-tim.com/presentation?ref=nr-footer-admin">
                                        About Us
                                    </Mains.Footer.RightBox.link>
                                </Mains.Footer.RightBox.li>
                                <Mains.Footer.RightBox.li>
                                    <Mains.Footer.RightBox.link href="http://blog.creative-tim.com?ref=nr-footer-admin">
                                        Blog
                                    </Mains.Footer.RightBox.link>
                                </Mains.Footer.RightBox.li>
                                <Mains.Footer.RightBox.li>
                                    <Mains.Footer.RightBox.link href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin">
                                        MIT License
                                    </Mains.Footer.RightBox.link>
                                </Mains.Footer.RightBox.li>
                            </Mains.Footer.RightBox.ul>
                        </Mains.Footer.Right>
                    </Mains.Footer.Wapper>
                </Mains.Footer.Container>
            </Mains.Footer.Box>
        </>
    )
}
