import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import Codes from '@Codes'
import React, { useState } from 'react'
import {
    DefaultManageButton,
    MemberMyDataInputModal,
    MemberMyDataModal,
} from '@Elements'

const { Detail } = ConsultDetailStyle

const initializeState = {
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

const ConsultDetailTableMyData = () => {
    const [pageState, setPageState] = useState<{
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

    return (
        <>
            <Detail.Container>
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
                        {Codes.myData.map((el, index) => {
                            return el.list.map((e, i) => {
                                return (
                                    <Detail.MyData.BodyRow
                                        key={`consult-detail-table-mydata-row-item-${index}-${i}`}>
                                        {i === 0 && (
                                            <Detail.MyData.BodyCellBef
                                                rowSpan={el.list.length}>
                                                {el.name}
                                            </Detail.MyData.BodyCellBef>
                                        )}
                                        <Detail.MyData.BodyCellBef>
                                            <Detail.MyData.BodyCellBefLink
                                                onClick={() => {
                                                    setPageState(prevState => ({
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
                                                    }))
                                                }}>
                                                {e.name}
                                            </Detail.MyData.BodyCellBefLink>
                                        </Detail.MyData.BodyCellBef>
                                        <Detail.MyData.BodyCell>
                                            기기측정
                                        </Detail.MyData.BodyCell>
                                        <Detail.MyData.BodyCell>
                                            2022-11-10 17:54:27
                                        </Detail.MyData.BodyCell>
                                        <Detail.MyData.BodyCell>
                                            55.8
                                        </Detail.MyData.BodyCell>
                                        <Detail.MyData.BodyCell Color={'green'}>
                                            51.80 ~ 64.40
                                        </Detail.MyData.BodyCell>
                                        <Detail.MyData.BodyCell Color={'green'}>
                                            좋음
                                        </Detail.MyData.BodyCell>
                                    </Detail.MyData.BodyRow>
                                )
                            })
                        })}
                    </Detail.MyData.Body>
                </Detail.MyData.Wapper>
            </Detail.Container>
            <div className="w-full text-left items-center gap-2 mt-3">
                <DefaultManageButton
                    ButtonName={'수기입력'}
                    ButtonClick={() =>
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
            </div>
            {pageState.modal.myData.state &&
                pageState.modal.myData.selectCode &&
                pageState.modal.myData.selectName && (
                    <MemberMyDataModal
                        MemberNo={87335}
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

            {pageState.modal.myDataInput.state && (
                <MemberMyDataInputModal
                    MemberNo={87335}
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

export default ConsultDetailTableMyData
