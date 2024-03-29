import Halogen from 'halogen';
import { withRouter } from 'react-router-dom';

function Loading() {
  const color = '32e0c4';
  const style = {
    display: '-webkit-flex flex',
    //display: 'flex',
    WebkitFlex: '0 1 auto',
    flex: '0 1 auto',
    WebkitFlexDirection: 'column',
    flexDirection: 'column',
    WebkitFlexGrow: 1,
    flexGrow: 1,
    WebkitFlexShrink: 0,
    flexShrink: 0,
    WebkitFlexBasis: '25%',
    flexBasis: '25%',
    maxWidth: '25%',
    height: '200px',
    WebkitAlignItems: 'center',
    alignItems: 'center',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
  };
  return (
    <>
      <div
        style={{
          boxSizing: 'border-box',
          display: '-webkit-flex flex',
          //  display: 'flex',
          WebkitFlex: '0 1 auto',
          flex: '0 1 auto',
          WebkitFlexDirection: 'row',
          flexDirection: 'row',
          WebkitFlexWrap: 'wrap',
          flexWrap: 'wrap',
        }}
      >
        <div style={style}>
          <Halogen.RiseLoader color={color} />
        </div>
      </div>
    </>
  );
}

export default withRouter(Loading);
