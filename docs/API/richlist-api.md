---
id: richlist-api
title: QRL API - Richlist
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Richlist
sidebar_position: 6
pagination_label: API - Richlist
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/API/richlist-api.md
description: QRL API - Richlist
keywords:
  - docs
  - build
  - developers
  - API
  - Richlist
image: /assets/img/icons/yellow.png
slug: /api/richlist-api
---

The QRL serves out richlist information on the endpoint https://richlist-api.theqrl.org/. this information is gathered in real time and reflects the latest balance found on-chain.

This information is intended to provide to services that are interested in tokenomics of the QRL project.

:::info
The API returns each address balance in $shor$ or to the ninth decimal place, $$10* *9$$. This means the balance shown like: `75358000000 shor` would equate to `75.358000000 Quanta`
:::


## Methods

| Method Name | Endpoint | Description | 
| :---------: | :------: | :---------- | 
| [richlist](#richlist) | [/richlist](https://richlist-api.theqrl.org/richlist) | Returns the top 100 richest addresses with balance in $shor$|


## Richlist

The richlist returns the top 100 richest QRL addresses, or the addresses holding the most quanta.

This information is provided up to date to the block when the request was placed.

**Request**

There are a few different methods of returning data. Just passing the request to the endpoint will provide the top 100 addresses, additional pagination can be had by appending `?page=#'` to the end of the request URL.

Additionally, a complete CSV of all found addresses ordered by most quanta held

| **Parameter** | **Description** |
| --- | --- |
| `richlist` | Return the richlist information for the top 100 results in JSON format |
| `richlist?page=#` | Return the paginated richlist for given page, 100 results per page in JSON format |
| `richlist?csv=1` | Returns the entire found address list in CSV format |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| `richlist` | JSON Array of each address and balance found `[{"address": "Q...", "balance": 1000},{...},...]` |


### cURL Example

#### First page of 100

```bash
curl -XGET 'https://richlist-api.theqrl.org/richlist?page=0'
```

#### Full CSV Report

```bash
curl -XGET 'https://richlist-api.theqrl.org/richlist?csv=1'
```


### Python Example


#### Paginated Response

```python
def getRichListByPage(page_number):
  import requests
  import json
  request = requests.get('https://richlist-api.theqrl.org/richlist?page='+page_number)
  response = request.text
  getRichListResp = json.loads(response)
  jsonResponse = getRichListResp
  return(jsonResponse)

getRichListByPage("1")
```

#### CSV Response

```python
def getRichListCSV():
  import requests
  import json
  request = requests.get('https://richlist-api.theqrl.org/richlist?csv=1')
  response = request.text
  getRichListCSVResp = json.loads(response)
  jsonResponse = getRichListCSVResp
  return(jsonResponse)

getRichListCSV()
```

### JSON Response Example


```json
[
  {
    "address": "Q000500997c93dec6039f0fb6008bbf034bc4f9252f6cfd41a7e01c8cf934036deaa4a832c4f240",
    "balance": 8449999997765200
  },
  {
    "address": "Q01040062908a55128609363f80102e3c07821eb06d579d0151e575428e9389f4532593a2291247",
    "balance": 6019770970688520
  },
  {
    "address": "Q000400b3d9172c7efd9bf2763e20d26cf0e5b50443946bf5b7df3d07fa3663f92f5b704296b071",
    "balance": 3015049355562820
  },
  {
    "address": "Q010500e74e97637db33374745538c90f58f0666bc058292bcaa8ca427c03f87479a66329ebe67d",
    "balance": 2589079357576340
  },
  {
    "address": "Q0106004d84fe4e7b65ca11725eda53152dd57a8e922829ca339fe104db9b423390e05cbad6983e",
    "balance": 2362675358000000
  },
  {
    "address": "Q0105005734c4191b7be1a76b2349a8e114afdd9e1dd8b969eafbdd1de207150b61eb3de973fade",
    "balance": 2103191742710620
  },
  {
    "address": "Q000400b95575de1ec8b0f76a1e772b983351c7e6012c7c2003cc03cd56b16c92cfea4fcb0034ef",
    "balance": 1603162805546706
  },
  {
    "address": "Q01050091801fc2145f6f040ae9a2c3fe0ddb52bc261eb9d904d02da483756c2d87c0f4999b2081",
    "balance": 1439868203882820
  },
  {
    "address": "Q010500c74459aa60b9d3a4b0b577c5233006c8ec9d32d9c4280759f0b796d9743ae65ab7388451",
    "balance": 1439205987259030
  },
  {
    "address": "Q01050022adbdde03fe62ce01e47d559857ceaa7c5ccd22b1b167b1b633504f255ef84cafe38f47",
    "balance": 1335187750000000
  },
  {
    "address": "Q000400de4351f8cdee13059834a257925ab5d265fdd6b7fd402f2ef3d64bd82a4a7027cf43d68b",
    "balance": 1304378216000000
  },
  {
    "address": "Q020600c394a380f627889eeddaa663bc41270766992d522e6ecd8824c9b5d11a05a1c343e35676",
    "balance": 1250596571383244
  },
  {
    "address": "Q01050044e2405990ec5e75d9e376d608ace989c839705fecbdc01cbda5c7e1700068cc7deaa38c",
    "balance": 1123720259476470
  },
  {
    "address": "Q0206001ca80c8de8ca8aee58dc772b1c4a7ebe2204cc8d62ba36ff81157388948841cd478577b1",
    "balance": 1106961858520030
  },
  {
    "address": "Q0004000cc0116ccac8a6d19fe1e145f08e9be21b14ebb16543cfb9c0a246a73169f5f8393d76aa",
    "balance": 1066153709280290
  },
  {
    "address": "Q010500b64bf6099dc2ca9c9805ba8a0bfe4cd20134a8a46538c7a81226c54fe22121389203552c",
    "balance": 1065884454655850
  },
  {
    "address": "Q0105006f454af3eb1d8fcf761ebcdb52845e8a12cd9a4252bc3586cb5d7ea60a44194080b6bc23",
    "balance": 1053545055020900
  },
  {
    "address": "Q010500e587fd07bb1c5ace98956d9aa6c347e7114ccb4ec7183baa54804cc8b974e91cc3b5617e",
    "balance": 1005999096564156
  },
  {
    "address": "Q010500eb10ae5713423b62c17567074e28acda37a0b7ddb03e3019796f75d16b7134f665ebe871",
    "balance": 859894410276442
  },
  {
    "address": "Q000400b55bc9a83ea26c89f10c8b68d08c67effa0ec1963522c20264b96ce7fdda8480a75d53a9",
    "balance": 736507533749580
  },
  {
    "address": "Q01050011b535baab983387bbd34b7c3a243ae126cbb6bce6da8e88ef0b5b8a229cddde33e1905c",
    "balance": 699999998000000
  },
  {
    "address": "Q010500ad84debb245a7cd37c1ad538e634567ae9db7e6603d5c0e4834aa628255e207ea5dcd733",
    "balance": 672353494988776
  },
  {
    "address": "Q000500c12f5c240f0c849128306841b966c4c58aea7206167b3a7085af30a704fb53f8eb15f441",
    "balance": 638019495753610
  },
  {
    "address": "Q000400f72ead61d411a7c508331afebf155396967e266f014e82d28ec80fbb4c0a593a52852465",
    "balance": 621469848740000
  },
  {
    "address": "Q000400478b4ac1d1d2e5ece7e118facd7dd9da98b18182ace73c47961a215a9d094ef509f879d2",
    "balance": 609589171922320
  },
  {
    "address": "Q00050079d806fb021b2351cf85304d1e55ee3b7ed0bfe4bb744fa737591a14ef85766ac675ca9c",
    "balance": 550000000000000
  },
  {
    "address": "Q000400aa8c2ded5226cf05b8e5f525237c2c5a095cd319337cf481bb2e4be654b25b3026966fb2",
    "balance": 537894578100000
  },
  {
    "address": "Q000400a29d6597c6c5c31e8a9bd0068b96e60f3f79eb3643bef7e1b9326faafaa9e48ce0d90af1",
    "balance": 537894573900000
  },
  {
    "address": "Q010500b8601fb018af63f22b31854f649f32249ffd7c2e887d80694b458bd18ee6ca9f9806c016",
    "balance": 520498109199779
  },
  {
    "address": "Q01060097aa4cec5e69ce0c1496a8512f4ba8cf4a5992161dc3089899d69501d335e4cbff29aeb0",
    "balance": 501545558247940
  },
  {
    "address": "Q000400168e43b23502b2907ec051574fcb6737608f82474574c67e5f4c151679d3354412cbe837",
    "balance": 501357127089660
  },
  {
    "address": "Q01060089f1e548ad0407c35cb262e8f9e22792c58effcc5099f35cced7d163c36201f2beca1055",
    "balance": 500797198750840
  },
  {
    "address": "Q000400228509e41db84e46bd6ad6c7d2fec292a77dd80204da52c742992778611b5245cc54f5fb",
    "balance": 500114504215790
  },
  {
    "address": "Q02050065d4ea263b440e24ac046cbbc87d4cba0eda6af5494977f994a5750d2f7efb41d8ba370e",
    "balance": 500000000000000
  },
  {
    "address": "Q00040016a6e9a828b3a422954ed564ff032d6a873d804cb31eb87ae195dd849cb824c7f18fce08",
    "balance": 498677093474730
  },
  {
    "address": "Q0105006f20b9dc3584c835bf221a61656aa4d3d2b9975c778f6d023980f8dc3f9a251bffc39818",
    "balance": 418323753000000
  },
  {
    "address": "Q000400f8d2187bb226d160066aa52725a98f9c57b586f1091c068d9a5439231265e32d584abbcf",
    "balance": 412460379066570
  },
  {
    "address": "Q0108005456167ca118961428ae44b4339e6382978bf9458264901ae09432dea4d2130e336df295",
    "balance": 402622032422510
  },
  {
    "address": "Q0105004ad0a61bb9e7e26de5683dd7792ab9a8fd20b4318eaed2b40746dc1406e59514faf0b447",
    "balance": 400091921252370
  },
  {
    "address": "Q0105007f9ba2e74f0119a8d96c3e01a66c778d7fd09aac453b7cf088897037993a8d92145daf31",
    "balance": 395849548124340
  },
  {
    "address": "Q01090001f47f5478ee354dcdc154dbb6c2dd5fd18449154d32c06c3cbbb21eab842ba37fa79637",
    "balance": 390397354917220
  },
  {
    "address": "Q01050058df57476a09f147cabe5fa0d6e59c2669ddfdf5fc8a1b22f477ddd716529862afbfe94f",
    "balance": 360017846474460
  },
  {
    "address": "Q01050031c906a8f730b615cb6ca7175c01ed0f6142be8d425daa2a12ff72d9130608cfbec5d373",
    "balance": 332577391300010
  },
  {
    "address": "Q0205003f7d2598f7287df90f0b4cc29829e32997b895433f54d66593689d0a914e345692e2197c",
    "balance": 325000000000000
  },
  {
    "address": "Q020500d7328cf3eb085b628b292a69814271e86a21303c015b238be931942a0ed89605b4e66ab3",
    "balance": 300000000000000
  },
  {
    "address": "Q01060011714555e2b7cacddc2fd4f1636a5a795902e39a59b2ca1aad27f254257976ff38170f79",
    "balance": 295846021201044
  },
  {
    "address": "Q0105008ab76d08057a7d258cb5e150400a9e8b87a1cb3f8082754130c72b8ae1853490d6992d8c",
    "balance": 281588248754290
  },
  {
    "address": "Q0105000ae6d78c7ea19ec48c907f19b08417f40d703cf5da287c958d8f95cf8bd7633734526f43",
    "balance": 280764919389490
  },
  {
    "address": "Q00040027488c1cf1ceee6d812028dec19c06b6c71dcb68a5d71db62fcf23dd79616fd43b2a3938",
    "balance": 269900000000000
  },
  {
    "address": "Q0105002471d3fc992837f699c62aa06407639ac39b011796ab7a106abab75f3f5f8f594f3646b9",
    "balance": 260146638734040
  },
  {
    "address": "Q010500463b175fa267fe84d67b0890f6384c495dfdf00e1dd28a75f0a4ea862cbbbf09b85402b2",
    "balance": 254009490072690
  },
  {
    "address": "Q010500d4182b7de45a05a9620ba2b4272a37d9e036e029b83ec10f8f6f285fbfac985c33785892",
    "balance": 250000000000000
  },
  {
    "address": "Q000400eb5047c19956795e4a608b5a82aa590430109d38abccb01ee7616957fdbc6ab9c7104ce4",
    "balance": 243238277055074
  },
  {
    "address": "Q0004006a1eb5f041919a7a1ad4bece3c69e427843572123747fd1d26bfab366522f86717a1aef6",
    "balance": 230673378893580
  },
  {
    "address": "Q020500a80371beab769a4a7ef7be3e44fd29deaaaf0c49c627d6fee5de115e2b925cdb157440e1",
    "balance": 225000000000000
  },
  {
    "address": "Q0105008ac558183bfa3b03b65deca0dfab93adfae5b79d862d149c318c4b72745f88c646c23351",
    "balance": 211439058500000
  },
  {
    "address": "Q0004004795697cc3e4431be849419859e183608ab6c6a4376a59e764befa5d734049c2c6d7b050",
    "balance": 211066228100000
  },
  {
    "address": "Q010500086325aaf31ca6cfec45efc11b2813f2770766435fd12aa7912872f1d4326a6bafec4d9d",
    "balance": 211066228100000
  },
  {
    "address": "Q00040039e0d9bebe61ade279490e2ad8ca24e8c9846208664c554e4a657d3a7aec3f8ba87a1018",
    "balance": 211066228100000
  },
  {
    "address": "Q0004008ed443c4f6653ae10c1923798184233f98513832b1e083ff56a26072af651488027ca755",
    "balance": 205791202654270
  },
  {
    "address": "Q00040095e7b72a00b13c80136d1b85248dcef443f1926f81df42612567fcfe4eca7f1a6c021567",
    "balance": 205157831100000
  },
  {
    "address": "Q0105002d3b29798a21633a4407b0b93ba923a4dd80a91b1a2ad59c55af473455fdc7c083c3eea6",
    "balance": 200863943889520
  },
  {
    "address": "Q0205003067ef2a8aadf2e194d0eb9edea195eeda19680fe30764242fec8028961eabb021e88816",
    "balance": 200000000000000
  },
  {
    "address": "Q02060068cc3b80b5ef555f791a15197f6ff7ad7015ffbc1c0206668ccf6914ae50cf2feea6384b",
    "balance": 199998623418360
  },
  {
    "address": "Q010500fbdc553531c656333e981f038c7d90390cf1e300774a398e0e76a36006bb907be7535e5f",
    "balance": 181772748282920
  },
  {
    "address": "Q010500df3cbfc131e458059317aa44ec01145e2b36993b0086911e82ca9722908faf6e34486c16",
    "balance": 173453944540157
  },
  {
    "address": "Q0004002060e2d6328280b87fe2c1f2f296e32ba1d81abb19bf41541e7142176a9301a077db9cac",
    "balance": 171674531173370
  },
  {
    "address": "Q000400187ac730801c12f9424a6da0789380b5e827897cfed2efd5e21694dfa3a3452868090c4b",
    "balance": 168506924617820
  },
  {
    "address": "Q0105003fa5070efe10a4249b8e19426017f7752deb02df3c2e313d008b64dcb2c1f6f04b44d99b",
    "balance": 166707896826000
  },
  {
    "address": "Q0005005be08cd64f37d6490bbb13ccd97d237dfdb753e04af8c1f3f4e8e7a7fb70d2b168afc77b",
    "balance": 163828889744420
  },
  {
    "address": "Q010500d1cba971e84bd096ec455cfde1bcc900d1cb79bdf2cba8644923e3be25b653f5933797b4",
    "balance": 161333002630420
  },
  {
    "address": "Q000700b97727fc0fd7955afefeea7f389a2421235dfcaa0cfa64f0102d1396b336570bea04d64c",
    "balance": 145740044778250
  },
  {
    "address": "Q010600cea6ad85212aaa60d424413975c6c936f0b687382a6d947503491368310de4ed4fe33ec7",
    "balance": 145383037954672
  },
  {
    "address": "Q01030078ad8e2648dca3a24ac5ac17e1a50d3ca2be3afd36ab8bace3ca9eb2ce5c4bf1acdcbe1b",
    "balance": 141105426114790
  },
  {
    "address": "Q0004004a5aedd90d575fba3ff4268a3355b798972a7fa5dae3c8b5a92852f2c39d52d4b7b0ea64",
    "balance": 140639027760270
  },
  {
    "address": "Q000400e7c49380365c7244d248e1c8854ce0eb67daebaec14fae02952ad77b6164b01c409b5c00",
    "balance": 139838921512610
  },
  {
    "address": "Q010900df3a3d6809ead649418fabdc312b5bad68374bcacc2c5113cb2d9c3e390963c87bfca5d9",
    "balance": 139531692087045
  },
  {
    "address": "Q0004005234fe892017ef2b2c97331cc56cc145757bc06706d1985d7b9a325d12f326ef52bf3d85",
    "balance": 136899692283440
  },
  {
    "address": "Q0105007a6fe057452c016ccfbc0ab73a153c00dc1537114dd6817f4cc98834d2ddd1e8909ab436",
    "balance": 135116577200000
  },
  {
    "address": "Q010500cc7ab43aa8b366ed9aae440dd0dc9704e0ca761c397e310cec7dd501546884dfdc7eb391",
    "balance": 130001503562850
  },
  {
    "address": "Q0004006a7a9536e2e8a81a1addbcdf7f812bbd71c399f6e05da66b2bc94544067ffda65630e4ec",
    "balance": 128251814653580
  },
  {
    "address": "Q01050069f6248aaff812f2f4dbe00b705ac4fe3b3b0a449278ffed9671976801ce4c0c5714ab0a",
    "balance": 128076984241000
  },
  {
    "address": "Q01040053919930d72e3248c3a6e8c368e94830f56f0d553880cc36fb99070b9fc83dca8f7f9dbf",
    "balance": 127642491671760
  },
  {
    "address": "Q0105008367580326e0f6b954f35bc3080e71b85cbe7ad9cb6cb8f447b57f75e46212c95ba2c080",
    "balance": 127634350627320
  },
  {
    "address": "Q0004005dd573fb106646f2e953a62492674628a886b29962124b0cc1ba8dd4641a09827767b63b",
    "balance": 125583894517607
  },
  {
    "address": "Q010500da554f35082a3ab329487560cb097434040b6dfb486f30fa2f07263335428c39507a3e14",
    "balance": 121545886742400
  },
  {
    "address": "Q010500a29e7f866333fd7fb15121093a63b0ac3227e87292c9b22a576e806e86db740bc5dd06bf",
    "balance": 121101309686535
  },
  {
    "address": "Q010500b6018c2cbe7d7da354530041f34f7915b29224fab9d058beff10d2f5b47093e185269d14",
    "balance": 119992081561930
  },
  {
    "address": "Q000400ace67f8ed60c04b04bd29c13073bfd23e88f535eed5ed94f66d3451ba3ecd62e62fdb00d",
    "balance": 117372582212460
  },
  {
    "address": "Q0105000307aba6910897a527eb21aab95e9ac06faf3292de6e1050ea66ff2e3116080d53ef9853",
    "balance": 117000000000000
  },
  {
    "address": "Q000400440def8d1eed5fe0b3b7c59ed7f167d6155d0228e68713c8a538ba7df906ab2c02f990b5",
    "balance": 116086425500000
  },
  {
    "address": "Q0105003fa96d32173a792719cb63a5976d164d690876f68204229aa3a5bab8d97f7a345c62b4ed",
    "balance": 114967778119230
  },
  {
    "address": "Q010500c78706f26be3df54e202c9b297a0ae8b2843e32cb08c53c241f8fe5b0293a96c8aeeea74",
    "balance": 113680281111112
  },
  {
    "address": "Q01050025fbbe2c858ce34fb16fd5c875199ed4664ae5c5919520c44dbba3581748862b8f824e00",
    "balance": 111806727444000
  },
  {
    "address": "Q02050094a7f316080406434d5c33183a0eb794f122033bf39b72cd18820e4de03cef30baa4d060",
    "balance": 111800000000000
  },
  {
    "address": "Q00040097fa367e8da50b6c102ea74bf6b8405222ec656dd92bd964d801f0d500d755d779d84657",
    "balance": 110608804068712
  },
  {
    "address": "Q010500316edb2767fa551f8b5bfe9f57d67533defd3acb37a78781de12102fc07015ed1e0d95db",
    "balance": 108972030512170
  },
  {
    "address": "Q0105008ab9125a3c5bf72ae1859f2ba7ad1ac1cf47d8dec808db62a370a42301f295cf1c423d51",
    "balance": 107352064149160
  },
  {
    "address": "Q010500bb91c9efd3da2d24aa9689d6800489cd3b3f1de5167b58f20092e797262ec96ac6b772f6",
    "balance": 106178104643600
  },
  {
    "address": "Q000400831c71e79fe1aa960534e803821dcaa0abd8fdc89dded7f1a3bd8cb07eee12db1fa533ac",
    "balance": 104855170097660
  }
]

```