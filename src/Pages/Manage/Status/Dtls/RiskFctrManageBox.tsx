import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getRiskFctrList } from '@Service/StatusService'
import { useRecoilValue } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        memDelete: false,
        pstinstAgree: false,
        excelDownload: false,
    },
    excel: {
        status: 'idle',
        search: {
            instNo: null,
        },
    },
}

const RiskFctrManageBox = () => {
    const riskFctrListState = useRecoilValue(RiskFctrListState)
    const { Theme } = useRecoilValue(AtomMainLayoutState)
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        modal: {
            excelDownload: boolean
        }
        excel: {
            status: string | DefaultStatus
            search: {
                instNo: number | null
            }
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Status.RiskFctr
        )

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const {
            search: {
                INST_NO,
                instNm,
                SEARCH_KEY,
                BGNDE,
                ENDDE,
                RISK_FCTR_CNT,
                RISK_FCTR,
                TAKNG_MDCIN,
            },
        } = riskFctrListState

        const { status, payload } = await getRiskFctrList({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            RISK_FCTR_CNT: RISK_FCTR_CNT,
            RISK_FCTR: RISK_FCTR,
            TAKNG_MDCIN: TAKNG_MDCIN,
        })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                excel: {
                    ...prevState.excel,
                    status: 'success',
                },
            }))

            setExcelDownloadProps(prevState => ({
                ...prevState,
                FileName:
                    INST_NO && instNm
                        ? `위험요인_현황_(${dateInsertHypen(
                              BGNDE
                          )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `위험요인_현황_(${dateInsertHypen(
                              BGNDE
                          )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
                Data: payload.RISK_FCTR_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM,
                        m.MBTLNUM ? m.MBTLNUM : '',
                        dateInsertHypen(String(m.BRTHDY)),
                        m.SEXDSTN ? m.SEXDSTN : '',
                        String(m.RISK_FCTR),
                        m.TAKNG_MDCIN ? String(m.TAKNG_MDCIN) : '',
                        m.WAIST ? String(m.WAIST) : '',
                        m.BDWGH ? String(m.BDWGH) : '',
                        m.BMI ? String(m.BMI) : '',
                        m.PBF ? String(m.PBF) : '',
                        m.SLM ? String(m.SLM) : '',
                        m.EST_BN_MAS ? String(m.EST_BN_MAS) : '',
                        m.VFL ? String(m.VFL) : '',
                        m.SYSTOLIC ? String(m.SYSTOLIC) : '',
                        m.DIASTOLIC ? String(m.DIASTOLIC) : '',
                        m.DIASTOLIC ? String(m.PULS) : '',
                        m.FBS ? String(m.FBS) : '',
                        m.PP2 ? String(m.PP2) : '',
                        m.TC ? String(m.TC) : '',
                        m.TG ? String(m.TG) : '',
                        m.HDLC ? String(m.HDLC) : '',
                        m.LDLC ? String(m.LDLC) : '',
                    ]
                }),
                SpliceColumn: Theme === 'GeonDaon', // 건다온일때 회원 번호 삭제.
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                excel: {
                    ...prevState.excel,
                    status: 'failure',
                },
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.searchEmpty,
            })
        }
    }, [Theme, handlMainAlert, riskFctrListState])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    Loading={pageState.excel.status === 'loading'}
                    ButtonType={`manage`}
                    HandleClick={() => {
                        handleGetExcelData().then(() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    excelDownload: true,
                                },
                            }))
                        )
                    }}
                    ButtonName={'엑셀 다운로드'}
                />
            </Buttons>

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default RiskFctrManageBox
