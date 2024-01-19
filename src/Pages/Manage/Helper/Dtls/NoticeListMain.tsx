import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import ManageBox from './NoticeManageBox'
import SearchBox from './NoticeSearchBox'
import ListTable from './NoticeListTable'
import { useRecoilState } from 'recoil'
import { NoticeListState } from '@Recoil/HelperPageState'
import { getNoticeList } from '@Service/HelperService'
import { useRecoilReset } from '@Hook/index'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { RecoilStateKeyNameType } from '@CommonTypes'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const NoticeListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)

    const [noticeListState, setNoticeListState] =
        useRecoilState(NoticeListState)

    const getList = useCallback(async () => {
        setNoticeListState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status, payload } = await getNoticeList()

        if (status) {
            setNoticeListState(prevState => ({
                ...prevState,
                status: `success`,
                list: payload,
            }))
        } else {
            setNoticeListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: {
                    POST_NOTICE_INFO: [],
                },
            }))
        }
    }, [setNoticeListState])

    useEffect(() => {
        const pageStart = () => {
            if (noticeListState.status === 'idle') {
                getList().then()
            }
        }

        pageStart()
    }, [getList, noticeListState])

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
                <SearchBox HandleGetList={() => getList()} />
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

export default NoticeListMain
