---
title: "휴고 테마 적용하는 방법"
date: 2019-12-12T09:16:12+09:00
description: 윈도우, 맥 로컬 환경에서 휴고 실행하기.
tags:
- hugo
series:
- hugo
categories:
- 
keywords:
- hugo
- hugo-theme
- 휴고 테마
image: images/feature1/apply-theme.png
---

## Zzo 테마 적용 방법

다른 테마 적용하는 방법도 비슷 할 겁니다. 제가 말씀 드리는 대로만 하면 순탄하게 테마를 적용하실 수 있을겁니다.(사실 뭐든 처음에는 삽질이 필요하죠) 

1. 우선 패키지 매니저를 설치해야 합니다.
2. 윈도우에서는 Chocolatey라는 패키지 매니저를 사용하시면 됩니다. 맥에서는 Homebrew입니다.
3. Chocolatey를 설치하려면 Powershell을 Run as Administrator로 실행해야 합니다.
4. 다음 코드를 복사하고 Powershell에 붙여넣어 주세요.

    ```shell
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```

5. Chocolatey를 설치 하셨다면 다음 명령어로 Hugo를 설치해주세요.

    - 윈도우
    ```shell
    choco install hugo-extended -confirm
    ```

    - 맥
    ```shell
    brew install hugo
    ```

6. 이제 휴고가 잘 설치 되었나 확인해주세요.

    ```shell
    hugo version
    ```

7. 휴고가 잘 설치 되었다면, 이제 사이트를 만들 차례입니다. 먼저 폴더 하나를 만들고 그 폴더 안에서 다음 명령어를 입력해주세요. 명령어 마지막에 .(점) 하나 찍는거 필수입니다.

    ```shell
    hugo new site .
    ```

8. 만드신 루트 폴더 안에 여러가지 휴고관련 빈 폴더와 파일이 생성되었을 겁니다. 이제 휴고 테마를 적용해야 겠죠. 테마를 적용하는 방법에는 두가지가 있습니다. 그냥 가장 단순하게, 원하는 theme 레포에 가셔서 파일을 다운로드 하신 후, theme폴더에 풀면 되죠. 아니면 git submodule을 이용하는 방법이 있습니다. git submodule을 사용하면 테마관련 업데이트가 있으면, 업데이트된 버전을 자신의 블로그에 쉽게 적용하실 수 있습니다. git submodule과 관련해서는 이야기가 복잡해지므로, zip파일을 풀어넣는 방법으로 설명드리겠습니다.

9. 원하시는 휴고 테마의 레포에 가셔서 해당 레포를 다운로드 해주세요. 저는 Zzo 테마를 사용하겠습니다. 다운로드 한 압축 파일을 themes/zzo 폴더에 풀어주세요.

10. themes/zzo 폴더 안에 exampleSite라는 폴더가 있을겁니다. 그 폴더 안에 있는 config, content, static 이 세개의 폴더를 복사해서 루트 폴더에 붙여넣어 주세요. 기존에 루트 폴더에 있던 config.toml 파일은 필요없으니 지워주세요. 저희가 복사한 config 폴더 안에 config.toml파일이 있고 그걸 설정파일로 사용할겁니다.

11. 이제 실행시키면 됩니다.

    ```shell
    hugo server -D
    ```
