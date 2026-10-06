# 4EBPTC 2027 – Konferans Web Sitesi

4th European Biblio/Poetry Therapy Conference · 16–18 Eylül 2027 · Rami Kütüphanesi, İstanbul
Alan adı (henüz alınmadı): **4ebptc.org.tr** · Site dili: İngilizce

## Yapı

```
index.html, about.html, ...      -> derlenmiş, yayınlanacak sayfalar (build çıktısı)
src/partials/header.html         -> ortak üst bölüm (head, üst şerit, masthead, menü)
src/partials/footer.html         -> ortak alt bölüm
src/pages/*.html                 -> sayfa içerikleri (ilk iki satır: TITLE: / DESC:)
assets/css/style.css             -> tek stil dosyası
assets/js/main.js                -> mobil menü, aktif menü, iletişim formu
assets/img/logo.svg              -> geçici metin logosu
assets/img/*.webp                -> JPG görsellerin WebP sürümleri (tarayıcı destekliyorsa bunlar yüklenir)
assets/img/og-image.jpg          -> sosyal medya paylaşım görseli (1200×630)
assets/4ebptc-2027.ics           -> takvim dosyası
sitemap.xml, robots.txt          -> arama motorları için
build.sh / build.ps1             -> derleme betikleri
```

Sayfa düzenlemek için `src/pages/` ve `src/partials/` içindeki dosyalar değiştirilir, ardından derlenir:

```
bash build.sh        # Git Bash
.\build.ps1          # PowerShell
```

Derleme sonucu kök dizindeki `*.html` dosyaları ve `assets/` klasörü herhangi bir statik barındırmaya (cPanel, GitHub Pages, Netlify vb.) olduğu gibi yüklenir. Sunucu tarafı gerektirmez.

Yeni bir JPG eklenirse WebP sürümü de üretilmelidir (ör. `cwebp -q 78 foto.jpg -o foto.webp`).

## Tanıtım videosu

Ana sayfadaki "Conference video" bölümü Google Drive'daki videoyu gösterir (dosya kimliği `1_vs_Vn3goblQFjbdMciKoBcdOHjapA57`, `src/pages/index.html`). Oynatıcı yalnızca ziyaretçi tıkladığında yüklenir. Videonun oynaması için Drive'da paylaşım ayarı **"Bağlantıya sahip olan herkes – Görüntüleyen"** olmalıdır. İleride YouTube/Vimeo'ya taşınırsa `data-video` adresi değiştirilmesi yeterlidir.

## Sayfalar

Home · About · Call for Papers · Important Dates · Programme · Keynote Speakers · Committees · Registration · Venue & Travel · Contact · Privacy Notice (KVKK/GDPR)

## Tarih planı (Jyväskylä 2025 takvimi 2027'ye oranlanarak)

| Aşama | 2025 (2–4 Ekim) | 2027 (16–18 Eylül) |
|---|---|---|
| Bildiri çağrısı açılış | 7 Ocak | 15 Aralık 2026 |
| Özet son gönderim | 4 Mayıs | 18 Nisan 2027 |
| Kabul bildirimi | Mayıs | 21 Mayıs 2027 |
| Erken kayıt | 26 Mayıs – 31 Temmuz | 10 Mayıs – 14 Temmuz 2027 |
| Normal kayıt | 1 Ağustos – 14 Eylül | 15 Temmuz – 29 Ağustos 2027 |
| Konferans | 2–4 Ekim (Per–Cmt) | 16–18 Eylül (Per–Cmt) |
| Konferans yemeği | 3 Ekim | 17 Eylül 2027 |

Ücretler Jyväskylä ile aynı: tam €250/€300, öğrenci €150/€200, tek gün €100, yemek €55.

## Tamamlanması gerekenler

- [ ] Kurum logoları (Rami Kütüphanesi, Marmara Üniversitesi, KYGM, Biblioterapi Derneği) – `index.html` "Organising institutions" bölümü
- [ ] Konferans teması: taslak olarak *"Biblio/Poetry Therapy Across Cultures: Libraries, Research and Practice"* yazıldı; düzenleme kurulu onayı gerekir
- [ ] Kurul üyeleri (`committees.html`, `[Name]` yer tutucuları)
- [ ] Davetli konuşmacılar (`speakers.html`)
- [ ] Özet gönderim sistemi bağlantısı (EasyChair / SciencesConf / ConfTool) – `call-for-papers.html`
- [ ] Kayıt ve online ödeme sistemi bağlantısı – `registration.html`
- [ ] İptal koşulları ve kültür gezisi ücretlendirmesi (taslak olarak yazıldı, onay gerekir)
- [ ] İletişim formu arka ucu (şu an yalnızca uyarı gösteriyor) ve e-posta adresleri (info@, abstracts@, registration@)
- [ ] Rami Kütüphanesi ulaşım bilgileri (T4 tramvay durağı, servis) ve anlaşmalı oteller – `venue.html`
- [ ] KVKK metninin kurum hukuk birimince incelenmesi – `privacy.html`
- [ ] Sosyal medya hesapları, favicon/og-image görselleri, PDF belgeler (çağrı metni, afiş, özet şablonu)
- [ ] Alan adı tescili ve SSL

## Görseller ve logolar

| Dosya | Kaynak | Lisans |
|---|---|---|
| `assets/img/hero-kizkulesi.jpg` | Wikimedia Commons, "Günbatımı ve Kız Kulesi", Hamdigumus | CC0 |
| `assets/img/hero-ayasofya.jpg` | Wikimedia Commons, "Hagia Sophia Mars 2013", Arild Vågen | CC BY-SA 3.0 |
| `assets/img/hero-galata.jpg` | Wikimedia Commons, "Galata tower view", xxoktayxx | CC0 |
| `assets/img/hero-ortakoy.jpg` | Wikimedia Commons, "Ortaköy Mosque and 15th July Bridge", Maurice Flesier | CC BY-SA 4.0 |
| `assets/img/hero-istanbul.jpg`, `intro-kizkulesi.jpg` | Wikimedia Commons, "Istanbul - Golden Horn", Jorge Franganillo; Kız Kulesi (CC0) | CC BY 2.0 / CC0 |
| `assets/img/rami-library.jpg` | Wikimedia Commons, "Rami Library in March 2024 (7)", Kurmanbek | CC BY-SA 4.0 |
| `assets/img/rami-aerial.jpg` | Wikimedia Commons, "Rami Kışlası-1", KamçılıAdam | CC BY-SA 4.0 |
| `assets/img/rami-new.png`, `rami-logo.png` | ramikutuphanesi.gov.tr | Kurum logosu; kullanım izni alınmalı |
| `assets/img/ktb-logo-footer-new.png`, `ktb-logo-navy.png` | ramikutuphanesi.gov.tr (beyaz sürüm; lacivert sürüm yeniden renklendirildi) | Kurum logosu; resmî dosya KYGM'den istenmeli |
| `assets/img/marmara-logo.png` | marmara.edu.tr | Kurum logosu; kullanım izni alınmalı |
| Biblioterapi Derneği | bulunamadı; dernekten istenecek | — |

Konferans kendi fotoğraflarını temin ettiğinde Commons görselleri değiştirilebilir; o zamana kadar CC atıfları sayfada kalmalıdır.

## Kaynaklar

- 1. konferans (Budapeşte 2024): https://www.irodalomterapia.hu/en/conference.php
- 2. konferans (Jyväskylä 2025): https://www.jyu.fi/en/events/2nd-european-bibliopoetry-therapy-conference-2025
- 3. konferans (Canterbury 2026): https://www.3ebptc.co.uk/
- Yapı örnekleri: https://bobcatsss2025.org.tr/ · https://anadolumotifleri.org.tr/
