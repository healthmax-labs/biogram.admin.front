import React, { useCallback, useEffect, useState } from 'react'
import {
    ConfirmModal,
    VaryButton,
    VaryLabelCheckBox,
    VaryModal,
} from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useRecoilState } from 'recoil'
import { ConsultSurveyState } from '@Recoil/MemberPagesState'
import { useParams } from 'react-router-dom'
import {
    getMngQustnrAnswer,
    postDataQustnrAnswer,
} from '@Service/MemberService'
import Codes from '@Codes'
import Messages from '@Messages'
import _ from 'lodash'
import { useMainLayouts } from '@Hook/index'
import { dateInsertHypen } from '@Helper'

const {
    Detail: {
        Container,
        Survey: {
            Button,
            ButtonWapper,
            DateBox,
            RowWapper,
            Table: {
                Row,
                Table,
                Body,
                Cell,
                CategoryCell,
                ValueCell,
                TypeCell,
            },
        },
    },
} = ConsultDetailStyle

const ConsultDetailPartSurvey = () => {
    const initializeState = {
        modal: {
            survey: false,
            surveyConfirm: false,
        },
        surveyData: [
            {
                QUSTNR_SE_CODE: 'LLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 1,
                ANSWER_CODE: 'CM00',
                ANSWER: ['N'],
            },
            {
                QUSTNR_SE_CODE: 'LLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 2,
                ANSWER_CODE: 'MB08',
                ANSWER: ['NONE'],
            },
            {
                QUSTNR_SE_CODE: 'LLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 3,
                ANSWER_CODE: 'MB13',
                ANSWER: ['NONE'],
            },
            {
                QUSTNR_SE_CODE: 'LLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 4,
                ANSWER_CODE: 'MB17',
                ANSWER: ['NONE'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 1,
                ANSWER_CODE: 'MB14',
                ANSWER: ['LTTW'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 2,
                ANSWER_CODE: 'MB14',
                ANSWER: ['LTTW'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 3,
                ANSWER_CODE: 'MB14',
                ANSWER: ['AMNE'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 4,
                ANSWER_CODE: 'MB14',
                ANSWER: ['AMNE'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 5,
                ANSWER_CODE: 'MB14',
                ANSWER: ['LTTW'],
            },
            {
                QUSTNR_SE_CODE: 'MLHB',
                QUSTNR_SN: 1,
                QESTN_SN: 6,
                ANSWER_CODE: 'MB14',
                ANSWER: ['AMNE'],
            },

            {
                QUSTNR_SE_CODE: 'SPHB',
                QUSTNR_SN: 1,
                QESTN_SN: 1,
                ANSWER_CODE: 'CM00',
                ANSWER: ['N'],
            },
            {
                QUSTNR_SE_CODE: 'SPHB',
                QUSTNR_SN: 1,
                QESTN_SN: 2,
                ANSWER_CODE: 'MB15',
                ANSWER: ['LOTW'],
            },
            {
                QUSTNR_SE_CODE: 'SPHB',
                QUSTNR_SN: 1,
                QESTN_SN: 3,
                ANSWER_CODE: 'MB15',
                ANSWER: ['LOTW'],
            },
            {
                QUSTNR_SE_CODE: 'SPHB',
                QUSTNR_SN: 1,
                QESTN_SN: 4,
                ANSWER_CODE: 'MB16',
                ANSWER: ['LTT'],
            },
        ],
    }

    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()
    const [surveyState, setSurveyState] = useRecoilState(ConsultSurveyState)
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        modal: {
            survey: boolean
            surveyConfirm: boolean
        }
        surveyData: Array<{
            QUSTNR_SE_CODE: string
            QUSTNR_SN: number
            QESTN_SN: number
            ANSWER_CODE: string
            ANSWER: Array<string>
        }>
    }>(initializeState)

    const handleGetData = useCallback(
        async (memNo: number) => {
            setSurveyState(prevState => ({
                ...prevState,
                status: 'loading',
                memNo: memNo,
            }))

            const { status, payload } = await getMngQustnrAnswer({
                memNo: memNo,
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
        },
        [setSurveyState]
    )

    const handlSaveSurveyData = useCallback(async () => {
        const { memNo } = params
        const { status } = await postDataQustnrAnswer({
            MBER_NO: Number(memNo),
            ANSWER_LIST: _.map(pageState.surveyData, e => {
                return {
                    ...e,
                    ANSWER: e.ANSWER.join(','),
                }
            }),
        })

        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            handleGetData(Number(memNo)).then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, handleGetData, pageState.surveyData, params])

    useEffect(() => {
        const { memNo } = params

        const pageStart = () => {
            handleGetData(Number(memNo)).then()
        }

        if (memNo && Number(memNo) !== Number(surveyState.memNo)) {
            pageStart()
        }
    }, [
        surveyState.status,
        handleGetData,
        params,
        setSurveyState,
        surveyState.memNo,
    ])

    return (
        <Container>
            <ButtonWapper>
                <Button>
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'수기입력'}
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    survey: true,
                                },
                            }))
                        }
                    />
                </Button>
            </ButtonWapper>
            {surveyState.data &&
                surveyState.data.QUSTNR_ANSWERS &&
                surveyState.data.QUSTNR_ANSWERS.map((survey, index) => {
                    const {
                        ANSWER: { MLHB, SPHB, LLHB },
                    } = survey

                    return (
                        <React.Fragment
                            key={`consult-detail-survey-table-row-item-${index}`}>
                            <DateBox>
                                Date: {dateInsertHypen(survey.QUSTNR_DE)}
                            </DateBox>
                            <RowWapper>
                                <Table>
                                    <Body>
                                        <Row>
                                            <CategoryCell CellType={`blue`}>
                                                기초 생활습관
                                            </CategoryCell>
                                            <TypeCell CellType={`blue`}>
                                                흡연
                                            </TypeCell>
                                            <ValueCell CellType={`blue`}>
                                                {LLHB.ANSWER_1}
                                            </ValueCell>
                                            <TypeCell CellType={`blue`}>
                                                음주
                                            </TypeCell>
                                            <ValueCell CellType={`blue`}>
                                                {LLHB.ANSWER_2}
                                            </ValueCell>
                                            <TypeCell CellType={`blue`}>
                                                복약
                                            </TypeCell>
                                            <ValueCell CellType={`blue`}>
                                                {LLHB.ANSWER_3}
                                            </ValueCell>
                                            <TypeCell CellType={`blue`}>
                                                위험요인
                                            </TypeCell>
                                            <ValueCell CellType={`blue`}>
                                                {LLHB.ANSWER_4}
                                            </ValueCell>
                                        </Row>
                                        <Row>
                                            <CategoryCell CellType={`cyan`}>
                                                운동습관
                                            </CategoryCell>
                                            <TypeCell CellType={`cyan`}>
                                                운동 규칙성
                                            </TypeCell>
                                            <ValueCell CellType={`cyan`}>
                                                {SPHB.ANSWER_1
                                                    ? SPHB.ANSWER_1
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`cyan`}>
                                                활동량
                                            </TypeCell>
                                            <ValueCell CellType={`cyan`}>
                                                {SPHB.ANSWER_2
                                                    ? SPHB.ANSWER_2
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`cyan`}>
                                                중강도 운동량
                                            </TypeCell>
                                            <ValueCell CellType={`cyan`}>
                                                {SPHB.ANSWER_3
                                                    ? SPHB.ANSWER_3
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`cyan`}>
                                                고강도 운동량
                                            </TypeCell>
                                            <ValueCell CellType={`cyan`}>
                                                {SPHB.ANSWER_4
                                                    ? SPHB.ANSWER_4
                                                    : '-'}
                                            </ValueCell>
                                        </Row>
                                        <Row>
                                            <CategoryCell
                                                CellType={`indigo`}
                                                rowSpan={2}>
                                                식습관
                                            </CategoryCell>
                                            <TypeCell CellType={`indigo`}>
                                                규칙적인 식사
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_1
                                                    ? MLHB.ANSWER_1
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`indigo`}>
                                                1일 2끼이상 담백질
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_2
                                                    ? MLHB.ANSWER_2
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`indigo`}>
                                                동물성 지방 섭취
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_3
                                                    ? MLHB.ANSWER_3
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`indigo`}>
                                                짠음식 섭취빈도
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_4
                                                    ? MLHB.ANSWER_4
                                                    : '-'}
                                            </ValueCell>
                                        </Row>
                                        <Row>
                                            <TypeCell CellType={`indigo`}>
                                                채소/과일 섭취빈도
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_5
                                                    ? MLHB.ANSWER_5
                                                    : '-'}
                                            </ValueCell>
                                            <TypeCell CellType={`indigo`}>
                                                유제품 섭취빈도
                                            </TypeCell>
                                            <ValueCell CellType={`indigo`}>
                                                {MLHB.ANSWER_6
                                                    ? MLHB.ANSWER_6
                                                    : '-'}
                                            </ValueCell>
                                            <ValueCell
                                                CellType={`indigo`}
                                                colSpan={4}></ValueCell>
                                        </Row>
                                    </Body>
                                </Table>
                            </RowWapper>
                        </React.Fragment>
                    )
                })}

            {pageState.modal.survey && (
                <VaryModal
                    ModalLoading={false}
                    NeedMax={false}
                    Children={
                        <>
                            <Table>
                                <Body>
                                    {Codes.surveyCode.map((code, index) => {
                                        return code.category.map(
                                            (category, categoryIndex) => {
                                                const findItem = _.find(
                                                    pageState.surveyData,
                                                    {
                                                        QUSTNR_SE_CODE:
                                                            code.seCode,
                                                        QESTN_SN: category.sn,
                                                    }
                                                )

                                                return (
                                                    <Row
                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}`}>
                                                        {categoryIndex ===
                                                            0 && (
                                                            <Cell
                                                                rowSpan={
                                                                    code
                                                                        .category
                                                                        .length
                                                                }>
                                                                {code.name}
                                                            </Cell>
                                                        )}
                                                        <Cell>
                                                            {category.name}
                                                        </Cell>
                                                        {category.question.map(
                                                            (
                                                                question,
                                                                questionIndex
                                                            ) => {
                                                                return (
                                                                    <Cell
                                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}-question-${questionIndex}`}>
                                                                        <div className="flex items-center">
                                                                            <VaryLabelCheckBox
                                                                                LabelName={
                                                                                    question.name
                                                                                }
                                                                                LabelWidth={`w16`}
                                                                                Checked={(() => {
                                                                                    if (
                                                                                        !findItem
                                                                                    ) {
                                                                                        return false
                                                                                    }

                                                                                    return (
                                                                                        findItem &&
                                                                                        _.includes(
                                                                                            findItem.ANSWER,
                                                                                            question.code
                                                                                        )
                                                                                    )
                                                                                })()}
                                                                                HandleOnChange={e => {
                                                                                    setPageState(
                                                                                        prevState => ({
                                                                                            ...prevState,
                                                                                            surveyData:
                                                                                                prevState.surveyData.map(
                                                                                                    surveyData => {
                                                                                                        if (
                                                                                                            surveyData.QUSTNR_SE_CODE ===
                                                                                                                code.seCode &&
                                                                                                            surveyData.QESTN_SN ===
                                                                                                                category.sn
                                                                                                        ) {
                                                                                                            if (
                                                                                                                category.duplicate
                                                                                                            ) {
                                                                                                                if (
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .checked
                                                                                                                ) {
                                                                                                                    if (
                                                                                                                        question.code ===
                                                                                                                        'NONE'
                                                                                                                    ) {
                                                                                                                        return {
                                                                                                                            ...surveyData,
                                                                                                                            ANSWER: [
                                                                                                                                question.code,
                                                                                                                            ],
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                        return {
                                                                                                                            ...surveyData,
                                                                                                                            ANSWER: [
                                                                                                                                ..._.pull(
                                                                                                                                    surveyData.ANSWER,
                                                                                                                                    `NONE`
                                                                                                                                ),
                                                                                                                                question.code,
                                                                                                                            ],
                                                                                                                        }
                                                                                                                    }
                                                                                                                } else {
                                                                                                                    const result =
                                                                                                                        _.pull(
                                                                                                                            surveyData.ANSWER,
                                                                                                                            question.code
                                                                                                                        )
                                                                                                                    return {
                                                                                                                        ...surveyData,
                                                                                                                        ANSWER:
                                                                                                                            result.length ===
                                                                                                                            0
                                                                                                                                ? [
                                                                                                                                      `NONE`,
                                                                                                                                  ]
                                                                                                                                : result,
                                                                                                                    }
                                                                                                                }
                                                                                                            } else {
                                                                                                                return {
                                                                                                                    ...surveyData,
                                                                                                                    ANSWER: [
                                                                                                                        question.code,
                                                                                                                    ],
                                                                                                                }
                                                                                                            }
                                                                                                        } else {
                                                                                                            return surveyData
                                                                                                        }
                                                                                                    }
                                                                                                ),
                                                                                        })
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Cell>
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
                                                                    <Cell
                                                                        key={`consult-detail-survey-survey-modal-table-row-${index}-category-${categoryIndex}-question-empty-${emptyIndex}`}>
                                                                        {_}
                                                                    </Cell>
                                                                )
                                                            }
                                                        )}
                                                    </Row>
                                                )
                                            }
                                        )
                                    })}
                                </Body>
                            </Table>
                        </>
                    }
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'취소'}
                                HandleClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            survey: false,
                                        },
                                        surveyData: initializeState.surveyData,
                                    }))
                                }}
                            />
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'저장'}
                                HandleClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            surveyConfirm: true,
                                        },
                                    }))
                                }
                            />
                        </>
                    }></VaryModal>
            )}
            {pageState.modal.surveyConfirm && (
                <ConfirmModal
                    Title={Messages.Default.saveConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            surveyData: initializeState.surveyData,
                            modal: {
                                ...prevState.modal,
                                surveyConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        handlSaveSurveyData().then(() =>
                            setPageState(prevState => ({
                                ...prevState,
                                surveyData: initializeState.surveyData,
                                modal: {
                                    ...prevState.modal,
                                    survey: false,
                                    surveyConfirm: false,
                                },
                            }))
                        )
                    }}
                />
            )}
        </Container>
    )
}

export default ConsultDetailPartSurvey
