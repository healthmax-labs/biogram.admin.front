import { atom, selector } from 'recoil'
import { TabInterface } from '@Type/CommonTypes'

// atom page tab current
export const AtomPageTabState = atom<TabInterface[]>({
    key: `tab/TabState`,
    default: [],
})

// select page tab
export const SelectPageTabState = selector({
    key: `tab/SelectTabState`,
    get: ({ get }) => {
        return get(AtomPageTabState)
    },
})
