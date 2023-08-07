---
docstatus: 30%
id: on-chain-voting
title: On-chain Voting
hide_title: false
hide_table_of_contents: false
sidebar_label: On-chain Voting
sidebar_position: 5
pagination_label: On-chain Voting
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/xmss.md
description: QRL On-chain voting system info
keywords:
  - On-chain Voting
  - decentralized-governance
image: /assets/img/icons/yellow.png
slug: /build/fundamentals/on-chain-voting
---


The QRL has implemented an on-chain voting system to help facilitate decentralized decision making, allowing the user base, coin holders, and the community, a say in the direction and outcome of the core project.

This voting system has been used to implement changes to the core project related to QRL Improvement Proposals (QIP), allowing a larger audience to input on the outcome of the project.

:::info QRL Improvement Proposals (QIPs)
The [QIP system is documented here](/build/qip/overview), and all proposals can be seen in the [QIP GitHub Repo](https://github.com/theQRL/qips/).
If you would like to propose an improvement or change to the function of the QRL Core systems, [see the QIP workflow]](https://github.com/theQRL/qips/blob/master/qip-workflow.md). Submissions are welcome!
:::


When a change is proposed to the core project the QRL developers will setup a vote, with specific details as outlined in the QRL improvement proposal. This will be reflected in the [vote.theqrl.org/](https://vote.theqrl.org/) site with instructions on when the vote is taking place and how to vote.

## Vote System Overview

The voting system utilizes the QRL Messaging system to collect votes from participating members. 

A vote proposal will contain a blockheight that will start the voting period, as well as relevant details about the vote like eligibility, mechanics and the data being voted on.

This information will be shown in the vote interface found at [vote.TheQRL.org](https://vote.theqrl.org/) when the vote goes live.

### Participating In A Vote

In order to participate in a vote, a QRL holder will need to have the eligible amount of QRL held in their address prior to the announced blockheight for the vote snapshot. 

This blockheight will be communicated and announced with plenty of time to allow fund transfers to happen, and at that block any message with the correct information will be counted.

Once the vote goes live there will be a message hash, or some random data that you will use for the message body of the transaction that will be transmitted from the address containing funds. This transaction does not transfer any funds, only broadcasts your vote metadata on-chain. This will mark your vote in one way. 

:::note Exchange Addresses are not eligible
In order to participate in a vote, the users address must be able to send a message transaction, and this is not typically supported by the exchanges.
:::

Once the vote is concluded, a tally will be made from all eligible addresses and the vote outcome will be made public.

### Holding a Vote

Anyone is able to conduct an on-chain vote which is basically just counting the amount of messages sent with the correct corresponding message hash related to the vote. 

To get started an example is provided with a working Meteor site provided open source and available to fork and modify. Follow the instructions in the [Vote-QRL GitHub repository](https://github.com/theQRL/vote-qrl) to get started.
