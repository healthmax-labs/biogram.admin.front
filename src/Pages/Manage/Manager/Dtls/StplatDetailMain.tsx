import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import StplatDetailTable from './StplatDetailTable'
import { useParams } from 'react-router-dom'
import { StplatKndCodeType, StplatSeCodeType } from '@Type/CommonTypes'
import { getCommonStplatStplatSeCodeStplatKndCodeStplatSn } from '@Service/ManagerService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { useRecoilState } from 'recoil'
import { StplatDetailState } from '@Recoil/ManagerPagesState'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const StplatDetailMain = () => {
    const { handlMainAlert } = useMainLayouts()
    // /manage/manager/stplat/:seCode/:kndCode/:SN/detail
    const params = useParams<{
        seCode: StplatSeCodeType | undefined
        kndCode: StplatKndCodeType | undefined
        SN: string | undefined
    }>()

    const [detailState, setDetailState] = useRecoilState(StplatDetailState)

    const handleGetInfo = useCallback(
        async ({
            seCode,
            kndCode,
            SN,
        }: {
            seCode: StplatSeCodeType
            kndCode: StplatKndCodeType
            SN: number
        }) => {
            const { status, payload } =
                await getCommonStplatStplatSeCodeStplatKndCodeStplatSn({
                    stplatSn: SN,
                    stplatKndCode: kndCode,
                    stplatSeCode: seCode,
                })

            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    detail: {
                        ...payload.STPLAT_MANAGE_INFO,
                        history: payload.STPLAT_MANAGE_HIST_LIST,
                    },
                    origin: {
                        ...payload.STPLAT_MANAGE_INFO,
                        history: payload.STPLAT_MANAGE_HIST_LIST,
                    },
                    info: payload,
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        },
        [handlMainAlert, setDetailState]
    )

    useEffect(() => {
        const start = async () => {
            const { seCode, kndCode, SN } = params

            if (seCode && kndCode && SN) {
                handleGetInfo({
                    kndCode: kndCode,
                    SN: Number(SN),
                    seCode: seCode,
                }).then()
            }
        }

        if (detailState.status === 'idle') {
            start().then()
        }
    }, [detailState.status, handleGetInfo, params])

    return (
        <Container>
            <LeftWapper>
                <StplatDetailTable />
            </LeftWapper>
        </Container>
    )
}

export default StplatDetailMain
