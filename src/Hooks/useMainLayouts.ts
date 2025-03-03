import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useCallback } from 'react'
import { MainLayoutThemeType } from '@CommonTypes'

export default function useMainLayouts() {
    const { leftMenuShow, alertModel, OutletLoading, Theme } =
        useRecoilValue(AtomMainLayoutState)
    const setMainLayoutState = useSetRecoilState(AtomMainLayoutState)

    // OutletLoading
    const handleOutletLoading = useCallback(
        (state: boolean) => {
            setMainLayoutState(prevState => ({
                ...prevState,
                OutletLoading: state,
            }))
        },
        [setMainLayoutState]
    )

    // 왼쪽 메뉴 상태 처리
    const handleLeftMenuShow = useCallback(() => {
        setMainLayoutState(prevState => ({
            ...prevState,
            leftMenuShow: !prevState.leftMenuShow,
        }))
    }, [setMainLayoutState])

    // 메인 얼럿 처리.
    const handlMainAlert = useCallback(
        ({ state, message }: { state: boolean; message: string }) => {
            setMainLayoutState(prevState => ({
                ...prevState,
                alertModel: {
                    state: state,
                    message: message,
                },
            }))
        },
        [setMainLayoutState]
    )

    const handleTheme = useCallback(
        (theme: MainLayoutThemeType) => {
            if (Theme !== theme) {
                setMainLayoutState(prevState => ({
                    ...prevState,
                    SiteTitle: `${
                        theme === 'GeonDaon' ? 'GeonDaon' : '바이오그램 어드민'
                    }`,
                    Theme: theme,
                }))
            }
        },
        [Theme, setMainLayoutState]
    )

    const handleWindowsSize = ({
        width,
        height,
    }: {
        width: number
        height: number
    }) => {
        setMainLayoutState(prevState => ({
            ...prevState,
            windowsSize: {
                ...prevState.windowsSize,
                width: width,
                height: height,
            },
        }))
    }

    return {
        leftMenuShow,
        alertModel,
        OutletLoading,
        handlMainAlert,
        handleLeftMenuShow,
        handleOutletLoading,
        handleTheme,
        handleWindowsSize,
    }
}
