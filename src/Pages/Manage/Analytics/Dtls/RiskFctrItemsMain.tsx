import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import RiskFctrItemsSearchBox from './RiskFctrItemsSearchBox'
import RiskFctrItemsTable from './RiskFctrItemsTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrItemsMain = () => {
    return (
        <Container>
            <SearchWapper>
                <RiskFctrItemsSearchBox />
            </SearchWapper>
            <TableWapper>
                <RiskFctrItemsTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrItemsMain
