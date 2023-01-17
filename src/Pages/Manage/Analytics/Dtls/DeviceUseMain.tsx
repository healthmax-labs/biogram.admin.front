import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import DeviceUseSearchBox from './DeviceUseSearchBox'
import DeviceUseTable from './DeviceUseTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const DeviceUseMain = () => {
    return (
        <Container>
            <SearchWapper>
                <DeviceUseSearchBox />
            </SearchWapper>
            <TableWapper>
                <DeviceUseTable />
            </TableWapper>
        </Container>
    )
}

export default DeviceUseMain
