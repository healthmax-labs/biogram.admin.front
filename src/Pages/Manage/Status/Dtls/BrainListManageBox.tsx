import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Element/index'
import React, { useState } from 'react'
import { ListComponentStyle } from '@Style/Pages/StatusPageStyle'
import { useRecoilValue } from 'recoil'
import { BrainListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useMainLayouts } from '@Hook/index'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { postStatsBrain, postStressList } from '@Service/StatusService'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import Messages from '@Messages'

const { TableConditionsCell } = ListComponentStyle
const {
    WapperFull,
    LeftWapper,
    RightWapper,
    LeftItemWapper,
    LeftItem,
    ConditionsText,
} = ManageBoxStyle

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

const BrainListManageBox = () => {
    const brainListState = useRecoilValue(BrainListState)
    const { Theme } = useRecoilValue(AtomMainLayoutState)
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        modal: {
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
            ExcelDownloadInitialize.Status.BrainList
        )

    const handleGetExcelData = async () => {
        setPageState(prevState => ({
            ...prevState,
            excel: {
                ...prevState.excel,
                status: 'loading',
            },
        }))

        const {
            END_DE,
            INST_NO,
            instNm,
            SEARCH_KEY,
            INQUIRY_ITEMS,
            BEGIN_DE,
            CONDITIONS,
        } = brainListState.search

        const { status, payload } = await postStatsBrain({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
            INQUIRY_ITEMS: INQUIRY_ITEMS,
            CONDITIONS: CONDITIONS,
            SEARCH_KEY: SEARCH_KEY,
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
                        ? `브레인_현황_(${dateInsertHypen(
                              BEGIN_DE
                          )}_${dateInsertHypen(END_DE)})_${instNm.replace(
                              / /g,
                              '_'
                          )}_${getNowDateDetail()}`
                        : `브레인_현황_(${dateInsertHypen(
                              BEGIN_DE
                          )}_${dateInsertHypen(END_DE)})_${getNowDateDetail()}`,
                Data: payload.BRAIN_STATE_LIST.filter(v => v.MBER_NO).map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM ? m.NM : '',
                        m.BRTHDY ? dateInsertHypen(m.BRTHDY) : '',
                        m.BB_FNCT ? m.BB_FNCT : '',
                        m.CB_FNCT ? m.CB_FNCT : '',
                        m.CB_ABLTY ? m.CB_ABLTY : '',
                        m.CB_FNCT_SCORE ? m.CB_FNCT_SCORE : '',
                        m.BBF_ADJST_TIME ? m.BBF_ADJST_TIME : '',
                        m.BBF_FNCT_SCORE ? m.BBF_FNCT_SCORE : '',
                        m.BH_TNT_SCORE ? m.BH_TNT_SCORE : '',
                    ]
                }),
                SpliceColumn: Theme === 'GeonDaon',
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
    }

    return (
        <WapperFull>
            <LeftWapper>
                <LeftItemWapper>
                    <LeftItem>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </LeftItem>
                    <LeftItem>
                        <TableConditionsCell
                            Conditions={`보통`}></TableConditionsCell>
                        <ConditionsText>보통</ConditionsText>
                    </LeftItem>
                    <LeftItem>
                        <TableConditionsCell
                            Conditions={`관리`}></TableConditionsCell>
                        <ConditionsText>관리</ConditionsText>
                    </LeftItem>
                </LeftItemWapper>
            </LeftWapper>
            <RightWapper>
                <VaryButton
                    Loading={pageState.excel.status === 'loading'}
                    ButtonType={`manage`}
                    HandleClick={() => {
                        handleGetExcelData().then(() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    excelDownload: true,
                                },
                            }))
                        })
                    }}
                    ButtonName={'엑셀 다운로드'}
                />
            </RightWapper>

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </WapperFull>
    )
}

export default BrainListManageBox
