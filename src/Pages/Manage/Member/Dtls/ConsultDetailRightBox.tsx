import React, { useEffect, useState } from 'react'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import ConsultDetailRightBoxChart from './ConsultDetailRightBoxChart'
import ConsultDetailRightBoxMessage from './ConsultDetailRightBoxMessage'
import { useRecoilState } from 'recoil'
import { ConsultDetailChartState } from '@Recoil/MemberPagesState'

const { Tabs, Message } = ConsultDetailStyle

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
const ConsultDetailRightBox = () => {
    const [chartState, setChartState] = useRecoilState(ConsultDetailChartState)
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

    /**
     * 상담 차트에 내용이 있으면 '메시지발송'텝 버튼을 눌러도 메시지 쪽으로 가지 않게 되어 있는것을
     * 붚현 하다는 요청이 있어서 아래 주석 처리.
     */
    // useEffect(() => {
    //     const funcSetChartTab = () => {
    //         const { Tab } = pageState
    //         let nowTab
    //
    //         const findActiveTabIndex = Tab.findIndex(e => e.active)
    //         if (findActiveTabIndex > -1) {
    //             nowTab = pageState.Tab[findActiveTabIndex].key
    //         } else {
    //             nowTab = ''
    //         }
    //
    //         if (!_.isNull(chartState.CNST_NO) && nowTab !== 'memo') {
    //             handleTabClick({ name: '', active: false, key: 'memo' })
    //             return
    //         }
    //
    //         if (!_.isNull(smsState.send.SMS_CN) && nowTab !== 'msg') {
    //             handleTabClick({ name: '', active: false, key: 'msg' })
    //             return
    //         }
    //     }
    //
    //     funcSetChartTab()
    //
    //     // FIXME : 종속성에서 pageState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [chartState, smsState])

    useEffect(() => {
        const { newFlag } = chartState
        if (newFlag) {
            handleTabClick(initializeState.Tab[0])

            setChartState(prevState => ({
                ...prevState,
                newFlag: false,
            }))
        }
    }, [chartState, setChartState])

    return (
        <Message.Container>
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

            {(() => {
                if (pageState.activeTab === 'memo') {
                    return <ConsultDetailRightBoxChart />
                } else if (pageState.activeTab === 'msg') {
                    return <ConsultDetailRightBoxMessage />
                }
            })()}
        </Message.Container>
    )
}

export default ConsultDetailRightBox
