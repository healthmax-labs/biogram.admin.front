// 공통 테이블 컬럼
import React from 'react'

// 공통 테이블 옵션
export interface OptionsInterface {
    selectAll?: boolean
}

export interface ColumnsInterface<T> {
    name: string
    key: string
    component?: React.FC<{ el: T }>
}

// 공통 테이블 프롭스
export interface TablePropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<T>[]
    RowClick: (element: T) => void
    Lists: T[]
}
