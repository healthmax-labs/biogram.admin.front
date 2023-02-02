import React, { useEffect, useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { AutoAlertModal, MainTable, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    NonMeasureTableConfig,
    NonMeasureTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { useNavigate } from 'react-router-dom'

const { Container, RowWapper, ButtonBox } = ContentsStyle
const initializeState = {
    modal: {
        autoAlert: {
            title: ``,
            state: false,
        },
    },
}

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<NonMeasureTableListItemInterface>
    Columns: Array<ColumnsInterface<NonMeasureTableListItemInterface>[]>
    Lists: NonMeasureTableListItemInterface[]
}

const NonMeasureListTable = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            autoAlert: {
                title: string
                state: boolean
            }
        }
    }>(initializeState)

    const navigate = useNavigate()
    const listState = useRecoilValue(NonMeasureListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        NonMeasureTableConfig
    )

    const handleRowClick = (element: NonMeasureTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${element.MBER_NO}/mydata`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.NOT_MESURE_NTCN_INFO_LIST,
        }))
    }, [listState.list.NOT_MESURE_NTCN_INFO_LIST, listState.status])

    return (
        <Container>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName="자동알림"
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    autoAlert: {
                                        title: '12334',
                                        state: true,
                                    },
                                },
                            }))
                        }
                    />
                </ButtonBox>
                <MainTable {...tableOptions} RowClick={handleRowClick} />
            </RowWapper>
            {pageState.modal.autoAlert.state && (
                <AutoAlertModal
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                autoAlert: {
                                    title: '',
                                    state: false,
                                },
                            },
                        }))
                    }}
                    CallBackResturn={() => {
                        //
                    }}
                />
            )}
        </Container>
    )
}

export default NonMeasureListTable
