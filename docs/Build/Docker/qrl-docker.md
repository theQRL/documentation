---
id: qrl-docker
title: QRL Docker Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Docker
sidebar_position: 6
pagination_label: QRL Docker
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Docker/qrl-docker.md
description: QRL Docker
keywords:
  - docs
  - Advanced
  - QRL Docker
image: /assets/img/icons/yellow.png
slug: /build/docker/overview
---

[![CircleCI](https://circleci.com/gh/theQRL/qrl-docker.svg?style=svg)](https://circleci.com/gh/theQRL/qrl-docker)

This repo contains images used by QRL build processes.

Each branch contains configuration specific for each platform. The Dockerfile can also be used as a reference of our recommended installation steps.

## Example usage

(requires Docker to be installed)

1. Pull docker image of QRL node in Ubuntu 18.04 container:

    ``docker pull qrledger/qrl-docker:bionic``

2. Run a detached container:

    ``docker run -d --name=qrl-node qrledger/qrl-docker:bionic``

3. Start the node:

    ``docker start qrl-node``

4. See the console logs:

    ``docker logs qrl-node``

5. Generate an encrypted wallet (-i and -t flags to interact with terminal)

    ``docker exec -i -t qrl-node qrl wallet_gen --encrypt``


### Windows user?

Use PowerShell run as an Administrator before running the Docker CLI commands.