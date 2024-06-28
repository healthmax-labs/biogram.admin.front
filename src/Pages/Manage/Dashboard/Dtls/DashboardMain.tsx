import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { MainLayoutThemeType } from '@CommonTypes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { AtomRootState } from '@Recoil/AppRootState'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { getMngDashBoardPopup } from '@Service/DashBoardService'
import { VaryModal, VaryButton, VaryTextArea } from '@Elements'
import { VaryLabelCheckBox } from '@Elements'
import { storageManager, getNowDate } from '@Helper'
import axios from 'axios'
import fileDownload from 'js-file-download'

const GeonDaonDashboardMain = lazy(() => import('./GeonDaonDashboardMain'))

const {
    DetailPage: { Container },
} = PageContainerStyle

const {
    GeonDaonStyle: { MainWapper },
    NoticePoupStyle,
} = DashboardStyle

const initializeState = {
    theme: '',
}

const DashboardMain = () => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const atomRootState = useRecoilValue(AtomRootState)
    const [dashBoardPageState, setDashBoardPageState] =
        useRecoilState(DashBoardPageState)
    const [pageState, setPageState] = useState<{
        theme: MainLayoutThemeType
    }>(initializeState)

    useEffect(() => {
        const funcSetDashBoard = (theme: MainLayoutThemeType) => {
            setPageState(prevState => ({
                ...prevState,
                theme: theme,
            }))
        }

        if (mainLayoutState.Theme !== pageState.theme) {
            funcSetDashBoard(mainLayoutState.Theme)
        }
    }, [mainLayoutState.Theme, pageState.theme])

    useEffect(() => {
        const funcGetDashBoardNoticePopup = async () => {
            const { MBER_NO } = atomRootState.userinfo
            const checkDate = getNowDate()

            const chTdayShow = storageManager.get(
                `dashboard-notice-poupup-${MBER_NO}`
            )

            if (chTdayShow && Number(chTdayShow) >= Number(checkDate)) {
                return
            }

            const { status, payload } = await getMngDashBoardPopup()

            if (status) {
                setDashBoardPageState(prevState => ({
                    ...prevState,
                    noticePopup: {
                        ...prevState.noticePopup,
                        show: true,
                        notice: payload,
                    },
                }))
            }
        }

        funcGetDashBoardNoticePopup().then()
    }, [atomRootState.userinfo, setDashBoardPageState])

    return (
        <Container>
            <MainWapper>
                <Suspense>
                    {(() => {
                        if (pageState.theme === 'GeonDaon') {
                            return <GeonDaonDashboardMain />
                        } else {
                            return <GeonDaonDashboardMain />
                        }
                    })()}
                </Suspense>
            </MainWapper>
            {dashBoardPageState.noticePopup.show && (
                <VaryModal
                    ModalLoading={false}
                    MaxWidth={`lg`}
                    Children={
                        <NoticePoupStyle.Container>
                            <NoticePoupStyle.Wapper>
                                <NoticePoupStyle.Row>
                                    <NoticePoupStyle.NoticeTextWapper>
                                        <NoticePoupStyle.NoticeText>
                                            {
                                                dashBoardPageState.noticePopup
                                                    .notice.TITLE
                                            }
                                        </NoticePoupStyle.NoticeText>
                                    </NoticePoupStyle.NoticeTextWapper>
                                </NoticePoupStyle.Row>
                                <NoticePoupStyle.Row>
                                    <NoticePoupStyle.Wapper>
                                        <VaryTextArea
                                            Rows={10}
                                            HandleOnChange={() => {
                                                //
                                            }}
                                            Placeholder=""
                                            Value={
                                                dashBoardPageState.noticePopup
                                                    .notice.CONTENT
                                            }
                                        />
                                    </NoticePoupStyle.Wapper>
                                </NoticePoupStyle.Row>
                                {(() => {
                                    const { ATCHMNFL_INFO } =
                                        dashBoardPageState.noticePopup.notice

                                    if (
                                        ATCHMNFL_INFO.ATCHMNFL_PATH &&
                                        ATCHMNFL_INFO.ORIGINL_FILE_NM
                                    ) {
                                        return (
                                            <>
                                                {ATCHMNFL_INFO.ORIGINL_FILE_NM.match(
                                                    /\.(jpg|jpeg|png|gif)$/i
                                                ) && (
                                                    <NoticePoupStyle.Row>
                                                        <NoticePoupStyle.Row>
                                                            <div className="flex flex-nowrap w-full items-center justify-center">
                                                                <div className="flex w-full items-center justify-center">
                                                                    <img
                                                                        className="max-w-sm"
                                                                        src={`${process.env.REACT_APP_API_IMAGE_SERVER_URL}${ATCHMNFL_INFO.ATCHMNFL_PATH}`}
                                                                        alt={
                                                                            '...'
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </NoticePoupStyle.Row>
                                                    </NoticePoupStyle.Row>
                                                )}
                                                <NoticePoupStyle.Row>
                                                    <NoticePoupStyle.NoticeTextWapper>
                                                        <NoticePoupStyle.DownloadText
                                                            onClick={() => {
                                                                axios
                                                                    .get(
                                                                        `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${ATCHMNFL_INFO.ATCHMNFL_PATH}`,
                                                                        {
                                                                            responseType:
                                                                                'blob',
                                                                        }
                                                                    )
                                                                    .then(
                                                                        res => {
                                                                            fileDownload(
                                                                                res.data,
                                                                                ATCHMNFL_INFO.ORIGINL_FILE_NM
                                                                            )
                                                                        }
                                                                    )
                                                            }}>
                                                            {`${ATCHMNFL_INFO.ORIGINL_FILE_NM}`}
                                                        </NoticePoupStyle.DownloadText>
                                                    </NoticePoupStyle.NoticeTextWapper>
                                                </NoticePoupStyle.Row>
                                            </>
                                        )
                                    }

                                    return <></>
                                })()}
                                <NoticePoupStyle.Row>
                                    <NoticePoupStyle.ButtonWapper>
                                        <NoticePoupStyle.ButtonItem>
                                            <VaryLabelCheckBox
                                                Checked={
                                                    !dashBoardPageState
                                                        .noticePopup.todayShow
                                                }
                                                LabelWidth={`w60`}
                                                HandleOnChange={e => {
                                                    setDashBoardPageState(
                                                        prevState => ({
                                                            ...prevState,
                                                            noticePopup: {
                                                                ...prevState.noticePopup,
                                                                todayShow:
                                                                    !e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    )
                                                }}
                                                LabelName={`오늘 하루 그만 보기`}
                                            />
                                        </NoticePoupStyle.ButtonItem>
                                        <NoticePoupStyle.ButtonItem>
                                            <VaryButton
                                                ButtonName={`확인`}
                                                ButtonType={`default`}
                                                HandleClick={() => {
                                                    const { MBER_NO } =
                                                        atomRootState.userinfo

                                                    if (
                                                        !dashBoardPageState
                                                            .noticePopup
                                                            .todayShow
                                                    ) {
                                                        storageManager.set(
                                                            `dashboard-notice-poupup-${MBER_NO}`,
                                                            getNowDate()
                                                        )
                                                    }
                                                    setDashBoardPageState(
                                                        prevState => ({
                                                            ...prevState,
                                                            noticePopup: {
                                                                ...prevState.noticePopup,
                                                                show: false,
                                                            },
                                                        })
                                                    )
                                                }}
                                            />
                                        </NoticePoupStyle.ButtonItem>
                                    </NoticePoupStyle.ButtonWapper>
                                </NoticePoupStyle.Row>
                            </NoticePoupStyle.Wapper>
                        </NoticePoupStyle.Container>
                    }
                />
            )}
        </Container>
    )
}

export default DashboardMain
