import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import HealthIndicatorsSearchBox from './HealthIndicatorsSearchBox'
import HealthIndicatorsTable from './HealthIndicatorsTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    return (
        <Container>
            <SearchWapper>
                <HealthIndicatorsSearchBox />
            </SearchWapper>
            <TableWapper>
                <HealthIndicatorsTable />
            </TableWapper>
        </Container>
    )
}

export default DeviceUseMain
