import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailTable from './ConsultDetailTable'
import ConsultDetailTableMessageBox from './ConsultDetailTableMessageBox'

const {
    DetailPage: { Container, ChartLeftWapper, ChartRightWapper },
} = PageContainerStyle

const ConsultDetailMain = () => {
    return (
        <Container>
            <ChartLeftWapper>
                <ConsultDetailTable />
            </ChartLeftWapper>
            <ChartRightWapper>
                <ConsultDetailTableMessageBox />
            </ChartRightWapper>
        </Container>
    )
}

export default ConsultDetailMain
