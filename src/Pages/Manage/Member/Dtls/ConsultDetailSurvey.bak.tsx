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
        console.clear()
        console.debug(Codes.surveyCode)
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
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell rowSpan={4}>
                                            기초 생활습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            흡연
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="비흡연"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="흡연"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                4
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            음주
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="없음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="월 1회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="월 2~4회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="월 5회 이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2~3회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 4회 이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            복약(중복가능)
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="없음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="비만"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="고형압"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="당뇨"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="고지형"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="기타"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            위험요인(중복가능)
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="없음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="허리둘레"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="형압"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="공복혈당"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="중성지방"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="HDL-C"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                </Detail.Survey.Table.Body>
                                <Detail.Survey.Table.Body>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell rowSpan={6}>
                                            식습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            규칙적인 식사
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2일 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3~5일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의 매일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            1일 2끼이상 단백질 섭취
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2일 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3~5일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의 매일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            동물성지방 섭취
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의먹지 않음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 1~2회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3일 이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            짠음식 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의먹지 않음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 1~2회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3일 이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            채소/과일 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2일 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3~5일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의 매일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            유제품 섭취빈도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="거의 먹지 않음"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 1~2회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3일 이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell
                                            colSpan={
                                                3
                                            }></Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                </Detail.Survey.Table.Body>
                                <Detail.Survey.Table.Body>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell rowSpan={4}>
                                            운동습관
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            운동 규칙성
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="아니요"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="예"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            활동량
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="1회 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2~3회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3~4회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 4~5회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 5~6회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="겨의 매일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            중강도 운동량
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="1회 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 2~3회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 3~4회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 4~5회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="주 5~6회"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="겨의 매일"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
                                    <Detail.Survey.Table.Row>
                                        <Detail.Survey.Table.Cell>
                                            고강도
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="20분 이하"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="20~40분"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="40~60분"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="60~90분"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                        <Detail.Survey.Table.Cell>
                                            <VaryLabelCheckBox
                                                LabelName="90분이상"
                                                Checked={false}
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                            />
                                        </Detail.Survey.Table.Cell>
                                    </Detail.Survey.Table.Row>
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
