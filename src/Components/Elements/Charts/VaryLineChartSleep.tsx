import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { VaryLineChartSleepStyle } from '@Style/Elements/ChartStyle'

const {
    LineChart: { Container, Wapper },
} = VaryLineChartSleepStyle

const VaryLineChartSleep = ({
    ChartID,
    Data,
}: {
    ChartID: string
    Data: Array<{
        date: string
        start: number
        end: number
        tooltip: string
    }>
}) => {
    useLayoutEffect(() => {
        am5.addLicense('AM5C488111')
        const root = am5.Root.new(ChartID)

        for (let i = 0; i < Data.length; i++) {
            Data[i].tooltip =
                getTime(Data[i].start) +
                '~' +
                getTime(Data[i].end) +
                '\n' +
                Data[i].date
        }
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
        cursor.lineX.set('visible', false)

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'date',
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 15,
                }),
            })
        )

        const xRenderer = xAxis.get('renderer')
        xRenderer.labels.template.setAll({
            fill: am5.color('#aeaeaf'),
            fontSize: '0.6em',
        })
        xRenderer.grid.template.set('visible', true)
        xRenderer.grid.template.setAll({
            stroke: am5.color('#aeaeaf'),
        })
        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 720,
                max: 2160,
                strictMinMax: true,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        )

        const yRenderer = yAxis.get('renderer')
        yRenderer.grid.template.setAll({
            stroke: am5.color('#aeaeaf'),
        })

        yRenderer.labels.template.setAll({
            fill: am5.color('#aeaeaf'),
            fontSize: '0.6em',
        })

        yRenderer.labels.template.adapters.add('text', function (text) {
            const str_hour = getTime(text)
            return str_hour
        })

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Series',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'end',
                openValueYField: 'start',
                categoryXField: 'date',
                fill: am5.color('#4f81bd'),
                tooltipText: '{tooltip}',
            })
        )

        series.columns.template.setAll({
            fillOpacity: 1,
            strokeWidth: 0,
            width: 5,
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            cornerRadiusBL: 5,
            cornerRadiusBR: 5,
        })

        // 기준값 생성
        const rangeDataItem = yAxis.makeDataItem({
            value: 1200,
            endValue: 1800,
        })

        // Create a range
        yAxis.createAxisRange(rangeDataItem)
        rangeDataItem.get('grid')?.set('visible', false)
        rangeDataItem.get('axisFill')?.setAll({
            fill: am5.color('#cfeaf5'),
            fillOpacity: 0.2,
            visible: true,
        })

        // 툴팁
        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            getLabelFillFromSprite: false,
        })
        tooltip.get('background')?.setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 1,
            stroke: am5.color('#092f98'),
            strokeOpacity: 0.8,
        })
        tooltip.label.setAll({
            fill: am5.color('#092f98'),
            fontSize: '0.8em',
            textAlign: 'center',
        })
        series.set('tooltip', tooltip)

        // Set data
        // const data = generateDatas(30)
        series.data.setAll(Data)
        xAxis.data.setAll(Data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000)
        chart.appear(1000, 100)

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps

        function getTime(text: any) {
            if (text == undefined) return ''
            text = typeof text == 'string' ? text : String(text)
            const texttonum = Number(text?.replace(',', ''))
            let hour = Math.floor(texttonum / 60)

            const min = texttonum - hour * 60

            if (hour > 24) hour -= 24
            const str_hour = hour.toString() + ':' + min

            return str_hour
        }

        return () => {
            root.dispose()
        }
    })

    return (
        <Container>
            <Wapper id={ChartID}></Wapper>
        </Container>
    )
}

export default VaryLineChartSleep
