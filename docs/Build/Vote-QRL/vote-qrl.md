---
docstatus: 30%
id: vote-qrl
title: Vote QRL Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Vote QRL
sidebar_position: 9
pagination_label: Vote QRL
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Vote QRL
keywords:
  - docs
  - Advanced
  - QRL Vote
image: /assets/img/icons/yellow.png
slug: /build/vote-qrl/overview
---


Deployed at <https://vote.theqrl.org>

## Dependencies

NodeJS: <https://nodejs.org/en/>
Meteor: <https://www.meteor.com/developers/install>

## Building

1. Clone repo
2. Create a settings file in cloned directory (see **Settings** section below)
3. ```npm install```
4. ```meteor --settings settings.json```

## Settings

Example ```settings.json``` file:

```json
{
  "vote": {
    "blockheight": 831769,
    "originator": "The QRL Foundation",
    "title": "Test vote - desktop theme",
    "eligibility": "Balance > 1 Quanta",
    "excluded": "Nil",
    "mechanics": "Simple proportional vote",
    "expires": "At end of test period (TBA)"
  },
  "options": [
    {
      "data": {
        "vote": "DARK MODE"
      },
      "hash": null
    },
    {
      "data": {
        "vote": "LIGHT MODE"
      },
      "hash": null
    }
  ],
  "adminPass": "CHANGEME"
}
```