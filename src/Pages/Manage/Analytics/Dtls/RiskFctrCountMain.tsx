import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/AnalyticsPageStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrCountTable from './RiskFctrCountTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrCountMain = () => {
    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox />
            </SearchWapper>
            <TableWapper>
                <RiskFctrCountTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrCountMain
