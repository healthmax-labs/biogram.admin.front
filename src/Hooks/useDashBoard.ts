import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import {
    getMngDashBoardMberInfo,
    getMngDashBoardMberInfoSexdstn,
    getMngDashBoardRiskFctr,
    getMngDashBoardRiskFctrFctrGroup,
    getMngDashBoardRiskGroupNotUsed,
    getMngDashDoardMberInfoAges,
    getMngGndnDashBoardMybodyScoreImprvm,
    getMngDashboardMesureInfoTotal,
} from '@Service/DashBoardService'
import _ from 'lodash'

export default function useDashBoard() {
    const setDashBoardPageState = useSetRecoilState(DashBoardPageState)

    const getData = useCallback(() => {
        // 회원 현황
        const getMberInfo = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                member: {
                    ...prevState.member,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardMberInfo()

            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    member: {
                        ...prevState.member,
                        status: 'success',
                        list: _.map(payload.MBER_INFO, e => {
                            return e
                        }),
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    member: {
                        ...prevState.member,
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 성별 회원 현황
        const getMemberGenderList = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                gender: {
                    ...prevState.gender,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardMberInfoSexdstn()
            if (status) {
                const initalValue = 0
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    gender: {
                        ...prevState.gender,
                        status: 'success',
                        list: payload.MBER_INFO_LIST,
                        count: {
                            today: payload.MBER_INFO_LIST.reduce((tot, el) => {
                                return tot + el.TD_TOT_CNT
                            }, initalValue),
                            total: payload.MBER_INFO_LIST.reduce((tot, el) => {
                                return tot + el.TT_TOT_CNT
                            }, initalValue),
                        },
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    gender: {
                        ...prevState.gender,
                        status: 'failure',
                        list: [],
                        count: {
                            today: 0,
                            total: 0,
                        },
                    },
                }))
            }
        }

        // 연령별 현황
        const getAgeGroup = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                ageGroup: {
                    ...prevState.ageGroup,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashDoardMberInfoAges()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    ageGroup: {
                        ...prevState.ageGroup,
                        status: 'success',
                        list: payload.MBER_INFO_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    ageGroup: {
                        ...prevState.ageGroup,
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 위혐 요힌 현황
        const getRiskFctr = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                riskFctr: {
                    ...prevState.riskFctr,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardRiskFctr()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    riskFctr: {
                        ...prevState.riskFctr,
                        status: 'success',
                        list: payload.RISK_FCTR_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    riskFctr: {
                        ...prevState.riskFctr,
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 위험 요인별 현황
        const getfctrFctrGroup = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                fctrFctrGroup: {
                    ...prevState.fctrFctrGroup,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardRiskFctrFctrGroup()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    fctrFctrGroup: {
                        status: 'success',
                        list: payload.RISK_FCTR_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    fctrFctrGroup: {
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 위험군 휴면 현황
        const getriskGroupDormantMember = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                riskGroupDormant: {
                    ...prevState.riskGroupDormant,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardRiskGroupNotUsed()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    riskGroupDormant: {
                        status: 'success',
                        list:
                            payload.RISK_GROUP_LIST.length > 0
                                ? payload.RISK_GROUP_LIST
                                : [],
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    riskGroupDormant: {
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 측정현황 통합
        const getDashboardMesureInfoTotal = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                mesureInfo: {
                    ...prevState.mesureInfo,
                    status: 'loading',
                },
                mesureInfoZone: {
                    ...prevState.mesureInfoZone,
                    status: 'loading',
                },
                mesureInfoZoneDevice: {
                    ...prevState.mesureInfoZoneDevice,
                    status: 'loading',
                },
            }))

            let intervalCount = 1
            const { status, payload } = await getMngDashboardMesureInfoTotal()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfo: {
                        ...prevState.mesureInfo,
                        list: _.map(payload.MESURE_INFO_LIST, e => {
                            return e
                        }),
                    },
                    mesureInfoZone: {
                        ...prevState.mesureInfoZone,
                        list: payload.MESURE_TOTAL_LIST,
                    },
                    mesureInfoZoneDevice: {
                        ...prevState.mesureInfoZoneDevice,
                        list: payload.MESURE_DEVICE_LIST,
                    },
                }))

                // 한번에 바껴서 강체로 인터벌 줌.
                const timer = setInterval(() => {
                    if (intervalCount === 1) {
                        setDashBoardPageState(prevState => ({
                            ...prevState,
                            mesureInfo: {
                                ...prevState.mesureInfo,
                                status: 'success',
                            },
                        }))
                    }

                    if (intervalCount === 2) {
                        setDashBoardPageState(prevState => ({
                            ...prevState,
                            mesureInfoZone: {
                                ...prevState.mesureInfoZone,
                                status: 'success',
                            },
                        }))
                    }

                    if (intervalCount === 3) {
                        setDashBoardPageState(prevState => ({
                            ...prevState,
                            mesureInfoZoneDevice: {
                                ...prevState.mesureInfoZoneDevice,
                                status: 'success',
                            },
                        }))
                    }

                    if (intervalCount > 3) {
                        clearInterval(timer)
                    }

                    intervalCount++
                }, 500)
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfo: {
                        ...prevState.mesureInfo,
                        status: 'failure',
                    },
                    mesureInfoZone: {
                        ...prevState.mesureInfoZone,
                        status: 'failure',
                    },
                    mesureInfoZoneDevice: {
                        ...prevState.mesureInfoZoneDevice,
                        status: 'failure',
                    },
                }))
            }
        }

        const getMybodyScoreImprvm = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                mybodyScoreImprvm: {
                    ...prevState.mybodyScoreImprvm,
                    status: 'loading',
                },
            }))

            const { status, payload } =
                await getMngGndnDashBoardMybodyScoreImprvm()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mybodyScoreImprvm: {
                        ...prevState.mybodyScoreImprvm,
                        status: 'success',
                        list: payload.MYBODY_SCORE_IMPRVM_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mybodyScoreImprvm: {
                        ...prevState.mybodyScoreImprvm,
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        getMberInfo().then()
        getMemberGenderList().then()
        getAgeGroup().then()
        getRiskFctr().then()
        getfctrFctrGroup().then()
        getriskGroupDormantMember().then()
        getDashboardMesureInfoTotal().then()
        getMybodyScoreImprvm().then()

        setDashBoardPageState(prevState => ({
            ...prevState,
            status: 'end',
        }))
    }, [setDashBoardPageState])

    const handleGetGeonDaonData = () => {
        getData()
    }

    return {
        handleGetGeonDaonData,
    }
}
