import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/AnalyticsPageStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrItemsTable from './RiskFctrItemsTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrItemsMain = () => {
    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox />
            </SearchWapper>
            <TableWapper>
                <RiskFctrItemsTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrItemsMain
