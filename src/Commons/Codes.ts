export default {
    memberStplats: {
        code: {
            US: {
                name: '이용약관 동의여부',
                code: 'USE_STPLAT_AGRE_AT',
            },
            II: {
                name: '개인정보수집이용 동의여부',
                code: 'INDVDLINFO_AGRE_AT',
            },
            SI: {
                name: '민감정보 수집 및 이용 동의 여부',
                code: 'SNSTIIVEINFO_AGRE_AT',
            },
            IT: {
                name: '개인정보 제3자 제공 동의 여부',
                code: 'INDVDLINFO_THIRD_AGRE_AT',
            },
            ST: {
                name: '민감정보 제3자 제공 동의 여부',
                code: 'SNSTIIVEINFO_THIRD_AGRE_AT',
            },
            MP: {
                name: '마케팅 정보 수신 동의 여부(선택)',
                code: 'MARKTINFO_AGRE_AT',
            },
            MI: {
                name: '마케팅 목적 수집 이용 동의 여부(선택)',
                code: 'MARKTINFO_PURPOSE_AGRE_AT',
            },
        },
        category: {
            USE_STPLAT_AGRE_AT: {
                name: '이용약관 동의여부',
                code: 'US',
            },
            INDVDLINFO_AGRE_AT: {
                name: '개인정보수집이용 동의여부',
                code: 'II',
            },
            SNSTIIVEINFO_AGRE_AT: {
                name: '민감정보 수집 및 이용 동의 여부',
                code: 'SI',
            },
            INDVDLINFO_THIRD_AGRE_AT: {
                name: '개인정보 제3자 제공 동의 여부',
                code: 'IT',
            },
            SNSTIIVEINFO_THIRD_AGRE_AT: {
                name: '민감정보 제3자 제공 동의 여부',
                code: 'ST',
            },
            MARKTINFO_AGRE_AT: {
                name: '마케팅 정보 수신 동의 여부(선택)',
                code: 'MP',
            },
            MARKTINFO_PURPOSE_AGRE_AT: {
                name: '마케팅 목적 수집 이용 동의 여부(선택)',
                code: 'MI',
            },
        },
    },
    myData: [
        {
            name: `체성분`,
            key: '0010',
            list: [
                { code: '6021', name: '몸무게(kg)', keyCode: 'BDWGH' },
                { code: '6023', name: '근육량(kg)', keyCode: 'SLM' },
                { code: '6022', name: '체지방률', keyCode: 'PBF' },
                { code: '8010', name: '체지방량(kg)' },
                { code: '6026', name: '내장지방(level)', keyCode: 'VFL' },
                { code: '6056', name: 'BMI(kg/㎡)', keyCode: 'BMI' },
                { code: '6029', name: '추정골량(kg)', keyCode: 'EST_BN_MAS' },
            ],
        },
        {
            name: `혈압`,
            key: '0020',
            list: [
                { code: '622E', name: '수축기(mmHg)', keyCode: 'SYSTOLIC' },
                { code: '622F', name: '이완기(mmHg)', keyCode: 'DIASTOLIC' },
                { code: '6230', name: '맥박(bpm)', keyCode: 'PULS' },
            ],
        },
        {
            name: `혈당`,
            key: '0030',
            list: [
                { code: '624A', name: '공복혈당(mg/dl)', keyCode: 'FBS' },
                { code: '624B', name: '식후혈당(mg/dl)', keyCode: 'PP2' },
                { code: '624M', name: '당화혈색소(％)' },
            ],
        },
        {
            name: `콜레스테롤`,
            key: '0040',
            list: [
                {
                    code: '624C',
                    name: '총 콜레스테롤(mg/dl)',
                    keyCode: 'T_CHOL',
                },
                { code: '624E', name: 'HDL-C(mg/dl)', keyCode: 'HDLC' },
                { code: '624F', name: 'LDL-C(mg/dl)', keyCode: 'LDLC' },
                { code: '624D', name: '중성지방(mg/dl)', keyCode: 'TG' },
            ],
        },
        {
            name: `혈관`,
            key: '0050',
            list: [
                { code: '7016', name: '혈관노화도(level)' },
                { code: '7017', name: '박출강도(level)' },
                { code: '7018', name: '탄성도(level)' },
                { code: '7019', name: '잔혈량(level)' },
            ],
        },
        {
            name: `스트레스`,
            key: '0060',
            list: [
                { code: '7012', name: '스트레스 점수(point)' },
                { code: '7013', name: '신체적 스트레스(level)' },
                { code: '7014', name: '정신적 스트레스(level)' },
                { code: '7015', name: '스트레스 대처능력(level)' },
            ],
        },
        {
            name: `기타`,
            key: '0070',
            list: [
                { code: '6A35', name: '신장(cm)', keyCode: 'HEIGHT' },
                {
                    code: '8072',
                    name: '허리둘레(cm)',
                    keyCode: 'WAIST_CRCMFRNC',
                },
                { code: '5010', name: '체온(℃)', keyCode: 'BDHEAT' },
            ],
        },
        {
            name: `뇌기능`,
            key: '0080',
            list: [
                { code: '10001', name: '기초 뇌 기능' },
                { code: '10003', name: '인지 뇌 기능' },
                { code: '10006', name: '인지 능력' },
                { code: '10007', name: '인지 기능 점수' },
                { code: '10008', name: '뇌 혈류 조절 시간' },
                { code: '10009', name: '뇌 혈류 기능 점수' },
                { code: '10010', name: '뇌 건강 종합 점수' },
            ],
        },
    ],
    riksCode: [
        {
            name: `위험요인`,
            key: 'riks',
            list: [
                { code: 'WS', name: '허리둘레' },
                { code: 'BP', name: '혈압' },
                { code: 'BS', name: '혈당' },
                { code: 'TG', name: '중성지방' },
                { code: 'HD', name: 'HDLC' },
                //이하 미정
                { code: 'BMI', name: 'BMI' },
                { code: 'PP2', name: '식후혈당' },
                { code: 'ST', name: '스트레스' },
            ],
        },
        {
            name: `위험요인`,
            key: 'riksDctr',
            list: [
                { code: 'WS', name: '허리둘레' },
                { code: 'BP', name: '혈압' },
                { code: 'BS', name: '혈당' },
                { code: 'TG', name: '중성지방' },
                { code: 'HD', name: 'HDLC' },
            ],
        },
        {
            name: `복약정보`,
            key: 'takngMdcin',
            list: [
                { code: 'OB', name: '비만' },
                { code: 'HP', name: '고혈압' },
                { code: 'DB', name: '당뇨' },
                { code: 'DP', name: '고지혈' },
            ],
        },
    ],
    week: [
        {
            name1: `일요일`,
            name2: '일',
            key: `time_7`,
            code: 7,
        },
        {
            name1: `월요일`,
            name2: '월',
            key: `time_1`,
            code: 1,
        },
        {
            name1: `화요일`,
            name2: '화',
            key: `time_2`,
            code: 2,
        },
        {
            name1: `수요일`,
            name2: '수',
            key: `time_3`,
            code: 3,
        },
        {
            name1: `목요일`,
            name2: '목',
            key: `time_4`,
            code: 4,
        },
        {
            name1: `금요일`,
            name2: '금',
            key: `time_5`,
            code: 5,
        },
        {
            name1: `토요일`,
            name2: '토',
            key: `time_6`,
            code: 6,
        },
        {
            name1: `공휴일`,
            name2: '공휴일 휴무',
            key: `time_rd`,
            code: 21,
        },
    ],
    deviceGubun: {
        modal: {
            name: `모델`,
            list: [
                {
                    name: `프로`,
                    key: 'pro',
                    code: 'P',
                },
                {
                    name: `베이직`,
                    key: 'basic',
                    code: 'B',
                },
            ],
        },
        loginType: {
            name: `로그인 방식`,
            list: [
                {
                    name: `복합`,
                    key: `A`,
                    code: `A`,
                },
                {
                    name: `지정맥`,
                    key: `Y`,
                    code: `Y`,
                },
                {
                    name: `RFID카드`,
                    key: `R`,
                    code: `R`,
                },
            ],
        },
        outSiderUse: {
            name: `외부인 사용`,
            list: [
                {
                    name: `가능`,
                    key: 'Y',
                    code: 'Y',
                },
                {
                    name: `불가능`,
                    key: 'N',
                    code: 'N',
                },
            ],
        },
        deviceOpen: {
            name: `오픈`,
            list: [
                {
                    name: `오픈`,
                    key: 'Y',
                    code: 'Y',
                },
                {
                    name: `미오픈`,
                    key: 'N',
                    code: 'N',
                },
            ],
        },
        printUse: {
            name: `프린트`,
            list: [
                {
                    name: `가능`,
                    key: 'Y',
                    code: 'Y',
                },
                {
                    name: `불가능`,
                    key: 'N',
                    code: 'N',
                },
            ],
        },
        mhrls: {
            name: `설치기기`,
            list: [
                {
                    name: `키오스크`,
                    key: `KK`,
                    code: `KK`,
                },
                {
                    name: `신장`,
                    key: `HT`,
                    code: `HT`,
                },
                {
                    name: `체성분`,
                    key: `IS`,
                    code: `IS`,
                },
                {
                    name: `혈압`,
                    key: `BP`,
                    code: `BP`,
                },
                {
                    name: `혈당`,
                    key: `BS`,
                    code: `BS`,
                },
                {
                    name: `콜레스트롤`,
                    key: `BC`,
                    code: `BC`,
                },
                {
                    name: `스트레스`,
                    key: `SR`,
                    code: `SR`,
                },
                {
                    name: `뇌건강 측정`,
                    key: `BI`,
                    code: `BI`,
                },
            ],
        },
        measureCode: {
            name: ``,
            list: [
                {
                    name: `신장`,
                    key: `HT`,
                    code: `HT`,
                },
                {
                    name: `체성분`,
                    key: `IS`,
                    code: `IS`,
                },
                {
                    name: `혈압`,
                    key: `BP`,
                    code: `BP`,
                },
                {
                    name: `혈당`,
                    key: `BS`,
                    code: `BS`,
                },
                {
                    name: `콜레스테롤`,
                    key: `BC`,
                    code: `BC`,
                },
                {
                    name: `체온`,
                    key: `BH`,
                    code: `BH`,
                },
                {
                    name: `스트레스`,
                    key: `SR`,
                    code: `SR`,
                },
                // {
                //     name: `악력`,
                //     key: `GP`,
                //     code: `GP`,
                // },
                {
                    name: `뇌건강 측정`,
                    key: `BI`,
                    code: `BI`,
                },
                // {
                //     name: `당화혈색소`,
                //     key: `GH`,
                //     code: `GH`,
                // },
                {
                    name: `혈당/콜레스테롤`,
                    key: `BSBC`,
                    code: `BSBC`,
                },
                {
                    name: `혈압/체성분`,
                    key: `BPIS`,
                    code: `BPIS`,
                },
                {
                    name: `혈압/체성분/콜레스테롤`,
                    key: `BPIC`,
                    code: `BPIC`,
                },
                // {
                //     name: `혈압계 악력계`,
                //     key: `BPGP`,
                //     code: `BPGP`,
                // },
                {
                    name: `혈압/스트레스`,
                    key: `BPSR`,
                    code: `BPSR`,
                },
                {
                    name: `신장/체성분`,
                    key: `HTIS`,
                    code: `HTIS`,
                },
                {
                    name: `신장/혈압`,
                    key: `HTBP`,
                    code: `HTBP`,
                },
                // {
                //     name: `혈압/체성분/당화혈색소`,
                //     key: `BPIG`,
                //     code: `BPIG`,
                // },
            ],
        },
        stplatCode: {
            name: `이용약관 코드`,
            list: [
                {
                    code: 'II',
                    seCode: 'HMAX',
                    name: '개인정보 수집 및 이용',
                },
                {
                    code: 'MI',
                    seCode: 'HMAX',
                    name: '마케팅 정보 수신',
                },
                {
                    code: 'MP',
                    seCode: 'HMAX',
                    name: '마케팅 목적 수집 이용',
                },
                {
                    code: 'SI',
                    seCode: 'HMAX',
                    name: '민감정보 수집 및 이용',
                },
                {
                    code: 'US',
                    seCode: 'HMAX',
                    name: '이용약관',
                },
                {
                    code: 'IT',
                    seCode: 'MDAG',
                    name: '개인정보 제3자 제공',
                },
                {
                    code: 'IT',
                    seCode: 'PSIS',
                    name: '개인정보 제3자 제공',
                },
                {
                    code: 'IT',
                    seCode: 'MPAS',
                    name: '개인정보 제3자 제공',
                },
                {
                    code: 'IT',
                    seCode: 'SAMC',
                    name: '개인정보 제3자 제공',
                },
                {
                    code: 'IT',
                    seCode: 'SUBS',
                    name: '개인정보 제3자 제공',
                },
                {
                    code: 'ST',
                    seCode: 'MDAG',
                    name: '민감정보 제3자 제공',
                },
                {
                    code: 'ST',
                    seCode: 'MPAS',
                    name: '민감정보 제3자 제공',
                },
                {
                    code: 'ST',
                    seCode: 'PSIS',
                    name: '민감정보 제3자 제공',
                },
                {
                    code: 'ST',
                    seCode: 'SUBS',
                    name: '민감정보 제3자 제공',
                },
            ],
        },
    },
    boardCode: {
        name: '게시판 게시풀 종류',
        list: [
            {
                name: '공지',
                code: '1',
            },
            {
                name: '보도자료',
                code: '2',
            },
            {
                name: '웹',
                code: '3',
            },
            {
                name: '안드로이드',
                code: '4',
            },
            {
                name: '아이폰',
                code: '5',
            },
            {
                name: '아이폰,안드로이드',
                code: '6',
            },
        ],
    },
    boardSchCode: {
        name: '게시판 종류',
        list: [
            {
                name: '공지사항 게시판',
                code: 'cpnoti',
            },
            {
                name: '채용 게시판',
                code: 'cpemp',
            },
        ],
    },
    surveyCode: [
        {
            name: `기초생활습관`,
            seCode: `LLHB`,
            category: [
                {
                    title: `흡연`,
                    name: `흡연`,
                    sn: 1,
                    code: `CM00`,
                    question: [
                        {
                            name: '비흡연',
                            code: 'N',
                        },
                        {
                            name: '흡연',
                            code: 'Y',
                        },
                    ],
                },
                {
                    title: `음주`,
                    name: `음주`,
                    sn: 2,
                    code: `MB08`,
                    question: [
                        {
                            name: '없음',
                            code: 'NONE',
                        },
                        {
                            name: '월 1회',
                            code: 'LOTM',
                        },
                        {
                            name: '월 2~4회',
                            code: 'TFTM',
                        },
                        {
                            name: '월 5 회 이상',
                            code: 'MFTM',
                        },
                        {
                            name: '주 2~3회',
                            code: 'TTTW',
                        },
                        {
                            name: '주 4회 이상',
                            code: 'MFTW',
                        },
                    ],
                },
                {
                    title: `복약`,
                    name: `복약(중복가능)`,
                    sn: 3,
                    code: `MB13`,
                    question: [
                        {
                            name: '없음',
                            code: 'NONE',
                        },
                        {
                            name: '비만',
                            code: 'OBST',
                        },
                        {
                            name: '고혈압',
                            code: 'HBPS',
                        },
                        {
                            name: '당뇨',
                            code: 'DABT',
                        },
                        {
                            name: '고지혈',
                            code: 'DSPD',
                        },
                        {
                            name: '기타',
                            code: '9999',
                        },
                    ],
                },
                {
                    title: `위험요인`,
                    name: `위험요인(중복가능)`,
                    sn: 4,
                    code: `MB17`,
                    question: [
                        {
                            name: '없음',
                            code: 'NONE',
                        },
                        {
                            name: '허리둘레',
                            code: 'WAST',
                        },
                        {
                            name: '혈압',
                            code: 'HBPS',
                        },
                        {
                            name: '공복혈당',
                            code: 'BFBS',
                        },
                        {
                            name: '중성지방',
                            code: 'TGCL',
                        },
                        {
                            name: 'HDL-C',
                            code: 'HDLC',
                        },
                    ],
                },
            ],
        },
        {
            name: `식습관`,
            seCode: `MLHB`,
            category: [
                {
                    title: `규칙적인 식사`,
                    name: `규칙적인 식사`,
                    sn: 1,
                    code: `MB14`,
                    question: [
                        {
                            name: '주 2일 이하',
                            code: 'LTTW',
                        },
                        {
                            name: '주 3~5일',
                            code: 'TFTW',
                        },
                        {
                            name: '거의 매일',
                            code: 'AMED',
                        },
                    ],
                },
                {
                    title: `1일 2끼이상 단백질 섭취`,
                    name: `1일 2끼이상 단백질 섭취`,
                    sn: 2,
                    code: `MB14`,
                    question: [
                        {
                            name: '주 2일 이하',
                            code: 'LTTW',
                        },
                        {
                            name: '주 3~5일',
                            code: 'TFTW',
                        },
                        {
                            name: '거의 매일',
                            code: 'AMED',
                        },
                    ],
                },
                {
                    title: `동물성지방 섭취`,
                    name: `동물성지방 섭취`,
                    sn: 3,
                    code: `MB14`,
                    question: [
                        {
                            name: '거의먹지 않음',
                            code: 'AMNE',
                        },
                        {
                            name: '주 1~2회',
                            code: 'OTTW',
                        },
                        {
                            name: '주 3일 이상',
                            code: 'MTTW',
                        },
                    ],
                },
                {
                    title: `짠음식 섭취빈도`,
                    name: `짠음식 섭취빈도`,
                    sn: 4,
                    code: `MB14`,
                    question: [
                        {
                            name: '거의먹지 않음',
                            code: 'AMNE',
                        },
                        {
                            name: '주 1~2회',
                            code: 'OTTW',
                        },
                        {
                            name: '주 3일 이상',
                            code: 'MTTW',
                        },
                    ],
                },
                {
                    title: `채소/과일 섭취빈도`,
                    name: `채소/과일 섭취빈도`,
                    sn: 5,
                    code: `MB14`,
                    question: [
                        {
                            name: '주 2일 이하',
                            code: 'LTTW',
                        },
                        {
                            name: '주 3~5일',
                            code: 'TFTW',
                        },
                        {
                            name: '거의 매일',
                            code: 'AMED',
                        },
                    ],
                },
                {
                    title: `유제품 섭취빈도`,
                    name: `유제품 섭취빈도`,
                    sn: 6,
                    code: `MB14`,
                    question: [
                        {
                            name: '거의먹지 않음',
                            code: 'AMNE',
                        },
                        {
                            name: '주 1~2회',
                            code: 'OTTW',
                        },
                        {
                            name: '주 3일 이상',
                            code: 'MTTW',
                        },
                    ],
                },
            ],
        },
        {
            name: `운동습관`,
            seCode: `SPHB`,
            category: [
                {
                    title: `운동 규칙성`,
                    name: `운동 규칙성`,
                    sn: 1,
                    code: `CM00`,
                    question: [
                        {
                            name: '아니오',
                            code: 'N',
                        },
                        {
                            name: '예',
                            code: 'Y',
                        },
                    ],
                },
                {
                    title: `활동량`,
                    name: `활동량`,
                    sn: 2,
                    code: `MB15`,
                    question: [
                        {
                            name: '1회 이하',
                            code: 'LOTW',
                        },
                        {
                            name: '주 2~3회',
                            code: 'TTTW',
                        },
                        {
                            name: '주 3~4회',
                            code: 'TFTW',
                        },
                        {
                            name: '주 4~5회',
                            code: 'FFTW',
                        },
                        {
                            name: '주 5~6회',
                            code: 'FSTW',
                        },
                        {
                            name: '거의 매일',
                            code: 'AMED',
                        },
                    ],
                },
                {
                    title: `중강도 운동량`,
                    name: `중강도 운동량`,
                    sn: 3,
                    code: `MB15`,
                    question: [
                        {
                            name: '1회 이하',
                            code: 'LOTW',
                        },
                        {
                            name: '주 2~3회',
                            code: 'TTTW',
                        },
                        {
                            name: '주 3~4회',
                            code: 'TFTW',
                        },
                        {
                            name: '주 4~5회',
                            code: 'FFTW',
                        },
                        {
                            name: '주 5~6회',
                            code: 'FSTW',
                        },
                        {
                            name: '거의 매일',
                            code: 'AMED',
                        },
                    ],
                },
                {
                    title: `고강도`,
                    name: `고강도`,
                    sn: 4,
                    code: `MB16`,
                    question: [
                        {
                            name: '20분 이하',
                            code: 'LTT',
                        },
                        {
                            name: '20~40분',
                            code: 'TFT',
                        },
                        {
                            name: '40~60분',
                            code: 'FST',
                        },
                        {
                            name: '60~90분',
                            code: 'SNT',
                        },
                        {
                            name: '90분이상',
                            code: 'MNT',
                        },
                    ],
                },
            ],
        },
    ],
}
