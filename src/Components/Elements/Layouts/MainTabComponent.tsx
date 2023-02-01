import React, { useEffect, useState } from 'react'
import { RecoilStateKeyNameType, TabItemInterface } from '@Type/CommonTypes'
import { MainTabStyle } from '@Style/Layouts/TabStyles'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useRecoilReset, useTab } from '@Hooks'
import _ from 'lodash'

const { Wapper, TabItem, TabButton, CloseButton, ButtonWapper } = MainTabStyle

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
                        </TabItem>
                    )
                })}
        </Wapper>
    )
}

export default MainTabComponent
