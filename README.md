# HotelApp

### Bu proje Siliconmade Academy SM002 Sınıfı Öğrencilerinden Mustafa Kaan Sevinç - Metehan Sadıkoğlu - İbrahim Tüzer - Murat Esat Kılıç Tarafından Aşama Bitirme Projesi Olarak Yapılmıştır.

Linkedin Bilgilerimiz

- https://www.linkedin.com/in/kaanxcode/
- https://www.linkedin.com/in/metehan-sad%C4%B1ko%C4%9Flu-5a07a6224/
- https://www.linkedin.com/in/ibrahim-tuzer/
- https://www.linkedin.com/in/murat-esat-kili%C3%A7-39331a1a2/

## Kurulum

1. Github üzerinden Main adlı repoyu bilgisayarımıza indirelim

2. npm i yaparak node_modules kurulumunu yapalım
3. Terminalden aşağıdaki bağımlılık paketlerini kopyalayarak indirelim
   `npm install @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context expo-location @react-navigation/bottom-tabs @react-native-async-storage/async-storage firebase @expo/vector-icons react-native-maps`
4. Expo Go uygulamasını cep telefonlarımıza store üzerinden indirelim ve açalım
5. Terminale `npm start` kodunu yazarak uygulamamızı ayağa kaldıralım.
6. Expo Go uygulaması üzerinden bize verilen QR kodunu okutup telefonumuzda uygulamayı çalıştıralım.

## Kullanım Klavuzu

- Giriş Yapmak İçin `Haydi Tatile`! butonuna tıklayın.

![Giriş Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_161955_Expo%20Go.jpg?alt=media&token=adb07e67-ad47-4218-848a-9994dd7ebb53)

- Kayıtlı kullanıcı iseniz e-posta ve şifrenizi girin
- Kayıtlı değilseniz `Kayıt ol` butonuna basarak kayıt sayfasına geçiniz

![Kullanıcı Girişi Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162000_Expo%20Go.jpg?alt=media&token=52e7f918-750c-48d4-acd9-ba8316f516d0)

- Kayıt olma sayfasında e-posta ve şifrenizi belirleyin `Kayıt Ol` Butonuna bastıktan sonra Ana Sayfaya Yönlendirileceksiniz.

![Kayıt olma Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162021_Expo%20Go.jpg?alt=media&token=83245b58-aefe-49c0-8d04-d1059c19b6e1)

- Kayıt Olmadan Giriş yapmak için E-posta `test@test.com` Şifre `123456` bilgilerini girerek demo hesaba giriş yapabilirsiniz.

![DEMO Bilgiler Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162016_Expo%20Go.jpg?alt=media&token=1bb24ce5-67c8-4cef-b33e-dfd56130d87c)

- Ana sayfada otel arama bölümü belirli bölgelere göre otelleri filtreleme ve otelleri görebilirisiniz.

![Ana Sayfa](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162036_Expo%20Go.jpg?alt=media&token=ff91bab9-7c2a-441a-823a-e91a2e1e03f6)

![Arama İnputu](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162116_Expo%20Go.jpg?alt=media&token=1d5ca878-19dc-4fac-b103-f60b51c7e02a)

- Bir otele bastıktan sonra otelin fotoğrafı, bulunduğu bölge, yıldızı ve seçebileceğiniz odalar geliyor Ekonomik, Standart ve Lüks olarak 3 adet oda seçeneğinden birini seçip rezervasyon sayfasına geçebilirsiniz.

![Otel Detay](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162131_Expo%20Go.jpg?alt=media&token=c5084d12-8e49-4c58-83bc-f535daa044ae)

- Bu sayfada odanın fotoğrafı, özellikleri, giriş ve çıkış tarihi seçimi, günlük fiyatı ve rezerve et butonu bulunmakta.

![Oda Rezervasyonu](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162137_Expo%20Go.jpg?alt=media&token=ca6141cb-beb5-4250-82f6-2e05b3a04162)

- Giriş Çıkış tarihlerini seçtikten sonra fiyat bölümü Toplam Fiyat olarak güncelleniyor ve otomatik şekilde bunu görebiliyorsunuz.

![Oda Rezervasyonu](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162148_Expo%20Go.jpg?alt=media&token=e42e8f0d-01fd-450f-bff1-352d750e9117)

- `Rezerve et` Butonuna bastıktan sonra karşınıza bir modal açılacak başarılı olduğuna dair bilgi verilecek ve isterseniz ana sayfaya isterseniz Rezervasyonlarım sayfasına bakabilirisniz

![Oda Rezervasyonu](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162156_Expo%20Go.jpg?alt=media&token=a6493329-b7d4-4cb3-8cb0-12c507e15ec8)

- Rezervasyon Geçmişi sayfasında Bir kutu olarak ettiğiniz rezervasyon süresini fiyatını ve otel adını görebilirisniz sağ üstteki çöp ikonuna basarak rezervasyonu silebilirsiniz.

![Rezervasyon Geçmişi](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162203_Expo%20Go.jpg?alt=media&token=2b812022-5de5-4314-85e8-ed23fbe45b7b)

- Hesabım Sayfasında E-Posta adresinizi ve `Çıkış yap` butonunuzu görebilirsiniz ve çıkış yapabilirisniz.

![Profilim Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162211_Expo%20Go.jpg?alt=media&token=c9e60110-7321-4654-a321-8390dec7a604)

- Opsiyonel Harita Sayfası Yapılmamıştır.

![Harita Sayfası](https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/readme%2FScreenshot_20240302_162215_Expo%20Go.jpg?alt=media&token=8939fc65-d2ba-45b2-9a6a-4b21dedf050f)
