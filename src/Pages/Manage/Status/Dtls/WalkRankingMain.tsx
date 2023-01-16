import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import WalkRankingSearchBox from './WalkRankingSearchBox'
import WalkRankingTable from './WalkRankingTable'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const WalkRankingMain = () => {
    return (
        <Container>
            <SearchWapper>
                <WalkRankingSearchBox />
            </SearchWapper>
            <TableWapper>
                <WalkRankingTable />
            </TableWapper>
        </Container>
    )
}

export default WalkRankingMain
