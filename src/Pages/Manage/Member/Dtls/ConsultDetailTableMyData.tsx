import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const { Detail } = ConsultDetailStyle

const ConsultDetailTableMyData = () => {
    return (
        <Detail.Container>
            <Detail.MyData.Wapper>
                <Detail.MyData.Head>
                    <Detail.MyData.HeadRow>
                        <Detail.MyData.HeadCell colSpan={2}>
                            구분
                        </Detail.MyData.HeadCell>
                        <Detail.MyData.HeadCell>
                            기록구분
                        </Detail.MyData.HeadCell>
                        <Detail.MyData.HeadCell>일시</Detail.MyData.HeadCell>
                        <Detail.MyData.HeadCell>수치</Detail.MyData.HeadCell>
                        <Detail.MyData.HeadCell>
                            정상범위
                        </Detail.MyData.HeadCell>
                        <Detail.MyData.HeadCell>평가</Detail.MyData.HeadCell>
                    </Detail.MyData.HeadRow>
                </Detail.MyData.Head>
                <Detail.MyData.Body>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={7}>
                            채성분
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            몸무게(kg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            좋음
                        </Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            근육량(kg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            좋음
                        </Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            체지방률(%)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            체지방량(kg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            내장지방(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'green'}>
                            좋음
                        </Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            BMI(kg/m<sup>2</sup>)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            추정골량(kg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow></Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow></Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={3}>
                            혈압
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            수축기(mmHg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            이완기(mmHg)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'red'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            맥박(bpm)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'red'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'red'}>
                            좋음
                        </Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow></Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow></Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={3}>
                            혈당
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            공복혈당(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            식후혈당(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            당화혈색소(%)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'red'}>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell Color={'red'}>
                            좋음
                        </Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={4}>
                            콜레스테롤
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            총 콜레스테롤(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            HDL-C(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            LDL-C(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            중성지방(mg/dl)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={4}>
                            혈관
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            혈관노화도(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            박출강도(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            탄성도(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            잔혈량(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={4}>
                            스트레스
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            스트레스 점수(point)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            신체적 스트레스(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            정신적 스트레스(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            스트레스 대처능력(level)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={3}>
                            기타
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            신장(cm)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            허리둘레(cm)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            체온(℃)
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef rowSpan={7}>
                            뇌 기능
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCellBef>
                            기초 뇌 기능
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            인지 뇌 기능
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            인지 능력
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            인지 기능 점수
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            뇌 혈류 조절 시간
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            뇌 혈류 기능 점수
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                    <Detail.MyData.BodyRow>
                        <Detail.MyData.BodyCellBef>
                            뇌 건강 종합 점수
                        </Detail.MyData.BodyCellBef>
                        <Detail.MyData.BodyCell>
                            기기측정
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            2022-11-10 17:54:27
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>55.8</Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>
                            51.80 ~ 64.40
                        </Detail.MyData.BodyCell>
                        <Detail.MyData.BodyCell>좋음</Detail.MyData.BodyCell>
                    </Detail.MyData.BodyRow>
                </Detail.MyData.Body>
            </Detail.MyData.Wapper>
        </Detail.Container>
    )
}

export default ConsultDetailTableMyData
