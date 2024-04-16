import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { VaryInput, VaryLabel } from '@Elements'
import ConsultDetailTableTab from './ConsultDetailTableTab'
import { useParams } from 'react-router-dom'
import Routers from '@Routers'
import { useRecoilValue } from 'recoil'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { useEffect, useState } from 'react'
import { getWesternAge } from '@Helper'

const { TableContainer, TableWapper, Row, LabelCell, InputCell } =
    DetailTableStyle
const { DetailContainer } = DetailPageStyle

const initializeState = {
    info: {
        NM: '',
        MBTLNUM: '',
        SEXDSTN: '',
        BRTHDY: '',
        MBTLNUM_CRTFC_AT: 'N',
        AGE: '',
    },
}

const ConsultDetailPartsMain = ({
    HandleGetData,
}: {
    HandleGetData: () => void
}) => {
    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()

    const [pageState, setPageState] = useState<{
        info: {
            NM: string
            MBTLNUM: string
            SEXDSTN: string
            BRTHDY: string
            MBTLNUM_CRTFC_AT: string | 'N' | 'Y'
            AGE: string
        }
    }>(initializeState)

    const detailState = useRecoilValue(ConsultDetailState)

    // 텝에 따른 메인 페이지 동적 로딩.
    const renderTabPageComponent = () => {
        const category = params.category

        if (!category) {
            return <></>
        }

        const chIndex = Routers.ConsultTabs.findIndex(
            el => el.category === category
        )

        const TabPageComponent = Routers.ConsultTabs[chIndex].Component
        return <TabPageComponent HandleGetData={HandleGetData} />
    }

    useEffect(() => {
        const funcSetData = () => {
            if (detailState.detail) {
                const { NM, BRTHDY, SEXDSTN, MBTLNUM, MBTLNUM_CRTFC_AT } =
                    detailState.detail.MBER_INFO
                setPageState(prevState => ({
                    ...prevState,
                    info: {
                        NM: NM,
                        BRTHDY: BRTHDY,
                        MBTLNUM: MBTLNUM,
                        SEXDSTN: SEXDSTN,
                        MBTLNUM_CRTFC_AT: MBTLNUM_CRTFC_AT,
                        AGE: `${getWesternAge(BRTHDY)}`,
                    },
                }))
            }
        }

        if (detailState.status === 'success') {
            funcSetData()
        }
    }, [detailState])

    return (
        <>
            <DetailContainer>
                <TableContainer>
                    <TableWapper>
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`이름`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w60'}
                                    HandleOnChange={() => {
                                        //
                                    }}
                                    id={'id'}
                                    Placeholder={'이름'}
                                    Value={pageState.info.NM}
                                    Disabled={true}
                                />
                            </InputCell>
                            <LabelCell>
                                <VaryLabel LabelName={`핸드폰번호`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    TextColor={
                                        pageState.info.MBTLNUM_CRTFC_AT === 'N'
                                            ? 'red'
                                            : 'gray'
                                    }
                                    Width={'w60'}
                                    HandleOnChange={() => {
                                        //
                                    }}
                                    id={'id'}
                                    Placeholder={'핸드폰번호'}
                                    Value={pageState.info.MBTLNUM}
                                    Disabled={true}
                                />
                            </InputCell>
                        </Row>
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`성별`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w60'}
                                    HandleOnChange={() => {
                                        //
                                    }}
                                    id={'id'}
                                    Placeholder={'성별'}
                                    Value={pageState.info.SEXDSTN}
                                    Disabled={true}
                                />
                            </InputCell>
                            <LabelCell>
                                <VaryLabel LabelName={`생년월일`} />
                            </LabelCell>
                            <InputCell>
                                <VaryInput
                                    Width={'w60'}
                                    HandleOnChange={() => {
                                        //
                                    }}
                                    id={'id'}
                                    Placeholder={'생년월일'}
                                    Value={
                                        pageState.info.BRTHDY &&
                                        pageState.info.AGE
                                            ? `${pageState.info.BRTHDY} (만${pageState.info.AGE}세)`
                                            : ``
                                    }
                                    Disabled={true}
                                />
                            </InputCell>
                        </Row>
                    </TableWapper>
                </TableContainer>

                <ConsultDetailTableTab />

                <>{renderTabPageComponent()}</>
            </DetailContainer>
        </>
    )
}

export default ConsultDetailPartsMain
