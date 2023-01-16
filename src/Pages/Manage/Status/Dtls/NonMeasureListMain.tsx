import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import NonMeasureSearchBox from './NonMeasureSearchBox'
import NonMeasureTable from './NonMeasureListTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const NonMeasureListMain = () => {
    return (
        <Container>
            <SearchWapper>
                <NonMeasureSearchBox />
            </SearchWapper>
            <TableWapper>
                <NonMeasureTable />
            </TableWapper>
        </Container>
    )
}

export default NonMeasureListMain
