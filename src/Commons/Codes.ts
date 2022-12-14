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
}
