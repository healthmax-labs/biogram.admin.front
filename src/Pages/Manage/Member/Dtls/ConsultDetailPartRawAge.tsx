import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { RawAgeState } from '@Recoil/MemberPagesState'
import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect } from 'react'
import { getMngUserObmtInfo } from '@Service/MemberService'
import { postMediageMeta, postMediageObsity } from '@Service/EtcService'
import { ElementLoading } from '@Element/index'
import _ from 'lodash'
import { dateInsertHypen } from '@Helper'
import { VaryButton } from '@Elements'

const { Detail } = ConsultDetailStyle

const ConsultDetailPartRawAge = () => {
    const { memNo } = useParams<{ memNo: string }>()
    const [rawAgeState, setRawAgeState] = useRecoilState(RawAgeState)

    const getRawAgeData = useCallback(async () => {
        const {
            search: { memNo },
        } = rawAgeState

        if (memNo) {
            setRawAgeState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getMngUserObmtInfo({
                memNo: memNo,
            })

            if (status) {
                const {
                    BO_INFOS: { MI_INFO, OBI_INFO },
                } = payload

                setRawAgeState(prevState => ({
                    ...prevState,
                    status: 'success',
                    list: {
                        MI_INFO: MI_INFO,
                        OBI_INFO: OBI_INFO,
                    },
                }))
            } else {
                setRawAgeState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    list: {
                        MI_INFO: [],
                        OBI_INFO: [],
                    },
                }))
            }
        }
    }, [rawAgeState, setRawAgeState])

    // 대사리포트 프린트 하기 버튼 클릭
    const handleClickMediageMetaButton = async () => {
        const {} = await postMediageMeta()
    }

    // 비만리포트 프린트하기 버튼 클릭
    const handleClickMediageObsityButton = async () => {
        const {} = await postMediageObsity()
    }

    useEffect(() => {
        const funcGetList = () => {
            getRawAgeData().then()
        }

        if (rawAgeState.status === 'idle' && rawAgeState.search.memNo) {
            funcGetList()
        }
    }, [getRawAgeData, rawAgeState.search.memNo, rawAgeState.status])

    useEffect(() => {
        const pageStart = (memNo: number) => {
            setRawAgeState(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    memNo: memNo,
                },
            }))
        }

        if (rawAgeState.status === 'idle' && memNo) {
            pageStart(Number(memNo))
        }
    }, [memNo, rawAgeState.status, setRawAgeState])

    return (
        <Detail.Container>
            {rawAgeState.status === 'loading' ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.SubTitle>
                            대사나이
                        </Detail.RawAge.SubTitle>
                    </Detail.RawAge.RowWapper>

                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.SubTitle>
                            종합분석 평가
                        </Detail.RawAge.SubTitle>
                    </Detail.RawAge.RowWapper>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.RsltAnlyBox>
                            {(() => {
                                const rsltAnly = _.first(
                                    rawAgeState.list.MI_INFO
                                )

                                if (rsltAnly) {
                                    return (
                                        <>
                                            <Detail.RawAge.Text>{`${rsltAnly.RSLT_ANLY1}`}</Detail.RawAge.Text>
                                            <Detail.RawAge.Text>{`${rsltAnly.RSLT_ANLY2}`}</Detail.RawAge.Text>
                                        </>
                                    )
                                } else {
                                    return <></>
                                }
                            })()}
                        </Detail.RawAge.RsltAnlyBox>
                    </Detail.RawAge.RowWapper>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.WFull>
                            <Detail.RawAge.Table.ReportBox>
                                <VaryButton
                                    ButtonType={`default`}
                                    HandleClick={() => {
                                        handleClickMediageMetaButton().then()
                                    }}
                                    ButtonName={'대사리포트 프린트하기'}
                                />
                            </Detail.RawAge.Table.ReportBox>
                            <Detail.RawAge.Table.Desc>
                                <Detail.RawAge.Table.DescRight>
                                    *표기 안내: 현재 생체나이 (내 연령 기준 증감
                                    정도)
                                </Detail.RawAge.Table.DescRight>
                                <Detail.RawAge.Table.DescLeft>
                                    (단위: 나이)
                                </Detail.RawAge.Table.DescLeft>
                            </Detail.RawAge.Table.Desc>
                            <Detail.RawAge.TableWapper>
                                <Detail.RawAge.Table.Table>
                                    <Detail.RawAge.Table.Thead>
                                        <Detail.RawAge.Table.TheadRow>
                                            <Detail.RawAge.Table.TheadCell>
                                                날짜
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                대사나이
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                혈압
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                혈당
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                복부비만
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                동맥경화
                                            </Detail.RawAge.Table.TheadCell>
                                        </Detail.RawAge.Table.TheadRow>
                                    </Detail.RawAge.Table.Thead>
                                    <Detail.RawAge.Table.Body>
                                        {_.map(
                                            rawAgeState.list.MI_INFO,
                                            (mi, miIndex) => {
                                                return (
                                                    <Detail.RawAge.Table.Row
                                                        key={`consult-detail-part-raw-age-mi-item-${miIndex}`}>
                                                        <Detail.RawAge.Table.Cell>
                                                            {dateInsertHypen(
                                                                mi.MEASURE_DT
                                                            )}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {mi.MI_MSA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {mi.MI_MHTNA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {mi.MI_MDMA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {mi.MI_MAOA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {mi.MI_MDLA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                    </Detail.RawAge.Table.Row>
                                                )
                                            }
                                        )}
                                    </Detail.RawAge.Table.Body>
                                </Detail.RawAge.Table.Table>
                            </Detail.RawAge.TableWapper>
                        </Detail.RawAge.WFull>
                    </Detail.RawAge.RowWapper>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.SubTitle>
                            비만나이
                        </Detail.RawAge.SubTitle>
                    </Detail.RawAge.RowWapper>

                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.SubTitle>
                            종합분석 평가
                        </Detail.RawAge.SubTitle>
                    </Detail.RawAge.RowWapper>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.GuidBox>
                            {(() => {
                                const totalGuid = _.first(
                                    rawAgeState.list.OBI_INFO
                                )

                                if (totalGuid) {
                                    return (
                                        <>
                                            <Detail.RawAge.Text>{`${totalGuid.TOTAL_GUID1}`}</Detail.RawAge.Text>
                                            <Detail.RawAge.Text>{`${totalGuid.TOTAL_GUID2}`}</Detail.RawAge.Text>
                                            <Detail.RawAge.Text>{`${totalGuid.TOTAL_GUID3}`}</Detail.RawAge.Text>
                                        </>
                                    )
                                } else {
                                    return <></>
                                }
                            })()}
                        </Detail.RawAge.GuidBox>
                    </Detail.RawAge.RowWapper>
                    <Detail.RawAge.RowWapper>
                        <Detail.RawAge.WFull>
                            <Detail.RawAge.Table.ReportBox>
                                <VaryButton
                                    ButtonType={`default`}
                                    HandleClick={() => {
                                        handleClickMediageObsityButton().then()
                                    }}
                                    ButtonName={`비만리포트 프린트하기`}
                                />
                            </Detail.RawAge.Table.ReportBox>
                            <Detail.RawAge.Table.Desc>
                                <Detail.RawAge.Table.DescRight>
                                    *표기 안내: 현재 생체나이 (내 연령 기준 증감
                                    정도)
                                </Detail.RawAge.Table.DescRight>
                                <Detail.RawAge.Table.DescLeft>
                                    (단위: 나이)
                                </Detail.RawAge.Table.DescLeft>
                            </Detail.RawAge.Table.Desc>
                            <Detail.RawAge.WFull>
                                <Detail.RawAge.Table.Table>
                                    <Detail.RawAge.Table.Thead>
                                        <Detail.RawAge.Table.TheadRow>
                                            <Detail.RawAge.Table.TheadCell>
                                                날짜
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                비만나이
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                체지방
                                            </Detail.RawAge.Table.TheadCell>
                                            <Detail.RawAge.Table.TheadCell>
                                                복부지방
                                            </Detail.RawAge.Table.TheadCell>
                                        </Detail.RawAge.Table.TheadRow>
                                    </Detail.RawAge.Table.Thead>
                                    <Detail.RawAge.Table.Body>
                                        {_.map(
                                            rawAgeState.list.OBI_INFO,
                                            (obi, obiIndex) => {
                                                return (
                                                    <Detail.RawAge.Table.Row
                                                        key={`consult-detail-part-raw-age-obi-item-${obiIndex}`}>
                                                        <Detail.RawAge.Table.Cell>
                                                            {dateInsertHypen(
                                                                obi.MEASURE_DT
                                                            )}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {obi.OBI_BAA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {obi.OBI_BFA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                        <Detail.RawAge.Table.Cell>
                                                            {obi.OBI_AOA_DIFF}
                                                        </Detail.RawAge.Table.Cell>
                                                    </Detail.RawAge.Table.Row>
                                                )
                                            }
                                        )}
                                    </Detail.RawAge.Table.Body>
                                </Detail.RawAge.Table.Table>
                            </Detail.RawAge.WFull>
                        </Detail.RawAge.WFull>
                    </Detail.RawAge.RowWapper>
                </>
            )}
        </Detail.Container>
    )
}

export default ConsultDetailPartRawAge
