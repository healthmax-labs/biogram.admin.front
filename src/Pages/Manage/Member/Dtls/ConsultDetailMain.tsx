import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultDetailTable from './ConsultDetailTable'

const {
    DetailPage: { Container, LeftWapper, RightWapper },
} = PageContainerStyle

const ConsultDetailMain = () => {
    return (
        <Container>
            <LeftWapper>
                <ConsultDetailTable />
            </LeftWapper>
            <RightWapper></RightWapper>
        </Container>
    )
}

export default ConsultDetailMain
