import React from 'react'
import { ListTableStyle } from '@Style/Pages/MemberPageStyles'

// 회원 테이블 데이터
import { ConsultInfoListItemInterface } from '@Type/MemberTypes'

export type tableListItemInterface = ConsultInfoListItemInterface

// 테이블 설정.
export const TableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `회원번호`,
            key: `MBER_NO`,
        },
        {
            name: `이름`,
            key: `NM`,
        },
        {
            name: `아이디`,
            key: `USID`,
        },
        {
            name: `휴대폰번호`,
            key: `MBTLNUM`,
            component: ({ el }: { el: ConsultInfoListItemInterface }) => {
                return (
                    <ListTableStyle.MbtlnumCell CRTFC={el.MBTLNUM_CRTFC_AT}>
                        {el.MBTLNUM}
                    </ListTableStyle.MbtlnumCell>
                )
            },
        },
        {
            name: `성별`,
            key: `SEXDSTN_NM`,
        },
        {
            name: `소속`,
            key: `INST_NM`,
        },
        {
            name: `최근측정일`,
            key: `MESURE_DT`,
        },
        {
            name: `휘험요인`,
            key: `RISK_FCTR`,
        },
    ],
    Lists: [],
}
