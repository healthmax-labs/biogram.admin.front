import { ExcelDownload, VaryButton } from '@Element/index'
import React, { useState, useCallback } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useMainLayouts } from '@Hook/index'
import { StressListState, WalkRankingListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { getWalkRankingList, postStressList } from '@Service/StatusService'
import { dateInsertHypen, getNowDateDetail, phoneFormat } from '@Helper'
import Messages from '@Messages'
import { isNull } from 'lodash'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        excelDownload: false,
    },
    excel: {
        status: 'idle',
        search: {
            instNo: null,
        },
    },
}

const StressListManageBox = () => {
    const listState = useRecoilValue(WalkRankingListState)
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
            ExcelDownloadInitialize.Status.WalkRanking
        )

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const { INST_NO, MESURE_MT, instNm } = listState.search

        const { status, payload } = await getWalkRankingList({
            CUR_PAGE: 0,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            MESURE_MT: !isNull(MESURE_MT) ? MESURE_MT.substring(0, 6) : ``,
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
                    INST_NO && INST_NO
                        ? `보행수_랭킹_(${MESURE_MT.substring(
                              0,
                              4
                          )}-${MESURE_MT.substring(4, 6)})_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `보행수_랭킹_(${MESURE_MT.substring(
                              0,
                              4
                          )}-${MESURE_MT.substring(
                              4,
                              6
                          )})_${getNowDateDetail()}`,
                Data: payload.STEP_RANK_INFO_LIST.filter(v => v.MBER_NO).map(
                    m => {
                        return [
                            String(m.MBER_NO),
                            m.NM ? m.NM : '',
                            m.BRTHDY ? dateInsertHypen(m.BRTHDY) : '',
                            m.USID ? m.USID : '',
                            m.MBTLNUM ? phoneFormat(m.MBTLNUM) : '',
                            m.SEXDSTN ? m.SEXDSTN : '',
                            m.INST_RANK ? String(m.INST_RANK) : '',
                            m.TOT_STEPS ? String(m.TOT_STEPS) : '',
                        ]
                    }
                ),
                SpliceColumn: Theme === 'GeonDaon',
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
    }, [Theme, handlMainAlert, listState])

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
                {pageState.modal.excelDownload && (
                    <ExcelDownload {...excelDownloadProps} />
                )}
            </Buttons>
        </Wapper>
    )
}

export default StressListManageBox
