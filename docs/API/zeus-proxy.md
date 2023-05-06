---
docstatus: DRAFT
id: zeus-proxy-api
title: QRL Zeus Proxy API
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL API - Zeus Proxy
sidebar_position: 4
pagination_label: QRL API - Zeus Proxy
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API - Zeus Proxy
keywords:
  - docs
  - build
  - developers
  - API
  - Zeus
image: /assets/img/icons/yellow.png
slug: /api/zeus-proxy-api
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::



###  Multisig transaction

```python
import requests, json, pymongo

from pyqrllib.pyqrllib import QRLHelper, bin2hstr
network = "testnet"
p = requests.post(f'https://zeus-proxy.automated.theqrl.org/grpc/{network}/MultiSigCreateTxnReq', data={  'master_addr': 'Q0204000d8c98d799f2d7f38c3f177bbb583bc4d3cc53ffb329bf2ec851d249413604731d9e5364', 'signatories': ['Q0106006852a0e32f2f555bacfd316ab0e34d78d72072378c7ba1722dd4eba5e99a43e671904338','Q010600b73498cfa4ca470fe878fc7b8ed85b92519d44f19f9b5f30c752405f51384e1c8b419c26'],'weights': [1, 1],'threshold': 1,'fee': 0, 'xmss_pk': 'Q0204000d8c98d799f2d7f38c3f177bbb583bc4d3cc53ffb329bf2ec851d249413604731d9e5364'}) 
print(p)

data = p.json()
print (data)

```