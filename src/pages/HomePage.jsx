import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import poster from "../img/magic_night28.jpg";
import { GoldButton } from "../components/UI/GuideButtons";

const HomeLayout = styled("div")`
  height: 100vh;
  display: flex;
  color: ${({ theme }) => theme.palette.gold.main};
  background-image: linear-gradient(90deg, #000000 50%, #2c2c2c 100%);

  ${({ theme }) => theme.breakpoints.down("sm")} {
    background-image: none;
    background-color: #000000;
  }
`;

const Poster = styled("img")`
  width: 80vw;
  height: 100vh;
  object-fit: contain;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100vw;
  }
`;

const Info = styled("div")`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
    margin-bottom: 2rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 80vw;
    height: 60vh;
    display: block;
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 7vmin;
    }
  }
`;

const MobileBr = styled("br")`
  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }
`;

const HomePage = () => {
  return (
    <HomeLayout>
      <Poster src={poster} alt="魔夜宣傳海報" />
      <Info className="info">
        <h1>台大魔夜劃位系統</h1>
        <p>
          時間：2023/5/25（四）
          <MobileBr />
          18:00進場 18:30開始 <br />
          地點：民生社區活動中心集會堂 <br />
        </p>
        <Link to="/guide">
          <GoldButton type="button">點我劃位</GoldButton>
        </Link>
      </Info>
    </HomeLayout>
  );
};
export default HomePage;
