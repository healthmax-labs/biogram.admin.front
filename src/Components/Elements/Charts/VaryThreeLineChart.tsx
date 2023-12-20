import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { VaryLineChartStyle } from '@Style/Elements/ChartStyle'

const {
    LineChart: { Container, Wapper },
} = VaryLineChartStyle

/*
기존 VaryLineChart 에서 라인을 한개 추가 해야 하는데 너무 지저분해져서 3개 라인 차트 컴포넌트를 하나더 추가
 */
const VaryThreeLineChart = ({
    ChartID,
    Data1,
    Data1Color = `#FF0000`,
    Data2,
    Data2Color = `#0000FF`,
    Data3,
    Data3Color = `#008080`,
}: {
    ChartID: string
    Data1: Array<{ date: string; value: number }>
    Data1Color?: string
    Data2: Array<{ date: string; value: number }>
    Data2Color?: string
    Data3: Array<{ date: string; value: number | null }>
    Data3Color?: string
}) => {
    useLayoutEffect(() => {
        am5.addLicense('AM5C488111')
        const root = am5.Root.new(ChartID)

        root.setThemes([am5themes_Animated.new(root)])

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                pinchZoomX: false,
            })
        )

        const cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                behavior: 'none',
            })
        )
        cursor.lineY.set('visible', false)

        const xAxis1 = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                renderer: am5xy.AxisRendererX.new(root, {}),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const xRenderer1 = xAxis1.get('renderer')
        xRenderer1.labels.template.setAll({
            fill: am5.color(0x0000000),
            fontSize: '0.6em',
        })
        xRenderer1.grid.template.set('visible', false)

        const xAxis2 = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                visible: false,
                renderer: am5xy.AxisRendererX.new(root, {}),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const xAxis3 = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                visible: false,
                renderer: am5xy.AxisRendererX.new(root, {}),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const yAxis1 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        )

        const yRenderer1 = yAxis1.get('renderer')
        yRenderer1.labels.template.setAll({
            fill: am5.color(Data1Color),
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
            fill: am5.color(Data2Color),
            fontSize: '0.6em',
        })
        yRenderer2.grid.template.set('visible', false)

        const yAxis3 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    opposite: true,
                }),
            })
        )

        const yRenderer3 = yAxis3.get('renderer')
        yRenderer2.labels.template.setAll({
            fill: am5.color(Data2Color),
            fontSize: '0.6em',
        })
        yRenderer3.labels.template.setAll({
            fill: am5.color(Data3Color),
            fontSize: '0.6em',
        })

        const series1 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis1,
                yAxis: yAxis1,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color(Data1Color),
            })
        )

        const series2 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis2,
                yAxis: yAxis2,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color(Data2Color),
            })
        )
        const series3 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis3,
                yAxis: yAxis3,
                valueYField: 'value',
                categoryXField: 'date',
                stroke: am5.color(Data3Color),
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
        series1.set('tooltip', tooltip)

        const tooltip2 = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
            labelText: '{date}\n{value}',
        })
        tooltip2.get('background')?.setAll({
            fill: am5.color(Data2Color),
            fillOpacity: 0.8,
            stroke: am5.color(Data2Color),
            strokeOpacity: 0.8,
        })
        tooltip2.get('tooltip')?.label.set('text', '{valueX}: {valueY}')
        tooltip2.label.setAll({
            fill: am5.color(0xffffff),
        })
        series2.set('tooltip', tooltip2)

        const tooltip3 = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
            labelText: '{date}\n{value}',
        })
        tooltip3.get('background')?.setAll({
            fill: am5.color(Data3Color),
            fillOpacity: 0.8,
            stroke: am5.color(Data3Color),
            strokeOpacity: 0.8,
        })
        tooltip3.get('tooltip')?.label.set('text', '{valueX}: {valueY}')
        tooltip3.label.setAll({
            fill: am5.color(0xffffff),
        })
        series3.set('tooltip', tooltip3)

        // Set data
        series1.data.setAll(Data1)
        xAxis1.data.setAll(Data1)

        series2.data.setAll(Data2)
        xAxis2.data.setAll(Data2)

        series3.data.setAll(Data3)
        xAxis3.data.setAll(Data3)

        series1.appear(1000)
        // series2.appear(1000)
        // series3.appear(1000)
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

export default VaryThreeLineChart
