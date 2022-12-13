import { useCallback, useEffect } from 'react'
import DetailTable from './DetailTable'
import MemoBox from './MemoBox'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useNavigate, useParams } from 'react-router-dom'
import { toNumber } from 'lodash'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { useRecoilState } from 'recoil'
import { DetailState } from '@Recoil/MemberPagesState'
import { getMemberInfo } from '@Service/MemberService'
import { MemberDetailInterface } from '@Type/PageStateType'

const {
    DetailPage: { Container, LeftWapper, RightWapper },
} = PageContainerStyle

const DetailMain = () => {
    const { MEMBER_NO } = useParams<{ MEMBER_NO: string }>()
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()

    const [detailState, setDetailState] = useRecoilState(DetailState)

    const handleGetMemberInfo = useCallback(
        async (member_no: number) => {
            const { status, payload } = await getMemberInfo({
                mber_no: member_no,
            })

            if (status) {
                const { MBER_INFO } = payload

                const memberInfo: MemberDetailInterface = {
                    NM: MBER_INFO.NM,
                    MBER_NO: MBER_INFO.MBER_NO,
                    MBTLNUM: MBER_INFO.MBTLNUM,
                    EMAIL_ADRES: MBER_INFO.EMAIL_ADRES,
                    BRTHDY: MBER_INFO.BRTHDY,
                    SEX: MBER_INFO.SEX,
                    REGIST_DT: MBER_INFO.REGIST_DT,
                    USID: MBER_INFO.USID,
                    MEMO: MBER_INFO.MEMO,
                    MBTLNUM_CRTFC_AT: MBER_INFO.MBTLNUM_CRTFC_AT,
                    PSTINST_INFO_LIST: MBER_INFO.PSTINST_INFO_LIST,
                    MBTLNUM_CNT: MBER_INFO.MBTLNUM_CNT,
                    TOT_CASH: MBER_INFO.TOT_CASH,
                    TOT_SCORE: MBER_INFO.TOT_SCORE,
                    USE_STPLAT_AGRE_AT: MBER_INFO.USE_STPLAT_AGRE_AT,
                    INDVDLINFO_AGRE_AT: MBER_INFO.INDVDLINFO_AGRE_AT,
                    SNSTIIVEINFO_AGRE_AT: MBER_INFO.SNSTIIVEINFO_AGRE_AT,
                    INDVDLINFO_THIRD_AGRE_AT:
                        MBER_INFO.INDVDLINFO_THIRD_AGRE_AT,
                    SNSTIIVEINFO_THIRD_AGRE_AT:
                        MBER_INFO.SNSTIIVEINFO_THIRD_AGRE_AT,
                    MARKTINFO_AGRE_AT: MBER_INFO.MARKTINFO_AGRE_AT,
                    MARKTINFO_PURPOSE_AGRE_AT:
                        MBER_INFO.MARKTINFO_PURPOSE_AGRE_AT,
                }

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    MBER_NO: MBER_INFO.MBER_NO,
                    detail: {
                        ...memberInfo,
                    },
                    origin: {
                        ...memberInfo,
                    },
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        },
        [handlMainAlert, setDetailState]
    )

    // 첫 로딩시 회원 정보 가지고 오기.
    useEffect(() => {
        if (detailState.status !== 'idle') {
            return
        }

        if (toNumber(MEMBER_NO)) {
            handleGetMemberInfo(toNumber(MEMBER_NO)).then()
            return
        }

        handlMainAlert({
            state: true,
            message: Messages.Default.pageError,
        })
        navigate({
            pathname: process.env.PUBLIC_URL + `/manage/member/member-list`,
        })
    }, [
        MEMBER_NO,
        detailState.status,
        handlMainAlert,
        handleGetMemberInfo,
        navigate,
    ])

    return (
        <Container>
            <LeftWapper>
                <DetailTable
                    HandleGetInfo={(memNo: number) =>
                        handleGetMemberInfo(memNo)
                    }
                />
            </LeftWapper>
            <RightWapper>
                <MemoBox />
            </RightWapper>
        </Container>
    )
}

export default DetailMain
