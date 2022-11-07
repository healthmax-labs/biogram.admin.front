import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { TabInterface } from '@Type/CommonTypes'
import { getPathNameToMenuInfo } from '@Helper'

export default function useTab() {
    const locationState = useLocation()
    const navigate = useNavigate()

    const [tabState, setUseTabState] = useRecoilState(AtomPageTabState)

    // 텝 삭제.
    const handleDeleteTab = (index: number) => {
        const newList = tabState.filter((el, i) => i !== index)
        const lastElement = newList.slice(-1).pop()
        setUseTabState(newList)

        if (lastElement) {
            navigate({
                pathname: process.env.PUBLIC_URL + lastElement.pathname,
            })
        }
    }

    // 라우터 변경시 텝 세팅
    useEffect(() => {
        const funcSetTabState = (thisLocationPathName: string) => {
            // 현재 있는 텝인지 체크.
            const chIdex = tabState.findIndex(
                el => el.pathname === thisLocationPathName
            )

            const newTabList: TabInterface[] = tabState.map(el => {
                return {
                    ...el,
                    active: false,
                }
            })

            // 현재 있는 텝이면 활성화.
            if (chIdex > -1) {
                setUseTabState(
                    newTabList.map((el, index) => {
                        if (index === chIdex) {
                            return {
                                ...el,
                                active: true,
                            }
                        }

                        return el
                    })
                )

                return false
            }

            // 현재 없는 텝이면 추가.
            const menuName = getPathNameToMenuInfo(thisLocationPathName)
            setUseTabState([
                ...newTabList,
                {
                    active: true,
                    name: !menuName ? '존재 하지 않는 메뉴' : menuName,
                    pathname: thisLocationPathName,
                    component: 'asdasd',
                },
            ])
        }

        // 현재 활성화 되어 있는 템을 클릭 하면 그냥 리턴.
        if (
            tabState.findIndex(
                el => el.pathname === locationState.pathname && el.active
            ) > -1
        ) {
            return
        }

        funcSetTabState(locationState.pathname)
    }, [locationState, setUseTabState, tabState])

    return {
        setUseTabState,
        handleDeleteTab,
    }
}
