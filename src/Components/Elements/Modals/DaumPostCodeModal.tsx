import { DefaultManageButton, VaryModal } from '@Elements'
import DaumPostcode from 'react-daum-postcode'
import { DaumPostCodeInterface } from '@CommonTypes'
import React from 'react'

const DaumPostCodeModal = ({
    Complete,
}: {
    Complete: ({
        state,
        address,
    }: {
        state: boolean
        address?: DaumPostCodeInterface
        fullAddress?: string
    }) => void
}) => {
    const handleComplete = (e: any) => {
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

        Complete({ state: true, address: getAddress, fullAddress: fullAddress })
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
                        <DefaultManageButton
                            ButtonName={'닫기'}
                            ButtonClick={() => Complete({ state: false })}
                        />
                    </>
                }
            />
        </>
    )
}

export default DaumPostCodeModal
