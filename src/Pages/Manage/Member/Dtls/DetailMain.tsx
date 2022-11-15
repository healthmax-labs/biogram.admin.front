import DetailTable from './DetailTable'
import MemoBox from './MemoBox'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'

const {
    DetailPage: { Container, LeftWapper, RightWapper },
} = PageContainerStyle

const DetailMain = () => {
    return (
        <Container>
            <LeftWapper>
                <DetailTable />
            </LeftWapper>
            <RightWapper>
                <MemoBox />
            </RightWapper>
        </Container>
    )
}

export default DetailMain
