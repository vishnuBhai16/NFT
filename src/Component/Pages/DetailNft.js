import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const DetailNft = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { nft } = useSelector((state) => state.account);
  const [Nft, setNft] = useState({
    URL: "",
    name: "",
    description: "",
    owner: "",
  });
  

  const fetchNft = async () => {
    if (nft) {
      try {
        let Nft_uri = await nft.methods.tokenURI(queryParams.get("ind")).call();
        let Nft_owner = await nft.methods
          .ownerOf(queryParams.get("ind"))
          .call();
        setNft({ ...JSON.parse(Nft_uri), owner: Nft_owner });
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };

  useEffect(() => {
    fetchNft();
  }, [nft]);
  return (
    <>
      {Nft.name?<><div
        className="breadcrumb-wrapper"
        style={{ margin: "10px", padding: "10px" }}
      >
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb-title">Item Details</h2>
            <nav aria-label="breadcrumb"></nav>
          </div>
        </div>
      </div>
      <div className="item-details-wrap">
        <div className="container">
          <div className="row g-4 g-lg-5 justify-content-center">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="item-big-thumb">
                <img src={Nft.URL} alt="" data-action="zoom" />
              </div>
            </div>
            {/* Item Details Content */}
            <div className="col-12 col-md-9 col-lg-6">
              <div className="item-details-content mt-5 mt-lg-0">

                <h2 className="my-3">{Nft.name}</h2>
                <div className="d-flex align-items-center mb-4">
                  <div className="author-img position-relative me-3">
                    <img className="shadow" src="img/bg-img/u3.jpg" alt="" />
                    <i className="bi bi-check position-absolute bg-primary"></i>
                  </div>
                  <div className="name-author">
                    <span className="d-block fz-14">{Nft.owner}</span>
                    <a className="author d-block fz-16 hover-primary text-truncate">
                      Owner
                    </a>
                  </div>
                </div>

                <div className="border-top w-75 my-4"></div>
                <div className="short-description">
                  <h5>Description</h5>
                  <p className="mb-0">{Nft.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>:"Loading..."}
    </>
  );
};

export default DetailNft;
