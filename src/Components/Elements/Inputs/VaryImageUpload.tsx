import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commonFileImg } from '@Service/CommonService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { VaryButton, VaryModal } from '@Elements'
import { isEmpty } from 'lodash'

const initializeState = {
    SelectFile: null,
    SelectFileName: '',
    SelectImagePrev: null,
    ATCHMNFL_NO: null,
    Category: '',
    PrevModal: false,
}

const VaryImageUpload = ({
    Image,
    ReturnCallback,
}: {
    Image?: {
        AtchmnflPath: string
        OrginlFileNm: string
        Category: string | 'MISN' | 'INST'
    }
    ReturnCallback: ({ ATCHMNFL_NO }: { ATCHMNFL_NO: number }) => void
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        SelectFile: File | null
        SelectFileName: string
        SelectImagePrev: string | null
        ATCHMNFL_NO: number | null
        Category: string
        PrevModal: boolean
    }>(initializeState)

    const handleChangeSelectImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = (e.target.files as FileList)[0]

        if (e.target.files && e.target.files.length > 0) {
            setPageState(prevState => ({
                ...prevState,
                SelectFile: file,
                SelectFileName: file.name,
            }))
        }
    }

    const handleFileInsert = useCallback(async () => {
        if (pageState.SelectFile) {
            const formData = new FormData()
            formData.append('file', pageState.SelectFile)

            const { status, payload } = await commonFileImg(
                formData,
                pageState.Category
            )

            if (status) {
                ReturnCallback({ ATCHMNFL_NO: payload.ATCHMNFL_NO })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.imageProcessFail,
                })
            }
        }
        // FIXME : 종속성에서 ReturnCallback 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handlMainAlert, pageState.SelectFile])

    useEffect(() => {
        if (pageState.SelectFile) {
            const objectUrl = URL.createObjectURL(pageState.SelectFile)
            setPageState(prevState => ({
                ...prevState,
                SelectImagePrev: objectUrl,
            }))

            handleFileInsert().then()
        }
    }, [handleFileInsert, pageState.SelectFile])

    useEffect(() => {
        const funcSetImage = () => {
            if (Image && !isEmpty(Image.OrginlFileNm)) {
                setPageState(prevState => ({
                    ...prevState,
                    SelectFileName: Image.OrginlFileNm,
                }))
            }

            if (Image && !isEmpty(Image.AtchmnflPath)) {
                setPageState(prevState => ({
                    ...prevState,
                    SelectImagePrev: `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${Image.AtchmnflPath}`,
                }))
            }

            if (Image && !isEmpty(Image.Category)) {
                setPageState(prevState => ({
                    ...prevState,
                    Category: Image.Category,
                }))
            }
        }

        funcSetImage()
    }, [Image])

    return (
        <div className="flex w-full">
            <div className="w-1/3">
                <div className="flex bg-gray-50">
                    {pageState.SelectImagePrev && (
                        <section className="hero container max-w-screen-lg mx-auto cursor-pointer">
                            {pageState.SelectImagePrev && (
                                <img
                                    className="mx-auto"
                                    alt="prev-image"
                                    src={pageState.SelectImagePrev}
                                    onClick={() => {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            PrevModal: true,
                                        }))
                                    }}
                                />
                            )}
                        </section>
                    )}
                </div>
            </div>
            <div className="w-2/3">
                <input
                    className="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    id="small_size"
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeSelectImage(e)
                    }
                />
                <div className="text-xs">
                    확장자 : JPG, JPEG, PNG / 사이즈 : 600 x 200px / 최대용량 :
                    10mb
                </div>
                <VaryButton
                    ButtonType={`default`}
                    ButtonName={`삭제`}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            SelectFile: null,
                            SelectFileName: '',
                            SelectImagePrev: null,
                            ATCHMNFL_NO: null,
                            PrevModal: false,
                        }))

                        if (inputRef.current != null) {
                            inputRef.current.value = ''
                        }
                    }}
                />
            </div>
            {pageState.PrevModal && (
                <VaryModal
                    ModalLoading={false}
                    MaxWidth={'lg'}
                    Children={
                        <>
                            <section className="hero container max-w-screen-lg mx-auto cursor-pointer">
                                {pageState.SelectImagePrev && (
                                    <img
                                        className="mx-auto"
                                        alt="prev-image"
                                        src={pageState.SelectImagePrev}
                                    />
                                )}
                            </section>
                        </>
                    }
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                HandleClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        PrevModal: false,
                                    }))
                                }}
                                ButtonName={'닫기'}
                            />
                        </>
                    }
                />
            )}
        </div>
    )
}

export default VaryImageUpload
