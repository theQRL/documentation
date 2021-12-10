---
title: 'QRL Documentation Guidelines'
disqus: hackmd
---

QRL Documentation Guidelines
===


## Table of Contents

[TOC]

## Getting Started

To get started contributing to the documentation follow these steps:

1. Fork the repo at github.com/theqrl/documentation
2. Install any [Docusarus](https://docusaurus.io/docs/installation#requirements) requirements
3. Start the local development server `cd documentation && npm run start`
4. Start writing documentation!

Frontmatter
---

Each document starts with a frontmatter slug following the guidelines below. 

```yaml
---
id: {FILE-NAME-WITHOUT-ENDING}
title: {DOCUMENT TITLE}
hide_title: false
hide_table_of_contents: false
sidebar_label: {SIDEBAR LABEL - SAME AS TITLE UNLESS TOO LONG}
sidebar_position: 2
pagination_label: {PAGINATION LABEL- SAME AS TITLE UNLESS TOO LONG}
custom_edit_url: https://github.com/theQRL/documentation/edit/main/{DOCUMENT LINK IN MAIN REPO}
description: {BREIF DESCRIPTION OF PAGE FOR SEO}
keywords:
  - docs
  - {RELITAVE KEYWORDS TO DOC}
image: /assets/img/icons/yellow.png
slug: /{PATH OF DOCUMENT TO SERVE eg: '/wallet/advanced/cli/backup-cli-wallet'}
---
```

Example:

```yaml
---
id: qrl-wallet
title: QRL Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL wallet
sidebar_position: 1
pagination_label: QRL wallet
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: QRL wallet
keywords:
  - docs
  - wallet
image: /assets/img/icons/yellow.png
slug: /wallet
---
```


Documentation Guidelines
---

- Simple is better, keep the docs concise and short
- Ensure all steps are required and function as expected
- Include any relative information to the guide and link to resources
- Do not duplicate information, link to the documentation instead



### Documentation Layout

Layout for the user technical documentation should follow something like this:


```
# Title

## Overview
Breif overview of the document and its intended purpose. Include any gotcha information here like *OTS key use warnings*

## Instructions

## Advanced information

## Links to similar topics
```

### Tutorial Layout

Tutorials differ from technical documentation and walk the reader through design decisions and holistic tasks like using the QRL tools to create applications. These should walk the user through the design, elements and 

- Requirements
  - Dependencies and additional packages required to duplicate



Contributing
---

When complete with changes, submit a Pull Request to the main Repo. This assumes your changes are in your fork's main branch. `git checkout main`


Ensure your local fork is up to date with the remote upstream branch on the main repo

```bash
git checkout main && git pull
git remote add upstream https://github.com/theQRL/documentation
git fetch upstream
git rebase upstream/main
# Push any upstream changes to remote fork
git push -f origin main
````

Open a Pull Request from your fork with the latest changes for peer review.



## Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::

###### tags: `knowledgebase` `Documentation`
