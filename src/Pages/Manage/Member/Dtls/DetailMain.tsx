import DetailForm from './DetailForm'
import MemoBox from './MemoBox'

const DetailMain = () => {
    return (
        <>
            <div className="flex flex-nowrap">
                <div className="max-w-[1920px] px-0">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border-0">
                        <div className="flex-auto px-1 py-10 pt-10">
                            <DetailForm />
                        </div>
                    </div>
                </div>
                <div className="min-width[1650px] w-full px-4">
                    <MemoBox />
                </div>
            </div>
        </>
    )
}

export default DetailMain
