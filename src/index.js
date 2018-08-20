import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "./styles.css";

class Navigate extends React.Component {
  render() {
    const { prev, next, ...rest } = this.props;
    return (
      <div {...rest}>
        <button onClick={prev} style={{ float: "left", width: "50%" }}>
          &lt;
        </button>
        <button onClick={next} style={{ float: "right", width: "50%" }}>
          &gt;
        </button>
      </div>
    );
  }
}

const Side = styled.div.attrs({
  style: props => ({
    transform: `rotateX(${props.angle}deg)`,
    position: props.absolute ? "absolute" : "relative"
  })
})`
  width: 400px;
  height: 400px;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 2s ease;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: auto;
  height: auto;
  border-radius: 25px;
  box-sizing: border-box;
  border: 3px solid grey;
  box-sizing: border-box;
`;

const ImgContainer = styled.div`
  &::after {
    transition: opacity .7s ease;
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
    border-radius: 25px;
    display: block;
    background-image: radial-gradient(circle at center, transparent 0, rgba(0,0,0,.8) 100%);
    height: 100%;
    width: 100%;
    border: 3px solid white;
    box-sizing: content-box;
    box-shadow: 10px 10px 29px 0px rgba(0,0,0,0.75);
    content: '';
  }
  &:hover::after { 
    opacity: 1;
  }
`;

const NavBox = styled(Navigate)`
  position: relative;
  opacity: 0;
  width: 100%;
  bottom: -20px;
  transition: opacity .25s ease;
  }
`;

const Figure = styled.div.attrs({
  style: props => ({
    transform: `rotateY(${props.angle}deg`,
    zIndex: 360 - Math.abs(180 - ((Math.abs(props.angle) + 180) % 360)),
    opacity: (180 - Math.abs(180 - ((Math.abs(props.angle) + 180) % 360))) / 180
  })
})`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: auto;
  height: auto;
  transform-style: preserve-3d;
  transform-origin: 50% 50% -900px;
  opacity: 1;
  backface-visibility: visible;
  box-sizing: content-box;
  transition: transform 500ms ease, background-color 500ms ease;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover ${NavBox} {
    opacity: .4;
  }
`;

//const FigureAttr = styled(Figure).attr

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: purple;
  border: 1px solid #ffff11;
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh);
  width: calc(100vw-10px);
  perspective: 1600px;
  background-color: blue;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

class App extends React.Component {
  state = {
    angle: 0,
    side: 0
  };

  images = [
    "https://picsum.photos/400/?40",
    "https://picsum.photos/400/?41",
    "https://picsum.photos/400/?42",
    "https://picsum.photos/400/?43",
    "https://picsum.photos/400/?44",
    "https://picsum.photos/400/?45",
    "https://picsum.photos/400/?46",
    "https://picsum.photos/400/?48",
    "https://picsum.photos/400/?49",
    "https://picsum.photos/400/?50"
  ];

  imagesBF = [
    "https://picsum.photos/400/?50",
    "https://picsum.photos/400/?51",
    "https://picsum.photos/400/?52",
    "https://picsum.photos/400/?53",
    "https://picsum.photos/400/?54",
    "https://picsum.photos/400/?55",
    "https://picsum.photos/400/?56",
    "https://picsum.photos/400/?58",
    "https://picsum.photos/400/?59",
    "https://picsum.photos/400/?60"
  ];

  rotANGLE = 360 / this.images.length;

  cancelRoutines = [];

  prevTimeStamp = 0;
  updateAnimation = timeStamp => {
    const tsDiff = timeStamp - this.prevTimeStamp;

    if (tsDiff > 20) {
      const angle = this.state.angle + (1.7 * tsDiff) / 216;
      this.prevTimeStamp = timeStamp;
      this.setState({ angle });
    }

    requestAnimationFrame(this.updateAnimation);
  };

  // componentDidMount() {
  //   const animationID = requestAnimationFrame(this.updateAnimation);
  //   this.cancelRoutines.push(() => {
  //     cancelAnimationFrame(animationID);
  //   });
  // }

  componentWillUnmount() {
    this.cancelRoutines.forEach(func => func());
  }

  rotate = diffAngle => () => {
    this.setState({ angle: this.state.angle + diffAngle });
  };

  handleFlip = () => {
    this.setState({ side: 180 - this.state.side });
  };

  render() {
    return (
      <Container>
        <Carousel>
          {this.images.map((img, i) => {
            return (
              <Figure key={i} angle={i * this.rotANGLE + this.state.angle}>
                <Side angle={this.state.side} absolute>
                  <ImgContainer onClick={this.handleFlip}>
                    <Img src={img} />
                  </ImgContainer>
                </Side>
                <Side angle={180 + this.state.side}>
                  <ImgContainer onClick={this.handleFlip}>
                    <Img src={this.imagesBF[i]} />
                  </ImgContainer>
                </Side>
                <NavBox
                  next={this.rotate(this.rotANGLE)}
                  prev={this.rotate(-this.rotANGLE)}
                />
              </Figure>
            );
          })}
        </Carousel>
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
