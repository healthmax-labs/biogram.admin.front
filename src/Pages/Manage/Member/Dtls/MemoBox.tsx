import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import { VaryLabelTextArea } from '@Elements'

const { MemoContainer } = DetailPageStyle

const MemoBox = () => {
    return (
        <MemoContainer>
            <VaryLabelTextArea
                Rows={22}
                Placeholder={`메모를 입력해 주세요`}
                Value={``}
                HandleOnChange={() => console.debug('HandleOnChange')}
            />
        </MemoContainer>
    )
}

export default MemoBox
