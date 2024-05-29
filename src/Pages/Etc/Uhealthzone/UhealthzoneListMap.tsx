import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import React, { Fragment } from 'react'
import { ElementLoading } from '@Elements'
import { UhealthzoneListMapStyle } from '@Style/Pages/EtcPageStyles'

const { Container, MarkerTitleWapper, MarkerTitle } = UhealthzoneListMapStyle
const UhealthzoneListMap = ({
    Loading,
    MapCenter,
    MarkerList,
}: {
    Loading: boolean
    MapCenter: { lat: number; lng: number }
    MarkerList: Array<{
        title: string
        latlng: { lat: number; lng: number }
    }>
}) => {
    return (
        <Container>
            {Loading ? (
                <ElementLoading FullScreen={true} />
            ) : (
                <Map
                    id={`etc-page-uhealth-zone-list-map`}
                    center={{
                        lat: MapCenter.lat,
                        lng: MapCenter.lng,
                    }}
                    className="w-screen h-screen"
                    level={5}>
                    {MarkerList.map((position, index) => (
                        <Fragment
                            key={`vary-daum-map-modal-makert-item-${index}`}>
                            <MapMarker position={position.latlng} />
                            <CustomOverlayMap
                                key={`${position.title}-${index}`}
                                position={position.latlng}>
                                <MarkerTitleWapper>
                                    <MarkerTitle>{`${position.title}`}</MarkerTitle>
                                </MarkerTitleWapper>
                            </CustomOverlayMap>
                        </Fragment>
                    ))}
                </Map>
            )}
        </Container>
    )
}

export default UhealthzoneListMap
