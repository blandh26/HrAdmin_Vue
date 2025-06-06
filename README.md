<h2 align="center">HrAdmin_Vue 백엔드 관리 시스템</h2>

[中文版](https://github.com/blandh26/HrAdmin_Vue/blob/main/README-zh_CN.md)

## 🍟 개요

- 본 저장소는 프론트엔드 기술 스택 [Vue3](https://v3.cn.vuejs.org) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 버전입니다.
- 연동 백엔드 코드 저장소 주소 [HrAdmin_Net](https://github.com/blandh26/HrAdmin_Net) 버전입니다.
- 프론트엔드는 Vue3.0, Element UI Plus, vite, compisition api, Pinia 등을 사용합니다.
- 동적 권한 메뉴 로딩을 지원하며, 다양한 방식으로 손쉬운 권한 제어가 가능합니다.
- 관리자: admin
- 비밀번호: 123456

```
도움이 되셨다면, 우측 상단의 "Star"를 눌러 저장해주세요. 개발자가 무료로 계속 개발할 수 있는 동력이 됩니다. 감사합니다!~
```

## 🍁 프론트엔드 실행

```bash
# 저장소 복제
git clone https://gitee.com/izory/ZRAdmin-vue.git

# 프로젝트 디렉터리 이동
cd ZRAdmin-vue
# 의존성 설치
npm install
# 서비스 시작
npm run dev

# 프론트엔드 접속 주소 http://localhost:8887
```

## 🍖 내장 기능
1. 사용자 관리: 시스템 운영자 설정 기능
2. 부서 관리: 조직 구조 설정(회사/부서/팀), 트리 구조 표시
3. 직위 관리: 사용자 소속 직무 설정
4. 메뉴 관리: 시스템 메뉴, 운영 권한, 버튼 권한 식별자 설정(다국어 지원)
5. 역할 관리: 역할별 메뉴 권한 할당
6. 사전 관리: 고정 데이터 유지 관리
7. 운영 로그: 시스템 정상/예외 로그 기록 및 조회
8. 로그인 로그: 로그인 기록 조회(예외 포함)
9. 시스템 인터페이스: Swagger 기반 API 문서 생성
10. 매개변수 설정: 공통 매개변수 구성
11. 이메일 발송: 다중 사용자 메일 발송
12. 작업 시스템: Quartz.NET 기반 작업 스케줄링(추가/수정/삭제/수동 실행)
13. 게시물 관리: 게시물 기록 작성
14. 코드 생성: 프론트/백엔드 코드 일괄 생성(.cs/.vue/.js/SQL)
15. 파일 관리: 업로드 파일 관리(로컬/Aliyun 지원)
16. 공지 관리: 시스템 공지 발행 및 유지
17. 매개변수 관리: 동적 시스템 매개변수 설정
18. 다국어 관리: 다국어 번역 동적 수정
19. 계정 등록: 시스템 가입 및 로그인
20. 다국어 관리: 정적/동적 국제화 구성(중/영/번체 지원)
21. 온라인 사용자: 접속 중 사용자 관리(강제 로그아웃/알림)
22. DB 감사 로그: 데이터베이스 감사 기능
23. 제3자 로그인: 외부 로그인 구현 로직
24. 가져오기/내보내기: 중국어 헤더 가져오기, 사전 데이터 텍스트 내보내기

## 🎉 优势
1. 프론트엔드: 로그인/인증 모듈 없이 비즈니스 모듈 개발 전용
2. 백엔드: 추가 개발 없이 즉시 배포 가능
3. 프론트-백엔드 분리: 독립 도메인 운영 가능
4. 글로벌 예외 통합 처리
5. 사용자 정의 코드 생성 기능
6. 국제화

## 💐 特别鸣谢
- 👉👉본 프로젝트는 오픈소스 프로젝트 ZRAdmin-vue를 기반으로 재개발되었습니다.

## 💐 授权许可协议条款
- HrAdmin_Vue는 MIT 오픈소스 라이선스를 적용합니다.
- 개인 프로젝트 또는 기업용 프로젝트 템플릿으로 무료 사용 가능합니다.
- 상업적 사용이 허용되지만, 재배포 및 유료 판매는 금지되며 법적 책임을 묻습니다.
- 단순 수정 후 자체 프로젝트로 주장하는 행위를 금지합니다.
