import React from 'react';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import { ReviewProvider } from './ReviewContext';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { ReviewMiddleTemplate, ReviewTemplate } from './ReviewCss';
const GET_REVIEWS = gql`
  query getReviews($addressId: ID!) {
    getReviews(addressId: $addressId) {
      review {
        id
        text
        rating
        postedBy {
          id
        }
      }
    }
  }
`;
function Review({ userInfo, addressId }) {
  if (addressId) {
    const { data, loading, error } = useQuery(GET_REVIEWS, {
      variables: {
        addressId: addressId,
      },
    });
    if (loading) {
      return <div>...loading</div>;
    }
    console.log(data);
    if (error) return `Error! ${error.message}`;
    const assortedReview = [];
    for (let i = 0; i < data.getReviews.length; i++) {
      for (let j = 0; j < data.getReviews[i].review.length; j++) {
        assortedReview.push(data.getReviews[i].review[j]);
      }
    }
    //리뷰 평균값 구하기
    let sumRate = 0;
    for (let i = 0; i < assortedReview.length; i++) {
      sumRate += assortedReview[i].rating;
    }
    let averageRate = sumRate / assortedReview.length;
    return (
      <>
        <ReviewMiddleTemplate>
          <ReviewProvider addressData={assortedReview}>
            <ReviewTemplate>
              <ReviewCreate userInfo={userInfo} addressId={addressId} />
              <ReviewList
                userInfo={userInfo}
                addressId={addressId}
                reviewData={assortedReview}
              />
            </ReviewTemplate>
          </ReviewProvider>
        </ReviewMiddleTemplate>
      </>
    );
  }
}
export default Review;
