import React, { useCallback, useEffect, useState } from 'react'
import {
    ConfirmModal,
    ElementLoading,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryModal,
} from '@Elements'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import {
    changeDatePickerDate,
    getDateDayMonthUnit,
    getNowDate,
    getOnlyNumber,
    gmtTimeToTimeObject,
} from '@Helper'
import { MesureInfoListItemInterface } from '@Type/MemberTypes'
import Messages from '@Messages'
import {
    getMesureInfo,
    postDataMesureInfoManualUpdate,
    postMesureInfoDelete,
} from '@Service/MemberService'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { useMainLayouts } from '@Hook/index'

const {
    HeaderRow,
    HeaderCell,
    TableHeader,
    TableWapper,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    TableBodyCellItem,
} = CommonListTableStyle

const initializeState = {
    loading: false,
    search: {
        page: 0,
        startDate: getDateDayMonthUnit(6),
        endDate: getNowDate(),
    },
    list: [],
    title: ``,
    changeData: [],
    modal: {
        confirm: false,
        delete: false,
    },
    deleteIndex: null,
}

const MemberMyDataHistoryModal = ({
    MemberNo,
    DataCode,
    DataName,
    CancleButtonClick,
}: {
    MemberNo: number | null
    DataCode: string
    DataName: string
    CancleButtonClick: () => void
}) => {
    const { handlMainAlert } = useMainLayouts()

    const { userinfo } = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        loading: boolean
        search: {
            page: number
            startDate: string
            endDate: string
        }
        list: MesureInfoListItemInterface[]
        title: string
        modal: {
            confirm: boolean
            delete: boolean
        }
        deleteIndex: null | number
    }>(initializeState)

    const [chageItem, setChangeItem] = useState<
        Array<{
            MBER_NO: number
            MESURE_CODE: string
            MESURE_DATA: string
            MESURE_DT: string
            REGIST_MBER_NO: number | null
        }>
    >([])

    const getMthdData = (MESURE_DT: string): number | string => {
        const findI = chageItem.findIndex(element => {
            return element.MESURE_DT === MESURE_DT
        })

        if (findI > -1) {
            return chageItem[findI].MESURE_DATA
        } else {
            return ''
        }
    }

    const handleDeleteItem = async () => {
        if (pageState.deleteIndex !== null && pageState.deleteIndex > -1) {
            console.debug('handleDeleteItem', pageState.deleteIndex)

            const item = pageState.list[pageState.deleteIndex]

            const memNo = item.MBER_NO
            const mesure_dt = getOnlyNumber(item.MESURE_DT)

            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))

            const { status } = await postMesureInfoDelete({
                memNo: memNo,
                mesureDt: String(mesure_dt),
                mesureCode: DataCode,
            })

            if (status) {
                handleGetList().then()
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                }))

                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }

    const handleGetList = useCallback(async () => {
        if (
            MemberNo &&
            DataCode &&
            pageState.search.startDate &&
            pageState.search.endDate &&
            pageState.search.page !== null
        ) {
            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))

            const { status, payload } = await getMesureInfo({
                memNo: MemberNo,
                dataCode: DataCode,
                startDate: pageState.search.startDate,
                endDate: pageState.search.endDate,
                pageNo: pageState.search.page,
            })
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                    list: payload.MESURE_INFO_LIST.map(e => {
                        if (e.MESURE_MTHD === 'M') {
                            if (userinfo && userinfo.MBER_NO) {
                                setChangeItem(prevState => [
                                    ...prevState,
                                    {
                                        MBER_NO: e.MBER_NO,
                                        MESURE_CODE: DataCode,
                                        MESURE_DATA: e.DATAS,
                                        MESURE_DT: getOnlyNumber(e.MESURE_DT),
                                        REGIST_MBER_NO: userinfo.MBER_NO,
                                    },
                                ])
                            }
                        }
                        return e
                    }),
                }))
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                    list: [],
                }))
                // FIXME: 에러처리.
                // handlMainAlert({
                //     state: true,
                //     message: Messages.Default.pageError,
                // })
            }
        }
    }, [
        DataCode,
        MemberNo,
        pageState.search.endDate,
        pageState.search.page,
        pageState.search.startDate,
        userinfo,
    ])

    const handleMesureSave = async () => {
        let resultStatus = true
        for (const e of chageItem) {
            const { status } = await postDataMesureInfoManualUpdate({
                MBER_NO: e.MBER_NO,
                MESURE_CODE: e.MESURE_CODE,
                MESURE_DATA: e.MESURE_DATA,
                MESURE_DT: e.MESURE_DT,
                REGIST_MBER_NO: e.REGIST_MBER_NO,
            })

            resultStatus = status
        }

        if (resultStatus) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            handleGetList().then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        const funcSetState = () => {
            handleGetList().then()
        }

        funcSetState()

        // FIXME : 종속성에서 pageState.search.startDate -> handleGetList 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataCode, MemberNo])

    return (
        <>
            <VaryModal
                ModalLoading={pageState.loading}
                NeedMax={false}
                Children={
                    <>
                        <div className="py-2 text-left text-xl">{DataName}</div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2">
                                <VaryDatepickerInput
                                    InputeType={`default`}
                                    Value={changeDatePickerDate(
                                        pageState.search.startDate
                                    )}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                startDate: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                                ~
                                <VaryDatepickerInput
                                    InputeType={`default`}
                                    Value={changeDatePickerDate(
                                        pageState.search.endDate
                                    )}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                endDate: `${dateObj.year}${dateObj.monthPad}${dateObj.dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                            <div className="flex py-2">
                                <VaryButton
                                    ButtonType={'default'}
                                    ButtonName={'조회'}
                                    HandleClick={() => handleGetList().then()}
                                />
                            </div>
                        </div>
                        {pageState.loading ? (
                            <div className="h-[calc(100vh-10rem)]">
                                <ElementLoading FullScreen={false} />
                            </div>
                        ) : (
                            <TableWapper>
                                <TableHeader>
                                    <HeaderRow>
                                        <HeaderCell>기록구분</HeaderCell>
                                        <HeaderCell>측정일시</HeaderCell>
                                        <HeaderCell>마지막 측정값</HeaderCell>
                                        <HeaderCell>정상수치</HeaderCell>
                                        <HeaderCell>평가</HeaderCell>
                                        <HeaderCell>삭제</HeaderCell>
                                    </HeaderRow>
                                </TableHeader>
                                <TableBody HeightLimit={true} Scroll={true}>
                                    {pageState.list.length > 0 ? (
                                        pageState.list.map((el, index) => {
                                            const MNVL = el.MNVL
                                            const MVL = el.MVL
                                            const MNVLMVL =
                                                MNVL && MVL
                                                    ? `${MNVL} ~ ${MVL}`
                                                    : '-'

                                            let datas
                                            if (el.MESURE_MTHD === 'M') {
                                                datas = getMthdData(
                                                    getOnlyNumber(el.MESURE_DT)
                                                )
                                            } else {
                                                datas = el.DATAS
                                            }

                                            return (
                                                <TableBodyRow
                                                    key={`main-table-body-row-${index}`}
                                                    BgState={index % 2 === 0}>
                                                    <TableBodyCell>
                                                        {el.MESURE_MTHD_NM}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_DT}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_MTHD ===
                                                        'M' ? (
                                                            <TableBodyCellItem>
                                                                <VaryInput
                                                                    Value={
                                                                        datas
                                                                    }
                                                                    HandleOnChange={event => {
                                                                        setChangeItem(
                                                                            prevState => {
                                                                                return prevState.map(
                                                                                    element => {
                                                                                        if (
                                                                                            element.MESURE_DT ===
                                                                                            getOnlyNumber(
                                                                                                el.MESURE_DT
                                                                                            )
                                                                                        ) {
                                                                                            return {
                                                                                                ...element,
                                                                                                MESURE_DATA:
                                                                                                    event
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                        } else {
                                                                                            return element
                                                                                        }
                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                    }}
                                                                />
                                                            </TableBodyCellItem>
                                                        ) : (
                                                            datas
                                                        )}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {MNVLMVL}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_GRAD_NM}
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        {el.MESURE_MTHD ===
                                                            'M' && (
                                                            <VaryButton
                                                                ButtonType={
                                                                    'manage'
                                                                }
                                                                ButtonName={
                                                                    '삭제'
                                                                }
                                                                HandleClick={() =>
                                                                    setPageState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            deleteIndex:
                                                                                index,
                                                                            modal: {
                                                                                ...prevState.modal,
                                                                                delete: true,
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </TableBodyCell>
                                                </TableBodyRow>
                                            )
                                        })
                                    ) : (
                                        <TableBodyRow BgState={false}>
                                            <TableBodyCell colSpan={8}>
                                                {`${Messages.Default.searchEmpty}`}
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    )}
                                </TableBody>
                            </TableWapper>
                        )}
                    </>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'닫기'}
                            HandleClick={() => CancleButtonClick()}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'저장'}
                            HandleClick={() =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        confirm: true,
                                    },
                                }))
                            }
                        />
                    </>
                }
            />
            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.memberConfirmMesure}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))

                        handleMesureSave().then()
                    }}
                />
            )}
            {pageState.modal.delete && (
                <ConfirmModal
                    Title={Messages.Default.deleteConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                delete: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                delete: false,
                            },
                        }))

                        handleDeleteItem().then()
                    }}
                />
            )}
        </>
    )
}

export default MemberMyDataHistoryModal
