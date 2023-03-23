import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { VaryLineChartStyle } from '@Style/Elements/ChartStyle'

const {
    LineChart: { Container, Wapper },
} = VaryLineChartStyle

const VaryLineChart = ({
    ChartID,
    Data1,
    Data2,
}: {
    ChartID: string
    Data1: Array<{ date: string; value: number }>
    Data2: Array<{ date: string; value: number }>
}) => {
    useLayoutEffect(() => {
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

        const xAxis2 = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                visible: false,
                renderer: am5xy.AxisRendererX.new(root, {}),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        )

        const yRenderer = yAxis.get('renderer')
        yRenderer.labels.template.setAll({
            fill: am5.color(0x047481),
            fontSize: '0.6em',
        })

        const yAxis2 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    opposite: true,
                }),
            })
        )

        const yRenderer2 = yAxis2.get('renderer')
        yRenderer2.labels.template.setAll({
            fill: am5.color(0x0000000),
            fontSize: '0.6em',
        })
        yRenderer2.grid.template.set('visible', false)

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color('#092f98'),
            })
        )

        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
            labelText: '{valueY}',
        })
        tooltip.get('background')?.setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0x047481),
            strokeOpacity: 0.8,
        })
        tooltip.label.setAll({
            fill: am5.color(0x047481),
        })
        series.set('tooltip', tooltip)
        const series2 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis2,
                yAxis: yAxis2,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color(0x0000000),
            })
        )
        const tooltip2 = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
            labelText: '{valueY}',
        })
        tooltip2.get('background')?.setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0x0000000),
            strokeOpacity: 0.8,
        })
        tooltip2.label.setAll({
            fill: am5.color(0x0000000),
        })
        series2.set('tooltip', tooltip2)
        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set(
        //     'scrollbarX',
        //     am5.Scrollbar.new(root, {
        //         orientation: 'horizontal',
        //     })
        // )

        // Set data
        // const data = generateDatas(30)
        series.data.setAll(Data1)
        xAxis.data.setAll(Data1)

        // value = 10000
        // const data2 = generateDatas(30)
        series2.data.setAll(Data2)
        xAxis2.data.setAll(Data2)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000)
        chart.appear(1000, 100)

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Wapper id={ChartID}></Wapper>
        </Container>
    )
}

export default VaryLineChart
