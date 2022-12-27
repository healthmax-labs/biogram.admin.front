import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import ListTable from './StplatListTable'
import { getStplatList } from '@Service/ManagerService'
import { useRecoilState } from 'recoil'
import { StplatListState } from '@Recoil/ManagerPagesState'
import { has, isNull } from 'lodash'
import { useLocation } from 'react-router'

const {
    ListPage: { Container },
} = PageContainerStyle
const { TableWapper } = MainStyle

const StplatListMain = () => {
    const location = useLocation()
    const [stplatListState, setStplatListState] =
        useRecoilState(StplatListState)

    const getTableList = useCallback(async () => {
        const {
            search: { CUR_PAGE },
        } = stplatListState

        const { status, payload } = await getStplatList({
            CUR_PAGE: !isNull(CUR_PAGE) ? CUR_PAGE : 1,
        })

        if (status) {
            setStplatListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setStplatListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [stplatListState, setStplatListState])

    useEffect(() => {
        const pageStart = () => {
            if (stplatListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, stplatListState.status])

    // 다시 가지고 오기.
    useEffect(() => {
        const funcCheckLocationState = () => {
            if (location.state && has(location.state, 'renew')) {
                if (location.state.renew) {
                    getTableList().then()
                }
            }
        }

        if (location.state) {
            funcCheckLocationState()
        }
        // FIXME : 종속성에서 getTableList 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state])

    return (
        <Container>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default StplatListMain
