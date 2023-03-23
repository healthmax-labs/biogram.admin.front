import React, { lazy, useCallback, useEffect } from 'react'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { VaryLabelRadioButton } from '@Elements'
import Codes from '@Codes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ConsultDetailState, MyGraphState } from '@Recoil/MemberPagesState'
import _ from 'lodash'

const ConsultDetailPartMyGraphBody = lazy(
    () => import('./ConsultDetailPartMyGraphBody')
)
const ConsultDetailPartMyGraphBrssr = lazy(
    () => import('./ConsultDetailPartMyGraphBrssr')
)
const ConsultDetailPartMyGraphDdsg = lazy(
    () => import('./ConsultDetailPartMyGraphDdsg')
)
const ConsultDetailPartMyGraphChol = lazy(
    () => import('./ConsultDetailPartMyGraphChol')
)
const ConsultDetailPartMyGraphBldvss = lazy(
    () => import('./ConsultDetailPartMyGraphBldvss')
)
const ConsultDetailPartMyGraphStrs = lazy(
    () => import('./ConsultDetailPartMyGraphStrs')
)
const ConsultDetailPartMyGraphHeight = lazy(
    () => import('./ConsultDetailPartMyGraphHeight')
)
const ConsultDetailPartMyGraphWaist = lazy(
    () => import('./ConsultDetailPartMyGraphWaist')
)
const ConsultDetailPartMyGraphBrain = lazy(
    () => import('./ConsultDetailPartMyGraphBrain')
)
const ConsultDetailPartMyGraphLifeLog = lazy(
    () => import('./ConsultDetailPartMyGraphLifeLog')
)

const {
    MyGraph: {
        Container,
        Search: { SearchBox, SearchItem },
    },
} = ConsultDetailStyle.Detail

const ConsultDetailPartMyGraph = () => {
    const detailState = useRecoilValue(ConsultDetailState)
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)

    const renderCategoryDynamicComponent = useCallback(() => {
        const { category } = myGraphState.search

        const returnCategoryComponent: {
            default: React.ReactNode
            body: React.ReactNode
            brssr: React.ReactNode
            bdsg: React.ReactNode
            chol: React.ReactNode
            bldvss: React.ReactNode
            strs: React.ReactNode
            height: React.ReactNode
            waist: React.ReactNode
            brain: React.ReactNode
            life_log: React.ReactNode
        } = {
            body: <ConsultDetailPartMyGraphBody />, // 체정분
            brssr: <ConsultDetailPartMyGraphBrssr />, // 혈압
            bdsg: <ConsultDetailPartMyGraphDdsg />, // 혈당
            chol: <ConsultDetailPartMyGraphChol />, // 콜레스트롤
            bldvss: <ConsultDetailPartMyGraphBldvss />, // 혈관
            strs: <ConsultDetailPartMyGraphStrs />, // 스트레스
            height: <ConsultDetailPartMyGraphHeight />, // 신장
            waist: <ConsultDetailPartMyGraphWaist />, // 허리둘레
            brain: <ConsultDetailPartMyGraphBrain />, // 뇌기능
            life_log: <ConsultDetailPartMyGraphLifeLog />, // 활동량 & 수면
            default: <ConsultDetailPartMyGraphBody />,
        }

        return (
            _.get(returnCategoryComponent, category) ||
            _.get(returnCategoryComponent, 'default')
        )
    }, [myGraphState.search])

    useEffect(() => {
        const pageStart = () => {
            const memNo = detailState.memNo

            setMyGraphState(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    memNo: memNo,
                },
            }))
        }

        if (detailState.memNo) {
            pageStart()
        }
    }, [detailState.memNo, myGraphState.search.memNo, setMyGraphState])

    return (
        <Container>
            <SearchBox>
                <SearchItem>
                    {Codes.myGraph.category.map((mg, mgIndex) => {
                        return (
                            <VaryLabelRadioButton
                                LabelWidth={`wMax`}
                                key={`consult-detail-part-my-graph-category-item-${mgIndex}`}
                                LabelName={`${mg.name}`}
                                Checked={
                                    myGraphState.search.category === mg.code
                                }
                                HandleOnChange={e => {
                                    if (e.target.checked) {
                                        setMyGraphState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                category: mg.code,
                                            },
                                        }))
                                    }
                                }}
                            />
                        )
                    })}
                </SearchItem>
            </SearchBox>
            <div className="flex w-full">
                <>{renderCategoryDynamicComponent()}</>
            </div>
        </Container>
    )
}

export default ConsultDetailPartMyGraph
