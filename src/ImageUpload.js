import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(3,1fr);
`;

class ImageUpload extends React.Component {
  state = {
    ImagePreviewUrl: []
  };

  handleFile = event => {
    console.log(event.target.files);

    Array.from(event.target.files).map(file => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          file,
          ImagePreviewUrl: [...this.state.ImagePreviewUrl, reader.result]
        });
      };

      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <div>
        <div>
          <input multiple onChange={this.handleFile} type="file" />
        </div>
        <Grid>
          {this.state.ImagePreviewUrl &&
            this.state.ImagePreviewUrl.map(imageUrl => (
              <img style={{ width: "400px" }} src={imageUrl} />
            ))}
        </Grid>
      </div>
    );
  }
}

export default ImageUpload;
