import React, { useEffect, useState } from 'react'
import { TabInterface } from '@Type/CommonTypes'
import { MainTabStyle } from '@Style/Layouts/TabStyles'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useTab } from '@Hooks'

const { MainUl, MainLi, TabButton, CloseButton, ButtonWapper } = MainTabStyle

const MainTabComponent = () => {
    const navigate = useNavigate()
    const tabState = useRecoilValue(AtomPageTabState)
    const { handleDeleteTab } = useTab()
    const [showCloseButton, setShowCloseButton] = useState<boolean>(true)
    const [tabList, setTabList] = useState<TabInterface[]>([])

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
            setTabList(tabState)
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

    return (
        <MainUl>
            {tabList &&
                tabList.map((element, index) => {
                    return (
                        <MainLi key={index}>
                            <ButtonWapper>
                                <TabButton
                                    Active={element.active}
                                    onClick={() =>
                                        handleTabClick(element.pathname)
                                    }>
                                    {element.name}
                                </TabButton>
                                {showCloseButton && (
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
                        </MainLi>
                    )
                })}
        </MainUl>
    )
}

export default MainTabComponent
