import React, { useEffect, useRef, useState } from 'react'
import { VaryModal } from '@Element/index'
import { ConsultChartPrintModalStyle } from '@Style/Elements/ModalStyles'
import ReactToPrint, { useReactToPrint } from 'react-to-print'

const {
    Container,
    RowWapper,
    EmptyRow,
    FlexRow,
    TitleRow,
    LabelBox,
    ValueBox,
    Text,
    Contents,
} = ConsultChartPrintModalStyle

const ConsultChartPrintModal = ({
    MemberName,
    BirthDate,
    ConsultDate,
    AuthorName,
    History,
    Planning,
    CloseModal,
}: {
    MemberName: string
    BirthDate: string
    ConsultDate: string
    AuthorName: string
    History: string
    Planning: string
    CloseModal: () => void
}) => {
    const [isPrinting, setIsPrinting] = useState<boolean>(false)
    const printRef = useRef<any>(null)

    // We store the resolve Promise being used in `onBeforeGetContent` here
    const promiseResolveRef = useRef<any>(null)

    // We watch for the state to change here, and for the Promise resolve to be available
    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
            promiseResolveRef.current()
        }
    }, [isPrinting])

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: '상담차트',
        onBeforeGetContent: () => {
            return new Promise(resolve => {
                promiseResolveRef.current = resolve
                setIsPrinting(true)
            })
        },
        onAfterPrint: () => {
            // Reset the Promise resolve so we can print again
            promiseResolveRef.current = null
            setIsPrinting(false)
            CloseModal()
        },
    })

    useEffect(() => {
        handlePrint()
    }, [handlePrint])

    return (
        <>
            <VaryModal
                ModalLoading={false}
                NeedMax={false}
                MaxWidth={'xl6'}
                Children={
                    <>
                        <ReactToPrint content={() => printRef.current} />
                        <Container ref={printRef}>
                            <RowWapper>
                                <FlexRow>
                                    <LabelBox>
                                        <Text>회원명</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text>{`${MemberName}`}</Text>
                                    </ValueBox>
                                    <LabelBox>
                                        <Text>생년월일</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text>{`${BirthDate}`}</Text>
                                    </ValueBox>
                                </FlexRow>
                                <FlexRow>
                                    <LabelBox>
                                        <Text>상담일자</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text>{`${ConsultDate}`}</Text>
                                    </ValueBox>
                                    <LabelBox>
                                        <Text>담당자</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text>{`${AuthorName}`}</Text>
                                    </ValueBox>
                                </FlexRow>
                            </RowWapper>
                            <RowWapper>
                                <TitleRow>
                                    <Text>상담내역</Text>
                                </TitleRow>
                                <FlexRow>
                                    <Contents>{`${History}`}</Contents>
                                </FlexRow>
                            </RowWapper>
                            <RowWapper>
                                <TitleRow>
                                    <Text>비고</Text>
                                </TitleRow>
                                <FlexRow>
                                    <Contents>{`${Planning}`}</Contents>
                                </FlexRow>
                            </RowWapper>
                            <EmptyRow></EmptyRow>
                            <RowWapper>
                                <FlexRow>
                                    <LabelBox>
                                        <Text>서비스 이용자(확인)</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text></Text>
                                    </ValueBox>
                                    <LabelBox>
                                        <Text>담당자 (확인)</Text>
                                    </LabelBox>
                                    <ValueBox>
                                        <Text></Text>
                                    </ValueBox>
                                </FlexRow>
                            </RowWapper>
                        </Container>
                    </>
                }
            />
        </>
    )
}

export default ConsultChartPrintModal
