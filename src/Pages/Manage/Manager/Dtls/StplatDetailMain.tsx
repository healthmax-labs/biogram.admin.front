import React from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import StplatDetailTable from './StplatDetailTable'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const StplatDetailMain = () => {
    return (
        <Container>
            <LeftWapper>
                <StplatDetailTable />
            </LeftWapper>
        </Container>
    )
}

export default StplatDetailMain
