import React, { useCallback, useEffect, useState } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useLocation, useParams } from 'react-router-dom'
import UhealthzoneDetailTable from './UhealthzoneDetailTable'
import { getDataUhealthZoneChargerInfo } from '@Service/ContentsService'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
import { useSetRecoilState } from 'recoil'
import { UhealthzoneDetailState } from '@Recoil/ContentsPagesState'
import {
    UhealthZoneChargerInfoInterface,
    UhealthzoneInfoInterface,
    UhealthzoneInfoOperWikInfoInfoInterface,
} from '@Type/ContentsTypes'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const UhealthzoneDetailMain = () => {
    const locationState = useLocation()
    const { handlMainAlert } = useMainLayouts()
    const setDetailState = useSetRecoilState(UhealthzoneDetailState)
    const params = useParams<{ UhealthZoneNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const handleGetInfo = useCallback(
        async (zoneNum: number) => {
            const { status, payload } = await getDataUhealthZoneChargerInfo({
                zoneNum: zoneNum,
            })

            if (status) {
                const info: UhealthZoneChargerInfoInterface = payload

                const operWikInfo: UhealthzoneInfoOperWikInfoInfoInterface[] =
                    []

                if (payload.UHEALTH_ZONE_OPER_BSTM.WIK_LIST.length > 0) {
                    const bstm =
                        payload.UHEALTH_ZONE_OPER_BSTM.WIK_LIST.map<UhealthzoneInfoOperWikInfoInfoInterface>(
                            e => {
                                return {
                                    TIME_KND_CODE: 'BSTM',
                                    WIK_SE_CODE: 'RD',
                                    WIK_CODE: e.WIK_CODE,
                                }
                            }
                        )
                            .filter(element => element)
                            .shift()

                    if (bstm) {
                        operWikInfo.push(bstm)
                    }
                }

                if (payload.UHEALTH_ZONE_OPER_BMTM.WIK_LIST.length > 0) {
                    const bmtm =
                        payload.UHEALTH_ZONE_OPER_BMTM.WIK_LIST.map<UhealthzoneInfoOperWikInfoInfoInterface>(
                            e => {
                                return {
                                    TIME_KND_CODE: 'BMTM',
                                    WIK_SE_CODE: 'RD',
                                    WIK_CODE: e.WIK_CODE,
                                }
                            }
                        )
                            .filter(element => element)
                            .shift()

                    if (bmtm) {
                        operWikInfo.push(bmtm)
                    }
                }

                const operTimeInfo = [
                    {
                        TIME_KND_CODE: 'BSTM',
                        TIME_SE_CODE: 'WD',
                        BEGIN_TIME: `${payload.UHEALTH_ZONE_OPER_BSTM.BEGIN_TIME_H}${payload.UHEALTH_ZONE_OPER_BSTM.BEGIN_TIME_M}`,
                        END_TIME: `${payload.UHEALTH_ZONE_OPER_BSTM.END_TIME_H}${payload.UHEALTH_ZONE_OPER_BSTM.END_TIME_M}`,
                    },
                    {
                        TIME_KND_CODE: 'BMTM',
                        TIME_SE_CODE: 'WD',
                        BEGIN_TIME: `${payload.UHEALTH_ZONE_OPER_BMTM.BEGIN_TIME_H}${payload.UHEALTH_ZONE_OPER_BMTM.BEGIN_TIME_M}`,
                        END_TIME: `${payload.UHEALTH_ZONE_OPER_BMTM.END_TIME_H}${payload.UHEALTH_ZONE_OPER_BMTM.END_TIME_M}`,
                    },
                ]

                const detail: UhealthzoneInfoInterface = {
                    INSTL_PLACE: payload.UHEALTH_ZONE_INFO.INSTL_PLACE,
                    INST_NO: String(payload.UHEALTH_ZONE_INFO.INST_NO),
                    TELNO: payload.UHEALTH_ZONE_INFO.TELNO,
                    INSTL_ADRES: payload.UHEALTH_ZONE_INFO.INSTL_ADRES,
                    LA: payload.UHEALTH_ZONE_INFO.LA,
                    LO: payload.UHEALTH_ZONE_INFO.LO,
                    MAP_ADRES: payload.UHEALTH_ZONE_INFO.MAP_ADRES,
                    OPER_WIK_INFO: operWikInfo,
                    OPER_TIME_INFO: operTimeInfo,
                    INSTL_TY_CD: payload.UHEALTH_ZONE_INFO.INSTL_TY_CD,
                    LOGIN_AT: payload.UHEALTH_ZONE_INFO.LOGIN_AT,
                    EXTRL_PERSON_USE_AT:
                        payload.UHEALTH_ZONE_INFO.EXTRL_PERSON_USE_AT,
                    OPEN_AT: payload.UHEALTH_ZONE_INFO.OPEN_AT,
                    PRINT_AT: payload.UHEALTH_ZONE_INFO.OPEN_AT,
                    LOGO_ATCHMNFL_NO:
                        payload.UHEALTH_ZONE_INFO.LOGO_ATCHMNFL_NO,
                    BCRN_ATCHMNFL_NO:
                        payload.UHEALTH_ZONE_INFO.BCRN_ATCHMNFL_NO,
                    MHRLS_INFO: payload.UHEALTH_ZONE_MHRLS_LIST.map(e => ({
                        MHRLS_CODE: e.MHRLS_CODE,
                    })),
                    VEIN_RCIVR: payload.UHEALTH_ZONE_VEIN_RCIVR_LIST.map(e => ({
                        MHRLS_CODE: e.MHRLS_CODE,
                        SERIAL_NO: e.SERIAL_NO,
                    })),
                }

                // 소속설정
                const step1 = payload.UHEALTH_ZONE_INFO.TOP_INST_NO
                    ? String(payload.UHEALTH_ZONE_INFO.TOP_INST_NO)
                    : ''
                const step2 = payload.UHEALTH_ZONE_INFO.MIDDLE_INST_NO
                    ? String(payload.UHEALTH_ZONE_INFO.MIDDLE_INST_NO)
                    : ''
                const step3 = payload.UHEALTH_ZONE_INFO.BOTTOM_INST_NO
                    ? String(payload.UHEALTH_ZONE_INFO.BOTTOM_INST_NO)
                    : ''

                let stepInfo = ''
                if (
                    payload.UHEALTH_ZONE_INFO.INST_NO ===
                    payload.UHEALTH_ZONE_INFO.BOTTOM_INST_NO
                ) {
                    stepInfo = 'step3'
                } else if (
                    payload.UHEALTH_ZONE_INFO.INST_NO ===
                    payload.UHEALTH_ZONE_INFO.MIDDLE_INST_NO
                ) {
                    stepInfo = 'step2'
                } else if (
                    payload.UHEALTH_ZONE_INFO.INST_NO ===
                    payload.UHEALTH_ZONE_INFO.TOP_INST_NO
                ) {
                    stepInfo = 'step1'
                }

                setDetailState(prevState => ({
                    ...prevState,
                    sub: {
                        ...prevState.sub,
                        instlPlaceCheck: true,
                        pstinst: {
                            infoStep: stepInfo,
                            step1: step1,
                            step2: step2,
                            step3: step3,
                        },
                    },
                    detail: detail,
                    origin: detail,
                    info: info,
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
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/contents/uhealthzone/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (
                params.UhealthZoneNo !== undefined &&
                params.UhealthZoneNo
            ) {
                handleGetInfo(Number(params.UhealthZoneNo)).then()

                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }
        }

        funcChceckPageMode()
    }, [handleGetInfo, locationState, params.UhealthZoneNo])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <UhealthzoneDetailTable
                            HandleGetInfo={zoneNum => handleGetInfo(zoneNum)}
                            pageMode={pageState.pageMode}
                            zoneNum={
                                params.UhealthZoneNo !== undefined
                                    ? Number(params.UhealthZoneNo)
                                    : null
                            }
                        />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default UhealthzoneDetailMain
