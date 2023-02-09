import React, { useEffect, useState } from 'react'
import { RecoilStateKeyNameType, TabItemInterface } from '@Type/CommonTypes'
import { MainTabStyle } from '@Style/Layouts/TabStyles'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useRecoilReset, useTab } from '@Hooks'
import _ from 'lodash'

const { Wapper, TabItem, TabButton, CloseButton, RotateButton, ButtonWapper } =
    MainTabStyle

const MainTabComponent = () => {
    const navigate = useNavigate()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const { handleDeleteTab } = useTab()
    const [showCloseButton, setShowCloseButton] = useState<boolean>(true)
    const [tabList, setTabList] = useState<TabItemInterface[]>([])
    const { recoilReset } = useRecoilReset()

    // 텝 클릭 처리.
    const handleTabClick = (pathName: string) => {
        navigate({
            pathname: process.env.PUBLIC_URL + pathName,
        })
    }

    // 텝 삭제 버튼 클릭
    const handleCloseButton = (index: number) => {
        handleDeleteTab(index)
    }

    // recoil 텝 상태 변경 되었을때.
    useEffect(() => {
        const funcTabListSet = () => {
            setTabList(tabState.list)
        }

        funcTabListSet()
    }, [tabState])

    // tablist 스테이트 변경 되었을때.
    useEffect(() => {
        const funcSetShowCloseButton = () => {
            if (tabList.length === 1) {
                setShowCloseButton(false)
            } else {
                setShowCloseButton(true)
            }
        }

        funcSetShowCloseButton()
    }, [tabList])

    useEffect(() => {
        const funcTabClose = (recoilKey: RecoilStateKeyNameType) => {
            recoilReset(recoilKey)
        }

        const { closeIndex, recoilKey } = tabState.close
        if (!_.isNull(closeIndex) && !_.isNull(recoilKey)) {
            funcTabClose(recoilKey as RecoilStateKeyNameType)

            setTabState(prevState => ({
                ...prevState,
                close: {
                    closeIndex: null,
                    recoilKey: null,
                },
            }))
        }
    }, [recoilReset, setTabState, tabState.close])

    return (
        <Wapper>
            {tabList &&
                tabList.map((element, index) => {
                    return (
                        <TabItem key={index}>
                            <ButtonWapper>
                                <TabButton
                                    Active={element.active}
                                    onClick={() => {
                                        handleTabClick(element.pathname)
                                    }}>
                                    {element.name}
                                </TabButton>
                                {element.reloadButton && (
                                    <RotateButton
                                        onClick={() => {
                                            //
                                        }}>
                                        <svg
                                            className="h-3 w-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                            <path
                                                d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"
                                                fill="blue"></path>
                                        </svg>
                                    </RotateButton>
                                )}

                                {index > 0 && showCloseButton && (
                                    <CloseButton
                                        onClick={() =>
                                            handleCloseButton(index)
                                        }>
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <svg
                                            className="h-3 w-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </CloseButton>
                                )}
                            </ButtonWapper>
                        </TabItem>
                    )
                })}
        </Wapper>
    )
}

export default MainTabComponent
