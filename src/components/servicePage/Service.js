import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Review from './Review';
import SearchInput from '../search/SearchInput';
import MapIntro from './MapIntro';
import styled from 'styled-components';

const ServiceBodyPositioner = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  height: 950px;
`;

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

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <SearchInput addressId={addressId} setAddressId={setAddressId} />
      <ServiceBodyPositioner>
        <AddFavorite
          isToken={isToken}
          userInfo={userInfo}
          address={data.getSearchedLocation.address}
        />
        <CrimeRate crime={data.getSearchedLocation.crime} />
        <MapIntro
          isToken={isToken}
          address={data.getSearchedLocation.address}
          userInfo={userInfo}
        />
      </ServiceBodyPositioner>
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
