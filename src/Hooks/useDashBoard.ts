import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import {
    getMngDashBoardMberInfo,
    getMngDashBoardMberInfoSexdstn,
    getMngDashBoardMesureInfo,
    getMngDashBoardMesureInfoZone,
    getMngDashBoardMesureInfoZoneDevice,
    getMngDashBoardRiskFctr,
    getMngDashBoardRiskFctrFctrGroup,
    getMngDashBoardRiskGroupNotUsed,
    getMngDashDoardMberInfoAges,
    getMngGndnDashBoardMybodyScoreImprvm,
} from '@Service/DashBoardService'

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
                        list: payload.MBER_INFO_LIST,
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
                        list: payload.RISK_GROUP_LIST,
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

        // 측정현황
        const getMesureInfo = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                mesureInfo: {
                    ...prevState.mesureInfo,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardMesureInfo()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfo: {
                        status: 'success',
                        list: payload.MESURE_INFO_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfo: {
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 존 측정 현황
        const getMesureInfoZone = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                mesureInfoZone: {
                    ...prevState.mesureInfoZone,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngDashBoardMesureInfoZone()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfoZone: {
                        ...prevState.mesureInfoZone,
                        status: 'success',
                        list: payload.MESURE_INFO_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfoZone: {
                        ...prevState.mesureInfoZone,
                        status: 'failure',
                        list: [],
                    },
                }))
            }
        }

        // 존 기기별 측정현황
        const getMesureInfoZoneDevice = async () => {
            setDashBoardPageState(prevState => ({
                ...prevState,
                mesureInfoZoneDevice: {
                    ...prevState.mesureInfoZoneDevice,
                    status: 'loading',
                },
            }))
            const { status, payload } =
                await getMngDashBoardMesureInfoZoneDevice()
            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfoZoneDevice: {
                        ...prevState.mesureInfoZoneDevice,
                        status: 'success',
                        list: payload.MESURE_INFO_LIST,
                    },
                }))
            } else {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    mesureInfoZoneDevice: {
                        ...prevState.mesureInfoZoneDevice,
                        status: 'failure',
                        list: [],
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
        getMesureInfo().then()
        getMesureInfoZone().then()
        getMesureInfoZoneDevice().then()
        getMybodyScoreImprvm().then()
    }, [setDashBoardPageState])

    const handleGetGeonDaonData = () => {
        getData()

        setDashBoardPageState(prevState => ({
            ...prevState,
            status: 'end',
        }))
    }

    return {
        handleGetGeonDaonData,
    }
}
