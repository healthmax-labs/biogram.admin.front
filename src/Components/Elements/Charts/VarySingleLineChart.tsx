import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { VaryLineChartStyle } from '@Style/Elements/ChartStyle'

const {
    LineChart: { Container, Wapper },
} = VaryLineChartStyle

const VarySingleLineChart = ({
    ChartID,
    Data1,
    Data1Color = `#008080`,
}: {
    ChartID: string
    Data1: Array<{ date: string; value: number }>
    Data1Color?: string
}) => {
    useLayoutEffect(() => {
        am5.addLicense('AM5C488111')
        const root = am5.Root.new(ChartID)

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                pinchZoomX: false,
            })
        )

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                behavior: 'none',
            })
        )
        cursor.lineY.set('visible', false)

        // Generate random data
        // const value = 100

        // function generateData(i: any) {
        //     value = Math.round(Math.random() * 10 - 5 + value)
        //     return {
        //         date: i,
        //         value: value,
        //     }
        // }

        // function generateDatas(count: any) {
        //     const data = []
        //     for (let i = 0; i < count; ++i) {
        //         data.push(generateData(i))
        //     }
        //     return data
        // }

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                renderer: am5xy.AxisRendererX.new(root, {}),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const xRenderer = xAxis.get('renderer')
        xRenderer.labels.template.setAll({
            fill: am5.color(0x0000000),
            fontSize: '0.6em',
        })
        xRenderer.grid.template.set('visible', false)

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        )

        const yRenderer = yAxis.get('renderer')
        yRenderer.labels.template.setAll({
            fill: am5.color(0x0000000),
            fontSize: '0.6em',
        })

        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color(Data1Color),
            })
        )

        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
            labelText: '{date}\n{value}',
        })
        tooltip.get('background')?.setAll({
            fill: am5.color(Data1Color),
            fillOpacity: 0.8,
            stroke: am5.color(Data1Color),
            strokeOpacity: 0.8,
        })
        tooltip.get('tooltip')?.label.set('text', '{valueX}: {valueY}')
        tooltip.label.setAll({
            fill: am5.color(0xffffff),
        })
        series.set('tooltip', tooltip)

        series.data.setAll(Data1)
        xAxis.data.setAll(Data1)

        series.appear(50)
        chart.appear(50, 100)

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Wapper id={ChartID}></Wapper>
        </Container>
    )
}

export default VarySingleLineChart
