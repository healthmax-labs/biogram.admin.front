import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import HealthIndicatorsSearchBox from './HealthIndicatorsSearchBox'
import HealthIndicatorsListTable from './HealthIndicatorsListTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    return (
        <Container>
            <SearchWapper>
                <HealthIndicatorsSearchBox />
            </SearchWapper>
            <TableWapper>
                <HealthIndicatorsListTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
