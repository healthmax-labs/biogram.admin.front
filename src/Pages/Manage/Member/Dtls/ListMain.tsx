import React from 'react'
import { Members } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'

export default function ListMain() {
    return (
        <Members.Main.Container>
            <Members.Main.SearchWapper>
                <SearchBox />
            </Members.Main.SearchWapper>
            <Members.Main.ManageWapper>
                <ManageBox />
            </Members.Main.ManageWapper>
            <Members.Main.TableWapper>
                <ListTable />
            </Members.Main.TableWapper>
        </Members.Main.Container>
    )
}
