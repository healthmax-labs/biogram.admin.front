import { VaryButton, VaryLabelCheckBox, VaryModal } from '@Element/index'
import { StplatInfoItem, StplatInfoKndCode } from '@CommonTypes'
import React, { useEffect, useState } from 'react'
import { PstinstAgreeModalStyle } from '@Style/Elements/ModalStyles'
import {
    getCommonThptyStplatInfo,
    getCommonStplatInfo,
} from '@Service/CommonService'
import _ from 'lodash'

const {
    Container,
    ItemGrid,
    ItemRow,
    AgreeItemCard,
    AgreeItemTitle,
    AgreeItemContent,
    AgreeItemCheckBox,
    AllAgreeButtonBox,
} = PstinstAgreeModalStyle

const initializeState = {
    loading: false,
    stplatInfoList: [],
    checkStplatInfo: [],
    allCheck: false,
}

const PstinstAgreeModal = ({
    InfoNo,
    InfoType,
    HandleClickCancleButtion,
    HandleClickApplyButton,
}: {
    InfoNo: number | null
    InfoType: 'thpty' | 'stplat' // '소속 변경시 밑 등록에 필요한 약관' | '회원가입시 필요한 약관'
    HandleClickCancleButtion: () => void
    HandleClickApplyButton: (
        e: Array<{ kndCode: StplatInfoKndCode; check: 'Y' | 'N' }>
    ) => void
}) => {
    const [pageState, setPageState] = useState<{
        loading: boolean
        stplatInfoList: StplatInfoItem[]
        checkStplatInfo: Array<{ kndCode: StplatInfoKndCode; check: 'Y' | 'N' }>
        allCheck: boolean
    }>(initializeState)

    useEffect(() => {
        const funcStartThptyGet = async () => {
            if (InfoNo) {
                const { status, payload } = await getCommonThptyStplatInfo({
                    infoNo: InfoNo,
                })
                if (status) {
                    const { THPTY_STPLAT_INFO_LIST } = payload
                    setPageState(prevState => ({
                        ...prevState,
                        loading: false,
                        checkStplatInfo: THPTY_STPLAT_INFO_LIST.map(info => {
                            return { kndCode: info.STPLAT_KND_CODE, check: 'N' }
                        }),
                        stplatInfoList: THPTY_STPLAT_INFO_LIST,
                    }))
                } else {
                    //
                }
            } else {
                HandleClickCancleButtion()
            }
        }

        const funcStartStplatGet = async () => {
            if (InfoNo) {
                const { status, payload } = await getCommonStplatInfo({
                    infoNo: InfoNo,
                })
                if (status) {
                    const { STPLAT_INFO_LIST } = payload
                    setPageState(prevState => ({
                        ...prevState,
                        checkStplatInfo: STPLAT_INFO_LIST.map(info => {
                            return { kndCode: info.STPLAT_KND_CODE, check: 'N' }
                        }),
                        stplatInfoList: STPLAT_INFO_LIST,
                    }))
                } else {
                    //
                }
            } else {
                HandleClickCancleButtion()
            }
        }

        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }))

        if (InfoType === 'stplat') {
            funcStartStplatGet().then(() =>
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                }))
            )
        } else {
            funcStartThptyGet().then(() =>
                setPageState(prevState => ({
                    ...prevState,
                    loading: false,
                }))
            )
        }
    }, [HandleClickCancleButtion, InfoNo, InfoType])

    useEffect(() => {
        if (pageState.stplatInfoList.length > 0) {
            const checked = _.filter(
                pageState.checkStplatInfo,
                e => e.check === 'Y'
            )

            setPageState(prevState => ({
                ...prevState,
                allCheck: checked.length === pageState.checkStplatInfo.length,
            }))
        }
    }, [pageState.checkStplatInfo, pageState.stplatInfoList.length])

    return (
        <>
            <VaryModal
                ModalLoading={pageState.loading}
                NeedMax={false}
                Children={
                    <Container>
                        <ItemGrid Length={pageState.stplatInfoList.length}>
                            {pageState.stplatInfoList.length > 0 &&
                                pageState.stplatInfoList.map(
                                    (el: StplatInfoItem, i) => {
                                        const check = _.find(
                                            pageState.checkStplatInfo,
                                            { kndCode: el.STPLAT_KND_CODE }
                                        )

                                        return (
                                            <ItemRow
                                                key={`stplat-info-agree-modal-item-row-${i}`}
                                                Length={
                                                    pageState.stplatInfoList
                                                        .length
                                                }>
                                                <AgreeItemCard>
                                                    <AgreeItemTitle>{`${String(
                                                        i + 1
                                                    ).padStart(2, '0')}. ${
                                                        el.STPLAT_KND_CODE_NM
                                                    }`}</AgreeItemTitle>
                                                    <AgreeItemContent>
                                                        <div
                                                            className="wrapper"
                                                            dangerouslySetInnerHTML={{
                                                                __html: el.STPLAT_DC,
                                                            }}></div>
                                                    </AgreeItemContent>
                                                    <AgreeItemCheckBox>
                                                        <VaryLabelCheckBox
                                                            LabelName={`약관 동의`}
                                                            Checked={
                                                                !!(
                                                                    check &&
                                                                    check.check ===
                                                                        'Y'
                                                                )
                                                            }
                                                            HandleOnChange={e => {
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkStplatInfo:
                                                                            prevState.checkStplatInfo.map(
                                                                                ck => {
                                                                                    if (
                                                                                        ck.kndCode ===
                                                                                        el.STPLAT_KND_CODE
                                                                                    ) {
                                                                                        return {
                                                                                            ...ck,
                                                                                            check: e
                                                                                                .target
                                                                                                .checked
                                                                                                ? 'Y'
                                                                                                : 'N',
                                                                                        }
                                                                                    } else {
                                                                                        return ck
                                                                                    }
                                                                                }
                                                                            ),
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </AgreeItemCheckBox>
                                                </AgreeItemCard>
                                            </ItemRow>
                                        )
                                    }
                                )}
                        </ItemGrid>
                        <AllAgreeButtonBox>
                            <VaryLabelCheckBox
                                LabelName={`모든 약관에 동의 합니다.`}
                                Checked={pageState.allCheck}
                                LabelWidth={`w32`}
                                HandleOnChange={e => {
                                    if (e.target.checked) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkStplatInfo:
                                                prevState.checkStplatInfo.map(
                                                    ck => {
                                                        return {
                                                            ...ck,
                                                            check: 'Y',
                                                        }
                                                    }
                                                ),
                                        }))
                                    } else {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkStplatInfo:
                                                prevState.checkStplatInfo.map(
                                                    ck => {
                                                        return {
                                                            ...ck,
                                                            check: 'N',
                                                        }
                                                    }
                                                ),
                                        }))
                                    }
                                }}
                            />
                        </AllAgreeButtonBox>
                    </Container>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'default'}
                            HandleClick={() => HandleClickCancleButtion()}
                            ButtonName={'취소'}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            HandleClick={() =>
                                HandleClickApplyButton(
                                    pageState.checkStplatInfo
                                )
                            }
                            ButtonName={
                                InfoType === 'stplat' ? '회원 가입' : '소속추가'
                            }
                        />
                    </>
                }
            />
        </>
    )
}

export default PstinstAgreeModal
