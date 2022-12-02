import React, { useEffect, useState } from 'react'
import {
    DefaultManageButton,
    VaryDatepickerInput,
    VaryInput,
    VaryModal,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import { MybodyManageScoreItemInterface } from '@CommonTypes'
import Codes from '@Codes'

const initializeState = {
    search: {
        startDate: null,
        endDate: null,
    },
    list: [],
    loading: false,
    title: ``,
}

const MemberMyDataInputModal = ({
    MemberNo,
    CancleButtonClick,
}: {
    MemberNo: number
    CancleButtonClick: () => void
}) => {
    const [, setPageState] = useState<{
        search: {
            startDate: string | null
            endDate: string | null
        }
        list: MybodyManageScoreItemInterface[]
        loading: boolean
        title: string
    }>(initializeState)

    useEffect(() => {
        const funcSetState = () => {
            console.debug(Codes.myData, MemberNo)
        }

        funcSetState()
    }, [MemberNo])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <>
                        <div className="py-2 text-left text-2xl">
                            마이데이터 수기입력
                        </div>
                        <div className="flex flex-nowrap">
                            <div className="flex py-2">
                                <VaryDatepickerInput
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                startDate: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                            },
                                        }))
                                    }}
                                />
                                ~
                                <VaryDatepickerInput
                                    DateFormat={'HH:II:SS'}
                                    CallBackReturn={e => {
                                        const dateObj = gmtTimeToTimeObject(e)
                                        setPageState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                endDate: `${dateObj.year}${dateObj.month}${dateObj.day}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 border">
                            {Codes.myData.map((el, index) => {
                                return (
                                    <table
                                        className="table-fixed border"
                                        key={`member-mydata-input-modal-table-${index}`}>
                                        <tbody>
                                            {el.list.map((e, i) => {
                                                return (
                                                    <tr
                                                        className="border max-h-8"
                                                        key={`member-mydata-input-modal-table-row-item-${index}-${i}`}>
                                                        {i === 0 && (
                                                            <td
                                                                className="border w-1/4 text-xs"
                                                                rowSpan={
                                                                    el.list
                                                                        .length
                                                                }>
                                                                {el.name}
                                                            </td>
                                                        )}

                                                        <td className="border w-1/4 text-xs max-h-8">
                                                            {e.name}
                                                        </td>
                                                        <td className="border w-2/4 max-h-8">
                                                            <VaryInput
                                                                Bg={'gray2'}
                                                                Value={``}
                                                                Placeholder={
                                                                    e.name
                                                                }
                                                                HandleOnChange={() =>
                                                                    console.debug(
                                                                        '1'
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )
                            })}
                        </div>
                    </>
                }
                Buttons={
                    <>
                        <DefaultManageButton
                            ButtonName={'최소'}
                            ButtonClick={() => CancleButtonClick()}
                        />
                        <DefaultManageButton
                            ButtonName={'저장'}
                            ButtonClick={() => console.debug('ButtonClick')}
                        />
                    </>
                }
            />
        </>
    )
}

export default MemberMyDataInputModal
