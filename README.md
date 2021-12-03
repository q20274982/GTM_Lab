# GTM、GA 從 0 到 加強型電子商務


## 大綱
* GA 註冊流程
* GTM 註冊流程
* 加入 GTM 程式碼片段到 HTML
* 建立 GA 基本功能
* 建立 GA 加強型電子商務


## GA 註冊流程
1. 開啟[Google Analytics](https://analytics.google.com/)
2. 點選左側列表下方管理按鈕
3. 建立新的帳戶
	* 輸入**帳戶名稱**
	* 下一步
	* 輸入**資源名稱**
	* 點擊**顯示隱藏選項**
	* 勾選 **建立通用Analytics(分析)資源**
	* 輸入網站網址 若沒有發布到網路上的網站 照如右格式輸入即可 ex. www.英文組合.com
	* 選擇 **只建立通用Analytics(分析)資源**
	* 下一步
	* 填寫**相關商家資訊**
	* 下一步
	* 接受同意條款
4. 建立成功後，會看到以UA開頭的 **GA追蹤碼**


## GTM 註冊流程
1. 開啟[Google Tag Manager](https://tagmanager.google.com/)
2. 建立新的帳戶
	* 帳戶名稱及容器名稱同GA設定
	* 在目標廣告平台選擇**網路**
3. 建立
4. 同意條款


## 加入 GTM 程式碼片到 HTML

延續上步驟，在建立完帳戶及容器後，會預設以剛建立的容器為首頁，點擊畫面上方橫向工作列右側的GTM代碼，會看到兩份 GTM 程式碼片段 請依照提示插進 HTML檔案內。

#### HTML 模板
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

#### 插入 GTM 程式碼片段後的 HTML 模板
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- 其他 header 程式碼片段... -->
    
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start':
            new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-YOURGTMID');</script>
    <!-- End Google Tag Manager -->
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-YOURGTMID" height="0" width="0"
        style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- 其他 body 程式碼片段 -->
  </body>
</html>
```


## 建立 GA 基本功能

### 先建立變數儲存 GA 追蹤碼
點擊 GTM 首頁左側選單中變數 進到變數頁面，點擊新增按鈕 新增使用者定義的變數，選擇GA(分析)設定變數類型，輸入註冊GA後產生的GA追蹤碼後，變數命名為*GA-Code*後儲存。
![建立變數儲存 GA 追蹤碼](https://i.imgur.com/QYt2Z3R.png)

### 建立基本的 GA 功能
點擊 GTM 首頁左側選單中代碼 進到代碼頁面，點擊新增按鈕 新增代碼，在代碼設定選擇**Google Analytics(分析): 通用 Analytics(分析)**，選定後追蹤類型選擇**網頁瀏覽**，Google Analytics(分析)設定選擇剛建立的*GA-Code*變數，觸發條件選擇**All Pages**。
![建立基本的 GA 功能](https://i.imgur.com/B7Wd5Zz.png)

### 測試 GA 基本功能是否正常
點擊 GTM 首頁上側選單中預覽 進到預覽頁面，運行本地端HTML代碼並複製網址，貼到輸入框後進行 連線。

#### 1.建立連線
![](https://i.imgur.com/HlLbn7I.png)

#### 2.確認連線正常 畫面如下代表連線成功
>有安裝擋廣告插件(ex.adBlock)的話要先禁用，edge瀏覽器要先進設定/隱私權設定將防止追蹤關閉

![確認連線正常 畫面如下代表連線成功](https://i.imgur.com/o4VzZVT.png)

#### 3.移至GA頁面網站 查看右側的當下活躍使用者 有沒有出現使用者(如下有一位使用者)
![](https://i.imgur.com/ajrR2Go.png)

### SUMMARY
>完成上述步驟後 相當直接將 GA 程式碼片段插入頁面(如程式碼一) 會有GA最基本的功能，
>GTM 是代碼管理工具 可以管理除自家服務GA及多家網站追蹤服務的代碼，在指定條件、頁面下觸發。
>例如: A網站要引入B網站追蹤服務，這時勢必要插入B網站追蹤服務的代碼片段到A網站的網站原始碼內，有以下方法:
>1. 將B網站追蹤服務的代碼片段交給工程師插入到網站原始碼內
>2. 或是透過GTM 將B網站追蹤服務的代碼片段 新增到GTM內後發布

>第2個方法因為減少了經過工程師的步驟 可以更快的發布上去外，後續有需要調整也只需要透過GTM來操作即可。

程式碼一
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-213956355-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-213956355-1');
  </script>
</head>
<body>
  
</body>
</html>
```

## 建立 GA 加強型電子商務

### 開啟 GA 加強型電子商務功能
1. 開啟[Google Analytics](https://analytics.google.com/)
2. 點選左側列表下方管理按鈕
3. 點擊右欄的**電子商務設定**
4. 勾選 **啟用電子商務** 、 **啟用加強型電子商務報表**
5. 在下方的有序清單中新增如下:()
	1. 瀏覽購物車
	2. 填寫購買人訊息
	3. 完成交易
6. 儲存

### 開啟 GTM 變數 UA-Code 的 加強型電子商務功能
1. 開啟[Google Tag Manager](https://tagmanager.google.com/)
2. 進到變數頁面 點擊稍早建立的 *UA-Code* 變數
3. 點擊**變數設定**
	1. 點擊**更多設定**
	2. 點擊**電子商務**
	3. **啟用加強型電子商務功能**
	4. **使用資料層**

---
### 下方會教如何根據GTM文件建立需要的加強型電子商務功能以加入購物車為例
### 或是使用開頭連結提供的GTM設定檔及gtm.js 封裝好了GA加強型電子商務大部分功能
---

### 根據GTM文件建立需要的加強型電子商務功能以加入購物車為例

#### 1. 開啟[GA文件連結](https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce#add)

加入購物車功能文件如下
![](https://i.imgur.com/AQe3YpZ.png)

- [ ] **上圖是給工程師配合網頁加入購物車功能要新增的程式碼片段**
- [ ] **下圖是在GTM頁面上要設定的**

#### 2. 先做GTM上的設定
進到GTM的代碼頁面新增代碼 配合上圖提供要在GTM上設定的內容 作如下設定:

* Tag type : Universal Analytics
* Track type : Event
* Event Category: Ecommerce
* Event Action: Add to Cart
* Enable Enhanced Ecommerce Features: true
* Use Data Layer: true
* Trigger: event equals addToCart

在 GTM 新增代碼的頁面完成以下條件:

- [ ] 代碼類型 > *Google Analytics(分析): 通用 Analytics(分析)*
- [ ] 追蹤類型 > *事件*
- [ ] 類別 > *Ecommerce*
- [ ] 動作 > *AddToCart*
- [ ] 非互動命中 > *是*
- [ ] Google Analytics(分析)設定 > *UA-Code*
- [ ] 勾選啟用覆寫設定
- [ ] 更多設定 > 電子商務 > 啟用加強型電子商務功能 > *是*
- [ ] 更多設定 > 電子商務 > 使用資料層 > *是*
- [ ] 新增觸發條件
	- [ ] 觸發條件類型 > *自訂事件*
	- [ ] 事件名稱 > *addToCart*
	- [ ] 這項觸發條件的啟動時機 > *所有的自訂事件*

#### 3. 請工程師將圖片內的程式碼插入到原始碼的相關邏輯內

#### 4. 接著執行GTM預覽功能 查看資料及事件綁定是否成功

#### 5. 點及 提交 發布變更到需要的環境

如果加入購物車功能有成功串接 **過幾分鐘** 在如下圖的 **有放進購物車的工作階段** 會出現至少有一筆
![](https://i.imgur.com/248e9Bn.png)


如下代表有被觸發
![](https://i.imgur.com/vbeVELt.png)


### 使用已經封裝好的 GTM設定檔 及 gtm.js

#### 1. 移至 GTM 管理功能 匯入容器 選擇 開頭提供的 GTM設定檔

#### 2. 修改變數內的 *UA-Code* 為自己的 GA 追蹤碼(重要!重要!重要!)

#### 3. 依據 gtm.js 提供的 js 程式碼片段 插入在專案原始碼內對應的邏輯片段

#### 4. 再用 GTM 預覽功能 測試功能是否正常

#### 5. 點及 提交 發布變更到需要的環境

有串接結帳漏斗功能的話 會出現如下圖
![](https://i.imgur.com/oGEKcFD.png)
