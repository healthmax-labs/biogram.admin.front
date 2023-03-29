import { MemberMesureInfoInterface } from '@Type/MemberTypes'
import Codes from '@Codes'
import React, { useEffect, useState } from 'react'
import {
    ElementLoading,
    MemberMyDataInputModal,
    MemberMyDataModal,
    VaryButton,
} from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useRecoilValue } from 'recoil'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import _ from 'lodash'
import { timeStringParse } from '@Helper'
import { AtomRootState } from '@Recoil/AppRootState'

const { Detail } = ConsultDetailStyle

const initializeState = {
    memNo: null,
    MESURE_INFO: null,
    modal: {
        selectCode: null,
        myData: {
            state: false,
            selectCode: null,
            selectName: null,
        },
        myDataInput: {
            state: false,
        },
    },
}

const ConsultDetailPartMyData = ({
    HandleGetData,
}: {
    HandleGetData: () => void
}) => {
    const detailState = useRecoilValue(ConsultDetailState)
    const rootState = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        memNo: number | null
        MESURE_INFO: MemberMesureInfoInterface | null
        modal: {
            myData: {
                state: boolean
                selectCode: string | null
                selectName: string | null
            }
            myDataInput: {
                state: boolean
            }
        }
    }>(initializeState)

    useEffect(() => {
        const funcSetData = (
            info: MemberMesureInfoInterface,
            memNo: number
        ) => {
            setPageState(prevState => ({
                ...prevState,
                MESURE_INFO: info,
                memNo: memNo,
            }))
        }

        if (
            detailState.status === 'success' &&
            detailState.detail &&
            detailState.memNo
        ) {
            funcSetData(detailState.detail.MESURE_INFO, detailState.memNo)
        }
    }, [detailState])

    return (
        <>
            <Detail.MyData.ButtonWapper>
                <Detail.MyData.Button>
                    {detailState.status === 'success' && (
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'마이데이터 프린트하기'}
                            HandleClick={() => {
                                window.open(
                                    `${process.env.REACT_APP_SYS_SERVER_URL}/member_mydata_print_v3.jsp?mber_no=${pageState.memNo}&auth=${rootState.logininfo.VTOKEN_INFO}`,
                                    '마이데이터 출력',
                                    'width=1200px,height=4528px,scrollbars=yes'
                                )
                            }}
                        />
                    )}

                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'수기입력'}
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    myDataInput: {
                                        state: true,
                                    },
                                },
                            }))
                        }
                    />
                </Detail.MyData.Button>
            </Detail.MyData.ButtonWapper>
            <Detail.Container>
                {detailState.status === 'loading' ? (
                    <div className="h-[calc(100vh-10rem)]">
                        <ElementLoading FullScreen={false} />
                    </div>
                ) : (
                    <Detail.MyData.Wapper>
                        <Detail.MyData.Head>
                            <Detail.MyData.HeadRow>
                                <Detail.MyData.HeadCell colSpan={2}>
                                    구분
                                </Detail.MyData.HeadCell>
                                <Detail.MyData.HeadCell>
                                    기록구분
                                </Detail.MyData.HeadCell>
                                <Detail.MyData.HeadCell>
                                    일시
                                </Detail.MyData.HeadCell>
                                <Detail.MyData.HeadCell>
                                    수치
                                </Detail.MyData.HeadCell>
                                <Detail.MyData.HeadCell>
                                    정상범위
                                </Detail.MyData.HeadCell>
                                <Detail.MyData.HeadCell>
                                    평가
                                </Detail.MyData.HeadCell>
                            </Detail.MyData.HeadRow>
                        </Detail.MyData.Head>
                        <Detail.MyData.Body>
                            {pageState.MESURE_INFO !== null &&
                                Codes.myData.map((el, index) => {
                                    return el.list.map((e, i) => {
                                        const { MESURE_INFO } = pageState

                                        const MesureData = _.find(MESURE_INFO, {
                                            MESURE_CODE: e.code,
                                        })

                                        const MESURE_MTHD_NM =
                                            MesureData &&
                                            MesureData.MESURE_MTHD_NM
                                                ? MesureData.MESURE_MTHD_NM
                                                : '-'

                                        const MESURE_DT =
                                            MesureData && MesureData.MESURE_DT
                                                ? timeStringParse(
                                                      MesureData.MESURE_DT
                                                  )
                                                : '-'

                                        const DATAS =
                                            MesureData && MesureData.DATAS
                                                ? MesureData.DATAS
                                                : '-'

                                        const MNVL =
                                            MesureData && MesureData.MNVL
                                                ? MesureData.MNVL
                                                : null

                                        const MVL =
                                            MesureData && MesureData.MVL
                                                ? MesureData.MVL
                                                : null

                                        const MNVLMVL =
                                            MNVL && MVL
                                                ? `${MNVL} ~ ${MVL}`
                                                : '-'

                                        const MESURE_GRAD_NM =
                                            MesureData &&
                                            MesureData.MESURE_GRAD_NM
                                                ? MesureData.MESURE_GRAD_NM
                                                : '-'

                                        const textColor =
                                            MesureData &&
                                            MesureData.COLOR_CODE_VALUE
                                                ? MesureData.COLOR_CODE_VALUE
                                                : '-'

                                        return (
                                            <Detail.MyData.BodyRow
                                                key={`consult-detail-table-mydata-row-item-${index}-${i}`}>
                                                {i === 0 && (
                                                    <Detail.MyData.BodyCellBef
                                                        rowSpan={
                                                            el.list.length
                                                        }>
                                                        {el.name}
                                                    </Detail.MyData.BodyCellBef>
                                                )}
                                                <Detail.MyData.BodyCellBef>
                                                    <Detail.MyData.BodyCellBefLink
                                                        onClick={() => {
                                                            setPageState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    modal: {
                                                                        ...prevState.modal,
                                                                        myData: {
                                                                            state: true,
                                                                            selectCode:
                                                                                e.code,
                                                                            selectName:
                                                                                e.name,
                                                                        },
                                                                    },
                                                                })
                                                            )
                                                        }}>
                                                        {e.name}
                                                    </Detail.MyData.BodyCellBefLink>
                                                </Detail.MyData.BodyCellBef>
                                                <Detail.MyData.BodyCell>
                                                    {MESURE_MTHD_NM}
                                                </Detail.MyData.BodyCell>
                                                <Detail.MyData.BodyCell>
                                                    {MESURE_DT}
                                                </Detail.MyData.BodyCell>
                                                <Detail.MyData.BodyCell>
                                                    {DATAS}
                                                </Detail.MyData.BodyCell>
                                                <Detail.MyData.BodyCell>
                                                    <p
                                                        style={{
                                                            color: `#${textColor}`,
                                                        }}>
                                                        {MNVLMVL}
                                                    </p>
                                                </Detail.MyData.BodyCell>
                                                <Detail.MyData.BodyCell>
                                                    <p
                                                        style={{
                                                            color: `#${textColor}`,
                                                        }}>
                                                        {MESURE_GRAD_NM}
                                                    </p>
                                                </Detail.MyData.BodyCell>
                                            </Detail.MyData.BodyRow>
                                        )
                                    })
                                })}
                        </Detail.MyData.Body>
                    </Detail.MyData.Wapper>
                )}
            </Detail.Container>
            {pageState.modal.myData.state &&
                pageState.modal.myData.selectCode &&
                pageState.modal.myData.selectName && (
                    <MemberMyDataModal
                        MemberNo={pageState.memNo}
                        DataCode={pageState.modal.myData.selectCode}
                        DataName={pageState.modal.myData.selectName}
                        CancleButtonClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    myData: {
                                        state: false,
                                        selectCode: null,
                                        selectName: null,
                                    },
                                },
                            }))
                        }
                    />
                )}

            {pageState.modal.myDataInput.state && detailState.memNo && (
                <MemberMyDataInputModal
                    MemberNo={detailState.memNo}
                    Saved={() => {
                        HandleGetData()
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                myDataInput: {
                                    ...prevState.modal.myDataInput,
                                    state: false,
                                },
                            },
                        }))
                    }}
                    CancleButtonClick={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                myDataInput: {
                                    state: false,
                                },
                            },
                        }))
                    }
                />
            )}
        </>
    )
}

export default ConsultDetailPartMyData
