import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/AnalyticsPageStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import MemberTable from './MemberTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MemberMain = () => {
    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox />
            </SearchWapper>
            <TableWapper>
                <MemberTable />
            </TableWapper>
        </Container>
    )
}

export default MemberMain
