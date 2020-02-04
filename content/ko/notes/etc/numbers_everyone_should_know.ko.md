---
title: "모두가 알아야 할 숫자"
date: 2019-12-23T09:17:04+09:00
description: 데이터 읽기, 쓰기, 전송 속도
tags:
-
series:
-
categories:
-
enableToc: false
image: images/feature2/number.png
---

출처: [http://brenocon.com/dean_perf.html](http://brenocon.com/dean_perf.html)

| action  | ns  | ms  |
|---|---|---|
| L1 cache reference  | 0.5 ns  |   |
| Branch mispredict  | 5 ns  |   |
| L2 cache reference  | 7 ns  |   |
| Mutex lock/unlock  | 100 ns  |   |
| Main memory reference  | 100 ns  |   |
| Compress 1K bytes with Zippy  | 10,000 ns  | 0.1 ms  |
| Send 1K bytes over 1 Gbps network  | 10,000 ns  | 0.1 ms  |
| Read 1 MB sequentially from memory	  | 250,000 ns  | 0.25 ms  |
| Round trip within same datacenter  | 500,000 ns  | 0.5 ms  |
| Disk seek  | 10,000,000 ns  | 10 ms  |
| Read 1 MB sequentially from network	  | 10,000,000 ns  | 10 ms  |
| Read 1 MB sequentially from disk  | 30,000,000 ns  | 30 ms  |
| Send packet CA->Netherlands->CA  | 150,000,000 ns  | 150 ms  |

Where

- 1 ns = 10<sup>-9</sup> seconds
- 1 ms = 10<sup>-3</sup> seconds