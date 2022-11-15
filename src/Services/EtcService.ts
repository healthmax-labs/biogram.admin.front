import axios from 'axios'
import { GeolocationDbInterface, ServicesDefaultResult } from '@CommonTypes'

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
