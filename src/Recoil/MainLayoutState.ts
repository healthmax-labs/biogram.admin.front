import { atom, selector } from 'recoil'

// atop post current
export const AtomMainLayoutState = atom<{
    leftMenuShow: boolean
    OutletLoading: boolean
    alertModel: {
        state: boolean
        message: string
    }
}>({
    key: `layout/LayoutState`,
    default: {
        leftMenuShow: true,
        OutletLoading: false,
        alertModel: {
            state: false,
            message: ``,
        },
    },
})

// select post
export const SelectMainLayoutState = selector({
    key: `layout/SelectLayoutState`,
    get: ({ get }) => {
        const { leftMenuShow, alertModel, OutletLoading } =
            get(AtomMainLayoutState)

        return {
            leftMenuShow,
            alertModel,
            OutletLoading,
        }
    },
})
