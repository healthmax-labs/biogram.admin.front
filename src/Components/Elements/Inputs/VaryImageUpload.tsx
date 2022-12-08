import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commonFileInst } from '@Service/CommonService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { VaryButton } from '@Element/index'
import { isEmpty } from 'lodash'

const initializeState = {
    SelectFile: null,
    SelectFileName: '',
    SelectImagePrev: null,
    ATCHMNFL_NO: null,
}

const VaryImageUpload = ({
    Image,
    ReturnCallback,
}: {
    Image?: {
        AtchmnflPath: string
        OrginlFileNm: string
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

            const { status, payload } = await commonFileInst(formData)

            if (status) {
                ReturnCallback({ ATCHMNFL_NO: payload.ATCHMNFL_NO })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
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
                    SelectImagePrev: `${process.env.REACT_APP_API_SERVER_URL}${Image.AtchmnflPath}`,
                }))
            }
        }

        funcSetImage()
    }, [Image])

    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="row-span-3">
                <div className="bg-gray-50 min-h-fit">
                    {pageState.SelectImagePrev && (
                        <img
                            className="object-contain w-full"
                            alt=""
                            src={pageState.SelectImagePrev}
                        />
                    )}
                </div>
            </div>
            <div className="row-span-3">
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
                    BgColor={`mBBlue`}
                    Name={`삭제`}
                    HandleClick={() => {
                        setPageState(initializeState)

                        if (inputRef.current != null) {
                            inputRef.current.value = ''
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default VaryImageUpload
