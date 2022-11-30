import { styled } from "@mui/material";

const colorMap = {
  A: "rgb(207, 1, 248)",
  B: "rgb(255, 210, 64)",
  C: "rgb(84, 125, 238)",
};

const PriceSign = styled("div")`
  width: 30px;
  height: 15px;
  background-color: ${(props) => colorMap[props.area]};
  display: inline-block;
  margin: 0 0.5rem;
`;

const PriceSigns = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <PriceSign area="A" /> A區 500元
      <PriceSign area="B" /> B區 400元
      <PriceSign area="C" /> C區 300元
    </div>
  );
};

export default PriceSigns;
