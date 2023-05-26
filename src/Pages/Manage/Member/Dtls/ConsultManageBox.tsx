import React, { useEffect, useState, useCallback } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { useRecoilValue } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import { MemberSearchItemInterface } from '@CommonTypes'
import {
    VaryButton,
    MessageSendModal,
    ExcelDownload,
    MemberConsultGroupModal,
} from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import {
    addComma,
    dateInsertHypen,
    getNowDateDetail,
    phoneFormat,
} from '@Helper'
import { getMberCnsltlist } from '@Service/MemberService'
import _ from 'lodash'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const { WapperFull, CountWapper, ButtonsRight, CountText } = ManageBoxStyle

const initializeState = {
    modal: {
        smsSend: false,
        appPushSend: false,
        excelDownloadPstinst: false,
        excelDownload: false,
        addGroup: false,
        removeGroup: false,
    },
    excel: {
        status: 'idle',
        search: {
            instNo: null,
        },
    },
    listCheckRowList: [],
}

const ConsultManageBox = () => {
    const listState = useRecoilValue(ConsultListState)
    const { Theme } = useRecoilValue(AtomMainLayoutState)
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        modal: {
            smsSend: boolean
            appPushSend: boolean
            excelDownload: boolean
            addGroup: boolean
            removeGroup: boolean
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
                listCheckRowList: listState.manage.checkRow
                    .map(c => {
                        const {
                            list: { MBER_INFO_LIST },
                        } = listState
                        const findMemInfo = _.find(MBER_INFO_LIST, {
                            MBER_NO: Number(c),
                            // MBER_NO: 11,
                        })

                        if (findMemInfo) {
                            return {
                                MBER_NO: findMemInfo.MBER_NO,
                                MBTLNUM: findMemInfo.MBTLNUM,
                                MBTLNUM_CRTFC_AT: findMemInfo.MBTLNUM_CRTFC_AT,
                                NM: findMemInfo.NM,
                                SMS_SNDNG_AT: 'N', // sms, push 전송시 payload에 필요 없어서 하드 코딩
                                SV00_NTCN_AT: findMemInfo.SV00_NTCN_AT,
                                USID: findMemInfo.USID,
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
                    .filter(v => v.MBTLNUM_CRTFC_AT === 'Y'),
            }))
        }

        funcSetCheckRowList()
    }, [listState])

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Member.ConsultList
        )

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const { instNo, instNm, searchKey, riskFctr, startDt, endDt, groupNo } =
            listState.search

        const { status, payload } = await getMberCnsltlist({
            curPage: 0,
            instNo: instNo,
            searchKey: searchKey,
            riskFctr: riskFctr,
            startDt: startDt,
            endDt: endDt,
            groupNo: groupNo,
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
                    instNo && instNm
                        ? `상담회원_현황_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `상담회원_현황_${getNowDateDetail()}`,
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
                        _.isEmpty(m.MESURE_DE)
                            ? ''
                            : dateInsertHypen(m.MESURE_DE),
                        m.RISK_FCTR,
                    ]
                }),
                SpliceColumns:
                    Theme === 'GeonDaon'
                        ? [{ start: 1, end: 1 }]
                        : [{ start: 7, end: 1 }],
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
    }, [Theme, listState.search])

    return (
        <WapperFull>
            <CountWapper>
                <CountText>{`검색된 회원수 : ${addComma(
                    listState.list.TOTAL_COUNT
                )} 명`}</CountText>
            </CountWapper>
            <ButtonsRight>
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => {
                        if (listState.manage.checkRow.length === 0) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.groupControll
                                        .emptyAddRow,
                            })
                            return
                        }

                        if (listState.manage.checkRow.length > 1) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.groupControll
                                        .overAddRow,
                            })
                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                addGroup: true,
                            },
                        }))
                    }}
                    ButtonName={'그룹추가'}
                />
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => {
                        if (listState.manage.checkRow.length === 0) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.groupControll
                                        .emptyRemoveRow,
                            })
                            return
                        }

                        if (listState.manage.checkRow.length > 1) {
                            handlMainAlert({
                                state: true,
                                message:
                                    Messages.Default.member.groupControll
                                        .overRemoveRow,
                            })
                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                removeGroup: true,
                            },
                        }))
                    }}
                    ButtonName={'그룹삭제'}
                />
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
                    ButtonName={'엑셀 다운로드'}
                />
            </ButtonsRight>

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
                />
            )}

            {pageState.modal.addGroup &&
                listState.manage.checkRow.length > 0 && (
                    <MemberConsultGroupModal
                        ModalType={`add`}
                        MemberNo={Number(listState.manage.checkRow[0])}
                        InstNo={listState.search.instNo}
                        CloseModal={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    addGroup: false,
                                },
                            }))
                        }}
                    />
                )}
            {pageState.modal.removeGroup &&
                listState.manage.checkRow.length > 0 && (
                    <MemberConsultGroupModal
                        ModalType={`remove`}
                        InstNo={listState.search.instNo}
                        MemberNo={Number(listState.manage.checkRow[0])}
                        CloseModal={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    removeGroup: false,
                                },
                            }))
                        }}
                    />
                )}

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </WapperFull>
    )
}

export default ConsultManageBox
