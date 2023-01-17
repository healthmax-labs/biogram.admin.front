import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import MeasureUserSearchBox from './MeasureUserSearchBox'
import MeasureUserTable from './MeasureUserTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const MeasureUserMain = () => {
    return (
        <Container>
            <SearchWapper>
                <MeasureUserSearchBox />
            </SearchWapper>
            <TableWapper>
                <MeasureUserTable />
            </TableWapper>
        </Container>
    )
}

export default MeasureUserMain
