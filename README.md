# 台大魔夜劃位系統
網站連結 [https://www.ntumagic.club/](https://www.ntumagic.club/)  
提供第 26 屆魔幻之夜觀眾進行線上劃位  
專案採前後端分離開發，此為前端 repo，後端 repo 請至[這裡](https://github.com/xieyou0608/ntumagic-server)  

![劃位範例](https://j.gifs.com/36Xxj9.gif)


## Tech Stack
MERN (MongoDB, Express.js, React.js, Node.js)  
React Router, Redux, Material UI  

&nbsp;
## Setup
開發環境: node.js 18  
Clone 專案後，請先在.env 設定後端 API 網址(REACT_APP_API_URL)，再運行以下指令  
```
$ npm install && npm start
```
&nbsp;
## 劃位流程安排
UX 設計理念：讓用戶跟著設定的流程跳轉頁面  
每一頁會有1~2個大按鈕引導觀眾劃位，其他連結則在 anchor tag 或 nav 出現  
![劃位流程圖](./doc/劃位流程圖.jpg)

&nbsp;
## 劃位限制
1. 使用註冊信箱辨識身分，校內學生可優先一日劃位
2. 使用 moment-timezone 控制劃位開放時間
3. 防止無限劃位，填寫同行朋友才能劃多個位子，一個帳號最多劃 6 個位子

&nbsp;
## 管理員功能
1. 無限劃位 (用於當日現場櫃台售票)
2. 用戶後台
    - 查看用戶資料
    - 確認用戶付款，nodemailer 自動寄信
    - 清除用戶座位
3. 座位後台
    - 更改座位等級

&nbsp;
## Reference
React-router-dom v6 更新
(Route方式、巢狀 Route更改、useNevigate)
https://ithelp.ithome.com.tw/articles/10282773?sc=iThelpR