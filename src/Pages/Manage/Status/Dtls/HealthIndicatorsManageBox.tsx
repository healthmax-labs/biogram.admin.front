import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { HealthIndicatorsListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail, phoneFormat } from '@Helper'
import { getHealthIndicatorsList } from '@Service/StatusService'

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
    const healthIndicatorsListState = useRecoilValue(HealthIndicatorsListState)

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
                    '회원정보',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '측정정보',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '아이디',
                    '휴대폰번호',
                    '성별',
                    '개선성공률',
                    '허리둘레',
                    '혈압',
                    '식전혈당',
                    '중성지방',
                    'HDLC',
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 5, r: 0 } },
                { s: { c: 6, r: 0 }, e: { c: 11, r: 0 } },
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
            search: { SEARCH_KEY, BGNDE, ENDDE, INST_NO, curPage },
        } = healthIndicatorsListState

        const { status, payload } = await getHealthIndicatorsList({
            CUR_PAGE: curPage,
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
                Data: payload.MYBODY_SCORE_IMPRVM_INFO_LIST.filter(
                    v => v.MBER_NO !== null
                ).map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM ? m.NM : '',
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.USID ? m.USID : '',
                        m.MBTLNUM ? phoneFormat(m.MBTLNUM) : '',
                        m.SEXDSTN ? m.SEXDSTN : '',
                        m.TOT_SCORE ? String(m.TOT_SCORE) : '',
                        m.WAIST_SCORE ? String(m.WAIST_SCORE) : '',
                        m.BP_SCORE ? String(m.BP_SCORE) : '',
                        m.FBS_SCORE ? String(m.FBS_SCORE) : '',
                        m.TG_SCORE ? String(m.TG_SCORE) : '',
                        m.HDLC_SCORE ? String(m.HDLC_SCORE) : '',
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
    }, [healthIndicatorsListState])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    Loading={pageState.excel.status === 'loading'}
                    ButtonType={'manage'}
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
