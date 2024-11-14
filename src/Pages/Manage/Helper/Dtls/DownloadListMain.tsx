import { useRecoilState } from 'recoil'
import { DownloadListState } from '@Recoil/HelperPageState'
import { getRepoList } from '@Service/HelperService'
import { useCallback, useEffect } from 'react'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useRecoilReset } from '@Hook/index'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import ManageBox from './DownloadManageBox'
import SearchBox from './DownloadSearchBox'
import ListTable from './DownloadListTable'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const DownloadListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(DownloadListState)

    const handleGetList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status, payload } = await getRepoList()
        if (status) {
            //
            setListState(prevState => ({
                ...prevState,
                status: `success`,
                list: payload.REPO_NOTICE_INFO,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: [],
            }))
        }
    }, [setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status === `idle`) {
                handleGetList().then()
            }
        }

        pageStart()
    }, [handleGetList, listState.status])

    useEffect(() => {
        /**
         * 현재 활성화 되어 있는 텝을 닫았을때 MainTabComponent 에서 recoil을 리셋 했을경우
         * pageStart 함수에서 idle 로 인식해서 api를 다시 콜하는 버그를 해결하기 위해
         * 현재 텝에서 리셋해야 하는경우를 구분을 해서 현재 component가 사라질때 recoil을 리셋해준다.
         */
        return () => {
            if (tabState.close.recoilResetWhere === 'mainComponent') {
                recoilReset(tabState.close.recoilKey as RecoilStateKeyNameType)

                setTabState(prevState => ({
                    ...prevState,
                    close: {
                        closeIndex: null,
                        recoilKey: null,
                        recoilResetWhere: null,
                    },
                }))
            }
        }

        // FIXME : 종속성에서 recoilReset, setTabState, tabState.close.recoilKey, tabState.close.recoilResetWhere 업데이트 되면
        // 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabState.close])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => handleGetList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default DownloadListMain
