---
docstatus: DRAFT
id: integration-tests
title: QRL Integration Tests
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Integration Tests
sidebar_position: 8
pagination_label: QRL Integration Tests
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Integration Tests
keywords:
  - docs
  - Advanced
  - QRL Integration Tests
image: /assets/img/icons/yellow.png
slug: /developers/integration-tests
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::




[![CircleCI](https://circleci.com/gh/theQRL/integration_tests.svg?style=svg)](https://circleci.com/gh/theQRL/integration_tests)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/theQRL/qrllib/master/LICENSE)

# QRL Integration Tests

## How to run integration tests

Get CircleCI CLI (https://circleci.com/docs/2.0/local-cli/#installing-the-circleci-local-cli-on-macos-and-linux-distros)

Clone this repo and run:

```bash
circleci build
```

if you want to run some specific group/job, you can select it by using:
```bash
circleci build --job JOB_NAME
```

where JOB_NAME is one of the job described in `.circleci/config.yml`.

Example:
```bash
circleci build --job tests_js
```

When running locally, it might be useful to run the `debug` job
Example:
```bash
circleci build --job debug
```
This job is not run in the CI server but can be used locally to test different scenarios, filter specific tests, etc.