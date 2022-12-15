import React, { useEffect, useState } from 'react'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import ConsultDetailTableMemo from './ConsultDetailTableMemo'
import ConsultDetailTableMessageSend from './ConsultDetailTableMessageSend'
import { useRecoilValue } from 'recoil'
import { ConsultDetailChartState } from '@Recoil/MemberPagesState'
import _ from 'lodash'

const { Tabs } = ConsultDetailStyle

const initializeState = {
    Tab: [
        {
            name: `상담차트작성`,
            key: `memo`,
            active: true,
        },
        {
            name: `메시지발송`,
            key: `msg`,
            active: false,
        },
    ],
    activeTab: 'memo',
}
const ConsultDetailTableMessageBox = () => {
    const chartState = useRecoilValue(ConsultDetailChartState)
    const [pageState, setPageState] = useState<{
        Tab: Array<{
            name: string
            key: string
            active: boolean
        }>
        activeTab: string
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
            activeTab: el.key,
        }))
    }

    useEffect(() => {
        const funcSetCHartTab = () => {
            const { Tab } = pageState
            let nowTab

            const findActiveTabIndex = Tab.findIndex(e => e.active)
            if (findActiveTabIndex > -1) {
                nowTab = pageState.Tab[findActiveTabIndex].key
            } else {
                nowTab = ''
            }

            if (!_.isNull(chartState.CNST_NO) && nowTab !== 'memo') {
                handleTabClick({ name: '', active: false, key: 'memo' })
            }
        }

        funcSetCHartTab()
    }, [chartState, pageState])

    return (
        <div className="px-2 pt-20">
            <div className="flex flex-col break-words bg-white">
                <Tabs.Container>
                    <Tabs.Rows>
                        <Tabs.Cells>
                            {pageState.Tab.map((el, i) => {
                                return (
                                    <Tabs.Items
                                        key={`consult-detail-table-message-box-tab-item-${i}`}
                                        Active={el.active}
                                        onClick={() => handleTabClick(el)}>
                                        {el.name}
                                    </Tabs.Items>
                                )
                            })}
                        </Tabs.Cells>
                    </Tabs.Rows>
                </Tabs.Container>
            </div>
            {(() => {
                if (pageState.activeTab === 'memo') {
                    return <ConsultDetailTableMemo />
                } else if (pageState.activeTab === 'msg') {
                    return <ConsultDetailTableMessageSend />
                }
            })()}
        </div>
    )
}

export default ConsultDetailTableMessageBox
