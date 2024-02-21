import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton } from '@Element/index'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const { RowContainer, RightSearchButton } = SearchBoxStyle

const EspListSearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    return (
        <RowContainer>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default EspListSearchBox
