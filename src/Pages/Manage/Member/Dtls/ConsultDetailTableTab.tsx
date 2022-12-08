import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Const from '@Const'

const { Tabs } = ConsultDetailStyle

const initializeState = {
    Tab: Const.ConsultTabs,
}

const ConsultDetailTableTab = () => {
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
