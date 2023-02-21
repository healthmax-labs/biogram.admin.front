// 위험요인 현황 테이블 데이터
import React from 'react'
import { dateInsertHypen, timeStringSmapDateParse } from '@Helper'
import { ListComponentStyle } from '@Style/Pages/StatusPageStyle'
import { ListTableStyle } from '@Style/Pages/MemberPageStyles'
import { phoneFormat } from '@Helper'

const {
    Box: { Container, Wapper, Item },
    XcptComponent,
} = ListComponentStyle

export interface RiskFctrTableListItemInterface {
    SLM_JDGMNT: null | string
    TAKNG_MDCIN: null | string
    WAIST: null | number
    DIASTOLIC: null | string
    LDLC_JDGMNT: null | string
    MBER_NO: number
    TG_JDGMNT: null | string
    LDLC: null | string
    SYSTOLIC: null | string
    TC_JDGMNT: null | string
    HDLC: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    PBF: null | number
    SLM: null | number
    EST_BN_MAS_JDGMNT: null | string
    FBS: null | string
    HDLC_JDGMNT: null | string
    VFL: null | string
    DIASTOLIC_JDGMNT: null | string
    BMI: null | number
    FBS_JDGMNT: null | string
    EST_BN_MAS: null | number
    BDWGH_JDGMNT: null | string
    PULS: null | string
    SYSTOLIC_JDGMNT: null | string
    WAIST_JDGMNT: null | string
    TC: null | string
    PBF_JDGMNT: null | string
    PP2: null | string
    TG: null | string
    BDWGH: null | number
    PP2_JDGMNT: null
    RISK_FCTR: null | string
    BMI_JDGMNT: null | string
    VFL_JDGMNT: null | string
    MESURE_DT: null | string
    NM: string
}

//위험요인 현황 테이블 설정.
export const RiskFctrTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: `체성분계`,
                colSpan: 6,
            },
            {
                name: `혈압계`,
                colSpan: 3,
            },
            {
                name: `혈당계`,
                colSpan: 2,
            },
            {
                name: `콜레스트롤 측정계`,
                colSpan: 4,
            },
        ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `위험요인`,
                key: `RISK_FCTR`,
            },
            {
                name: `복약`,
                key: `TAKNG_MDCIN`,
            },
            {
                name: `체중<br/>(kg)`,
                key: `WAIST`,
            },
            {
                name: `BMI<br/>(kg/m²)`,
                key: `BMI`,
            },
            {
                name: `체지방률<br/>(%)`,
                key: `PBF`,
            },
            {
                name: `근육량<br/>(kg)`,
                key: `SML`,
            },
            {
                name: `추정골량<br/>(kg)`,
                key: `EST_BN_MAS`,
            },
            {
                name: `내장지방<br/>(lv)`,
                key: `VFL`,
            },
            {
                name: `수축기<br/>(mmHg)`,
                key: `SYSTOLIC`,
            },
            {
                name: `이완기<br/>(mmHg)`,
                key: `DIASTOLIC`,
            },
            {
                name: `맥박<br/>(bpm)`,
                key: `PULS`,
            },
            {
                name: `식전<br/>(mg/dl)`,
                key: `FBS`,
            },
            {
                name: `식후<br/>(mg/dl)`,
                key: `PP2`,
            },
            {
                name: `TC<br/>(mg/dl)`,
                key: `TC`,
            },
            {
                name: `TG<br/>(mg/dl)`,
                key: `TG`,
            },
            {
                name: `HDL-C<br/>(mg/dl)`,
                key: `HDLC`,
            },
            {
                name: `LDL-C<br/>(mg/dl)`,
                key: `LDLC`,
            },
        ],
    ],
    Lists: [],
}

// 전후비교 현황 테이블 데이터
export interface BrftrCmprTableListItemInterface {
    MBER_NO: number
    TG_3: null | string
    TG_2: null | string
    TG_1: null | string
    TG_0: null | string
    WAIST_0: null | number
    WAIST_1: null | number
    WAIST_2: null | number
    WAIST_3: null | number
    BP_MESURE_DT_3: null | string
    BP_MESURE_DT_2: null | string
    BP_MESURE_DT_1: null | string
    BP_MESURE_DT_0: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    FBS_MESURE_DT_0: null | string
    FBS_MESURE_DT_1: null | string
    FBS_MESURE_DT_MESURE_DT_2: null | string
    FBS_MESURE_DT_MESURE_DT_3: null | string
    HDLC_0: null | number
    HDLC_1: null | number
    HDLC_2: null | number
    HDLC_3: null | number
    BP_3: null | number
    BP_2: null | number
    BP_1: null | number
    BP_0: null | number
    TG_MESURE_DT_0: null | string
    TG_MESURE_DT_1: null | string
    TG_MESURE_DT_2: null | string
    TG_MESURE_DT_3: null | string
    FBS_0: null | number
    FBS_1: null | number
    FBS_2: null | number
    FBS_3: null | number
    HDLC_MESURE_DT_0: null | string
    HDLC_MESURE_DT_1: null | string
    HDLC_MESURE_DT_2: null | string
    HDLC_MESURE_DT_3: null | string
    WAIST_MESURE_DT_0: null | string
    WAIST_MESURE_DT_1: null | string
    WAIST_MESURE_DT_2: null | string
    WAIST_MESURE_DT_3: null | string
    NM: string
}

// 전후비교 현황 테이블 데이터 설정
export const BrftrCmprTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: `허리둘레`,
                colSpan: 2,
            },
            {
                name: `혈압`,
                colSpan: 2,
            },
            {
                name: `식전혈당`,
                colSpan: 2,
            },
            {
                name: `중성지방`,
                colSpan: 2,
            },
            {
                name: `고밀도 콜레스트롤`,
                colSpan: 2,
            },
        ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
            },
            {
                name: `최초`,
                key: `WAIST_0`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Wapper>
                            <Item>
                                {el.WAIST_MESURE_DT_0
                                    ? timeStringSmapDateParse(
                                          el.WAIST_MESURE_DT_0
                                      )
                                    : ''}
                            </Item>
                            <Item>{el.WAIST_0}</Item>
                        </Wapper>
                    )
                },
            },
            {
                name: `최근3회`,
                key: `WAIST_1`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Container>
                            <Wapper>
                                <Item>
                                    {el.WAIST_MESURE_DT_1
                                        ? timeStringSmapDateParse(
                                              el.WAIST_MESURE_DT_1
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.WAIST_1}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.WAIST_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.WAIST_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.WAIST_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.WAIST_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.WAIST_MESURE_DT_3
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.WAIST_3}</Item>
                            </Wapper>
                        </Container>
                    )
                },
            },
            {
                name: `최초`,
                key: `BP_0`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Wapper>
                            <Item>
                                {el.BP_MESURE_DT_0
                                    ? timeStringSmapDateParse(el.BP_MESURE_DT_0)
                                    : ''}
                            </Item>
                            <Item>{el.BP_0}</Item>
                        </Wapper>
                    )
                },
            },
            {
                name: `최근3회`,
                key: `BP_1`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Container>
                            <Wapper>
                                <Item>
                                    {el.BP_MESURE_DT_1
                                        ? timeStringSmapDateParse(
                                              el.BP_MESURE_DT_1
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.BP_1}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.BP_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.BP_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.BP_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.BP_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.BP_MESURE_DT_3
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.BP_3}</Item>
                            </Wapper>
                        </Container>
                    )
                },
            },
            {
                name: `최초`,
                key: `FBS_0`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Wapper>
                            <Item>
                                {el.FBS_MESURE_DT_0
                                    ? timeStringSmapDateParse(
                                          el.FBS_MESURE_DT_0
                                      )
                                    : ''}
                            </Item>
                            <Item>{el.FBS_0}</Item>
                        </Wapper>
                    )
                },
            },
            {
                name: `최근3회`,
                key: `FBS_1`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Container>
                            <Wapper>
                                <Item>
                                    {el.FBS_MESURE_DT_1
                                        ? timeStringSmapDateParse(
                                              el.FBS_MESURE_DT_1
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.FBS_1}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.FBS_MESURE_DT_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.FBS_MESURE_DT_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.FBS_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.FBS_MESURE_DT_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.FBS_MESURE_DT_MESURE_DT_3
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.FBS_3}</Item>
                            </Wapper>
                        </Container>
                    )
                },
            },
            {
                name: `최초`,
                key: `TG_0`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Wapper>
                            <Item>
                                {el.TG_MESURE_DT_0
                                    ? timeStringSmapDateParse(el.TG_MESURE_DT_0)
                                    : ''}
                            </Item>
                            <Item>{el.TG_0}</Item>
                        </Wapper>
                    )
                },
            },
            {
                name: `최근3회`,
                key: `TG_1`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Container>
                            <Wapper>
                                <Item>
                                    {el.TG_MESURE_DT_1
                                        ? timeStringSmapDateParse(
                                              el.TG_MESURE_DT_1
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.TG_1}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.TG_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.TG_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.TG_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.TG_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.TG_MESURE_DT_3
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.TG_3}</Item>
                            </Wapper>
                        </Container>
                    )
                },
            },
            {
                name: `최초`,
                key: `HDLC_0`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Wapper>
                            <Item>
                                {el.HDLC_MESURE_DT_0
                                    ? timeStringSmapDateParse(
                                          el.HDLC_MESURE_DT_0
                                      )
                                    : ''}
                            </Item>
                            <Item>{el.HDLC_0}</Item>
                        </Wapper>
                    )
                },
            },
            {
                name: `최근3회`,
                key: `HDLC_1`,
                component: ({
                    el,
                }: {
                    el: BrftrCmprTableListItemInterface
                }) => {
                    return (
                        <Container>
                            <Wapper>
                                <Item>
                                    {el.HDLC_MESURE_DT_1
                                        ? timeStringSmapDateParse(
                                              el.HDLC_MESURE_DT_1
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.HDLC_1}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.HDLC_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.HDLC_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.HDLC_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.HDLC_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.HDLC_MESURE_DT_3
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.HDLC_3}</Item>
                            </Wapper>
                        </Container>
                    )
                },
            },
        ],
    ],
    Lists: [],
}

// 기기측정 현황 테이블 데이터
export interface StatisticsTableListItemInterface {
    MBER_NO: number
    NM: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MESURE_DE: null | string
    MBER_CNT: null | string
    WEIGHT: null | string
    BMI: null | string
    PBF: null | string
    FAT_MAS: null | string
    SLM: null | string
    ELSTC_DGREE: null | string
    VFL: null | string
    WAIST_CRCMFRNC: null | string
    SYSTOLIC: null | string
    DIASTOLIC: null | string
    PULS: null | string
    FBS: null | string
    PP2: null | string
    T_CHOL: null | string
    TG: null | string
    HDLC: null | string
    LDLC: null | string
    STRS_SCORE: null | string
    MNTL_STRS: null | string
    PHYSIC_STRS: null | string
    STRS_CNTRMSR_ABLTY: null | string
    BLDVSS_STEP: null | string
    CAD_OUTPUT_IN: null | string
    EST_BN_MAS: null | string
    RBV_QY: null | string
    HEIGHT: null | string
    BDHEAT: null | string
    ODR: number
}

// 테이블 설정.
export const StatisticsTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        xcpt: {
            option: 'row-null',
            component: ({ el }: { el: StatisticsTableListItemInterface }) => {
                return (
                    <XcptComponent>{`${el.MESURE_DE} / ${el.MBER_CNT}명`}</XcptComponent>
                )
            },
        },
        bgState: false,
    },
    Columns: [
        [
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: ``,
                // rowSpan: 2,
            },
            {
                name: `체성분계`,
                colSpan: 7,
            },
            {
                name: `혈압계`,
                colSpan: 3,
            },
            {
                name: `혈당계`,
                colSpan: 2,
            },
            {
                name: `콜레스트롤 측정계`,
                colSpan: 4,
            },
            {
                name: `스트레스 측정계`,
                colSpan: 8,
            },
            {
                name: `기타`,
                colSpan: 8,
            },
        ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
            },
            {
                name: `체중<br />(kg)`,
                key: `WEIGHT`,
            },
            {
                name: `BMI<br />(kg/m²)`,
                key: `BMI`,
            },
            {
                name: `체지<br />방률<br />(%)`,
                key: `PBF`,
            },
            {
                name: `체지<br />방량<br />(kg)`,
                key: `FAT_MAS`,
            },
            {
                name: `근육량<br />(kg)`,
                key: `SLM`,
            },
            {
                name: `추정<br />골량<br />(kg)`,
                key: `EST_BN_MAS`,
            },
            {
                name: `내장<br />지방<br />(level)`,
                key: `VFL`,
            },
            {
                name: `수축기<br />(mmHg)`,
                key: `SYSTOLIC`,
            },
            {
                name: `이완기<br />(mmHg)`,
                key: `DIASTOLIC`,
            },
            {
                name: `맥박<br />(bpm)`,
                key: `PULS`,
            },
            {
                name: `공복<br />(mg/dl)`,
                key: `FBS`,
            },
            {
                name: `식후<br />(mg/dl)`,
                key: `PP2`,
            },
            {
                name: `TC<br />(mg/dl)`,
                key: `T_CHOL`,
            },
            {
                name: `TG<br />(mg/dl)`,
                key: `TG`,
            },
            {
                name: `HDL-C<br />(mg/dl)`,
                key: `HDLC`,
            },
            {
                name: `LDL-C<br />(mg/dl)`,
                key: `LDLC`,
            },
            {
                name: `점수<br />(점)`,
                key: `STRS_SCORE`,
            },
            {
                name: `정신적<br />(단계)`,
                key: `MNTL_STRS`,
            },
            {
                name: `신체적<br />(단계)`,
                key: `PHYSIC_STRS`,
            },
            {
                name: `대처<br />능력<br />(단계)`,
                key: `STRS_CNTRMSR_ABLTY`,
            },
            {
                name: `혈관<br />(단계)`,
                key: `BLDVSS_STEP`,
            },
            {
                name: `박출<br />강도<br />(단계)`,
                key: `CAD_OUTPUT_IN`,
            },
            {
                name: `탄성도<br />(단계)`,
                key: `ELSTC_DGREE`,
            },
            {
                name: `잔혈량<br />(단계)`,
                key: `RBV_QY`,
            },
            {
                name: `신장<br />(cm)`,
                key: `HEIGHT`,
            },
            {
                name: `체온<br />(°c)`,
                key: `BDHEAT`,
            },
            {
                name: `허리<br />둘레<br />(cm)`,
                key: `WAIST_CRCMFRNC`,
            },
        ],
    ],
    Lists: [],
}

// 활동량 현황 테이블 데이터
export interface ActivityWalkTableListItemInterface {
    CNSMP_CALORIE: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    SPORTS_DSTNC: null | string
    MAX_HR: null | string
    MESURE_DE: null | string
    SPORTS_TOT_STEPS: null | string
    MBER_NO: number
    ODR: number
    NM: null | string
    MBER_CNT: null | string
    AVG_HR: null | string
}

// 활동량 현황 테이블 설정.
export const ActivityWalkTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        xcpt: {
            option: 'row-null',
            component: ({ el }: { el: ActivityWalkTableListItemInterface }) => {
                return (
                    <XcptComponent>{`${dateInsertHypen(
                        String(el.MESURE_DE)
                    )} / ${el.MBER_CNT}명`}</XcptComponent>
                )
            },
        },
        bgState: true,
    },
    Columns: [
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `이름`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return <>{el.SEXDSTN == 'M' ? '남' : '여'}</>
                },
            },
            {
                name: `총보행수(걸음)`,
                key: `SPORTS_TOT_STEPS`,
            },
            {
                name: `활동 거리(m)`,
                key: `SPORTS_DSTNC`,
            },
            {
                name: `소비칼로리(kcal)`,
                key: `CNSMP_CALORIE`,
            },
            {
                name: `최대심박수(bpm)`,
                key: `MAX_HR`,
            },
            {
                name: `평균심박수(bpm)`,
                key: `AVG_HR`,
            },
        ],
    ],
    Lists: [],
}

// 미측정 현황 테이블 데이터
export interface NonMeasureTableListItemInterface {
    MBER_NO: string
    NM: string
    BRTHDY: string
    SEXDSTN: string
    MBTLNUM: string
    USID: string
    BP_N_MESURE: string
    BS_N_MESURE: string
    BC_N_MESURE: string
    HA_N_MESURE: string
    IS_N_MESURE: string
    SR_N_MESURE: string
    SB_N_MESURE: string
}

//미측정 현황 테이블 설정.
export const NonMeasureTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `회원정보`,
                rowSpan: 1,
                colSpan: 6,
            },
            {
                name: `측정정보`,
                rowSpan: 1,
                colSpan: 7,
            },
        ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
            },
            {
                name: `전화번호`,
                key: `MBTLNUM`,
            },
            {
                name: `아이디`,
                key: `USID`,
            },
            {
                name: `혈압`,
                key: `BP_N_MESURE`,
            },
            {
                name: `혈당`,
                key: `BS_N_MESURE`,
            },
            {
                name: `콜레스테롤`,
                key: `BC_N_MESURE`,
            },
            {
                name: `당화혈색소`,
                key: `HA_N_MESURE`,
            },
            {
                name: `체성분`,
                key: `IS_N_MESURE`,
            },
            {
                name: `스트레스`,
                key: `SR_N_MESURE`,
            },
            {
                name: `뇌기능검사`,
                key: `SB_N_MESURE`,
            },
        ],
    ],
    Lists: [],
}

export interface HealthIndicatorsTableListItemInterface {
    CNT: number | null
    MBER_NO: number
    TOT_SCORE: number | null
    BP_SCORE: number | null
    TG_SCORE: number | null
    WAIST_SCORE: number | null
    CALC_DE: string | null
    BRTHDY: string | null
    SEXDSTN: string | null
    MBTLNUM: string | null
    HDLC_SCORE: number | null
    FBS_SCORE: number | null
    USID: string | null
    NM: string | null
}

//건강지표 현황 테이블 설정..
export const HealthIndicatorsTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        xcpt: {
            option: 'row-null',
            component: ({
                el,
            }: {
                el: HealthIndicatorsTableListItemInterface
            }) => {
                return (
                    <XcptComponent>{`${dateInsertHypen(String(el.CALC_DE))} / ${
                        el.CNT
                    }명`}</XcptComponent>
                )
            },
        },
        bgState: true,
    },
    Columns: [
        [
            {
                name: `회원정보`,
                rowSpan: 1,
                colSpan: 6,
            },
            {
                name: `측정정보`,
                rowSpan: 1,
                colSpan: 7,
            },
        ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
                cellWidth: `w16`,
            },
            {
                name: `이름`,
                key: `NM`,
                textAlign: `center`,
                cellWidth: `w0112`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `아이디`,
                key: `USID`,
                textAlign: 'left',
                cellWidth: `w0112`,
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return (
                        <ListTableStyle.MbtlnumCell CRTFC={'Y'}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
                cellWidth: `w16`,
            },
            {
                name: `개선성공률`,
                key: `TOT_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.TOT_SCORE}%</>
                },
            },
            {
                name: `허리둘레`,
                key: `WAIST_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.WAIST_SCORE}%</>
                },
            },
            {
                name: `혈압`,
                key: `BP_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.BP_SCORE}%</>
                },
            },
            {
                name: `식전혈당`,
                key: `FBS_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.FBS_SCORE}%</>
                },
            },
            {
                name: `중성지방`,
                key: `TG_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.TG_SCORE}%</>
                },
            },
            {
                name: `HDLC`,
                key: `HDLC_SCORE`,
                component: ({
                    el,
                }: {
                    el: HealthIndicatorsTableListItemInterface
                }) => {
                    return <>{el.HDLC_SCORE}%</>
                },
            },
        ],
    ],
    Lists: [],
}

//보행수 랭킹 현황 테이블 설정
export interface WalkRankingTableListItemInterface {
    MBER_NO: number
    NM: string | null
    BRTHDY: string
    SEXDSTN: string
    USID: string | null
    MBTLNUM: string | null
    INST_RANK: number | null
    TOT_STEPS: number | null
}

//보행수 랭킹  현황 테이블 설정.
export const WalkRankingTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        // [
        //     {
        //         name: `회원정보`,
        //         rowSpan: 1,
        //         colSpan: 6,
        //     },
        //     {
        //         name: `정보`,
        //         rowSpan: 1,
        //         colSpan: 7,
        //     },
        // ],
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
                cellWidth: `w16`,
            },
            {
                name: `이름`,
                key: `NM`,
                textAlign: `center`,
                cellWidth: `w0112`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({
                    el,
                }: {
                    el: WalkRankingTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `아이디`,
                key: `USID`,
                textAlign: `left`,
                cellWidth: `w0112`,
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
                component: ({
                    el,
                }: {
                    el: WalkRankingTableListItemInterface
                }) => {
                    return (
                        <ListTableStyle.MbtlnumCell CRTFC={'Y'}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
                cellWidth: `w16`,
            },
            {
                name: `순위`,
                key: `INST_RANK`,
            },
            {
                name: `보행수`,
                key: `TOT_STEPS`,
            },
        ],
    ],
    Lists: [],
}
