import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/MemberPageStyles'
import {
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryRadioButton,
} from '@Elements'

const { TableContainer, TableWapper, Row, LabelCell, InputCell } =
    DetailTableStyle
const { DetailContainer } = DetailPageStyle

const DetailTable = () => {
    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`이름`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`회원번호`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`핸드폰번호`} />
                        </LabelCell>
                        <InputCell>
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
                                                    console.debug('HandleClick')
                                                }
                                            />
                                        </div>
                                        <div className="ml-1">
                                            <VaryButton
                                                Name={`재인증`}
                                                HandleClick={() =>
                                                    console.debug('HandleClick')
                                                }
                                            />
                                        </div>
                                    </>
                                }
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`이메일`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`생년월일`} />
                        </LabelCell>
                        <InputCell>
                            <VaryDatepickerInput />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`성별`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap px-0">
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName={`남성`}
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                </div>

                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName={`여성`}
                                        Checked={true}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`가입일자`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`아이디`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`내몸관리지수`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`캐쉬`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`지정맥등록`} />
                        </LabelCell>
                        <InputCell>
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
                        </InputCell>
                        <InputCell>
                            <VaryLabel LabelName={`비밀번호`} />
                        </InputCell>
                        <InputCell>
                            <VaryButton
                                Name={`비밀번호 초기화`}
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <InputCell>
                            <VaryLabel LabelName={`RFID 카드 등록`} />
                        </InputCell>
                        <InputCell colSpan={3}>
                            <div className="px-1 py-1">
                                <VaryButton
                                    Name={`RFID 카드 등록하기`}
                                    HandleClick={() =>
                                        console.debug('HandleClick')
                                    }
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <InputCell>
                            <VaryLabel LabelName={`소속정보`} />
                        </InputCell>
                        <InputCell colSpan={3}>
                            <div className="px-1 py-0">
                                <table className="w-full bg-transparent border-collapse items-center scrollbar-hide whitespace-nowrap overflow-auto scrollbar-hide">
                                    <tbody className="w-full bg-gray-100 flex flex-col text-center items-center justify-between">
                                        <tr className="flex w-full bg-white h-8 items-center cursor-pointer hover:bg-green-200">
                                            <td className="flex items-center justify-center w-1/4 h-8 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                1
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-8 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                테스트 소속
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-8 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
                                                2022-11-09
                                            </td>
                                            <td className="flex items-center justify-center w-1/4 h-8 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100">
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
                            </div>
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>

            <div className="flex flex-nowrap py-2 justify-center">
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
        </DetailContainer>
    )
}

export default DetailTable
