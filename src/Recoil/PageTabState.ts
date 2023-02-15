import { atom } from 'recoil'
import { TabInterface } from '@Type/CommonTypes'
import Routers from '@Routers'

// atom page tab current
export const AtomPageTabState = atom<TabInterface>({
    key: `tab/TabState`,
    default: {
        list: [
            {
                active: true,
                name: Routers.Main[0].name,
                pathname: Routers.Main[0].pathName,
                routePath: Routers.Main[0].pathName,
                component: 'component',
                reloadButton: Routers.Main[0].reloadButton,
            },
        ],
        close: {
            closeIndex: null,
            recoilKey: null,
        },
        reloadTask: {
            name: '',
            action: false,
        },
    },
})
