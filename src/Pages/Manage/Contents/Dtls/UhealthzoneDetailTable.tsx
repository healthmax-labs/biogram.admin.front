import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    DaumPostCodeModal,
    PstinstSelectBox,
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryLabelInput,
} from '@Elements'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ContentsPageStyle'

const { TableContainer, TableWapper, Row, LabelCell, InputCell, InputCellGap } =
    DetailTableStyle

const { DetailContainer } = DetailPageStyle

const initializeState = {
    modal: {
        postcode: false,
    },
}

const UhealthzoneDetailTable = ({
    pageMode,
}: {
    pageMode: `new` | `modify`
}) => {
    const params = useParams<{ UhealthZoneNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        modal: {
            postcode: boolean
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
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    {pageMode === 'modify' && (
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`소속코드`} />
                            </LabelCell>
                            <InputCell>
                                <div className="flex flex-nowrap w-full items-center">
                                    <div className="w-2/4">
                                        <VaryInput
                                            Bg={`white`}
                                            ReadOnly={true}
                                            InputType={'text'}
                                            HandleOnChange={() =>
                                                console.debug('HandleOnChange')
                                            }
                                            id={'id'}
                                            Placeholder={'가입일자'}
                                            Value={`${params.UhealthZoneNo}`}
                                        />
                                    </div>
                                </div>
                            </InputCell>
                        </Row>
                    )}
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`지점명`} />
                        </LabelCell>
                        <InputCellGap>
                            <VaryInput
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'지점명'}
                                Value={``}
                            />
                            <VaryButton
                                Name={`지점 중복확인`}
                                HandleClick={() => console.debug('VaryButton')}
                            />
                        </InputCellGap>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`소속 위치`} />
                        </LabelCell>
                        <InputCell>
                            <div className="w-full items-center">
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
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`전화번호`} />
                        </LabelCell>
                        <InputCellGap>
                            <VaryInput
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'전화번호'}
                                Value={``}
                            />
                        </InputCellGap>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`주소 정보`} />
                        </LabelCell>
                        <InputCell>
                            <div className="">
                                <div className="flex flex-nowrap">
                                    <div className="">
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
                                    </div>
                                    <div className="">
                                        <VaryInput
                                            InputType={'text'}
                                            HandleOnChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => console.debug(e)}
                                            id={'id'}
                                            Placeholder={'주소를 입력해 주세요'}
                                            Value={``}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-nowrap">
                                    <div className="flex flex-nowrap w-full">
                                        <div className="w-1/12">
                                            <VaryLabelInput
                                                LabelName="위도"
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                                InputValue={''}
                                            />
                                        </div>
                                        <div className="w-1/6">
                                            <VaryLabelInput
                                                LabelName="경도"
                                                HandleOnChange={() =>
                                                    console.debug(
                                                        'HandleOnChange'
                                                    )
                                                }
                                                InputValue={''}
                                            />
                                        </div>

                                        <div className="w-4/6">
                                            (구글 지도에 해당위치를 우클릭 후
                                            위/경도를 입력해 주세요)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            {pageState.modal.postcode && (
                <DaumPostCodeModal
                    Complete={address => {
                        console.debug(address)
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                postcode: false,
                            },
                        }))
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default UhealthzoneDetailTable
