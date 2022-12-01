import {
    VaryLabel,
    VaryInput,
    VaryLabelTextArea,
    VaryButton,
    VaryLabelCheckBox,
    SendBoxDatepickerInput,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'

const ConsultDetailTableMessageSend = () => {
    return (
        <>
            <div className="flex flex-col break-words bg-white pt-3">
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 ">
                        <VaryLabelTextArea
                            HandleOnChange={() => console.debug(11)}
                            Placeholder={`내용`}
                            Value={``}
                            Rows={20}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full pt-2">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`발신번호:`} />
                    </div>
                    <div className="flex w-full">
                        <VaryInput
                            HandleOnChange={e => console.debug(e)}
                            id={'id'}
                            Placeholder={'1600-1234'}
                            Value={``}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full pt-2">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`발신시간:`} />
                    </div>
                    <div className="w-full">
                        <div className="grid grid-rows-2 grid-flow-col gap-1">
                            <div className="flex flex-nowrap items-center">
                                <div className="px-0">
                                    <VaryLabelCheckBox
                                        LabelName={`바로발송`}
                                        Checked={false}
                                        HandleOnChange={e => console.debug(e)}
                                    />
                                </div>
                                <div className="px-2">
                                    <VaryLabelCheckBox
                                        LabelName={`예약발송`}
                                        Checked={false}
                                        HandleOnChange={e => console.debug(e)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-nowrap">
                                    <div className="w-2/8">
                                        <SendBoxDatepickerInput
                                            Value={new Date()}
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                } = gmtTimeToTimeObject(e)
                                                console.debug(
                                                    year,
                                                    monthPad,
                                                    dayPad
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className="w-2/5">
                                        <SendBoxDatepickerInput
                                            DateFormat={'HH:II:SS'}
                                            Value={new Date()}
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                } = gmtTimeToTimeObject(e)
                                                console.debug(
                                                    year,
                                                    monthPad,
                                                    dayPad
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex pt-3">
                    <div className="px-2">
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`취소`}
                            HandleClick={() => {
                                console.debug('111')
                            }}
                        />
                    </div>
                    <div className="px-2">
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`보내기`}
                            HandleClick={() => {
                                console.debug('111')
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultDetailTableMessageSend
