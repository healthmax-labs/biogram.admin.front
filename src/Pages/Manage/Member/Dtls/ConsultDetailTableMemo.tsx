import { VaryButton, VaryInput, VaryLabel, VaryLabelTextArea } from '@Elements'

const ConsultDetailTableMemo = () => {
    return (
        <>
            <div className="flex flex-col break-words bg-white pt-3 ">
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`작성자명:`} />
                    </div>
                    <div className="w-full">
                        <VaryInput
                            HandleOnChange={e => console.debug(e)}
                            id={'id'}
                            Placeholder={'작성자명'}
                            Value={``}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`상담내역: `} />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 ">
                        <VaryLabelTextArea
                            HandleOnChange={() => console.debug(11)}
                            Placeholder={`상담내역`}
                            Value={``}
                            Rows={15}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`추후계획: `} />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 border">
                        <VaryLabelTextArea
                            HandleOnChange={() => console.debug(11)}
                            Placeholder={`추후계획`}
                            Value={``}
                            Rows={15}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex pt-3 items-right justify-end">
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`저장`}
                        HandleClick={() => {
                            console.debug('111')
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ConsultDetailTableMemo
