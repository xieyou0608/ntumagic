import React from "react";
import { Link } from "react-router-dom";
import { Alert, styled } from "@mui/material";
import { VintageRedButton } from "../components/UI/GuideButtons";
import ForwardIcon from "@mui/icons-material/Forward";
import { PRICES, BANK_INFO, PHASE_LABELS } from "../event-config";
import paidSuccess from "../img/paid_success.png";

const GuideLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  margin-bottom: 15vh;
`;

const GuideBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 40vw;
  padding: 4vh;
  margin: 2vh 0;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 80vw;
  }

  h2,
  h3 {
    margin-bottom: 1vh;
    text-align: center;
  }

  .AorB {
    list-style-type: upper-alpha;
    text-align: left;
  }

  /* for Link */
  a {
    color: blue;
  }
  a:hover {
    color: ${({ theme }) => theme.palette.gold.main};
    text-decoration: underline;
  }

  /* for mui Alert */
  .MuiPaper-elevation {
    margin-top: 2vh;
    text-align: left;
    font-size: medium;
  }
`;

const GuideComment = styled("p")`
  color: gray;
  font-size: 0.8rem;
`;

const ExampleImage = styled("img")`
  width: 100%;
  max-width: 400px;
  margin-top: 1vh;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Arrow = styled(ForwardIcon)`
  font-size: 5vh;
  transform: rotate(90deg);
`;

const MobileBr = styled("br")`
  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }
`;

const GuidePage = () => {
  return (
    <GuideLayout>
      <h1>劃位說明</h1>
      <GuideBox>
        <h3>劃位開放時間:</h3>
        <p>
          校內劃位：{PHASE_LABELS.NTU_START}
          <br />
          校外劃位：{PHASE_LABELS.PUBLIC_START}
          <br />
          <br />
          票種：A區 {PRICES.A}元、
          <MobileBr />
          B區 {PRICES.B}元 、C區 {PRICES.C}元
          <GuideComment>※ 校內劃位請使用台大信箱 ntu.edu.tw</GuideComment>
          <GuideComment>
            ※ 線上劃位將於 {PHASE_LABELS.PUBLIC_END}截止，之後請現場購票
          </GuideComment>
        </p>
      </GuideBox>

      <GuideBox>
        <h2>Step 1</h2>
        <p>
          於系統開放後至<Link to="/booking">劃位頁面</Link>
          選擇座位，並填寫信箱及匯款帳戶末五碼
          <GuideComment>※單個信箱最多可劃 6 張票</GuideComment>
          <GuideComment>※若需使用其他付款方式請私訊粉專</GuideComment>
        </p>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 2</h2>
        <p>劃位成功之後，請於隔日 15:00 前匯款至以下帳戶</p>
        <Alert icon={false} severity="success">
          <p>
            銀行代碼：{BANK_INFO.bankCode}
            <br />
            帳號：{BANK_INFO.account}
            <br />
            戶名：{BANK_INFO.holder}
          </p>
        </Alert>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 3（重要！）</h2>
        <p>
          確認款項後，我們將寄出劃位成功通知信至您的信箱
          <p>魔夜當日請出示劃位成功通知信領取實體票</p>
          註：若付款後 3 日皆沒有收到信，請私訊台大魔術社粉絲專頁
        </p>
        <ExampleImage src={paidSuccess} alt="劃位成功通知信範例" />
      </GuideBox>
      <Arrow />
      <Link to="/booking">
        <VintageRedButton sx={{ mt: 2 }}>點我開始</VintageRedButton>
      </Link>
    </GuideLayout>
  );
};

export default GuidePage;
