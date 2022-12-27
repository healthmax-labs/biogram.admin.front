import React, { useState } from 'react'
import {
    ConfirmModal,
    ReactQuillEditor,
    VaryButton,
    VaryModal,
} from '@Elements'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { VaryInput, VaryLabel } from '@Element/index'
import { DetailPageStyle as DPS } from '@Style/Pages/ManagerPageStyle'
import Messages from '@Messages'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    InputItem,
    QuilEditorLabelCell,
    QuilEditorCell,
} = DetailTableStyle

const initializeState = {
    modal: {
        updateConfirm: false,
        deleteConfirm: false,
        history: false,
    },
}

const sampleText = `
수집 및 이용 목적....<br />
1. 회원제 서비스 이용에 따른 가입 및 본인 식별<br />
2. 신체 정보 기반 개인 맞춤형 통합 건강관리 서비스 제공<br />
<br />
수집 및 이용하는 개인정보 항목<br />
1. 회원정보 : ID, 이름, 비밀번호, CI (본인 인증 정보), 성별, 전화번호, 휴대전화번호, 이용자 e-mai 주소, 생년월일<br />
<br />
2. 설문을 통한 복약 여부 및 생활습관 정보: 흡연여부 및 흡연량, 음주여부 및 음주량, 음주횟수, 운동 습관, 식사 습관<br />
<br />
3. 지정맥 정보 (지정맥을 통한 등록 시)<br />
<br />
4. 디바이스를 통해 측정되고 분석된 정보<br />
-체성분: 체중, 체지방률, 체지방량, 제지방량, 근육량, 체수분량, 체수분율, 기초대사량, 추정골량, BMI, WHR, 내장지방레벨<br />
-혈압: 수축기, 이완기<br />
-혈액: 혈당(식전,후), 콜레스테롤(TC, TG, HDL-C, LDL-C)<br />
-스트레스: 스트레스 점수, 신체적 스트레스, 정신적 스트레스, 스트레스 대처능력<br />
-혈관: 혈관단계, 박출강도, 탄성도, 잔혈량<br />
-활동량 정보: 걸음 수, 칼로리 소모량, 보행 거리, 보행 시간, 실시간 심박<br />
-기타 정보: 신장, 허리둘레, 체온, 섭취 식단 정보, 위치 정보(GPS), 측정 일자<br />
<br />
5. 사용 디바이스 정보 : 기기 모델 번호, 소프트웨어 플랫폼 버전, IP address, 서비스를 위한 registration id, 접속 로그, 외부기기의 device id<br />
<br />
보유 및 이용 기간<br />
-바이오그램 서비스 종료일 혹은 탈퇴일로부터 5년까지<br />
<br />
*동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익 내용: 수집하는 개인정보에 대해 동의를 거부할 권리가 있으며 동의 거부 시에는 회원가입이 제한됩니다.<br />
<br />
`

const StplatDetailTable = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            updateConfirm: boolean
            deleteConfirm: boolean
            history: boolean
        }
    }>(initializeState)

    return (
        <DPS.DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관명`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'약관명'}
                                Value={``}
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`버전`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'약관명'}
                                Value={``}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관 소속`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'약관명'}
                                Value={``}
                            />
                        </InputCell>
                        <LabelCell>
                            <VaryLabel LabelName={`최종 수정자`} />
                        </LabelCell>
                        <InputCell>
                            <VaryInput
                                Width={'w64'}
                                InputType={'text'}
                                HandleOnChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => console.debug(e)}
                                id={'id'}
                                Placeholder={'약관명'}
                                Value={``}
                            />
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`등록일`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <InputItem>
                                <div className="flex items-center h-8 text-xs text-gray-500">
                                    2021-07-13
                                </div>
                            </InputItem>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`시행일`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <InputItem>
                                <div className="flex items-center h-8 text-xs text-gray-500">
                                    2021-07-13
                                </div>
                            </InputItem>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`약관 변경 사유`} />
                        </LabelCell>
                        <InputCell colSpan={3}>
                            <div className="flex flex-nowrap w-1/2 items-center">
                                <div className="grow">
                                    <VaryInput
                                        Width={'w96'}
                                        InputType={'text'}
                                        HandleOnChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => console.debug(e)}
                                        id={'id'}
                                        Placeholder={'약관명'}
                                        Value={``}
                                    />
                                </div>
                                <div className="grow text-sm text-gray-500">
                                    23/50
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <QuilEditorLabelCell>
                            <VaryLabel LabelName={`약관 내용`} />
                        </QuilEditorLabelCell>
                        <QuilEditorCell colSpan={3}>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="grow">
                                    <ReactQuillEditor />
                                </div>
                            </div>
                        </QuilEditorCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            <DPS.Stplat.ButtonBox>
                <DPS.Stplat.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`취소`}
                        HandleClick={() => {
                            console.debug('HandleClick')
                        }}
                    />
                </DPS.Stplat.ButtonItem>
                <DPS.Stplat.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`수정`}
                        HandleClick={() => {
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    updateConfirm: true,
                                },
                            }))
                        }}
                    />
                </DPS.Stplat.ButtonItem>
                <DPS.Stplat.ButtonItem>
                    <VaryButton
                        BgColor={`mBBlue`}
                        Name={`삭제`}
                        HandleClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    deleteConfirm: true,
                                },
                            }))
                        }
                    />
                </DPS.Stplat.ButtonItem>
            </DPS.Stplat.ButtonBox>
            <DPS.Stplat.Table.Wapper>
                <DPS.Stplat.Table.Head>
                    <DPS.Stplat.Table.HeadRow>
                        <DPS.Stplat.Table.HeadCell colSpan={3}>
                            약관 변경 히스트리
                        </DPS.Stplat.Table.HeadCell>
                        <DPS.Stplat.Table.HeadCell>
                            양관 변경 사유
                        </DPS.Stplat.Table.HeadCell>
                    </DPS.Stplat.Table.HeadRow>
                </DPS.Stplat.Table.Head>
                <DPS.Stplat.Table.Body>
                    <DPS.Stplat.Table.BodyRow
                        onClick={() =>
                            setPageState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    history: true,
                                },
                            }))
                        }>
                        <DPS.Stplat.Table.BodyCell>
                            Ver.1
                        </DPS.Stplat.Table.BodyCell>
                        <DPS.Stplat.Table.BodyCell>
                            변경일
                        </DPS.Stplat.Table.BodyCell>
                        <DPS.Stplat.Table.BodyCell>
                            2021-07-12
                        </DPS.Stplat.Table.BodyCell>
                        <DPS.Stplat.Table.BodyCell>
                            개인정보 수집 및 이용
                        </DPS.Stplat.Table.BodyCell>
                    </DPS.Stplat.Table.BodyRow>
                </DPS.Stplat.Table.Body>
            </DPS.Stplat.Table.Wapper>

            {pageState.modal.updateConfirm && (
                <ConfirmModal
                    Title={Messages.Default.updateConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                updateConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                updateConfirm: false,
                            },
                        }))
                    }}
                />
            )}

            {pageState.modal.deleteConfirm && (
                <ConfirmModal
                    Title={Messages.Default.deleteConfirm}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                deleteConfirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                deleteConfirm: false,
                            },
                        }))
                    }}
                />
            )}

            {pageState.modal.history && (
                <VaryModal
                    ModalLoading={false}
                    Children={
                        <>
                            <div className="rounded overflow-hidden">
                                <div className="px-6 py-4">
                                    <p className="text-gray-700 text-xs text-justify">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: sampleText,
                                            }}></div>
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                    MaxWidth={'xl4'}
                    Buttons={
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`닫기`}
                            HandleClick={() =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        history: false,
                                    },
                                }))
                            }
                        />
                    }
                />
            )}
        </DPS.DetailContainer>
    )
}

export default StplatDetailTable
