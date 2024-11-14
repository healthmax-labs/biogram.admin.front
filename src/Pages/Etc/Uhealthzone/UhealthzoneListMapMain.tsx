import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'
import { getUhealthzoneList } from '@Service/ContentsService'
import UhealthzoneListMap from './UhealthzoneListMap'
import _ from 'lodash'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@Hook/index'
import { AtomRootState } from '@Recoil/AppRootState'

const UhealthzoneListMapMain = () => {
    const [listState, setListState] = useRecoilState(UhealthzoneListState)
    const location = useLocation()
    const navigate = useNavigate()
    const appRootState = useRecoilValue(AtomRootState)
    const { handleLoginCheck, handleAttemptLogout } = useAuth()

    useEffect(() => {
        const funcCheckLogin = async () => {
            const task = handleLoginCheck()
            if (!task) {
                if (!appRootState.attemptLogout) {
                    // await handleAttemptLogout({ attemptLogout: false }).then()
                }

                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }
        }

        funcCheckLogin().then()
    }, [
        appRootState.attemptLogout,
        handleAttemptLogout,
        handleLoginCheck,
        location,
        navigate,
    ])

    useEffect(() => {
        const pageStart = async () => {
            setListState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const {
                search: { CUR_PAGE, search_Key },
            } = listState

            const { status, payload } = await getUhealthzoneList({
                CUR_PAGE: CUR_PAGE,
                SEARCH_KEY: search_Key,
            })

            if (status) {
                setListState(prevState => ({
                    ...prevState,
                    status: 'success',
                    uhealthzoneList: {
                        UHEALTH_ZONE_LIST: payload.UHEALTH_ZONE_LIST,
                    },
                }))
            } else {
                setListState(prevState => ({
                    ...prevState,
                    status: 'failure',
                    uhealthzoneList: {
                        UHEALTH_ZONE_LIST: [],
                    },
                }))
            }
        }

        if (listState.status === `idle`) {
            pageStart().then()
        }
    }, [setListState, listState])

    return (
        <UhealthzoneListMap
            Loading={listState.status === 'loading'}
            MapCenter={(() => {
                return {
                    lat: 37.5193569550269,
                    lng: 127.058024979179,
                }
            })()}
            MarkerList={_.map(
                listState.uhealthzoneList.UHEALTH_ZONE_LIST,
                e => {
                    return {
                        title: `${e.INSTL_PLACE}`,
                        latlng: {
                            lat: e.LA,
                            lng: e.LO,
                        },
                    }
                }
            )}
        />
    )
}

export default UhealthzoneListMapMain
