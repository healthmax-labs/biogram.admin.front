import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commonFileImg, commonFileDelete } from '@Service/CommonService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hooks'
import { VaryButton, VaryModal } from '@Elements'
import { isEmpty } from 'lodash'
import { VaryImageUploadStyle } from '@Style/Elements/InputStyles'
import Codes from '@Codes'
import _ from 'lodash'

const { FileInputWapper } = VaryImageUploadStyle

const initializeState = {
    SelectFile: null,
    SelectFileName: '',
    SelectImagePrev: null,
    ATCHMNFL_NO: null,
    Category: '',
    PrevModal: false,
    OrginlFileNm: '',
}

const VaryImageUpload = ({
    Image,
    ReturnCallback,
    ShowInform = true,
    HandleDelete,
    ShowDeleteButton = true,
    ShowPrevBox = true,
    ShowFileName,
    Disabled,
    HideInput = false,
}: {
    Image?: {
        AtchmnflPath: string
        OrginlFileNm: string
        Category: string | 'MISN' | 'INST'
    }
    ReturnCallback: ({ ATCHMNFL_NO }: { ATCHMNFL_NO: number }) => void
    ShowInform?: boolean
    HandleDelete?: () => void
    ShowDeleteButton?: boolean
    ShowPrevBox?: boolean
    ShowFileName?: boolean
    Disabled?: boolean
    HideInput?: boolean
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
        OrginlFileNm: string
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
                OrginlFileNm: file.name,
            }))
        }
    }

    const handleFileInsert = useCallback(async () => {
        if (pageState.SelectFile && pageState.SelectFileName) {
            const fileExtentionName = pageState.SelectFileName.split('.')
                .pop()
                ?.toUpperCase()

            const FileExtensionCode = _.findKey(
                Codes.FileUploadExtensionCode,
                item => item.indexOf(`${fileExtentionName}`) !== -1
            )
                ? _.findKey(
                      Codes.FileUploadExtensionCode,
                      item => item.indexOf(`${fileExtentionName}`) !== -1
                  )
                : ``

            if (fileExtentionName && FileExtensionCode) {
                const formData = new FormData()
                formData.append('file', pageState.SelectFile)

                const { status, payload } = await commonFileImg(
                    formData,
                    pageState.Category,
                    FileExtensionCode
                )

                if (status) {
                    setPageState(prevState => ({
                        ...prevState,
                        ATCHMNFL_NO: payload.ATCHMNFL_NO,
                    }))
                    ReturnCallback({ ATCHMNFL_NO: payload.ATCHMNFL_NO })
                } else {
                    handlMainAlert({
                        state: true,
                        message: Messages.Default.imageProcessFail,
                    })
                }
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
                    OrginlFileNm: Image.OrginlFileNm,
                }))
            }

            if (Image && !isEmpty(Image.AtchmnflPath)) {
                setPageState(prevState => ({
                    ...prevState,
                    SelectImagePrev: `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${Image.AtchmnflPath}`,
                    OrginlFileNm: Image.OrginlFileNm,
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
            {ShowPrevBox && (
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
            )}
            <FileInputWapper WFull={!ShowPrevBox}>
                {!HideInput && (
                    <input
                        className="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        id="small_size"
                        type="file"
                        // accept="image/*"
                        ref={inputRef}
                        disabled={Disabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeSelectImage(e)
                        }
                    />
                )}

                {ShowInform && (
                    <div className="text-xs">
                        확장자 : JPG, JPEG, PNG / 사이즈 : 600 x 200px /
                        최대용량 : 10mb
                    </div>
                )}
                {ShowDeleteButton && (
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`삭제`}
                        HandleClick={async () => {
                            const { status } = await commonFileDelete({
                                atchmnfl_no: `${pageState.ATCHMNFL_NO}`,
                            })

                            if (status) {
                                setPageState(prevState => ({
                                    ...prevState,
                                    SelectFile: null,
                                    SelectFileName: '',
                                    SelectImagePrev: null,
                                    ATCHMNFL_NO: null,
                                    PrevModal: false,
                                    OrginlFileNm: ``,
                                }))

                                if (inputRef.current != null) {
                                    inputRef.current.value = ''
                                }

                                HandleDelete && HandleDelete()
                            }
                        }}
                    />
                )}
                {ShowFileName && pageState.OrginlFileNm.length > 0 && (
                    <div className="w-1/3 pl-2">
                        <div className="flex bg-white">
                            <section className="hero container max-w-screen-lg mx-auto cursor-pointer">
                                <div
                                    className="flex items-center justify-start text-sm"
                                    onClick={() => {
                                        if (pageState.SelectImagePrev) {
                                            window.open(
                                                pageState.SelectImagePrev
                                            )
                                        }
                                    }}>{`${pageState.OrginlFileNm}`}</div>
                            </section>
                        </div>
                    </div>
                )}
            </FileInputWapper>
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
