import React from 'react'
import { useRecoilState } from 'recoil'
import { ConsultDetailChartSmsState } from '@Recoil/MemberPagesState'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import ConsultDetailRightBoxChart from './ConsultDetailRightBoxChart'
import ConsultDetailRightBoxMessage from './ConsultDetailRightBoxMessage'
import _ from 'lodash'

const { Tabs, Message } = ConsultDetailStyle

const ConsultDetailRightBox = () => {
    const [detailChartSmsState, setDetailChartSmsState] = useRecoilState(
        ConsultDetailChartSmsState
    )
    return (
        <Message.Container>
            <Tabs.Container>
                <Tabs.Rows>
                    <Tabs.Cells>
                        {detailChartSmsState.tab.map((el, i) => {
                            return (
                                <Tabs.Items
                                    key={`consult-detail-table-message-box-tab-item-${i}`}
                                    Active={el.active}
                                    onClick={() => {
                                        setDetailChartSmsState(prevState => ({
                                            ...prevState,
                                            tab: _.map(
                                                prevState.tab,
                                                (e, eIndex) => {
                                                    if (eIndex === i) {
                                                        return {
                                                            ...e,
                                                            active: true,
                                                        }
                                                    } else {
                                                        return {
                                                            ...e,
                                                            active: false,
                                                        }
                                                    }
                                                }
                                            ),
                                        }))
                                    }}>
                                    {el.name}
                                </Tabs.Items>
                            )
                        })}
                    </Tabs.Cells>
                </Tabs.Rows>
            </Tabs.Container>

            {(() => {
                const findActive = _.find(detailChartSmsState.tab, {
                    active: true,
                })

                if (findActive && findActive.key === `memo`) {
                    return <ConsultDetailRightBoxChart />
                } else if (findActive && findActive.key === `msg`) {
                    return <ConsultDetailRightBoxMessage />
                } else {
                    return <ConsultDetailRightBoxChart />
                }
            })()}
        </Message.Container>
    )
}

export default ConsultDetailRightBox
