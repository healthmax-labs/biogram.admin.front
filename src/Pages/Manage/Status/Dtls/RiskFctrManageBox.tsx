import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getRiskFctrList } from '@Service/StatusService'
import { useRecoilValue } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'

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
    const riskFctrListState = useRecoilValue(RiskFctrListState)

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
            FileName: `위험요인_현황_${getNowDateDetail()}`,
            SheetName: `위험요인 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    '',
                    '체성분계',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '혈압계',
                    '',
                    '',
                    '혈당계',
                    '',
                    '콜레스트롤 측정계',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '위험요인',
                    '복약',
                    '체중(Kg)',
                    'BMI(kg/m²)',
                    '체지방률(%)',
                    '근육량(kg)',
                    '추정골량(kg)',
                    '내장지방(lv)',
                    '수축기(mmHg)',
                    '이완기(mmHg)',
                    '맥박(bpm)',
                    '식전(mg/dl)',
                    '식후(mg/dl)',
                    'TC(mg/dl)',
                    'TG(mg/dl)',
                    'HDL-C(mg/dl)',
                    'LDL-C(mg/dl)',
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 4, r: 0 } },
                { s: { c: 5, r: 0 }, e: { c: 10, r: 0 } },
                { s: { c: 11, r: 0 }, e: { c: 13, r: 0 } },
                { s: { c: 14, r: 0 }, e: { c: 15, r: 0 } },
                { s: { c: 16, r: 0 }, e: { c: 19, r: 0 } },
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 100 },
                { wpx: 150 },
                { wpx: 50 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
                { wpx: 90 },
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
            search: {
                INST_NO,
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
                FileName: `위험요인_현황_${getNowDateDetail()}`,
                Data: payload.RISK_FCTR_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM,
                        dateInsertHypen(String(m.BRTHDY)),
                        String(m.RISK_FCTR),
                        m.TAKNG_MDCIN ? String(m.TAKNG_MDCIN) : '',
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
    }, [riskFctrListState])

    return (
        <Wapper>
            <Buttons>
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

            {pageState.modal.excelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Wapper>
    )
}

export default ManageBox
