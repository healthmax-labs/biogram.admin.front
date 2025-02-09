// 위험요인 현황 테이블 데이터
import React from 'react'
import { dateInsertHypen, timeStringSmapDateParse } from '@Helper'
import { ListComponentStyle } from '@Style/Pages/StatusPageStyle'
import { ListTableItemStyle } from '@Style/Pages/MemberPageStyles'
import { phoneFormat, addComma } from '@Helper'
import _ from 'lodash'
import Const from '@Const'
import {
    StressListItemInterface,
    BrainListItemInterface,
} from '@Type/StatusTypes'

const {
    Box: { Container, Wapper, Item },
    XcptComponent,
    TableConditionsCellWapper,
    TableConditionsCell,
    TableConditionsCellText,
    TableConditionsLeftWapper,
    TableConditionsRightWapper,
} = ListComponentStyle

const RiskFctrJdgmntColor = (jdgmnt: string): string => {
    const findData = _.find(Const.RiskFctrJdgmnt, { name: jdgmnt })

    return findData ? findData.textColor : ''
}

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
        pagination: true,
        selectAll: true,
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
                name: `콜레스테롤 측정계`,
                colSpan: 4,
            },
        ],
        [
            {
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
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
                name: `허리둘레<br/>(Cm)`,
                key: `WAIST`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.WAIST_JDGMNT
                        ? RiskFctrJdgmntColor(el.WAIST_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.WAIST ? el.WAIST : ''}`}</p>
                    )
                },
            },
            {
                name: `체중<br/>(kg)`,
                key: `BDWGH`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.BDWGH_JDGMNT
                        ? RiskFctrJdgmntColor(el.BDWGH_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.BDWGH ? el.BDWGH : ''}`}</p>
                    )
                },
            },
            {
                name: `BMI<br/>(kg/m²)`,
                key: `BMI`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.BMI_JDGMNT
                        ? RiskFctrJdgmntColor(el.BMI_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.BMI ? el.BMI : ''}`}</p>
                    )
                },
            },
            {
                name: `체지방률<br/>(%)`,
                key: `PBF`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.PBF_JDGMNT
                        ? RiskFctrJdgmntColor(el.PBF_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.PBF ? el.PBF : ''}`}</p>
                    )
                },
            },
            {
                name: `근육량<br/>(kg)`,
                key: `SLM`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.SLM_JDGMNT
                        ? RiskFctrJdgmntColor(el.SLM_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.SLM ? el.SLM : ''}`}</p>
                    )
                },
            },
            {
                name: `추정골량<br/>(kg)`,
                key: `EST_BN_MAS`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.EST_BN_MAS_JDGMNT
                        ? RiskFctrJdgmntColor(el.EST_BN_MAS_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.EST_BN_MAS ? el.EST_BN_MAS : ''}`}</p>
                    )
                },
            },
            {
                name: `내장지방<br/>(lv)`,
                key: `VFL`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.VFL_JDGMNT
                        ? RiskFctrJdgmntColor(el.VFL_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.VFL ? el.VFL : ''}`}</p>
                    )
                },
            },
            {
                name: `수축기<br/>(mmHg)`,
                key: `SYSTOLIC`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.SYSTOLIC_JDGMNT
                        ? RiskFctrJdgmntColor(el.SYSTOLIC_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.SYSTOLIC ? el.SYSTOLIC : ''}`}</p>
                    )
                },
            },
            {
                name: `이완기<br/>(mmHg)`,
                key: `DIASTOLIC`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.DIASTOLIC_JDGMNT
                        ? RiskFctrJdgmntColor(el.DIASTOLIC_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.DIASTOLIC ? el.DIASTOLIC : ''}`}</p>
                    )
                },
            },
            {
                name: `맥박<br/>(bpm)`,
                key: `PULS`,
            },
            {
                name: `식전<br/>(mg/dl)`,
                key: `FBS`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.FBS_JDGMNT
                        ? RiskFctrJdgmntColor(el.FBS_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.FBS ? el.FBS : ''}`}</p>
                    )
                },
            },
            {
                name: `식후<br/>(mg/dl)`,
                key: `PP2`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.PP2_JDGMNT
                        ? RiskFctrJdgmntColor(el.PP2_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.PP2 ? el.PP2 : ''}`}</p>
                    )
                },
            },
            {
                name: `TC<br/>(mg/dl)`,
                key: `TC`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.TC_JDGMNT
                        ? RiskFctrJdgmntColor(el.TC_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.TC ? el.TC : ''}`}</p>
                    )
                },
            },
            {
                name: `TG<br/>(mg/dl)`,
                key: `TG`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.TG_JDGMNT
                        ? RiskFctrJdgmntColor(el.TG_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.TG ? el.TG : ''}`}</p>
                    )
                },
            },
            {
                name: `HDL-C<br/>(mg/dl)`,
                key: `HDLC`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.HDLC_JDGMNT
                        ? RiskFctrJdgmntColor(el.HDLC_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.HDLC ? el.HDLC : ''}`}</p>
                    )
                },
            },
            {
                name: `LDL-C<br/>(mg/dl)`,
                key: `LDLC`,
                component: ({ el }: { el: RiskFctrTableListItemInterface }) => {
                    const textColor = el.LDLC_JDGMNT
                        ? RiskFctrJdgmntColor(el.LDLC_JDGMNT)
                        : ''

                    return (
                        <p
                            style={{
                                color: `#${textColor}`,
                            }}>{`${el.LDLC ? el.LDLC : ''}`}</p>
                    )
                },
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
    FBS_MESURE_DT_2: null | string
    FBS_MESURE_DT_3: null | string
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
        pagination: true,
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
            },
            {
                name: ``,
            },
            {
                name: ``,
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
                name: `고밀도 콜레스테롤`,
                colSpan: 2,
            },
        ],
        [
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
                                    {el.FBS_MESURE_DT_2
                                        ? timeStringSmapDateParse(
                                              el.FBS_MESURE_DT_2
                                          )
                                        : '-'}
                                </Item>
                                <Item>{el.FBS_2}</Item>
                            </Wapper>
                            <Wapper>
                                <Item>
                                    {el.FBS_MESURE_DT_3
                                        ? timeStringSmapDateParse(
                                              el.FBS_MESURE_DT_3
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

// 기기측정현황
export const StatisticsTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
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
            },
            {
                name: ``,
            },
            {
                name: ``,
            },
            {
                name: ``,
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
                colSpan: 3,
            },
            {
                name: `콜레스테롤 측정계`,
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
                name: `측정일자`,
                key: `MESURE_DE`,
                component: ({
                    el,
                }: {
                    el: StatisticsTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.MESURE_DE))}</>
                },
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
                name: `식전<br />(mg/dl)`,
                key: `FBS`,
            },
            {
                name: `식후<br />(mg/dl)`,
                key: `PP2`,
            },
            {
                name: `당화혈색소<br />(%)`,
                key: `HBA1C`,
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
        pagination: true,
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
                name: `측정일자`,
                key: `MESURE_DE`,
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return <>{dateInsertHypen(String(el.MESURE_DE))}</>
                },
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
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return (
                        <>
                            {el.SPORTS_TOT_STEPS
                                ? addComma(Number(el.SPORTS_TOT_STEPS))
                                : '-'}
                        </>
                    )
                },
            },
            {
                name: `활동 거리(m)`,
                key: `SPORTS_DSTNC`,
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return (
                        <>
                            {el.SPORTS_DSTNC
                                ? addComma(Number(el.SPORTS_DSTNC))
                                : '-'}
                        </>
                    )
                },
            },
            {
                name: `소비칼로리(kcal)`,
                key: `CNSMP_CALORIE`,
                component: ({
                    el,
                }: {
                    el: ActivityWalkTableListItemInterface
                }) => {
                    return (
                        <>
                            {el.CNSMP_CALORIE
                                ? addComma(Number(el.CNSMP_CALORIE))
                                : '-'}
                        </>
                    )
                },
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
                colSpan: 5,
            },
            {
                name: `측정정보`,
                rowSpan: 1,
                colSpan: 7,
            },
        ],
        [
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
                colSpan: 5,
            },
            {
                name: `측정정보`,
                rowSpan: 1,
                colSpan: 7,
            },
        ],
        [
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
                        <ListTableItemStyle.MbtlnumCell CRTFC={'Y'}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableItemStyle.MbtlnumCell>
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
    NM: string
    BRTHDY: string
    SEXDSTN: string
    USID: string
    MBTLNUM: string
    INST_RANK: number
    TOT_STEPS: number
}

//보행수 랭킹  현황 테이블 설정.
export const WalkRankingTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
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
                        <ListTableItemStyle.MbtlnumCell CRTFC={'Y'}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableItemStyle.MbtlnumCell>
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
                component: ({
                    el,
                }: {
                    el: WalkRankingTableListItemInterface
                }) => {
                    return <>{addComma(el.TOT_STEPS)}</>
                },
            },
        ],
    ],
    Lists: [],
}

// 스트레스 현황 테이블
export const StressListTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
            },
            {
                name: ``,
            },
            {
                name: `스트레스`,
                colSpan: 4,
            },
            {
                name: `혈관건강`,
                colSpan: 4,
            },
        ],
        [
            {
                name: `이름`,
                key: `NM`,
                textAlign: `center`,
                cellWidth: `w0112`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                cellWidth: `w0112`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `총점수`,
                key: `STRS_SCORE`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.STRS_SCORE_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.STRS_SCORE}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `신체적<br />스트레스`,
                key: `PHYSIC_STRS`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.PHYSIC_STRS_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.PHYSIC_STRS}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `정신적<br />스트레스`,
                key: `MNTL_STRS`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.MNTL_STRS_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.MNTL_STRS}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `스트레스<br />대처능력`,
                key: `STRS_CNTRMSR_ABLTY`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.STRS_CNTRMSR_ABLTY_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.STRS_CNTRMSR_ABLTY}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `혈관 단계`,
                key: `BLDVSS_STEP`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.BLDVSS_STEP_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.BLDVSS_STEP}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `박출강도`,
                key: `CAD_OUTPUT_IN`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.CAD_OUTPUT_IN_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.CAD_OUTPUT_IN}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `탄성도`,
                key: `ELSTC_DGREE`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.ELSTC_DGREE_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.ELSTC_DGREE}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `전혈량`,
                key: `RBV_QY`,
                component: ({ el }: { el: StressListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.RBV_QY_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.RBV_QY}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
        ],
    ],
    Lists: [],
}

// 뇌기능 현황 테이블
export const BrainListTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
        selectAll: false,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
            },
            {
                name: ``,
            },
            {
                name: `종합점수`,
            },
            {
                name: `인지 기능검사`,
                colSpan: 4,
            },
            {
                name: `뇌 혈류 기능검사`,
                colSpan: 2,
            },
        ],
        [
            {
                name: `이름`,
                key: `NM`,
                textAlign: `center`,
                cellWidth: `w0112`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
                cellWidth: `w0112`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return <>{dateInsertHypen(String(el.BRTHDY))}</>
                },
            },
            {
                name: `뇌 건강 종합 점수`,
                key: `BH_TNT_SCORE`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.BH_TNT_SCORE_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.BH_TNT_SCORE}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `기초 뇌 기능`,
                key: `BB_FNCT`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.BB_FNCT_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.BB_FNCT}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `인지 뇌 기능`,
                key: `CB_FNCT`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.CB_FNCT_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.CB_FNCT}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `인지 능력`,
                key: `CB_ABLTY`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.CB_ABLTY_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.CB_ABLTY}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `인지 기능 점수`,
                key: `CB_FNCT_SCORE`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.CB_FNCT_SCORE_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.CB_FNCT_SCORE}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `뇌 혈류 조절 시간`,
                key: `BBF_ADJST_TIME`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.BBF_ADJST_TIME_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.BBF_ADJST_TIME}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
            {
                name: `뇌 혈류 기능 점수`,
                key: `BBF_FNCT_SCORE`,
                component: ({ el }: { el: BrainListItemInterface }) => {
                    return (
                        <TableConditionsCellWapper>
                            <TableConditionsLeftWapper>
                                <TableConditionsCell
                                    Conditions={
                                        el.BBF_FNCT_SCORE_JDGMNT
                                    }></TableConditionsCell>
                            </TableConditionsLeftWapper>
                            <TableConditionsRightWapper>
                                <TableConditionsCellText>
                                    {el.BBF_FNCT_SCORE}
                                </TableConditionsCellText>
                            </TableConditionsRightWapper>
                        </TableConditionsCellWapper>
                    )
                },
            },
        ],
    ],
    Lists: [],
}
