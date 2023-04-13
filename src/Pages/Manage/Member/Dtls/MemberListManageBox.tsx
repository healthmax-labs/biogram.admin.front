import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import {
    VaryButton,
    VaryModal,
    VaryTextArea,
    PstinstAgreeModal,
    ExcelDownload,
} from '@Elements'
import { useMainLayouts, useTab } from '@Hook/index'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { MemberListState, MemberDetailState } from '@Recoil/MemberPagesState'
import Messages from '@Messages'
import _ from 'lodash'
import { getMemberList, postMberInfoDelete } from '@Service/MemberService'
import Const from '@Const'
import { AtomRootState } from '@Recoil/AppRootState'
import { useNavigate } from 'react-router-dom'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { addComma, getNowDateDetail } from '@Helper'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const { WapperFull, CountWapper, ButtonsRight, CountText } = ManageBoxStyle

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

const MemberListManageBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const [listState, setListState] = useRecoilState(MemberListState)
    const memberDetailStateReset = useResetRecoilState(MemberDetailState)
    const rootState = useRecoilValue(AtomRootState)
    const { handleDeleteTabbyMatchRouter } = useTab()
    const { Theme } = useRecoilValue(AtomMainLayoutState)

    const [pageState, setPageState] = useState<{
        modal: {
            memDelete: boolean
            pstinstAgree: boolean
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
            ExcelDownloadInitialize.Member.MemberList
        )

    const handleGetExcelData = useCallback(async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const { instNo, instNm, searchKey, registDtTo, registDtFrom } =
            listState.search

        const { status, payload } = await getMemberList({
            curPage: 0,
            instNo: instNo,
            searchKey: searchKey,
            registDtFrom: registDtTo,
            registDtTo: registDtFrom,
        })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                excel: {
                    ...prevState.excel,
                    status: 'success',
                },
            }))

            await setExcelDownloadProps(prevState => ({
                ...prevState,
                FileName:
                    instNo && instNm
                        ? `회원_현황_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `회원_현황_${getNowDateDetail()}`,
                Data: payload.MBER_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM,
                        m.USID,
                        m.MBTLNUM,
                        m.MBTLNUM_CRTFC_AT_NM,
                        m.BRTHDY,
                        m.SEXDSTN_NM,
                        m.INST_NM,
                        m.WORK_TY_CODE == 'N'
                            ? '미지정'
                            : m.WORK_TY_CODE == 'I'
                            ? '내근직'
                            : '외근직',
                        m.CONECT_DT,
                        m.REGIST_DT,
                        m.TOT_CASH,
                    ]
                }),
                SpliceColumns:
                    Theme === 'GeonDaon'
                        ? [{ start: 1, end: 1 }]
                        : [{ start: 9, end: 1 }],
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
    }, [Theme, handlMainAlert, listState.search])

    return (
        <>
            <WapperFull>
                <CountWapper>
                    <CountText>{`총 회원수 : ${addComma(
                        listState.list.TOTAL_COUNT
                    )} 명`}</CountText>
                </CountWapper>
                <ButtonsRight>
                    <VaryButton
                        ButtonType={`manage`}
                        HandleClick={() => {
                            handleDeleteTabbyMatchRouter(
                                '/manage/member/:MEMBER_NO/detail'
                            )
                            memberDetailStateReset()
                            navigate({
                                pathname: `${process.env.PUBLIC_URL}/manage/member/new-member`,
                            })
                        }}
                        ButtonName={'신규회원등록'}
                    />
                    {(rootState.userinfo.AUTH_CODE === 'MAST' ||
                        rootState.userinfo.AUTH_CODE === 'SM00') && (
                        <VaryButton
                            ButtonType={`manage`}
                            ButtonName={'회원 탈퇴'}
                            HandleClick={() => {
                                const {
                                    manage: { checkRow },
                                    list: { MBER_INFO_LIST },
                                } = listState

                                if (checkRow.length === 0) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default.member.leave.empty,
                                    })

                                    return
                                }

                                if (checkRow.length > 1) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default.member.leave.over,
                                    })

                                    return
                                }

                                const findTask = _.find(MBER_INFO_LIST, {
                                    MBER_NO: Number(checkRow[0]),
                                })

                                if (_.isEmpty(findTask)) {
                                    handlMainAlert({
                                        state: true,
                                        message: Messages.Default.dataGetFail,
                                    })

                                    return
                                }

                                setListState(prevState => ({
                                    ...prevState,
                                    manage: {
                                        ...prevState.manage,
                                        checkRowName: findTask.NM,
                                    },
                                }))

                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        memDelete: true,
                                    },
                                }))
                            }}
                        />
                    )}

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
                        ButtonName={'엑셀내려받기'}
                    />
                </ButtonsRight>
            </WapperFull>

            {pageState.modal.memDelete && (
                <VaryModal
                    MaxWidth={`lg`}
                    ModalLoading={false}
                    NeedMax={false}
                    Children={
                        <div className={`w-full justify-evenly`}>
                            <div className="break-normal">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: _.replace(
                                            Messages.Default.memberDeleteTitle,
                                            `_NAME_`,
                                            listState.manage.checkRowName
                                        ),
                                    }}></div>
                            </div>

                            <VaryTextArea
                                Rows={10}
                                Placeholder={`사유를 입력해 주세요`}
                                Value={listState.manage.memDeleteMemo}
                                HandleOnChange={e =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        manage: {
                                            ...prevState.manage,
                                            memDeleteMemo: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                    }
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'취소'}
                                HandleClick={() =>
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            memDelete: false,
                                        },
                                    }))
                                }
                            />
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName={'확인'}
                                HandleClick={async () => {
                                    const { checkRow, memDeleteMemo } =
                                        listState.manage

                                    if (_.isEmpty(memDeleteMemo)) {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default
                                                    .memberDeleteMemoEmpty,
                                        })

                                        return
                                    }

                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            memDelete: false,
                                        },
                                    }))

                                    const { status } = await postMberInfoDelete(
                                        {
                                            memNo: checkRow[0],
                                            secsnResnCode:
                                                Const.memberDeleteResnCode,
                                            secsnResnEtc: memDeleteMemo,
                                        }
                                    )

                                    setListState(prevState => ({
                                        ...prevState,
                                        manage: {
                                            ...prevState.manage,
                                            checkRowName: '',
                                            memDeleteMemo: '',
                                            checkRow: [],
                                        },
                                    }))

                                    if (status) {
                                        HandleGetList()

                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default
                                                    .memberDeleteSuccess,
                                        })
                                    } else {
                                        handlMainAlert({
                                            state: true,
                                            message:
                                                Messages.Default.processFail,
                                        })
                                    }
                                }}
                            />
                        </>
                    }
                />
            )}

            {pageState.modal.pstinstAgree && (
                <PstinstAgreeModal
                    InfoNo={
                        rootState.userinfo.INST_NM
                            ? Number(rootState.userinfo.INST_NM)
                            : 1000
                    }
                    InfoType={`stplat`}
                    HandleClickApplyButton={e => {
                        const checked = _.filter(e, ck => ck.check === 'Y')

                        if (checked.length !== e.length) {
                            handlMainAlert({
                                state: true,
                                message: Messages.Default.notAllAgree,
                            })

                            return
                        }

                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                pstinstAgree: false,
                            },
                        }))
                    }}
                    HandleClickCancleButtion={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                pstinstAgree: false,
                            },
                        }))
                    }
                />
            )}

            {pageState.modal.excelDownload && (
                <ExcelDownload
                    {...excelDownloadProps}
                    DownloadEnd={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                excelDownload: false,
                            },
                        }))
                    }
                />
            )}
        </>
    )
}

export default MemberListManageBox
