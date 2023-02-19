# 功能測試筆記

## 前言
先前面試時發現註冊功能出現 bug，查了之後發現是 2022/12 重構時出現(但在面試的三個月內居然都沒有出問題...)，而且是超基本的表單提交沒有 preventDefault，藉著這個機會來為這個 project 加上測試。在這個 doc 裡盡量寫測試的大方向或心得之類，測試細節應交由 *.test.js 的檔案來敘述即可，以避免文件過期(每次寫測試都更新文件不太可能，採程式即文件的模式就好)。

## Setup Enviornment

CRA 本身就已經內建 jest 跟 React Testing Library  
但我有使用一些 Provider 所以單純 render 單個元件會出問題

#### How to test component using redux
(keyword: jest redux-toolkit)  
https://www.facebook.com/groups/f2e.tw/posts/2875839005786779/   
此篇作法是在 setupTest.js 寫一個 renderWithRedux 來重用  
在 ntumagic 則是把 RTK, MUI, react-router 都在這處理好

#### Vscode jest intellisense not working
https://stackoverflow.com/questions/57874114/intellisense-for-jest-not-working-in-vs-code  
新增 jsconfig.json 來讓 vscode 識別這個專案的類型，jest 語法提示有成功出現

## 寫測試的好處
https://pjchender.dev/ironman-2021/ironman-2021-day24/
> 在「大規模重構」這本書中，作者也提到重構的第一步是要先確定即將修改的部分已經有撰寫測試，否則不要貿然重構，因爲沒有完整測試的話，有很高的可能會在渾然不知的情況下，把原本好的功能給改壞了，但卻依然很開心地繼續重構的...。

當初 11 月正式開始學 React 的時候很開心引入一堆有的沒的，像是 RTK, styled component，雖然專案規模不大但還是出現表單提交這種問題，未來學到更好的設計模式，加上要新增更多功能，八成還會經歷重構，所以得趕緊學寫測試來打穩根基


## 學習資源
udemy - Max 的 React 課: Ch26: Testing React Apps (Unit Tests)  
基本的 test 使用，還有 async test 跟 mock function

## Login 測試
https://ithelp.ithome.com.tw/articles/10307494