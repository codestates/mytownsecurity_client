import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
`;
const Input = styled.input`
  border: solid 1px #dadada;
  margin-bottom: 15px;
  padding: 10px;
`;

/*쿼리수정 필요 */
const EDIT_MYFAVORITE = gql`
  mutation editMyFavorite(
    $userId: Int!
    $favoriteId: Int!
    $placeAlias: String!
  ) {
    editMyFavorite(
      userId: $userId
      favoriteId: $favoriteId
      placeAlias: $placeAlias
    )
  }
`;

function MyFavoriteListEntry({
  favoriteId,
  addressDetail,
  placeAlias,
  createdAt,
  updatedAt,
}) {
  const { userId } = useState(0);
  const newPlaceAliasInput = useInput('');
  const [editMyFavoriteMutation] = useMutation(EDIT_MYFAVORITE, {
    variables: {
      userId: userId,
      favoriteId: favoriteId,
      placeAlias: newPlaceAliasInput.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPlaceAliasInput.value == '') {
        alert('Please Enter your new Alias!😭');
      } else if (placeAlias == newPlaceAliasInput.value) {
        alert('Are you sure? Nothing changed!😱');
      } else {
        const { data: editMyFavorite } = await editMyFavoriteMutation();
        if (editMyFavorite) {
          alert('The modification was successful!😄');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <p>주소</p>
        {addressDetail`주소가 생길 곳`}
        <p>별칭</p>
        {placeAlias`별칭이 생길 곳`}
        <p>생성일</p>
        {createdAt`생성일이 생길 곳`}
        <p>수정일</p>
        {updatedAt`수정일이 생길 곳`}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <Input
            type='placeAlias'
            value={`${placeAlias}`}
            {...newPlaceAliasInput}
          />
          <Button>수정</Button>
          <Button onClick={() => {} /*서버에 맞춰 수정 필요 */}>삭제</Button>
        </form>
      </div>
    </>
  );
}

export default withRouter(MyFavoriteListEntry);
