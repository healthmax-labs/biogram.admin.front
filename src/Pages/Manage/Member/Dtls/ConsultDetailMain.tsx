import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailTable from './ConsultDetailTable'
import ConsultDetailTableMessageBox from './ConsultDetailTableMessageBox'

const {
    DetailPage: { Container, LeftWapper, RightWapper },
} = PageContainerStyle

const ConsultDetailMain = () => {
    return (
        <Container>
            <LeftWapper>
                <ConsultDetailTable />
            </LeftWapper>
            <RightWapper>
                <ConsultDetailTableMessageBox />
            </RightWapper>
        </Container>
    )
}

export default ConsultDetailMain
