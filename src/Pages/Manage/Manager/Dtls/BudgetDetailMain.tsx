import DetailTable from './BudgetDetailTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BudgetDetailState, BudgetListState } from '@Recoil/ManagerPagesState'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { postInstInfoBudgetAsign } from '@Service/ManagerService'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'
import { gmtTimeToTimeObject } from '@Helper'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const BudgetDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const { BUDGET_SN } = useParams<{ BUDGET_SN: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const [detailState, setDetailState] = useRecoilState(BudgetDetailState)
    const resetBudgetDetailState = useResetRecoilState(BudgetDetailState)
    const resetBudgetListState = useResetRecoilState(BudgetListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const handleSave = async () => {
        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const {
            INST_NO,
            BUDGET_ENDDE,
            BUDGET_ASIGN_AMOUNT,
            BUDGET_BGNDE,
            MAX_CASH,
        } = detailState.info

        const { status } = await postInstInfoBudgetAsign({
            INST_NO: Number(INST_NO),
            BUDGET_ENDDE: BUDGET_ENDDE,
            BUDGET_ASIGN_AMOUNT: Number(BUDGET_ASIGN_AMOUNT),
            BUDGET_BGNDE: BUDGET_BGNDE,
            MAX_CASH: MAX_CASH,
        })

        if (status) {
            resetBudgetDetailState()
            resetBudgetListState()
            handleDeleteTabbyMatchRouter(
                '/manage/manager/budget-list/:BUDGET_SN/detai'
            )

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/manager/budget-list`,
            })
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    useEffect(() => {
        const pageStaet = () => {
            const { pathname } = locationState

            const { year, monthPad, dayPad } = gmtTimeToTimeObject(new Date())
            if (pathname === `/manage/manager/budget-list/new`) {
                setDetailState(prevState => ({
                    ...prevState,
                    info: {
                        ...prevState.info,
                        BUDGET_BGNDE: `${year}${monthPad}${dayPad}`,
                        BUDGET_ENDDE: `${year}${monthPad}${dayPad}`,
                    },
                }))
            }
        }

        pageStaet()
    }, [BUDGET_SN, locationState, setDetailState])

    return (
        <Container>
            <LeftWapper>
                <DetailTable HandleSave={() => handleSave()} />
            </LeftWapper>
        </Container>
    )
}

export default BudgetDetailMain
