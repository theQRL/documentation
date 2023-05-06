---
docstatus: DRAFT
id:  qip-specification
title: QIP Specification
hide_title: false
hide_table_of_contents: false
sidebar_label: QIP Specification
sidebar_position: 4
pagination_label: QIP Specification
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QIP Specification
keywords:
  - docs
  - Advanced
  - QRL Improvement Process
  - QIP Specification
image: /assets/img/icons/yellow.png
slug: /developers/QIP/qip-specification
---


## 1. QIP

Initially left blank and is assigned after the PR is submitted with the numerical ID of the *pull request*. 

Having the QIP ID reflect the pull request allows for easier tracking and avoids QIP ID collisions.

## 2. Title

The title of the QIP that describes the rest of the content. 

## 3. Status

Status hierarchy is concatenated into a string with forward slashes.

1. draft
   1. incomplete
   2. abandoned
   3. deferred
   4. withdrawn
   5. rejected
2. proposal
   1. open
   2. review
   3. accepted
      1. available
      2. in_development
      3. awaiting_hardfork
      4. completed
   4. deferred
   5. rejected

### 3.1. Drafts

#### 3.1.1. Incomplete (Open)

Once an idea is vetted through the community, it can be formed into an initial draft.

Drafts open to feedback are marked as incomplete and remain this state until fleshed out and ready for the request for proposal.

#### 3.1.2. Abandoned

If there's been no movement on a draft, it may be marked as abandoned during QIP maintenance. 

#### 3.1.3. Deferred

A draft may be deferred for any number of reasons, such as new information that's presented itself or is still developing which may make the draft unsuitable.

#### 3.1.4. Withdrawn

At any point during the draft process, it can be withdrawn.

#### 3.1.5. Rejected

It's possible a draft gets merged, but doesn't meet the criteria for a QIP. In this case it may be rejected.

### 3.2. Proposals

Before a proposal can be opened, it must first complete the draft stage and go through a request for proposal.

#### 3.2.1. Open

Public comment is invited on open proposals. Once the proposal is sufficiently mature it will be moved by the QRL Foundation maintainers to the next stage.

#### 3.2.2. Under review

Proposals under discussion will be considered at the next QRL Developer meeting. Particularly complex or in depth QIPs may require a separate meeting or face-to-face discussions by the QRL development team prior to decisions being made as to the outcome.  As this point they may be returned to 2.1 for further refinement.

#### 3.2.3. Accepted

Accepted proposals require development until such a point when they are released
or they are ready for release at the next hard fork of the network.  As such, an
accepted QIP may be in one of four states:

1. Available (for a developer/team to take on engineering the QIP; avoiding
duplication of effort)
2. In development
3. Awaiting hard fork
4. Completed

#### 3.2.4. Deferred

Deferred proposals have merit to the project but for operational reasons are held
back from entering development.  Deferred proposals may enter development at a
later date or may move into a different category as the network matures.

#### 3.2.5. Rejected

Rejected proposals will not enter development without commencing the QIP process from the beginning and re-working the proposal.

## 4. Author

The author of the QIP.

## 5. Layer

QRL Improvement Proposals consists of 

## 6. Comments URI

Full URI of the comments.

## 7. Comments URI Summary

Full URI of the comment summary made after the proposals review process.

## 8. Created

Date that the draft was created

## 9. Requires

The QIPs that this QIP depends on, by UUID.

## 10. Replaces

The QIPs that this QIP replaces, by UUID

## 11. Superseded By

The QIPs that supersedes 