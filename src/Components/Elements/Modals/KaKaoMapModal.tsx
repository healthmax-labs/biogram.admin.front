import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { VaryButton, VaryModal } from '@Elements'

const MarkerBox = ({ title }: { title: string }) => {
    return (
        <>
            <div className="absolute top-0 left-3 transform">
                <div className="text-center w-20">{title}</div>
            </div>
        </>
    )
}

const KaKaoMapModal = ({
    Lat,
    Lng,
    MarkeName,
    Complete,
}: {
    Lat: number
    Lng: number
    MarkeName: string
    Complete: ({ state }: { state: boolean }) => void
}) => {
    return (
        <>
            <VaryModal
                ModalLoading={false}
                MaxWidth={`xl6`}
                Children={
                    <>
                        <Map
                            center={{ lat: Lat, lng: Lng }}
                            style={{ width: '100%', height: '560px' }}>
                            <MapMarker position={{ lat: Lat, lng: Lng }}>
                                <MarkerBox title={MarkeName} />
                            </MapMarker>
                        </Map>
                    </>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'닫기'}
                            HandleClick={() => {
                                Complete({ state: false })
                            }}
                        />
                    </>
                }
            />
        </>
    )
}

export default KaKaoMapModal
