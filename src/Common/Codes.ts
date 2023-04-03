export default {
    etc: {
        dayCode: {
            name: `날짜 코드`,
            key: `day`,
            type1: [
                { code: 'TD', name: `오늘` },
                { code: 'MT', name: `이번달` },
            ],
            type2: [
                { code: 'TD', name: `오늘` },
                { code: 'MT', name: `최근 30일` },
            ],
            type3: [
                { code: 'TD', name: `오늘` },
                { code: 'TT', name: `전체` },
            ],
            type4: [
                { code: 'TD', name: `오늘` },
                { code: 'TT', name: `전체(6개월)` },
            ],
        },
        cycleCode: {
            name: `날짜 주기 코드`,
            key: `dayCycle`,
            list: [
                { code: 'D', name: `1일` },
                { code: 'W', name: `1주` },
                { code: 'M', name: `1개월` },
            ],
        },
        dateUnits: {
            name: `날짜 선택 코드`,
            key: `dateUnits`,
            list: [
                { code: '1', name: `1개월` },
                { code: '3', name: `3개월` },
                { code: '6', name: `6개월` },
                { code: '12', name: `1년` },
            ],
        },
        workType: {
            name: `직종구분`,
            key: `workTypeCode`,
            list: [
                {
                    code: 'I',
                    name: `내근직`,
                },
                {
                    code: 'O',
                    name: `외근직`,
                },
            ],
        },
    },
    ageGroup: {
        name: `체성분`,
        key: '0010',
        list: [
            {
                key: '10',
                code: '10',
                name: '10대 이하',
            },
            {
                key: '20',
                code: '20',
                name: '20대',
            },
            {
                key: '30',
                code: '30',
                name: '30대',
            },
            {
                key: '40',
                code: '40',
                name: '40대',
            },
            {
                key: '50',
                code: '50',
                name: '50대',
            },
            {
                key: '60',
                code: '60',
                name: '60대',
            },
            {
                key: '70',
                code: '70',
                name: '70대 이상',
            },
        ],
    },
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
    myGraph: {
        category: [
            // 상담회원 현황 - 마이그래프 구분 코드.
            {
                name: `체성분`,
                code: `body`,
            },
            {
                name: `혈압`,
                code: `brssr`,
            },
            {
                name: `혈당`,
                code: `bdsg`,
            },
            {
                name: `콜레스테롤`,
                code: `chol`,
            },
            {
                name: `혈관`,
                code: `bldvss`,
            },
            {
                name: `스트레스`,
                code: `strs`,
            },
            {
                name: `신장`,
                code: `height`,
            },
            {
                name: `허리둘레`,
                code: `waist`,
            },
            {
                name: `뇌기능`,
                code: `brain`,
            },
            {
                name: `활동량 & 수면`,
                code: `life_log`,
            },
        ],
        dataCode: {
            body: [
                {
                    code: `BDWGH`,
                    name: `몸무게(체중)`,
                },
                // {
                //     code: `SLM`,
                //     name: `근육량`,
                // },
                // {
                //     code: `FAT_MAS`,
                //     name: `체지방량`,
                // },
                // {
                //     code: `EST_BN_MAS`,
                //     name: `추정골량`,
                // },
                // {
                //     code: `PBF`,
                //     name: `체지방률`,
                // },
                // {
                //     code: `VFL`,
                //     name: `내장지방레벨`,
                // },
                // {
                //     code: `BMI`,
                //     name: `BMI`,
                // },
                // {
                //     code: `BMR`,
                //     name: `기초대사량`,
                // },
            ],
            brssr: [
                {
                    code: 'DIASTOLIC',
                    name: `이완기 혈압`,
                },
                {
                    code: 'SYSTOLIC',
                    name: `수축기 혈압`,
                },
                {
                    code: 'PULS',
                    name: `심박수`,
                },
            ],
            bdsg: [
                {
                    code: `FBS`,
                    name: `식전 혈당`,
                },
                {
                    code: `PP2`,
                    name: `식후 혈당`,
                },
                {
                    code: `HBA1C`,
                    name: `당화혈색소`,
                },
            ],
            chol: [
                {
                    code: `T_CHOL`,
                    name: `총 콜레스테롤`,
                },
                {
                    code: `TG`,
                    name: `중성지방`,
                },
                {
                    code: `HDLC`,
                    name: `HDL 콜레스테롤`,
                },
                {
                    code: `LDLC`,
                    name: `LDL 콜레스테롤`,
                },
            ],
            bldvss: [
                {
                    code: `BLDVSS_STEP`,
                    name: `혈관단계`,
                },
                {
                    code: `CAD_OUTPUT_IN`,
                    name: `박출강도`,
                },
                {
                    code: `ELSTC_DGREE`,
                    name: `탄성도`,
                },
                {
                    code: `RBV_QY`,
                    name: `잔혈량`,
                },
            ],
            strs: [
                {
                    code: `STRS_SCORE`,
                    name: `스트레스 점수`,
                },
                {
                    code: `STRS_CNTRMSR_ABLTY`,
                    name: `신체적 스트레스`,
                },
                {
                    code: `MNTL_STRS`,
                    name: `정신적 스트레스`,
                },
                {
                    code: `PHYSIC_STRS`,
                    name: `스트레스 대처능력`,
                },
            ],
            height: [
                {
                    code: `HEIGHT`,
                    name: `신장`,
                },
            ],
            waist: [
                {
                    code: `WAIST_CRCMFRNC`,
                    name: `허리둘레`,
                },
            ],
            brain: [
                {
                    code: `WAIST_CRCMFRNC`,
                    name: `허리둘레`,
                },
                {
                    code: `BBF_ADJST_TIME`,
                    name: `기초 뇌 기능`,
                },
                {
                    code: `CB_FNCT`,
                    name: `인지 뇌 기능`,
                },
                {
                    code: `CB_ABLTY`,
                    name: `인지 뇌 능력`,
                },
                {
                    code: `CB_FNCT_SCORE`,
                    name: `인지 뇌 기능 점수`,
                },
                {
                    code: `BBF_FNCT_SCORE`,
                    name: `뇌 혈류 조절 시간`,
                },
                {
                    code: `BB_FNCT`,
                    name: `뇌 혈류 기능 점수`,
                },
                {
                    code: `BH_TNT_SCORE`,
                    name: `뇌기능 종합점수`,
                },
            ],
        },
    },
    myData: [
        {
            name: `체성분`,
            key: '0010',
            list: [
                {
                    code: '6021',
                    name: '몸무게(kg)',
                    keyCode: 'BDWGH',
                    genName: `몸무게`,
                },
                {
                    code: '6023',
                    name: '근육량(kg)',
                    keyCode: 'SLM',
                    genName: `근육량`,
                },
                {
                    code: '6022',
                    name: '체지방률',
                    keyCode: 'PBF',
                    genName: `체지방률`,
                },
                { code: '8010', name: '체지방량(kg)', genName: `체지방량` },
                {
                    code: '6026',
                    name: '내장지방(level)',
                    keyCode: 'VFL',
                    genName: `내장지방`,
                },
                {
                    code: '6056',
                    name: 'BMI(kg/㎡)',
                    keyCode: 'BMI',
                    genName: `BMI`,
                },
                {
                    code: '6029',
                    name: '추정골량(kg)',
                    keyCode: 'EST_BN_MAS',
                    genName: `추정골량`,
                },
            ],
        },
        {
            name: `혈압`,
            key: '0020',
            list: [
                {
                    code: '622E',
                    name: '수축기(mmHg)',
                    keyCode: 'SYSTOLIC',
                    genName: `혈압`,
                },
                {
                    code: '622F',
                    name: '이완기(mmHg)',
                    keyCode: 'DIASTOLIC',
                    genName: `혈압`,
                },
                {
                    code: '6230',
                    name: '맥박(bpm)',
                    keyCode: 'PULS',
                    genName: `혈압`,
                },
            ],
        },
        {
            name: `혈당`,
            key: '0030',
            list: [
                {
                    code: '624A',
                    name: '공복혈당(mg/dl)',
                    keyCode: 'FBS',
                    genName: `공복혈당`,
                },
                {
                    code: '624B',
                    name: '식후혈당(mg/dl)',
                    keyCode: 'PP2',
                    genName: `식후혈당`,
                },
                { code: '624M', name: '당화혈색소(％)', genName: `당화혈색소` },
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
                    genName: `총 콜레스테롤`,
                },
                {
                    code: '624E',
                    name: 'HDL-C(mg/dl)',
                    keyCode: 'HDLC',
                    genName: `HDL-C`,
                },
                {
                    code: '624F',
                    name: 'LDL-C(mg/dl)',
                    keyCode: 'LDLC',
                    genName: `LDL-C`,
                },
                {
                    code: '624D',
                    name: '중성지방(mg/dl)',
                    keyCode: 'TG',
                    genName: `중성지방`,
                },
            ],
        },
        {
            name: `혈관`,
            key: '0050',
            list: [
                {
                    code: '7016',
                    name: '혈관노화도(level)',
                    genName: `혈관노화도`,
                },
                { code: '7017', name: '박출강도(level)', genName: `박출강도` },
                { code: '7018', name: '탄성도(level)', genName: `탄성도` },
                { code: '7019', name: '잔혈량(level)', genName: `잔혈량` },
            ],
        },
        {
            name: `스트레스`,
            key: '0060',
            list: [
                {
                    code: '7012',
                    name: '스트레스 점수(point)',
                    genName: `스트레스 점수`,
                },
                {
                    code: '7013',
                    name: '신체적 스트레스(level)',
                    genName: `신체적 스트레스`,
                },
                {
                    code: '7014',
                    name: '정신적 스트레스(level)',
                    genName: `정신적 스트레스`,
                },
                {
                    code: '7015',
                    name: '스트레스 대처능력(level)',
                    genName: `스트레스 대처능력`,
                },
            ],
        },
        {
            name: `기타`,
            key: '0070',
            list: [
                {
                    code: '6A35',
                    name: '신장(cm)',
                    keyCode: 'HEIGHT',
                    genName: `신장`,
                },
                {
                    code: '8072',
                    name: '허리둘레(cm)',
                    keyCode: 'WAIST_CRCMFRNC',
                    genName: `허리둘레`,
                },
                {
                    code: '5010',
                    name: '체온(℃)',
                    keyCode: 'BDHEAT',
                    genName: `체온`,
                },
            ],
        },
        {
            name: `뇌기능`,
            key: '0080',
            list: [
                {
                    code: '10001',
                    name: '기초 뇌 기능',
                    genName: `기초 뇌 기능`,
                },
                {
                    code: '10003',
                    name: '인지 뇌 기능',
                    genName: `인지 뇌 기능`,
                },
                { code: '10006', name: '인지 능력', genName: `인지 능력` },
                {
                    code: '10007',
                    name: '인지 기능 점수',
                    genName: `인지 기능 점수`,
                },
                {
                    code: '10008',
                    name: '뇌 혈류 조절 시간',
                    genName: `뇌 혈류 조절 시간`,
                },
                {
                    code: '10009',
                    name: '뇌 혈류 기능 점수',
                    genName: `뇌 혈류 기능 점수`,
                },
                {
                    code: '10010',
                    name: '뇌 건강 종합 점수',
                    genName: `뇌 건강 종합 점수`,
                },
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
                { code: 'BS', name: '식전혈당' },
                { code: 'TG', name: '중성지방' },
                { code: 'HD', name: 'HDLC' },
                //이하 미정
                { code: 'BMI', name: 'BMI' },
                // { code: 'PP2', name: '식후혈당' },
                { code: 'STRS', name: '스트레스' },
            ],
        },
        {
            name: `위험요인`,
            key: 'riksDctr',
            list: [
                { code: 'WS', name: '허리둘레' },
                { code: 'BP', name: '혈압' },
                { code: 'BS', name: '식전혈당' },
                { code: 'TG', name: '중성지방' },
                { code: 'HD', name: 'HDLC' },
            ],
        },
        {
            name: `복약정보`,
            key: 'takngMdcin',
            list: [
                // { code: 'OB', name: '비만' },
                { code: 'HP', name: '고혈압' },
                { code: 'DB', name: '당뇨' },
                { code: 'DP', name: '고지혈' },
            ],
        },
        {
            name: `위험군별`,
            key: 'riskFctrCnt',
            list: [
                { code: '0', name: '정상군' },
                { code: '1', name: '건강주의군' },
                { code: '3', name: '건강위험군' },
            ],
        },
    ],
    uhealthzoneWeek: [
        {
            name: `매일`,
            seCode: `BD`,
            code: `15`,
        },
        {
            name: `공휴일 휴무`,
            seCode: `RD`,
            code: `21`,
        },
    ],
    deviceGubun: {
        model: {
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
    DeviceSearchCode: {
        name: `기기측정 검색 코드`,
        list: [
            {
                code: `IS`,
                name: `체성분`,
                searchDisabled: true,
            },
            {
                code: `BP`,
                name: `혈압`,
                searchDisabled: true,
            },
            {
                code: `BS`,
                name: `혈당`,
                searchDisabled: true,
            },
            {
                code: `BC`,
                name: `콜레스테롤`,
                searchDisabled: true,
            },
            {
                code: `ST`,
                name: `스트레스`,
                searchDisabled: false,
            },
            {
                code: `ET`,
                name: `기타`,
                searchDisabled: false,
            },
        ],
    },
    StatisticsDeviceCode: [
        {
            name: `기기측정현황`,
            key: 'devices',
            list: [
                {
                    code: `BC`,
                    key: `BC`,
                    name: `콜레스테롤계`,
                },
                {
                    code: `BD`,
                    key: `BD`,
                    name: `활동량계`,
                },
                {
                    code: `BH`,
                    key: `BH`,
                    name: `체온계`,
                },
                {
                    code: `BI`,
                    key: `BI`,
                    name: `뇌 건강 측정기`,
                },
                {
                    code: `BP`,
                    key: `BP`,
                    name: `혈압계`,
                },
                {
                    code: `BPGP`,
                    key: `BPGP`,
                    name: `혈압계 악력계`,
                },
                {
                    code: `BPIC`,
                    key: `BPIC`,
                    name: `혈압계 체성분계 콜레스테롤`,
                },
                {
                    code: `BPIS`,
                    key: `BPIS`,
                    name: `혈압계 체성분계`,
                },
                {
                    code: `BPSR`,
                    key: `BPSR`,
                    name: `혈압계 스트레스계`,
                },
                {
                    code: `BS`,
                    key: `BS`,
                    name: `혈당계`,
                },
                {
                    code: `BSBC`,
                    key: `BSBC`,
                    name: `혈당계 콜레스테롤계`,
                },
                {
                    code: `GP`,
                    key: `GP`,
                    name: `악력계`,
                },
                {
                    code: `HT`,
                    key: `HT`,
                    name: `신장계`,
                },
                {
                    code: `HTIS`,
                    key: `HTIS`,
                    name: `신장계 체성분계`,
                },
                {
                    code: `IS`,
                    key: `IS`,
                    name: `체성분계`,
                },
                {
                    code: `IW`,
                    key: `IW`,
                    name: `체중계`,
                },
                {
                    code: `KK`,
                    key: `KK`,
                    name: `키오스크`,
                },
                {
                    code: `RR`,
                    key: `RR`,
                    name: `스마트줄자`,
                },
                {
                    code: `SR`,
                    key: `SR`,
                    name: `스트레스 측정기`,
                },
                {
                    code: `SB`,
                    key: `SB`,
                    name: `뇌기능`,
                },
            ],
        },
    ],
    Meals: [
        // 식사 구분.
        {
            code: 'BRFT',
            name: '아침',
        },
        {
            code: 'BFSN',
            name: '오전간식',
        },
        {
            code: 'LNCH',
            name: '점심',
        },
        {
            code: 'LCSN',
            name: '오후간식',
        },
        {
            code: 'DINR',
            name: '저녁',
        },
        {
            code: 'DNSN',
            name: '야식',
        },
    ],
}
