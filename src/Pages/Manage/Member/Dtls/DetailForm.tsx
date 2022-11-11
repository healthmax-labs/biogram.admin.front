import { VaryInput, VaryLabel } from '@Element/index'

const DetailForm = () => {
    return (
        <div className="container flex w-full">
            <table className="divide-y divide-gray-300">
                <tbody className="bg-white divide-y divide-gray-300">
                    <tr className="whitespace-nowrap">
                        <td className="px-6 py-3 border">
                            <VaryLabel LabelName={`이름`} />
                        </td>
                        <td className="px-6 border">
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                id={'id'}
                                Placeholder={'이름'}
                                Value={''}
                            />
                        </td>
                        <td className="px-6 text-sm text-gray-500 border">
                            <VaryLabel LabelName={`회원번호`} />
                        </td>
                        <td className="px-6 border">
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                id={'id'}
                                Placeholder={'회원번호'}
                                Value={''}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DetailForm
