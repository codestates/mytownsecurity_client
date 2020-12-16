import React from 'react';
import styled, { css } from 'styled-components';

import { MdDelete } from 'react-icons/md';
import { useReviewDispatch } from './ReviewContext';
import StarRatings from 'react-star-ratings';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const ReviewItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
`;

function ReviewListEntry({ id, done, text, rating }) {
  const dispatch = useReviewDispatch();

  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  };

  return (
    <ReviewItemBlock>
      <Text done={done}>{text}</Text>
      <StarRatings
        rating={rating}
        starRatedColor='red'
        numberOfStars={5}
        name='rating'
        starDimension='25px'
        starSpacing='2.5px'
      />
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </ReviewItemBlock>
  );
}

export default React.memo(ReviewListEntry);
