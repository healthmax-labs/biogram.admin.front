import { getNowDateDetail } from '@Helper'

export default {
    Member: {
        MemberList: {
            FileName: `회원_현황_${getNowDateDetail()}`,
            SheetName: `회원 현황`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '아이디',
                    '휴대폰 번호',
                    '인증여부',
                    '생년월일',
                    '성별',
                    '소속',
                    '내/외근직',
                    '최근방문일자',
                    '가입일자',
                    '보유캐시',
                    '누적캐시적립',
                ],
            ],
            Data: [],
            SpliceColumn: true,
            SpliceColumns: [{ start: 1, end: 1 }],
        },
        ConsultList: {
            FileName: `상담회원 현황_${getNowDateDetail()}`,
            SheetName: `상담회원 현황`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '아이디',
                    '휴대폰 번호',
                    '성별',
                    '소속',
                    '내/외근직',
                    '최근측정일',
                    '위험요인',
                ],
            ],
            Data: [],
            SpliceColumn: true,
            SpliceColumns: [{ start: 1, end: 1 }],
        },
    },
    Inst: {
        InstList: {
            FileName: `소속_현황_${getNowDateDetail()}`,
            SheetName: `소속 현황`,
            Header: [
                [
                    '소속코드',
                    '1차',
                    '2차',
                    '3차',
                    '생성일자',
                    '회원수',
                    '가입승인대기',
                    '리워드 현황',
                    '리워드 예산',
                ],
            ],
            Data: [],
        },
    },
    Status: {
        RiskFctr: {
            FileName: `위험요인_현황_${getNowDateDetail()}`,
            SheetName: `위험요인 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '체성분계',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '혈압계',
                    '',
                    '',
                    '혈당계',
                    '',
                    '콜레스트롤 측정계',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '성별',
                    '위험요인',
                    '복약',
                    '허리둘레(Cm)',
                    '체중(Kg)',
                    'BMI(kg/m²)',
                    '체지방률(%)',
                    '근육량(kg)',
                    '추정골량(kg)',
                    '내장지방(lv)',
                    '수축기(mmHg)',
                    '이완기(mmHg)',
                    '맥박(bpm)',
                    '식전(mg/dl)',
                    '식후(mg/dl)',
                    'TC(mg/dl)',
                    'TG(mg/dl)',
                    'HDL-C(mg/dl)',
                    'LDL-C(mg/dl)',
                ],
            ],
            MergeCells: ['A1:G1', 'H1:M1', 'N1:P1', 'Q1:R1', 'S1:U1'],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 1, end: 1 }],
            SpliceMergeCells: ['A1:F1', 'G1:L1', 'M1:O1', 'P1:Q1', 'R1:U1'],
        },
        StressList: {
            FileName: `스트레스_현황_${getNowDateDetail()}`,
            SheetName: `스트레스 현황`,
            Header: [
                ['', '', '', '스트레스', '', '', '', '혈관건강', '', '', ''],
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '총점수',
                    '신체적 스트레스',
                    '정신적 스트레스',
                    '스트레스 대처능력',
                    '혈관 단계',
                    '박출강도',
                    '탄성도',
                    '전혈량',
                ],
            ],
            MergeCells: ['A1:C1', 'D1:G1', 'H1:K1'],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 1, end: 1 }],
            SpliceMergeCells: ['A1:B1', 'C1:F1', 'G1:J1'],
        },
        BrainList: {
            FileName: `뇌기능_현황_${getNowDateDetail()}`,
            SheetName: `뇌기능 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '인지 기능검사',
                    '',
                    '',
                    '',
                    '뇌 혈류 기능검사',
                    '',
                    '종합점수',
                ],
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '뇌 건강 종합 점수',
                    '기초 뇌 기능',
                    '인지 뇌 기능',
                    '인지 능력',
                    '인지 기능 점수',
                    '뇌 혈류 조절 시간',
                    '뇌 혈류 기능 점수',
                ],
            ],
            MergeCells: ['A1:C1', 'D1', 'E1:G1', 'H1:J1'],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 1, end: 1 }],
            SpliceMergeCells: ['A1:B1', 'C1', 'D1:F1', 'G1:I1'],
        },
        BrftrCmpr: {
            FileName: `전후비교_현황_${getNowDateDetail()}`,
            SheetName: `전후비교 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    '허리둘레',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '혈압',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '식전혈당',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '중성지방',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '고밀도 콜레스트롤',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '성별',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                    '최초',
                    '',
                    '최근1회',
                    '',
                    '최근2회',
                    '',
                    '최근3회',
                    '',
                ],
            ],
            MergeCells: [
                'A1:D1',
                'E1:L1',
                'M1:T1',
                'U1:AB1',
                'AC1:AJ1',
                'AK1:AR1',
                'E2:F2',
                'G2:H2',
                'I2:J2',
                'K2:L2',
                'M2:N2',
                'O2:P2',
                'Q2:R2',
                'S2:T2',
                'U2:V2',
                'W2:X2',
                'Y2:Z2',
                'AA2:AB2',
                'AC2:AD2',
                'AE2:AF2',
                'AG2:AH2',
                'AI2:AJ2',
                'AK2:AL2',
                'AM2:AN2',
                'AO2:AP2',
                'AQ2:AR2',
            ],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 1, end: 1 }],
            SpliceMergeCells: [
                'A1:C1',
                'D1:K1',
                'L1:S1',
                'T1:AA1',
                'AB1:AI1',
                'AJ1:AQ1',
                'D2:E2',
                'F2:G2',
                'H2:I2',
                'J2:K2',
                'L2:M2',
                'N2:O2',
                'P2:Q2',
                'R2:S2',
                'T2:U2',
                'V2:W2',
                'X2:Y2',
                'Z2:AA2',
                'AB2:AC2',
                'AD2:AE2',
                'AF2:AG2',
                'AH2:AI2',
                'AJ2:AK2',
                'AL2:AM2',
                'AN2:AO2',
                'AP2:AQ2',
            ],
            CellWidth: 12,
        },
        Statistics: {
            FileName: `기기측정_현황_${getNowDateDetail()}`,
            SheetName: `기기측정 현황`,
            Header: [
                [
                    '',
                    '',
                    '',
                    '',
                    '',
                    `체성분계`,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    `혈압계`,
                    ``,
                    ``,
                    `혈당계`,
                    ``,
                    ``,
                    `콜레스트롤 측정계`,
                    ``,
                    ``,
                    ``,
                    `스트레스 측정계`,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    ``,
                    `기타`,
                    ``,
                    ``,
                ],
                [
                    '측정일자',
                    '회원번호',
                    '회원명',
                    '생년월일',
                    '성별',
                    `체중(kg)`,
                    `BMI(kg/m²)`,
                    `체지방률(%)`,
                    `체지방량(kg)`,
                    `근육량(kg)`,
                    `추정골량(kg)`,
                    `내장지방(level)`,
                    `수축기(mmHg)`,
                    `이완기(mmHg)`,
                    `맥박(bpm)`,
                    `식전(mg/dl)`,
                    `식후(mg/dl)`,
                    `당화혈색소(%)`,
                    `TC(mg/dl)`,
                    `TG(mg/dl)`,
                    `HDL-C(mg/dl)`,
                    `LDL-C(mg/dl)`,
                    `점수(점)`,
                    `정신적(단계)`,
                    `신체적(단계)`,
                    `대처능력(단계)`,
                    `혈관(단계)`,
                    `박출강도(단계)`,
                    `탄성도(단계)`,
                    `잔혈량(단계)`,
                    `신장(cm)`,
                    `체온(°c)`,
                    `허리둘레(cm)`,
                ],
            ],
            MergeCells: [
                'A1:E1',
                'F1:L1',
                'M1:O1',
                'P1:R1',
                'S1:V1',
                'W1:AD1',
                'AE1:AG1',
            ],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 2, end: 1 }],
            SpliceMergeCells: [
                'A1:D1',
                'E1:K1',
                'L1:N1',
                'O1:Q1',
                'R1:U1',
                'V1:AC1',
                'AD1:AF1',
            ],
        },
        ActivityWalk: {
            FileName: `활동량_현황_${getNowDateDetail()}`,
            SheetName: `활동량 현황`,
            Header: [
                [
                    '측정일자',
                    '회원번호',
                    '이름',
                    '생년월일',
                    '성별',
                    '총보행수(걸음)',
                    '활동 거리(m)',
                    '소비칼로리(kcal)',
                ],
            ],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 2, end: 1 }],
        },
        WalkRanking: {
            FileName: `보행수_랭킹_${getNowDateDetail()}`,
            SheetName: `보행수 랭킹`,
            Header: [
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '아이디',
                    '휴대폰번호',
                    '성별',
                    '순위',
                    '보행수',
                ],
            ],
            Data: [],
            SpliceColumn: false,
            SpliceColumns: [{ start: 1, end: 1 }],
        },
        HealthIndicators: {
            FileName: `건강지표개선_현황_${getNowDateDetail()}`,
            SheetName: `건강지표개선 현황`,
            Header: [
                [
                    '회원정보',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '측정정보',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                [
                    '회원번호',
                    '이름',
                    '생년월일',
                    '아이디',
                    '휴대폰번호',
                    '성별',
                    '개선성공률',
                    '허리둘레',
                    '혈압',
                    '식전혈당',
                    '중성지방',
                    'HDLC',
                ],
            ],
            MergeCells: ['A1:F1', 'G1:L1'],
            Data: [],
        },
    },
    Analytics: {
        Member: {
            FileName: `회원_연령별_통계_${getNowDateDetail()}`,
            SheetName: `회원 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체회원수',
                    '',
                    '',
                    '신규회원수',
                    '',
                    '',
                    '탈퇴회원수',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            MergeCells: ['B1:D1', 'E1:G1', 'H1:J1', 'A1:A2'],
            Data: [],
        },
        MeasureUser: {
            FileName: `측정이용자_연령별_통계_${getNowDateDetail()}`,
            SheetName: `측정이용자 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '',
                    '',
                    '체성분계',
                    '',
                    '',
                    '혈압계',
                    '',
                    '',
                    '혈당계',
                    '',
                    '',
                    '콜레스테롤계',
                    '',
                    '',
                    '스트레스계',
                    '',
                    '',
                    '신장계',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            MergeCells: [
                'B1:D1',
                'E1:G1',
                'H1:J1',
                'K1:M1',
                'N1:P1',
                'Q1:S1',
                'T1:V1',
                'A1:A2',
            ],
            Data: [],
        },
        RiskFctrItems: {
            FileName: `위험요인_항목별_연령별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 항목별 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '혈압',
                    '',
                    '',
                    '허리둘레',
                    '',
                    '',
                    '식전혈당',
                    '',
                    '',
                    '중성지방',
                    '',
                    '',
                    'HDLC',
                    '',
                    '',
                ],
                [
                    '',
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            MergeCells: [
                'C1:E1',
                'F1:H1',
                'I1:K1',
                'L1:N1',
                'O1:Q1',
                'A1:A2',
                'B1:B2',
            ],
            Data: [],
        },
        StressList: {
            FileName: `스트레스_연령별_측정자수_통계_${getNowDateDetail()}`,
            SheetName: `스트레스 연령별 측정자수 통계`,
            Header: [
                [
                    '연령대',
                    '측정인원(명)',
                    '스트레스점수',
                    '',
                    '신체적스트레스',
                    '',
                    '정신적스트레스',
                    '',
                    '스트레스대처능력',
                    '',
                    '혈압단계',
                    '',
                    '박출강도',
                    '',
                    '탄성도',
                    '',
                    '잔혈량',
                    '',
                ],
                [
                    '',
                    '',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                    '정상',
                    '위험',
                ],
            ],
            MergeCells: [
                'C1:D1',
                'E1:F1',
                'G1:H1',
                'I1:J1',
                'K1:L1',
                'M1:N1',
                'O1:P1',
                'Q1:R1',
                'A1:A2',
                'B1:B2',
            ],
            Data: [],
        },
        RiskFctrCount: {
            FileName: `위험요인_개수_연령별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 개수 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '',
                    '',
                    '1개',
                    '',
                    '',
                    '2개',
                    '',
                    '',
                    '3개',
                    '',
                    '',
                    '4개',
                    '',
                    '',
                    '5개',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            MergeCells: [
                'B1:D1',
                'E1:G1',
                'H1:J1',
                'K1:M1',
                'N1:P1',
                'Q1:S1',
                'A1:A2',
            ],
            Data: [],
        },
        DeviceUse: {
            FileName: `기기사용_연령별_통계_${getNowDateDetail()}`,
            SheetName: `기기사용 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '',
                    '',
                    '체성분계',
                    '',
                    '',
                    '혈압계',
                    '',
                    '',
                    '혈당계',
                    '',
                    '',
                    '콜레스테롤계',
                    '',
                    '',
                    '스트레스계',
                    '',
                    '',
                    '신장계',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            MergeCells: [
                'B1:D1',
                'E1:G1',
                'H1:J1',
                'K1:M1',
                'N1:P1',
                'Q1:S1',
                'T1:V1',
                'A1:A2',
            ],
            Data: [],
        },
        HealthIndicators: {
            FileName: `건강지표_개선_통계_${getNowDateDetail()}`,
            SheetName: `건강지표 개선 통계`,
            Header: [
                [
                    '연령',
                    '개선성공률',
                    '',
                    '',
                    '혈압',
                    '',
                    '',
                    '공복혈당',
                    '',
                    '',
                    '중성지방',
                    '',
                    '',
                    'HDL-C',
                    '',
                    '',
                    '허리둘레',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '내근직',
                    '외근직',
                    '전체',
                    '내근직',
                    '외근직',
                    '전체',
                    '내근직',
                    '외근직',
                    '전체',
                    '내근직',
                    '외근직',
                    '전체',
                    '내근직',
                    '외근직',
                    '전체',
                    '내근직',
                    '외근직',
                ],
            ],
            MergeCells: [
                'B1:D1',
                'E1:G1',
                'H1:J1',
                'K1:M1',
                'N1:P1',
                'Q1:S1',
                'A1:A2',
            ],
            Data: [],
        },
    },
    Manager: {
        PopupManageCountModal: {
            FileName: `팝업_노출수_${getNowDateDetail()}`,
            SheetName: `팝업 노출수`,
            Header: [['회원번호', '이름', '일시']],
            Data: [],
        },
    },
}
