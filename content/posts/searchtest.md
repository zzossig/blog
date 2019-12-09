---
title: "Searchtest"
date: 2019-12-09T09:40:07+09:00
description: Git中的ssh和https及相关问题
tags:
-
series:
-
categories:
-
---

尝试通过SSH进行身份验证时，您可能会看到以下错误消息 ：

当尝试使用Git并通过SSH协议进行 clone, push,或 pull时，如果Bitbucket无法使用SSH agent提供的密钥进行身份验证，则可能会收到下面的某一条消息：

Permission denied (publickey)
No suitable response from remote
repository access denied
可能的原因：

在Linux中，你不应该使用sudo进行上述操作，因为 ssh-agent 是在用户级别运行而非root级别运行。

你的 公钥 并没有添加到服务器端。

您的密钥未加载到ssh agent中 。（如果您的SSH代理不知道为Bitbucket提供密钥，则连接将失败。如果您最近重新启动了系统，则可能会遇到此问题。 ）解决方法：

检查相应的 ssh key 是否被加载：