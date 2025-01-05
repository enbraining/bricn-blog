---
title: "GOGO"
date: "2023-03"
endDate: "2024-08"
team: "GOGO TF"
---

> Docker, Github Actions, AWS EC2, Spring Batch, Multi Module

체육대회를 재밌게 즐기기 위해서 미니게임, 경기 알림 등의 기능이 포함된 프로젝트를 개발했습니다.

# 배치 작업

해당 프로젝트에서는 응원할 팀을 하나씩 정할 수 있습니다. 자신이 응원하는 팀의 경기가 있다면 10분 전에 미리 메시지로 공지해주는 기능으로, Spring Batch와 CoolSMS를 이용해서 구현했습니다.

[🔁 경기 10분 전 알림](https://github.com/GSM-GOGO/gsmgogo-server-v2/pull/164)

전화번호 인증을 구현하기 위해서 사용한 CoolSMS는 메시지 1건당 요금이 발생하기 때문에 비용 절감을 위해서, 인증 횟수를 저장해야만 했습니다. 이러한 인증 횟수를 자정마다 초기화하는 기능을 구현하기 위해서 Spring Batch와 Schedule을 사용했습니다.

[🔁 스프링 배치 설정 및 정각에 실행되는 Job 추가](https://github.com/GSM-GOGO/gsmgogo-server-v2/pull/58)

# 멀티 모듈

API, Entity, Batch 중요한 도메인 3개로 구분해서 멀티 모듈을 구성하였습니다. 이를 통해 유지보수가 더 쉽고, 느슨한 결합을 만들 수 있었습니다.

아쉬웠던 점이 있다면 Batch 모듈을 나누는 과정에서 API 서버와 Batch 서버가 둘 다 노출되면서, Security 설정 파일도 2개가 되었고, 보안 상의 관점으로도 안전하지 않아보였습니다.

다음에 이와 같은 프로젝트를 진행한다면 API 서버만 노출시켜서, Batch 서버로의 직접적인 요청 대신, API 서버를 통해서만 Batch 서버로 요청을 보낼 수 있도록 수정해볼 것 같습니다.
