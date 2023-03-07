import { WidthType } from '@CommonTypes'

// 공통 테이블 컬럼
import React from 'react'

// 공통 테이블 옵션
export interface OptionsInterface<T> {
    pagination?: boolean
    selectAll?: boolean
    indexKey: string
    tableType?: string | 'auto' | 'fixed'
    xcpt?: {
        option: string | 'row-null' | 'row-button'
        component?: React.FC<{ el: T }>
        buttons?: Array<{ name: string; code: string }>
    }
    bgState: boolean
}

export interface ColumnsInterface<T> {
    name: string
    key?: string
    colSpan?: number
    rowSpan?: number
    textAlign?: string | 'left' | 'center' | 'right'
    cellWidth?: string | WidthType
    component?: React.FC<{ el: T }>
}

// 공통 테이블 프롭스
export interface MainTablePropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface<T>
    Columns: Array<ColumnsInterface<T>[]>
    RowClick: (element: T) => void
    CheckedRow?: (checked: string[]) => void
    ButtonClick?: ({ code, Element }: { code: string; Element: T }) => void
    Lists: T[]
    TotalCount?: number
    PaginationClick?: ({ pageNumber }: { pageNumber: number }) => void
    CurrentPage?: number
}

// 공통 테이블 바디 프롭스
export interface MainTableBodyPropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface<T>
    Columns: Array<ColumnsInterface<T>[]>
    RowClick: (element: T) => void
    CheckedRows: string[]
    RowCheckBoxClick: ({
        checked,
        Element,
    }: {
        checked: boolean
        Element: T
    }) => void
    ButtonClick?: ({ code, Element }: { code: string; Element: T }) => void
    Lists: T[]
}
