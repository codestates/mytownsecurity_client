import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviewDispatch, useReviewNextId } from './ReviewContext';
import ReviewRating from './ReviewRating';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import swal from '@sweetalert/with-react';

const InsertFormPositioner = styled.div`
  width: 100%;
  position: relative;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  position: relative;
  left: 200px;
`;

const StarAndButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0;
  justify-content: start;
`;

const ADD_REVIEW = gql`
  mutation addReview(
    $userId: ID!
    $addressId: ID!
    $text: String!
    $rating: Int!
  ) {
    addReview(
      userId: $userId
      addressId: $addressId
      text: $text
      rating: $rating
    ) {
      id
    }
  }
`;

function ReviewCreate({ userInfo, addressId }) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useReviewDispatch();
  const nextId = useReviewNextId();

  const [addReview] = useMutation(ADD_REVIEW, {
    variables: {
      userId: userInfo.id,
      addressId: addressId,
      rating: rating,
      text: value,
    },
  });

  const onChange = (e) => setValue(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      data: {
        addReview: { id },
      },
    } = await addReview();

    if (value == '') {
      swal('내용을 입력해 주세요.', {
        button: false,
        timer: 1000,
        icon: 'info',
      });
    } else {
      dispatch({
        type: 'CREATE',
        Review: {
          id: id,
          text: value,
          rating: rating,
          postedBy: { id: userInfo.id },
        },
      });
      nextId.current += 1;
      setValue('');
    }
  };

  return (
    <>
      {userInfo.id && (
        <InsertFormPositioner>
          <InsertForm>
            <Input
              autoFocus
              onChange={onChange}
              value={value}
              placeholder='리뷰와 별점을 입력하신 후, Enter 를 누르세요'
            />
            <StarAndButton>
              <ReviewRating rating={rating} setRating={setRating} />
              <Button onClick={onSubmit}>enter</Button>
            </StarAndButton>
          </InsertForm>
        </InsertFormPositioner>
      )}
      {!userInfo.id && (
        <InsertFormPositioner>
          <InsertForm>
            <Input
              autoFocus
              onChange={onChange}
              value={value}
              placeholder='리뷰와 별점을 입력하신 후, Enter 를 누르세요'
            />
            <ReviewRating rating={rating} setRating={setRating} />
            <Button
              onClick={() => {
                swal('로그인 후 이용해 주세요.', {
                  button: false,
                  timer: 1000,
                });
              }}
            >
              enter
            </Button>
          </InsertForm>
        </InsertFormPositioner>
      )}
    </>
  );
}

export default React.memo(ReviewCreate);
