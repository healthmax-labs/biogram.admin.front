import {
    NaviContainer,
    NaviWapper,
    NaviTitleLink,
    NaviSearchForm,
    NaviSearchWapper,
    NabviSearchIconBox,
    NabviSearchInput,
} from '@Style/Layouts/Manage/Common'

export default function Navbar() {
    return (
        <>
            {/* Navbar */}
            <NaviContainer>
                <NaviWapper>
                    {/* Brand */}
                    <NaviTitleLink
                        href="javascript:;"
                        onClick={e => e.preventDefault()}>
                        소속 & 속성 관리
                    </NaviTitleLink>
                    {/* Form */}
                    <NaviSearchForm>
                        <NaviSearchWapper>
                            <NabviSearchIconBox>
                                <i className="fas fa-search"></i>
                            </NabviSearchIconBox>
                            <NabviSearchInput
                                type="text"
                                placeholder="Search here..."
                            />
                        </NaviSearchWapper>
                    </NaviSearchForm>
                </NaviWapper>
            </NaviContainer>
            {/* End Navbar */}
        </>
    )
}
