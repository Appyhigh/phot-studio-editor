import { Link } from "react-router-dom"
import classes from "./style.module.css"

const CreditsSection = () => {
  return (
    <div className={classes.creditSection}>
      <div className={classes.payPara}>
        <p>Pay 0 Coins to Generate </p>
      </div>
      <div className="flex-1"></div>
      <div className={classes.walletCoins}>
        <p>
          Wallet: <span>48 Coins</span>
        </p>
        <a href="https://www.phot.ai/pricing" className={classes.buyMoreText}>
          <p>Buy More</p>{" "}
        </a>
      </div>
    </div>
  )
}

export default CreditsSection
