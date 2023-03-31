import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getStatisticsList } from '@Service/StatusService'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'

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

const StatisticsManageBox = () => {
    const statisticsListState = useRecoilValue(StatisticsListState)
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
            ExcelDownloadInitialize.Status.Statistics
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
            search: { INST_NO, SEARCH_KEY, MESURE_CODE, END_DE, BEGIN_DE },
        } = statisticsListState

        const { status, payload } = await getStatisticsList({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            MESURE_CODE: MESURE_CODE.join(','),
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
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
                FileName: `기기측정_현황_${getNowDateDetail()}`,
                Data: payload.DEVICE_MESURE_INFO_LIST.filter(
                    v => v.MBER_NO
                ).map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM ? m.NM : '',
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.SEXDSTN ? m.SEXDSTN : '',
                        m.WEIGHT ? m.WEIGHT : '',
                        m.BMI ? m.BMI : '',
                        m.PBF ? m.PBF : '',
                        m.FAT_MAS ? m.FAT_MAS : '',
                        m.SLM ? m.SLM : '',
                        m.EST_BN_MAS ? m.EST_BN_MAS : '',
                        m.VFL ? m.VFL : '',
                        m.SYSTOLIC ? m.SYSTOLIC : '',
                        m.DIASTOLIC ? m.DIASTOLIC : '',
                        m.PULS ? m.PULS : '',
                        m.FBS ? m.FBS : '',
                        m.PP2 ? m.PP2 : '',
                        m.T_CHOL ? m.T_CHOL : '',
                        m.TG ? m.TG : '',
                        m.HDLC ? m.HDLC : '',
                        m.LDLC ? m.LDLC : '',
                        m.STRS_SCORE ? m.STRS_SCORE : '',
                        m.MNTL_STRS ? m.MNTL_STRS : '',
                        m.PHYSIC_STRS ? m.PHYSIC_STRS : '',
                        m.STRS_CNTRMSR_ABLTY ? m.STRS_CNTRMSR_ABLTY : '',
                        m.BLDVSS_STEP ? m.BLDVSS_STEP : '',
                        m.CAD_OUTPUT_IN ? m.CAD_OUTPUT_IN : '',
                        m.ELSTC_DGREE ? m.ELSTC_DGREE : '',
                        m.RBV_QY ? m.RBV_QY : '',
                        m.HEIGHT ? m.HEIGHT : '',
                        m.BDHEAT ? m.BDHEAT : '',
                        m.WAIST_CRCMFRNC ? m.WAIST_CRCMFRNC : '',
                    ]
                }),
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                excel: {
                    ...prevState.excel,
                    status: 'failure',
                },
            }))
        }
    }, [statisticsListState])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
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

export default StatisticsManageBox
