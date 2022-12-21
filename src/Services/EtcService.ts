import axios from 'axios'
import {
    GeolocationDbInterface,
    KaKaoAddressSearchInterface,
    ServicesDefaultResult,
} from '@CommonTypes'

/**
 * ip 정보 가지고 오기.
 */
export function getGeolocation(): Promise<
    ServicesDefaultResult<GeolocationDbInterface>
> {
    return new Promise((resolve, reject) => {
        axios
            .get<GeolocationDbInterface>('https://geolocation-db.com/json/')
            .then(res => {
                resolve({
                    status: true,
                    message: '정상 전송하였습니다.',
                    payload: res.data,
                })
            })
            .catch(err =>
                reject({
                    status: false,
                    message: err.message,
                })
            )
    })
}

/**
 * 카카오 상세 주소 정보
 * @param fullAddress
 */
export function getKaKaoAddressInfo({
    fullAddress,
}: {
    fullAddress: string
}): Promise<ServicesDefaultResult<KaKaoAddressSearchInterface>> {
    return new Promise((resolve, reject) => {
        axios
            .get<KaKaoAddressSearchInterface>(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOAK_APPKEY}`,
                    },
                }
            )
            .then(res => {
                resolve({
                    status: true,
                    message: '정상 전송하였습니다.',
                    payload: res.data,
                })
            })
            .catch(err =>
                reject({
                    status: false,
                    message: err.message,
                })
            )
    })
}
