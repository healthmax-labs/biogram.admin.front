import React from 'react'
import { VaryButton, VaryModal } from '@Elements'
import DaumPostcode from 'react-daum-postcode'
import {
    DaumPostCodeInterface,
    KaKaoAddressSearchInterface,
} from '@CommonTypes'
import { getKaKaoAddressInfo } from '@Service/EtcService'

const KaKaoPostCodeModal = ({
    Complete,
}: {
    Complete: ({
        state,
        address,
    }: {
        state: boolean
        postState?: boolean
        infoState?: boolean
        address?: DaumPostCodeInterface
        fullAddress?: string
        info?: KaKaoAddressSearchInterface
        x?: string
        y?: string
    }) => void
}) => {
    const handleComplete = async (e: any) => {
        const getAddress: DaumPostCodeInterface = e as DaumPostCodeInterface

        let fullAddress = getAddress.address
        let extraAddress = ''
        if (getAddress.addressType === 'R') {
            if (getAddress.bname !== '') {
                extraAddress += getAddress.bname
            }
            if (getAddress.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${getAddress.buildingName}`
                        : getAddress.buildingName
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
        }

        const { status, payload } = await getKaKaoAddressInfo({
            fullAddress: fullAddress,
        })

        if (status) {
            Complete({
                state: true,
                postState: true,
                infoState: true,
                address: getAddress,
                fullAddress: fullAddress,
                info: payload,
                x: payload.documents[0].x ? payload.documents[0].x : '',
                y: payload.documents[0].y ? payload.documents[0].y : '',
            })
        } else {
            Complete({
                state: true,
                postState: true,
                infoState: false,
                address: getAddress,
                fullAddress: fullAddress,
            })
        }
    }
    return (
        <>
            <VaryModal
                ModalLoading={false}
                MaxWidth={`lg`}
                Children={
                    <>
                        <DaumPostcode
                            autoClose={false}
                            onComplete={e => handleComplete(e)}
                        />
                    </>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'manage'}
                            ButtonName={'닫기'}
                            HandleClick={() => Complete({ state: false })}
                        />
                    </>
                }
            />
        </>
    )
}

export default KaKaoPostCodeModal
