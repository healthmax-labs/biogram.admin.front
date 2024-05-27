import { VaryButton, VaryModal } from '@Element/index'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import React, { Fragment } from 'react'

const VaryDaumMapModal = ({
    Loading,
    MapCenter,
    HandleClickCancleButton,
    MarkerList,
}: {
    Loading: boolean
    HandleClickCancleButton: () => void
    MapCenter: { lat: number; lng: number }
    MarkerList: Array<{
        title: string
        latlng: { lat: number; lng: number }
    }>
}) => {
    return (
        <VaryModal
            ModalLoading={Loading}
            NeedMax={false}
            Buttons={
                <VaryButton
                    ButtonType={'default'}
                    HandleClick={() => {
                        HandleClickCancleButton()
                    }}
                    ButtonName={'닫기'}
                />
            }
            Children={
                <div className="relative flex h-full items-center justify-center bg-gray-50">
                    <Map
                        id="map"
                        center={{
                            lat: MapCenter.lat,
                            lng: MapCenter.lng,
                        }}
                        className="w-full h-[650px]"
                        level={6}>
                        {MarkerList.map((position, index) => (
                            <Fragment
                                key={`vary-daum-map-modal-makert-item-${index}`}>
                                <MapMarker position={position.latlng} />
                                <CustomOverlayMap
                                    key={`${position.title}-${index}`}
                                    position={position.latlng}>
                                    <div className="relative bottom-14 flex w-full items-center justify-center px-5 bg-gray-100 border border-gray-300 h-8 rounded-xl">
                                        <div className="text-md font-semibold">{`${position.title}`}</div>
                                    </div>
                                </CustomOverlayMap>
                            </Fragment>
                        ))}
                    </Map>
                </div>
            }
        />
    )
}

export default VaryDaumMapModal
