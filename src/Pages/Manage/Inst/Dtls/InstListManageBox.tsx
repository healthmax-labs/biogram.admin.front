import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hooks'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { getNowDateDetail, gmtTimeToTimeObject } from '@Helper'
import { getInstList } from '@Service/InstService'

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
        useState<ExcelDownloadPropsInterface>({
            FileName: `소속_현황_${getNowDateDetail()}`,
            SheetName: `소속 현황`,
            Header: [
                [
                    '소속코드',
                    '1차',
                    '2차',
                    '3차',
                    '생성일자',
                    '회원수',
                    '가입승인대기',
                    '리워드 현황',
                    '리워드 예산',
                ],
            ],
            WsCols: [
                { wpx: 60 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 80 },
                { wpx: 50 },
                { wpx: 70 },
                { wpx: 70 },
                { wpx: 70 },
            ],
            Data: [],
        })

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
                FileName: `회원 현황_${getNowDateDetail()}`,
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
                    ButtonName={'엑셀내려받기'}
                />
            </Buttons>
            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default InstListManageBox
