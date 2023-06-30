import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { ElementLoading, VaryButton, VaryDatepickerInput } from '@Elements'
import React, { useCallback, useEffect } from 'react'
import Messages from '@Messages'
import {
    changeDatePickerDate,
    gmtTimeToTimeObject,
    phoneFormat,
    timeStringParse,
} from '@Helper'
import { useParams } from 'react-router-dom'

import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    ConsultDetailSmsSendState,
    ConsultMsgBoxListState,
} from '@Recoil/MemberPagesState'
import { getMsgBoxList } from '@Service/MemberService'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
} = CommonListTableStyle

const {
    Detail: {
        Mesg: { Container, Search },
    },
} = ConsultDetailStyle

const ConsultDetailPartMessage = () => {
    const params = useParams<{
        memNo: string | undefined
    }>()

    const [messageBoxListState, setMessageBoxListState] = useRecoilState(
        ConsultMsgBoxListState
    )

    const consultDetailSmsSendState = useSetRecoilState(
        ConsultDetailSmsSendState
    )

    const handleGetData = useCallback(async () => {
        if (messageBoxListState.search) {
            setMessageBoxListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMsgBoxList({
                mber_no: Number(params.memNo),
                START_DT: messageBoxListState.search.START_DT,
                END_DT: messageBoxListState.search.END_DT,
                SNDNG_FAILR: '',
                MSG_TYPE: '',
                SNDNG_STDR: '',
                SEARCH_KEY: '',
            })

            if (status) {
                setMessageBoxListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    data: payload,
                }))
            } else {
                setMessageBoxListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    data: null,
                }))
            }
        }
    }, [messageBoxListState.search, setMessageBoxListState, params.memNo])

    useEffect(() => {
        const { memNo } = params

        const pageStart = () => {
            if (memNo) {
                setMessageBoxListState(prevState => ({
                    ...prevState,
                    memNo: Number(memNo),
                }))
                handleGetData().then()
            }
        }

        if (memNo && Number(memNo) !== messageBoxListState.memNo) {
            pageStart()
        }
    }, [messageBoxListState, handleGetData, params, setMessageBoxListState])

    return (
        <Container>
            <Search.SearchBox>
                <Search.SearchItem>
                    <VaryDatepickerInput
                        Width={'w32'}
                        ShowType={`year, month`}
                        InputeType={`default`}
                        DateFormat={'yyyy년 MM월'}
                        Value={changeDatePickerDate(
                            messageBoxListState.search.START_DT
                        )}
                        CallBackReturn={e => {
                            const { year, monthPad } = gmtTimeToTimeObject(e)
                            setMessageBoxListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    START_DT: `${year}${monthPad}01`,
                                    END_DT: `${year}${monthPad}31`,
                                },
                            }))
                        }}
                    />
                </Search.SearchItem>
                <Search.SearchItem>
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'조회'}
                        HandleClick={() => handleGetData().then()}
                    />
                </Search.SearchItem>
            </Search.SearchBox>
            {messageBoxListState.status === 'loading' ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableWapper>
                    <TableHeader>
                        <HeaderRow>
                            <HeaderCell>결과</HeaderCell>
                            <HeaderCell>메시지 발송시각</HeaderCell>
                            <HeaderCell>수신인</HeaderCell>
                            <HeaderCell>수신번호</HeaderCell>
                            <HeaderCell>내용</HeaderCell>
                            <HeaderCell>작성일시</HeaderCell>
                        </HeaderRow>
                    </TableHeader>
                    <TableBody HeightLimit={true} Scroll={true}>
                        {messageBoxListState.data &&
                        messageBoxListState.data.SMS_INFO_LIST.length > 0 ? (
                            messageBoxListState.data.SMS_INFO_LIST.map(
                                (el, index) => {
                                    return (
                                        <TableBodyRow
                                            key={`main-table-body-row-${index}`}
                                            BgState={index % 2 === 0}
                                            onClick={() =>
                                                consultDetailSmsSendState(
                                                    prevState => ({
                                                        ...prevState,
                                                        send: {
                                                            ...prevState.send,
                                                            SMS_CN: el.CN,
                                                        },
                                                    })
                                                )
                                            }>
                                            <TableBodyCell>
                                                {el.SNDNG_STATUS}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.SNDNGDT
                                                    ? timeStringParse(
                                                          el.SNDNGDT
                                                      )
                                                    : ''}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.RECVER}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.MBTLNUM
                                                    ? phoneFormat(el.MBTLNUM)
                                                    : ''}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {String(el.CN).length > 20
                                                    ? el.CN?.substring(0, 20) +
                                                      '...'
                                                    : el.CN}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.RGSDT
                                                    ? timeStringParse(el.RGSDT)
                                                    : ''}
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    )
                                }
                            )
                        ) : (
                            <TableBodyRow BgState={false}>
                                <TableBodyCell colSpan={8}>
                                    {`${Messages.Default.searchEmpty}`}
                                </TableBodyCell>
                            </TableBodyRow>
                        )}
                    </TableBody>
                </TableWapper>
            )}
        </Container>
    )
}

export default ConsultDetailPartMessage
