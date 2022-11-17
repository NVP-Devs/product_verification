import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const contract_address_temp = '0x6fa9f4b50e2950a8137a76649193816fb29dad2c';
const token_id_temp = '7981';

const Loading = () => {
  // // parse window here into base + query parameters
  const [isLoading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState(false);
  const [nftData, setNftData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getValidation();
  }, []);

  // parse window here into base + query parameters
  const getValidation = async () => {
    // get inital nfc query params
    const q_params = new URL(document.location).searchParams;

    // use params to call our backend + assign verified status
    const res = await axios.get('/auth', q_params);
    setVerified(res.data);

    // chain the call to get nft details
    res.data ? getDetails() : setLoading(false);
  };

  // use async fn to request nft details
  const getDetails = async () => {
    // this will need to get passed by the NFC metadata
    const contract_address = contract_address_temp;
    const token_id = token_id_temp;

    // build request url
    const url = `/details/${contract_address}/${token_id}`;

    // get request from express backend
    const res = await axios.get(url);
    setNftData(res.data);
    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isVerified ? (
        navigate('/authenicated', { state: nftData })
      ) : (
        <h1>Error</h1>
      )}
    </>
  );
};

export default Loading;