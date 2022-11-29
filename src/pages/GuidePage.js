import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, styled } from "@mui/material";
import SquareButton from "../components/UI/SquareButton";
import ForwardIcon from "@mui/icons-material/Forward";

const GuideLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5vh;
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
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleGuide = () => {
    if (currentUser) {
      navigate("/prebooking");
    } else {
      navigate("/register");
    }
  };
  return (
    <GuideLayout>
      <h1>劃位說明</h1>
      <GuideBox>
        <h3>劃位開放時間:</h3>
        <p>校內售票：5/21(六) 20:00</p>
        <p>校外售票：5/22(日) 20:00</p>
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
          請使用信箱
          <Link to="/register">
            {/* <i class="fa-solid fa-link">註冊帳號</i> */}
            註冊帳號
          </Link>
          ，並
          <Link to="/login">登入系統</Link>
        </p>
        <p>※以 ntu mail 註冊之帳號可於校內售票階段先行劃位</p>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 2</h2>
        <ol className="AorB">
          <li>
            若您只需劃一個位子，
            <MobileBr />請<Link to="/booking">直接進行劃位</Link>
          </li>
          <MobileBr />
          <li>
            若您需要劃多個位子，
            <MobileBr />請<Link to="/profile">填寫同行朋友資料</Link>
          </li>
        </ol>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 3</h2>
        <p>劃位成功之後，請於隔日15:00前 匯款至以下帳戶</p>
        <p>
          並<Link to="/profile">填寫付款帳戶末5碼</Link>
        </p>
        <Alert icon={false} severity="success">
          <p>
            銀行代碼：008 華南銀行
            <br />
            帳號：153200800025
            <br />
            戶名：楊皓勛
          </p>
        </Alert>
      </GuideBox>
      <Arrow />
      <GuideBox>
        <h2>Step 4</h2>
        <p>
          確認款項後，我們將寄出劃位成功通知信至您的信箱
          <br />
          您也可於
          <Link to="/profile">個人頁面</Link>
          確認付款狀態
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

      <SquareButton onClick={handleGuide}>點我開始</SquareButton>
    </GuideLayout>
  );
};

export default GuidePage;
