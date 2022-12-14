import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailTable from './ConsultDetailTable'
import ConsultDetailTableMessageBox from './ConsultDetailTableMessageBox'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { getMemberInfo } from '@Service/MemberService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { useSetRecoilState } from 'recoil'
import {
    ConsultDetailChartState,
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
            } else {
                setConsultDetail(prevState => ({
                    ...prevState,
                    status: 'failure',
                    detail: null,
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        }
    }, [handlMainAlert, memNo, setConsultDetail])

    useEffect(() => {
        const pageStart = () => {
            if (memNo) {
                setConsultChart(() => ({
                    CNST: null,
                    MBER_NO: Number(memNo),
                    PLN: null,
                    REG_NM: null,
                    CNST_NO: null,
                    MNG_ID: null,
                    MNG_NM: null,
                    MOD_DT: null,
                    MOD_MNG_NM: null,
                    REGDT: null,
                }))
                handleGetMemberInfo().then()
            }
        }

        pageStart()
    }, [handleGetMemberInfo, memNo, setConsultChart])
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
