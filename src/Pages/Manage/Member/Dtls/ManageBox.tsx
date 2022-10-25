import React from 'react'
import { SearchBoxWapper, SearchRightBox } from '@Style/Pages/Member'
import { DefaultManageButton } from '@Element/Buttons'

export default function SearchBox() {
    return (
        <div className="w-full justify-evenly min-width[1024px]">
            <div className="col-span-2 items-end justify-end min-width[400px] text-right">
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인1'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인2'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인3'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인4'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인5'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인6'}
                />
            </div>
        </div>
    )
}
