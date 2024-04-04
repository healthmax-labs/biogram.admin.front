import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailPartsMain from './ConsultDetailPartsMain'
import ConsultDetailRightBox from './ConsultDetailRightBox'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { getMemberInfo } from '@Service/MemberService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { useSetRecoilState } from 'recoil'
import {
    ConsultDetailChartSmsState,
    ConsultDetailState,
} from '@Recoil/MemberPagesState'

const {
    DetailPage: { Container, ChartLeftWapper, ChartRightWapper },
} = PageContainerStyle

const ConsultDetailMain = () => {
    const { memNo } = useParams<{ memNo: string }>()
    const { handlMainAlert } = useMainLayouts()
    const setConsultDetail = useSetRecoilState(ConsultDetailState)
    const setDetailChartSmsState = useSetRecoilState(ConsultDetailChartSmsState)

    const handleGetMemberInfo = useCallback(async () => {
        if (memNo) {
            setConsultDetail(prevState => ({
                ...prevState,
                status: 'loading',
                memNo: Number(memNo),
            }))

            const { status, payload } = await getMemberInfo({
                mber_no: Number(memNo),
            })

            if (status) {
                setConsultDetail(prevState => ({
                    ...prevState,
                    status: 'success',
                    detail: payload,
                }))

                setDetailChartSmsState(prevState => ({
                    ...prevState,
                    sms: {
                        ...prevState.sms,
                        SMS_SJ: Messages.Default.sms.smsSj,
                        SEND_MBER_INFO_LIST: [
                            ...prevState.sms.SEND_MBER_INFO_LIST,
                            {
                                MBER_NO: memNo,
                                MBTLNUM: payload.MBER_INFO.MBTLNUM,
                                MBTLNUM_CRTFC_AT:
                                    payload.MBER_INFO.MBTLNUM_CRTFC_AT,
                                USID: payload.MBER_INFO.USID,
                                NM: payload.MBER_INFO.NM,
                                SV00_NTCN_AT: 'Y', // 전송동의한 회원인지
                            },
                        ],
                    },
                }))
            } else {
                setConsultDetail(prevState => ({
                    ...prevState,
                    status: 'failure',
                    detail: null,
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
                })
            }
        }
    }, [handlMainAlert, memNo, setConsultDetail, setDetailChartSmsState])

    useEffect(() => {
        const pageStart = () => {
            if (memNo) {
                setDetailChartSmsState(prevState => ({
                    ...prevState,
                    chart: {
                        CNST: '',
                        MBER_NO: Number(memNo),
                        PLN: '',
                        REG_NM: '',
                        CNST_NO: null,
                        MNG_ID: '',
                        MNG_NM: '',
                        MOD_DT: '',
                        MOD_MNG_NM: '',
                        REGDT: '',
                    },
                }))
                handleGetMemberInfo().then()
            }
        }

        pageStart()
    }, [handleGetMemberInfo, memNo, setDetailChartSmsState])
    return (
        <Container>
            <ChartLeftWapper>
                <ConsultDetailPartsMain HandleGetData={handleGetMemberInfo} />
            </ChartLeftWapper>
            <ChartRightWapper>
                <ConsultDetailRightBox />
            </ChartRightWapper>
        </Container>
    )
}

export default ConsultDetailMain
