import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid, Segment} from "semantic-ui-react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import {calculateAspectRatioFit} from "../Utils";
import {find} from "lodash";

import Greyscale from "../filters/Greyscale";

class EditorScreen extends Component {
    constructor(props) {
        super(props);

        this.initFilter = this.initFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        if (this.props.imageFile) {
            const ctx = this.editorCanvas.getContext('2d');

            this.image = new Image();

            this.image.onload = () => {
                const {width, height} = calculateAspectRatioFit(this.image.naturalWidth, this.image.naturalHeight, 500, 900);
                this.editorCanvas.width = width;
                this.editorCanvas.height = height;
                ctx.drawImage(this.image, 0, 0, width, height);

                this.filters = [
                    this.initFilter(Greyscale).instance
                ];
            };

            this.image.src = URL.createObjectURL(this.props.imageFile);
        }
    }

    initFilter(Filter) {
        const filter = new Filter(this.image, this.editorCanvas, this.editorCanvas.width, this.editorCanvas.height);
        return {
            name: filter.name,
            instance: filter,
        };
    }

    applyFilter(filterName) {
        const filter = find(this.filters, f => f.name === filterName);
        filter.execute();
    }

    render() {
        if (!this.props.imageFile) {
            return <Redirect to="/"/>
        }

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
                        <Button onClick={() => this.applyFilter('Greyscale')}>Do shit</Button>
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
