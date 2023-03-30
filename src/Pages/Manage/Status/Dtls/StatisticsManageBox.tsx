import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import { getStatisticsList } from '@Service/StatusService'

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
    const statisticsListState = useRecoilValue(StatisticsListState)
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
            FileName: `기기측정_현황_${getNowDateDetail()}`,
            SheetName: `기기측정 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    `체성분계`,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    `혈압계`,
                    ``,
                    ``,
                    `혈당계`,
                    ``,
                    `콜레스트롤 측정계`,
                    ``,
                    ``,
                    ``,
                    `스트레스 측정계`,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    `기타`,
                    ``,
                    ``,
                ],
                [
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '성별',
                    `체중(kg)`,
                    `BMI(kg/m²)`,
                    `체지방률(%)`,
                    `체지방량(kg)`,
                    `근육량(kg)`,
                    `추정골량(kg)`,
                    `내장지방(level)`,
                    `수축기(mmHg)`,
                    `이완기(mmHg)`,
                    `맥박(bpm)`,
                    `공복(mg/dl)`,
                    `식후(mg/dl)`,
                    `TC(mg/dl)`,
                    `TG(mg/dl)`,
                    `HDL-C(mg/dl)`,
                    `LDL-C(mg/dl)`,
                    `점수(점)`,
                    `정신적(단계)`,
                    `신체적(단계)`,
                    `대처능력(단계)`,
                    `혈관(단계)`,
                    `박출강도(단계)`,
                    `탄성도(단계)`,
                    `잔혈량(단계)`,
                    `신장(cm)`,
                    `체온(°c)`,
                    `허리둘레(cm)`,
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 3, r: 0 } },
                { s: { c: 4, r: 0 }, e: { c: 10, r: 0 } },
                { s: { c: 11, r: 0 }, e: { c: 13, r: 0 } },
                { s: { c: 14, r: 0 }, e: { c: 15, r: 0 } },
                { s: { c: 16, r: 0 }, e: { c: 19, r: 0 } },
                { s: { c: 20, r: 0 }, e: { c: 27, r: 0 } },
                { s: { c: 28, r: 0 }, e: { c: 30, r: 0 } },
            ],
            WsCols: [
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
            search: { INST_NO, SEARCH_KEY, MESURE_CODE, END_DE, BEGIN_DE },
        } = statisticsListState

        const { status, payload } = await getStatisticsList({
            CUR_PAGE: 0,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            MESURE_CODE: MESURE_CODE.join(','),
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
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
                FileName: `기기측정_현황_${getNowDateDetail()}`,
                Data: payload.DEVICE_MESURE_INFO_LIST.map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM ? m.NM : '',
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.SEXDSTN ? m.SEXDSTN : '',
                        m.WEIGHT ? m.WEIGHT : '',
                        m.BMI ? m.BMI : '',
                        m.PBF ? m.PBF : '',
                        m.FAT_MAS ? m.FAT_MAS : '',
                        m.SLM ? m.SLM : '',
                        m.EST_BN_MAS ? m.EST_BN_MAS : '',
                        m.VFL ? m.VFL : '',
                        m.SYSTOLIC ? m.SYSTOLIC : '',
                        m.DIASTOLIC ? m.DIASTOLIC : '',
                        m.PULS ? m.PULS : '',
                        m.FBS ? m.FBS : '',
                        m.PP2 ? m.PP2 : '',
                        m.T_CHOL ? m.T_CHOL : '',
                        m.TG ? m.TG : '',
                        m.HDLC ? m.HDLC : '',
                        m.LDLC ? m.LDLC : '',
                        m.STRS_SCORE ? m.STRS_SCORE : '',
                        m.MNTL_STRS ? m.MNTL_STRS : '',
                        m.PHYSIC_STRS ? m.PHYSIC_STRS : '',
                        m.STRS_CNTRMSR_ABLTY ? m.STRS_CNTRMSR_ABLTY : '',
                        m.BLDVSS_STEP ? m.BLDVSS_STEP : '',
                        m.CAD_OUTPUT_IN ? m.CAD_OUTPUT_IN : '',
                        m.ELSTC_DGREE ? m.ELSTC_DGREE : '',
                        m.RBV_QY ? m.RBV_QY : '',
                        m.HEIGHT ? m.HEIGHT : '',
                        m.BDHEAT ? m.BDHEAT : '',
                        m.WAIST_CRCMFRNC ? m.WAIST_CRCMFRNC : '',
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
    }, [statisticsListState])

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
