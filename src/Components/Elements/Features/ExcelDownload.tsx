import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { useCallback, useEffect } from 'react'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import _ from 'lodash'

const ExcelDownload = ({
    FileName,
    SheetName,
    Header,
    WsCols,
    Data,
}: ExcelDownloadPropsInterface) => {
    const excelFileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const excelFileExtension = '.xlsx'
    const excelFileName = FileName

    const excelDownload = useCallback(() => {
        const ws = XLSX.utils.aoa_to_sheet(Header)
        _.forEach(Data, (e: any) => {
            XLSX.utils.sheet_add_aoa(ws, [e], {
                origin: -1,
            })
            ws['!cols'] = WsCols
        })

        const wb: any = {
            Sheets: { [SheetName]: ws },
            SheetNames: [`${SheetName}`],
        }
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const excelFile = new Blob([excelButter], { type: excelFileType })
        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension)
    }, [Data, Header, SheetName, WsCols, excelFileName])

    useEffect(() => {
        excelDownload()
    }, [excelDownload])

    return <></>
}

export default ExcelDownload
