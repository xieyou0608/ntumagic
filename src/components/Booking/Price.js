import React from "react";
import { v4 } from "uuid";

const Price = ({ chosenSeats }) => {
  const priceDict = (area) => {
    if (area === "A") {
      return 500;
    } else if (area === "B") {
      return 400;
    } else if (area === "C") {
      return 300;
    } else {
      return 200;
    }
  };

  const compute_total = () => {
    if (chosenSeats.length) {
      return chosenSeats
        .map((chosen) => priceDict(chosen.area))
        .reduce((sum, price) => sum + price);
    }
    return 0;
  };

  return (
    <div className="price">
      <table>
        <tbody>
          {chosenSeats.map((chosen) => {
            return (
              <tr key={v4()}>
                <td>
                  <p>{chosen.area} 區 </p>
                </td>
                <td>
                  <p>{chosen.row} 排</p>
                </td>
                <td>
                  <p>{chosen.col} 號</p>
                </td>
                <td>
                  <p>{priceDict(chosen.area)} 元</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ textAlign: "right", paddingLeft: "7rem" }}>
        共 {compute_total()} 元
      </p>
    </div>
  );
};

export default Price;
