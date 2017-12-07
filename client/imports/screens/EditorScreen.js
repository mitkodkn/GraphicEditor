import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Grid, Segment} from "semantic-ui-react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import {calculateAspectRatioFit} from "../Utils";

class EditorScreen extends Component {
    componentDidMount() {
        if (this.props.imageFile) {
            const ctx = this.editorCanvas.getContext('2d');

            this.image = new Image();

            this.image.onload = () => {
                const {width, height} = calculateAspectRatioFit(this.image.naturalWidth, this.image.naturalHeight, 500, 900);
                this.editorCanvas.width = width;
                this.editorCanvas.height = height;
                ctx.drawImage(this.image, 0, 0, width, height);
            };

            this.image.src = URL.createObjectURL(this.props.imageFile);
        }
    }

    render() {
        if (!this.props.imageFile) {
            return <Redirect to="/"/>
        }

        console.log(this.props.imageFile);
        return (
            <Segment>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <canvas ref={node => this.editorCanvas = node}/>
                        </Grid.Column>

                        <Grid.Column width={6}>
                    <span>
                        <h3>Controls</h3>
                        <Slider/>
                    </span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

const mapStateToProps = ({image}) => ({
    imageFile: image,
});

export default connect(mapStateToProps)(EditorScreen);