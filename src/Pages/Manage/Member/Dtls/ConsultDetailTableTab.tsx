import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Const from '@Const'
import { useTab } from '@Hook/index'

const { Tabs } = ConsultDetailStyle

const initializeState = {
    Tab: Const.ConsultTabs,
}

const ConsultDetailTableTab = () => {
    const { tabState, setUseTabState } = useTab()
    const navigate = useNavigate()
    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()
    const [pageState, setPageState] = useState<{
        Tab: Array<{ name: string; category: string; active: boolean }>
    }>(initializeState)

    const handleTabClick = (el: {
        name: string
        category: string
        active: boolean
    }) => {
        setUseTabState(
            tabState.map(tab => {
                if (
                    tab.routePath ===
                    '/manage/member/consult-detail/:memNo/:category'
                ) {
                    return {
                        ...tab,
                        pathname: `/manage/member/consult-detail/${params.memNo}/${el.category}`,
                    }
                }

                return tab
            })
        )
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${params.memNo}/${el.category}`,
        })
    }

    useEffect(() => {
        setPageState(prevState => ({
            ...prevState,
            Tab: prevState.Tab.map(e => {
                return {
                    ...e,
                    active: e.category === params.category,
                }
            }),
        }))
    }, [params])

    return (
        <Tabs.Container>
            <Tabs.Rows>
                {pageState.Tab.map((el, i) => {
                    return (
                        <Tabs.Cells
                            key={`consult-detail-table-tab-item-${i}`}
                            onClick={() => {
                                handleTabClick(el)
                            }}>
                            <Tabs.Items Active={el.active}>
                                {el.name}
                            </Tabs.Items>
                        </Tabs.Cells>
                    )
                })}
            </Tabs.Rows>
        </Tabs.Container>
    )
}

export default ConsultDetailTableTab
