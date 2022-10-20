import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios'
import { LocalTokenInterface } from '@Type/CommonTypes'
import * as Helper from '@Helper'
import * as _ from 'lodash'

interface serviceInterface {
    method: 'get' | 'post' | 'delete' | 'put'
    url: string
    payload: any
}

const apiBaseURLL: string | undefined = _.isUndefined(
    process.env.REACT_APP_API_SERVER_URL
)
    ? 'http://localhost'
    : process.env.REACT_APP_API_SERVER_URL

const setTokenData = ({
    TOKEN_INFO,
    VTOKEN_INFO,
}: LocalTokenInterface): void => {
    Helper.saveRefreshToken({
        TOKEN_INFO,
        VTOKEN_INFO,
    })
}

/**
 * refresh Token.
 * 토큰 리프레쉬
 */
const handleTokenRefresh = (): Promise<LocalTokenInterface> => {
    Helper.COLORLOG('warning', ':: Try Token Refresh :: ')
    const axiosDefaultHeader: AxiosRequestConfig = {
        baseURL: apiBaseURLL,
        timeout: 20000,
        headers: {
            Authorization: '',
        },
    }

    const refreshToken = Helper.getRefreshToken()
    return new Promise((resolve, reject) => {
        const _thisAxios_: AxiosInstance = axios.create(axiosDefaultHeader)
        _thisAxios_
            .post<LocalTokenInterface>(
                `${apiBaseURLL}/api/v1/auth/token-refresh`,
                { refresh_token: refreshToken }
            )
            .then(({ data }) => {
                Helper.COLORLOG('success', ':: Success Token Refresh :: ')
                resolve({
                    TOKEN_INFO: data.TOKEN_INFO,
                    VTOKEN_INFO: data.VTOKEN_INFO,
                })
            })
            .catch(() => {
                Helper.COLORLOG('error', ':: Error Token Refresh :: ')
                reject({
                    TOKEN_INFO: '',
                    VTOKEN_INFO: '',
                })
            })
    })
}

/**
 * axios Request 에 토큰 추가.
 * @param request
 * @param access_token
 */
const attachTokenToRequest = (
    request: AxiosRequestConfig,
    access_token: any
) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.headers['Authorization'] = access_token
}

const shouldIntercept = (error: AxiosError) => {
    try {
        return error.response?.status === 401
    } catch (e) {
        return false
    }
}

export default ({ method = 'post', url, payload }: serviceInterface): any => {
    let isRefreshing = false
    let failedQueue: any = []

    const options = {
        attachTokenToRequest,
        setTokenData,
        handleTokenRefresh,
        shouldIntercept,
    }

    const processQueue = (
        error: AxiosError | null,
        token: string | null = null
    ) => {
        failedQueue.forEach((prom: any) => {
            if (error) {
                prom.reject(error)
            } else {
                prom.resolve(token)
            }
        })

        failedQueue = []
    }

    /**
     * axios Error Interceptor
     * @param error
     */
    const errorInterceptor = (error: any) => {
        const {
            config: {
                headers: { Authorization },
            },
        } = error
        const status = error.response?.status

        if (!options.shouldIntercept(error)) {
            if (status === 503) {
                // 서버 에러
                Helper.COLORLOG(
                    'error',
                    error.response.data.error.error_message
                )
                return Promise.resolve({
                    status: false,
                    message: error.response?.data.error.error_message,
                })
            } else if (status === 412) {
                // 헤더 체크 에러.
                Helper.COLORLOG(
                    error.response.data.error.error_message,
                    'error'
                )
                return Promise.resolve({
                    status: false,
                    message: error.response?.data.error.error_message,
                })
            } else if (status === 429) {
                // 너무 많은 요청 일때.
                Helper.COLORLOG(
                    error.response.data.error.error_message,
                    'error'
                )
                return Promise.resolve({
                    status: false,
                    message: error.response?.data.error.error_message,
                })
            } else {
                return Promise.resolve({
                    status: false,
                    message: error.response?.data.error.error_message,
                })
            }
        }

        if (error.config._retry || error.config._queued) {
            return Promise.reject(error)
        }

        const originalRequest = error.config

        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject })
            })
                .then(token => {
                    originalRequest._queued = true
                    options.attachTokenToRequest(originalRequest, token)
                    return _Axios_.request(originalRequest)
                })
                .catch(() => {
                    return Promise.reject(error)
                })
        }

        if (
            originalRequest.url !== `/api/v1/auth/login-check` &&
            status === 401 &&
            Authorization.length > 0
        ) {
            originalRequest._retry = true
            isRefreshing = true
            return new Promise(resolve => {
                options.handleTokenRefresh
                    .call(options.handleTokenRefresh)
                    .then((tokenData: any) => {
                        options.setTokenData(tokenData)
                        options.attachTokenToRequest(
                            originalRequest,
                            tokenData.TOKEN_INFO
                        )
                        processQueue(null, tokenData.TOKEN_INFO)
                        resolve(_Axios_.request(originalRequest))
                    })
                    .catch(() => {
                        // 토큰 Refresh Error
                        Helper.COLORLOG('error', ':: Fail Token Refresh :: ')
                        Helper.removeLoginToken()
                        // processQueue(err, '');
                        // reject(err);
                        Helper.COLORLOG(
                            'error',
                            '로그인 유지 시간이 만료되었습니다.'
                        )
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        } else if (status === 401) {
            return Promise.resolve({
                status: false,
                message: error.response?.data.error.error_message,
            })
        }
    }

    /**
     * 정상 리턴.
     * @param response
     */
    const successInterceptor = (response: AxiosResponse): Promise<any> => {
        if (response.status === 204) {
            return Promise.resolve({
                status: true,
                payload: null,
            })
        } else {
            return Promise.resolve({
                status: true,
                payload: response.data.result
                    ? response.data.result
                    : response.data,
            })
        }
    }

    const axiosDefaultHeader: AxiosRequestConfig = {
        baseURL: apiBaseURLL,
        timeout: 20000,
        headers: {
            Authorization: Helper.getAccessToken()
                ? Helper.getAccessToken()
                : '',
        },
    }

    const _Axios_: AxiosInstance = axios.create(axiosDefaultHeader)

    _Axios_.interceptors.response.use(
        response => successInterceptor(response),
        error => errorInterceptor(error)
    )
    return _Axios_({
        url: url,
        method: method,
        data: payload,
    })
}
