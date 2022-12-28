import { DefaultManageButton, VaryDatepickerInput } from '@Elements'
import {
    changeDatePickerDate,
    dateInsertHypen,
    gmtTimeToTimeObject,
} from '@Helper'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ConsultMyCoachState } from '@Recoil/MemberPagesState'
import { getMngMyCoach } from '@Service/MemberService'

const { Detail } = ConsultDetailStyle

const ConsultDetailMyCoach = () => {
    const params = useParams<{
        memNo: string | undefined
        category: string | undefined
    }>()

    const [coachState, setCoachState] = useRecoilState(ConsultMyCoachState)

    const handleGetData = useCallback(async () => {
        if (coachState.memNo && coachState.search.searchDate) {
            const { status, payload } = await getMngMyCoach({
                memNo: coachState.memNo,
                searchDate: coachState.search.searchDate,
            })

            if (status) {
                setCoachState(prevState => ({
                    ...prevState,
                    status: 'success',
                    data: payload,
                }))
            } else {
                setCoachState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    data: null,
                }))
            }
        }
    }, [coachState.memNo, coachState.search.searchDate, setCoachState])

    useEffect(() => {
        const pageStart = () => {
            const { memNo } = params

            if (memNo) {
                setCoachState(prevState => ({
                    ...prevState,
                    memNo: Number(memNo),
                }))

                handleGetData().then()
            }
        }

        if (coachState.status === 'idle') {
            pageStart()
        }
    }, [coachState.status, handleGetData, params, setCoachState])

    return (
        <Detail.Container>
            <div className="flex flex-nowrap w-full border">
                <div className="flex py-2 items-center w-full justify-end">
                    <div className="flex py-2">
                        <VaryDatepickerInput
                            Value={changeDatePickerDate(
                                coachState.search.searchDate
                            )}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setCoachState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        searchDate: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'조회'}
                            ButtonClick={() => handleGetData().then()}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <Detail.RawAge.Table.Table>
                    <Detail.RawAge.Table.Thead>
                        <Detail.RawAge.Table.TheadRow>
                            <Detail.RawAge.Table.TheadCell></Detail.RawAge.Table.TheadCell>
                            <Detail.RawAge.Table.TheadCell>
                                섭취 칼로리
                            </Detail.RawAge.Table.TheadCell>
                            <Detail.RawAge.Table.TheadCell>
                                소비 칼로리
                            </Detail.RawAge.Table.TheadCell>
                        </Detail.RawAge.Table.TheadRow>
                        <Detail.RawAge.Table.TheadRow>
                            <Detail.RawAge.Table.TheadYCell>
                                권장 칼로리
                            </Detail.RawAge.Table.TheadYCell>
                            <Detail.RawAge.Table.TheadYCell>
                                {coachState.data &&
                                    coachState.data.MEAL_CALORIE_RECMND}
                            </Detail.RawAge.Table.TheadYCell>
                            <Detail.RawAge.Table.TheadYCell>
                                {coachState.data &&
                                    coachState.data.CNSMP_CALORIE_GOAL}
                            </Detail.RawAge.Table.TheadYCell>
                        </Detail.RawAge.Table.TheadRow>
                    </Detail.RawAge.Table.Thead>
                    <Detail.RawAge.Table.Body>
                        {coachState.data &&
                            coachState.data.CALORIE_7_DAY_LIST &&
                            coachState.data.CALORIE_7_DAY_LIST.length > 0 &&
                            coachState.data.CALORIE_7_DAY_LIST.map(
                                (el, index) => {
                                    return (
                                        <Detail.RawAge.Table.Row
                                            key={`consult-detail-my-coach-table-row-item-${index}`}>
                                            <Detail.RawAge.Table.Cell>
                                                {dateInsertHypen(el.DATE)}
                                            </Detail.RawAge.Table.Cell>
                                            <Detail.RawAge.Table.Cell>
                                                {el.MEAL_CALORIE}
                                            </Detail.RawAge.Table.Cell>
                                            <Detail.RawAge.Table.Cell>
                                                {el.CNSMP_CALORIE}
                                            </Detail.RawAge.Table.Cell>
                                        </Detail.RawAge.Table.Row>
                                    )
                                }
                            )}
                    </Detail.RawAge.Table.Body>
                    <Detail.RawAge.Table.TFoot>
                        <Detail.RawAge.Table.TFootRow>
                            <Detail.RawAge.Table.TFootCell>
                                평균
                            </Detail.RawAge.Table.TFootCell>
                            <Detail.RawAge.Table.TFootCell>
                                {coachState.data &&
                                    coachState.data.MEAL_CALORIE_AVG}
                            </Detail.RawAge.Table.TFootCell>
                            <Detail.RawAge.Table.TFootCell>
                                {coachState.data &&
                                    coachState.data.CNSMP_CALORIE_AVG}
                            </Detail.RawAge.Table.TFootCell>
                        </Detail.RawAge.Table.TFootRow>
                    </Detail.RawAge.Table.TFoot>
                </Detail.RawAge.Table.Table>
            </div>
        </Detail.Container>
    )
}

export default ConsultDetailMyCoach
