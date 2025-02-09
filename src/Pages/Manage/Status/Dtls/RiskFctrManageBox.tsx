import React, { useCallback, useEffect, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, MessageSendModal, VaryButton } from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getRiskFctrList } from '@Service/StatusService'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import { MemberSearchItemInterface } from '@CommonTypes'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        memDelete: false,
        pstinstAgree: false,
        smsSend: false,
        appPushSend: false,
        excelDownload: false,
    },
    excel: {
        status: 'idle',
        search: {
            instNo: null,
        },
    },
    listCheckRowList: [],
}

const RiskFctrManageBox = () => {
    const riskFctrListState = useRecoilValue(RiskFctrListState)
    const { Theme } = useRecoilValue(AtomMainLayoutState)
    const { handlMainAlert } = useMainLayouts()
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
        listCheckRowList: MemberSearchItemInterface[]
    }>(initializeState)

    useEffect(() => {
        const funcSetCheckRowList = () => {
            setPageState(prevState => ({
                ...prevState,
                listCheckRowList: riskFctrListState.manage.checkRow
                    .map(c => {
                        const {
                            list: { RISK_FCTR_INFO_LIST },
                        } = riskFctrListState

                        console.log('findMemberInfo c:', c)

                        const findMemInfo = _.find(RISK_FCTR_INFO_LIST, {
                            MBER_NO: Number(c),
                        })

                        console.log('findMemberInfo :', findMemInfo)
                        console.log(
                            'findMemberInfo 2:',
                            findMemInfo?.MBTLNUM_CRTFC_AT
                        )

                        if (findMemInfo) {
                            return {
                                MBER_NO: findMemInfo.MBER_NO,
                                MBTLNUM: findMemInfo.MBTLNUM
                                    ? findMemInfo.MBTLNUM
                                    : '',
                                MBTLNUM_CRTFC_AT: findMemInfo.MBTLNUM_CRTFC_AT
                                    ? findMemInfo.MBTLNUM_CRTFC_AT
                                    : 'Y', // payload 필요, findMemInfo.MBTLNUM_CRTFC_AT,
                                NM: findMemInfo.NM,
                                SMS_SNDNG_AT: 'N', // sms, push 전송시 payload에 필요 없어서 하드 코딩
                                SV00_NTCN_AT: findMemInfo.SV00_NTCN_AT
                                    ? findMemInfo.SV00_NTCN_AT
                                    : 'Y', // payload 필요, findMemInfo.SV00_NTCN_AT,
                                USID: findMemInfo.USID
                                    ? findMemInfo.USID
                                    : 'needUSID', // payload필요, findMemInfo.USID,
                            }
                        } else {
                            return {
                                MBER_NO: 0,
                                MBTLNUM: '',
                                MBTLNUM_CRTFC_AT: 'N',
                                NM: '',
                                SMS_SNDNG_AT: 'N',
                                SV00_NTCN_AT: 'N',
                                USID: '',
                            }
                        }
                    })
                    .filter(v => v.MBER_NO !== 0)
                    .filter(v => v.MBTLNUM.length > 0)
                    .filter(v => v.MBTLNUM_CRTFC_AT === 'Y'),
            }))
        }

        funcSetCheckRowList()
    }, [riskFctrListState, riskFctrListState.manage.checkRow])

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
                    ButtonType={'manage'}
                    ButtonName={'메시지 보내기'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: true,
                            },
                        }))
                        console.log(
                            'SelectMembers: ',
                            pageState.listCheckRowList
                        )
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

            {pageState.modal.smsSend && (
                <MessageSendModal
                    MessageType={`sms`}
                    SelectMember={pageState.listCheckRowList}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: false,
                            },
                        }))
                    }
                    SelectInst={{
                        instNm: riskFctrListState.search.instNm
                            ? riskFctrListState.search.instNm
                            : null,
                        instNo: riskFctrListState.search.INST_NO
                            ? Number(riskFctrListState.search.INST_NO)
                            : null,
                    }}
                />
            )}

            {pageState.modal.appPushSend && (
                <MessageSendModal
                    MessageType={`push`}
                    SelectMember={pageState.listCheckRowList}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                appPushSend: false,
                            },
                        }))
                    }
                    SelectInst={{
                        instNm: riskFctrListState.search.instNm
                            ? riskFctrListState.search.instNm
                            : null,
                        instNo: riskFctrListState.search.INST_NO
                            ? Number(riskFctrListState.search.INST_NO)
                            : null,
                    }}
                />
            )}

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default RiskFctrManageBox
