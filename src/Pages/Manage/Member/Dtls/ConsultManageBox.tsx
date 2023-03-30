import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton, MessageSendModal, ExcelDownload } from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail, phoneFormat } from '@Helper'
import { getMberCnsltlist } from '@Service/MemberService'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        smsSend: false,
        appPushSend: false,
        excelDownloadPstinst: false,
        excelDownload: false,
    },
    excel: {
        status: 'idle',
        search: {
            instNo: null,
        },
    },
}

const ConsultManageBox = () => {
    const listState = useRecoilValue(ConsultListState)
    const [pageState, setPageState] = useState<{
        modal: {
            smsSend: boolean
            appPushSend: boolean
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
        useState<ExcelDownloadPropsInterface>({
            FileName: `상담회원 현황_${getNowDateDetail()}`,
            SheetName: `상담회원 현황`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '아이디',
                    '휴대폰 번호',
                    '성별',
                    '소속',
                    '내/외근직',
                    '최근측정일',
                    '위험요인',
                ],
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 50 },
                { wpx: 80 },
                { wpx: 100 },
                { wpx: 80 },
                { wpx: 200 },
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

        const { instNo, searchKey, riskFctr, startDt, endDt } = listState.search

        const { status, payload } = await getMberCnsltlist({
            curPage: 0,
            instNo: instNo,
            searchKey: searchKey,
            riskFctr: riskFctr,
            startDt: startDt,
            endDt: endDt,
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
                FileName: `상담회원_현황_${getNowDateDetail()}`,
                Data: payload.MBER_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM,
                        m.USID,
                        m.MBTLNUM ? phoneFormat(m.MBTLNUM) : m.MBTLNUM,
                        m.SEXDSTN_NM,
                        m.INST_NM,
                        m.WORK_TY_CODE == 'N'
                            ? '미지정'
                            : m.WORK_TY_CODE == 'I'
                            ? '내근직'
                            : '외근직',
                        _.isEmpty(m.MESURE_DT)
                            ? ''
                            : dateInsertHypen(m.MESURE_DT),
                        m.RISK_FCTR,
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
    }, [listState.search])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'메세지 보내기'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: true,
                            },
                        }))
                    }}
                />
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'앱 푸시 보내기'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                appPushSend: true,
                            },
                        }))
                    }}
                />
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
                    ButtonName={'엑셀 내려받기'}
                />
            </Buttons>

            {pageState.modal.smsSend && (
                <MessageSendModal
                    MessageType={`sms`}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: false,
                            },
                        }))
                    }
                />
            )}

            {pageState.modal.appPushSend && (
                <MessageSendModal
                    MessageType={`push`}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                appPushSend: false,
                            },
                        }))
                    }
                />
            )}

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default ConsultManageBox
