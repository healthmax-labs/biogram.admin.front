import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton, VaryDaumMapModal } from '@Elements'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import {
    UhealthzoneDetailState,
    UhealthzoneListState,
} from '@Recoil/ContentsPagesState'
import { useTab } from '@Hook/index'
import _ from 'lodash'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    mapLoading: false,
    modal: {
        map: false,
    },
}

const UhealthzoneListManageBox = () => {
    const { handleDeleteTabbyMatchRouter } = useTab()
    const navigate = useNavigate()
    const resetDetail = useResetRecoilState(UhealthzoneDetailState)
    const listState = useRecoilValue(UhealthzoneListState)

    const [pageState, setPageState] = useState<{
        mapLoading: boolean
        modal: {
            map: boolean
        }
    }>(initializeState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                map: true,
                            },
                        }))
                    }}
                    ButtonName={'지도보기'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        handleDeleteTabbyMatchRouter(
                            `/manage/contents/uhealthzone/:UhealthZoneNo/detail`
                        )
                        resetDetail()
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/contents/uhealthzone/new`,
                        })
                    }}
                    ButtonName={'바이오그램 존 신규 등록'}
                />
            </Buttons>
            {pageState.modal.map && (
                <VaryDaumMapModal
                    Loading={pageState.mapLoading}
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
                    HandleClickCancleButton={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                map: false,
                            },
                        }))
                    }
                />
            )}
        </Wapper>
    )
}

export default UhealthzoneListManageBox
