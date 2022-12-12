import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
const { Detail } = ConsultDetailStyle

const ConsultDetailMealdiary = () => {
    return (
        <>
            {/* <Detail.Container>
                <Detail.MealDiary.RowWapper>
                    <Detail.MealDiary.TableStep1.Table>
                        <Detail.MealDiary.TableStep1.Body>
                            <Detail.MealDiary.TableStep1.TheadRow>
                                <Detail.MealDiary.TableStep1.TheadCell>
                                    || 섭취 기준
                                </Detail.MealDiary.TableStep1.TheadCell>
                            </Detail.MealDiary.TableStep1.TheadRow>
                            <Detail.MealDiary.TableStep1.TheadRow>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    rowSpan={3}>
                                    건다온님의 섭취기준
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    총열량
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    탄수화물
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    단백질
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    지방
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    당류
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    나트륨
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                                <Detail.MealDiary.TableStep1.TheadCellBg
                                    colSpan={2}>
                                    수분
                                </Detail.MealDiary.TableStep1.TheadCellBg>
                            </Detail.MealDiary.TableStep1.TheadRow>
                            <Detail.MealDiary.TableStep1.Row>
                                <Detail.MealDiary.TableStep1.Cell
                                    colSpan={2}
                                    rowSpan={2}>
                                    1732kcal
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    52 %
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    19 %
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    29 %
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    *총 에너지 섭취의 10% 이내
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    *한국인 영양섭취 성인 평균
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    *한국인 영양섭취 성인 평균
                                </Detail.MealDiary.TableStep1.Cell>
                            </Detail.MealDiary.TableStep1.Row>
                            <Detail.MealDiary.TableStep1.Row>
                                <Detail.MealDiary.TableStep1.Cell>
                                    254 g
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    1017 kcal
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    95 g
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    381 kcal
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    64 g
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    572 kcal
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    49 g
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell>
                                    197 kcal
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    2000
                                </Detail.MealDiary.TableStep1.Cell>
                                <Detail.MealDiary.TableStep1.Cell colSpan={2}>
                                    1800ml
                                </Detail.MealDiary.TableStep1.Cell>
                            </Detail.MealDiary.TableStep1.Row>
                        </Detail.MealDiary.TableStep1.Body>
                    </Detail.MealDiary.TableStep1.Table>
                </Detail.MealDiary.RowWapper>
                <Detail.MealDiary.RowWapper>
                    <Detail.MealDiary.TableStep2.Table>
                        <Detail.MealDiary.TableStep2.Thead>
                            <Detail.MealDiary.TableStep2.TheadRow>
                                <Detail.MealDiary.TableStep2.TheadCell>
                                    || 일별섭취현황 및 차이
                                </Detail.MealDiary.TableStep2.TheadCell>
                            </Detail.MealDiary.TableStep2.TheadRow>
                            <Detail.MealDiary.TableStep2.TheadRow>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={
                                        2
                                    }></Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/02(금)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/03(토)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/04(일)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/05(월)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/06(화)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/07(수)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                                <Detail.MealDiary.TableStep2.TheadCellBg
                                    colSpan={4}>
                                    <div className="cursor-pointer">
                                        12/08(목)
                                    </div>
                                </Detail.MealDiary.TableStep2.TheadCellBg>
                            </Detail.MealDiary.TableStep2.TheadRow>
                        </Detail.MealDiary.TableStep2.Thead>
                        <Detail.MealDiary.TableStep2.Body>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    일섭취
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={4}>
                                    0 kcal ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (g)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    탄수화물
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    단백질
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    지방
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    0
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    당류
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    나트륨
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    수분
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    0 ( - )
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                        </Detail.MealDiary.TableStep2.Body>
                        <Detail.MealDiary.TableStep2.Body>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell></Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                        </Detail.MealDiary.TableStep2.Body>
                        <Detail.MealDiary.TableStep2.Body>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}>
                                    끼니별
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    Bg={`gray`}
                                    colSpan={2}
                                    Diagonal={
                                        true
                                    }></Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (kcal)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell Bg={`gray`}>
                                    (%)
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    아침
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    점심
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    저녁
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    간식(오전+오후)
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                            <Detail.MealDiary.TableStep2.Row>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell
                                    colSpan={2}
                                    Bg={`gray`}>
                                    야식
                                </Detail.MealDiary.TableStep2.Cell>
                                <Detail.MealDiary.TableStep2.Cell colSpan={2}>
                                    -
                                </Detail.MealDiary.TableStep2.Cell>
                            </Detail.MealDiary.TableStep2.Row>
                        </Detail.MealDiary.TableStep2.Body>
                    </Detail.MealDiary.TableStep2.Table>
                </Detail.MealDiary.RowWapper>
                <Detail.MealDiary.RowWapper></Detail.MealDiary.RowWapper>
            </Detail.Container> */}
        </>
    )
}

export default ConsultDetailMealdiary
