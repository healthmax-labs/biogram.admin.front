import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/inst/Dtls/InitListSearchBox'
import ManageBox from '@Page/Manage/inst/Dtls/InitListManageBox'
import ListTable from '@Page/Manage/inst/Dtls/InitListTable'
import { getInstList } from '@Service/InstService'
import { useRecoilState } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { gmtTimeToTimeObject } from '@Helper'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

function timeConverter(UNIX_timestamp: any) {
    const a = new Date(UNIX_timestamp)
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    const time =
        date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}

const InitListMain = () => {
    const [, setListState] = useRecoilState(InstListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const { status, payload } = await getInstList()

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.stplatSuccess,
            })
        }
    }, [handlMainAlert, setListState])

    useEffect(() => {
        const pageStart = () => {
            getTableList().then()
        }
        pageStart()
    }, [getTableList])

    useEffect(() => {
        console.debug(timeConverter(1269292414000))
        console.debug(gmtTimeToTimeObject(new Date(1269292414000)))
    }, [])

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
