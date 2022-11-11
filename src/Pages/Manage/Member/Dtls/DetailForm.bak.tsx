import { VaryButton, VaryInput, VaryLabel, VaryLabelInput } from '@Elements'

const DetailForm = () => {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`이름`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`회원번호`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabel
                        LabelName={`핸드폰번호`}
                        Children={
                            <>
                                <VaryInput
                                    Width={'w64'}
                                    InputType={'text'}
                                    HandleOnChange={() =>
                                        console.debug('HandleOnChange')
                                    }
                                    id={'id'}
                                    Placeholder={'핸드폰번호'}
                                    Value={''}
                                />
                                <div className="pl-1">
                                    <VaryButton
                                        Name={`재인증`}
                                        HandleClick={() =>
                                            console.debug('HandleClick')
                                        }
                                    />
                                </div>
                                <div className="pl-1">
                                    <VaryButton
                                        Name={`데이터 통합`}
                                        HandleClick={() =>
                                            console.debug('HandleClick')
                                        }
                                    />
                                </div>
                            </>
                        }
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`이메일`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`생년월일`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`성별`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`가입일자`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>

                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`아이디`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`내몸관리지수`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabelInput
                        LabelName={`캐쉬`}
                        InputValue={''}
                        HandleOnChange={() => console.debug('HandleOnChange')}
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabel
                        LabelName={`지정맥등록`}
                        Children={
                            <>
                                <VaryButton
                                    Name={`지정맥 등록`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                                <div className="pl-1">
                                    <VaryButton
                                        Name={`수동 설치1`}
                                        HandleClick={() =>
                                            console.debug('HandleClick')
                                        }
                                    />
                                </div>
                                <div className="pl-1">
                                    <VaryButton
                                        Name={`수동 설치2`}
                                        HandleClick={() =>
                                            console.debug('HandleClick')
                                        }
                                    />
                                </div>
                            </>
                        }
                    />
                </div>
                <div className="w-6/12 px-4 py-2 border-2">
                    <VaryLabel
                        LabelName={`비밀번호`}
                        Children={
                            <>
                                <VaryButton
                                    Name={`비밀번호 초기화`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                            </>
                        }
                    />
                </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="flex flex-wrap">
                <div className="w-12/12 px-4 py-2">
                    <VaryLabel
                        LabelWidth={'w96'}
                        LabelName={`RFID 카드 등록`}
                        Children={
                            <>
                                <VaryButton
                                    Name={`RFID 카드 등록하기`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                            </>
                        }
                    />
                </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="flex flex-wrap">
                <div className="w-12/12 px-4 py-2">
                    <VaryLabel
                        LabelWidth={'w96'}
                        LabelName={`소속정보`}
                        Children={
                            <>
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
                                    </tbody>
                                </table>
                            </>
                        }
                    />
                </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="flex flex-wrap justify-center">
                <div className="w-12/12 px-4 py-2 items-center">
                    <div className="flex flex-nowrap">
                        <div className="pl-1">
                            <VaryButton
                                Name={`회원정보 저장하기`}
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </div>
                        <div className="pl-1">
                            <VaryButton
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
