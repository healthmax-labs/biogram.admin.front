import { Mains } from '@Style/Layouts/Manage/MainStyles'

export default function HeaderStats() {
    return (
        <>
            {/* Header */}
            <Mains.HeaderStats.Container>
                <Mains.HeaderStats.MainWapper>
                    <Mains.HeaderStats.Wapper>
                        {/* Card stats */}
                        <Mains.HeaderStats.Cards>
                            <Mains.HeaderStats.CardItem></Mains.HeaderStats.CardItem>
                            <Mains.HeaderStats.CardItem></Mains.HeaderStats.CardItem>
                            <Mains.HeaderStats.CardItem></Mains.HeaderStats.CardItem>
                            <Mains.HeaderStats.CardItem></Mains.HeaderStats.CardItem>
                        </Mains.HeaderStats.Cards>
                    </Mains.HeaderStats.Wapper>
                </Mains.HeaderStats.MainWapper>
            </Mains.HeaderStats.Container>
        </>
    )
}
