---
id: validate-qrl-address
title: Validate QRL Address
hide_title: false
hide_table_of_contents: false
sidebar_label: Validate QRL Address
sidebar_position: 13
pagination_label: Validate QRL Address
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/QRL-Helpers/validate-qrl-address.md
description: Validate QRL Address helpers documentation
keywords:
  - docs
  - Advanced
  - Validate QRL Address
image: /assets/img/icons/yellow.png
slug: /build/helpers/validate-qrl-address
---


[![Build Status](https://travis-ci.org/theQRL/validate-qrl-address.svg?branch=master)](https://travis-ci.org/theQRL/validate-qrl-address) [![Coverage Status](https://coveralls.io/repos/github/theQRL/validate-qrl-address/badge.svg?branch=master)](https://coveralls.io/github/theQRL/validate-qrl-address?branch=master) [![npm version](https://badge.fury.io/js/%40theqrl%2Fvalidate-qrl-address.svg)](https://badge.fury.io/js/%40theqrl%2Fvalidate-qrl-address)

## Synopsis

An npm package to validate (and extract data from) QRL addresses.

The `dist\validateQrlAddress.js` file can be used within a web browser

## Code Examples

### where npm packages can be used:

    var validate = require('@theqrl/validate-qrl-address');
    var isValid = validate.hexString('Q01070050d31c7f123995f097bc98209e9231d663dc26e06085df55dc2f6afe3c2cd62e8271a6bd')
    console.log(isValid.result);
    console.log(isValid.sig.type);
    console.log(isValid.sig.number);
    console.log(isValid.hash.function);

=>
    
    true
    XMSS
    16384
    SHAKE-128

### in the browser:

    <script src="../dist/validateQrlAddress.js"></script>
    <script>
    var result = validateQrlAddress.hexString('Q01070050d31c7f123995f097bc98209e9231d663dc26e06085df55dc2f6afe3c2cd62e8271a6bd');
    console.log(result);
    </script>

## Motivation

Provides a utility function to nodejs based applications. Part of a suite of development tools to simplify working within the QRL ecosystem.

## Installation

    npm install @theqrl/validate-qrl-address

## API Reference

TODO (but the object returned is pretty self explanatory)

Inspecting [this Pen](https://codepen.io/jplomas/pen/GQbwzW) may be of use.


## Tests

Run with:

    npm test

See test/test.js for examples.

      #validateHexString
        ✓ should return true: argument is a valid address
        ✓ should return xmss as name of signature scheme
        ✓ should return XMSS tree height of 14
        ✓ should return number of XMSS signatures as 16384 (2^14)
        ✓ should return shake-128 as name of the hashing method
        ✓ should return false: argument is NOT a valid address
        ✓ should return false: argument does NOT have an initial Q
        ✓ should return true: argument is a valid address length
        ✓ should return false: argument is NOT a valid address length
        ✓ should return true: argument does have a valid hashing mechanism
        ✓ should return false: argument does NOT a valid hashing mechanism
        ✓ should return false: argument does NOT a valid checksum

## Contributors

JP Lomas

## License

MIT