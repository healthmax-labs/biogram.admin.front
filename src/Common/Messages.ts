// TODO: 정리 필요.

export default {
    Default: {
        TabCountCheck: `탭 메뉴는 최대 10 개 까지 가능 합니다.`,
        pageError: `잘못된 접근 입니다.`,
        getInfoError: `데이터를 가지고 오지 못했습니다.`,
        processFail: `처리중 문제가 발생했습니다.`,
        imageProcessFail: `이미지 처리중 문제가 발생했습니다.`,
        comingSoon: `준비 중입니다.`,
        processSuccess: `정상 처리 하였습니다.`,
        pstinstSelectEmpty: `소속을 선택해 주세요.`,
        notAllAgree: `모든 약관에 동의 해야 합니다.`,
        stplatSuccess: `약관 동의처리 되었습니다.`,
        searchEmpty: `조회된 데이터가 없습니다`,
        memberConfirmMesure: `수기입력을 하시겠습니까?`,
        saveConfirm: `저장 하시겠습니까?`,
        updateConfirm: `수정 하시겠습니까?`,
        stplatConfirm: `약관 개정 하시겠습니까?`,
        deleteConfirm: `삭제 하시겠습니까?`,
        loginExtension: `후에 자동 로그아웃 됩니다. 로그인 연장 하시겠습니까?`,
        dataGetFail: `데이터를 불러 올수 없습니다.`,
        infoGetFail: `정보를 불러 올수 없습니다.`,
        memberDeleteTitle: `"_NAME_"님 회원 탈퇴를 진행하시겠습니까? <br />탈퇴사유를 작성해주세요.`,
        memberDeleteMemoEmpty: `사유를 입력해 주세요.`,
        memberDeleteSuccess: `회원 탈퇴 처리가 완료 되었습니다.`,
        emptySearchKeyword: `검색어를 입력해 주세요.`,
        memberMbtlnumCrtfcAt: `미인증 회원 입니다.`,
        memberPermitCheck: `권한을 추가 할수 없는 사용자 입니다.`,
        duplicate: {
            uhealthzoneNameDup: '이미 사용중인 설치 장소명 입니다.',
            uhealthzoneNamePoss: '사용가능한 설치 장소명 입니다.',
        },
        remove: {
            removeConfirm: `삭제 하시겠습니까?`,
            removeSelectEmpty: `삭제할 항목을 선택해 주세요`,
        },
        sms: {
            smsSj: `관리자 페이지 메세지 전송`,
            sendConfirm: `메시지를 발송 하시겠습니까?`,
            sendContentEmpty: `내용을 입력해 주세요`,
            sendSndngNoEmpty: `발신번호를 입력해 주세요`,
        },
        phoneAuth: {
            authYet: `인증 되지 않은 휴대폰 번호 입니다.`,
            duplicate: `중복된 번호 입니다. 본인 번호가 맞습니까?`,
            inputTime: `시간초과입니다. 인증번호를 다시 발급 받으세요.`,
            input: `인증번호를 입력해 주세요.`,
            crtfc_result: `인증번호가 다릅니다. 다시 시도해 주세요`,
            authSuccess: `휴대폰 인증을 완료했습니다.`,
            authConfirm: `휴대폰 번호가 변경 되었지만 인증되지 않았습니다. <br /> 그대로 진행 할까요?`,
        },
        validation: {
            name: `이름을 입력해 주세요`,
            phoneNumer: `휴대폰 번호를 입력해 주세요.`,
        },
        member: {
            unityChange: {
                unityUpdate: `조회된 회원정보를 제외한 나머지 데이터는 삭제처리 됩니다. <br />계속 진행하시겠습니까?`,
                unityUpdateSuccess: `회원 정보를 통합했습니다.`,
                unityUpdateFail: `회원 정보를 통합하지 못했습니다. 다시 시도해주세요.`,
            },
            password: {
                change: `비밀번호를 초기화 합니다. <br />초기화된 비밀번호는 등록된 휴대폰번호로 전송 됩니다.`,
                changeSuccess: `비밀번호 초기화 문자를 발송 완료했습니다.`,
            },
            pstinstLeave: {
                confirm: `님 소속 탈퇴를 진행하시겠습니까? <br />탈퇴사유를 작성해주세요.`,
                confirmModal: `소속 탈퇴처리 하시겠습니까?`,
                leaveSuccess: `소속 탈퇴가 완료 되었습니다.`,
            },
            pstinstAdd: {
                agreeConfirm: `소속추가를 하시겠습니까?`,
                addSuccess: `소속추가 등록을 완료했습니다.`,
            },
            contentEmpty: `내용을 입력해 주세요`,
            infoUpdate: `회원정보를 수정 하시겠습니까?`,
            newInfo: `회원정보를 등록 하시겠습니까?`,
            infoUpdateSuccess: `회원정보를 수정 했습니다.`,
            leave: {
                empty: `탈퇴할 회원을 선택해 주세요.`,
                over: `탈퇴는 한번에 한명만 가능합니다.`,
            },
            msgCancleSend: {
                empty: `발송 취소할 메세지를 선택해 주세요.`,
                over: `발송 취소는 한번에 한건만 가능합니다.`,
                success: `발송 취소가 완료 되었습니다.`,
            },
            info: {
                empty: {
                    usid: `아이디를 입력해 주세요.`,
                    password: `비밀 번호를 입력해 주세요.`,
                    password_chk: `비밀 번호확인을 입력해 주세요.`,
                    nm: `이름을 입력해 주세요`,
                    height: `키 정보를 입력해 주세요.`,
                    bdwgh: `체중 정보를 입력해 주세요.`,
                    waistCrcmfrnc: `허리둘레 정보를 입력해 주세요.`,
                    mbtlnum: `휴대폰 번호를 입력해 주세요`,
                },
                check: {
                    usid: `아이디는 영문 대문자 또는 소문자 또는 숫자로 시작하는 이이디(길이 4~16자) 여야 합니다.`,
                    checkUsid: `아이디 중복 체크를 해주세요.`,
                    filterUsid: `아이디에 사용할수 없는 단어가 포함되어 있어요.`,
                    usid_use: `이미 사용중인 아이디 입니다.`,
                    usid_not_use: `사용 가능한 아이디 입니다.`,
                    password: `비밀번호가 일치 하지 않습니다.`,
                    mbtlnumCrtfcAt: `휴대폰 인증을 해주세요.`,
                    sex: `성별을 선택해 주세요.`,
                    height: `정확한 키 정보를 입력해 주세요. ※ 20~250cm 입력 가능`,
                    bdwgh: `정확한 체중 정보를 입력해 주세요. ※ 1~200cm 입력 가능`,
                    waistCrcmfrnc: `정확한 허리둘레 정보를 입력해 주세요. ※ 20~150cm 입력 가능`,
                    passwordCodeCheck: `패스워드는 연속된 숫자나 문자는 사용할 수 없습니다.`,
                    passwordPhoneNumber: `전화번호가 포함된 비밀번호는 사용하실수 없습니다.`,
                    passwordId: `아이디가 포함된 비밀번호는 사용하실수 없습니다.`,
                    passwordBirth: `생일이 포함된 비밀번호는 사용하실수 없습니다.`,
                },
            },
            groupControll: {
                emptyAddRow: `그룹에 추가할 회원을 선택해주세요.`,
                overAddRow: `그룹에 회원 추가는 한번에 한명만 가능합니다.`,
                emptyRemoveRow: `그룹에서 삭제할 회원을 선택해주세요.`,
                overRemoveRow: `그룹에서 회원 삭제는 한번에 한명만 가능합니다.`,
                addMember: `추가 하시겠습니까?`,
                removeMember: `삭제 하시겠습니까?`,
                alreadyGruopMember: `이미 등록되어 있는 그룹입니다.`,
                withoutGruopMember: `등록되어 있는 회원이 아닙니다.`,
                deletePermission: `삭제 할수 없는 그룹입니다.`,
            },
        },
        instSelectStep1: `1차 소속을 입력해 주세요`,
        instSelectStep2: `2차 소속을 입력해 주세요`,
        instSelectStep3: `2차 소속을 입력해 주세요`,
        sidoCodeSelect: `시도 코드를 입력해 주세요`,
        sigunCodeSelect: `시군구 코드를 입력해 주세요`,
        inst: {
            instNmEmpty: `소속명을 입력해 주세요`,
            instNmCheckYet: `소속명 중복 체크를 해주세요`,
            instNmCheckSuccess: `사용 가능한 소속명 입니다`,
            instNmCheckFail: `이미 사용중인 소속명 입니다`,
            newConfirm: `소속 정보를 저장 하시겠습니까?`,
            deleteConfirm: `소속을 삭제 하시겠습니까?`,
            deletePermit: `"_NAME_"님의 관리자 정보를 삭제 하시겠습니까?`,
            approval: {
                appEmpty: `승인 처리할 회원을 선택해 주세요`,
                appOver: `승인 처리는 한번에 한건만 가능합니다.`,
                rejextEmpty: ` 거절 처리할 회원을 선택해 주세요`,
                appSuccess: `승인 처리가 완료 되었습니다.`,
                rejectSuccess: `거절 처리가 완료 되었습니다.`,
            },
        },
        consult: {
            mydataFBSPP2: `공복혈당과 식후혈당을 동시에 입력할 수 없습니다.`,
            chartSaveEmptyRegNm: `작성자 이름을 입력해 주세요`,
            chartSaveEmptyCnst: `상담 내역을 입력해 주세요`,
            chartSaveEmptyPln: `상담 내역을 입력해 주세요`,
            chartSaveConfirm: `상담차트를 작성 하시겠습니까?`,
            chartModifyConfirm: `상담차트를 수정 하시겠습니까?`,
            rangeHba1c: `당화혈색소는 4~15사이의 값을 입력해 주세요`,
            emptyGroupName: `그룹명을 입력해 주세요`,
            emptyGroupCategory: `구분을 선택해 주세요`,
            addConfirm: `등록 하시겠습니까?`,
            updateConfirm: `수정 하시겠습니까?`,
            emptyCheckRow: `삭제할 그룹을 선택해 주세요.`,
            manyCheckRow: `그룹 삭제는 한번에 한 그룹만 삭제 할수 있습니다.`,
            deleteConfirm: `삭제 하시겠습니까?`,
        },
        contents: {
            magazine: {
                empty: {
                    subname: `메거진 제목을 입력해 주세요`,
                    misnSubname: `메거진 설명을 입력해 주세요`,
                    misnComptRewardPoint: `메거진 포인트를 입력해 주세요.`,
                    atchmnflNo: `메인 이미지를 등록해 주세요`,
                    cnAtchmnflNo: `내용 이미지를 등록해 주세요`,
                },
                update: `매거진을 저장하시겠습니까?`,
                updateSuccess: `매거진이 저장되었습니다.`,
                error: {
                    nameLong: `제목이 너무 깁니다.(25자)`,
                    nameEmpty: `제목이 입력되지 않았습니다.`,
                    subNameLong: `설명이 입력되지 않았습니다.`,
                    subNameEmpty: `설명이 입력되지 않았습니다.(100자)`,
                },
            },
            notice: {
                update: `게시물을 저장하시겠습니까?`,
                updateSuccess: `게시물이 저장되었습니다.`,
            },
            instlPlaceEmpty: `지점명을 입력해 주세요.`,
            instlPlaceDuplicate: `지점 중복확인 해주세요.`,
            pstinstEmpty: `소속을 선택해 주세요.`,
            addressEmpty: `주소를 선택해 주세요.`,
            locationEmpty: `위치 정보를 입력해 주세요.`,
            mapAddresEmpty: `지도 URL 을 입력해 주세요.`,
            mhrlsEmpty: `설치 장비를 선택해 주세요.`,
            selectMeasureCodeEmpty: `측정코드를 선택해 주세요.`,
            selectMeasureCodeKeyEmpty: `시리얼 번호를 입력해 주세요.`,
            saveConfirm: `바이오그램존 정보를 저장 하시겠습니까?`,
            updateConfirm: `바이오그램존 정보를 수정 하시겠습니까?`,
            deleteConfirm: `바이오그램존 정보을 삭제 하시겠습니까?`,
        },
        messageSend: {
            emptyTarget: `수신자를 선택해 주세요.`,
            emptyTitle: `제목을 입력해 주세요.`,
            emptyContents: `내용을 입력해 주세요.`,
            emptySndngNo: `발신번호를 입력해 주세요.`,
        },
    },
}
