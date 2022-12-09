import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { VaryInput, VaryLabel } from '@Elements'
import ConsultDetailTableTab from './ConsultDetailTableTab'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import Const from '@Const'

const { TableContainer, TableWapper, Row, LabelCell, InputCell } =
    DetailTableStyle
const { DetailContainer } = DetailPageStyle

const ConsultDetailTable = () => {
    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()

    // 템에 따른 메인 페이지 동적 로딩.
    const renderTabPageComponent = () => {
        const category = params.category

        const chIndex = Const.ConsultTabs.findIndex(
            el => el.category === category
        )
        const TabPageComponent = Const.ConsultTabs[chIndex].Component
        return <TabPageComponent />
    }

    useEffect(() => {
        console.debug(params)
    }, [params])
    return (
        <>
            <DetailContainer>
                <TableContainer>
                    <TableWapper>
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`이름`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w64'}
                                    HandleOnChange={e => console.debug(e)}
                                    id={'id'}
                                    Placeholder={'이름'}
                                    Value={``}
                                    Disabled={true}
                                />
                            </InputCell>
                            <LabelCell>
                                <VaryLabel LabelName={`핸드폰번호`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w64'}
                                    HandleOnChange={e => console.debug(e)}
                                    id={'id'}
                                    Placeholder={'핸드폰번호'}
                                    Value={``}
                                    Disabled={true}
                                />
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`성별`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w64'}
                                    HandleOnChange={e => console.debug(e)}
                                    id={'id'}
                                    Placeholder={'성별'}
                                    Value={``}
                                    Disabled={true}
                                />
                            </InputCell>
                            <LabelCell>
                                <VaryLabel LabelName={`생년월일`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w64'}
                                    HandleOnChange={e => console.debug(e)}
                                    id={'id'}
                                    Placeholder={'생년월일'}
                                    Value={``}
                                    Disabled={true}
                                />
                            </InputCell>
                        </Row>
                    </TableWapper>
                </TableContainer>

                <ConsultDetailTableTab />

                <>{renderTabPageComponent()}</>
            </DetailContainer>
        </>
    )
}

export default ConsultDetailTable
