const MemoBox = () => {
    return (
        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-0 mt-3">
            <textarea
                id="message"
                rows={27}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 border-0 focus:ring-blue-500 focus:border-blue-500"
                placeholder="메모를 입력해 주세요"></textarea>
        </div>
    )
}

export default MemoBox
