import { styled } from "@mui/material";
import { PRICES } from "../../event-config";

const colorMap = {
  A: "rgb(207, 1, 248)",
  B: "rgb(255, 210, 64)",
  C: "rgb(84, 125, 238)",
  S: "white",
};

const PriceSign = styled("div")`
  width: 30px;
  height: 15px;
  background-color: ${(props) => colorMap[props.area]};
  display: inline-block;
  margin: 0 0.5rem;
  border: 1px solid black;
`;

const PriceSigns = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <PriceSign area="A" /> A區 {PRICES.A}元
      <PriceSign area="B" /> B區 {PRICES.B}元
      <PriceSign area="C" /> C區 {PRICES.C}元
      <PriceSign area="S" /> 已劃位 / 不開放
    </div>
  );
};

export default PriceSigns;
