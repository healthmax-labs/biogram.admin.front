import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getMemberList } from '@Service/MemberService'
import { getRiskFctrList } from '@Service/StatusService'
import { useRecoilValue } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'

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

const ManageBox = () => {
    const riskFctrListState = useRecoilValue(RiskFctrListState)

    const [pageState, setPageState] = useState<{
        modal: {
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
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 100 },
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

            const {
                search: {
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
                INST_NO: String(instNo),
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
                    FileName: `회원 현황_${getNowDateDetail()}`,
                    Data: payload.RISK_FCTR_INFO_LIST.map(m => {
                        return [
                            String(m.MBER_NO),
                            m.NM,
                            dateInsertHypen(String(m.BRTHDY)),
                            String(m.RISK_FCTR),
                            String(m.TAKNG_MDCIN),
                            m.BDWGH ? String(m.BDWGH) : '',
                            m.BMI ? String(m.BMI) : '',
                            m.PBF ? String(m.PBF) : '',
                            m.SLM ? String(m.SLM) : '',
                            m.EST_BN_MAS ? String(m.EST_BN_MAS) : '',
                            m.VFL ? String(m.VFL) : '',
                            m.SYSTOLIC ? String(m.SYSTOLIC) : '',
                            m.DIASTOLIC ? String(m.DIASTOLIC) : '',
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
        },
        []
    )

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'엑셀 다운로드'}
                />
            </Buttons>
        </Wapper>
    )
}

export default ManageBox
