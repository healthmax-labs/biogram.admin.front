import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'
import { getBrftrCmprList } from '@Service/StatusService'
import {
    dateInsertHypen,
    getNowDateDetail,
    timeStringSmapDateParse,
} from '@Helper'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
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

const BrftrCmprManageBox = () => {
    const brftrCmprListState = useRecoilValue(BrftrCmprListState)
    const { Theme } = useRecoilValue(AtomMainLayoutState)

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
            ExcelDownloadInitialize.Status.BrftrCmpr
        )
    const { handlMainAlert } = useMainLayouts()

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const {
            search: { INST_NO, instNm, SEARCH_KEY, BGNDE, ENDDE },
        } = brftrCmprListState

        const { status, payload } = await getBrftrCmprList({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
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
                        ? `전후비교_현황_(${dateInsertHypen(
                              BGNDE
                          )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `전후비교_현황_(${dateInsertHypen(
                              BGNDE
                          )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
                Data: payload.MESURE_BRFTR_CMPR_INFO_LIST.map(m => {
                    return [
                        // String(m.MBER_NO),
                        m.NM,
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.SEXDSTN ? m.SEXDSTN : '',

                        `${
                            m.WAIST_MESURE_DT_0
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.WAIST_0 ? m.WAIST_0 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_1
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.WAIST_1 ? m.WAIST_1 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_2
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.WAIST_2 ? m.WAIST_2 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_3
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.WAIST_3 ? m.WAIST_3 : ''}`,

                        `${
                            m.BP_MESURE_DT_0
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.BP_0 ? m.BP_0 : ''}`,
                        `${
                            m.BP_MESURE_DT_1
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.BP_1 ? m.BP_1 : ''}`,
                        `${
                            m.BP_MESURE_DT_2
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.BP_2 ? m.BP_2 : ''}`,
                        `${
                            m.BP_MESURE_DT_3
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.BP_3 ? m.BP_3 : ''}`,

                        `${
                            m.FBS_MESURE_DT_0
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.FBS_0 ? m.FBS_0 : ''}`,
                        `${
                            m.FBS_MESURE_DT_1
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.FBS_1 ? m.FBS_1 : ''}`,
                        `${
                            m.FBS_MESURE_DT_2
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.FBS_2 ? m.FBS_2 : ''}`,
                        `${
                            m.FBS_MESURE_DT_3
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.FBS_3 ? m.FBS_3 : ''}`,

                        `${
                            m.TG_MESURE_DT_0
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.TG_0 ? m.TG_0 : ''}`,
                        `${
                            m.TG_MESURE_DT_1
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.TG_1 ? m.TG_1 : ''}`,
                        `${
                            m.TG_MESURE_DT_2
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.TG_2 ? m.TG_2 : ''}`,
                        `${
                            m.TG_MESURE_DT_3
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.TG_3 ? m.TG_3 : ''}`,

                        `${
                            m.HDLC_MESURE_DT_0
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.HDLC_0 ? m.HDLC_0 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_1
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.HDLC_1 ? m.HDLC_1 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_2
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.HDLC_2 ? m.HDLC_2 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_3
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.HDLC_3 ? m.HDLC_3 : ''}`,
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
    }, [Theme, brftrCmprListState, handlMainAlert])

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

export default BrftrCmprManageBox
