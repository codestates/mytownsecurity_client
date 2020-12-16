import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ServHeader from './ServHeader';
import AddFavorite from './AddFavorite';
import CrimeRate from './CrimeRate';
import Map from './Map';
import Review from './Review';
import SearchInput from '../search/SearchInput';

const GET_SEARCHEDLOCATION = gql`
  query getSearchedLocation($addressId: Int!) {
    getSearchedLocation(addressId: $addressId) {
      address
      crime
    }
  }
`;
// PoliceStation 불러오기.
const GET_STATION = gql`
  query getStation {
    getStation {
      id
      X
      Y
      stationName
      stationAddress
    }
  }
`;

function getStation() {
  const { loading, error, data } = useQuery(GET_STATION);
  let arrOfStation = Object.values(data.getStation);
  return arrOfStation;
}

function Service({
  isToken,
  setIsToken,
  addressId,
  userInfo,
  setUserInfo,
  userContent,
  setUserContent,
}) {
  // const loading = true,
  //   data = {
  //     address: { longitudeY: 37.5137912, latitudeX: 127.0293161 },
  //     crime: '',
  //   };

  const { data, loading, error } = useQuery(GET_SEARCHEDLOCATION, {
    //skip: !data,
    variables: { addressId },
  });

  const policeStations = getStation();

  // useEffect(() => {
  //   if (!loading && data && data.address && data.crime) {
  //     console.log(data.address, data.crime);
  //   }
  // }, [loading, data]);

  return (
    <>
      <ServHeader
        isToken={isToken}
        setIsToken={setIsToken}
        setUserInfo={setUserInfo}
        setUserContent={setUserContent}
      />
      <SearchInput addressId={addressId} />
      <AddFavorite userInfo={userInfo} address={data.address} />
      <Map
        address={data.address}
        userContent={userContent}
        policeStations={policeStations}
      />
      <CrimeRate crime={data.crime} />
      <Review userInfo={userInfo} addressId={addressId} />
    </>
  );
}
export default withRouter(Service);
