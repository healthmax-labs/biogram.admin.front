import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ConsultGroupListState } from '@Recoil/MemberPagesState'
import { getMngCnstgrpList } from '@Service/MemberService'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultGroupManageBox from './ConsultGroupManageBox'
import ConsultGroupSearchBox from './ConsultGroupSearchBox'
import ConsultGroupListTable from './ConsultGroupListTable'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ConsultGroupListMain = () => {
    const [consultGroupListState, setConsultGroupListState] = useRecoilState(
        ConsultGroupListState
    )

    const handleGetList = useCallback(async () => {
        setConsultGroupListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { instNo },
        } = consultGroupListState

        const { status, payload } = await getMngCnstgrpList({ instNo: instNo })
        if (status) {
            setConsultGroupListState(prevState => ({
                ...prevState,
                list: {
                    CNST_GRP_LIST: payload.CNST_GRP_LIST,
                },
            }))

            setConsultGroupListState(prevState => ({
                ...prevState,
                status: 'success',
            }))
        } else {
            setConsultGroupListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [consultGroupListState, setConsultGroupListState])

    useEffect(() => {
        const pageStart = () => {
            handleGetList().then()
        }

        const {
            status,
            search: {},
        } = consultGroupListState

        if (status === 'idle') {
            pageStart()
        }
    }, [consultGroupListState, handleGetList])

    return (
        <Container>
            <SearchWapper>
                <ConsultGroupSearchBox HandleGetList={() => handleGetList()} />
            </SearchWapper>
            <ManageWapper>
                <ConsultGroupManageBox HandleGetList={() => handleGetList()} />
            </ManageWapper>
            <TableWapper>
                <ConsultGroupListTable />
            </TableWapper>
        </Container>
    )
}

export default ConsultGroupListMain
