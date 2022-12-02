import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import React, { useCallback, useEffect, useState } from 'react'
import { StplatInfoItem } from '@CommonTypes'
import { StplatItemInterface } from '@Type/MemberTypes'
import { getStplatInfo } from '@Service/CommonService'
import { DefaultManageButton, VaryLabelCheckBox, VaryModal } from '@Elements'
import { StplatInfoAgreeModalStyle } from '@Style/Elements/FeaturesStyles'
import { get } from 'lodash'
import Codes from '@Codes'

const {
    Container,
    TitleBox,
    ItemGrid,
    ItemRow,
    AgreeItemCard,
    AgreeItemTitle,
    AgreeItemContent,
    AgreeItemCheckBox,
    AllAgreeButton,
} = StplatInfoAgreeModalStyle

const initializeState = {
    stplatInfoList: [],
    checkStplatInfo: {
        USE_STPLAT_AGRE_AT: 'N',
        INDVDLINFO_AGRE_AT: 'N',
        SNSTIIVEINFO_AGRE_AT: 'N',
        INDVDLINFO_THIRD_AGRE_AT: 'N',
        SNSTIIVEINFO_THIRD_AGRE_AT: 'N',
        MARKTINFO_AGRE_AT: 'N',
        MARKTINFO_PURPOSE_AGRE_AT: 'N',
    },
    allCheck: false,
}

const StplatInfoAgreeModal = ({
    CancleButtonClick,
    MemberStplatList,
    CallBackResturn,
}: {
    CancleButtonClick: () => void
    MemberStplatList?: StplatItemInterface
    CallBackResturn: (e: StplatItemInterface) => void
}) => {
    const rootState = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        stplatInfoList: StplatInfoItem[]
        checkStplatInfo: StplatItemInterface
        allCheck: boolean
    }>(initializeState)

    const handleStplatToCheckBox = useCallback(() => {
        if (MemberStplatList) {
            setPageState(prevState => ({
                ...prevState,
                checkStplatInfo: MemberStplatList,
            }))
        }
    }, [MemberStplatList])

    // 동의 하기 버튼 클릭
    const handleClickApplyButton = () => {
        CallBackResturn(pageState.checkStplatInfo)
    }

    useEffect(() => {
        const funcSetStplatInfo = async () => {
            const { status, payload } = await getStplatInfo({
                instNo: rootState.userinfo.INST_NM
                    ? rootState.userinfo.INST_NM
                    : '1000',
            })

            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    stplatInfoList: payload.STPLAT_INFO_LIST,
                }))
            } else {
                // FIXME: error 처리.
            }
        }

        funcSetStplatInfo().then(
            () => MemberStplatList && handleStplatToCheckBox()
        )
    }, [MemberStplatList, handleStplatToCheckBox, rootState.userinfo.INST_NM])

    useEffect(() => {
        if (MemberStplatList) {
            const checkStplatInfo = Object.entries(pageState.checkStplatInfo)
            const filtered = checkStplatInfo.filter(
                ([, value]) => value === 'Y'
            )

            setPageState(prevState => ({
                ...prevState,
                allCheck:
                    filtered.length ===
                    Object.keys(initializeState.checkStplatInfo).length,
            }))
        }
    }, [MemberStplatList, pageState.checkStplatInfo])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={true}
                Children={
                    <Container>
                        <TitleBox>회원 약관 재동의</TitleBox>
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
                                                First={i === 0}
                                                key={`stplat-info-agree-modal-item-row-${i}`}>
                                                <AgreeItemCard>
                                                    <AgreeItemTitle>{`${String(
                                                        i + 1
                                                    ).padStart(2, '0')}. ${
                                                        el.STPLAT_KND_CODE_NM
                                                    }`}</AgreeItemTitle>
                                                    <AgreeItemContent
                                                        First={i === 0}>
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
                                LabelWidth={'w32'}
                                LabelName={`모든 약관에 동의 합니다.`}
                                Checked={pageState.allCheck}
                                HandleOnChange={e => {
                                    if (MemberStplatList) {
                                        const result = Object.keys(
                                            MemberStplatList
                                        ).reduce((acc, key) => {
                                            return {
                                                ...acc,
                                                [key]: e.target.checked
                                                    ? 'Y'
                                                    : 'N',
                                            }
                                        }, {})

                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkStplatInfo:
                                                result as StplatItemInterface,
                                        }))
                                    }
                                }}
                            />
                        </AllAgreeButton>
                    </Container>
                }
                Buttons={
                    <>
                        <DefaultManageButton
                            ButtonClick={() => CancleButtonClick()}
                            ButtonName={'취소'}
                        />
                        <DefaultManageButton
                            ButtonClick={() => handleClickApplyButton()}
                            ButtonName={'동의하기'}
                        />
                    </>
                }
            />
        </>
    )
}

export default StplatInfoAgreeModal
