import {
    ElementLoading,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
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
    addComma,
} from '@Helper'
import ConsultDetailPartMealdiaryMealHistory from './ConsultDetailPartMealdiaryMealHistory'
import { ConsultMealDiaryItemMenuListInterface } from '@Type/MemberTypes'

const {
    Detail: D,
    Detail: {
        MealDiary: { RowWapper, Search, TitleBox, Table: STable },
    },
} = ConsultDetailStyle

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

const totalMealPercent = ({
    BRFT,
    LNCH,
    DINR,
    BFSNLCSN,
    DNSN,
}: {
    BRFT: Array<{
        // 아침
        kal: number
        per: number
        checked: boolean
    }>
    LNCH: Array<{
        // 점심
        kal: number
        per: number
        checked: boolean
    }>
    DINR: Array<{
        // 저녁
        kal: number
        per: number
        checked: boolean
    }>
    BFSNLCSN: Array<{
        // 오전간식 + 오후간식
        kal: number
        per: number
        checked: boolean
    }>
    DNSN: Array<{
        // 야식
        kal: number
        per: number
        checked: boolean
    }>
}): number => {
    return (
        Number(
            _.meanBy(
                BRFT.filter(e => e.checked),
                'kal'
            ).toFixed(0)
        ) +
        Number(
            _.meanBy(
                LNCH.filter(e => e.checked),
                'kal'
            ).toFixed(0)
        ) +
        Number(
            _.meanBy(
                DINR.filter(e => e.checked),
                'kal'
            ).toFixed(0)
        ) +
        Number(
            _.meanBy(
                BFSNLCSN.filter(e => e.checked),
                'kal'
            ).toFixed(0)
        ) +
        Number(
            _.meanBy(
                DNSN.filter(e => e.checked),
                'kal'
            ).toFixed(0)
        )
    )
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
        BRFT: [],
        LNCH: [],
        DINR: [],
        BFSNLCSN: [],
        DNSN: [],
    },
    average: {
        calorie: {
            kal: 0,
            diff: 0,
            symbol: '▲',
            diffColor: '',
        },
        carbohydrate: {
            k: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            g: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            per: 0,
        },
        protein: {
            k: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            g: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            per: 0,
        },
        fat: {
            k: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            g: {
                k: 0,
                diff: 0,
                diffColor: '',
                symbol: '',
            },
            per: 0,
        },
        sugar: {
            kal: 0,
            diff: 0,
            diffColor: '',
            symbol: '▲',
        },
        sodium: {
            kal: 0,
            diff: 0,
            diffColor: '',
            symbol: '▲',
        },
        drkwtQy: {
            kal: 0,
            diff: 0,
            diffColor: '',
            symbol: '▲',
        },
        BRFT: {
            // 아침
            kal: 0,
            per: 0,
        },
        LNCH: {
            // 점심
            kal: 0,
            per: 0,
        },
        DINR: {
            // 저녁
            kal: 0,
            per: 0,
        },
        BFSNLCSN: {
            // 오전간식 + 오후간식
            kal: 0,
            per: 0,
        },
        DNSN: {
            // 야식
            kal: 0,
            per: 0,
        },
    },
    selectMealHistory: {
        mealDe: '',
        mealMenuList: [],
    },
}

const ConsultDetailPartMealdiary = () => {
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
                diffColor: 'red' | 'blue'
                checked: boolean
            }>
            carb: Array<{
                // 탄수화물
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                percent: number
                checked: boolean
            }>
            protein: Array<{
                // 단백질
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                percent: number
                checked: boolean
            }>
            fat: Array<{
                // 지방
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                percent: number
                checked: boolean
            }>
            sugar: Array<{
                // 당류
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                checked: boolean
            }>
            sodium: Array<{
                // 나트륨
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                checked: boolean
            }>
            drkwtQy: Array<{
                // 수분
                kal: number
                diff: number
                symbol: '+' | '-'
                diffColor: 'red' | 'blue'
                checked: boolean
            }>
            BRFT: Array<{
                // 아침
                kal: number
                per: number
                checked: boolean
            }>
            LNCH: Array<{
                // 점심
                kal: number
                per: number
                checked: boolean
            }>
            DINR: Array<{
                // 저녁
                kal: number
                per: number
                checked: boolean
            }>
            BFSNLCSN: Array<{
                // 오전간식 + 오후간식
                kal: number
                per: number
                checked: boolean
            }>
            DNSN: Array<{
                // 야식
                kal: number
                per: number
                checked: boolean
            }>
        }
        average: {
            calorie: {
                kal: number
                diff: number
                diffColor: string | 'red' | 'blue'
                symbol: string | '▲' | '▼'
            }
            carbohydrate: {
                k: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                g: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                per: number
            }
            protein: {
                k: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                g: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                per: number
            }
            fat: {
                k: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                g: {
                    k: number
                    diff: number
                    diffColor: string | 'red' | 'blue'
                    symbol: string | '+' | '-'
                }
                per: number
            }
            sugar: {
                kal: number
                diff: number
                diffColor: string | 'red' | 'blue'
                symbol: string | '+' | '-'
            }
            sodium: {
                kal: number
                diff: number
                diffColor: string | 'red' | 'blue'
                symbol: string | '+' | '-'
            }
            drkwtQy: {
                kal: number
                diff: number
                diffColor: string | 'red' | 'blue'
                symbol: string | '+' | '-'
            }
            BRFT: {
                // 아침
                kal: number
                per: number
            }
            LNCH: {
                // 점심
                kal: number
                per: number
            }
            DINR: {
                // 저녁
                kal: number
                per: number
            }
            BFSNLCSN: {
                // 오전간식 + 오후간식
                kal: number
                per: number
            }
            DNSN: {
                // 야식
                kal: number
                per: number
            }
        }
        selectMealHistory: {
            mealDe: string
            mealMenuList: ConsultMealDiaryItemMenuListInterface[] | null
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

    // 날짜 클릭 처리.
    const handleSelectMealHistory = (index: number) => {
        if (mealDiaryState.list[index]) {
            const { MEAL_DE, MEAL_MENU_LIST } = mealDiaryState.list[index]

            setPageState(prevState => ({
                ...prevState,
                selectMealHistory: {
                    mealDe: MEAL_DE,
                    mealMenuList: MEAL_MENU_LIST ? MEAL_MENU_LIST : [],
                },
            }))
        } else {
            return
        }
    }

    // 데이터 가공.
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
                            diff: Math.abs(RECMND_CALORIE - MEAL_CALORIE),
                            symbol: RECMND_CALORIE > MEAL_CALORIE ? '▼' : '▲',
                            diffColor:
                                RECMND_CALORIE > MEAL_CALORIE ? 'blue' : 'red',
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
                            diff: Math.abs(
                                RECMND_CARBOHYDRATE - MEAL_CARBOHYDRATE
                            ),
                            symbol:
                                RECMND_CARBOHYDRATE > MEAL_CARBOHYDRATE
                                    ? '-'
                                    : '+',
                            diffColor:
                                RECMND_CARBOHYDRATE > MEAL_CARBOHYDRATE
                                    ? 'blue'
                                    : 'red',
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
                            diffColor:
                                RECMND_PROTEIN > MEAL_PROTEIN ? 'blue' : 'red',
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
                            diffColor: RECMND_FAT > MEAL_FAT ? 'blue' : 'red',
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
                            diffColor:
                                RECMND_SUGAR > MEAL_SUGAR ? 'blue' : 'red',
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
                            diffColor:
                                RECMND_SODIUM > MEAL_SODIUM ? 'blue' : 'red',
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
                            diffColor: RECMND_DRKWT > DRKWT_QY ? 'blue' : 'red',
                            symbol: RECMND_DRKWT > DRKWT_QY ? '-' : '+',
                            checked: mealDiaryState.list[index].checked,
                        }
                    }),
                    BRFT: (() => {
                        const findList = _.map(data, e => {
                            const { MEAL_MENU_LIST } = e
                            const totalKal = _.sumBy(
                                MEAL_MENU_LIST,
                                'MEAL_CALORIE'
                            )

                            return {
                                totalKal: totalKal,
                                list: _.filter(
                                    MEAL_MENU_LIST,
                                    mml => mml.MEAL_SE_CODE === 'BRFT'
                                ),
                            }
                        })

                        return _.map(findList, (fl, index) => {
                            const kal = _.sumBy(fl.list, 'MEAL_CALORIE')
                            const per =
                                kal === 0
                                    ? 0
                                    : parseFloat(
                                          ((kal / fl.totalKal) * 100).toFixed(0)
                                      )

                            return {
                                kal: kal,
                                per: per,
                                checked: mealDiaryState.list[index].checked,
                            }
                        })
                    })(),
                    LNCH: (() => {
                        const findList = _.map(data, e => {
                            const { MEAL_MENU_LIST } = e
                            const totalKal = _.sumBy(
                                MEAL_MENU_LIST,
                                'MEAL_CALORIE'
                            )

                            return {
                                totalKal: totalKal,
                                list: _.filter(
                                    MEAL_MENU_LIST,
                                    mml => mml.MEAL_SE_CODE === 'LNCH'
                                ),
                            }
                        })

                        return _.map(findList, (fl, index) => {
                            const kal = _.sumBy(fl.list, 'MEAL_CALORIE')
                            const per =
                                kal === 0
                                    ? 0
                                    : parseFloat(
                                          ((kal / fl.totalKal) * 100).toFixed(0)
                                      )

                            return {
                                kal: kal,
                                per: per,
                                checked: mealDiaryState.list[index].checked,
                            }
                        })
                    })(),
                    DINR: (() => {
                        const findList = _.map(data, e => {
                            const { MEAL_MENU_LIST } = e
                            const totalKal = _.sumBy(
                                MEAL_MENU_LIST,
                                'MEAL_CALORIE'
                            )

                            return {
                                totalKal: totalKal,
                                list: _.filter(
                                    MEAL_MENU_LIST,
                                    mml => mml.MEAL_SE_CODE === 'DINR'
                                ),
                            }
                        })

                        return _.map(findList, (fl, index) => {
                            const kal = _.sumBy(fl.list, 'MEAL_CALORIE')
                            const per =
                                kal === 0
                                    ? 0
                                    : parseFloat(
                                          ((kal / fl.totalKal) * 100).toFixed(0)
                                      )

                            return {
                                kal: kal,
                                per: per,
                                checked: mealDiaryState.list[index].checked,
                            }
                        })
                    })(),
                    BFSNLCSN: (() => {
                        const findList = _.map(data, e => {
                            // BFSN, LCSN
                            const { MEAL_MENU_LIST } = e
                            const totalKal = _.sumBy(
                                MEAL_MENU_LIST,
                                'MEAL_CALORIE'
                            )

                            return {
                                totalKal: totalKal,
                                list: _.filter(
                                    MEAL_MENU_LIST,
                                    mml =>
                                        mml.MEAL_SE_CODE === 'BFSN' ||
                                        mml.MEAL_SE_CODE === 'LCSN'
                                ),
                            }
                        })

                        return _.map(findList, (fl, index) => {
                            const kal = _.sumBy(fl.list, 'MEAL_CALORIE')
                            const per =
                                kal === 0
                                    ? 0
                                    : parseFloat(
                                          ((kal / fl.totalKal) * 100).toFixed(0)
                                      )

                            return {
                                kal: kal,
                                per: per,
                                checked: mealDiaryState.list[index].checked,
                            }
                        })
                    })(),
                    DNSN: (() => {
                        const findList = _.map(data, e => {
                            const { MEAL_MENU_LIST } = e
                            const totalKal = _.sumBy(
                                MEAL_MENU_LIST,
                                'MEAL_CALORIE'
                            )

                            return {
                                totalKal: totalKal,
                                list: _.filter(
                                    MEAL_MENU_LIST,
                                    mml => mml.MEAL_SE_CODE === 'DNSN'
                                ),
                            }
                        })

                        return _.map(findList, (fl, index) => {
                            const kal = _.sumBy(fl.list, 'MEAL_CALORIE')
                            const per =
                                kal === 0
                                    ? 0
                                    : parseFloat(
                                          ((kal / fl.totalKal) * 100).toFixed(0)
                                      )

                            return {
                                kal: kal,
                                per: per,
                                checked: mealDiaryState.list[index].checked,
                            }
                        })
                    })(),
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
            const { topKal } = data

            setPageState(prevState => ({
                ...prevState,
                average: {
                    ...prevState.average,
                    calorie: (() => {
                        const meanCalorie = parseFloat(
                            _.meanBy(
                                _.filter(data.calorie, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            kal: meanCalorie,
                            diff: topKal.totalKcal - meanCalorie,
                            symbol: topKal.totalKcal > meanCalorie ? '▼' : '▲',
                            diffColor:
                                topKal.totalKcal > meanCalorie ? 'blue' : 'red',
                        }
                    })(),
                    carbohydrate: (() => {
                        const meanCarbohydrate = parseFloat(
                            _.meanBy(
                                _.filter(data.carb, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            k: {
                                k: meanCarbohydrate * 4,
                                diff:
                                    topKal.carbohydrates.kcal -
                                    meanCarbohydrate * 4,
                                diffColor:
                                    topKal.carbohydrates.kcal >
                                    meanCarbohydrate * 4
                                        ? 'blue'
                                        : 'red',
                                symbol:
                                    topKal.carbohydrates.kcal >
                                    meanCarbohydrate * 4
                                        ? '-'
                                        : '+',
                            },
                            g: {
                                k: meanCarbohydrate,
                                diff:
                                    topKal.carbohydrates.gram -
                                    meanCarbohydrate,
                                diffColor:
                                    topKal.carbohydrates.gram > meanCarbohydrate
                                        ? 'blue'
                                        : 'red',
                                symbol:
                                    topKal.carbohydrates.gram > meanCarbohydrate
                                        ? '-'
                                        : '+',
                            },
                            per: parseFloat(
                                _.meanBy(
                                    _.filter(data.carb, e => e.checked),
                                    'percent'
                                ).toFixed(0)
                            ),
                        }
                    })(),
                    protein: (() => {
                        const meanProtein = parseFloat(
                            _.meanBy(
                                _.filter(data.protein, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            k: {
                                k: meanProtein * 4,
                                diff: topKal.protein.kcal - meanProtein * 4,
                                diffColor:
                                    topKal.protein.kcal > meanProtein * 4
                                        ? 'blue'
                                        : 'red',
                                symbol:
                                    topKal.protein.kcal > meanProtein * 4
                                        ? '-'
                                        : '+',
                            },
                            g: {
                                k: meanProtein,
                                diff: topKal.protein.gram - meanProtein,
                                diffColor:
                                    topKal.protein.gram > meanProtein
                                        ? 'blue'
                                        : 'red',
                                symbol:
                                    topKal.protein.gram > meanProtein
                                        ? '-'
                                        : '+',
                            },
                            per: parseFloat(
                                _.meanBy(
                                    _.filter(data.protein, e => e.checked),
                                    'percent'
                                ).toFixed(0)
                            ),
                        }
                    })(),
                    fat: (() => {
                        const meanFat = parseFloat(
                            _.meanBy(
                                _.filter(data.fat, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            k: {
                                k: meanFat * 9,
                                diff: topKal.fat.kcal - meanFat * 9,
                                diffColor:
                                    topKal.fat.kcal > meanFat * 9
                                        ? 'blue'
                                        : 'red',
                                symbol:
                                    topKal.fat.kcal > meanFat * 9 ? '-' : '+',
                            },
                            g: {
                                k: meanFat,
                                diff: topKal.fat.gram - meanFat,
                                diffColor:
                                    topKal.fat.gram > meanFat ? 'blue' : 'red',
                                symbol: topKal.fat.gram > meanFat ? '-' : '+',
                            },
                            per: parseFloat(
                                _.meanBy(
                                    _.filter(data.fat, e => e.checked),
                                    'percent'
                                ).toFixed(0)
                            ),
                        }
                    })(),
                    sugar: (() => {
                        const meanSugar = parseFloat(
                            _.meanBy(data.sugar, 'kal').toFixed(0)
                        )
                        return {
                            kal: meanSugar,
                            diff: topKal.sugars.kcal - meanSugar,
                            diffColor:
                                topKal.sugars.kcal > meanSugar ? 'blue' : 'red',
                            symbol: topKal.sugars.kcal > meanSugar ? '-' : '+',
                        }
                    })(),
                    sodium: (() => {
                        const meanSodium = parseFloat(
                            _.meanBy(
                                _.filter(data.sodium, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            kal: meanSodium,
                            diff: 2000 - meanSodium,
                            diffColor: 2000 > meanSodium ? 'blue' : 'red',
                            symbol: 2000 > meanSodium ? '-' : '+',
                        }
                    })(),
                    drkwtQy: (() => {
                        const meanDrkwtQy = parseFloat(
                            _.meanBy(
                                _.filter(data.drkwtQy, e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            kal: meanDrkwtQy,
                            diff: 1800 - meanDrkwtQy,
                            diffColor: 1800 > meanDrkwtQy ? 'blue' : 'red',
                            symbol: 1800 > meanDrkwtQy ? '-' : '+',
                        }
                    })(),
                    BRFT: (() => {
                        const { BRFT, LNCH, DINR, BFSNLCSN, DNSN } =
                            pageState.data
                        const totalPercent = totalMealPercent({
                            BRFT,
                            LNCH,
                            DINR,
                            BFSNLCSN,
                            DNSN,
                        })
                        const kal = Number(
                            _.meanBy(
                                BRFT.filter(e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )
                        return {
                            kal: kal,
                            per: Number(
                                ((kal / totalPercent) * 100).toFixed(0)
                            ),
                        }
                    })(),
                    LNCH: (() => {
                        const { BRFT, LNCH, DINR, BFSNLCSN, DNSN } =
                            pageState.data
                        const totalPercent = totalMealPercent({
                            BRFT,
                            LNCH,
                            DINR,
                            BFSNLCSN,
                            DNSN,
                        })
                        const kal = Number(
                            _.meanBy(
                                LNCH.filter(e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )
                        return {
                            kal: kal,
                            per: Number(
                                ((kal / totalPercent) * 100).toFixed(0)
                            ),
                        }
                    })(),
                    DINR: (() => {
                        const { BRFT, LNCH, DINR, BFSNLCSN, DNSN } =
                            pageState.data
                        const totalPercent = totalMealPercent({
                            BRFT,
                            LNCH,
                            DINR,
                            BFSNLCSN,
                            DNSN,
                        })
                        const kal = Number(
                            _.meanBy(
                                DINR.filter(e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )
                        return {
                            kal: kal,
                            per: Number(
                                ((kal / totalPercent) * 100).toFixed(0)
                            ),
                        }
                    })(),
                    BFSNLCSN: (() => {
                        const { BRFT, LNCH, DINR, BFSNLCSN, DNSN } =
                            pageState.data
                        const totalPercent = totalMealPercent({
                            BRFT,
                            LNCH,
                            DINR,
                            BFSNLCSN,
                            DNSN,
                        })
                        const kal = Number(
                            _.meanBy(
                                BFSNLCSN.filter(e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )

                        return {
                            kal: kal,
                            per: parseFloat(
                                ((kal / totalPercent) * 100).toFixed(0)
                            ),
                        }
                    })(),
                    DNSN: (() => {
                        const { BRFT, LNCH, DINR, BFSNLCSN, DNSN } =
                            pageState.data
                        const totalPercent = totalMealPercent({
                            BRFT,
                            LNCH,
                            DINR,
                            BFSNLCSN,
                            DNSN,
                        })
                        const kal = Number(
                            _.meanBy(
                                DNSN.filter(e => e.checked),
                                'kal'
                            ).toFixed(0)
                        )
                        return {
                            kal: kal,
                            per: Number(
                                ((kal / totalPercent) * 100).toFixed(0)
                            ),
                        }
                    })(),
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
                                    PrevNextButton={true}
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
                                                    Bg={false}
                                                    rowSpan={2}>{`${addComma(
                                                    totalKcal
                                                )} Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={
                                                        2
                                                    }>{`${carbohydrates.percent}%`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    {`${protein.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    {`${carbohydrates.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    {`${carbohydrates.percent}%`}
                                                </STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    * 한국인 영양섭취 성인 평균
                                                </STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    * 한국인 영양섭취 성인 평균
                                                </STable.Cell>
                                            </STable.Row>
                                            <STable.Row>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    carbohydrates.gram
                                                )}g`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    carbohydrates.kcal
                                                )}Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    protein.gram
                                                )}g`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    protein.kcal
                                                )}Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    fat.gram
                                                )}g`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    fat.kcal
                                                )}Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    sugars.gram
                                                )}g`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}>{`${addComma(
                                                    sugars.kcal
                                                )}Kcal`}</STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    2,000 mg
                                                </STable.Cell>
                                                <STable.Cell
                                                    Bg={false}
                                                    colSpan={2}>
                                                    1,800 ml
                                                </STable.Cell>
                                            </STable.Row>
                                        </>
                                    )
                                })()}
                            </STable.Body>
                        </STable.Table>
                    </RowWapper>
                    {mealDiaryState.status === 'success' && (
                        <>
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
                                                                    LabelReverse={
                                                                        true
                                                                    }
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
                                                                    LabelClick={() =>
                                                                        handleSelectMealHistory(
                                                                            titleIndex
                                                                        )
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
                                            <STable.Cell Bg={true}>
                                                일섭취
                                            </STable.Cell>
                                            {_.map(
                                                pageState.data.calorie,
                                                (calorie, calorieIndex) => {
                                                    const {
                                                        kal,
                                                        symbol,
                                                        diff,
                                                        diffColor,
                                                    } = calorie

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )} kcal`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol} ${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.Cell
                                                            Bg={false}
                                                            colSpan={2}
                                                            key={`consult-detail-part-meal-diary-table-body-cell-eat-item-${calorieIndex}`}>
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        </STable.Cell>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={4}>
                                                {(() => {
                                                    const {
                                                        kal,
                                                        symbol,
                                                        diff,
                                                        diffColor,
                                                    } =
                                                        pageState.average
                                                            .calorie

                                                    const kalText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            kal
                                                        )} kal`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol} ${addComma(
                                                                diff
                                                            )}kal)`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kalText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell
                                                Bg={true}></STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true} colSpan={2}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( g )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
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
                                                        diffColor,
                                                    } = carb

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-carb-item-${carbIndex}`}>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.TextWapper>
                                                                    {kalText}
                                                                    {diffText}
                                                                </STable.TextWapper>
                                                            </STable.TextCell>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.CellText
                                                                    Color={`gray`}>
                                                                    {`${percent}`}
                                                                </STable.CellText>
                                                            </STable.TextCell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.TextCell
                                                colSpan={2}
                                                Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } =
                                                        pageState.average
                                                            .carbohydrate.k
                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } =
                                                        pageState.average
                                                            .carbohydrate.g
                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                <STable.CellText Color={`gray`}>
                                                    {`${pageState.average.carbohydrate.per}`}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
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
                                                        diffColor,
                                                    } = protein

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-protein-item-${proteinIndex}`}>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.TextWapper>
                                                                    {kalText}
                                                                    {diffText}
                                                                </STable.TextWapper>
                                                            </STable.TextCell>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.CellText
                                                                    Color={`gray`}>
                                                                    {`${percent}`}
                                                                </STable.CellText>
                                                            </STable.TextCell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.TextCell
                                                colSpan={2}
                                                Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } =
                                                        pageState.average
                                                            .protein.k
                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } =
                                                        pageState.average
                                                            .protein.g
                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                <STable.CellText Color={`gray`}>
                                                    {`${pageState.average.protein.per}`}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
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
                                                        diffColor,
                                                    } = fat

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-fat-item-${fatIndex}`}>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.TextWapper>
                                                                    {kalText}
                                                                    {diffText}
                                                                </STable.TextWapper>
                                                            </STable.TextCell>
                                                            <STable.TextCell
                                                                Bg={false}>
                                                                <STable.CellText
                                                                    Color={`gray`}>
                                                                    {`${percent}`}
                                                                </STable.CellText>
                                                            </STable.TextCell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}

                                            <STable.TextCell
                                                colSpan={2}
                                                Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } = pageState.average.fat.k

                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                {(() => {
                                                    const {
                                                        k,
                                                        diff,
                                                        diffColor,
                                                        symbol,
                                                    } = pageState.average.fat.g

                                                    const kText = (
                                                        <STable.NumericText
                                                            TextColor={`gray`}>{`${addComma(
                                                            k
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        k == 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextWapper>
                                                            {kText}
                                                            {diffText}
                                                        </STable.TextWapper>
                                                    )
                                                })()}
                                            </STable.TextCell>
                                            <STable.TextCell Bg={false}>
                                                <STable.CellText Color={`gray`}>
                                                    {`${pageState.average.fat.per}`}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>

                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
                                                    당류
                                                </STable.CellText>
                                            </STable.TextCell>
                                            {_.map(
                                                pageState.data.sugar,
                                                (sugar, sugarIndex) => {
                                                    const {
                                                        kal,
                                                        symbol,
                                                        diff,
                                                        diffColor,
                                                    } = sugar

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )}`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextCell
                                                            key={`consult-detail-part-meal-diary-table-sugar-cell-item-${sugarIndex}`}
                                                            Bg={false}
                                                            colSpan={2}>
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        </STable.TextCell>
                                                    )
                                                }
                                            )}

                                            <STable.TextCell
                                                Bg={false}
                                                colSpan={4}>
                                                <STable.CellText Color={`gray`}>
                                                    {(() => {
                                                        const {
                                                            kal,
                                                            symbol,
                                                            diff,
                                                            diffColor,
                                                        } =
                                                            pageState.average
                                                                .sugar

                                                        const kalText = (
                                                            <STable.NumericText
                                                                TextColor={`gray`}>{`${addComma(
                                                                kal
                                                            )}`}</STable.NumericText>
                                                        )
                                                        const diffText =
                                                            kal === 0 ? (
                                                                <STable.DiffText
                                                                    TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                            ) : (
                                                                <STable.DiffText
                                                                    TextColor={
                                                                        diffColor
                                                                    }>{` (${symbol}${addComma(
                                                                    diff
                                                                )})`}</STable.DiffText>
                                                            )

                                                        return (
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        )
                                                    })()}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>

                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
                                                    나트륨
                                                </STable.CellText>
                                            </STable.TextCell>
                                            {_.map(
                                                pageState.data.sodium,
                                                (sodium, sodiumIndex) => {
                                                    const {
                                                        kal,
                                                        symbol,
                                                        diff,
                                                        diffColor,
                                                    } = sodium

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )} mg`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText
                                                                TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )
                                                    return (
                                                        <STable.TextCell
                                                            key={`consult-detail-part-meal-diary-table-body-cell-sodium-item-${sodiumIndex}`}
                                                            Bg={false}
                                                            colSpan={2}>
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        </STable.TextCell>
                                                    )
                                                }
                                            )}

                                            <STable.TextCell
                                                Bg={false}
                                                colSpan={4}>
                                                <STable.CellText Color={`gray`}>
                                                    {(() => {
                                                        const {
                                                            kal,
                                                            symbol,
                                                            diff,
                                                            diffColor,
                                                        } =
                                                            pageState.average
                                                                .sodium

                                                        const kalText = (
                                                            <STable.NumericText
                                                                TextColor={`gray`}>{`${addComma(
                                                                kal
                                                            )} mg`}</STable.NumericText>
                                                        )
                                                        const diffText =
                                                            kal === 0 ? (
                                                                <STable.DiffText
                                                                    TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                            ) : (
                                                                <STable.DiffText
                                                                    TextColor={
                                                                        diffColor
                                                                    }>{` (${symbol}${addComma(
                                                                    diff
                                                                )}mg)`}</STable.DiffText>
                                                            )

                                                        return (
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        )
                                                    })()}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>

                                        <STable.Row>
                                            <STable.TextCell Bg={true}>
                                                <STable.CellText
                                                    Color={`white`}>
                                                    수분
                                                </STable.CellText>
                                            </STable.TextCell>
                                            {_.map(
                                                pageState.data.drkwtQy,
                                                (drkwtQy, drkwtQyIndex) => {
                                                    const {
                                                        kal,
                                                        symbol,
                                                        diff,
                                                        diffColor,
                                                    } = drkwtQy

                                                    const kalText = (
                                                        <STable.NumericText>{`${addComma(
                                                            kal
                                                        )} ml`}</STable.NumericText>
                                                    )
                                                    const diffText =
                                                        kal === 0 ? (
                                                            <STable.DiffText>{` ( - )`}</STable.DiffText>
                                                        ) : (
                                                            <STable.DiffText
                                                                TextColor={
                                                                    diffColor
                                                                }>{` (${symbol}${addComma(
                                                                diff
                                                            )})`}</STable.DiffText>
                                                        )

                                                    return (
                                                        <STable.TextCell
                                                            key={`consult-detail-part-meal-diary-table-body-cell-drkwtQy-item-${drkwtQyIndex}`}
                                                            Bg={false}
                                                            colSpan={2}>
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        </STable.TextCell>
                                                    )
                                                }
                                            )}

                                            <STable.TextCell
                                                Bg={false}
                                                colSpan={4}>
                                                <STable.CellText Color={`gray`}>
                                                    {(() => {
                                                        const {
                                                            kal,
                                                            symbol,
                                                            diff,
                                                            diffColor,
                                                        } =
                                                            pageState.average
                                                                .drkwtQy

                                                        const kalText = (
                                                            <STable.NumericText
                                                                TextColor={`gray`}>{`${addComma(
                                                                kal
                                                            )} ml`}</STable.NumericText>
                                                        )
                                                        const diffText =
                                                            kal === 0 ? (
                                                                <STable.DiffText
                                                                    TextColor={`gray`}>{` ( - )`}</STable.DiffText>
                                                            ) : (
                                                                <STable.DiffText
                                                                    TextColor={
                                                                        diffColor
                                                                    }>{` (${symbol}${addComma(
                                                                    diff
                                                                )}ml)`}</STable.DiffText>
                                                            )

                                                        return (
                                                            <STable.TextWapper>
                                                                {kalText}
                                                                {diffText}
                                                            </STable.TextWapper>
                                                        )
                                                    })()}
                                                </STable.CellText>
                                            </STable.TextCell>
                                        </STable.Row>
                                        <STable.BlankRow>
                                            <STable.Cell
                                                Bg={false}
                                                colSpan={19}></STable.Cell>
                                        </STable.BlankRow>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                끼니별
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true}>
                                                ( % )
                                            </STable.Cell>
                                            <STable.Cell Bg={true} colSpan={2}>
                                                ( kcal )
                                            </STable.Cell>
                                            <STable.Cell Bg={true} colSpan={2}>
                                                ( % )
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                아침
                                            </STable.Cell>
                                            {pageState.data.BRFT.map(
                                                (brft, brftIndex) => {
                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-BRFT-item-${brftIndex}`}>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${addComma(
                                                                brft.kal
                                                            )}`}</STable.Cell>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${brft.per}`}</STable.Cell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.BRFT.kal
                                                )}`}
                                            </STable.Cell>
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.BRFT.per
                                                )}`}
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                점심
                                            </STable.Cell>
                                            {pageState.data.LNCH.map(
                                                (lnch, lnchIndex) => {
                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-LNCH-item-${lnchIndex}`}>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${addComma(
                                                                lnch.kal
                                                            )}`}</STable.Cell>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${lnch.per}`}</STable.Cell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.LNCH.kal
                                                )}`}
                                            </STable.Cell>
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${pageState.average.LNCH.per}`}
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                저녁
                                            </STable.Cell>
                                            {pageState.data.DINR.map(
                                                (dinr, dinrIndex) => {
                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-DINR-item-${dinrIndex}`}>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${addComma(
                                                                dinr.kal
                                                            )}`}</STable.Cell>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${dinr.per}`}</STable.Cell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.DINR.kal
                                                )}`}
                                            </STable.Cell>
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${pageState.average.DINR.per}`}
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                간식(오전+오후)
                                            </STable.Cell>
                                            {pageState.data.BFSNLCSN.map(
                                                (bfsnlcsn, bfsnlcsnIndex) => {
                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-BFSNLCSN-item-${bfsnlcsnIndex}`}>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${addComma(
                                                                bfsnlcsn.kal
                                                            )}`}</STable.Cell>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${bfsnlcsn.per}`}</STable.Cell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.BFSNLCSN
                                                        .kal
                                                )}`}
                                            </STable.Cell>
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${pageState.average.BFSNLCSN.per}`}
                                            </STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell Bg={true}>
                                                야식
                                            </STable.Cell>
                                            {pageState.data.DNSN.map(
                                                (dnsn, dnsnIndex) => {
                                                    return (
                                                        <React.Fragment
                                                            key={`consult-detail-part-meal-diary-table-body-cell-DNSN-item-${dnsnIndex}`}>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${addComma(
                                                                dnsn.kal
                                                            )}`}</STable.Cell>
                                                            <STable.Cell
                                                                Bg={
                                                                    false
                                                                }>{`${dnsn.per}`}</STable.Cell>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )}
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${addComma(
                                                    pageState.average.DNSN.kal
                                                )}`}
                                            </STable.Cell>
                                            <STable.Cell Bg={false} colSpan={2}>
                                                {`${pageState.average.DNSN.per}`}
                                            </STable.Cell>
                                        </STable.Row>
                                    </STable.Body>
                                </STable.Table>
                            </RowWapper>
                            <RowWapper>
                                <ConsultDetailPartMealdiaryMealHistory
                                    MealDe={pageState.selectMealHistory.mealDe}
                                    MealMenuList={
                                        pageState.selectMealHistory.mealMenuList
                                    }
                                />
                            </RowWapper>
                        </>
                    )}
                </>
            )}
        </D.Container>
    )
}

export default ConsultDetailPartMealdiary
