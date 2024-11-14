import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const { Container, SearchWapper, RightSearchButton } = SearchBoxStyle

const DownloadSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    return (
        <Container>
            <SearchWapper></SearchWapper>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </Container>
    )
}

export default DownloadSearchBox
