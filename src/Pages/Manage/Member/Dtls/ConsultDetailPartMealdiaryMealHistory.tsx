import { VaryButton } from '@Element/index'
import Slider from 'react-slick'
import React, { useEffect, useState, useCallback } from 'react'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'
import { ConsultMealDiaryItemMenuListInterface } from '@Type/MemberTypes'
import Codes from '@Codes'
import _ from 'lodash'

const {
    Detail: {
        MealDiary: { TitleBox, Table: STable, History },
    },
} = ConsultDetailStyle

const SlideNextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

const SlidePrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray' }}
            onClick={onClick}
        />
    )
}

const initializeState = {
    title: '',
    list: [],
    selectSeCode: '',
    selectImageIndex: 0,
    data: [],
}

const ConsultDetailPartMealdiaryMealHistory = ({
    MealDe,
    MealMenuList,
}: {
    MealDe: string
    MealMenuList: ConsultMealDiaryItemMenuListInterface[] | null
}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlideNextArrow />,
        prevArrow: <SlidePrevArrow />,
        beforeChange: (oldIndex: number, newIndex: number) => {
            handleBeforeChange(oldIndex, newIndex)
        },
    }

    const [pageState, setPageState] = useState<{
        title: string
        list: ConsultMealDiaryItemMenuListInterface[]
        selectSeCode: string
        selectImageIndex: number
        data: Array<{
            photo: string
            time: string
            totalCalorie: number
            calorie: number
            carbohydrate: number
            protein: number
            fat: number
            sugar: number
            sodium: number
            menu: string
        }>
    }>(initializeState)

    const handleBeforeChange = useCallback(
        (oldIndex: number, newIndex: number) => {
            setPageState(prevState => ({
                ...prevState,
                selectImageIndex: newIndex,
            }))
        },
        []
    )

    useEffect(() => {
        const funcSetState = () => {
            let imageIndex = 0
            let selectSeCode = ''
            if (
                MealMenuList &&
                MealMenuList.length > 0 &&
                MealMenuList[0].MEAL_SE_CODE
            ) {
                const fIndex = _.findIndex(Codes.Meals, {
                    code: MealMenuList[0].MEAL_SE_CODE,
                })
                if (fIndex > -1) {
                    imageIndex = fIndex
                    selectSeCode = MealMenuList[0].MEAL_SE_CODE
                }
            }

            setPageState(prevState => ({
                ...prevState,
                title: `${MealDe.substring(4, 6)} / ${MealDe.substring(6, 8)}`,
                list: MealMenuList ? MealMenuList : [],
                selectSeCode: selectSeCode
                    ? selectSeCode
                    : initializeState.selectSeCode,
                selectImageIndex: imageIndex
                    ? imageIndex
                    : initializeState.selectImageIndex,
                data: initializeState.data,
            }))
        }

        if (MealDe && MealMenuList) {
            funcSetState()
        }
    }, [MealDe, MealMenuList])

    useEffect(() => {
        const funcSetData = () => {
            // 사진 설정
            const list = _.filter(
                pageState.list,
                e => e.MEAL_SE_CODE === pageState.selectSeCode
            )

            setPageState(prevState => ({
                ...prevState,
                selectImageIndex: 0,
                data: list.map(data => {
                    return {
                        photo: `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${data.PREDICT_IMAGE_PATH}`,
                        time: `${data.MEAL_DT.substring(
                            8,
                            10
                        )} : ${data.MEAL_DT.substring(10, 12)}`,
                        totalCalorie: 0,
                        calorie: data.MEAL_CALORIE,
                        carbohydrate: data.MEAL_CARBOHYDRATE,
                        protein: data.MEAL_PROTEIN,
                        fat: data.MEAL_FAT,
                        sugar: data.MEAL_SUGAR,
                        sodium: data.MEAL_SODIUM,
                        menu: data.MENU_LIST.map(ml => {
                            return ml.FD_NM
                        }).join(','),
                    }
                }),
            }))
        }

        if (pageState.list.length > 0) {
            funcSetData()
        }
    }, [pageState.list, pageState.selectSeCode])

    return (
        <>
            {MealDe && MealMenuList && MealMenuList.length > 0 ? (
                <>
                    <TitleBox>{`일별 식사 내역 ( ${pageState.title} )`}</TitleBox>
                    <History.Wapper>
                        <History.ButtonBox>
                            {Codes.Meals.map((meals, mealsIndex) => {
                                return (
                                    <VaryButton
                                        key={`consult-detail-part-meal-diary-meal-history-button-item-${mealsIndex}`}
                                        ButtonType={`button`}
                                        HandleClick={() => {
                                            setPageState(prevState => ({
                                                ...prevState,
                                                selectSeCode: meals.code,
                                            }))
                                        }}
                                        ButtonName={`${meals.name}`}
                                        Active={
                                            pageState.selectSeCode ===
                                            meals.code
                                        }
                                    />
                                )
                            })}
                        </History.ButtonBox>
                    </History.Wapper>
                    <History.Wapper>
                        <History.ImageBox.Container>
                            <History.ImageBox.ImageWapper>
                                <History.ImageBox.ImageTitleCell>
                                    <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                    <History.ImageBox.TitleBox>
                                        {pageState.data.length > 0
                                            ? `메뉴명: ${
                                                  pageState.data[
                                                      pageState.selectImageIndex
                                                  ].menu
                                              }`
                                            : ''}
                                    </History.ImageBox.TitleBox>
                                    <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                </History.ImageBox.ImageTitleCell>
                                {pageState.data.length > 0 && (
                                    <History.ImageBox.ImageImageCell>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                        <History.ImageBox.ImageBox>
                                            <Slider {...settings}>
                                                {pageState.data.map(
                                                    (data, index) => {
                                                        return (
                                                            <div
                                                                key={`consult-detail-part-meal-diary-meal-history-image-item-${index}`}>
                                                                <h3>
                                                                    <img
                                                                        src={
                                                                            data.photo
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </h3>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </Slider>
                                        </History.ImageBox.ImageBox>
                                        <History.ImageBox.EmptyCellStep1></History.ImageBox.EmptyCellStep1>
                                    </History.ImageBox.ImageImageCell>
                                )}
                            </History.ImageBox.ImageWapper>
                            <History.ImageBox.TableBox>
                                {pageState.data.length > 0 && (
                                    <History.ImageBox.TableBox>
                                        <STable.Table>
                                            <STable.Body>
                                                <STable.Row>
                                                    <STable.Cell Bg={true}>
                                                        식사시간
                                                    </STable.Cell>
                                                    <STable.Cell Bg={true}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].time
                                                              }`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        열량
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].calorie
                                                              } kcal`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        탄수화물
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].carbohydrate
                                                              } g`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        단백질
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].protein
                                                              } g`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        지방
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].fat
                                                              } g`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        당류
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].sugar
                                                              } g`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                                <STable.Row>
                                                    <STable.Cell Bg={false}>
                                                        나트륨
                                                    </STable.Cell>
                                                    <STable.Cell Bg={false}>
                                                        {pageState.data.length >
                                                        0
                                                            ? `${
                                                                  pageState
                                                                      .data[
                                                                      pageState
                                                                          .selectImageIndex
                                                                  ].sodium
                                                              } g`
                                                            : ``}
                                                    </STable.Cell>
                                                </STable.Row>
                                            </STable.Body>
                                        </STable.Table>
                                    </History.ImageBox.TableBox>
                                )}
                            </History.ImageBox.TableBox>
                        </History.ImageBox.Container>
                    </History.Wapper>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default ConsultDetailPartMealdiaryMealHistory
