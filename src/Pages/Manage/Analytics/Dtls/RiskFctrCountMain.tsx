import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import RiskFctrCountSearchBox from './RiskFctrCountSearchBox'
import RiskFctrCountTable from './RiskFctrCountTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrCountMain = () => {
    return (
        <Container>
            <SearchWapper>
                <RiskFctrCountSearchBox />
            </SearchWapper>
            <TableWapper>
                <RiskFctrCountTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrCountMain
