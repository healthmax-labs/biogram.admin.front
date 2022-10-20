import React from 'react'

const UnderConstructionComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="container">
                <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
                    <div className="text-center">
                        <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                            서버<span className="text-indigo-600">작업중</span>
                        </h2>
                        <p className="text-md md:text-xl mt-10">
                            <a
                                className="hover:underline"
                                href="https://www.quicktoolz.com">
                                HealthMax
                            </a>
                            서버 작업 중입니다. 잠시후 다시 시도해 주세요.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnderConstructionComponent
