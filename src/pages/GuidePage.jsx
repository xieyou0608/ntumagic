import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, styled } from "@mui/material";
import { GentleYellowButton } from "../components/UI/GuideButtons";
import ForwardIcon from "@mui/icons-material/Forward";

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
        <p>校內售票：5/09(五) 20:00</p>
        <p>校外售票：5/10(六) 20:00</p>
        <br />
        <p>
          票種：A區 500元、
          <MobileBr />
          B區 400元 、C區 300元
        </p>
      </GuideBox>

      <GuideBox>
        <h2>Step 1</h2>
        <p>
          請於系統開放後至<Link to="/booking">劃位頁面</Link>選擇座位 <br />
          ※單個信箱最多可劃 6 張票
        </p>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 2</h2>
        <p>
          選擇位置後請填寫信箱及預計匯款帳戶末五碼
          <br />
          ※校內售票時段請使用 NTU mail (ntu.edu.tw)
          <br />
          ※若需使用其他付款方式請私訊粉專
        </p>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 3</h2>
        <p>劃位成功之後，請於隔日 15:00 前 匯款至以下帳戶</p>
        <Alert icon={false} severity="success">
          <p>
            銀行代碼：700 中華郵政
            <br />
            帳號：00312180252039
            <br />
            戶名：黃宗軒
          </p>
        </Alert>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 4</h2>
        <p>
          確認款項後，我們將寄出劃位成功通知信至您的信箱
          <br />
          <br />
          註：若付款後三日皆沒有收到信，請私訊台大魔術社粉絲專頁
        </p>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 5（重要！）</h2>
        <p>魔夜當日請出示劃位成功通知信領取實體票</p>
      </GuideBox>
      <Link to="/booking">
        <GentleYellowButton sx={{ mt: 2 }}>點我開始</GentleYellowButton>
      </Link>
    </GuideLayout>
  );
};

export default GuidePage;
