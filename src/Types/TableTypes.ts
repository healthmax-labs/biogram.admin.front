// 공통 테이블 컬럼
export interface ColumnsInterface {
    name: string
    key: string
}

// 공통 테이블 옵션
export interface OptionsInterface {
    selectAll?: boolean
}

// 공통 테이블 프롭스
export interface TablePropsInterface<T> {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface[]
    RowClick: (element: T) => void
    Lists: T[]
}
