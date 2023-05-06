---
docstatus: DRAFT
id: qrl-api
title: QRL API
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL API
sidebar_position: 1
pagination_label: QRL API
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API
keywords:
  - docs
  - build
  - developers
  - API
image: /assets/img/icons/yellow.png
slug: /api
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!

- Give brief overview of each API, their functions and good use cases to implement the API from a development perspective.
- Integrqate openapi into the API docs: https://docusaurus-openapi.tryingpan.dev/  https://github.com/PaloAltoNetworks/docusaurus-openapi-docs
- need to write an OPENAPI spec file.

</span>
:::

The QRL API is broken into multiple offerings, all related to separate functions of the system. 


While there is no authentication required to interact with most of the QRL's API's, you will need to be able to reach the API service IP and port. 

This may require additional configuration through your network such as NAT or port forwarding. This is out of scope for this document.  

> Using `nping` to check if a port is accessible from the location attempting to access the API may help in troubleshooting any connection issues.



## QRL API's

Most of the QRL APS's are related to and run in parallel to a QRL node. THese API's include:

- qrl-api
- wallet-api
- walletd-rest-proxy API


Additionally there are some API's offered through public facing team hosted infrastructure to support any chain lookups, address checks and even sending transactions. These API's are:

- Explorer-API
- Zeus Proxy API

