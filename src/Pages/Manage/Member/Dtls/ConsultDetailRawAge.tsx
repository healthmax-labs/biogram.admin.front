import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const { Detail } = ConsultDetailStyle

const ConsultDetailRawAge = () => {
    return (
        <Detail.Container>
            <div className="flex flex-nowrap w-full pt-2">
                <div className="flex text-lg items-center text-gray-500 font-semibold">
                    <div className="">
                        아무개 님의 현재 나이는 44.2 세 입니다.
                    </div>
                </div>
            </div>
            <div className="flex flex-nowrap pt-4">
                <div className="text-sm text-gray-500">대사나이</div>
            </div>

            <div className="flex pt-4">
                <div className="text-sm text-gray-500">종합분석 평가</div>
            </div>
            <div className="flex pt-5">
                <div className="grid grid-cols-1 gap-1">
                    <div className="text-xs text-gray-500 w-6/12">
                        대사증후군 자가 진단 기분 5가지 가운데 아무개님은 해당
                        사항이 없는 정상 상태입니다. 허리둘레, 혈당, 혈압은
                        신진대사에 관여하여 당노병, 고혈압, 심장병, 뇌졸증 등
                        만성 질환의 발생에 영향을 줌
                    </div>
                </div>
            </div>
            <div className="pt-3">
                <div className="flex w-full items-end justify-end">
                    <div className="text-xs text-gray-500">(단위: 나이)</div>
                </div>
                <div className="w-full">
                    <Detail.RawAge.Table.Table>
                        <Detail.RawAge.Table.Thead>
                            <Detail.RawAge.Table.TheadRow>
                                <Detail.RawAge.Table.TheadCell>
                                    날짜
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    대사나이
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    혈압
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    혈당
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    복부비만
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    동맥경화
                                </Detail.RawAge.Table.TheadCell>
                            </Detail.RawAge.Table.TheadRow>
                        </Detail.RawAge.Table.Thead>
                        <Detail.RawAge.Table.Body>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-09
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    51.8(-2.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.1
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-09
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    51.8(-2.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.1
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-08
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    41(-3.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.2
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                        </Detail.RawAge.Table.Body>
                    </Detail.RawAge.Table.Table>
                </div>
            </div>
            <div className="flex flex-nowrap pt-4">
                <div className="text-sm text-gray-500">비만나이</div>
            </div>

            <div className="flex pt-4">
                <div className="text-sm text-gray-500">종합분석 평가</div>
            </div>
            <div className="flex pt-5">
                <div className="grid grid-cols-1 gap-1">
                    <div className="text-xs text-gray-500 w-6/12">
                        ** 님의 비만체형나이는 주민등록나이에 비해 적습니다.
                        비만체형의 나이가 적다는 것은 주민등록나이가 같은
                        사람들에 비해 노화가 느리게 진행되어 체형이 좋다는
                        의미입니다. 비만체형나이는 비만체형에 관련된 임상검사에
                        따른 생체나이로 동년배와 비교해 비만체형 상태를
                        의미합니다.
                    </div>
                </div>
            </div>
            <div className="pt-3">
                <div className="flex w-full items-end justify-end">
                    <div className="text-xs text-gray-500">(단위: 나이)</div>
                </div>
                <div className="w-full">
                    <Detail.RawAge.Table.Table>
                        <Detail.RawAge.Table.Thead>
                            <Detail.RawAge.Table.TheadRow>
                                <Detail.RawAge.Table.TheadCell>
                                    날짜
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    대사나이
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    형압
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    혈당
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    복부비만
                                </Detail.RawAge.Table.TheadCell>
                                <Detail.RawAge.Table.TheadCell>
                                    동맥경화
                                </Detail.RawAge.Table.TheadCell>
                            </Detail.RawAge.Table.TheadRow>
                        </Detail.RawAge.Table.Thead>
                        <Detail.RawAge.Table.Body>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-09
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    51.8(-2.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.1
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-09
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    51.8(-2.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.1
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Row>
                                <Detail.RawAge.Table.Cell>
                                    2022-12-08
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    41(-3.4)
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell>
                                    -0.2
                                </Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                                <Detail.RawAge.Table.Cell></Detail.RawAge.Table.Cell>
                            </Detail.RawAge.Table.Row>
                        </Detail.RawAge.Table.Body>
                    </Detail.RawAge.Table.Table>
                </div>
            </div>
        </Detail.Container>
    )
}

export default ConsultDetailRawAge
