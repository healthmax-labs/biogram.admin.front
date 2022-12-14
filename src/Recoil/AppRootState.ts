import { atom, selector } from 'recoil'
import { AppRootStateInterface } from '@CommonTypes'
// atom app root state current
export const AtomRootState = atom<AppRootStateInterface>({
    key: `app/RootState`,
    default: {
        init: false,
        uuid: ``,
        login: false,
        Geolocation: {
            IPv4: ``,
            city: ``,
            country_code: ``,
            country_name: ``,
            latitude: 0,
            longitude: 0,
            postal: false,
            state: '',
        },
        ConHistory: [],
        logininfo: {
            TOKEN_INFO: null,
            VTOKEN_INFO: null,
            TOKEN_LIMIT_TIME: 0,
            AUTHORIZE_CODE: null,
        },
        userinfo: {
            USID: null,
            NM: null,
            MBER_NO: 0,
            AUTH_CODE: null,
            INST_NM: null,
        },
        menuInfo: {
            CHARGER_MENU_INFO: {
                AUTHOR_CODE: null,
                MENU_COURS: null,
                INST_NM: null,
                MENU_NM: null,
                MENU_CODE: null,
                AUTHOR_NM: null,
                NM: null,
            },
            AUTHOR_MENU_INFO_LIST: [],
        },
    },
})

// select app root state
export const SelectRootState = selector({
    key: `app/SelectRootState`,
    get: ({ get }) => {
        const { uuid, Geolocation, ConHistory, userinfo } = get(AtomRootState)

        return {
            uuid,
            Geolocation,
            ConHistory,
            userinfo,
        }
    },
})
