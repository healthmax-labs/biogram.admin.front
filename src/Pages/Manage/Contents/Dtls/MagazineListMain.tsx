import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from '@Page/Manage/Contents/Dtls/MagazineListSearchBox'
import ManageBox from '@Page/Manage/Contents/Dtls/MagazineListManageBox'
import ListTable from '@Page/Manage/Contents/Dtls/MagazineListTable'
import { getMagazineList } from '@Service/ContentsService'
import { useRecoilState } from 'recoil'
import { MagazineListState } from '@Recoil/ContentsPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InitListMain = () => {
    const [magazineListState, setMagazineListState] =
        useRecoilState(MagazineListState)

    const getTableList = useCallback(async () => {
        setMagazineListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { CUR_PAGE, SEARCH_KEY },
        } = magazineListState

        const { status, payload } = await getMagazineList({
            CUR_PAGE: CUR_PAGE,
            SEARCH_KEY: SEARCH_KEY,
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
                magazineList: {
                    MISN_MAGAZINE_LIST: [],
                },
            }))
        }
    }, [magazineListState, setMagazineListState])

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
