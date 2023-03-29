import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import {
    VaryButton,
    VaryModal,
    VaryTextArea,
    PstinstAgreeModal,
    ExcelDownload,
    PstinstSelector,
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
import { getNowDateDetail } from '@Helper'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        memDelete: false,
        pstinstAgree: false,
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

    const [pageState, setPageState] = useState<{
        modal: {
            memDelete: boolean
            pstinstAgree: boolean
            excelDownloadPstinst: boolean
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
            FileName: `회원 현황_${getNowDateDetail()}`,
            SheetName: `회원 현황`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '아이디',
                    '휴대폰 번호',
                    '인증여부',
                    '생년월일',
                    '성별',
                    '소속',
                    '최근방문일자',
                    '가입일자',
                    '보유캐시',
                    '메모',
                ],
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 50 },
                { wpx: 80 },
                { wpx: 30 },
                { wpx: 200 },
                { wpx: 100 },
                { wpx: 150 },
                { wpx: 100 },
                { wpx: 100 },
            ],
            Data: [],
        })

    const handleGetExcelData = useCallback(
        async ({ instNo }: { instNo: number }) => {
            setPageState(prevState => ({
                ...prevState,
                excel: {
                    ...prevState.excel,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMemberList({
                curPage: 0,
                instNo: String(instNo),
                searchKey: '',
                registDtFrom: '',
                registDtTo: '',
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
                    FileName: `회원 현황_${getNowDateDetail()}`,
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
                            m.CONECT_DT,
                            m.REGIST_DT,
                            m.TOT_CASH,
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
        },
        []
    )

    return (
        <>
            <Wapper>
                <Buttons>
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
                                    message: Messages.Default.member.leave.over,
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
                    <VaryButton
                        Loading={pageState.excel.status === 'loading'}
                        ButtonType={`manage`}
                        HandleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    excelDownloadPstinst: true,
                                },
                            }))
                        }}
                        ButtonName={'엑셀내려받기'}
                    />
                </Buttons>
            </Wapper>

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

            {pageState.modal.excelDownloadPstinst && (
                <PstinstSelector
                    SelectorType={`CloseModal`}
                    HandleSelectValue={({ instNo }) => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                excelDownloadPstinst: false,
                            },
                            excel: {
                                ...prevState.excel,
                                search: {
                                    ...prevState.excel.search,
                                    instNo: instNo,
                                },
                            },
                        }))
                        handleGetExcelData({ instNo: instNo }).then(() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    excelDownload: true,
                                },
                            }))
                        )
                    }}
                />
            )}

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </>
    )
}

export default MemberListManageBox
