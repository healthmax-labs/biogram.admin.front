import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'

const ReactQuillEditor = () => {
    const QuillRef = useRef<ReactQuill>()
    const [value, setValue] = useState('')

    // const imageHandler = () => {
    //     const input = document.createElement('input')
    //     const formData = new FormData()
    //     let url = ''
    //
    //     input.setAttribute('type', 'file')
    //     input.setAttribute('accept', 'image/*')
    //     input.click()
    //
    //     input.onchange = async () => {
    //         const file = input.files
    //         if (file !== null) {
    //             formData.append('image', file[0])
    //
    //             try {
    //                 const res = axios
    //
    //                 url = res.data.url
    //
    //                 const range = QuillRef.current
    //                     ?.getEditor()
    //                     .getSelection()?.index
    //                 if (range !== null && range !== undefined) {
    //                     const quill = QuillRef.current?.getEditor()
    //
    //                     quill?.setSelection(range, 1)
    //
    //                     quill?.clipboard.dangerouslyPasteHTML(
    //                         range,
    //                         `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
    //                     )
    //                 }
    //
    //                 return { ...res, success: true }
    //             } catch (error) {
    //                 const err = error as AxiosError
    //                 return { ...err.response, success: false }
    //             }
    //         }
    //     }
    // }
    const modules = React.useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'code-block',
                        'formula',
                    ],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    // ['link', 'image', 'video'],
                    ['link'],
                    [{ align: [] }, { color: [] }, { background: [] }],
                    ['clean'],
                ],

                handlers: {
                    // image: imageHandler,
                },
            },
        }),
        []
    )

    const formats = [
        'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'formula',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'align',
        'color',
        'background',
    ]

    return (
        <>
            <div className="text-editor">
                <ReactQuill
                    theme="snow"
                    ref={element => {
                        if (element !== null) {
                            QuillRef.current = element
                        }
                    }}
                    value={value}
                    onChange={(content, delta, source, editor) =>
                        setValue(editor.getHTML())
                    }
                    modules={modules}
                    formats={formats}
                    placeholder="내용을 입력해주세요."
                />
            </div>
        </>
    )
}

export default ReactQuillEditor
