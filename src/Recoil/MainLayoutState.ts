import { atom, selector } from 'recoil'

// atop post current
export const AtomMainLayoutState = atom<{
    leftMenuShow: boolean
}>({
    key: `layout/LayoutState`,
    default: {
        leftMenuShow: true,
    },
})

// select post
export const SelectMainLayoutState = selector({
    key: `layout/SelectLayoutState`,
    get: ({ get }) => {
        const { leftMenuShow } = get(AtomMainLayoutState)

        return {
            leftMenuShow,
        }
    },
})
