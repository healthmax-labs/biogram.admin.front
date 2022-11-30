import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useState } from 'react'

const { Tabs } = ConsultDetailStyle

const initializeState = {
    Tab: [
        {
            name: `마이데이터`,
            key: `mydata`,
            active: true,
        },
        {
            name: `마이그래프`,
            key: `mygraph`,
            active: false,
        },
        {
            name: `생체나이`,
            key: `raw-age`,
            active: false,
        },
        {
            name: `마이코치`,
            key: `mycoach`,
            active: false,
        },
        {
            name: `식사일기`,
            key: `mealdiary`,
            active: false,
        },
        {
            name: `설문조사`,
            key: `survey`,
            active: false,
        },
        {
            name: `메시지`,
            key: `mesg`,
            active: false,
        },
        {
            name: `발송함`,
            key: `send`,
            active: false,
        },
        {
            name: `회원정보`,
            key: `myinfo`,
            active: false,
        },
        {
            name: `상담차트`,
            key: `chart`,
            active: false,
        },
    ],
}

const ConsultDetailTableTab = () => {
    const [pageState, setPageState] = useState<{
        Tab: Array<{ name: string; key: string; active: boolean }>
    }>(initializeState)

    const handleTabClick = (el: {
        name: string
        key: string
        active: boolean
    }) => {
        setPageState(prevState => ({
            ...prevState,
            Tab: prevState.Tab.map(e => {
                return {
                    ...e,
                    active: e.key === el.key,
                }
            }),
        }))
    }

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
