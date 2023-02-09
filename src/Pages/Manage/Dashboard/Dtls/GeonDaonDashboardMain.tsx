import { useCallback, useEffect } from 'react'
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
import GeonDaonDashboard from './GeonDaonDashboard'
import {
    FctrFctrGroupListState,
    MemberAgeGroupListState,
    MemberGenderListState,
    MemberListState,
    MesureInfoState,
    MesureInfoZoneDeviceState,
    MesureInfoZoneState,
    MybodyScoreImprvmState,
    RiskFctrListState,
    RiskGroupDormantMemberListState,
} from '@Recoil/DashboardPagesState'
import { useRecoilState } from 'recoil'

const GeonDaonDashboardMain = () => {
    const [memberListState, setMemberListState] =
        useRecoilState(MemberListState)
    const [memberGenderListState, setMemberGenderListState] = useRecoilState(
        MemberGenderListState
    )
    const [memberAgeGroupListState, setMemberAgeGroupListState] =
        useRecoilState(MemberAgeGroupListState)
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)
    const [fctrFctrGroupListState, setFctrFctrGroupListState] = useRecoilState(
        FctrFctrGroupListState
    )
    const [
        riskGroupDormantMemberListState,
        setRiskGroupDormantMemberListState,
    ] = useRecoilState(RiskGroupDormantMemberListState)
    const [mesureInfoState, setMesureInfoState] =
        useRecoilState(MesureInfoState)
    const [mesureInfoZoneState, setMesureInfoZoneState] =
        useRecoilState(MesureInfoZoneState)
    const [mesureInfoZoneDeviceState, setMesureInfoZoneDeviceState] =
        useRecoilState(MesureInfoZoneDeviceState)
    const [mybodyScoreImprvmState, setMybodyScoreImprvmState] = useRecoilState(
        MybodyScoreImprvmState
    )

    const getData = useCallback(() => {
        // 회원 현황
        const getMberInfo = async () => {
            setMemberListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardMberInfo()

            if (status) {
                setMemberListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MBER_INFO_LIST,
                }))
            } else {
                setMemberListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 성별 회원 현황
        const getMemberGenderList = async () => {
            setMemberGenderListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardMberInfoSexdstn()
            if (status) {
                const initalValue = 0
                setMemberGenderListState(prevState => ({
                    ...prevState,
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
                }))
            } else {
                setMemberGenderListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 연령별 현황
        const getAgeGroup = async () => {
            setMemberAgeGroupListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashDoardMberInfoAges()
            if (status) {
                setMemberAgeGroupListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MBER_INFO_LIST,
                }))
            } else {
                setMemberAgeGroupListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 위혐 요힌 현황
        const getRiskFctr = async () => {
            setRiskFctrListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardRiskFctr()
            if (status) {
                setRiskFctrListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.RISK_FCTR_LIST,
                }))
            } else {
                setRiskFctrListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 위험 요인별 현황
        const getfctrFctrGroup = async () => {
            setFctrFctrGroupListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardRiskFctrFctrGroup()
            if (status) {
                setFctrFctrGroupListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.RISK_FCTR_LIST,
                }))
            } else {
                setFctrFctrGroupListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 위험군 휴면 현황
        const getriskGroupDormantMember = async () => {
            setRiskGroupDormantMemberListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardRiskGroupNotUsed()
            if (status) {
                setRiskGroupDormantMemberListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.RISK_GROUP_LIST,
                }))
            } else {
                setRiskGroupDormantMemberListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 측정현황
        const getMesureInfo = async () => {
            setMesureInfoState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardMesureInfo()
            if (status) {
                setMesureInfoState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MESURE_INFO_LIST,
                }))
            } else {
                setMesureInfoState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 존 측정 현황
        const getMesureInfoZone = async () => {
            setMesureInfoZoneState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngDashBoardMesureInfoZone()
            if (status) {
                setMesureInfoZoneState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MESURE_INFO_LIST,
                }))
            } else {
                setMesureInfoZoneState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        // 존 기기별 측정현황
        const getMesureInfoZoneDevice = async () => {
            setMesureInfoZoneDeviceState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const { status, payload } =
                await getMngDashBoardMesureInfoZoneDevice()
            if (status) {
                setMesureInfoZoneDeviceState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MESURE_INFO_LIST,
                }))
            } else {
                setMesureInfoZoneDeviceState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        const getMybodyScoreImprvm = async () => {
            setMybodyScoreImprvmState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } =
                await getMngGndnDashBoardMybodyScoreImprvm()
            if (status) {
                setMybodyScoreImprvmState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: payload.MYBODY_SCORE_IMPRVM_LIST,
                }))
            } else {
                setMybodyScoreImprvmState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: [],
                }))
            }
        }

        if (memberListState.status === 'idle') {
            getMberInfo().then()
        }

        if (memberGenderListState.status === 'idle') {
            getMemberGenderList().then()
        }

        if (memberAgeGroupListState.status === 'idle') {
            getAgeGroup().then()
        }

        if (riskFctrListState.status === 'idle') {
            getRiskFctr().then()
        }

        if (fctrFctrGroupListState.status === 'idle') {
            getfctrFctrGroup().then()
        }

        if (riskGroupDormantMemberListState.status === 'idle') {
            getriskGroupDormantMember().then()
        }

        if (mesureInfoState.status === 'idle') {
            getMesureInfo().then()
        }

        if (mesureInfoZoneState.status === 'idle') {
            getMesureInfoZone().then()
        }

        if (mesureInfoZoneDeviceState.status === 'idle') {
            getMesureInfoZoneDevice().then()
        }

        if (mybodyScoreImprvmState.status === 'idle') {
            getMybodyScoreImprvm().then()
        }
    }, [
        fctrFctrGroupListState.status,
        memberAgeGroupListState.status,
        memberGenderListState.status,
        memberListState.status,
        mesureInfoState.status,
        mesureInfoZoneDeviceState.status,
        mesureInfoZoneState.status,
        mybodyScoreImprvmState.status,
        riskFctrListState.status,
        riskGroupDormantMemberListState.status,
        setFctrFctrGroupListState,
        setMemberAgeGroupListState,
        setMemberGenderListState,
        setMemberListState,
        setMesureInfoState,
        setMesureInfoZoneDeviceState,
        setMesureInfoZoneState,
        setMybodyScoreImprvmState,
        setRiskFctrListState,
        setRiskGroupDormantMemberListState,
    ])

    useEffect(() => {
        const pageStart = () => {
            getData()
        }

        pageStart()
    }, [getData])

    return <GeonDaonDashboard />
}

export default GeonDaonDashboardMain
