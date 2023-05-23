import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { VaryLabelRadioButton, VaryLabelCheckBox, VaryButton } from '@Elements'
import Codes from '@Codes'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { ConsultDetailState } from '@Recoil/MemberPagesState'

const {
    Detail: {
        Report: {
            Container,
            RowWapper,
            TitleBox,
            Title,
            ItemWapper,
            ItemBox,
            RadioItems,
            CheckBoxItems,
        },
    },
} = ConsultDetailStyle

const initializeState = {
    memNo: null,
    select: {
        worktype: '',
        area: '',
        ntrikey: [],
        vitamin: [],
        mineral: [],
        etc: [],
        features: [],
    },
}

const ConsultDetailPartNutritionReport = () => {
    const [pageState, setPageState] = useState<{
        memNo: number | null
        select: {
            worktype: string
            area: string
            ntrikey: string[]
            vitamin: string[]
            mineral: string[]
            etc: string[]
            features: string[]
        }
    }>(initializeState)
    const rootState = useRecoilValue(AtomRootState)
    const detailState = useRecoilValue(ConsultDetailState)

    useEffect(() => {
        const pageStart = (memNo: number) => {
            setPageState(prevState => ({
                ...prevState,
                memNo: memNo,
            }))
        }

        if (
            detailState.status === 'success' &&
            detailState.detail &&
            detailState.memNo
        ) {
            pageStart(detailState.memNo)
        }
    }, [detailState])

    return (
        <Container>
            <RowWapper>
                <TitleBox>
                    <Title>활동사항</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <RadioItems>
                            {_.map(
                                Codes.NutritionReport.workTypes,
                                (work, workIndex) => {
                                    return (
                                        <VaryLabelRadioButton
                                            key={`consult-detail-part-nutrition-report-item-work-${workIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={
                                                pageState.select.worktype ===
                                                work.code
                                            }
                                            LabelName={`${work.name}`}
                                            HandleOnChange={() => {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    select: {
                                                        ...prevState.select,
                                                        worktype: work.code,
                                                    },
                                                }))
                                            }}
                                        />
                                    )
                                }
                            )}
                        </RadioItems>
                        <RadioItems>
                            {_.map(
                                Codes.NutritionReport.areaTypes,
                                (area, areaIndex) => {
                                    return (
                                        <VaryLabelRadioButton
                                            key={`consult-detail-part-nutrition-report-item-area-${areaIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={
                                                pageState.select.area ===
                                                area.code
                                            }
                                            LabelName={`${area.name}`}
                                            HandleOnChange={() => {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    select: {
                                                        ...prevState.select,
                                                        area: area.code,
                                                    },
                                                }))
                                            }}
                                        />
                                    )
                                }
                            )}
                        </RadioItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <TitleBox>
                    <Title>관심 건강항목</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <CheckBoxItems>
                            {_.map(
                                Codes.NutritionReport.ntriKeys,
                                (ntri, ntriIndex) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`consult-detail-part-nutrition-report-item-ntri-keys-${ntriIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={_.includes(
                                                pageState.select.ntrikey,
                                                ntri.code
                                            )}
                                            LabelName={`${ntri.name}`}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            ntrikey: [
                                                                ...prevState
                                                                    .select
                                                                    .ntrikey,
                                                                ntri.code,
                                                            ],
                                                        },
                                                    }))
                                                } else {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            ntrikey: _.filter(
                                                                prevState.select
                                                                    .ntrikey,
                                                                e =>
                                                                    e !==
                                                                    ntri.code
                                                            ),
                                                        },
                                                    }))
                                                }
                                            }}
                                        />
                                    )
                                }
                            )}
                        </CheckBoxItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <TitleBox>
                    <Title>비타민군</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <CheckBoxItems>
                            <VaryLabelCheckBox
                                LabelWidth={`w24`}
                                Checked={
                                    Codes.NutritionReport.ntris.vitamin
                                        .length ===
                                    pageState.select.vitamin.length
                                }
                                LabelName={`전체`}
                                HandleOnChange={e => {
                                    if (e.target.checked) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            select: {
                                                ...prevState.select,
                                                vitamin: _.map(
                                                    Codes.NutritionReport.ntris
                                                        .vitamin,
                                                    e => {
                                                        return e.code
                                                    }
                                                ),
                                            },
                                        }))
                                    } else {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            select: {
                                                ...prevState.select,
                                                vitamin: [],
                                            },
                                        }))
                                    }
                                }}
                            />
                            {_.map(
                                Codes.NutritionReport.ntris.vitamin,
                                (vitamin, vitaminIndex) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`consult-detail-part-nutrition-report-item-vitamin-${vitaminIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={_.includes(
                                                pageState.select.vitamin,
                                                vitamin.code
                                            )}
                                            LabelName={`${vitamin.name}`}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            vitamin: [
                                                                ...prevState
                                                                    .select
                                                                    .vitamin,
                                                                vitamin.code,
                                                            ],
                                                        },
                                                    }))
                                                } else {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            vitamin: _.filter(
                                                                prevState.select
                                                                    .vitamin,
                                                                e =>
                                                                    e !==
                                                                    vitamin.code
                                                            ),
                                                        },
                                                    }))
                                                }
                                            }}
                                        />
                                    )
                                }
                            )}
                        </CheckBoxItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <TitleBox>
                    <Title>무기질군</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <CheckBoxItems>
                            <VaryLabelCheckBox
                                LabelWidth={`w24`}
                                Checked={
                                    Codes.NutritionReport.ntris.mineral
                                        .length ===
                                    pageState.select.mineral.length
                                }
                                LabelName={`전체`}
                                HandleOnChange={e => {
                                    if (e.target.checked) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            select: {
                                                ...prevState.select,
                                                mineral: _.map(
                                                    Codes.NutritionReport.ntris
                                                        .mineral,
                                                    e => {
                                                        return e.code
                                                    }
                                                ),
                                            },
                                        }))
                                    } else {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            select: {
                                                ...prevState.select,
                                                mineral: [],
                                            },
                                        }))
                                    }
                                }}
                            />
                            {_.map(
                                Codes.NutritionReport.ntris.mineral,
                                (mineral, mineralIndex) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`consult-detail-part-nutrition-report-item-mineral-${mineralIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={_.includes(
                                                pageState.select.mineral,
                                                mineral.code
                                            )}
                                            LabelName={`${mineral.name}`}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            mineral: [
                                                                ...prevState
                                                                    .select
                                                                    .mineral,
                                                                mineral.code,
                                                            ],
                                                        },
                                                    }))
                                                } else {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            mineral: _.filter(
                                                                prevState.select
                                                                    .mineral,
                                                                e =>
                                                                    e !==
                                                                    mineral.code
                                                            ),
                                                        },
                                                    }))
                                                }
                                            }}
                                        />
                                    )
                                }
                            )}
                        </CheckBoxItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <TitleBox>
                    <Title>기타</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <CheckBoxItems>
                            {_.map(
                                Codes.NutritionReport.ntris.etc,
                                (etc, etcIndex) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`consult-detail-part-nutrition-report-item-etc-${etcIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={_.includes(
                                                pageState.select.etc,
                                                etc.code
                                            )}
                                            LabelName={`${etc.name}`}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            etc: [
                                                                ...prevState
                                                                    .select.etc,
                                                                etc.code,
                                                            ],
                                                        },
                                                    }))
                                                } else {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            etc: _.filter(
                                                                prevState.select
                                                                    .etc,
                                                                e =>
                                                                    e !==
                                                                    etc.code
                                                            ),
                                                        },
                                                    }))
                                                }
                                            }}
                                        />
                                    )
                                }
                            )}
                        </CheckBoxItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <TitleBox>
                    <Title>기능성군</Title>
                </TitleBox>
                <ItemWapper>
                    <ItemBox>
                        <CheckBoxItems>
                            {_.map(
                                Codes.NutritionReport.ntris.features,
                                (feature, featureIndex) => {
                                    return (
                                        <VaryLabelCheckBox
                                            key={`consult-detail-part-nutrition-report-item-feature-${featureIndex}`}
                                            LabelWidth={`w24`}
                                            Checked={_.includes(
                                                pageState.select.features,
                                                feature.code
                                            )}
                                            LabelName={`${feature.name}`}
                                            HandleOnChange={e => {
                                                if (e.target.checked) {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            features: [
                                                                ...prevState
                                                                    .select
                                                                    .features,
                                                                feature.code,
                                                            ],
                                                        },
                                                    }))
                                                } else {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        select: {
                                                            ...prevState.select,
                                                            features: _.filter(
                                                                prevState.select
                                                                    .features,
                                                                e =>
                                                                    e !==
                                                                    feature.code
                                                            ),
                                                        },
                                                    }))
                                                }
                                            }}
                                        />
                                    )
                                }
                            )}
                        </CheckBoxItems>
                    </ItemBox>
                </ItemWapper>
            </RowWapper>
            <RowWapper>
                <div className="flex w-full pt-4 justify-end">
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'영양레포트 프린트'}
                        HandleClick={() => {
                            const ntrikey =
                                pageState.select.ntrikey.length > 0
                                    ? _.join(pageState.select.ntrikey, ',')
                                    : ''
                            const worktype = pageState.select.worktype
                            const area = pageState.select.area
                            const ntris = _.join(
                                [
                                    ...pageState.select.vitamin,
                                    ...pageState.select.mineral,
                                    ...pageState.select.etc,
                                    ...pageState.select.features,
                                ],
                                ','
                            )

                            const params = new URLSearchParams()
                            params.append('mber_no', `${pageState.memNo}`)
                            params.append(
                                'auth',
                                `${rootState.logininfo.VTOKEN_INFO}`
                            )

                            if (!_.isEmpty(ntrikey))
                                params.append('ntrikeys', ntrikey) // 관심 건강항목

                            if (!_.isEmpty(worktype))
                                params.append('worktype', worktype) // 활동사항 직업

                            if (!_.isEmpty(area)) params.append('area', area) // 활동사항 야외 유무

                            if (!_.isEmpty(ntris)) params.append('ntris', ntris) // 그외 모두

                            window.open(
                                `${
                                    process.env.REACT_APP_SYS_SERVER_URL
                                }/member_ntri_print_v0.jsp?${params.toString()}`,
                                '영양레포트 프린트',
                                'width=1200px,height=4528px,scrollbars=yes'
                            )
                        }}
                    />
                </div>
            </RowWapper>
        </Container>
    )
}

export default ConsultDetailPartNutritionReport
