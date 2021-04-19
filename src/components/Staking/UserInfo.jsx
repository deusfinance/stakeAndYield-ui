import React from 'react'

const UserInfo = (props) => {
  const {
    own,
    balance,
    title,
    stakeType,
    stakeTypeName,
    claim,
    StakeAndYieldContract,
    owner,
    exit,
    fetchData,
    burn,
    fullyUnlock,
    exitable
  } = props
  const handleClaim = async () => {
    try {
      await StakeAndYieldContract.methods
        .claim()
        .send({ from: owner })
        .once('receipt', () => {
          fetchData('claim')
        })
    } catch (error) {
      console.log('error happend in handleClaim', error)
    }
  }
  // const handleRedeem = async () => {}
  const handleStopExit = async () => {
    try {
      await StakeAndYieldContract.methods
        .setExit(!exit)
        .send({ from: owner })
        .once('receipt', () => {
          fetchData('setExit')
        })
    } catch (error) {
      console.log('error happend in set Exit', error)
    }
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between mb-15">
        <div className="userInfo-pool">
          <p>{`You own ${own}% of the pool `}</p>
          <p>
            with
            <span className="blue-color">{` ${balance} ${title} `}</span>
            deposited
          </p>
        </div>
        <div className="wrap-box">
          {/* {stakeType != '1' && !exit && (
            <div className="wrap-box-gradient-left">Change Strategy</div>
          )} */}
          {/* <div
            className={` ${
              stakeType != '1' && !exit ? 'wrap-box-center' : 'wrap-box-gray'
            }`}
          > */}
          <div className="wrap-box-gray">
            <div>{`${claim} DEA `}</div>
            <div className="opacity-5">claimable</div>
          </div>
          <div className="wrap-box-gradient" onClick={handleClaim}>
            Claim
          </div>
        </div>
      </div>
      <div className="flex-between mb-15">
        <div className="userInfo-pool">
          <p>
            <span> Staketype: </span>
            <span className="blue-color">{stakeTypeName}</span>
          </p>
          <p className="opacity-5">generating yield with this strategy</p>
        </div>
        {exitable && (
          <div className="wrap-box">
            <div className="wrap-box-exit" onClick={handleStopExit}>
              {exit ? 'Stop Vault Exit' : 'Enable Vault Exit'}
            </div>
          </div>
        )}
        {/* {exit && (
          <div className="wrap-box">
            <div className="wrap-box-red" onClick={handleStopExit}>
              Stop Vault Exit
            </div>
            <div className="wrap-box-center">
              <div>0 sDEA*</div>
              <div>redeemable</div>
            </div>

            <div className="wrap-box-gradient" onClick={handleRedeem}>
              redeem
            </div>
          </div>
        )} */}
      </div>
      {/* {exit && (
        <div className="text-box-redeemable-conatniner">
          <div className="text-box-redeemable">
            *currently redeemable Vault tokens
          </div>
        </div>
      )} */}

      {exitable && exit && (
        <div className="flex-between mb-15">
          <div className="exit-valuet">
            <p>
              <span className="blue-color">Exit Vault</span> activated
            </p>
            <p>
              You burn
              <span className="blue-color">{` ${burn.toFixed(
                2
              )} ${title} per day `}</span>
              {`(fully unlocked at ${fullyUnlock})`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo