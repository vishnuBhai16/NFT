import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateaccount } from "../States/account";
import Web3 from "web3";
import TokenAbi from "../abi/Token.json";
import NFTAbi from "../abi/NFT.json";
import { NavLink } from "react-router-dom";

function Navbar() {
  const tokenaddress = "0x5A8242860452F9308D5812e371356d86d30ef38C";
  const nftaddress = "0xDF4B967fCD723b34d46Fc6A72eba391f6AC1B1Bf";
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const initializeweb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const TokenContract = await new web3.eth.Contract(TokenAbi, tokenaddress);
      const NftContract = await new web3.eth.Contract(NFTAbi, nftaddress);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(
        updateaccount({
          web3,
          account: accounts[0],
          token: TokenContract,
          nft: NftContract,
        })
      );
      console.log(account);
    } else {
      alert("Please install metamask");
    }
  };
  useEffect(() => {
    initializeweb3();
  }, []);

  const Disconnect = () => {
    dispatch(updateaccount({ account: "", web3: "", nft: "", token: "" }));
  };
  return (
    <>
      <header className="header-area" style={{ position: "static" }}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Navbar Brand */}
            <NavLink className="navbar-brand" to={"/"}>
              <img className="light-logo" src="img/core-img/logo.png" alt="" />
              <img
                className="dark-logo"
                src="img/core-img/logo-white.png"
                alt=""
              />
            </NavLink>
            {/* Navbar Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#funtoNav"
              aria-controls="funtoNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-grid"></i>
            </button>
            {/* Navbar */}
            <div className="collapse navbar-collapse" id="funtoNav">
              <ul className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
                <li className="ft-dd">
                  <a href="#">NFT'S</a>
                  <ul className="ft-dd-menu">
                    <li>
                      <NavLink to="/nft/view">NFT's</NavLink>
                    </li>
                    <li>
                      <NavLink to="/nft/createnew">Mint NFT</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="ft-dd">
                  <a href="#">Collections</a>
                  <ul className="ft-dd-menu">
                    <li>
                      <NavLink to={"/collection/view"}>Collection</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/collection/createnew"}>
                        Drop a Collection
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="header-meta d-flex align-items-center ms-lg-auto">
                {account.account ? (
                  <div className="user-dropdown dropdown mx-3">
                    <button
                      className="btn dropdown-toggle user-btn"
                      id="dropdownMenuButton1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul
                      className="dropdown-menu mt-3"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li style={{ cursor: "pointer" }}>
                        {/* eslint-disable-next-line */}
                        <a className="dropdown-item" onClick={initializeweb3}>
                          <i className="me-2 bi bi-arrow-clockwise"></i>Refresh
                        </a>
                      </li>
                      <li style={{ cursor: "pointer" }}>
                        {/* eslint-disable-next-line */}
                        <NavLink className="dropdown-item" to={"/mynft"}>
                          <i className="me-2 bi bi-collection"></i>My Nft's
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                {/* Create New Button */}
                {/* eslint-disable-next-line */}
                <a
                  className="btn btn-warning btn-sm rounded-pill"
                  onClick={account.account ? Disconnect : initializeweb3}
                >
                  {!account.account ? "Connect" : "Disconnect"}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div
        style={{
          textAlign: "center",
          color: account.account ? "lightgreen" : "red",
        }}
      >
        {account.account ? account.account : "Not Connected"}
      </div>
    </>
  );
}

export default Navbar;
