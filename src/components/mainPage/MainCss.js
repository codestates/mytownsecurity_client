import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  positon: relative;
  z-index: 1;
`;
// 배경이미지
export const ImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-item: center;
`;

export const SerchedWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 100px;
`;

export const MainIMG = styled.img.attrs({
  src: 'https://ifh.cc/g/SQ1SfH.jpg',
})`
  width: 100%;
  height: 100%;
`;

export const MainTitle = styled.h1`
  font-size: 50px;
  font-family: 'Do Hyeon', sans-serif;
  text-align: center;
`;

export const MainTextDetail = styled.h3`
  font-size: 23px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  margin-top: 40px;
  opacity: 0.5;
`;

export const MainTextDesc = styled.p`
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  opacity: 0.5;
`;

//검색창, 서비스 소개 가운데 정렬
export const MainCenter = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
`;

export const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  margin-bottom: 100px;
  height: 500px;
`;

export const DescVideoWrapper = styled.div`
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 20px;
`;

export const DescVideo = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: fill;
  object-fit: fill;
`;

export const DescContentWrapepr = styled.div`
  width: 800px;
  padding: 50px;
`;

export const DescTitle = styled.h1`
  font-size: 45px;
  font-weight: bold;
`;

export const DescDetail = styled.p`
  margin-top: 35px;
  opacity: 0.7;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const DescDetail1 = styled.p`
  margin-top: 35px;
  opacity: 0.7;
  font-size: 22px;
  font-weight: bold;
  font-family: 'Noto Sans KR', sans-serif;
`;
