import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ServHeader from '../mainPage/Header';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Review from './Review';
import SearchInput from '../search/SearchInput';
import MapIntro from './MapIntro';
import { MainCenter } from '../mainPage/MainCss';
import '../../styles/Loading.css';

const GET_SEARCHEDLOCATION = gql`
  query getSearchedLocation($addressId: ID!) {
    getSearchedLocation(addressId: $addressId) {
      address {
        id
        detail
        X
        Y
      }
      crime {
        gu
        murder
        rape
        robbery
        theft
        violence
      }
    }
  }
`;

function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  setAddressId,
}) {
  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    variables: { addressId },
  });
  useEffect(() => {});

  if (loading) {
    return <></>;
  }
  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <MainCenter>
        <SearchInput addressId={addressId} setAddressId={setAddressId} />
      </MainCenter>
      <AddFavorite
        isToken={isToken}
        userInfo={userInfo}
        address={data.getSearchedLocation.address}
      />
      <MapIntro
        isToken={isToken}
        address={data.getSearchedLocation.address}
        userInfo={userInfo}
      />
      <CrimeRate crime={data.getSearchedLocation.crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
