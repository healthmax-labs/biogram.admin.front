import { VaryLineChartMember } from '@Elements'
import { dateInsertHypen, generateRandomString, getNowYearMonth } from '@Helper'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { useEffect, useState } from 'react'
import _ from 'lodash'

const {
    HeaderCell,
    HeaderRow,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHeader,
    TableWapper,
} = CommonListTableStyle

const initializeState = {
    first: {
        date: getNowYearMonth(),
        value: 0,
    },
    last: {
        date: getNowYearMonth(),
        value: 0,
    },
    result: {
        date: getNowYearMonth(),
        value: 0,
    },
}

const ConsultDetailPartMyGraphChartCard = ({
    Title,
    ChartData,
}: {
    Title?: string
    ChartData: Array<{ date: string; value: number }>
}) => {
    const [pageState, setPageState] = useState<{
        first: {
            date: string
            value: number
        }

        last: {
            date: string
            value: number
        }
        result: {
            date: string
            value: number
        }
    }>(initializeState)

    useEffect(() => {
        const funcSetState = () => {
            const first = _.last(ChartData) ? _.last(ChartData) : null
            const last = _.first(ChartData) ? _.first(ChartData) : null

            if (first && last) {
                const fyear = first.date.substring(0, 4)
                const fmonth = first.date.substring(4, 6)
                const fday = first.date.substring(6, 8)

                const lyear = last.date.substring(0, 4)
                const lmonth = last.date.substring(4, 6)
                const lday = last.date.substring(6, 8)

                const fdate = new Date(
                    Number(fyear),
                    Number(fmonth),
                    Number(fday)
                )
                const ldate = new Date(
                    Number(lyear),
                    Number(lmonth),
                    Number(lday)
                )

                const step1 = ldate.getTime() - fdate.getTime()
                const diffDay = step1 / (1000 * 60 * 60 * 24)
                const diffData = first.value - last.value

                setPageState(prevState => ({
                    ...prevState,
                    first: first,
                    last: last,
                    result: {
                        date: String(diffDay),
                        value: parseFloat(diffData.toFixed(1)),
                    },
                }))
            }
        }

        if (ChartData && ChartData.length > 0) {
            funcSetState()
        }
    }, [ChartData])

    return (
        <div className="flex w-full border py-2">
            <div className="flex w-2/12 items-center justify-center">
                <div className="text-xs text-gray-500">{`${Title}`}</div>
            </div>
            <div className="flex w-7/12 items-center justify-center">
                <div className="w-full">
                    {ChartData.length > 0 && (
                        <VaryLineChartMember
                            ChartID={generateRandomString(10)}
                            Data1={ChartData}
                            Data2={[]}
                        />
                    )}
                </div>
            </div>
            <div className="flex w-3/12 items-center justify-center px-2">
                <div className="w-full">
                    <TableWapper>
                        <TableHeader>
                            <HeaderRow>
                                <HeaderCell Border={true}>전</HeaderCell>
                                <HeaderCell Border={true}>후</HeaderCell>
                                <HeaderCell Border={true}>경과</HeaderCell>
                            </HeaderRow>
                        </TableHeader>
                        <TableBody HeightLimit={false} Scroll={false}>
                            <TableBodyRow BgState={false}>
                                <TableBodyCell
                                    Border={true}>{`${dateInsertHypen(
                                    pageState.first.date
                                )}`}</TableBodyCell>
                                <TableBodyCell
                                    Border={true}>{`${dateInsertHypen(
                                    pageState.last.date
                                )}`}</TableBodyCell>
                                <TableBodyCell Border={true}>
                                    {`${pageState.result.date}`}&nbsp;일
                                </TableBodyCell>
                            </TableBodyRow>
                            <TableBodyRow BgState={false}>
                                <TableBodyCell
                                    Border={
                                        true
                                    }>{`${pageState.first.value}`}</TableBodyCell>
                                <TableBodyCell
                                    Border={
                                        true
                                    }>{`${pageState.last.value}`}</TableBodyCell>
                                <TableBodyCell
                                    Border={
                                        true
                                    }>{`${pageState.result.value}`}</TableBodyCell>
                            </TableBodyRow>
                        </TableBody>
                    </TableWapper>
                </div>
            </div>
        </div>
    )
}

export default ConsultDetailPartMyGraphChartCard
