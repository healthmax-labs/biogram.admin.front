# BioGram.Admin.Front

## Biogram Admin Front-End Source.


## git clone
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

-- ssl 인증서 에러 날때.
git config --global http.sslVerify false


git clone https://gitlab.cady.kr/biogram/biogram.admin.front.git
```

## 로컬 개발 환경
```bash
touch .env

> REACT_APP_API_SERVER_URL=${서버 URL}

yarn install || npm install
yarn start || npm run start
```

## vscode 에디터 extension (Eslint && prettier) 추가. 

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) vscode eslint extension 링크 클릭

[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode prettier extension 링크 클릭

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
