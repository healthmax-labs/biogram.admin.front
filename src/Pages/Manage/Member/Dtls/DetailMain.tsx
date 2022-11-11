import DetailForm from './DetailForm'
import MemoBox from './MemoBox'

const DetailMain = () => {
    return (
        <>
            <div className="flex flex-nowrap">
                <div className="w-left-box">
                    <DetailForm />
                </div>
                <div className="w-right-box">
                    <MemoBox />
                </div>
            </div>
        </>
    )
}

export default DetailMain
