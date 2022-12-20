import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/AnalyticsPageStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import DeviceUseTable from './DeviceUseTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox />
            </SearchWapper>
            <TableWapper>
                <DeviceUseTable />
            </TableWapper>
        </Container>
    )
}

export default DeviceUseMain
