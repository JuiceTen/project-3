import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Portfolio() {
  const [coinGecko, setCoinGecko] = useState({});
  const [userCoins, setUserCoins] = useState([]);
  const [fullUserData, setFullUserData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        axios
          .get("/api/coins/")
          .then((res) => {
            setUserCoins(res.data);
            //deconstruct res.data
          })
          .catch((error) => console.log(error));
        setCoinGecko(res.data);
        //deconstruct res.data
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (userCoins.length > 0) {
      const data = userCoins.map((coin) => {
        const match = coinGecko.filter(
          (cg) => cg.symbol === coin.symbol.toLowerCase()
        )[0];
        const obj = {
          ...coin,
          image: match.image,
          price: match.current_price,
        };
        return obj;
      });
      setFullUserData(data);
    }
  }, [userCoins]);

  return (
    <div className="ranking-page">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Holdings</th>
            <th scope="col">Total Value</th>
          </tr>
        </thead>
        {fullUserData.map((data, i) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{i + 1}</th>
                <td>
                  <img className="logos" src={data.image} alt=""/> 
                </td>
                <td>
                  {data.asset}
                </td>
                <td>${data.price}</td>
                <td>
                  {data.holdings} {data.symbol}
                </td>
                <td>${parseFloat(data.price * data.holdings).toFixed(2)}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
