import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hooks'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { getNowDateDetail, gmtTimeToTimeObject } from '@Helper'
import { getInstList } from '@Service/InstService'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        excelDownloadPstinst: false,
        excelDownload: false,
    },
    excel: {
        status: 'idle',
    },
}

const InstListManageBox = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const [pageState, setPageState] = useState<{
        modal: {
            excelDownload: boolean
        }
        excel: {
            status: string | DefaultStatus
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Inst.InstList
        )

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const { status, payload } = await getInstList()

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
                FileName: `소속_현황_${getNowDateDetail()}`,
                Data: payload.INST_INFO_LIST.map(m => {
                    let registDt
                    if (m.REGIST_DT) {
                        const dateObj = gmtTimeToTimeObject(
                            new Date(m.REGIST_DT)
                        )
                        registDt = `${dateObj.year}-${dateObj.monthPad}-${dateObj.dayPad}`
                    } else {
                        registDt = ''
                    }

                    return [
                        String(m.INST_NO),
                        m.INST_NM_1,
                        m.INST_NM_2,
                        m.INST_NM_3,
                        registDt,
                        String(m.MBER_CNT),
                        String(m.REQ_MBER_CNT),
                        m.BUDGET_ASIGN_AT == 'Y' ? '진행중' : '',
                        String(m.BUDGET_ASIGN_AMOUNT),
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
    }, [])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        // 상세 tab 리셋처리
                        handleDeleteTabbyMatchRouter(
                            '/manage/inst/inst-list/:instNo/detail'
                        )

                        handleDeleteTabbyMatchRouter(
                            '/manage/inst/inst-list/new'
                        )

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/inst/inst-list/new`,
                        })
                    }}
                    ButtonName={'소속 신규 등록'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    Loading={pageState.excel.status === 'loading'}
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

export default InstListManageBox
