import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, toggleProfile, setCurrencies, updateCurrencies } from "./redux/actions/App";
import { getIsLoggedIn, getToggleProfile, getCurrencies } from "./redux/selectors/App";
import Profile from "./components/Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getToggleProfile);
  const login = useSelector(getIsLoggedIn);
  const currencies = useSelector(getCurrencies);

  const handleLogin = () => {
    dispatch(setLogin(true));
  };

  const handleProfile = () => {
    dispatch(toggleProfile(true));
  };

  const handleHome = () => {
    dispatch(toggleProfile(false));
  };

  const addCurrencies = (currencies) => {
    dispatch(setCurrencies(currencies));
  };

  const addCurrenciesData = (currencies) => {
    dispatch(updateCurrencies(currencies));
  };

  useEffect(() => {
    let ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    let cryptoCurrencies = ["tBTCUSD", "tBTCEUR", "tETHUSD", "tETHEUR", "tEOSUSD"];

    cryptoCurrencies.forEach((item) => {
      let subscribe = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: item,
      });

      setTimeout(
        (ws.onopen = () => {
          ws.send(subscribe);
        }),
        300
      );

      ws.onclose = () => {
        ws.close();
      };
    });

    ws.onmessage = (event) => {
      let message = JSON.parse(event.data);
      if (message.event === "subscribed") {
        if (!currencies.findIndex((x) => x[1]["pair"] === message.pair)) {
          return;
        } else {
          addCurrencies(message);
        }
      }
      if (message[1]) {
        addCurrenciesData(message);
      }
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={styles.Navbar}>
        <div className={styles.Button} onClick={handleHome}>
          <FontAwesomeIcon icon={faHome} size={"lg"} />
        </div>
        {login && (
          <div className={styles.Button} onClick={handleProfile}>
            <FontAwesomeIcon icon={faUserCircle} size={"lg"} />
          </div>
        )}
        {!login && (
          <div className={styles.Button} onClick={handleLogin}>
            <FontAwesomeIcon icon={faSignInAlt} size={"lg"} />
          </div>
        )}
      </div>
      {!profile && (
        <div className={styles.Container}>
          <div className={styles.CurrencyBoard}>
            <div className={styles.Hash}>#</div>
            <div className={styles.Symbol}>Symbol</div>
            <div className={styles.Daily}>Daily change</div>
            <div className={styles.Volume}>Volume</div>
            <div className={styles.Price}>Last price</div>
          </div>
          <div className={styles.CurrencyContainer}>
            {Object.entries(currencies).map((currency) => (
              <div key={currency[0]} className={styles.CurrencyWrapper}>
                <div className={styles.Hash}>{currency[0]}</div>
                <div className={styles.Symbol}>{currency[1]["pair"]}</div>
                <div className={styles.Daily}>{currency[1][5]}%</div>
                <div className={styles.Volume}>{currency[1][7]}</div>
                <div className={styles.Price}>{currency[1][6]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {profile && <Profile />}
    </div>
  );
};

export default App;
