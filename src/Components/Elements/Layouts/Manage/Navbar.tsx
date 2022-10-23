import {
    NaviContainer,
    NaviWapper,
    NaviTitleLink,
    NaviSearchForm,
    NaviSearchWapper,
    NabviSearchIconBox,
    NabviSearchInput,
} from '@Style/Layouts/Manage/Common'
import { TeamSampleImage } from '@Assets'

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
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <div className="items-center flex mr-10">마스터님</div>
                        <div className="items-center flex">
                            46:37 후 자동 로그아웃
                        </div>
                    </ul>
                </NaviWapper>
            </NaviContainer>
            {/* End Navbar */}
        </>
    )
}
