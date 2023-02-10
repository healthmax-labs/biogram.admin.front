import { useRecoilState } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { TabItemInterface } from '@Type/CommonTypes'
import Routers from '@Routers'
import { getPathNameToMenuInfo } from '@Helper'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import Const from '@Const'
import _ from 'lodash'

export default function useTab() {
    const locationState = useLocation()
    const navigate = useNavigate()

    const [tabState, setUseTabState] = useRecoilState(AtomPageTabState)

    const { handlMainAlert } = useMainLayouts()

    // 텝 삭제.
    const handleDeleteTab = (index: number) => {
        const indexInfo = tabState.list[index]
        const findInfo = _.find(Routers.Main, { pathName: indexInfo.routePath })

        const newList = tabState.list.filter((el, i) => i !== index)
        const lastElement = newList.slice(-1).pop()
        setUseTabState(prevState => ({
            ...prevState,
            list: newList,
            close: {
                closeIndex: index,
                recoilKey: findInfo?.recooilKey ? findInfo.recooilKey : null,
            },
        }))

        if (lastElement) {
            navigate({
                pathname: `${process.env.PUBLIC_URL}${lastElement.pathname}`,
            })
            return
        }

        navigate({
            pathname: `${process.env.PUBLIC_URL}${Const.DefaultStartRouter}`,
        })
    }

    const handleDeleteTabbyMatchRouter = (routerPathName: string) => {
        const findIndex = _.findIndex(tabState.list, e => {
            return e.routePath === routerPathName
        })

        if (findIndex > -1) {
            handleDeleteTab(findIndex)
        }
    }

    // 라우터 변경시 텝 세팅
    useEffect(() => {
        const routerMatchs = matchRoutes(
            Routers.Main.map(el => {
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
            const chIdex = tabState.list.findIndex(
                el => el.routePath === routerPathName
            )

            const newTabList: TabItemInterface[] = tabState.list.map(el => {
                return {
                    ...el,
                    active: false,
                }
            })

            // 현재 있는 텝이면 활성화.
            if (chIdex > -1) {
                setUseTabState(prevState => ({
                    ...prevState,
                    list: newTabList.map((el, index) => {
                        if (index === chIdex) {
                            return {
                                ...el,
                                active: true,
                            }
                        }

                        return el
                    }),
                }))

                return false
            }

            // 현재 없는 텝이면 추가.
            // 현재 없는 텝일때 기존 텝이 10일 경우 알림 및 뒤로가기.
            if (newTabList.length === Const.maxTabCount) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.TabCountCheck,
                })
                navigate(-1)
                return
            }

            const menuInfo = getPathNameToMenuInfo(routerPathName)

            setUseTabState(prevState => ({
                ...prevState,
                list: [
                    ...newTabList,
                    {
                        active: true,
                        name: !menuInfo ? '존재 하지 않는 메뉴' : menuInfo.name,
                        pathname: thisLocationPathName,
                        routePath: routerPathName,
                        component: 'component',
                        reloadButton: !menuInfo ? false : menuInfo.reloadButton,
                    },
                ],
            }))
        }

        if (!routerMatchs) {
            return
        }

        const routerMatchResult = routerMatchs[0]

        if (
            tabState.list.findIndex(
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
        tabState,
        setUseTabState,
        handleDeleteTab,
        handleDeleteTabbyMatchRouter,
    }
}
