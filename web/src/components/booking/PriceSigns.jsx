import { styled } from "@mui/material";
import { PRICES } from "../../event-config";

const colorMap = {
  A: "rgb(207, 1, 248)",
  B: "rgb(255, 210, 64)",
  C: "rgb(84, 125, 238)",
  S: "rgb(255, 255, 255)",
};

const ColorBlock = styled("div")`
  width: 30px;
  height: 15px;
  background-color: ${(props) => colorMap[props.area]};
  display: inline-block;
  margin: 0 0.5rem;
  border: 1px solid black;
`;

const PriceSign = ({ text, area }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <ColorBlock area={area} />
      {text}
    </div>
  );
};

const PriceSigns = () => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <PriceSign area="A" text={`A區 ${PRICES.A}元`} />
        <PriceSign area="B" text={`B區 ${PRICES.B}元`} />
        <PriceSign area="C" text={`C區 ${PRICES.C}元`} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PriceSign area="S" text="已劃位 / 不開放" />
      </div>
    </div>
  );
};

export default PriceSigns;
