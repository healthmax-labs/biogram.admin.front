import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/Contents/Dtls/MagazineListSearchBox'
import ManageBox from '@Page/Manage/Contents/Dtls/MagazineListManageBox'
import ListTable from '@Page/Manage/Contents/Dtls/MagazineListTable'
import { getMagazineList } from '@Service/ContentsService'
import { useRecoilState } from 'recoil'
import { MagazineListState } from '@Recoil/ContentsPagesState'
import { isNull } from 'lodash'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InitListMain = () => {
    const [magazineListState, setMagazineListState] =
        useRecoilState(MagazineListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        setMagazineListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { CUR_PAGE, search_Key },
        } = magazineListState

        const { status, payload } = await getMagazineList({
            CUR_PAGE: !isNull(CUR_PAGE) ? String(CUR_PAGE) : '0',
            SEARCH_KEY: !isNull(search_Key) ? String(search_Key) : '',
        })

        if (status) {
            setMagazineListState(prevState => ({
                ...prevState,
                status: 'success',
                magazineList: {
                    MISN_MAGAZINE_LIST: payload.MISN_MAGAZINE_LIST,
                },
            }))
        } else {
            setMagazineListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            // handlMainAlert({
            //     state: true,
            //     message: Messages.Default.processFail,
            // })
        }
    }, [handlMainAlert, magazineListState, setMagazineListState])

    useEffect(() => {
        const pageStart = () => {
            if (magazineListState.status === 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, magazineListState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
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

export default InitListMain
