import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { ElementLoading, VaryButton, VaryDatepickerInput } from '@Elements'
import React, { useCallback, useEffect } from 'react'
import Messages from '@Messages'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { ConsultMsgBoxListState } from '@Recoil/MemberPagesState'
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

const ConsultDetailMessage = () => {
    const params = useParams<{
        memNo: string | undefined
    }>()

    const [messageBoxListState, setMessageBoxListState] = useRecoilState(
        ConsultMsgBoxListState
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
        const pageStart = () => {
            const { memNo } = params

            if (memNo) {
                setMessageBoxListState(prevState => ({
                    ...prevState,
                    memNo: Number(memNo),
                }))
                handleGetData().then()
            }
        }

        if (messageBoxListState.status === 'idle') {
            pageStart()
        }
    }, [messageBoxListState, handleGetData, params, setMessageBoxListState])

    return (
        <div className="">
            <div className="flex flex-nowrap">
                <div className="flex py-2 items-center w-1/3 justify-start">
                    <VaryDatepickerInput
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
                    {/* ~ 기간으로 하지 않고 선택된 날자의 월로 체킹
                    <VaryDatepickerInput
                        Value={changeDatePickerDate(
                            messageBoxListState.search.END_DT
                        )}
                        CallBackReturn={e => {
                            const { year, monthPad, dayPad } =
                                gmtTimeToTimeObject(e)
                            setMessageBoxListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    END_DT: `${year}${monthPad}${dayPad}`,
                                },
                            }))
                        }}
                    /> */}
                </div>
                <div className="flex py-2 items-center w-full justify-end">
                    <div className="flex py-2">
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'조회'}
                            HandleClick={() => handleGetData().then()}
                        />
                    </div>
                </div>
            </div>
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
                            <HeaderCell>발신자</HeaderCell>
                        </HeaderRow>
                    </TableHeader>
                    <TableBody>
                        {messageBoxListState.data &&
                        messageBoxListState.data.SMS_INFO_LIST.length > 0 ? (
                            messageBoxListState.data.SMS_INFO_LIST.map(
                                (el, index) => {
                                    return (
                                        <TableBodyRow
                                            key={`main-table-body-row-${index}`}
                                            BgState={index % 2 === 0}>
                                            <TableBodyCell>
                                                {el.SNDNG_STATUS}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.SNDNGDT}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.RECVER}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.MBTLNUM}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {String(el.CN).length > 20
                                                    ? el.CN?.substring(0, 20) +
                                                      '...'
                                                    : el.CN}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                {el.RGSDT}
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                비어있음
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
        </div>
    )
}

export default ConsultDetailMessage
