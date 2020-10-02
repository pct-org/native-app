## [1.10.1](https://github.com/pct-org/native-app/compare/v1.10.0...v1.10.1) (2020-10-02)


### Bug Fixes

* Fixed icons for quality / download selector being cached ([89a945e](https://github.com/pct-org/native-app/commit/89a945ef4c340dcb4c87a85cf8ae69bb03584113))



# [1.10.0](https://github.com/pct-org/native-app/compare/v1.9.1...v1.10.0) (2020-10-01)


### Features

* Added disk stats to settings screen ([1515c3b](https://github.com/pct-org/native-app/commit/1515c3b0e56c371dc63c005be67883e18a28bfeb))



## [1.9.1](https://github.com/pct-org/native-app/compare/v1.9.0...v1.9.1) (2020-09-23)


### Bug Fixes

* Fixed travis ([fe8e31e](https://github.com/pct-org/native-app/commit/fe8e31e572b2900a905a72190ed412220d088325))



# [1.9.0](https://github.com/pct-org/native-app/compare/v1.8.0...v1.9.0) (2020-09-23)


### Bug Fixes

* Again fixes for watch on tv ([dbec821](https://github.com/pct-org/native-app/commit/dbec8216954a632faf91741ab92f515e15e96eed))
* Fixed statusbar color not changing anymore ([5eeb359](https://github.com/pct-org/native-app/commit/5eeb3593979e558cabb76271f52cbeb1b65a2f66))
* Fixes for watch on tv manager ([8b6ffdb](https://github.com/pct-org/native-app/commit/8b6ffdb08402a0977884f345da5798d655fcd3d9))
* Only log that the tv disconnected is when we where connected ([6d990aa](https://github.com/pct-org/native-app/commit/6d990aa100fc3edf32d59bc5f6dccae1597c1387))
* Small fixes ([2e0100c](https://github.com/pct-org/native-app/commit/2e0100cee033bee306b00df358045121bd596cae))
* Small fixes for checking if download exists and watch on tv mutation ([9a354c7](https://github.com/pct-org/native-app/commit/9a354c7d8b7b1c045ac7ee18e4e35961cdde2bc0))
* When removing from settings screen that title was not set ([fa10337](https://github.com/pct-org/native-app/commit/fa10337bbf1f2fd96161cb7701d5c38c7a7e37c2))


### Features

* Added snackbar when adding / removing to bookmarks ([8998944](https://github.com/pct-org/native-app/commit/8998944c90309fa1260a285d0e15278e3c407f42))
* Added weekly most watched shows from Trakt slider ([099a3f6](https://github.com/pct-org/native-app/commit/099a3f6d902f74c6979424e5bf6258f4d9a0135d))
* Also show download quality in settings ([a9d8a6a](https://github.com/pct-org/native-app/commit/a9d8a6a41ecac177618f6323ae86477b83100112))
* Started on TV implementation (again) ([af33c74](https://github.com/pct-org/native-app/commit/af33c743b9742b210139ea51ec1a6b679796d1bb))



# [1.8.0](https://github.com/pct-org/native-app/compare/v1.7.0...v1.8.0) (2020-05-31)


### Bug Fixes

* Fixed that Bookmark slider created an infinite loop ([ea146fd](https://github.com/pct-org/native-app/commit/ea146fdfc1f8978fcc5e3620d03688e758d39a14))


### Features

* Added option to select the default subtitle in settings ([9e7d81d](https://github.com/pct-org/native-app/commit/9e7d81d5e661d2a13efafee7834af07e9bfef03a))
* Added support for subtiles while casting ([88e7d63](https://github.com/pct-org/native-app/commit/88e7d63e716f48bc47f4aacdcae5599a859e0a93))
* If default subtitle is set use it when casting ([04cc617](https://github.com/pct-org/native-app/commit/04cc617d32661b2a53fb0f98f9fab83bd9906abf))



# [1.7.0](https://github.com/pct-org/native-app/compare/v1.6.0...v1.7.0) (2020-05-22)


### Bug Fixes

* Fixed that you had to press back twice when opened searched items ([c036f0e](https://github.com/pct-org/native-app/commit/c036f0e01acb6e2d84d78798a80549218426fd37))


### Features

* Added cast button also to the home screen ([57b97e6](https://github.com/pct-org/native-app/commit/57b97e6716f0e2f061c476b391b8e42707b94e20))



# [1.6.0](https://github.com/pct-org/native-app/compare/v1.5.0...v1.6.0) (2020-05-18)


### Bug Fixes

* Fixed logs button not working ([c7c4861](https://github.com/pct-org/native-app/commit/c7c486125bb9fec917db202e5b7447e2356b67ee))
* Fixed that you could not search in bookmarks ([c7fc2d7](https://github.com/pct-org/native-app/commit/c7fc2d7575cc5ae4b61e8ca3a276dc03a4bda315))


### Features

* Added button in settings to go to the log files ([ae50796](https://github.com/pct-org/native-app/commit/ae50796f86a43f9e5a317da1c2f01ac39dfc379b))
* Clear the search before going back to previous screen ([4fdabe3](https://github.com/pct-org/native-app/commit/4fdabe34d6cfdb1b3ab020cbe9311eb2cb37ccc1))



# [1.5.0](https://github.com/pct-org/native-app/compare/v1.4.2...v1.5.0) (2020-05-13)


### Features

* Added active downloads to settings screen ([8d2917f](https://github.com/pct-org/native-app/commit/8d2917f8cc59578e60f0d339b96d02aaa6e7410c))



## [1.4.2](https://github.com/pct-org/native-app/compare/v1.4.1...v1.4.2) (2020-05-12)


### Bug Fixes

* Fixed chromecast not casting while connected and opening item ([c4d8617](https://github.com/pct-org/native-app/commit/c4d8617ab3c2b345661e031c917453d24a634f76))
* Fixed issue where fetch more kept being called ([e0e7139](https://github.com/pct-org/native-app/commit/e0e71399836a5c54400dc04a53994ada1bfb301b))
* Fixed search bar not completely hiding ([dda417b](https://github.com/pct-org/native-app/commit/dda417bf221333e662642419d48f47d2e08eb03b))



## [1.4.1](https://github.com/pct-org/native-app/compare/v1.4.0...v1.4.1) (2020-05-08)


### Bug Fixes

* Fixed auto updater always giving a update ([9758db0](https://github.com/pct-org/native-app/commit/9758db066e16436f22e3c25430755d012ba667fc))



