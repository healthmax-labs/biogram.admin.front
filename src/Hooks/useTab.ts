import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { TabInterface } from '@Type/CommonTypes'
import Const from '@Const'
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
        const routerMatchs = matchRoutes(
            Const.Routers.map(el => {
                return {
                    path: el.pathName,
                }
            }),
            location
        )

        const funcSetTabState = (
            thisLocationPathName: string,
            routerPathName: string
        ) => {
            // 현재 있는 텝인지 체크.
            const chIdex = tabState.findIndex(
                el => el.routePath === routerPathName
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
            const menuName = getPathNameToMenuInfo(routerPathName)
            setUseTabState([
                ...newTabList,
                {
                    active: true,
                    name: !menuName ? '존재 하지 않는 메뉴' : menuName,
                    pathname: thisLocationPathName,
                    routePath: routerPathName,
                    component: 'component',
                },
            ])
        }

        if (!routerMatchs) {
            return
        }
        const routerMatchResult = routerMatchs[0]
        if (
            tabState.findIndex(
                el => el.active && el.pathname === locationState.pathname
            ) > -1
        ) {
            // 현재 활성화 되어 있는 텝을 클릭 하면 그냥 리턴.
            return
        }
        funcSetTabState(locationState.pathname, routerMatchResult.route.path)

        // FIXME : 종속성에서 tabState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState])

    return {
        setUseTabState,
        handleDeleteTab,
    }
}
