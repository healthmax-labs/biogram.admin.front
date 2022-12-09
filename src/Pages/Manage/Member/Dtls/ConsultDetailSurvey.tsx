import { useState } from 'react'
import { DefaultManageButton, VaryLabelCheckBox, VaryModal } from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const { Detail } = ConsultDetailStyle

const ConsultDetailSurvey = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            survey: boolean
        }
    }>({
        modal: {
            survey: false,
        },
    })
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
            <Detail.Survey.RowWapper>
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
                                아니요
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                음주
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                훨 1회 이하
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                복약
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                위험요인
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                혈압, 고치혈증
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                활동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                중강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                고강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                1일 2끼이상 담백질
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                동물성 지방 섭취
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                짠음식 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                        <Detail.Survey.Table.Row>
                            <Detail.Survey.Table.Cell>
                                채소/과일 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                유제품 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell
                                colSpan={4}></Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                    </Detail.Survey.Table.Body>
                </Detail.Survey.Table.Table>
            </Detail.Survey.RowWapper>
            <Detail.Survey.RowWapper>
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
                                아니요
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                음주
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                훨 1회 이하
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                복약
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                위험요인
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                혈압, 고치혈증
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                활동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                중강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                고강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                1일 2끼이상 담백질
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                동물성 지방 섭취
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                짠음식 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                        <Detail.Survey.Table.Row>
                            <Detail.Survey.Table.Cell>
                                채소/과일 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                유제품 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell
                                colSpan={4}></Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                    </Detail.Survey.Table.Body>
                </Detail.Survey.Table.Table>
            </Detail.Survey.RowWapper>

            <Detail.Survey.RowWapper>
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
                                아니요
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                음주
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                훨 1회 이하
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                복약
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                위험요인
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                혈압, 고치혈증
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                활동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                중강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                고강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                1일 2끼이상 담백질
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                동물성 지방 섭취
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                짠음식 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                        <Detail.Survey.Table.Row>
                            <Detail.Survey.Table.Cell>
                                채소/과일 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                유제품 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell
                                colSpan={4}></Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                    </Detail.Survey.Table.Body>
                </Detail.Survey.Table.Table>
            </Detail.Survey.RowWapper>

            <Detail.Survey.RowWapper>
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
                                아니요
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                음주
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                훨 1회 이하
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                복약
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                위험요인
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                혈압, 고치혈증
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                활동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                중강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                고강도 운동량
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
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
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                1일 2끼이상 담백질
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                동물성 지방 섭취
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                짠음식 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                        <Detail.Survey.Table.Row>
                            <Detail.Survey.Table.Cell>
                                채소/과일 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                유제품 섭취빈도
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell>
                                -
                            </Detail.Survey.Table.Cell>
                            <Detail.Survey.Table.Cell
                                colSpan={4}></Detail.Survey.Table.Cell>
                        </Detail.Survey.Table.Row>
                    </Detail.Survey.Table.Body>
                </Detail.Survey.Table.Table>
            </Detail.Survey.RowWapper>
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
