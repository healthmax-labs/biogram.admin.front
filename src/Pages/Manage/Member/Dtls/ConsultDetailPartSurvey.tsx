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

const { Detail } = ConsultDetailStyle

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
            ANSWER: 'N',
        },
        {
            QUSTNR_SE_CODE: 'LLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 2,
            ANSWER_CODE: 'MB08',
            ANSWER: 'NONE',
        },
        {
            QUSTNR_SE_CODE: 'LLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 3,
            ANSWER_CODE: 'MB13',
            ANSWER: 'NONE',
        },
        {
            QUSTNR_SE_CODE: 'LLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 4,
            ANSWER_CODE: 'MB17',
            ANSWER: 'NONE',
        },

        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 1,
            ANSWER_CODE: 'MB14',
            ANSWER: 'LTTW',
        },
        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 2,
            ANSWER_CODE: 'MB14',
            ANSWER: 'LTTW',
        },
        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 3,
            ANSWER_CODE: 'MB14',
            ANSWER: 'AMNE',
        },
        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 4,
            ANSWER_CODE: 'MB14',
            ANSWER: 'AMNE',
        },
        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 5,
            ANSWER_CODE: 'MB14',
            ANSWER: 'LTTW',
        },
        {
            QUSTNR_SE_CODE: 'MLHB',
            QUSTNR_SN: 1,
            QESTN_SN: 6,
            ANSWER_CODE: 'MB14',
            ANSWER: 'AMNE',
        },

        {
            QUSTNR_SE_CODE: 'SPHB',
            QUSTNR_SN: 1,
            QESTN_SN: 1,
            ANSWER_CODE: 'CM00',
            ANSWER: 'N',
        },
        {
            QUSTNR_SE_CODE: 'SPHB',
            QUSTNR_SN: 1,
            QESTN_SN: 2,
            ANSWER_CODE: 'MB15',
            ANSWER: 'LOTW',
        },
        {
            QUSTNR_SE_CODE: 'SPHB',
            QUSTNR_SN: 1,
            QESTN_SN: 3,
            ANSWER_CODE: 'MB15',
            ANSWER: 'LOTW',
        },
        {
            QUSTNR_SE_CODE: 'SPHB',
            QUSTNR_SN: 1,
            QESTN_SN: 4,
            ANSWER_CODE: 'MB16',
            ANSWER: 'LTT',
        },
    ],
}

const ConsultDetailPartSurvey = () => {
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
            ANSWER: string
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
            ANSWER_LIST: pageState.surveyData,
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
        <Detail.Container>
            <Detail.Survey.ButtonWapper>
                <Detail.Survey.Button>
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
                </Detail.Survey.Button>
            </Detail.Survey.ButtonWapper>
            {surveyState.data &&
                surveyState.data.QUSTNR_ANSWERS &&
                surveyState.data.QUSTNR_ANSWERS.map((survey, index) => {
                    const {
                        ANSWER: { MLHB, SPHB, LLHB },
                    } = survey

                    return (
                        <>
                            <Detail.Survey.DateBox>
                                {dateInsertHypen(survey.QUSTNR_DE)}
                            </Detail.Survey.DateBox>
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
                                            <Detail.Survey.Table.Cell
                                                rowSpan={2}>
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
                        </>
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
                                                                        <div className="flex items-center">
                                                                            <VaryLabelCheckBox
                                                                                LabelName={
                                                                                    question.name
                                                                                }
                                                                                LabelWidth={`w16`}
                                                                                Checked={
                                                                                    _.findIndex(
                                                                                        pageState.surveyData,
                                                                                        {
                                                                                            QUSTNR_SE_CODE:
                                                                                                code.seCode,
                                                                                            QESTN_SN:
                                                                                                category.sn,
                                                                                            ANSWER: question.code,
                                                                                        }
                                                                                    ) >
                                                                                    -1
                                                                                }
                                                                                HandleOnChange={() => {
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
                                                                                                            return {
                                                                                                                ...surveyData,
                                                                                                                ANSWER: question.code,
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
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'취소'}
                                HandleClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        surveyData: initializeState.surveyData,
                                        modal: {
                                            ...prevState.modal,
                                            survey: false,
                                        },
                                    }))
                                }
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
        </Detail.Container>
    )
}

export default ConsultDetailPartSurvey
