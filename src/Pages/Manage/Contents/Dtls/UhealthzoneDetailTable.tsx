import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    KaKaoMapModal,
    KaKaoPostCodeModal,
    PstinstSelectBox,
    VaryButton,
    VaryDatepickerInput,
    VaryImageUpload,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryLabelInput,
    VaryLabelRadioButton,
    VarySelectBox,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import {
    CommonListTableStyle as CT,
    DetailTableStyle,
} from '@Style/Elements/TableStyles'
import { DetailPageStyle as DPS } from '@Style/Pages/ContentsPageStyle'
import { WapperStyle as WS } from '@Style/Pages/CommonStyle'

const { TableContainer, TableWapper, Row, LabelCell, InputCell, InputItem } =
    DetailTableStyle

const initializeState = {
    title: '',
    address: {
        fullAddress: '',
        lng: '',
        lat: '',
    },
    modal: {
        postcode: false,
        kakaomap: false,
    },
}

const UhealthzoneDetailTable = ({
    pageMode,
}: {
    pageMode: `new` | `modify`
}) => {
    const params = useParams<{ UhealthZoneNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        title: string
        address: {
            fullAddress: string
            lng: string
            lat: string
        }
        modal: {
            postcode: boolean
            kakaomap: boolean
        }
    }>(initializeState)

    useEffect(() => {
        const funcSetDetail = () => {
            if (params.UhealthZoneNo) {
                // handleGetInfo(Number(params.UhealthZoneNo)).then()
            }
        }

        if (pageMode === `modify` && params.UhealthZoneNo) {
            funcSetDetail()
        }
        // FIXME : 종속성에서 handleGetInfo 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageMode, params.UhealthZoneNo])

    return (
        <DPS.DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`지점명`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <InputItem>
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setPageState(prevState => ({
                                                ...prevState,
                                                title: e.target.value,
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={'지점명'}
                                        Value={pageState.title}
                                    />
                                </InputItem>
                                <InputItem>
                                    <VaryButton
                                        Name={`지점 중복확인`}
                                        HandleClick={() =>
                                            console.debug('VaryButton')
                                        }
                                    />
                                </InputItem>
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 위치`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <PstinstSelectBox
                                    Value={{
                                        status: 'loading',
                                        infoStep: 'step1',
                                        instNo: null,
                                        step1: '',
                                        step2: '',
                                        step3: '',
                                    }}
                                    ReturnCallback={e => {
                                        console.debug(e)
                                    }}
                                />
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`전화번호`} />
                        </LabelCell>
                        <InputCell>
                            <WS.InputWapper>
                                <InputItem>
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => console.debug(e)}
                                        id={'id'}
                                        Placeholder={'전화번호'}
                                        Value={``}
                                    />
                                </InputItem>
                            </WS.InputWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`주소 정보`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    <DPS.Address.Button>
                                        <VaryButton
                                            Name={`주소 검색`}
                                            HandleClick={() =>
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    modal: {
                                                        ...prevState.modal,
                                                        postcode: true,
                                                    },
                                                }))
                                            }
                                        />
                                    </DPS.Address.Button>
                                    <DPS.Address.Input>
                                        <VaryInput
                                            InputType={'text'}
                                            HandleOnChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => console.debug(e)}
                                            id={'id'}
                                            Placeholder={'주소를 입력해 주세요'}
                                            Value={
                                                pageState.address.fullAddress
                                            }
                                        />
                                    </DPS.Address.Input>
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarapGap>
                                    <WS.FullNoWarap>
                                        <DPS.Geo>
                                            <VaryLabelInput
                                                LabelName="위도"
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                                InputValue={
                                                    pageState.address.lat
                                                }
                                            />
                                        </DPS.Geo>
                                        <DPS.Geo>
                                            <VaryLabelInput
                                                LabelName="경도"
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                                InputValue={
                                                    pageState.address.lng
                                                }
                                            />
                                        </DPS.Geo>
                                    </WS.FullNoWarap>
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarapGap>
                                    <WS.FullNoWarap>
                                        <DPS.MapURL>
                                            <VaryInput
                                                InputType={'text'}
                                                HandleOnChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => console.debug(e)}
                                                id={'id'}
                                                Placeholder={
                                                    'URL을 입력해 주세요'
                                                }
                                                Value={``}
                                            />
                                        </DPS.MapURL>
                                        <DPS.MapURL>
                                            <VaryButton
                                                Name={`지도보기`}
                                                HandleClick={() => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        modal: {
                                                            ...prevState.modal,
                                                            kakaomap: true,
                                                        },
                                                    }))
                                                }}
                                            />
                                        </DPS.MapURL>
                                    </WS.FullNoWarap>
                                </WS.FlexNoWarapGap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`운영시간`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`일`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`월`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`화`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`수`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`목`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`금`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`토`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`공휴일 휴무`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarap>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
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
                                    </DPS.DatePicker>
                                    <DPS.DatePickerLine>~</DPS.DatePickerLine>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
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
                                    </DPS.DatePicker>
                                </WS.FlexNoWarap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`혈액 측정 시간`} />
                        </LabelCell>
                        <InputCell>
                            <WS.FullWapper>
                                <WS.FlexNoWarapGap>
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`일`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`월`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`화`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`수`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`목`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`금`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`토`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        LabelName={`공휴일 휴무`}
                                        HandleOnChange={() =>
                                            console.debug('HandleOnChange')
                                        }
                                    />
                                </WS.FlexNoWarapGap>
                                <WS.FlexNoWarap>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
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
                                    </DPS.DatePicker>
                                    <DPS.DatePickerLine>~</DPS.DatePickerLine>
                                    <DPS.DatePicker>
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
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
                                    </DPS.DatePicker>
                                </WS.FlexNoWarap>
                            </WS.FullWapper>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`설치 기기`} />
                        </LabelCell>
                        <InputCell>
                            <TableContainer>
                                <TableWapper>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`모델`} />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`프로`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`베이직`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`로그인 방식`}
                                            />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`복합`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`지정맥`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`RFID카드`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`외부인 사용`}
                                            />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`가능`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`불가능`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`오픈`} />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`오픈`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`미오픈`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`프린트`} />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`가능`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelRadioButton
                                                    Checked={false}
                                                    LabelName={`불가능`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`설치기기`} />
                                        </LabelCell>
                                        <InputCell>
                                            <div className="flex flex-nowrap">
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`키오스크`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`신장`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`체성분`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`혈압`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`혈당`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`콜레스트롤`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`스트레스`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={false}
                                                    LabelName={`뇌건강 측정`}
                                                    HandleOnChange={() =>
                                                        console.debug(
                                                            'HandleOnChange'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <InputCell colSpan={2}>
                                            <WS.FullWapperGap>
                                                <WS.FlexNoWarapGap>
                                                    <DPS.DeviceKeySelect>
                                                        <VarySelectBox
                                                            Elements={[
                                                                {
                                                                    value: '',
                                                                    text: '신장',
                                                                },
                                                                {
                                                                    value: '',
                                                                    text: '체성분',
                                                                },
                                                            ]}
                                                            HandleOnChange={() =>
                                                                console.debug(
                                                                    'HandleOnChange'
                                                                )
                                                            }
                                                            Value={''}
                                                        />
                                                    </DPS.DeviceKeySelect>
                                                    <DPS.DeviceKeySelect>
                                                        <VaryInput
                                                            InputType={'text'}
                                                            HandleOnChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) =>
                                                                console.debug(e)
                                                            }
                                                            id={'id'}
                                                            Placeholder={
                                                                '시리얼 번호를 입력해 주세요.'
                                                            }
                                                            Value={``}
                                                        />
                                                    </DPS.DeviceKeySelect>
                                                    <DPS.DeviceKeySelectButton>
                                                        <VaryButton
                                                            Name={`추가`}
                                                            HandleClick={() =>
                                                                console.debug(
                                                                    'VaryButton'
                                                                )
                                                            }
                                                        />
                                                    </DPS.DeviceKeySelectButton>
                                                </WS.FlexNoWarapGap>
                                            </WS.FullWapperGap>
                                            <WS.FullWapperGap>
                                                <CT.TableWapper>
                                                    <CT.TableHeader>
                                                        <CT.HeaderRow>
                                                            <CT.HeaderCell>
                                                                측정코드
                                                            </CT.HeaderCell>
                                                            <CT.HeaderCell>
                                                                지정맥 시리얼
                                                                번호
                                                            </CT.HeaderCell>
                                                            <CT.HeaderCell>
                                                                삭제
                                                            </CT.HeaderCell>
                                                        </CT.HeaderRow>
                                                    </CT.TableHeader>
                                                    <CT.TableBodyS>
                                                        <CT.TableBodyRow
                                                            BgState={false}>
                                                            <CT.TableBodyCell>
                                                                혈압
                                                            </CT.TableBodyCell>
                                                            <CT.TableBodyCell>
                                                                1234123123
                                                            </CT.TableBodyCell>
                                                            <CT.TableBodyCell>
                                                                <VaryButton
                                                                    Name={`삭제`}
                                                                    HandleClick={() =>
                                                                        console.debug(
                                                                            'VaryButton'
                                                                        )
                                                                    }
                                                                />
                                                            </CT.TableBodyCell>
                                                        </CT.TableBodyRow>
                                                    </CT.TableBodyS>
                                                </CT.TableWapper>
                                            </WS.FullWapperGap>
                                        </InputCell>
                                    </Row>
                                </TableWapper>
                            </TableContainer>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`로고 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                ReturnCallback={() =>
                                    console.debug('ReturnCallback')
                                }
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`장소 이미지`} />
                        </LabelCell>
                        <InputCell>
                            <VaryImageUpload
                                ReturnCallback={() =>
                                    console.debug('ReturnCallback')
                                }
                            />
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            <DPS.ButtonBox>
                <DPS.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`취소`}
                        HandleClick={() => {
                            console.debug('HandleClick')
                        }}
                    />
                </DPS.ButtonItem>
                <DPS.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`확인`}
                        HandleClick={() => {
                            console.debug('HandleClick')
                        }}
                    />
                </DPS.ButtonItem>
            </DPS.ButtonBox>
            {pageState.modal.postcode && (
                <KaKaoPostCodeModal
                    Complete={address => {
                        setPageState(prevState => ({
                            ...prevState,
                            address: {
                                ...prevState.address,
                                fullAddress: address.fullAddress
                                    ? address.fullAddress
                                    : '',
                                lat: address.y ? address.y : '',
                                lng: address.x ? address.x : '',
                            },
                            modal: {
                                ...prevState.modal,
                                postcode: false,
                            },
                        }))
                    }}
                />
            )}
            {pageState.modal.kakaomap && (
                <KaKaoMapModal
                    Lat={Number(pageState.address.lat)}
                    Lng={Number(pageState.address.lng)}
                    MarkeName={pageState.title}
                    Complete={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                kakaomap: false,
                            },
                        }))
                    }}
                />
            )}
        </DPS.DetailContainer>
    )
}

export default UhealthzoneDetailTable
