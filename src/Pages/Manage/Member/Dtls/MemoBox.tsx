const MemoBox = () => {
    return (
        <div className="flex flex-col break-words bg-white">
            <textarea
                id="message"
                rows={19}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 border-0 focus:ring-blue-500 focus:border-blue-500"
                placeholder="메모를 입력해 주세요"></textarea>
        </div>
    )
}

export default MemoBox
