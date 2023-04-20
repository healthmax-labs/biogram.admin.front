import React, { useRef, useEffect, useState } from 'react'
import { VaryButton, VaryModal } from '@Element/index'
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
    const componentRef = React.useRef(null)

    const onBeforeGetContentResolve = React.useRef<any>(null)

    const [loading, setLoading] = React.useState(false)

    const handleAfterPrint = React.useCallback(() => {
        CloseModal()
    }, [CloseModal])

    const handleBeforePrint = React.useCallback(() => {
        //
    }, [])

    const handleOnBeforeGetContent = React.useCallback(() => {
        setLoading(true)

        return new Promise<void>(resolve => {
            onBeforeGetContentResolve.current = resolve

            setTimeout(() => {
                setLoading(false)
                resolve()
            }, 1000)
        })
    }, [setLoading])

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current
    }, [])

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: '상담차트',
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true,
    })

    React.useEffect(() => {
        if (typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current()
        }
    }, [onBeforeGetContentResolve])

    useEffect(() => {
        handlePrint()
    }, [handlePrint])

    return (
        <>
            <VaryModal
                ModalLoading={loading}
                NeedMax={false}
                MaxWidth={'xl6'}
                Children={
                    <>
                        <ReactToPrint content={() => componentRef.current} />
                        <Container ref={componentRef}>
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
                                    <Text>추후계획</Text>
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
