import React, { useEffect, useState } from 'react'
import { MainStyle, SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './StatisticsSearchBox'
import ManageBox from './StatisticsManageBox'
import ListTable from './StatisticsListTable'
import { getStatisticsList } from '@Service/StatisticsService'
import { StatisticsListItemInterface } from '@Type/StatisticsTypes'
import { tableListItemInterface } from './StatisticsTableConfig'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const { Container } = SearchBoxStyle

const initializeState = {
    loading: true,
    memberList: [],
}

const ListMain = () => {
    const [pageState, setPageState] = useState<{
        loading: boolean
        memberList: tableListItemInterface[]
    }>(initializeState)

    const getTableList = async () => {
        const response = await getStatisticsList({
            CUR_PAGE: 1,
            INST_NO: 0,
            SEARCH_KEY: '',
            BEGIN_DE: '20220501',
            END_DE: '20220525',
        })

        const listData: StatisticsListItemInterface[] =
            response.payload.DEVICE_MESURE_INFO_LIST

        setPageState(prevState => ({
            ...prevState,
            loading: false,
            memberList: listData.map(_ => {
                return {
                    MBER_NO: _.MBER_NO,
                    NM: _.NM,
                    BRTHDY: _.BRTHDY,
                    SEXDSTN: _.SEXDSTN,
                    MESURE_DE: _.MESURE_DE,
                    MBER_CNT: _.MBER_CNT,
                    WEIGHT: _.WEIGHT,
                    BMI: _.BMI,
                    FAT_MAS: _.FAT_MAS,
                    SYSTOLIC: _.SYSTOLIC,
                    STRS_SCORE: _.STRS_SCORE,
                    STRS_CNTRMSR_ABLTY: _.STRS_CNTRMSR_ABLTY,
                    MNTL_STRS: _.MNTL_STRS,
                    ELSTC_DGREE: _.ELSTC_DGREE,
                    BLDVSS_STEP: _.BLDVSS_STEP,
                    DIASTOLIC: _.DIASTOLIC,
                    LDLC: _.LDLC,
                    HDLC: _.HDLC,
                    PBF: _.PBF,
                    SLM: _.SLM,
                    FBS: _.FBS,
                    PP2: _.PP2,
                    RBV_QY: _.RBV_QY,
                    ODR: _.ODR,
                    PHYSIC_STRS: _.PHYSIC_STRS,
                    VFL: _.VFL,
                    EST_BN_MAS: _.EST_BN_MAS,
                    CAD_OUTPUT_IN: _.CAD_OUTPUT_IN,
                    PULS: _.PULS,
                    HEIGHT: _.HEIGHT,
                    TG: _.TG,
                    T_CHOL: _.T_CHOL,
                    BDHEAT: _.BDHEAT,
                    WAIST_CRCMFRNC: _.WAIST_CRCMFRNC,
                }
            }),
        }))
    }

    useEffect(() => {
        const pageStart = () => {
            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))
            getTableList().then()
        }

        pageStart()
    }, [])
    return (
        <Container>
            <SearchWapper>
                <SearchBox />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable
                    MemberList={pageState.memberList}
                    Loading={pageState.loading}
                />
            </TableWapper>
        </Container>
    )
}

export default ListMain
