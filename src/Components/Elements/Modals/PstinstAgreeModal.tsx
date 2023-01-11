import { VaryButton, VaryLabelCheckBox, VaryModal } from '@Element/index'
import { StplatInfoItem } from '@CommonTypes'
import React, { useEffect, useState } from 'react'
import { PstinstAgreeModalStyle } from '@Style/Elements/ModalStyles'
import { getCommonThptyStplatInfo } from '@Service/CommonService'
import { ThptyStplatInfoInterface } from '@Type/MemberTypes'
import { get } from 'lodash'
import Codes from '@Codes'

const {
    Container,
    ItemGrid,
    ItemRow,
    AgreeItemCard,
    AgreeItemTitle,
    AgreeItemContent,
    AgreeItemCheckBox,
    AllAgreeButton,
} = PstinstAgreeModalStyle

const initializeState = {
    stplatInfoList: [],
    checkStplatInfo: {
        INDVDLINFO_THIRD_AGRE_AT: 'N',
        SNSTIIVEINFO_THIRD_AGRE_AT: 'N',
    },
    allCheck: false,
}

const PstinstAgreeModal = ({
    infoNo,
    HandleClickCancleButtion,
    HandleClickApplyButton,
}: {
    infoNo: number | null
    HandleClickCancleButtion: () => void
    HandleClickApplyButton: (e: ThptyStplatInfoInterface) => void
}) => {
    const [pageState, setPageState] = useState<{
        stplatInfoList: StplatInfoItem[]
        checkStplatInfo: ThptyStplatInfoInterface
        allCheck: boolean
    }>(initializeState)

    useEffect(() => {
        const funcStartGet = async () => {
            if (infoNo) {
                const { status, payload } = await getCommonThptyStplatInfo({
                    infoNo: infoNo,
                })
                if (status) {
                    const { THPTY_STPLAT_INFO_LIST } = payload
                    setPageState(prevState => ({
                        ...prevState,
                        stplatInfoList: THPTY_STPLAT_INFO_LIST,
                    }))
                } else {
                    //
                }
            } else {
                HandleClickCancleButtion()
            }
        }

        funcStartGet().then()
    }, [HandleClickCancleButtion, infoNo])

    useEffect(() => {
        const checkStplatInfo = Object.entries(pageState.checkStplatInfo)
        const filtered = checkStplatInfo.filter(([, value]) => value === 'Y')

        setPageState(prevState => ({
            ...prevState,
            allCheck:
                filtered.length ===
                Object.keys(initializeState.checkStplatInfo).length,
        }))
    }, [pageState.checkStplatInfo])
    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={false}
                Children={
                    <Container>
                        <ItemGrid>
                            {pageState.stplatInfoList.length > 0 &&
                                pageState.stplatInfoList.map(
                                    (el: StplatInfoItem, i) => {
                                        const { code } = get(
                                            Codes.memberStplats.code,
                                            el.STPLAT_KND_CODE
                                        )

                                        const check = get(
                                            pageState.checkStplatInfo,
                                            code
                                        )

                                        return (
                                            <ItemRow
                                                key={`stplat-info-agree-modal-item-row-${i}`}>
                                                <AgreeItemCard>
                                                    <AgreeItemTitle>{`${String(
                                                        i + 1
                                                    ).padStart(2, '0')}. ${
                                                        el.STPLAT_KND_CODE_NM
                                                    }`}</AgreeItemTitle>
                                                    <AgreeItemContent>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: el.STPLAT_DC,
                                                            }}></div>
                                                    </AgreeItemContent>
                                                    <AgreeItemCheckBox>
                                                        <VaryLabelCheckBox
                                                            LabelName={`약관 동의`}
                                                            Checked={
                                                                check === 'Y'
                                                            }
                                                            HandleOnChange={e => {
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        checkStplatInfo:
                                                                            {
                                                                                ...prevState.checkStplatInfo,
                                                                                [code]: e
                                                                                    .target
                                                                                    .checked
                                                                                    ? 'Y'
                                                                                    : 'N',
                                                                            },
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
                        <AllAgreeButton>
                            <VaryLabelCheckBox
                                LabelName={`모든 약관에 동의 합니다.`}
                                Checked={pageState.allCheck}
                                HandleOnChange={e => {
                                    const result = Object.keys(
                                        pageState.checkStplatInfo
                                    ).reduce((acc, key) => {
                                        return {
                                            ...acc,
                                            [key]: e.target.checked ? 'Y' : 'N',
                                        }
                                    }, {})

                                    setPageState(prevState => ({
                                        ...prevState,
                                        checkStplatInfo:
                                            result as ThptyStplatInfoInterface,
                                    }))
                                }}
                            />
                        </AllAgreeButton>
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
                            ButtonName={'소속추가'}
                        />
                    </>
                }
            />
        </>
    )
}

export default PstinstAgreeModal
