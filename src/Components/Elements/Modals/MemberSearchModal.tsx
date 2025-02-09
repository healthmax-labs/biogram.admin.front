import { VaryModal, VaryButton, VaryInput } from '@Elements'
import { CommonListTableStyle } from '@Style/Elements/TableStyles'
import { MemberSearchModalStyle } from '@Style/Elements/ModalStyles'
import { KeyboardEvent, useState } from 'react'
import _ from 'lodash'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import {
    getMberSendMberSearch,
    getInstChargerCheck,
} from '@Service/MemberService'
import { DefaultStatus, MemberSearchItemInterface } from '@CommonTypes'
import { ElementLoading } from '@Element/index'

const {
    TableWapper,
    HeaderCell,
    HeaderRow,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHeader,
} = CommonListTableStyle

const {
    Container,
    RowWapper,
    RowWapperGap,
    SelectedButton,
    Mbtlnum,
    TitleText,
} = MemberSearchModalStyle

const initializeState = {
    status: 'idle',
    search: {
        keyword: '',
    },
    list: [],
    selected: [],
}
const MemberSearchModal = ({
    SearchType,
    SearchTitle,
    InstNo,
    PermiCode,
    CloseButtonClick,
    SaveButtonClick,
}: {
    SearchType: 'default' | 'admin'
    SearchTitle: string
    InstNo: number
    PermiCode: 'SM00' | 'IM00' // 권한 코드 소속코드(inst_no) 가 1000 이면 SM00 그외 아니면 IM00
    CloseButtonClick: () => void
    SaveButtonClick: ({
        selected,
    }: {
        selected: MemberSearchItemInterface[]
    }) => void
}) => {
    const [pageState, setPageState] = useState<{
        status: string | DefaultStatus
        search: {
            keyword: string
        }
        list: MemberSearchItemInterface[]
        selected: MemberSearchItemInterface[]
    }>(initializeState)

    const { handlMainAlert } = useMainLayouts()

    const handlePermitCheck = async ({
        memberNo,
    }: {
        memberNo: number
    }): Promise<boolean> => {
        const { status, payload } = await getInstChargerCheck({
            memberNo: memberNo,
            instNo: InstNo,
            permiCode: PermiCode,
        })

        /**
         * 결과 'D' | 'Y' | 'N'
         *
         * 이중에 N 일 경우만 관리자 권한 추가 가능
         */
        if (status) {
            const { REGIST_AT } = payload

            return REGIST_AT === 'N'
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.getInfoError,
            })
            return false
        }
    }

    const handleClickSearchButton = async () => {
        if (_.isEmpty(pageState.search.keyword.trim())) {
            handlMainAlert({
                state: true,
                message: Messages.Default.emptySearchKeyword,
            })
            return
        }

        setPageState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { status, payload } = await getMberSendMberSearch({
            keyWord: pageState.search.keyword,
        })

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                list: payload.SEND_MBER_INFO_LIST,
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                list: [],
            }))
        }

        setPageState(prevState => ({
            ...prevState,
            status: 'failure',
        }))
    }

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        handleClickSearchButton().then()
    }

    return (
        <VaryModal
            ModalLoading={false}
            NeedMax={false}
            Children={
                <Container>
                    <RowWapper>
                        <TitleText>{`${SearchTitle}`}</TitleText>
                    </RowWapper>
                    <RowWapperGap>
                        <VaryInput
                            Width={`w64`}
                            Value={pageState.search.keyword.trim()}
                            Placeholder={`이름/아이디/휴대폰번호`}
                            HandleOnChange={e =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        keyword: e.target.value,
                                    },
                                }))
                            }
                            HandleOnKeyDown={handleSearchInputOnKeyDown}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'검색'}
                            HandleClick={() => handleClickSearchButton()}
                        />
                    </RowWapperGap>
                    <RowWapper>
                        <TableWapper>
                            <TableHeader>
                                <HeaderRow>
                                    <HeaderCell>이름</HeaderCell>
                                    <HeaderCell>휴대폰번호</HeaderCell>
                                    <HeaderCell>{``}</HeaderCell>
                                </HeaderRow>
                            </TableHeader>
                            <TableBody HeightLimit={true} Scroll={true}>
                                {pageState.status === 'loading' ? (
                                    <TableBodyRow
                                        BgState={false}
                                        FullHeight={true}>
                                        <TableBodyCell FullHeight={true}>
                                            <ElementLoading
                                                FullScreen={false}
                                            />
                                        </TableBodyCell>
                                    </TableBodyRow>
                                ) : pageState.list.length === 0 ? (
                                    <TableBodyRow BgState={true}>
                                        <TableBodyCell>{`${Messages.Default.searchEmpty}`}</TableBodyCell>
                                    </TableBodyRow>
                                ) : (
                                    pageState.list.map((member, index) => {
                                        const checked = _.find(
                                            pageState.selected,
                                            {
                                                MBER_NO: member.MBER_NO,
                                            }
                                        )
                                        return (
                                            <TableBodyRow
                                                BgState={true}
                                                key={`member-search-modal-item-row-${index}`}>
                                                <TableBodyCell>
                                                    {`${member.MBER_NO}`}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {`${member.NM}`}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    <Mbtlnum
                                                        Color={
                                                            member.MBTLNUM_CRTFC_AT ===
                                                            'Y'
                                                                ? 'gray'
                                                                : 'red'
                                                        }>{`${member.MBTLNUM}`}</Mbtlnum>
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    <VaryButton
                                                        ButtonType={'default'}
                                                        ButtonName={
                                                            checked
                                                                ? '삭제'
                                                                : '추가'
                                                        }
                                                        HandleClick={() => {
                                                            if (
                                                                member.MBTLNUM_CRTFC_AT ===
                                                                'N'
                                                            ) {
                                                                handlMainAlert({
                                                                    state: true,
                                                                    message:
                                                                        Messages
                                                                            .Default
                                                                            .memberMbtlnumCrtfcAt,
                                                                })
                                                                return
                                                            }
                                                            if (checked) {
                                                                setPageState(
                                                                    prevState => ({
                                                                        ...prevState,
                                                                        selected:
                                                                            prevState.selected.filter(
                                                                                e =>
                                                                                    e.MBER_NO !==
                                                                                    member.MBER_NO
                                                                            ),
                                                                    })
                                                                )
                                                            } else {
                                                                if (
                                                                    SearchType ===
                                                                    'default'
                                                                ) {
                                                                    setPageState(
                                                                        prevState => ({
                                                                            ...prevState,
                                                                            selected:
                                                                                [
                                                                                    ...prevState.selected,
                                                                                    member,
                                                                                ],
                                                                        })
                                                                    )
                                                                    return
                                                                }

                                                                handlePermitCheck(
                                                                    {
                                                                        memberNo:
                                                                            member.MBER_NO,
                                                                    }
                                                                ).then(e => {
                                                                    // 결과가 true 일 경우만 권한 추가 가능.
                                                                    if (e) {
                                                                        setPageState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                selected:
                                                                                    [
                                                                                        ...prevState.selected,
                                                                                        member,
                                                                                    ],
                                                                            })
                                                                        )
                                                                    } else {
                                                                        handlMainAlert(
                                                                            {
                                                                                state: true,
                                                                                message:
                                                                                    Messages
                                                                                        .Default
                                                                                        .memberPermitCheck,
                                                                            }
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        }}
                                                    />
                                                </TableBodyCell>
                                            </TableBodyRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </TableWapper>
                    </RowWapper>
                    <RowWapper>
                        <SelectedButton.Container>
                            {pageState.selected.map((selected, index) => {
                                return (
                                    <SelectedButton.Wapper
                                        key={`member-search-modal-selected-item-row-${index}`}>
                                        {selected.NM}
                                        <SelectedButton.Button
                                            type="button"
                                            data-dismiss-target="#badge-dismiss-dark"
                                            aria-label="Remove"
                                            onClick={() => {
                                                setPageState(prevState => ({
                                                    ...prevState,
                                                    selected:
                                                        prevState.selected.filter(
                                                            e =>
                                                                e.MBER_NO !==
                                                                selected.MBER_NO
                                                        ),
                                                }))
                                            }}>
                                            <svg
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                            <SelectedButton.Sr>
                                                Remove badge
                                            </SelectedButton.Sr>
                                        </SelectedButton.Button>
                                    </SelectedButton.Wapper>
                                )
                            })}
                        </SelectedButton.Container>
                    </RowWapper>
                </Container>
            }
            Buttons={
                <>
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'닫기'}
                        HandleClick={() => CloseButtonClick()}
                    />
                    <VaryButton
                        ButtonType={'default'}
                        ButtonName={'저장'}
                        HandleClick={() =>
                            SaveButtonClick({ selected: pageState.selected })
                        }
                    />
                </>
            }
        />
    )
}

export default MemberSearchModal
