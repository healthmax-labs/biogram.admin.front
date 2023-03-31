import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { addComma, dateInsertHypen, getNowDateDetail } from '@Helper'
import { getActivityWalkList } from '@Service/StatusService'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { useMainLayouts } from '@Hook/index'
import Messages from '@Messages'
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

const ActivityWalkManageBox = () => {
    const activityWalkListState = useRecoilValue(ActivityWalkListState)
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
            ExcelDownloadInitialize.Status.ActivityWalk
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
            search: { SEARCH, BEGIN_DE, INST_NO, instNm, END_DE },
        } = activityWalkListState

        const { status, payload } = await getActivityWalkList({
            curPage: 0,
            INST_NO: INST_NO,
            SEARCH: SEARCH,
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
                FileName:
                    INST_NO && instNm
                        ? `활동량_현황_(${dateInsertHypen(
                              BEGIN_DE
                          )}_${dateInsertHypen(END_DE)})_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `활동량_현황_(${dateInsertHypen(
                              BEGIN_DE
                          )}_${dateInsertHypen(END_DE)})_${getNowDateDetail()}`,
                Data: payload.ACTIVITY_STATE_LIST.filter(v => v.MBER_NO).map(
                    m => {
                        return [
                            String(m.MBER_NO),
                            m.NM ? m.NM : '',
                            m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                            m.SEXDSTN ? (m.SEXDSTN == 'M' ? '남' : '여') : '',
                            m.SPORTS_TOT_STEPS
                                ? addComma(Number(m.SPORTS_TOT_STEPS))
                                : '',
                            m.SPORTS_DSTNC
                                ? addComma(Number(m.SPORTS_DSTNC))
                                : '',
                            m.CNSMP_CALORIE
                                ? addComma(Number(m.CNSMP_CALORIE))
                                : '',
                            m.MAX_HR ? addComma(Number(m.MAX_HR)) : '',
                            m.AVG_HR ? addComma(Number(m.AVG_HR)) : '',
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
    }, [Theme, activityWalkListState, handlMainAlert])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    Loading={pageState.excel.status === 'loading'}
                    ButtonType={'manage'}
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

export default ActivityWalkManageBox
