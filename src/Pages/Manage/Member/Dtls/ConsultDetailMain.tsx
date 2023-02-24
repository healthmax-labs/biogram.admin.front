import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailTable from './ConsultDetailTable'
import ConsultDetailTableMessageBox from './ConsultDetailTableMessageBox'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { getMemberInfo } from '@Service/MemberService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import {
    ConsultDetailChartState,
    ConsultDetailSmsSendState,
    ConsultDetailState,
} from '@Recoil/MemberPagesState'

const {
    DetailPage: { Container, ChartLeftWapper, ChartRightWapper },
} = PageContainerStyle

const ConsultDetailMain = () => {
    const { memNo } = useParams<{ memNo: string }>()
    const { handlMainAlert } = useMainLayouts()
    const setConsultDetail = useSetRecoilState(ConsultDetailState)
    const setConsultChart = useSetRecoilState(ConsultDetailChartState)
    const setConsultSmsSend = useSetRecoilState(ConsultDetailSmsSendState)
    const resetConsultSmsSend = useResetRecoilState(ConsultDetailSmsSendState)

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

                setConsultSmsSend(prevState => ({
                    ...prevState,
                    send: {
                        ...prevState.send,
                        SMS_SJ: Messages.Default.sms.smsSj,
                        SEND_MBER_INFO_LIST: [
                            ...prevState.send.SEND_MBER_INFO_LIST,
                            {
                                MBER_NO: memNo,
                                MBTLNUM: payload.MBER_INFO.MBTLNUM,
                                MBTLNUM_CRTFC_AT:
                                    payload.MBER_INFO.MBTLNUM_CRTFC_AT,
                                USID: payload.MBER_INFO.USID,
                                NM: payload.MBER_INFO.NM,
                                SV00_NTCN_AT: 'Y', // FIXME: 이게 뭔지?
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
    }, [handlMainAlert, memNo, setConsultDetail, setConsultSmsSend])

    useEffect(() => {
        const pageStart = () => {
            if (memNo) {
                setConsultChart(() => ({
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
                }))
                resetConsultSmsSend()
                handleGetMemberInfo().then()
            }
        }

        pageStart()
    }, [handleGetMemberInfo, memNo, resetConsultSmsSend, setConsultChart])
    return (
        <Container>
            <ChartLeftWapper>
                <ConsultDetailTable />
            </ChartLeftWapper>
            <ChartRightWapper>
                <ConsultDetailTableMessageBox />
            </ChartRightWapper>
        </Container>
    )
}

export default ConsultDetailMain
