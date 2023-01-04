// 공통 테이블 컬럼
import React from 'react'

// 공통 테이블 옵션
export interface OptionsInterface {
    selectAll?: boolean
    indexKey: string
}

export interface ColumnsInterface<T> {
    name: string
    key: string
    component?: React.FC<{ el: T }>
}

// 공통 테이블 프롭스
export interface MainTablePropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<T>[]
    RowClick: (element: T) => void
    CheckedRow?: (checked: string[]) => void
    Lists: T[]
}

// 공통 테이블 바디 프롭스
export interface MainTableBodyPropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<T>[]
    RowClick: (element: T) => void
    CheckedRows: string[]
    RowCheckBoxClick: ({
        checked,
        Element,
    }: {
        checked: boolean
        Element: T
    }) => void
    Lists: T[]
}
