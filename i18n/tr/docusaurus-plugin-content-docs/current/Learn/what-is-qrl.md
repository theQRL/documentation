---
id: what-is-qrl
title: QRL Nedir?
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Nedir
sidebar_position: 1
pagination_label: QRL Nedir
custom_edit_url: https://github.com/theQRL/documentation/edit/main/i18n/tr/docusaurus-plugin-content-docs/current/Learn/what-is-qrl.md
description: Quantum Resistant Ledger'a genel bakış
keywords:
  - docs
  - intro
image: /assets/img/icons/yellow.png
slug: /what-is-qrl

---


Quantum Resistant Ledger (QRL), bağımsız denetimlerden geçmiş, kurumsal düzeyde bir blockchain platformudur ve bugünden, yarının kuantum bilgisayar gelişmelerine karşı güvenlidir.

QRL, [IETF tarafından belirlenen XMSS](https://tools.ietf.org/html/rfc8391) standardını kullanan ilk endüstriyel uygulamadır; XMSS, minimal güvenlik varsayımlarına ve yeniden kullanılabilir adreslere sahip, hash tabanlı, ileriye dönük güvenli bir imza şemasıdır ve [NIST onayına](https://csrc.nist.gov/publications/detail/sp/800-208/final) sahiptir.

QRL, genesis bloğundan itibaren kuantum güvenliği yerleşik olarak sunan [genişletilebilir bir adres formatı](/build/address/address-scheme) kullanır. Açık kaynaklı kod tabanımızı [üçüncü taraf denetimleriyle doğrulanmış](https://github.com/theQRL/audits) olarak sürdürüyoruz; bu denetimler [red4sec](https://red4sec.com/) ve [x41 D-sec](https://www.x41-dsec.de/) tarafından gerçekleştirilmiştir.

Geliştirici dostu olmayı hedefleyerek, bu kapsamlı dokümantasyonun yanı sıra bir API referansı da oluşturduk; böylece bugün, yarına da dayanacak endüstriyel düzeyde bir platform üzerinde her şeyi inşa edebilmeniz için gereken araçları sunuyoruz.

QRL blockchain'i ve dijital varlıklarla etkileşimi kolaylaştırmak için kullanıcıya yönelik eksiksiz bir uygulama paketi sunarak, kuantuma dirençli bir blockchain'in karmaşıklığının büyük kısmını kullanıcının görüş alanından çıkardık. Kullanıcıların araçlarımızı hızla kullanmaya başlayabilmesi için Masaüstü (Windows, Mac, Linux), Mobil (iOS, Android) ve web için ürünler sunuyoruz.


## QRL Misyonu

Gelecekteki kuantum tehdidini göz önünde bulundurarak blockchain alanına kurumsal düzeyde güvenlik sağlamak. QRL, imzaları güvence altına almak için klasik güvenli eliptik eğri kriptografisine dayanmak yerine, NIST onaylı kuantum-sonrası güvenli bir dijital imza şeması olan XMSS'i devreye almıştır.

Bu kuantum-sonrası güvenli imza şemasını genesis'ten itibaren kullanarak, hem şimdi hem de gelecekte ileri düzey varlık koruması sağlayabiliyoruz.

### Kuantum Direnci

Klasik bilgisayarlar ile kuantum bilgisayarlar arasındaki farkı anlamak için, önce sorunu ve mevcut çözümü ele alalım.


#### Klasik Direnç


Klasik bir bilgisayar için karmaşık asal sayılar bulmak, sanıldığından çok daha zordur. Bu süreç yinelemelidir ve devasa sayı uzayı nedeniyle, klasik bir bilgisayarın bunu deneyip tahmin etmesi büyük ölçüde pratik değildir.

Kriptograflar bu temeli kullanarak, bir eliptik eğriyle temsil edilen "tahmin edilmesi zor" asal sayılarla verileri güvence altına alan yöntemler geliştirdiler. Gizli veri olmadan bu asal sayıyı tahmin etmek pratik değildir ve yeterince güçlü bir klasik bilgisayarın uzun süre çalışmasını gerektirir.

Kriptograflar buna **klasik olarak güvenli** der; yani yeterli güce sahip klasik bir bilgisayarın saldırısına karşı güvenli.


#### Kuantum Direnci

Kuantum-sonrası kriptografi de güvenliği sağlamak için zor matematik kullanır, ancak bu matematik yalnızca klasik bir bilgisayar için değil, kuantum bilgisayar için de son derece zordur.

Bu durum, ek zor matematik kullanılarak güvence altına alınan bilginin güvenlik ömrünü kuantum çağı boyunca uzatır. Kuantum bilgisayarların gelişiminin devam etmesini beklesek de, kuantum-sonrası güvenli kriptografide uygulanan matematiğin bu gelişmelere karşı dayanması beklenmektedir.

Hiçbir kriptografi sonsuza dek güvenli olmasa da, [XMSS](https://csrc.nist.gov/publications/detail/sp/800-208/final) gibi önde gelen kriptograflar ve standartlaştırma kurumları tarafından uygulanan ve onaylanan algoritmaların öngörülebilir yakın gelecekte güvenli kalması beklenmektedir.

## Neden QRL Kullanmalı

QRL, onaylanmış ve güvenli eXtended Merkle Tree Signature Scheme'i (XMSS), blockchain'in en savunmasız işlevi olan imzalarda uygulamıştır. Bu imzalar, zincirin temel özelliklerini oluşturur ve değişmezliğini güvence altına alır.

Bitcoin'in çalışma şekline benzer şekilde, QRL bir adım daha ileri giderek zincirin en önemli işlevlerini güvence altına almak için daha iyi, daha güvenli bir algoritma kullanmıştır.

Kuantum-sonrası güvenli imza şemalarının kullanılmasının imza boyutu ve tek kullanımlık anahtar kullanımı gibi bazı dezavantajları vardır; QRL, zincirin [Shor algoritması](https://en.wikipedia.org/wiki/Shor%27s_algorithm) kullanan bir kuantum bilgisayar saldırısına karşı savunmasız olmadığı bilgisiyle bu eksiklikleri aşmanın özgün yollarını geliştirmiştir.

Bir projeyi kullanmayı tercih etmek, son kullanıcının ihtiyaçlarına ve proje gereksinimlerine bağlıdır; ancak herhangi bir sistemin güvenliğinin en yüksek önem düzeyinde ele alınması gerektiği konusunda çoğu kişi hemfikirdir.

Belirli bir süre boyunca fon saklamayı düşünüyorsanız, ECDSA gibi klasik olarak güvenli algoritmalar kullanan çoğu blockchain projesinin yakın gelecekte savunmasız olacağı öne sürülebilir. QRL ise değil.


## Kaynaklar

Kuantum-sonrası kriptografinin güvenlik uygulamaları ve kullanımı hakkında daha fazla bilgi için aşağıdaki bağlantılara ve projenin temel Whitepaper'ına bakın.

- [TheQRL.org](https://theqrl.org)
- [QRL Whitepaper](https://github.com/theQRL/Whitepaper/)
- [Adres Şeması](/build/address/address-scheme)
- [OTS Anahtarları](/build/fundamentals/ots-keys)
