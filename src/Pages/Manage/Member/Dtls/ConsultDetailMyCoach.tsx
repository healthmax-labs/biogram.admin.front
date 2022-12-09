import { VaryDatepickerInput, DefaultManageButton } from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const { Detail } = ConsultDetailStyle

const ConsultDetailMyCoach = () => {
    return (
        <Detail.Container>
            <div className="flex flex-nowrap w-full border">
                <div className="flex py-2 items-center w-full justify-end">
                    <div className="flex py-2">
                        <VaryDatepickerInput
                            CallBackReturn={e => {
                                const dateObj = gmtTimeToTimeObject(e)
                                console.debug(dateObj)
                            }}
                        />
                        ~
                        <VaryDatepickerInput
                            CallBackReturn={e => {
                                const dateObj = gmtTimeToTimeObject(e)
                                console.debug(dateObj)
                            }}
                        />
                    </div>
                    <div className="flex py-2">
                        <DefaultManageButton
                            ButtonName={'조회'}
                            ButtonClick={() =>
                                console.debug('DefaultManageButton')
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full border py-4 items-center">
                <div className="flex w-full border h-8 text-center text-xs items-center justify-center">
                    차트
                </div>
            </div>
            <div className="">
                <Detail.RawAge.Table.Table>
                    <Detail.RawAge.Table.Thead>
                        <Detail.RawAge.Table.TheadRow>
                            <Detail.RawAge.Table.TheadCell></Detail.RawAge.Table.TheadCell>
                            <Detail.RawAge.Table.TheadCell>
                                섭취 칼로리
                            </Detail.RawAge.Table.TheadCell>
                            <Detail.RawAge.Table.TheadCell>
                                소비 칼로리
                            </Detail.RawAge.Table.TheadCell>
                        </Detail.RawAge.Table.TheadRow>
                        <Detail.RawAge.Table.TheadRow>
                            <Detail.RawAge.Table.TheadYCell>
                                권장 칼로리
                            </Detail.RawAge.Table.TheadYCell>
                            <Detail.RawAge.Table.TheadYCell>
                                1500
                            </Detail.RawAge.Table.TheadYCell>
                            <Detail.RawAge.Table.TheadYCell>
                                245
                            </Detail.RawAge.Table.TheadYCell>
                        </Detail.RawAge.Table.TheadRow>
                    </Detail.RawAge.Table.Thead>
                    <Detail.RawAge.Table.Body>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-09
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                1500
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                245
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-08
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                1500
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                200
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-07
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                -
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                200
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-06
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                -
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                245
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-05
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                1400
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                200
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-04
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                1400
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                200
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                        <Detail.RawAge.Table.Row>
                            <Detail.RawAge.Table.Cell>
                                2022-12-03
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                1400
                            </Detail.RawAge.Table.Cell>
                            <Detail.RawAge.Table.Cell>
                                200
                            </Detail.RawAge.Table.Cell>
                        </Detail.RawAge.Table.Row>
                    </Detail.RawAge.Table.Body>
                    <Detail.RawAge.Table.TFoot>
                        <Detail.RawAge.Table.TFootRow>
                            <Detail.RawAge.Table.TFootCell>
                                평균
                            </Detail.RawAge.Table.TFootCell>
                            <Detail.RawAge.Table.TFootCell>
                                1400
                            </Detail.RawAge.Table.TFootCell>
                            <Detail.RawAge.Table.TFootCell>
                                200
                            </Detail.RawAge.Table.TFootCell>
                        </Detail.RawAge.Table.TFootRow>
                    </Detail.RawAge.Table.TFoot>
                </Detail.RawAge.Table.Table>
            </div>
        </Detail.Container>
    )
}

export default ConsultDetailMyCoach
