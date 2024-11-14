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
    SpliceColumn,
    SpliceColumns,
    SpliceMergeCells,
    CellWidth,
}: ExcelDownloadPropsInterface) => {
    const handleExcel = useCallback(async () => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet(SheetName) // sheet 이름

        _.forEach(Header, header => {
            worksheet.addRow(header)
        })

        _.forEach(Data, data => {
            worksheet.addRow(data)
        })

        if (SpliceColumn && SpliceColumns && SpliceColumns.length > 0) {
            _.forEach(SpliceColumns, s => {
                worksheet.spliceColumns(s.start, s.end)
            })
        }

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

        worksheet.columns.forEach(function (column: any) {
            let maxLength = 0
            column['eachCell']({ includeEmpty: true }, function (cell: any) {
                const columnLength = cell.value
                    ? cell.value.toString().length
                    : 20
                if (columnLength > maxLength) {
                    maxLength = columnLength
                }
            })

            if (CellWidth) {
                column.width = CellWidth
            } else {
                column.width = maxLength < 20 ? 20 : maxLength + 20
            }
        })

        if (
            SpliceColumn &&
            SpliceColumns &&
            SpliceColumns.length > 0 &&
            SpliceMergeCells &&
            SpliceMergeCells.length > 0
        ) {
            _.forEach(SpliceMergeCells, mergecells => {
                worksheet.mergeCells(mergecells)
            })
        } else {
            _.forEach(MergeCells, mergecells => {
                worksheet.mergeCells(mergecells)
            })
        }

        // 다운로드
        const mimeType = {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], mimeType)
        saveAs(blob, FileName)
    }, [
        CellWidth,
        Data,
        FileName,
        Header,
        MergeCells,
        SheetName,
        SpliceColumn,
        SpliceColumns,
        SpliceMergeCells,
    ])

    useLayoutEffect(() => {
        handleExcel().then()
    }, [handleExcel])

    return <></>
}

export default ExcelDownload
