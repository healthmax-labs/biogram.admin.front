import {
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import Slider from 'react-slick'

const {
    Detail: D,
    Detail: {
        MealDiary: { RowWapper, Search, TitleBox, Table: STable, History },
    },
} = ConsultDetailStyle

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

const ConsultDetailMealdiary = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }
    return (
        <D.Container>
            <RowWapper>
                <Search.SearchBox>
                    <Search.SearchItem>
                        <VaryLabel LabelName={`날짜`} LabelWidth={'w10'} />
                        <VaryDatepickerInput
                            CallBackReturn={() => {
                                //
                            }}
                        />
                    </Search.SearchItem>
                    <Search.SearchItem>
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'조회'}
                            HandleClick={() => {
                                //
                            }}
                        />
                    </Search.SearchItem>
                </Search.SearchBox>
            </RowWapper>
            <RowWapper>
                <TitleBox>섭취기준</TitleBox>
                <STable.Table>
                    <STable.Thead>
                        <STable.TheadRow>
                            <STable.TheadCell>총열량</STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                탄수화물
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                단백질
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                지방
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                당류
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                나트륨
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                수분
                            </STable.TheadCell>
                        </STable.TheadRow>
                    </STable.Thead>
                    <STable.Body>
                        <STable.Row>
                            <STable.Cell rowSpan={2}>1830 Kcal</STable.Cell>
                            <STable.Cell colSpan={2}>52%</STable.Cell>
                            <STable.Cell colSpan={2}>52%</STable.Cell>
                            <STable.Cell colSpan={2}>52%</STable.Cell>
                            <STable.Cell colSpan={2}>52%</STable.Cell>
                            <STable.Cell colSpan={2}>
                                * 한국인 영양섭취 성인 평균
                            </STable.Cell>
                            <STable.Cell colSpan={2}>
                                * 한국인 영양섭취 성인 평균
                            </STable.Cell>
                        </STable.Row>
                        <STable.Row>
                            <STable.Cell>244 g</STable.Cell>
                            <STable.Cell>976 Kcal</STable.Cell>
                            <STable.Cell>244 g</STable.Cell>
                            <STable.Cell>976 Kcal</STable.Cell>
                            <STable.Cell>244 g</STable.Cell>
                            <STable.Cell>976 Kcal</STable.Cell>
                            <STable.Cell>244 g</STable.Cell>
                            <STable.Cell>976 Kcal</STable.Cell>
                            <STable.Cell colSpan={2}>200 g</STable.Cell>
                            <STable.Cell colSpan={2}>1800 m2</STable.Cell>
                        </STable.Row>
                    </STable.Body>
                </STable.Table>
            </RowWapper>
            <RowWapper>
                <TitleBox>일별 섭취현황 및 차이</TitleBox>
                <STable.Table>
                    <STable.Thead>
                        <STable.TheadRow>
                            <STable.TheadCell></STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        Checked={false}
                                        TextColor={`white`}
                                        LabelReverse={true}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/05 (토)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/06 (일)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/07 (월)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/08 (화)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/09 (수)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/10 (목)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={2}>
                                <STable.TheadCellItem>
                                    <VaryLabelCheckBox
                                        LabelReverse={true}
                                        TextColor={`white`}
                                        Checked={false}
                                        HandleOnChange={() => {
                                            //
                                        }}
                                        LabelName={'11/11 (금)'}
                                    />
                                </STable.TheadCellItem>
                            </STable.TheadCell>
                            <STable.TheadCell colSpan={4}>
                                평균 섭취 현황
                            </STable.TheadCell>
                        </STable.TheadRow>
                    </STable.Thead>
                    <STable.Body>
                        <STable.Row>
                            <STable.CellBg>일섭취</STable.CellBg>
                            <STable.Cell colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.Cell>
                            <STable.CellBg colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.CellBg>
                            <STable.Cell colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.Cell>
                            <STable.CellBg colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.CellBg>
                            <STable.Cell colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.Cell>
                            <STable.CellBg colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.CellBg>
                            <STable.Cell colSpan={2}>
                                744 kcal( &#9660; 1057)
                            </STable.Cell>
                            <STable.CellBg colSpan={4}>
                                744 kcal( &#9660; 1057)
                            </STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg></STable.CellBg>
                            <STable.Cell>( g )</STable.Cell>
                            <STable.Cell>( % )</STable.Cell>
                            <STable.CellBg>( g )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.Cell>( g )</STable.Cell>
                            <STable.Cell>( % )</STable.Cell>
                            <STable.CellBg>( g )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.Cell>( g )</STable.Cell>
                            <STable.Cell>( % )</STable.Cell>
                            <STable.CellBg>( g )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.Cell>( g )</STable.Cell>
                            <STable.Cell>( % )</STable.Cell>
                            <STable.CellBg colSpan={2}>( kcal )</STable.CellBg>
                            <STable.CellBg>( g )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    탄수화물
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`blue`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2} Bg={true}>
                                <STable.CellText Color={`white`}>
                                    529
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-215)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>
                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    단백질
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`blue`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2} Bg={true}>
                                <STable.CellText Color={`white`}>
                                    529
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-215)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>
                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    지방
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`blue`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2} Bg={true}>
                                <STable.CellText Color={`white`}>
                                    529
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-215)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>
                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    지방
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`blue`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell>
                                <STable.CellText Color={`gray`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2} Bg={true}>
                                <STable.CellText Color={`white`}>
                                    529
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-215)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    129
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (115)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    69
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>

                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    당류
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (-)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    27
                                </STable.CellText>
                                <STable.CellText Color={`red`}>
                                    (+4)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    27
                                </STable.CellText>
                                <STable.CellText Color={`red`}>
                                    (+4)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    27
                                </STable.CellText>
                                <STable.CellText Color={`red`}>
                                    (+4)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    (-)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    42
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-12)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    12
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-15)
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true}></STable.TextCell>
                        </STable.Row>

                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    나트륨
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 mg
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={4}>
                                <STable.CellText Color={`white`}>
                                    558 mg
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-1442 mg)
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>

                        <STable.Row>
                            <STable.TextCell Bg={true}>
                                <STable.CellText Color={`white`}>
                                    수분
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={2}>
                                <STable.CellText Color={`white`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell colSpan={2}>
                                <STable.CellText Color={`gray`}>
                                    0 ml
                                </STable.CellText>
                                <STable.CellText Color={`gray`}>
                                    ( - )
                                </STable.CellText>
                            </STable.TextCell>
                            <STable.TextCell Bg={true} colSpan={4}>
                                <STable.CellText Color={`white`}>
                                    257 ml
                                </STable.CellText>
                                <STable.CellText Color={`white`}>
                                    (-1500 ml)
                                </STable.CellText>
                            </STable.TextCell>
                        </STable.Row>
                        <STable.BlankRow>
                            <STable.Cell colSpan={19}></STable.Cell>
                        </STable.BlankRow>
                        <STable.Row>
                            <STable.CellBg>끼니별</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg>( kcal )</STable.CellBg>
                            <STable.CellBg>( % )</STable.CellBg>
                            <STable.CellBg colSpan={2}>( kcal )</STable.CellBg>
                            <STable.CellBg colSpan={2}>( % )</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg>아침</STable.CellBg>
                            <STable.Cell>360</STable.Cell>
                            <STable.Cell>47</STable.Cell>
                            <STable.CellBg>360</STable.CellBg>
                            <STable.CellBg>47</STable.CellBg>
                            <STable.Cell>360</STable.Cell>
                            <STable.Cell>47</STable.Cell>
                            <STable.CellBg>360</STable.CellBg>
                            <STable.CellBg>47</STable.CellBg>
                            <STable.Cell>360</STable.Cell>
                            <STable.Cell>47</STable.Cell>
                            <STable.CellBg>360</STable.CellBg>
                            <STable.CellBg>47</STable.CellBg>
                            <STable.Cell>360</STable.Cell>
                            <STable.Cell>47</STable.Cell>
                            <STable.CellBg colSpan={2}>360</STable.CellBg>
                            <STable.CellBg colSpan={2}>47</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg>점심</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg>저녁</STable.CellBg>
                            <STable.Cell>413</STable.Cell>
                            <STable.Cell>53</STable.Cell>
                            <STable.CellBg>413</STable.CellBg>
                            <STable.CellBg>53</STable.CellBg>
                            <STable.Cell>413</STable.Cell>
                            <STable.Cell>53</STable.Cell>
                            <STable.CellBg>413</STable.CellBg>
                            <STable.CellBg>53</STable.CellBg>
                            <STable.Cell>413</STable.Cell>
                            <STable.Cell>53</STable.Cell>
                            <STable.CellBg>413</STable.CellBg>
                            <STable.CellBg>53</STable.CellBg>
                            <STable.Cell>413</STable.Cell>
                            <STable.Cell>53</STable.Cell>
                            <STable.CellBg colSpan={2}>413</STable.CellBg>
                            <STable.CellBg colSpan={2}>53</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg>간식(오전+오후)</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                        </STable.Row>
                        <STable.Row>
                            <STable.CellBg>야식</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.CellBg>0</STable.CellBg>
                            <STable.Cell>0</STable.Cell>
                            <STable.Cell>0</STable.Cell>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                            <STable.CellBg colSpan={2}>0</STable.CellBg>
                        </STable.Row>
                    </STable.Body>
                </STable.Table>
            </RowWapper>
            <RowWapper>
                <TitleBox>일별 식사 내역 ( 11 / 05 )</TitleBox>
                <History.Wapper>
                    <History.ButtonBox>
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`아침`}
                            Active={true}
                        />
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`오전간식`}
                        />
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`점심`}
                        />
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`오후간식`}
                        />
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`저녁`}
                        />
                        <VaryButton
                            ButtonType={`button`}
                            HandleClick={() => {
                                //
                            }}
                            ButtonName={`야식`}
                        />
                    </History.ButtonBox>
                </History.Wapper>
                <History.Wapper>
                    <History.ImageBox.Container>
                        <History.ImageBox.ImageWapper>
                            <History.ImageBox.ImageTitleCell>
                                <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                <History.ImageBox.TitleBox>
                                    메뉴명: 돈육 김치찌개, 밥, 콩나물
                                </History.ImageBox.TitleBox>
                                <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                            </History.ImageBox.ImageTitleCell>
                            <History.ImageBox.ImageImageCell>
                                <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                <History.ImageBox.ImageBox>
                                    <Slider {...settings}>
                                        <div>
                                            <h3>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                                    alt=""
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                                    alt=""
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                                    alt=""
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                                                    alt=""
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                                                    alt=""
                                                />
                                            </h3>
                                        </div>
                                    </Slider>
                                </History.ImageBox.ImageBox>
                                <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                            </History.ImageBox.ImageImageCell>
                        </History.ImageBox.ImageWapper>
                        <History.ImageBox.TableBox>
                            <History.ImageBox.TableBox>
                                <STable.Table>
                                    <STable.Body>
                                        <STable.Row>
                                            <STable.CellBg>
                                                식사시간
                                            </STable.CellBg>
                                            <STable.CellBg>10:10</STable.CellBg>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.CellBg>
                                                총열량
                                            </STable.CellBg>
                                            <STable.CellBg>
                                                561 kcal
                                            </STable.CellBg>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>열량</STable.Cell>
                                            <STable.Cell>2000 kcal</STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>탄수화물</STable.Cell>
                                            <STable.Cell>10 g</STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>단백질</STable.Cell>
                                            <STable.Cell>4 g</STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>지방</STable.Cell>
                                            <STable.Cell>3 g</STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>당류</STable.Cell>
                                            <STable.Cell>1 g</STable.Cell>
                                        </STable.Row>
                                        <STable.Row>
                                            <STable.Cell>나트륨</STable.Cell>
                                            <STable.Cell>2 g</STable.Cell>
                                        </STable.Row>
                                    </STable.Body>
                                </STable.Table>
                            </History.ImageBox.TableBox>
                        </History.ImageBox.TableBox>
                    </History.ImageBox.Container>
                </History.Wapper>
            </RowWapper>
        </D.Container>
    )
}

export default ConsultDetailMealdiary
