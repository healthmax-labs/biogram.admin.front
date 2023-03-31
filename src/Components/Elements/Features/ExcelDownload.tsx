import { useCallback, useLayoutEffect } from 'react'
import _ from 'lodash'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { ExcelDownloadPropsInterface } from '@CommonTypes'

const ExcelDownload = ({
    FileName,
    SheetName,
    Header,
    Data,
    MergeCells,
}: ExcelDownloadPropsInterface) => {
    const handleExcel = useCallback(async () => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet(SheetName) // sheet 이름이 My Sheet

        _.forEach(Header, header => {
            worksheet.addRow(header)
        })

        _.forEach(Data, data => {
            worksheet.addRow(data)
        })

        _.forEach(MergeCells, mergecells => {
            worksheet.mergeCells(mergecells)
        })

        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell) {
                cell.font = {
                    name: 'Arial',
                    family: 2,
                    bold: false,
                    size: 10,
                }
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                }
                if (rowNumber <= Header.length) {
                    // row.height = 18
                    cell.font = {
                        bold: true,
                    }
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'C7C7C7' },
                    }
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    }
                }
            })
        })

        worksheet.columns.forEach(function (column: any, i) {
            if (i !== 0) {
                let maxLength = 0
                column['eachCell'](
                    { includeEmpty: true },
                    function (cell: any) {
                        const columnLength = cell.value
                            ? cell.value.toString().length
                            : 10
                        if (columnLength > maxLength) {
                            maxLength = columnLength
                        }
                    }
                )
                column.width = maxLength < 20 ? 20 : maxLength + 20
            }
        })

        // 다운로드
        const mimeType = {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], mimeType)
        saveAs(blob, FileName)
    }, [Data, FileName, Header, MergeCells, SheetName])

    useLayoutEffect(() => {
        handleExcel().then()
    }, [handleExcel, Data, Header])

    return <></>
}

export default ExcelDownload
