---
docstatus: DRAFT
id: walletd-rest-proxy
title: walletd-rest-proxy
hide_title: false
hide_table_of_contents: false
sidebar_label: walletd-rest-proxy
sidebar_position: 3
pagination_label: walletd-rest-proxy
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: walletd-rest-proxy
keywords:
  - docs
  - Advanced
  - QRL walletd-rest-proxy
image: /assets/img/icons/yellow.png
slug: /developers/wallet/walletd-rest-proxy
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


walletd-rest-proxy.md


Go version of REST proxy for WalletAPIService

# Installation
```
go get github.com/theQRL/walletd-rest-proxy
cd $GOPATH/src/github.com/theQRL/walletd-rest-proxy
go build
./walletd-rest-proxy -serverIPPort 127.0.0.1:5359 -walletServiceEndpoint 127.0.0.1:19010
```