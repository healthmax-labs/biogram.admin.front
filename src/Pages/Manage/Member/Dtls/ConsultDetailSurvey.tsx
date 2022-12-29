import { useCallback, useEffect, useState } from 'react'
import { DefaultManageButton, VaryLabelCheckBox, VaryModal } from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useRecoilState } from 'recoil'
import { ConsultSurveyState } from '@Recoil/MemberPagesState'
import { useParams } from 'react-router-dom'
import { getMngQustnrAnswer } from '@Service/MemberService'
import Codes from '@Codes'

const { Detail } = ConsultDetailStyle

const ConsultDetailSurvey = () => {
    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()
    const [surveyState, setSurveyState] = useRecoilState(ConsultSurveyState)

    const [pageState, setPageState] = useState<{
        modal: {
            survey: boolean
        }
    }>({
        modal: {
            survey: false,
        },
    })

    const handleGetData = useCallback(async () => {
        if (surveyState.memNo) {
            setSurveyState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngQustnrAnswer({
                memNo: surveyState.memNo,
            })

            if (status) {
                setSurveyState(prevState => ({
                    ...prevState,
                    status: 'success',
                    data: payload,
                }))
            } else {
                setSurveyState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    data: null,
                }))
            }
        }
    }, [surveyState.memNo, setSurveyState])

    useEffect(() => {
        const pageStart = () => {
            const { memNo } = params

            if (memNo) {
                setSurveyState(prevState => ({
                    ...prevState,
                    memNo: Number(memNo),
                }))

                handleGetData().then()
            }
        }

        if (surveyState.status === 'idle') {
            pageStart()
        }
    }, [surveyState.status, handleGetData, params, setSurveyState])

    useEffect(() => {
        console.debug(Codes.surveyCode)
        // console.debug([...new Array(5)])
    }, [])

    return (
        <Detail.Container>
            <Detail.Survey.RowWapper>
                <div className="w-full text-left items-center pt-2">
                    <DefaultManageButton
                        ButtonName={'수기입력'}
                        ButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    survey: true,
                                },
                            }))
                        }
                    />
                </div>
            </Detail.Survey.RowWapper>
            {surveyState.data &&
                surveyState.data.QUSTNR_ANSWERS &&
                surveyState.data.QUSTNR_ANSWERS.map((survey, index) => {
                    const {
                        ANSWER: { MLHB, SPHB, LLHB },
                    } = survey

                    return (
                        <Detail.Survey.RowWapper
                            key={`consult-detail-survey-table-row-item-${index}`}>
                            <Detail.Survey.Table.Table>
                                <Detail.Survey.Table.Body>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            기초 생활습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            흡연
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {LLHB.ANSWER_1}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            음주
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {LLHB.ANSWER_2}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            복약
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {LLHB.ANSWER_3}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            위험요인
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {LLHB.ANSWER_4}
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            운동습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            운동 규칙성
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {SPHB.ANSWER_1
                                                ? SPHB.ANSWER_1
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            활동량
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {SPHB.ANSWER_2
                                                ? SPHB.ANSWER_2
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            중강도 운동량
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {SPHB.ANSWER_3
                                                ? SPHB.ANSWER_3
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            고강도 운동량
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {SPHB.ANSWER_4
                                                ? SPHB.ANSWER_4
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell rowSpan={2}>
                                            식습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            규칙적인 식사
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_1
                                                ? MLHB.ANSWER_1
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            1일 2끼이상 담백질
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_2
                                                ? MLHB.ANSWER_2
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            동물성 지방 섭취
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_3
                                                ? MLHB.ANSWER_3
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            짠음식 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_4
                                                ? MLHB.ANSWER_4
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            채소/과일 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_5
                                                ? MLHB.ANSWER_5
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            유제품 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            {MLHB.ANSWER_6
                                                ? MLHB.ANSWER_6
                                                : '-'}
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                4
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                </Detail.Survey.Table.Body>
                            </Detail.Survey.Table.Table>
                        </Detail.Survey.RowWapper>
                    )
                })}

            {pageState.modal.survey && (
                <VaryModal
                    ModalLoading={false}
                    NeedMax={false}
                    Children={
                        <>
                            <Detail.Survey.Table.Table>
                                <Detail.Survey.Table.Body>
                                    {Codes.surveyCode.map((code, index) => {
                                        return code.category.map(
                                            (category, categoryIndex) => {
                                                return (
                                                    <Detail.Survey.Table.Row
                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}`}>
                                                        {categoryIndex ===
                                                            0 && (
                                                            <Detail.Survey.Table.Cell
                                                                rowSpan={
                                                                    code
                                                                        .category
                                                                        .length
                                                                }>
                                                                {code.name}
                                                            </Detail.Survey.Table.Cell>
                                                        )}
                                                        <Detail.Survey.Table.Cell>
                                                            {category.name}
                                                        </Detail.Survey.Table.Cell>
                                                        {category.question.map(
                                                            (
                                                                question,
                                                                questionIndex
                                                            ) => {
                                                                return (
                                                                    <Detail.Survey.Table.Cell
                                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}-question-${questionIndex}`}>
                                                                        <VaryLabelCheckBox
                                                                            LabelName={
                                                                                question.name
                                                                            }
                                                                            Checked={
                                                                                false
                                                                            }
                                                                            HandleOnChange={() =>
                                                                                console.debug(
                                                                                    'HandleOnChange'
                                                                                )
                                                                            }
                                                                        />
                                                                    </Detail.Survey.Table.Cell>
                                                                )
                                                            }
                                                        )}
                                                        {[
                                                            ...new Array(
                                                                6 -
                                                                    category
                                                                        .question
                                                                        .length
                                                            ),
                                                        ].map(
                                                            (_, emptyIndex) => {
                                                                return (
                                                                    <Detail.Survey.Table.Cell
                                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}-question-empty-${emptyIndex}`}>
                                                                        {_}
                                                                    </Detail.Survey.Table.Cell>
                                                                )
                                                            }
                                                        )}
                                                    </Detail.Survey.Table.Row>
                                                )
                                            }
                                        )
                                    })}
                                </Detail.Survey.Table.Body>
                            </Detail.Survey.Table.Table>
                        </>
                    }
                    Buttons={
                        <>
                            <DefaultManageButton
                                ButtonName={'취소'}
                                ButtonClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            survey: false,
                                        },
                                    }))
                                }
                            />
                            <DefaultManageButton
                                ButtonName={'저장'}
                                ButtonClick={() => console.debug('ButtonClick')}
                            />
                        </>
                    }></VaryModal>
            )}
        </Detail.Container>
    )
}

export default ConsultDetailSurvey
