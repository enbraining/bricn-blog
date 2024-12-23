---
title: "Ubuntu Multipass 사용해보기"
date: "2024-09-09"
---

Canonical에서 만들어진 Ubuntu VM 워크스테이션이다.

# 설치하기

Windows, MacOS 등의 운영체제를 지원한다.

[다운로드](https://multipass.run/install)

# 명령어

## VM 생성하기

```shell
multipass launch -n example-vm-1
```

## VM 접속하기

```shell
multipass shell example-vm-1
```

## VM 정보

```shell
multipass info example-vm-1
```

## VM 삭제

```shell
multipass delete example-vm-1
```
