import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
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
        const funcSetTabState = () => {
            // 현재 있는 텝인지 체크.
            const thisLocationPathName = locationState.pathname
            const chIdex = tabState.findIndex(
                el => el.pathname === thisLocationPathName
            )

            const newTabList = tabState.map(el => {
                return {
                    ...el,
                    active: false,
                }
            })

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

            const menuName = getPathNameToMenuInfo(thisLocationPathName)

            // 현재 없는 텝이면 추가.
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

        funcSetTabState()
    }, [locationState])

    return {
        tabState,
        setUseTabState,
        handleDeleteTab,
    }
}
