import {
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryRadioButton,
} from '@Elements'

const DetailForm = () => {
    return (
        <>
            <div className="container flex border w-left-box">
                <table className="divide-y divide-gray-300 w-full">
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
                                    Disabled={true}
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`핸드폰번호`} />
                            </td>
                            <td className="px-6 border">
                                <div className="flex flex-nowrap">
                                    <VaryInput
                                        Width={'w64'}
                                        InputType={'text'}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                        id={'id'}
                                        Placeholder={'핸드폰번호'}
                                        Value={''}
                                        Children={
                                            <>
                                                <div className="ml-1">
                                                    <VaryButton
                                                        Name={`재인증`}
                                                        HandleClick={() =>
                                                            console.debug(
                                                                'HandleClick'
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-1">
                                                    <VaryButton
                                                        Name={`재인증`}
                                                        HandleClick={() =>
                                                            console.debug(
                                                                'HandleClick'
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        }
                                    />
                                </div>
                            </td>
                            <td className="px-6 text-sm text-gray-500 border">
                                <VaryLabel LabelName={`이메일`} />
                            </td>
                            <td className="px-6 border">
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'이메일'}
                                    Value={''}
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`생년월일`} />
                            </td>
                            <td className="px-6 border">
                                <VaryDatepickerInput />
                            </td>
                            <td className="px-6 text-sm text-gray-500 border">
                                <VaryLabel LabelName={`성별`} />
                            </td>
                            <td className="px-6 border">
                                <div className="flex flex-nowrap px-0">
                                    <div className="mr-2">
                                        <VaryRadioButton LabelName={`남성`} />
                                    </div>

                                    <div className="mr-2">
                                        <VaryRadioButton LabelName={`여성`} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`가입일자`} />
                            </td>
                            <td className="px-6 border">
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'가입일자'}
                                    Value={''}
                                    Disabled={true}
                                />
                            </td>
                            <td className="px-6 text-sm text-gray-500 border">
                                <VaryLabel LabelName={`아이디`} />
                            </td>
                            <td className="px-6 border">
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'아이디'}
                                    Value={''}
                                    Disabled={true}
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`내몸관리지수`} />
                            </td>
                            <td className="px-6 border">
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'내몸관리지수'}
                                    Value={''}
                                    Disabled={true}
                                />
                            </td>
                            <td className="px-6 text-sm text-gray-500 border">
                                <VaryLabel LabelName={`캐쉬`} />
                            </td>
                            <td className="px-6 border">
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'캐쉬'}
                                    Value={''}
                                    Disabled={true}
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`지정맥등록`} />
                            </td>
                            <td className="px-6 border">
                                <div className="flex flex-nowrap px-0">
                                    <div className="px-0 m-1">
                                        <VaryButton
                                            Name={`지정맥 재등록`}
                                            HandleClick={() =>
                                                console.debug('HandleClick')
                                            }
                                        />
                                    </div>
                                    <div className="m-1">
                                        <VaryButton
                                            Name={`수동 설치1`}
                                            HandleClick={() =>
                                                console.debug('HandleClick')
                                            }
                                        />
                                    </div>
                                    <div className="m-1">
                                        <VaryButton
                                            Name={`수동 설치2`}
                                            HandleClick={() =>
                                                console.debug('HandleClick')
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 text-sm text-gray-500 border">
                                <VaryLabel LabelName={`비밀번호`} />
                            </td>
                            <td className="px-6 border">
                                <VaryButton
                                    Name={`비밀번호 초기화`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`RFID 카드 등록`} />
                            </td>
                            <td
                                className="px-6 border row-span-3 text-center"
                                colSpan={3}>
                                <VaryButton
                                    Name={`RFID 카드 등록하기`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-3 border">
                                <VaryLabel LabelName={`소속정보`} />
                            </td>
                            <td
                                className="px-6 border row-span-3 text-center"
                                colSpan={3}>
                                <table className="w-full bg-transparent border-collapse items-center">
                                    <tbody className="w-full bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll">
                                        <tr className="flex w-full bg-white h-9 items-center cursor-pointer hover:bg-green-200">
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                1
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                테스트 소속
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                2022-11-09
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                <VaryButton
                                                    Name={`소속 탈퇴`}
                                                    HandleClick={() =>
                                                        console.debug(
                                                            'HandleClick'
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr className="flex w-full bg-white h-9 items-center cursor-pointer hover:bg-green-200">
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                2
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                테스트 소속
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                2022-11-09
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                <VaryButton
                                                    Name={`소속 탈퇴`}
                                                    HandleClick={() =>
                                                        console.debug(
                                                            'HandleClick'
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr className="flex w-full bg-white h-9 items-center cursor-pointer hover:bg-green-200">
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                3
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                테스트 소속
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                2022-11-09
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                <VaryButton
                                                    Name={`소속 탈퇴`}
                                                    HandleClick={() =>
                                                        console.debug(
                                                            'HandleClick'
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap justify-center">
                <div className="w-12/12 px-4 py-2 items-center">
                    <div className="flex flex-nowrap">
                        <div className="pl-1">
                            <VaryButton
                                BgColor={`mBBlue`}
                                Name={`회원정보 저장하기`}
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </div>
                        <div className="pl-1">
                            <VaryButton
                                BgColor={`mBBlue`}
                                Name={`목록으로`}
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailForm
