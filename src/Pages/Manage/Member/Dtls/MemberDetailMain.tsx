import { useCallback, useEffect, useState } from 'react'
import MemberDetailTable from './MemberDetailTable'
import MemberDetailMemoBox from './MemberDetailMemoBox'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useLocation, useParams } from 'react-router-dom'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { useRecoilState } from 'recoil'
import { MemberDetailState } from '@Recoil/MemberPagesState'
import { getMemberInfo } from '@Service/MemberService'
import { MemberDetailInfoInterface } from '@Type/PageStateType'

const {
    DetailPage: { Container, LeftWapper, RightWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: '',
}

const MemberDetailMain = () => {
    const locationState = useLocation()
    const { handlMainAlert } = useMainLayouts()
    const [detailState, setDetailState] = useRecoilState(MemberDetailState)
    const params = useParams<{ MEMBER_NO: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: string | `new` | `modify`
    }>(initializeState)

    // 회원 정보 가지고 오기.
    const handleGetMemberInfo = useCallback(
        async (member_no: number) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMemberInfo({
                mber_no: member_no,
            })

            if (status) {
                const {
                    MBER_INFO: {
                        NM,
                        MBER_NO,
                        MBTLNUM,
                        EMAIL_ADRES,
                        BRTHDY,
                        SEX,
                        REGIST_DT,
                        USID,
                        MEMO,
                        MBTLNUM_CRTFC_AT,
                        PSTINST_INFO_LIST,
                        MBTLNUM_CNT,
                        TOT_CASH,
                        TOT_SCORE,
                        USE_STPLAT_AGRE_AT,
                        INDVDLINFO_AGRE_AT,
                        SNSTIIVEINFO_AGRE_AT,
                        INDVDLINFO_THIRD_AGRE_AT,
                        SNSTIIVEINFO_THIRD_AGRE_AT,
                        MARKTINFO_AGRE_AT,
                        MARKTINFO_PURPOSE_AGRE_AT,
                        WORK_TY_CODE,
                    },
                } = payload

                const memberInfo: MemberDetailInfoInterface = {
                    NM: NM,
                    MBER_NO: MBER_NO,
                    MBTLNUM: MBTLNUM,
                    EMAIL_ADRES: EMAIL_ADRES,
                    BRTHDY: BRTHDY,
                    SEX: SEX,
                    REGIST_DT: REGIST_DT,
                    USID: USID,
                    MEMO: MEMO,
                    MBTLNUM_CRTFC_AT: MBTLNUM_CRTFC_AT,
                    PSTINST_INFO_LIST: PSTINST_INFO_LIST,
                    MBTLNUM_CNT: MBTLNUM_CNT,
                    TOT_CASH: TOT_CASH,
                    TOT_SCORE: TOT_SCORE,
                    USE_STPLAT_AGRE_AT: USE_STPLAT_AGRE_AT,
                    INDVDLINFO_AGRE_AT: INDVDLINFO_AGRE_AT,
                    SNSTIIVEINFO_AGRE_AT: SNSTIIVEINFO_AGRE_AT,
                    INDVDLINFO_THIRD_AGRE_AT: INDVDLINFO_THIRD_AGRE_AT,
                    SNSTIIVEINFO_THIRD_AGRE_AT: SNSTIIVEINFO_THIRD_AGRE_AT,
                    MARKTINFO_AGRE_AT: MARKTINFO_AGRE_AT,
                    MARKTINFO_PURPOSE_AGRE_AT: MARKTINFO_PURPOSE_AGRE_AT,
                    WORK_TY_CODE: WORK_TY_CODE,
                }

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    MBER_NO: MBER_NO,
                    detail: {
                        ...memberInfo,
                    },
                    origin: {
                        ...memberInfo,
                    },
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))

                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
                })
            }
        },
        [handlMainAlert, setDetailState]
    )

    // 첫 로딩시 회원 정보 가지고 오기.
    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/member/new-member`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }

            if (
                params.MEMBER_NO !== undefined &&
                params.MEMBER_NO &&
                detailState.status === 'idle'
            ) {
                handleGetMemberInfo(Number(params.MEMBER_NO)).then()
            }
        }

        funcChceckPageMode()
    }, [detailState.status, handleGetMemberInfo, locationState, params])

    return (
        <Container>
            <LeftWapper>
                <MemberDetailTable
                    PageMode={pageState.pageMode}
                    HandleGetInfo={(memNo: number) =>
                        handleGetMemberInfo(memNo)
                    }
                />
            </LeftWapper>
            <RightWapper>
                <MemberDetailMemoBox />
            </RightWapper>
        </Container>
    )
}

export default MemberDetailMain
