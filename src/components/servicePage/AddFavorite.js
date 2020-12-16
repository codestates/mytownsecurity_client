import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import AddFavoritePage from '../modal/favorite/AddFavoritePage';
import Modal from '../../styles/Modal';

const Container = styled.div`
  display: flex;
`;
const Button = styled.button`
  min-width: 50px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background: #ffffff;
  color: red;
  font-size: 24px;
  cursor: pointer;
`;

function AddFavorite({ address, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Container>
        <Button onClick={openModal}>❤</Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <AddFavoritePage userInfo={userInfo} address={address} />
        </Modal>
      </Container>
    </>
  );
}

export default withRouter(AddFavorite);
