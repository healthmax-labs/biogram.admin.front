import React, { useCallback, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
import { DefaultStatus, ExcelDownloadPropsInterface } from '@CommonTypes'
import { addComma, dateInsertHypen, getNowDateDetail } from '@Helper'
import { getActivityWalkList } from '@Service/StatusService'

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

const ActivityWalkManageBox = () => {
    const activityWalkListState = useRecoilValue(ActivityWalkListState)
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
            FileName: `활동량_현황_${getNowDateDetail()}`,
            SheetName: `활동량 현황`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '성별',
                    '총보행수(걸음)',
                    '활동 거리(m)',
                    '소비칼로리(kcal)',
                    '최대심박수(bpm)',
                    '평균심박수(bpm)',
                ],
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 100 },
                { wpx: 100 },
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
            search: { SEARCH, BEGIN_DE, INST_NO, END_DE },
        } = activityWalkListState

        const { status, payload } = await getActivityWalkList({
            curPage: 0,
            INST_NO: INST_NO,
            SEARCH: SEARCH,
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
                FileName: `활동량_현황_${getNowDateDetail()}`,
                Data: payload.ACTIVITY_STATE_LIST.filter(
                    f => f.MBER_NO !== null
                ).map(m => {
                    return [
                        String(m.MBER_NO),
                        m.NM ? m.NM : '',
                        m.BRTHDY ? dateInsertHypen(String(m.BRTHDY)) : '',
                        m.SEXDSTN ? (m.SEXDSTN == 'M' ? '남' : '여') : '',
                        m.SPORTS_TOT_STEPS
                            ? addComma(Number(m.SPORTS_TOT_STEPS))
                            : '',
                        m.SPORTS_DSTNC ? addComma(Number(m.SPORTS_DSTNC)) : '',
                        m.CNSMP_CALORIE
                            ? addComma(Number(m.CNSMP_CALORIE))
                            : '',
                        m.MAX_HR ? addComma(Number(m.MAX_HR)) : '',
                        m.AVG_HR ? addComma(Number(m.AVG_HR)) : '',
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
    }, [activityWalkListState])

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

export default ActivityWalkManageBox
