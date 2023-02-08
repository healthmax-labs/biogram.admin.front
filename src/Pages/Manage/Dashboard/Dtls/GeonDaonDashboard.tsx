import GeonDaonContentCard from './GeonDaonContentCard'
import TempData from './TempData'
import { TextColorType } from '@CommonTypes'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'

interface ItemInterface {
    name: string
    color?: TextColorType
}

const {
    GeonDaonStyle: { Container },
} = DashboardStyle

const GeonDaonDashboard = () => {
    return (
        <Container>
            <div className="flex w-full gap-4">
                <div className="flex w-1/2 rounded-xl bg-gray-50">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full">
                            <GeonDaonContentCard
                                LeftTitle={
                                    <>
                                        <p className="flex text-xs">회원현황</p>
                                        <p className="flex text-little object-bottom pl-1">
                                            (단위: 명)
                                        </p>
                                    </>
                                }
                                RightTitle={
                                    <>
                                        <p className="flex text-xs pl-1 text-teal-600">
                                            오늘 15,312
                                        </p>
                                        <p className="flex text-xs pl-1">/</p>
                                        <p className="flex text-xs pl-1">
                                            전체 1,122,584
                                        </p>
                                    </>
                                }
                                Items={TempData.step1 as Array<ItemInterface[]>}
                            />
                        </div>
                        <div className="flex flex-nowrap w-full">
                            <div className="flex w-1/2">
                                <div className="flex flex-col w-full">
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            회원현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-teal-600">
                                                            오늘 15,312
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            /
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            전체 1,122,584
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step2 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            연령별 회원 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-teal-600">
                                                            ∎ 신규
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 전체
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step3 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            위험 요인 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step5 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            위험 요인별 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-orange-600">
                                                            ∎ 오늘
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 월 누적
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step6 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            위험군 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-orange-600">
                                                            ∎ 오늘
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 월 누적
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step7 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            설문 이상군 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-orange-600">
                                                            ∎ 오늘
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 월 누적
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step8 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/2">
                                <div className="flex flex-col w-full">
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            소속별 가입자 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-teal-600">
                                                            ∎ 신규
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 전체
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step4 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            위험군 휴면 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-orange-600">
                                                            ∎ 오늘
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 누적
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step9 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            위험 요인 증감 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <div className="flex text-xs text-orange-600">
                                                            ▲ 증가
                                                        </div>
                                                        <p className="flex text-xs pl-1 text-blue-600">
                                                            ▼ 감소
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 전체
                                                        </p>
                                                    </>
                                                }
                                                Items={
                                                    TempData.step10 as Array<
                                                        ItemInterface[]
                                                    >
                                                }
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 rounded-xl bg-gray-50">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full">
                            <GeonDaonContentCard
                                LeftTitle={
                                    <>
                                        <p className="flex text-xs">회원현황</p>
                                        <p className="flex text-little object-bottom pl-1">
                                            (단위: 명)
                                        </p>
                                    </>
                                }
                                RightTitle={
                                    <>
                                        <p className="flex text-xs pl-1 text-teal-600">
                                            오늘 15,312
                                        </p>
                                        <p className="flex text-xs pl-1">/</p>
                                        <p className="flex text-xs pl-1">
                                            전체 1,122,584
                                        </p>
                                    </>
                                }
                                Items={TempData.step1 as Array<ItemInterface[]>}
                            />
                        </div>
                        <div className="flex flex-nowrap w-full">
                            <div className="flex w-1/2">
                                <div className="flex flex-col w-full">
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        존 측정 현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step11 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        존 기기별 측정현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-blue-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step12 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        부스 지점별 측정현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-blue-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step13 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/2">
                                <div className="flex flex-col w-full">
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        홈 측정 현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step14 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        홈 기기별 측정현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-pink-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step15 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        홈 OS별 사용현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 보)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-pink-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step16 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        미션 포인트 TOP 100
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 포인트)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-pink-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step17 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                    <div>
                                        <GeonDaonContentCard
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        라이프로그 미측정 현황
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            RightTitle={
                                                <>
                                                    <p className="flex text-xs pl-1 text-pink-600">
                                                        ∎ 오늘
                                                    </p>
                                                    <p className="flex text-xs pl-1">
                                                        ∎ 월 누적
                                                    </p>
                                                </>
                                            }
                                            Items={
                                                TempData.step18 as Array<
                                                    ItemInterface[]
                                                >
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default GeonDaonDashboard
