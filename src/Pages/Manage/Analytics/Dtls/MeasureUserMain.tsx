import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MeasureUserTable from './MeasureUserTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MeasureUserMain = () => {
    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox />
            </SearchWapper>
            <TableWapper>
                <MeasureUserTable />
            </TableWapper>
        </Container>
    )
}

export default MeasureUserMain
