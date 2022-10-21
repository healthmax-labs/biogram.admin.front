import {
    HeaderStateContainer,
    HeaderStateWapper,
    HeaderStateWapperSub,
    HeaderStatsCards,
    HeaderStatsCardItem,
} from '@Style/Layouts/Manage/Common'

export default function HeaderStats() {
    return (
        <>
            {/* Header */}
            <HeaderStateContainer>
                <HeaderStateWapper>
                    <HeaderStateWapperSub>
                        {/* Card stats */}
                        <HeaderStatsCards>
                            <HeaderStatsCardItem></HeaderStatsCardItem>
                            <HeaderStatsCardItem></HeaderStatsCardItem>
                            <HeaderStatsCardItem></HeaderStatsCardItem>
                            <HeaderStatsCardItem></HeaderStatsCardItem>
                        </HeaderStatsCards>
                    </HeaderStateWapperSub>
                </HeaderStateWapper>
            </HeaderStateContainer>
        </>
    )
}
