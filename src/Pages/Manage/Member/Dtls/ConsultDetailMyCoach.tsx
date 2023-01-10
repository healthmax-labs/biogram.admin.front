import { ElementLoading, VaryButton, VaryDatepickerInput } from '@Elements'
import {
    changeDatePickerDate,
    dateInsertHypen,
    gmtTimeToTimeObject,
} from '@Helper'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect } from 'react'
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
            setCoachState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

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
            <Detail.MyCoach.SearchWapper>
                <Detail.MyCoach.SearchBox>
                    <Detail.MyCoach.SearchItem>
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
                    </Detail.MyCoach.SearchItem>
                    <Detail.MyCoach.SearchItem>
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'조회'}
                            HandleClick={() => handleGetData().then()}
                        />
                    </Detail.MyCoach.SearchItem>
                </Detail.MyCoach.SearchBox>
            </Detail.MyCoach.SearchWapper>

            {coachState.status === 'loading' ? (
                <Detail.MyCoach.LoadingBox>
                    <ElementLoading FullScreen={false} />
                </Detail.MyCoach.LoadingBox>
            ) : (
                <Detail.MyCoach.TableBox>
                    <Detail.MyCoach.Table.Table>
                        <Detail.MyCoach.Table.Thead>
                            <Detail.MyCoach.Table.TheadRow>
                                <Detail.MyCoach.Table.TheadCell></Detail.MyCoach.Table.TheadCell>
                                <Detail.MyCoach.Table.TheadCell>
                                    섭취 칼로리
                                </Detail.MyCoach.Table.TheadCell>
                                <Detail.MyCoach.Table.TheadCell>
                                    소비 칼로리
                                </Detail.MyCoach.Table.TheadCell>
                            </Detail.MyCoach.Table.TheadRow>
                            <Detail.MyCoach.Table.TheadRow>
                                <Detail.MyCoach.Table.TheadYCell>
                                    권장 칼로리
                                </Detail.MyCoach.Table.TheadYCell>
                                <Detail.MyCoach.Table.TheadYCell>
                                    {coachState.data &&
                                        coachState.data.MEAL_CALORIE_RECMND}
                                </Detail.MyCoach.Table.TheadYCell>
                                <Detail.MyCoach.Table.TheadYCell>
                                    {coachState.data &&
                                        coachState.data.CNSMP_CALORIE_GOAL}
                                </Detail.MyCoach.Table.TheadYCell>
                            </Detail.MyCoach.Table.TheadRow>
                        </Detail.MyCoach.Table.Thead>
                        <Detail.MyCoach.Table.Body>
                            {coachState.data &&
                                coachState.data.CALORIE_7_DAY_LIST &&
                                coachState.data.CALORIE_7_DAY_LIST.length > 0 &&
                                coachState.data.CALORIE_7_DAY_LIST.map(
                                    (el, index) => {
                                        return (
                                            <Detail.MyCoach.Table.Row
                                                key={`consult-detail-my-coach-table-row-item-${index}`}>
                                                <Detail.MyCoach.Table.Cell>
                                                    {dateInsertHypen(el.DATE)}
                                                </Detail.MyCoach.Table.Cell>
                                                <Detail.MyCoach.Table.Cell>
                                                    {el.MEAL_CALORIE}
                                                </Detail.MyCoach.Table.Cell>
                                                <Detail.MyCoach.Table.Cell>
                                                    {el.CNSMP_CALORIE}
                                                </Detail.MyCoach.Table.Cell>
                                            </Detail.MyCoach.Table.Row>
                                        )
                                    }
                                )}
                        </Detail.MyCoach.Table.Body>
                        <Detail.MyCoach.Table.TFoot>
                            <Detail.MyCoach.Table.TFootRow>
                                <Detail.MyCoach.Table.TFootCell>
                                    평균
                                </Detail.MyCoach.Table.TFootCell>
                                <Detail.MyCoach.Table.TFootCell>
                                    {coachState.data &&
                                        coachState.data.MEAL_CALORIE_AVG}
                                </Detail.MyCoach.Table.TFootCell>
                                <Detail.MyCoach.Table.TFootCell>
                                    {coachState.data &&
                                        coachState.data.CNSMP_CALORIE_AVG}
                                </Detail.MyCoach.Table.TFootCell>
                            </Detail.MyCoach.Table.TFootRow>
                        </Detail.MyCoach.Table.TFoot>
                    </Detail.MyCoach.Table.Table>
                </Detail.MyCoach.TableBox>
            )}
        </Detail.Container>
    )
}

export default ConsultDetailMyCoach
