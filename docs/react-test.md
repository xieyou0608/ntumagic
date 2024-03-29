# 功能測試筆記

## 前言
先前面試時發現註冊功能出現 bug，查了之後發現是 2022/12 重構時出現(但在面試的三個月內居然都沒有出問題...)，而且是超基本的表單提交沒有 preventDefault，藉著這個機會來為這個 project 加上測試。在這個 doc 裡盡量寫測試的大方向或心得之類，測試細節應交由 *.test.js 的檔案來敘述即可，以避免文件過期(每次寫測試都更新文件不太可能，採程式即文件的模式就好)。

## Setup Enviornment

CRA 本身就已經內建 jest 跟 React Testing Library  
但我有使用一些 Provider 所以單純 render 單個元件會出問題

#### How to test component using redux (jest redux-toolkit)
https://www.facebook.com/groups/f2e.tw/posts/2875839005786779/   
此篇作法是在 setupTest.js 寫一個 renderWithRedux 來重用  
在 ntumagic 則是把 RTK, MUI, react-router 都在這處理好  
後記: 這個做法在 [Testing Library 官方文件寫 React-Router 的例子](https://testing-library.com/docs/example-react-router/)中有介紹 Reducing boilerplate，是官方做法，並且有更詳細的說明

#### Vscode jest intellisense not working
https://stackoverflow.com/questions/57874114/intellisense-for-jest-not-working-in-vs-code  
新增 jsconfig.json 來讓 vscode 識別這個專案的類型，jest 語法提示有成功出現

## 寫測試的好處
https://pjchender.dev/ironman-2021/ironman-2021-day24/
> 在「大規模重構」這本書中，作者也提到重構的第一步是要先確定即將修改的部分已經有撰寫測試，否則不要貿然重構，因爲沒有完整測試的話，有很高的可能會在渾然不知的情況下，把原本好的功能給改壞了，但卻依然很開心地繼續重構的...。

當初 11 月正式開始學 React 的時候很開心引入一堆有的沒的，像是 RTK, styled component，雖然專案規模不大但還是出現表單提交這種問題，未來學到更好的設計模式，加上要新增更多功能，八成還會經歷重構，所以得趕緊學寫測試來打穩根基


## 基本 Unit Test 學習資源
udemy - Max 的 React 課: Ch26: Testing React Apps (Unit Tests)  
基本的 test 使用，還有 async test 跟 mock function

## Login 測試
https://ithelp.ithome.com.tw/articles/10307494

## 寫測試的方向(feat. react router test)
https://testing-library.com/docs/example-react-router/  
https://medium.com/enjoy-life-enjoy-coding/react-unit-test-react-%E7%9A%84-route-%E5%96%AE%E5%85%83%E6%B8%AC%E8%A9%A6-feat-jest-react-testing-library-e89b5c7e6d35  
寫測試要以"使用者的視角"來撰寫，例如寫換頁測試，從登入跳到註冊，用戶在意的事情是"我按下這個按鈕，我的頁面上要跳出註冊頁的元件"，而不是管 router 怎麼運作。

## 換頁測試方向
想測試 LoginForm 的換頁效果，搜了好幾篇針對 React Router 的測試文章之後，大部分人都是對 ```<App/>``` 這個進行測試，並沒有提及在 App 底下單個元件，但卻都用了 react router unit test 之類的關鍵詞，我想像中的 unit test 應該要長的像
```js
  test("navigating to register page", async () => {
    renderWithRedux(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginForm />
      </MemoryRouter>
    );

    const navigationBtn = screen.getByText("尚未註冊，點此註冊");
    expect(navigationBtn).toBeInTheDocument();

    userEvent.click(navigationBtn);
    expect(screen.getByText("已經註冊，點此登入")).toBeInTheDocument();
  });
```
但顯然上面那樣是過不了測試的，因為只 render 了 ```<Login/>```，而沒有 render ```<Register/>```，假使把上面換成```<App/>```就可以通過，而且也是正確的測試方式，但既然是 unit test，在 LoginForm.test.js 裡引入 App 顯然超怪，換個 keyword ```react router integration test```後找到了下面這篇討論  
[Recommended approach for route-based tests within routes of react-router](https://stackoverflow.com/questions/65270992/recommended-approach-for-route-based-tests-within-routes-of-react-router)
回覆的蠻完整的，大致上是說從 Unit Test 的角度來說，我的```<Login/>```需要負責的是點下按鈕後把 user 推到 "/register" 即可，而要測試換頁後出現註冊畫面就是 integration test 的範圍了(也就是```<App/>```)。


## mock 汙染問題
https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest  
這篇提到  
jest.spyOn(window, 'alert').mockImplementation(() => {});  
會比 window.alert = jest.fn() 好，因為後者會汙染 suite