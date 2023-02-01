import { atom } from 'recoil'
import { TabInterface } from '@Type/CommonTypes'

// atom page tab current
export const AtomPageTabState = atom<TabInterface>({
    key: `tab/TabState`,
    default: {
        list: [],
        close: {
            closeIndex: null,
            recoilKey: null,
        },
    },
})
