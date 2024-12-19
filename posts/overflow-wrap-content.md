---
title: "CSS overflow-wrap | 글자가 화면 밖으로 탈출"
date: "2024-12-19"
---

오늘 Next.js 15로 블로그를 구축하고 있는데, 제목이 너무 길어지자 줄바꿈이 되지 않고, 화면 밖으로 탈출하는 이슈가 발생했다.

# 해결 방법

`break-word`는 한 줄에서 대신 줄을 바꿀 만한 지점이 없을 시 임의의 지점에서 줄을 바꾼다.

```css
overflow-wrap: break-word;
```
