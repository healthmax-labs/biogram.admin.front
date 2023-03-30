import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'
import { getBrftrCmprList } from '@Service/StatusService'
import {
    dateInsertHypen,
    getNowDateDetail,
    timeStringSmapDateParse,
} from '@Helper'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'

const { Wapper, Buttons } = ManageBoxStyle

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

const ManageBox = () => {
    const brftrCmprListState = useRecoilValue(BrftrCmprListState)

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
        useState<ExcelDownloadPropsInterface>({
            FileName: `상담회원_현황_${getNowDateDetail()}`,
            SheetName: `상담회원 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    '허리둘레',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '혈압',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '식전혈당',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '중성지방',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '고밀도 콜레스트롤',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '성별',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 3, r: 0 } },
                { s: { c: 4, r: 0 }, e: { c: 11, r: 0 } },
                { s: { c: 12, r: 0 }, e: { c: 19, r: 0 } },
                { s: { c: 20, r: 0 }, e: { c: 27, r: 0 } },
                { s: { c: 28, r: 0 }, e: { c: 35, r: 0 } },
                { s: { c: 36, r: 0 }, e: { c: 43, r: 0 } },
                { s: { c: 4, r: 1 }, e: { c: 5, r: 1 } },
                { s: { c: 6, r: 1 }, e: { c: 7, r: 1 } },
                { s: { c: 8, r: 1 }, e: { c: 9, r: 1 } },
                { s: { c: 10, r: 1 }, e: { c: 11, r: 1 } },
                { s: { c: 12, r: 1 }, e: { c: 13, r: 1 } },
                { s: { c: 14, r: 1 }, e: { c: 15, r: 1 } },
                { s: { c: 16, r: 1 }, e: { c: 17, r: 1 } },
                { s: { c: 18, r: 1 }, e: { c: 19, r: 1 } },
                { s: { c: 20, r: 1 }, e: { c: 21, r: 1 } },
                { s: { c: 22, r: 1 }, e: { c: 23, r: 1 } },
                { s: { c: 24, r: 1 }, e: { c: 25, r: 1 } },
                { s: { c: 26, r: 1 }, e: { c: 27, r: 1 } },
                { s: { c: 28, r: 1 }, e: { c: 29, r: 1 } },
                { s: { c: 30, r: 1 }, e: { c: 31, r: 1 } },
                { s: { c: 32, r: 1 }, e: { c: 33, r: 1 } },
                { s: { c: 34, r: 1 }, e: { c: 35, r: 1 } },
                { s: { c: 36, r: 1 }, e: { c: 37, r: 1 } },
                { s: { c: 38, r: 1 }, e: { c: 39, r: 1 } },
                { s: { c: 40, r: 1 }, e: { c: 41, r: 1 } },
                { s: { c: 42, r: 1 }, e: { c: 43, r: 1 } },
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 50 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
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

        const {
            search: { INST_NO, SEARCH_KEY, BGNDE, ENDDE },
        } = brftrCmprListState

        const { status, payload } = await getBrftrCmprList({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
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
                FileName: `위험요인_현황_${getNowDateDetail()}`,
                Data: payload.MESURE_BRFTR_CMPR_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM,
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.SEXDSTN ? m.SEXDSTN : '',
                        `${
                            m.WAIST_MESURE_DT_0
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.WAIST_0 ? m.WAIST_0 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_1
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.WAIST_1 ? m.WAIST_1 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_2
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.WAIST_2 ? m.WAIST_2 : ''}`,
                        `${
                            m.WAIST_MESURE_DT_3
                                ? timeStringSmapDateParse(m.WAIST_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.WAIST_3 ? m.WAIST_3 : ''}`,
                        `${
                            m.BP_MESURE_DT_0
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.BP_0 ? m.BP_0 : ''}`,
                        `${
                            m.BP_MESURE_DT_1
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.BP_1 ? m.BP_1 : ''}`,
                        `${
                            m.BP_MESURE_DT_2
                                ? timeStringSmapDateParse(m.BP_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.BP_3 ? m.BP_3 : ''}`,
                        `${
                            m.FBS_MESURE_DT_0
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.FBS_0 ? m.FBS_0 : ''}`,
                        `${
                            m.FBS_MESURE_DT_1
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.FBS_1 ? m.FBS_1 : ''}`,
                        `${
                            m.FBS_MESURE_DT_2
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.FBS_2 ? m.FBS_2 : ''}`,
                        `${
                            m.FBS_MESURE_DT_3
                                ? timeStringSmapDateParse(m.FBS_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.FBS_3 ? m.FBS_3 : ''}`,
                        `${
                            m.TG_MESURE_DT_0
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_0)
                                : ''
                        }`,
                        `${
                            m.TG_MESURE_DT_1
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.TG_1 ? m.TG_1 : ''}`,
                        `${
                            m.TG_MESURE_DT_2
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_2)
                                : ''
                        }`,
                        `${m.TG_2 ? m.TG_2 : ''}`,
                        `${
                            m.TG_MESURE_DT_3
                                ? timeStringSmapDateParse(m.TG_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.TG_3 ? m.TG_3 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_0
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_0)
                                : ''
                        }`,
                        `${m.HDLC_0 ? m.HDLC_0 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_1
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_1)
                                : ''
                        }`,
                        `${m.HDLC_1 ? m.HDLC_1 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_2
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_2)
                                : ''
                        }
                        `,
                        `${m.HDLC_2 ? m.HDLC_2 : ''}`,
                        `${
                            m.HDLC_MESURE_DT_3
                                ? timeStringSmapDateParse(m.HDLC_MESURE_DT_3)
                                : ''
                        }`,
                        `${m.HDLC_3 ? m.HDLC_3 : ''}`,
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
    }, [brftrCmprListState])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
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

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default ManageBox
