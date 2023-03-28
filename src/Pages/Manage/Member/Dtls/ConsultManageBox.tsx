import React, { useEffect, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton, MessageSendModal } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import { MemberSearchItemInterface } from '@CommonTypes'
import _ from 'lodash'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        smsSend: false,
        appPushSend: false,
    },
    listCheckRowList: [],
}

const ConsultManageBox = () => {
    const listState = useRecoilValue(ConsultListState)
    const [pageState, setPageState] = useState<{
        modal: {
            smsSend: boolean
            appPushSend: boolean
        }
        listCheckRowList: MemberSearchItemInterface[]
        // listCheckRowList: any
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
                    .filter(v => v.MBER_NO !== 0),
            }))
        }

        funcSetCheckRowList()
    }, [listState])

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
                    ButtonType={'manage'}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'엑셀 내려받기'}
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
        </Wapper>
    )
}

export default ConsultManageBox
