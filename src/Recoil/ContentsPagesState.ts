import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    MagazineListItemInterface,
    UhealthZoneListItemInterface,
} from '@Type/ContentsTypes'

// 매거진 리스트 조회
interface MagazineSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        search_Key: string | null
    }
    magazineList: {
        MISN_MAGAZINE_LIST: MagazineListItemInterface[]
    }
}

export const MagazineListState = atom<MagazineSearchListInterface>({
    key: `contentsPage/magazineList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            search_Key: null,
        },
        magazineList: {
            MISN_MAGAZINE_LIST: [],
        },
    },
})

// 바이오그램 존 리스트 조회
interface UhealthzoneSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        search_Key: string | null
    }
    uhealthzoneList: {
        UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
    }
}

export const UhealthzoneListState = atom<UhealthzoneSearchListInterface>({
    key: `contentsPage/uhealthzoneList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            search_Key: null,
        },
        uhealthzoneList: {
            UHEALTH_ZONE_LIST: [],
        },
    },
})
