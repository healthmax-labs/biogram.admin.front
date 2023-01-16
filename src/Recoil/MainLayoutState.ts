import { atom, selector } from 'recoil'
import { MainLayoutThemeType } from '@CommonTypes'

// atop post current
export const AtomMainLayoutState = atom<{
    leftMenuShow: boolean
    OutletLoading: boolean
    alertModel: {
        state: boolean
        message: string
    }
    Theme: MainLayoutThemeType
}>({
    key: `layout/LayoutState`,
    default: {
        leftMenuShow: true,
        OutletLoading: false,
        alertModel: {
            state: false,
            message: ``,
        },
        Theme: ``,
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
