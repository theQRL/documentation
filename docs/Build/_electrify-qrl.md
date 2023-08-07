---
docstatus: DRAFT
id: electrify-qrl
title: Electrify QRL
hide_title: false
hide_table_of_contents: false
sidebar_label: Electrify QRL
sidebar_position: 7
pagination_label: Electrify QRL
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Electrify QRL
keywords:
  - docs
  - Advanced
  - QRL Electrify
image: /assets/img/icons/yellow.png
slug: /developers/electrify-qrl
---

Electron packager for QRL-Wallet.

Based on https://github.com/Mairu/meteor-electrify

## TL;DR

````shell
npm install -g electrify-qrl
cd /your/meteor/app
electrify
````
## Compatibility

Works on all Meteor's supported [platforms](https://github.com/meteor/meteor/wiki/Supported-Platforms).

## Help

````bash
$ electrify -h

  Usage: electrify [command] [options]


  Commands:

    run       (default) start meteor app within electrify context
    bundle    bundle meteor app at `.electrify` dir
    package   bundle and package app to `--output` dir

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -i, --input    <path>      meteor app dir        | default = .
    -o, --output   <path>      output dir            | default = .electrify/.dist
    -s, --settings <path>      meteor settings file  | default = null (optional)
    -t, --temp     <path>      electrify temp folder | default = system temp folder
    -a, --arch     <arch>      arch to build for     | default = current arch
    -p, --platform <platform>  platform to build for | default = current platform

  Examples:

    # cd into meteor dir first
    cd /your/meteor/app
    
    electrify
    electrify run
    electrify package
    electrify package -o /dist/dir
    electrify package -o /dist/dir -s file.json
    electrify package -i /app/dir -o /dist/dir -s dev.json
    electrify package -- <electron-packager-options>
    
    # more info about electron packager options:
    # ~> https://www.npmjs.com/package/electron-packager

````

## Installation

````shell
npm install -g electrify-qrl
````

> For invoking Electron methods from Meteor, you'll also need to install the
> `arboleya:electrify` meteor package.
> For more info check [Meteor x Electron integration](#meteor-x-electron-integration).

## Running app

````shell
cd /your/meteor/app
electrify
````

## Packaging

````shell
cd /your/meteor/app
electrify package
````

The packaging process is done under the hood using `electron-packager`
npm package. The following variables are automatically set:

  * `--out` -- *comes from cli option [-o, --out]*
  * `--arch` -- *comes from system [current arch]*
  * `--platform` -- *comes from system [current platform]*
  * `--app-version` -- *comes from .electrify/package.json [current app version]*
  * `--electron-version` -- *comes from the used electron npm package*
  * `--tmpdir` -- *disabled*

You can overwrite these default values and also set others by passing custom
arguments directly to `electron-packager` after `--`, i.e:

````shell
cd /your/meteor/app
electrify package -- --icon=/folder/x/img/icon.png --app-version=x.y.z
````

All the available options for `electron-packager` can be found here:
https://github.com/electron-userland/electron-packager/blob/master/usage.txt


Alternatively you can add an electronPackager object in package.json of the .electrify folder
with [options for the electron-packager](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md). For the icon property it is possible to provide an object
instead of string to define different icons for the different platforms.
f.e.
```json
{
  "electronPackager": {
     "icon": {
       "win32": "../something.ico",
       "darwin": "../mac.icns"
     }
  }
}
```

### Notes

The output app will match your current operational system and arch type.

  * To get an **OSX** app, run it from a **Osx** machine.
  * To get an **Linux 32bit** app, run it from a **32bit Linux** machine.
  * To get an **Linux 64bit** app, run it from a **64bit Linux** machine.
  * To get an **Windows 32bit** app, run it from a **32bit Windows** machine.
  * To get an **Windows 64bit** app, run it from a **64bit Windows** machine.

Due to NodeJS native bindings of such libraries such as Fibers -- *which are
mandatory for Meteor*, you'll need to have your Meteor app fully working on the
desired platform before installing this plugin and packaging your app.

So, at this time, you cannot package your app in a cross-platform fashion from
one single OS.

Perhaps you can live with it? :)

> **DO NOT** use options to output for multiple arch/platforms at once, such as
`--arch=all`. It won't work, Electrify can bundle Meteor apps only for the
platform you're running on.

> **NOTICE** you can use the --arch and --platform of electrify BUT you won't get a working version
for different platforms/archs out of the box. It's possible to make the generated application working
with further steps that are not in scope of this project.

## Options

1. `-i, --input` - Meteor app folder, default is current directory (`process.cwd()`).
1. `-o, --output` - Sets output folder for your packaged app, default is
`/your/meteor/app/.dist`
1. `-s, --settings` - Sets path for Meteor
[settings](http://docs.meteor.com/#/full/meteor_settings) file, this will be
available inside your Meteor code both in development and after being packaged.
1. `-t, --temp` - Sets a temp folder other than the system temp folder to prevent moving errors (tmp and destination should be on the same partition)
1. `-a, --arch` - Sets a different arch for building NOTICE: only the current arch will work "out of the box"
1. `-p, --platform` - Sets a different platform for building NOTICE: only the current platform will work "out of the box"

## Structure

You'll notice a new folder called `.electrify` in your meteor app dir, its
structure will be like this:

````
/your/meteor/app
├── .electrify
│   ├── .gitignore
│   ├── electrify.json
│   ├── index.js
│   └── package.json
├── .meteor
└── ...
````

This is a pure Electron project, so you can use the whole Electron API from JS
files in this folder. Also, you can install electron dependencies and store them
in the `package.json` file. Note that the `electrify` package is itself a
dependency.

See this folder as the `desktop layer` for your Meteor app. Remember to check
out the `index.js` file, it constains the electrify start/stop usage.

The `electrify.json` file will hold specific preferences for Electrify, such as
plugins and so on. It's still a WIP, but you can get around it.

### Config (`electrify.json`)

For now there's only one option here: `preserve_db`.

Set it to true to preserve database between installs. It works by saving the
mongo data dir inside user's data folder, instead of being self contained within
the app folder (which gets deleted when new version is installed).

# Customizing

Let's see how one would be able to do a simple SplashScreen:

````javascript
const { app, BrowserWindow } = require('electron');
const electrify = require('electrify-qrl')(__dirname);

let window;
let splash;

app.on('ready', function() {
  splash = new BrowserWindow({ // starts splash window
    // >>> your configs here
  });
  splash.loadUrl('./splash.html'); // create the ".electrify/splash.html" file
  
  // then move along and start electrify
  electrify.start(function(meteor_root_url) {
    // before opening a new window with your app, destroy the splash window
    splash.close(); // >>> or .destroy(), check what works for you

    // from here on, well, nothing changes..

    // creates a new electron window
    window = new BrowserWindow({
      width: 1200, height: 900,
      nodeIntegration: false // node integration must to be off
    });

    // open up meteor root url
    window.loadURL(meteor_root_url);
  });
});

// ....
````

## Meteor x Electron integration

You can seamlessly call Electron methods from your Meteor's client/server code.

Define your Electron methods inside the `.electrify` folder:

````javascript
// `.electrify/index.js` file
electrify.methods({
  'hello.world': function(firstname, lastname, done) {
    // do things with electron api, and then call the `done` callback
    // as ~> done(err, res);
    done(null, 'Hello '+ firstname +' '+ lastname +'!');
   }
});
````

Then, in your Meteor code (client and server), you can use the meteor-electrify-client to call these methods. 

## Upgrading

When upgrading to newer versions, it's **important** to know that:

### templates

Once these files exists on disk, they *will not* be overwritten.
 * `.electrify/index.js`
 * `.electrify/package.json`
 * `.electrify/electrify.json`
 * `.electrify/.gitignore.json`

### api

As these files above will never be overwritten, in case of any API changes that needs
adjustments, these will have to be made manually.

### version matching

Always keep the same electrify version in your Meteor, and inside the
`.electrify` folder, *as per specified in `.electrify/package.json` file*.

## License

The MIT License (MIT)

Copyright for electrify-qrl (c) 2018 The Quantum Resistant Ledger
Copyright (c) 2017 Sebastian Große  
Electrify originally created by Copyright (c) 2015 Anderson Arboleya