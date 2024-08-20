# BioGram.Admin.Front

## Biogram Admin Front-End Source.

## git clone

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

-- ssl 인증서 에러 날때.
git config --global http.sslVerify false


git clone https://gitlab.cady.kr/biogram/biogram.admin.front.git

* new
git clone https://gitlab.mybiogram.com/biogram/biogram.admin.front.git

```

## 로컬 개발 환경

```bash
touch .env

> .env
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
REACT_APP_ENV=${environment}
REACT_APP_API_SERVER_URL=${API Server DOMAIN}
REACT_APP_API_IMAGE_SERVER_URL=${IMAGE Server DOMAIN}
REACT_APP_LOGIN_EXPIRE_IN=${login time}
REACT_APP_MENU_CODE=${menu code}
REACT_APP_KAKAOAK_APPKEY=${kakaoak appkey}



yarn install || npm install
yarn start || npm run start
```

## vscode 에디터 extension (Eslint && prettier) 추가.

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) vscode eslint extension 링크
클릭

[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode prettier extension
링크 클릭

## git branch 전략

> feature 브랜치 생성 후 develop 브랜치에 merge feature 브랜치 삭제.

## 개발 및 수정시 git feature branch 생성 및 삭제

```bash
git remote update

-- develop 브랜치 없을때.
git checkout -t origin/develop

-- develop 브랜치 있을때.
git checkout develop


-- 수정 할 기능으로 feature 브랜치 생성.
git checkout -b feature/member-list

-- 개발 완료후
git checkout add .
git commit -m '회원 리스트'
git checkout develop
git merge --no-ff feature/member-list

git push  || git push origin develop
git branch -d feature/member-list || git branch -D feature/member-list
```

> linebreak error fix

```
Just made autocrlf param in .gitconfig file false and recloned the code. It worked!

[core]
    autocrlf = false
```

## environment 파일

* ./config/*


* env.production

```javascript
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
REACT_APP_ENV=production
REACT_APP_API_SERVER_URL=https://mngapi.mybiogram.com
REACT_APP_API_IMAGE_SERVER_URL=https://mngapi.mybiogram.com
REACT_APP_SYS_SERVER_URL=http://mngapi.mybiogram.com
REACT_APP_LINK_SERVER_URL=https://inf.mybiogram.com
REACT_APP_LOGIN_EXPIRE_IN=60
REACT_APP_MENU_CODE=50101
REACT_APP_KAKAOAK_APPKEY=580ca383741b0e8dd188d49f0d398fac
```

* env.local.prod

```javascript
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
REACT_APP_ENV=development
REACT_APP_API_SERVER_URL=https://mngapi.mybiogram.com
REACT_APP_API_IMAGE_SERVER_URL=https://mngapi.mybiogram.com
REACT_APP_SYS_SERVER_URL=http://mngapi.mybiogram.com
REACT_APP_LINK_SERVER_URL=https://inf.mybiogram.com
REACT_APP_LOGIN_EXPIRE_IN=60
REACT_APP_MENU_CODE=50101
REACT_APP_KAKAOAK_APPKEY=580ca383741b0e8dd188d49f0d398fac
```

* env.development

```javascript
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
REACT_APP_ENV=development
REACT_APP_API_SERVER_URL=http://58.227.2.174:58081
REACT_APP_API_IMAGE_SERVER_URL=http://58.227.2.174:58081
REACT_APP_SYS_SERVER_URL=http://58.227.2.174:58081
REACT_APP_LINK_SERVER_URL=http://58.227.2.174:24770
REACT_APP_LOGIN_EXPIRE_IN=60
REACT_APP_MENU_CODE=50101
REACT_APP_KAKAOAK_APPKEY=580ca383741b0e8dd188d49f0d398fac
```

## Deploy
* 버전 변경

    * package.json

```javascript
{
    "name": "biogram.admin.front",
    "version": "1.1.42",
    "private": true,
    "dependencies":
    .
    .
    .
    .
    .

빌드시 버전 변경

```

* development

```javascript

1. 개발 빌드
yarn build:dev


2. 빌드 파일 개발서버에 업로드
./build/*

ftp 192.168.2.240::/var/www/html/mybiogram.com/dev-admin/*

```

* production

```javascript
1. 운영 빌드

yarn build:prod


2. 빌드 파일 -> 점퍼서버에 업로드 -> 운영서버에 업로드
./build/*

점퍼서버
C:\Users\hmadmin\Desktop\admin-front-deploy

운영서버

FileZilla
sftp://Drgram@192.168.35.12

빌드 파일 업로드
/var/www/html/mng
```


## 디렉토리 구조
```
biogram.admin.front
│
└───config
│   │   env.development                                                         개발 env 파일
│   │   env.local.prod                                                          로컬 운영 api 연결
│   │   env.production                                                          운영
│
└───src
    │
    │
    └───Assets                                                                  이미지, 폰트, 이미지 파일들
    │
    │
    └───Common                                                                  공통 사용하는 파일
    │   │   Codes.ts                                                            공통 코드 정리 파일
    │   │   Const.ts                                                            공통 설절 파일
    │   │   ExcelDownloadInitialize.ts                                          각 메뉴 엑셀 다운로드 설정 파일
    │   │   Messages.ts                                                         메시지 정리 파일
    │   │   Routers.ts                                                          리액트 라우터 설정 파일
    │
    │
    └───Components                                                              공통 컴포넌트
    │   │
    │   └───Elements                                                            공통 엘리먼트
    │   │
    │   └───Layouts                                                             공통 레이아웃 파일
    │   │   │   BlankLayoutComponent.tsx                                        비어있는 레이아웃
    │   │   │   ManageLayoutComponent.tsx                                       관리자 전체 레이아웃
    │   │   │
    │   │   SplashComponent.tsx                                                 스플래시 컴포넌트
    │   │   UnderConstructionComponent.ts트                                      공사중 페이지 컴포넌트
    │
    │
    └───Hooks                                                                   공통 훅
    │
    │
    └───Modules                                                                 공통 모듈
    │   _Axios_.ts                                                              axios 공통 통신 모듈
    │   RootRouters.tsx                                                         라우터 모듈
    │
    └───Pages                                                                   페이지 파일들
    │   │
    │   └───Auth                                                                인증 페이지
    │   └───Etc                                                                 기타
    │   └───Manage                                                              관리자 페이지
    │   └───Publish                                                             퍼블리싱 파일들 ( 사용 안함 )
    │
    └───Recoil                                                                  Recoil 파일들
    └───Services                                                                Api 통신 정의 파일
    │
    │
    └───Styles                                                                  스타일 정의 파일들
    │   │
    │   └───Elements                                                            엘리먼트 css
    │   └───Layouts                                                             레이아웃 css
    │   └───Pages                                                               각 페이지 css
    │   │
    │   │   ConstStyles.ts                                                      스타일 정의 파일
    │   │   global.css                                                          전체 css 초기화 파일
    │
    │
    └───Types                                                                    Typescript 정의 파일
    └───Utils                                                                    Utility 파일들
    │   │   Helper.ts                                                            공통 헬퍼 파일
    │   │
    │
    │   index.tsx
    │   App.tsx
    │       .
    │       .
    │       .
    │       .
    │       .
    │
```

## 메뉴추가

> 서버에서 메뉴 추가

```javascript
```

> 라우터 생성


* 메뉴 항목 추가
    ./Common/Routers.ts

* ex)

```javascript
        mainCode: `10000`,
        menuCode: ``,
        name: `회원등록`,
        pathName: `/manage/member/new-member`,
        category: `member`,
        recooilKey: `memberPage/member-detail`,
        showFlag: 'Y',
        reloadButton: false,
        Component: React.lazy(
            () => import('@Page/Manage/Member/MemberDetailPage')
        )
```

## 각 페이지 라우터 와 파일 관계

> 생성해야할 파일

    * 리스트페이지 , 상세(상세페이지, 등록페이지) 페이지
    *  ex) 회원 현황

        * /manage/member/member-list
            * src/Pages/Manage/Member/MemberListPage.tsx
            * src/Pages/Manage/Member/Dtls/MemberListMain.tsx
            * src/Pages/Manage/Member/Dtls/MemberListTable.tsx

        * /manage/member/new-member
            * src/Pages/Manage/Member/MemberDetailPage.tsx
            * src/Pages/Manage/Member/Dtls/MemberDetailMain.tsx
            * src/Pages/Manage/Member/Dtls/MemberDetailTable.tsx

        * /manage/member/392114/detail
            * src/Pages/Manage/Member/MemberDetailPage.tsx
            * src/Pages/Manage/Member/Dtls/MemberDetailMain.tsx
            * src/Pages/Manage/Member/Dtls/MemberDetailTable.tsx

## Recoil

> 각 페이지 Recoil 파일 생성

* src/Recoil/MemberPagesState.ts
* 세부 설정

    * member 페이지

    ```javascript
        interface MemberListInterface {
            status: DefaultStatus
            search: {
                curPage: number
                instNo: string
                instNm: string
                searchKey: string
                registDtFrom: string
                registDtTo: string
            }
            list: MemberInfoListInterface
            manage: {
                checkRow: string[]
                checkRowName: string
                memDeleteMemo: string
            }
        }
    ```

    * 회원 현황 리스트 페이지 ( Recoil )

    ```javascript
        export const MemberListState = atom<MemberListInterface>({
            key: `memberPage/member-list`,
            default: {
                status: 'idle',
                search: {
                    curPage: 1,
                    instNo: '',
                    instNm: '',
                    searchKey: '',
                    registDtFrom: getOneMonthAgo(),
                    registDtTo: getNowDate(),
                },
                list: {
                    MBER_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
                manage: {
                    checkRow: [],
                    checkRowName: '',
                    memDeleteMemo: '',
                },
            },
        }
    ```

    * 사용

        * src/Pages/Manage/Member/Dtls/MemberListTable.tsx

            ```javascript
            const [listState, setListState] = useRecoilState(MemberListState)
            ```

## 리스트 페이지 테이블 생성

> 공통 테이블 컴포넌트

* 컴포넌트 파일
    src/Components/Elements/Tables/MainTable.tsx
* 컴포넌트 타입
     src/Types/TableTypes.ts

> TableConfig 파일 생성및 내용 추가

* 예제)
    * src/Common/TableConfig/Manage/Manage.tsx
    * 컴포넌트 타입 참고


> 리스트 페이지 컴포넌트 생성

    * src/Pages/Manage/Member/MemberListPage.tsx
    * src/Pages/Manage/Member/Dtls/MemberListMain.tsx
    * src/Pages/Manage/Member/Dtls/MemberListTable.tsx

> 테이블 옵션 설정

```javscript
    import {
        MemberTableConfig,
        tableListItemInterface,
    } from '@Common/TableConfig/Manage/Member


    interface tableOptionInterface {
        Loading: boolean
        Options: OptionsInterface<tableListItemInterface>
        Columns: Array<ColumnsInterface<tableListItemInterface>[]>
        Lists: tableListItemInterface[]
    }

    const MemberListTable = ({ CurrentPage }: { CurrentPage: number }) => {

        .
        .
        .

        return (
            <MainTable
                {...tableOptions}
                RowClick={e => handleRowClick(e)}
                CheckedRow={e => handleCheckRow(e)}
                TotalCount={listState.list.TOTAL_COUNT}
                PaginationClick={e => handlePaginationClick(e)}
                CurrentPage={CurrentPage}
            />
        )
    }
```

> 엑셀다운로드

* 각리스트 페이지 ManageBox Component 에 버튼 확인

    * src/Pages/Manage/Member/Dtls/MemberListManageBox.tsx

    * 설정 파일

        src/Common/ExcelDownloadInitialize.ts

    *  예제
        * src/Pages/Manage/Member/Dtls/MemberListManageBox.tsx

            * 엑셀 다운 로그 설정

                ```javascript
                    const [excelDownloadProps, setExcelDownloadProps] = useState<ExcelDownloadPropsInterface>(
                        ExcelDownloadInitialize.Member.MemberList
                    )
                ```

            * 엑셀 다운로드 프롭스 설정

                ```javascript
                    setExcelDownloadProps(prevState => ({
                            ...prevState,
                            FileName:
                                instNo && instNm
                                    ? `회원_현황_${instNm.replace(
                                        / /g,
                                        '_'
                                    )}_${getNowDateDetail()}`
                                    : `회원_현황_${getNowDateDetail()}`,
                            Data: payload.MBER_INFO_LIST.map(m => {
                                return [
                                    String(m.MBER_NO),
                                    m.NM,
                                    m.USID,
                                    m.MBTLNUM,
                                    m.MBTLNUM_CRTFC_AT_NM,
                                    m.BRTHDY,
                                    m.SEXDSTN_NM,
                                    m.INST_NM,
                                    m.WORK_TY_CODE == 'N'
                                        ? '미지정'
                                        : m.WORK_TY_CODE == 'I'
                                        ? '내근직'
                                        : '외근직',
                                    m.CONECT_DT,
                                    m.REGIST_DT,
                                    m.TOT_CASH,
                                    m.SUM_CASH_HIST,
                                창
                            }),
                            SpliceColumns:
                                Theme === 'GeonDaon'
                                    ? [{ start: 1, end: 1 }]
                                    : [{ start: 9, end: 1 }],
                        }))
                ```
            * 엑셀 다운로드 모달창

                ```javascript
                    {pageState.modal.excelDownload && (
                        <ExcelDownload
                            {...excelDownloadProps}
                            DownloadEnd={() =>
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        excelDownload: false,
                                    },
                                }))
                            }
                        />
                    )}
                ```



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
