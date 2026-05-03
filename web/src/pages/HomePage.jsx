import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import poster from "../img/magic_night30.jpg";
import posterSm from "../img/magic_night30-sm.jpg";
import { VintageRedButton } from "../components/UI/GuideButtons";
import { EVENT_DATE, EVENT_TIME } from "../event-config";

const HomeLayout = styled("div")`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vh 4vw;
  background-color: ${({ theme }) => theme.palette.background.main};
  color: ${({ theme }) => theme.palette.forest.main};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 4vh 4vw;
  }
`;

const PosterFrame = styled("div")`
  display: flex;
  align-items: center;
  gap: 4vw;
  padding: 0 3vw 0 0;
  border: ${({ theme }) => theme.palette.border.main} solid 0.5vmin;
  border-radius: 3vmin;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    gap: 2vh;
    padding: 0 0 4vh 0;
    width: 100%;
  }
`;

const Poster = styled("img")`
  width: 60vw;
  height: auto;
  display: block;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const Info = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.palette.forest.main};
    letter-spacing: 0.05em;
  }
  p {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.palette.warmBrown.main};
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;

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
      <PosterFrame>
        <Poster
          src={poster}
          srcSet={`${posterSm} 1200w, ${poster} 3000w`}
          sizes="(max-width: 600px) 100vw, 80vw"
          alt="魔夜宣傳海報"
        />
        <Info className="info">
          <h1>台大魔夜劃位系統</h1>
          <p>
            時間：{EVENT_DATE}
            <MobileBr />
            {EVENT_TIME} <br />
            地點：國立臺灣藝術教育館 南海劇場 <br />
          </p>
          <Link to="/guide">
            <VintageRedButton type="button">點我劃位</VintageRedButton>
          </Link>
        </Info>
      </PosterFrame>
    </HomeLayout>
  );
};
export default HomePage;
