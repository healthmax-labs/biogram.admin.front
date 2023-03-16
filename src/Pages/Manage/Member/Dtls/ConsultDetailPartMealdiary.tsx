import {
    ElementLoading,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import Slider from 'react-slick'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ConsultDetailState,
    MealDiaryListItemInterface,
    MealDiaryState,
} from '@Recoil/MemberPagesState'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { getDataDiaryMeal } from '@Service/MemberService'
import _ from 'lodash'
import {
    calCalculate,
    changeDatePickerDate,
    gmtTimeToTimeObject,
} from '@Helper'

const {
    Detail: D,
    Detail: {
        MealDiary: { RowWapper, Search, TitleBox, Table: STable, History },
    },
} = ConsultDetailStyle

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

/**
 * mealDe 타이틀 날짜 정보로 변경.
 * @param mealDe
 */
const mealDeToDate = (mealDe: string) => {
    const days = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ]

    const dateObject = new Date(
        Number(mealDe.substring(0, 4)),
        Number(Number(mealDe.substring(4, 6)) - 1),
        Number(mealDe.substring(6, 8))
    )

    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    const day = String(dateObject.getDate()).padStart(2, '0')
    const week = days[dateObject.getDay()].charAt(0)

    return `${month}/${day} (${week})`
}

const initializeState = {
    data: {
        topKal: {
            totalKcal: 0,
            carbohydrates: {
                gram: 0,
                kcal: 0,
                percent: 0,
            },
            protein: {
                gram: 0,
                kcal: 0,
                percent: 0,
            },
            fat: {
                gram: 0,
                kcal: 0,
                percent: 0,
            },
            sugars: {
                gram: 0,
                kcal: 0,
                percent: 0,
            },
        },
        titleDate: [],
        calorie: [],
        carb: [],
        protein: [],
        fat: [],
        sugar: [],
        sodium: [],
        drkwtQy: [],
    },
    average: {
        calorie: {
            kal: 0,
            diff: 0,
            symbol: '▲',
        },
        carbohydrate: {
            k: {
                k: 0,
                diff: 0,
            },
            g: {
                k: 0,
                diff: 0,
            },
            per: 0,
        },
        protein: {
            k: {
                k: 0,
                diff: 0,
            },
            g: {
                k: 0,
                diff: 0,
            },
            per: 0,
        },
        fat: {
            k: {
                k: 0,
                diff: 0,
            },
            g: {
                k: 0,
                diff: 0,
            },
            per: 0,
        },
        sugar: {
            kal: 0,
            diff: 0,
            symbol: '▲',
        },
        sodium: {
            kal: 0,
            diff: 0,
            symbol: '▲',
        },
        drkwtQy: {
            kal: 0,
            diff: 0,
            symbol: '▲',
        },
    },
}

const ConsultDetailPartMealdiary = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }

    const { memNo } = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()

    const consultDetailState = useRecoilValue(ConsultDetailState)
    const [mealDiaryState, setMealDiaryState] = useRecoilState(MealDiaryState)
    const [pageState, setPageState] = useState<{
        data: {
            // 섭취기준
            topKal: {
                totalKcal: number
                carbohydrates: {
                    gram: number
                    kcal: number
                    percent: number
                }
                protein: {
                    gram: number
                    kcal: number
                    percent: number
                }
                fat: {
                    gram: number
                    kcal: number
                    percent: number
                }
                sugars: {
                    gram: number
                    kcal: number
                    percent: number
                }
            }
            titleDate: Array<{ title: string; checked: boolean }> // 테이블 상단 타이틀
            calorie: Array<{
                // 일섭취
                kal: number
                diff: number
                symbol: '▲' | '▼'
                checked: boolean
            }>
            carb: Array<{
                // 탄수화물
                kal: number
                diff: number
                symbol: '+' | '-'
                percent: number
                checked: boolean
            }>
            protein: Array<{
                // 단백질
                kal: number
                diff: number
                symbol: '+' | '-'
                percent: number
                checked: boolean
            }>
            fat: Array<{
                // 지방
                kal: number
                diff: number
                symbol: '+' | '-'
                percent: number
                checked: boolean
            }>
            sugar: Array<{
                // 당류
                kal: number
                diff: number
                symbol: '+' | '-'
                checked: boolean
            }>
            sodium: Array<{
                // 나트륨
                kal: number
                diff: number
                symbol: '+' | '-'
                checked: boolean
            }>
            drkwtQy: Array<{
                // 수분
                kal: number
                diff: number
                symbol: '+' | '-'
                checked: boolean
            }>
        }
        average: {
            calorie: {
                kal: number
                diff: number
                symbol: string | '▲' | '▼'
            }
            carbohydrate: {
                k: {
                    k: number
                    diff: number
                }
                g: {
                    k: number
                    diff: number
                }
                per: number
            }
            protein: {
                k: {
                    k: number
                    diff: number
                }
                g: {
                    k: number
                    diff: number
                }
                per: number
            }
            fat: {
                k: {
                    k: number
                    diff: number
                }
                g: {
                    k: number
                    diff: number
                }
                per: number
            }
            sugar: {
                kal: number
                diff: number
                symbol: string | '+' | '-'
            }
            sodium: {
                kal: number
                diff: number
                symbol: string | '+' | '-'
            }
            drkwtQy: {
                kal: number
                diff: number
                symbol: string | '+' | '-'
            }
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        if (mealDiaryState.search.memNo) {
            setMealDiaryState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const {
                search: { memNo, mealDe, startDay },
            } = mealDiaryState

            const { status, payload } = await getDataDiaryMeal({
                mberNo: memNo,
                mealDe: mealDe,
                startDay: startDay,
            })

            if (status) {
                setMealDiaryState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.map(data => {
                        return {
                            ...data,
                            checked: true,
                        }
                    }),
                }))
            } else {
                setMealDiaryState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }
    }, [mealDiaryState, setMealDiaryState])

    useEffect(() => {
        // 데이터 조합 해서 로컬 스테이트에 담는다.
        const funcSetPageState = (data: MealDiaryListItemInterface[]) => {
            setPageState(prevState => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    titleDate: _.map(data, e => {
                        return {
                            title: mealDeToDate(e.MEAL_DE),
                            checked: e.checked,
                        }
                    }),
                    calorie: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: {
                                MEAL_CALORIE,
                                RECMND_CALORIE,
                            },
                        } = e
                        return {
                            kal: MEAL_CALORIE,
                            diff: RECMND_CALORIE - MEAL_CALORIE,
                            symbol: RECMND_CALORIE > MEAL_CALORIE ? '▼' : '▲',
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    carb: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: {
                                MEAL_CARBOHYDRATE,
                                MEAL_PROTEIN,
                                MEAL_FAT,
                                RECMND_CARBOHYDRATE,
                            },
                        } = e

                        const percent = parseFloat(
                            (
                                (MEAL_CARBOHYDRATE /
                                    (MEAL_CARBOHYDRATE +
                                        MEAL_PROTEIN +
                                        MEAL_FAT)) *
                                100
                            ).toFixed(0)
                        )

                        return {
                            kal: MEAL_CARBOHYDRATE,
                            diff: RECMND_CARBOHYDRATE - MEAL_CARBOHYDRATE,
                            symbol:
                                RECMND_CARBOHYDRATE > MEAL_CARBOHYDRATE
                                    ? '-'
                                    : '+',
                            percent: MEAL_CARBOHYDRATE ? percent : 0,
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    protein: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: {
                                MEAL_CARBOHYDRATE,
                                MEAL_PROTEIN,
                                MEAL_FAT,
                                RECMND_PROTEIN,
                            },
                        } = e

                        const percent = parseFloat(
                            (
                                (MEAL_PROTEIN /
                                    (MEAL_CARBOHYDRATE +
                                        MEAL_PROTEIN +
                                        MEAL_FAT)) *
                                100
                            ).toFixed(0)
                        )

                        return {
                            kal: MEAL_PROTEIN,
                            diff: Math.abs(RECMND_PROTEIN - MEAL_PROTEIN),
                            symbol: RECMND_PROTEIN > MEAL_PROTEIN ? '-' : '+',
                            percent: MEAL_PROTEIN ? percent : 0,
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    fat: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: {
                                MEAL_CARBOHYDRATE,
                                MEAL_PROTEIN,
                                MEAL_FAT,
                                RECMND_FAT,
                            },
                        } = e

                        const percent = parseFloat(
                            (
                                (MEAL_FAT /
                                    (MEAL_CARBOHYDRATE +
                                        MEAL_PROTEIN +
                                        MEAL_FAT)) *
                                100
                            ).toFixed(0)
                        )

                        return {
                            kal: MEAL_FAT,
                            diff: Math.abs(RECMND_FAT - MEAL_FAT),
                            symbol: RECMND_FAT > MEAL_FAT ? '-' : '+',
                            percent: MEAL_FAT ? percent : 0,
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    sugar: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: { MEAL_SUGAR, RECMND_SUGAR },
                        } = e

                        return {
                            kal: MEAL_SUGAR,
                            diff: Math.abs(RECMND_SUGAR - MEAL_SUGAR),
                            symbol: RECMND_SUGAR > MEAL_SUGAR ? '-' : '+',
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    sodium: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: { MEAL_SODIUM, RECMND_SODIUM },
                        } = e

                        return {
                            kal: MEAL_SODIUM,
                            diff: Math.abs(RECMND_SODIUM - MEAL_SODIUM),
                            symbol: RECMND_SODIUM > MEAL_SODIUM ? '-' : '+',
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    drkwtQy: _.map(data, (e, index) => {
                        const {
                            MEAL_NUTRITION_INFO: { DRKWT_QY, RECMND_DRKWT },
                        } = e

                        return {
                            kal: DRKWT_QY,
                            diff: Math.abs(RECMND_DRKWT - DRKWT_QY),
                            symbol: RECMND_DRKWT > DRKWT_QY ? '-' : '+',
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                },
            }))
        }

        if (mealDiaryState.list.length > 0) {
            funcSetPageState(mealDiaryState.list)
        }
    }, [mealDiaryState.list])

    // 평균 섭취 현황 구하기.
    useEffect(() => {
        const funcSetAverage = () => {
            if (_.filter(mealDiaryState.list, e => e.checked).length === 0) {
                setPageState(prevState => ({
                    ...prevState,
                    average: initializeState.average,
                }))

                return
            }
            const { data } = pageState
            const { topKal } = pageState.data
            const meanCalorie = parseFloat(
                _.meanBy(
                    _.filter(data.calorie, e => e.checked),
                    'kal'
                ).toFixed(0)
            )
            const meanCarbohydrate = parseFloat(
                _.meanBy(
                    _.filter(data.carb, e => e.checked),
                    'kal'
                ).toFixed(0)
            )
            const meanProtein = parseFloat(
                _.meanBy(
                    _.filter(data.protein, e => e.checked),
                    'kal'
                ).toFixed(0)
            )
            const meanFat = parseFloat(
                _.meanBy(
                    _.filter(data.fat, e => e.checked),
                    'kal'
                ).toFixed(0)
            )
            const meanSugar = parseFloat(_.meanBy(data.sugar, 'kal').toFixed(0))
            const meanSodium = parseFloat(
                _.meanBy(
                    _.filter(data.sodium, e => e.checked),
                    'kal'
                ).toFixed(0)
            )
            const meanDrkwtQy = parseFloat(
                _.meanBy(
                    _.filter(data.drkwtQy, e => e.checked),
                    'kal'
                ).toFixed(0)
            )

            setPageState(prevState => ({
                ...prevState,
                average: {
                    ...prevState.average,
                    calorie: {
                        kal: meanCalorie,
                        diff: topKal.totalKcal - meanCalorie,
                        symbol: topKal.totalKcal > meanCalorie ? '▼' : '▲',
                    },
                    carbohydrate: {
                        k: {
                            k: meanCarbohydrate * 4,
                            diff:
                                topKal.carbohydrates.kcal -
                                (meanCarbohydrate - 4),
                        },
                        g: {
                            k: meanCarbohydrate,
                            diff: topKal.carbohydrates.gram - meanCarbohydrate,
                        },
                        per: parseFloat(
                            _.meanBy(
                                _.filter(data.carb, e => e.checked),
                                'percent'
                            ).toFixed(0)
                        ),
                    },
                    protein: {
                        k: {
                            k: meanProtein * 4,
                            diff: topKal.protein.kcal - (meanProtein - 4),
                        },
                        g: {
                            k: meanProtein,
                            diff: topKal.protein.gram - meanProtein,
                        },
                        per: parseFloat(
                            _.meanBy(
                                _.filter(data.protein, e => e.checked),
                                'percent'
                            ).toFixed(0)
                        ),
                    },
                    fat: {
                        k: {
                            k: meanFat * 4,
                            diff: topKal.fat.kcal - (meanFat - 4),
                        },
                        g: {
                            k: meanFat,
                            diff: topKal.fat.gram - meanFat,
                        },
                        per: parseFloat(
                            _.meanBy(
                                _.filter(data.fat, e => e.checked),
                                'percent'
                            ).toFixed(0)
                        ),
                    },
                    sugar: {
                        kal: meanSugar,
                        diff: topKal.sugars.kcal - meanSugar,
                        symbol: topKal.sugars.kcal > meanSugar ? '-' : '+',
                    },
                    sodium: {
                        kal: meanSodium,
                        diff: 2000 - meanSodium,
                        symbol: 2000 > meanSodium ? '-' : '+',
                    },
                    drkwtQy: {
                        kal: meanDrkwtQy,
                        diff: 1800 - meanDrkwtQy,
                        symbol: 1800 > meanDrkwtQy ? '-' : '+',
                    },
                },
            }))
        }
        funcSetAverage()

        // FIXME : 종속성에서 pageState 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState.data, mealDiaryState.list])

    useEffect(() => {
        const pageStart = () => {
            handleGetData().then()
        }

        if (mealDiaryState.status === 'idle' && mealDiaryState.search.memNo) {
            pageStart()
        }
    }, [handleGetData, mealDiaryState.search.memNo, mealDiaryState.status])

    useEffect(() => {
        const funcMemNoSet = (memNo: number) => {
            setMealDiaryState(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    memNo: memNo,
                },
            }))
        }

        if (mealDiaryState.status === 'idle' && memNo) {
            funcMemNoSet(Number(memNo))
        }
    }, [mealDiaryState.status, memNo, setMealDiaryState])

    // 키몸무게를 이용 섭취기준 값 설정.
    useEffect(() => {
        const funcSetCalCalculate = ({
            height,
            weight,
            sex,
        }: {
            height: number
            weight: number
            sex: 'M' | 'F'
        }) => {
            setPageState(prevState => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    topKal: calCalculate({
                        height: height,
                        weight: weight,
                        sex: sex,
                    }),
                },
            }))
        }

        if (
            consultDetailState &&
            consultDetailState.detail &&
            consultDetailState.detail.MESURE_INFO
        ) {
            const {
                detail: {
                    MBER_INFO: { SEX },
                    MESURE_INFO: {
                        HEIGHT_INFO: { DATAS: HEIGHT },
                        BDWGH_INFO: { DATAS: WEIGHT },
                    },
                },
            } = consultDetailState

            funcSetCalCalculate({
                height: Number(HEIGHT),
                weight: Number(WEIGHT),
                sex: SEX,
            })
        }
    }, [consultDetailState])

    return (
        <D.Container>
            {mealDiaryState.status === 'loading' ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <RowWapper>
                        <Search.SearchBox>
                            <Search.SearchItem>
                                <VaryLabel
                                    LabelName={`날짜`}
                                    LabelWidth={'w10'}
                                />
                                <VaryDatepickerInput
                                    InputeType={`default`}
                                    Value={changeDatePickerDate(
                                        mealDiaryState.search.mealDe
                                    )}
                                    CallBackReturn={e => {
                                        const { year, monthPad, dayPad } =
                                            gmtTimeToTimeObject(e)
                                        setMealDiaryState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                mealDe: `${year}${monthPad}${dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                            </Search.SearchItem>
                            <Search.SearchItem>
                                <VaryButton
                                    ButtonType={'default'}
                                    ButtonName={'조회'}
                                    HandleClick={() => {
                                        handleGetData().then()
                                    }}
                                />
                            </Search.SearchItem>
                        </Search.SearchBox>
                    </RowWapper>
                    <RowWapper>
                        <TitleBox>섭취기준</TitleBox>
                        <STable.Table>
                            <STable.Thead>
                                <STable.TheadRow>
                                    <STable.TheadCell>총열량</STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        탄수화물
                                    </STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        단백질
                                    </STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        지방
                                    </STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        당류
                                    </STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        나트륨
                                    </STable.TheadCell>
                                    <STable.TheadCell colSpan={2}>
                                        수분
                                    </STable.TheadCell>
                                </STable.TheadRow>
                            </STable.Thead>
                            <STable.Body>
                                {(() => {
                                    const {
                                        data: {
                                            topKal: {
                                                totalKcal,
                                                carbohydrates,
                                                protein,
                                                fat,
                                                sugars,
                                            },
                                        },
                                    } = pageState

                                    return (
                                        <>
                                            <STable.Row>
                                                <STable.Cell
                                                    rowSpan={
                                                        2
                                                    }>{`${totalKcal} Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    colSpan={
                                                        2
                                                    }>{`${carbohydrates.percent}%`}</STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    {`${protein.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    {`${carbohydrates.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    {`${carbohydrates.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    * 한국인 영양섭취 성인 평균
                                                </STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    * 한국인 영양섭취 성인 평균
                                                </STable.Cell>
                                            </STable.Row>
                                            <STable.Row>
                                                <STable.Cell>{`${carbohydrates.gram}g`}</STable.Cell>
                                                <STable.Cell>{`${carbohydrates.kcal}Kcal`}</STable.Cell>
                                                <STable.Cell>{`${protein.gram}g`}</STable.Cell>
                                                <STable.Cell>{`${protein.kcal}Kcal`}</STable.Cell>
                                                <STable.Cell>{`${fat.gram}g`}</STable.Cell>
                                                <STable.Cell>{`${fat.kcal}Kcal`}</STable.Cell>
                                                <STable.Cell>{`${sugars.gram}g`}</STable.Cell>
                                                <STable.Cell>{`${sugars.kcal}Kcal`}</STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    2000 mg
                                                </STable.Cell>
                                                <STable.Cell colSpan={2}>
                                                    1800 ml
                                                </STable.Cell>
                                            </STable.Row>
                                        </>
                                    )
                                })()}
                            </STable.Body>
                        </STable.Table>
                    </RowWapper>
                    <RowWapper>
                        <TitleBox>일별 섭취현황 및 차이</TitleBox>
                        <STable.Table>
                            <STable.Thead>
                                <STable.TheadRow>
                                    <STable.TheadCell></STable.TheadCell>
                                    {pageState.data.titleDate.map(
                                        (element, titleIndex) => {
                                            return (
                                                <STable.TheadCell
                                                    colSpan={2}
                                                    key={`consult-detail-part-meal-diary-table-head-cell-item-${titleIndex}`}>
                                                    <STable.TheadCellItem>
                                                        <VaryLabelCheckBox
                                                            Checked={
                                                                element.checked
                                                            }
                                                            TextColor={`white`}
                                                            LabelReverse={true}
                                                            HandleOnChange={e => {
                                                                setMealDiaryState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        list: prevState.list.map(
                                                                            (
                                                                                list,
                                                                                listIndex
                                                                            ) => {
                                                                                if (
                                                                                    listIndex ===
                                                                                    titleIndex
                                                                                ) {
                                                                                    return {
                                                                                        ...list,
                                                                                        checked:
                                                                                            e
                                                                                                .target
                                                                                                .checked,
                                                                                    }
                                                                                }
                                                                                return list
                                                                            }
                                                                        ),
                                                                    })
                                                                )
                                                            }}
                                                            LabelName={
                                                                element.title
                                                            }
                                                        />
                                                    </STable.TheadCellItem>
                                                </STable.TheadCell>
                                            )
                                        }
                                    )}

                                    <STable.TheadCell colSpan={4}>
                                        평균 섭취 현황
                                    </STable.TheadCell>
                                </STable.TheadRow>
                            </STable.Thead>
                            <STable.Body>
                                <STable.Row>
                                    <STable.CellBg>일섭취</STable.CellBg>
                                    {_.map(
                                        pageState.data.calorie,
                                        (calorie, calorieIndex) => {
                                            const { kal, symbol, diff } =
                                                calorie

                                            let kalText = `${kal} kcal( ${symbol} ${diff})`
                                            if (kal === 0) {
                                                kalText = `${kal} kcal( - )`
                                            }

                                            if (calorieIndex % 2 == 0) {
                                                return (
                                                    <STable.Cell
                                                        colSpan={2}
                                                        key={`consult-detail-part-meal-diary-table-body-cell-eat-item-${calorieIndex}`}>
                                                        {kalText}
                                                    </STable.Cell>
                                                )
                                            }

                                            return (
                                                <STable.CellBg
                                                    colSpan={2}
                                                    key={`consult-detail-part-meal-diary-table-body-cell-eat-item-${calorieIndex}`}>
                                                    {kalText}
                                                </STable.CellBg>
                                            )
                                        }
                                    )}
                                    <STable.CellBg colSpan={4}>
                                        {(() => {
                                            const { kal, symbol, diff } =
                                                pageState.average.calorie

                                            if (kal == 0) {
                                                return <>{`${kal} kcal( - )`}</>
                                            }

                                            return (
                                                <>{`${kal} kcal( ${symbol} ${diff})`}</>
                                            )
                                        })()}
                                    </STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg></STable.CellBg>
                                    <STable.Cell>( g )</STable.Cell>
                                    <STable.Cell>( % )</STable.Cell>
                                    <STable.CellBg>( g )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.Cell>( g )</STable.Cell>
                                    <STable.Cell>( % )</STable.Cell>
                                    <STable.CellBg>( g )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.Cell>( g )</STable.Cell>
                                    <STable.Cell>( % )</STable.Cell>
                                    <STable.CellBg>( g )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.Cell>( g )</STable.Cell>
                                    <STable.Cell>( % )</STable.Cell>
                                    <STable.CellBg colSpan={2}>
                                        ( kcal )
                                    </STable.CellBg>
                                    <STable.CellBg>( g )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            탄수화물
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.carb,
                                        (carb, carbIndex) => {
                                            const {
                                                kal,
                                                symbol,
                                                percent,
                                                diff,
                                            } = carb
                                            return (
                                                <React.Fragment
                                                    key={`consult-detail-part-meal-diary-table-body-cell-carb-item-${carbIndex}`}>
                                                    <STable.TextCell
                                                        Bg={
                                                            carbIndex % 2 !== 0
                                                        }>
                                                        <STable.CellText
                                                            Color={
                                                                carbIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${kal}`}
                                                        </STable.CellText>
                                                        <STable.CellText
                                                            Color={
                                                                carbIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {kal > 0
                                                                ? `(${symbol}${diff})`
                                                                : `( - )`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                    <STable.TextCell
                                                        Bg={
                                                            carbIndex % 2 !== 0
                                                        }>
                                                        <STable.CellText
                                                            Color={
                                                                carbIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${percent}`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                </React.Fragment>
                                            )
                                        }
                                    )}
                                    <STable.TextCell colSpan={2} Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.carbohydrate.k.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.carbohydrate.k
                                                    .k == 0
                                                    ? ' - '
                                                    : pageState.average
                                                          .carbohydrate.k.diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.carbohydrate.g.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.carbohydrate.k
                                                    .k == 0
                                                    ? ' - '
                                                    : pageState.average
                                                          .carbohydrate.g.diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.carbohydrate.per}`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>
                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            단백질
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.protein,
                                        (protein, proteinIndex) => {
                                            const {
                                                kal,
                                                symbol,
                                                percent,
                                                diff,
                                            } = protein
                                            return (
                                                <React.Fragment
                                                    key={`consult-detail-part-meal-diary-table-body-cell-protein-item-${proteinIndex}`}>
                                                    <STable.TextCell
                                                        Bg={
                                                            proteinIndex % 2 !==
                                                            0
                                                        }>
                                                        <STable.CellText
                                                            Color={
                                                                proteinIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${kal}`}
                                                        </STable.CellText>
                                                        <STable.CellText
                                                            Color={
                                                                proteinIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {kal > 0
                                                                ? `(${symbol}${diff})`
                                                                : `( - )`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                    <STable.TextCell
                                                        Bg={
                                                            proteinIndex % 2 !==
                                                            0
                                                        }>
                                                        <STable.CellText
                                                            Color={
                                                                proteinIndex %
                                                                    2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${percent}`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                </React.Fragment>
                                            )
                                        }
                                    )}
                                    <STable.TextCell colSpan={2} Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.protein.k.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.protein.k
                                                    .k === 0
                                                    ? ' - '
                                                    : pageState.average.protein
                                                          .k.diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.protein.g.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.protein.k
                                                    .k === 0
                                                    ? ' - '
                                                    : pageState.average.protein
                                                          .g.diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.protein.per}`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>
                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            지방
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.fat,
                                        (fat, fatIndex) => {
                                            const {
                                                kal,
                                                symbol,
                                                percent,
                                                diff,
                                            } = fat
                                            return (
                                                <React.Fragment
                                                    key={`consult-detail-part-meal-diary-table-body-cell-fat-item-${fatIndex}`}>
                                                    <STable.TextCell
                                                        Bg={fatIndex % 2 !== 0}>
                                                        <STable.CellText
                                                            Color={
                                                                fatIndex % 2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${kal}`}
                                                        </STable.CellText>
                                                        <STable.CellText
                                                            Color={
                                                                fatIndex % 2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {kal > 0
                                                                ? `(${symbol}${diff})`
                                                                : `( - )`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                    <STable.TextCell
                                                        Bg={fatIndex % 2 !== 0}>
                                                        <STable.CellText
                                                            Color={
                                                                fatIndex % 2 !==
                                                                0
                                                                    ? `white`
                                                                    : `gray`
                                                            }>
                                                            {`${percent}`}
                                                        </STable.CellText>
                                                    </STable.TextCell>
                                                </React.Fragment>
                                            )
                                        }
                                    )}

                                    <STable.TextCell colSpan={2} Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.fat.k.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.fat.k.k === 0
                                                    ? ' - '
                                                    : pageState.average.fat.k
                                                          .diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.fat.g.k}`}
                                        </STable.CellText>
                                        <STable.CellText Color={`white`}>
                                            {`(${
                                                pageState.average.fat.k.k === 0
                                                    ? ' - '
                                                    : pageState.average.fat.g
                                                          .diff
                                            })`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            {`${pageState.average.fat.per}`}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>

                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            당류
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.sugar,
                                        (sugar, sugarIndex) => {
                                            const { kal, symbol, diff } = sugar
                                            return (
                                                <STable.TextCell
                                                    key={`consult-detail-part-meal-diary-table-sugar-cell-item-${sugarIndex}`}
                                                    Bg={sugarIndex % 2 !== 0}
                                                    colSpan={2}>
                                                    <STable.CellText
                                                        Color={
                                                            sugarIndex % 2 === 0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {`${kal}`}
                                                    </STable.CellText>
                                                    <STable.CellText
                                                        Color={
                                                            sugarIndex % 2 === 0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {kal === 0
                                                            ? `( - )`
                                                            : `(${symbol}${diff})`}
                                                    </STable.CellText>
                                                </STable.TextCell>
                                            )
                                        }
                                    )}

                                    <STable.TextCell Bg={true} colSpan={4}>
                                        <STable.CellText Color={`white`}>
                                            {(() => {
                                                const { kal, symbol, diff } =
                                                    pageState.average.sugar

                                                if (kal === 0) {
                                                    return <>{`${kal}g( - )`}</>
                                                }

                                                return (
                                                    <>{`${kal}g( ${symbol} ${diff}g)`}</>
                                                )
                                            })()}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>

                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            나트륨
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.sodium,
                                        (sodium, sodiumIndex) => {
                                            const { kal, symbol, diff } = sodium
                                            return (
                                                <STable.TextCell
                                                    key={`consult-detail-part-meal-diary-table-body-cell-sodium-item-${sodiumIndex}`}
                                                    Bg={sodiumIndex % 2 !== 0}
                                                    colSpan={2}>
                                                    <STable.CellText
                                                        Color={
                                                            sodiumIndex % 2 ===
                                                            0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {`${kal} mg`}
                                                    </STable.CellText>
                                                    <STable.CellText
                                                        Color={
                                                            sodiumIndex % 2 ===
                                                            0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {kal === 0
                                                            ? `( - )`
                                                            : `(${symbol}${diff})`}
                                                    </STable.CellText>
                                                </STable.TextCell>
                                            )
                                        }
                                    )}

                                    <STable.TextCell Bg={true} colSpan={4}>
                                        <STable.CellText Color={`white`}>
                                            {(() => {
                                                const { kal, symbol, diff } =
                                                    pageState.average.sodium

                                                if (kal === 0) {
                                                    return (
                                                        <>{`${kal}mg( - )`}</>
                                                    )
                                                }

                                                return (
                                                    <>{`${kal}mg( ${symbol} ${diff}mg)`}</>
                                                )
                                            })()}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>

                                <STable.Row>
                                    <STable.TextCell Bg={true}>
                                        <STable.CellText Color={`white`}>
                                            수분
                                        </STable.CellText>
                                    </STable.TextCell>
                                    {_.map(
                                        pageState.data.drkwtQy,
                                        (drkwtQy, drkwtQyIndex) => {
                                            const { kal, symbol, diff } =
                                                drkwtQy
                                            return (
                                                <STable.TextCell
                                                    key={`consult-detail-part-meal-diary-table-body-cell-drkwtQy-item-${drkwtQyIndex}`}
                                                    Bg={drkwtQyIndex % 2 !== 0}
                                                    colSpan={2}>
                                                    <STable.CellText
                                                        Color={
                                                            drkwtQyIndex % 2 ===
                                                            0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {`${kal} ml`}
                                                    </STable.CellText>
                                                    <STable.CellText
                                                        Color={
                                                            drkwtQyIndex % 2 ===
                                                            0
                                                                ? `gray`
                                                                : `white`
                                                        }>
                                                        {kal === 0
                                                            ? `( - )`
                                                            : `(${symbol}${diff})`}
                                                    </STable.CellText>
                                                </STable.TextCell>
                                            )
                                        }
                                    )}

                                    <STable.TextCell Bg={true} colSpan={4}>
                                        <STable.CellText Color={`white`}>
                                            {(() => {
                                                const { kal, symbol, diff } =
                                                    pageState.average.drkwtQy

                                                if (kal === 0) {
                                                    return (
                                                        <>{`${kal}ml( - )`}</>
                                                    )
                                                }

                                                return (
                                                    <>{`${kal}ml( ${symbol} ${diff}ml)`}</>
                                                )
                                            })()}
                                        </STable.CellText>
                                    </STable.TextCell>
                                </STable.Row>
                                <STable.BlankRow>
                                    <STable.Cell colSpan={19}></STable.Cell>
                                </STable.BlankRow>
                                <STable.Row>
                                    <STable.CellBg>끼니별</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg>( kcal )</STable.CellBg>
                                    <STable.CellBg>( % )</STable.CellBg>
                                    <STable.CellBg colSpan={2}>
                                        ( kcal )
                                    </STable.CellBg>
                                    <STable.CellBg colSpan={2}>
                                        ( % )
                                    </STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg>아침</STable.CellBg>
                                    <STable.Cell>360</STable.Cell>
                                    <STable.Cell>47</STable.Cell>
                                    <STable.CellBg>360</STable.CellBg>
                                    <STable.CellBg>47</STable.CellBg>
                                    <STable.Cell>360</STable.Cell>
                                    <STable.Cell>47</STable.Cell>
                                    <STable.CellBg>360</STable.CellBg>
                                    <STable.CellBg>47</STable.CellBg>
                                    <STable.Cell>360</STable.Cell>
                                    <STable.Cell>47</STable.Cell>
                                    <STable.CellBg>360</STable.CellBg>
                                    <STable.CellBg>47</STable.CellBg>
                                    <STable.Cell>360</STable.Cell>
                                    <STable.Cell>47</STable.Cell>
                                    <STable.CellBg colSpan={2}>
                                        360
                                    </STable.CellBg>
                                    <STable.CellBg colSpan={2}>
                                        47
                                    </STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg>점심</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg>저녁</STable.CellBg>
                                    <STable.Cell>413</STable.Cell>
                                    <STable.Cell>53</STable.Cell>
                                    <STable.CellBg>413</STable.CellBg>
                                    <STable.CellBg>53</STable.CellBg>
                                    <STable.Cell>413</STable.Cell>
                                    <STable.Cell>53</STable.Cell>
                                    <STable.CellBg>413</STable.CellBg>
                                    <STable.CellBg>53</STable.CellBg>
                                    <STable.Cell>413</STable.Cell>
                                    <STable.Cell>53</STable.Cell>
                                    <STable.CellBg>413</STable.CellBg>
                                    <STable.CellBg>53</STable.CellBg>
                                    <STable.Cell>413</STable.Cell>
                                    <STable.Cell>53</STable.Cell>
                                    <STable.CellBg colSpan={2}>
                                        413
                                    </STable.CellBg>
                                    <STable.CellBg colSpan={2}>
                                        53
                                    </STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg>
                                        간식(오전+오후)
                                    </STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                </STable.Row>
                                <STable.Row>
                                    <STable.CellBg>야식</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.CellBg>0</STable.CellBg>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.Cell>0</STable.Cell>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                    <STable.CellBg colSpan={2}>0</STable.CellBg>
                                </STable.Row>
                            </STable.Body>
                        </STable.Table>
                    </RowWapper>
                    <RowWapper>
                        <TitleBox>일별 식사 내역 ( 11 / 05 )</TitleBox>
                        <History.Wapper>
                            <History.ButtonBox>
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`아침`}
                                    Active={true}
                                />
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`오전간식`}
                                />
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`점심`}
                                />
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`오후간식`}
                                />
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`저녁`}
                                />
                                <VaryButton
                                    ButtonType={`button`}
                                    HandleClick={() => {
                                        //
                                    }}
                                    ButtonName={`야식`}
                                />
                            </History.ButtonBox>
                        </History.Wapper>
                        <History.Wapper>
                            <History.ImageBox.Container>
                                <History.ImageBox.ImageWapper>
                                    <History.ImageBox.ImageTitleCell>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                        <History.ImageBox.TitleBox>
                                            메뉴명: 돈육 김치찌개, 밥, 콩나물
                                        </History.ImageBox.TitleBox>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                    </History.ImageBox.ImageTitleCell>
                                    <History.ImageBox.ImageImageCell>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                        <History.ImageBox.ImageBox>
                                            <Slider {...settings}>
                                                <div>
                                                    <h3>
                                                        <img
                                                            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                                            alt=""
                                                        />
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h3>
                                                        <img
                                                            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                                            alt=""
                                                        />
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h3>
                                                        <img
                                                            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                                            alt=""
                                                        />
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h3>
                                                        <img
                                                            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                                                            alt=""
                                                        />
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h3>
                                                        <img
                                                            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                                                            alt=""
                                                        />
                                                    </h3>
                                                </div>
                                            </Slider>
                                        </History.ImageBox.ImageBox>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                    </History.ImageBox.ImageImageCell>
                                </History.ImageBox.ImageWapper>
                                <History.ImageBox.TableBox>
                                    <History.ImageBox.TableBox>
                                        <STable.Table>
                                            <STable.Body>
                                                <STable.Row>
                                                    <STable.CellBg>
                                                        식사시간
                                                    </STable.CellBg>
                                                    <STable.CellBg>
                                                        10:10
                                                    </STable.CellBg>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.CellBg>
                                                        총열량
                                                    </STable.CellBg>
                                                    <STable.CellBg>
                                                        561 kcal
                                                    </STable.CellBg>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        열량
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        2000 kcal
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        탄수화물
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        10 g
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        단백질
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        4 g
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        지방
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        3 g
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        당류
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        1 g
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell>
                                                        나트륨
                                                    </STable.Cell>
                                                    <STable.Cell>
                                                        2 g
                                                    </STable.Cell>
                                                </STable.Row>
                                            </STable.Body>
                                        </STable.Table>
                                    </History.ImageBox.TableBox>
                                </History.ImageBox.TableBox>
                            </History.ImageBox.Container>
                        </History.Wapper>
                    </RowWapper>
                </>
            )}
        </D.Container>
    )
}

export default ConsultDetailPartMealdiary
