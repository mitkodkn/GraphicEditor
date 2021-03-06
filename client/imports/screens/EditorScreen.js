import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Divider, Grid, Segment} from "semantic-ui-react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import {calculateAspectRatioFit} from "../Utils";
import {find} from "lodash";

import Greyscale from "../filters/Greyscale";
import Brightness from "../filters/Brightness";
import Threshold from "../filters/Threshold";
import Convolute from "../filters/Convolute";

class EditorScreen extends Component {
    constructor(props) {
        super(props);

        this.initFilter = this.initFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.onBrightnessChange = this.onBrightnessChange.bind(this);
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
                    this.initFilter(Greyscale).instance,
                    this.initFilter(Brightness).instance,
                    this.initFilter(Threshold).instance,
                    this.initFilter(Convolute).instance,
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
        const args = Array.from(arguments).slice(1);
        const filter = find(this.filters, f => f.name === filterName);
        filter.execute.apply(filter, args);
    }

    onBrightnessChange(value) {
        this.applyFilter('Brightness', value);
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
                        <h4>Brightness</h4>
                        <Slider
                            min={0}
                            max={20}
                            step={1}
                            onChange={this.onBrightnessChange}
                        />
                        <h3>Filter Effects</h3>
                        <Divider/>
                        <Button.Group vertical>
                        <Button size="massive" onClick={() => this.applyFilter('Greyscale')}>Greyscale</Button>
                            <br/>
                            <Button size="massive" basic onClick={() => this.applyFilter('Threshold')}
                                    secondary>Threshold</Button>
                            <br/>
                            <Button size="massive" basic color="blue" onClick={() => this.applyFilter('Convolute',
                                [
                                    0, -1, 0,
                                    -1, 5, -1,
                                    0, -1, 0
                                ], false)}>
                                Sharpen
                            </Button>
                            <br/>
                            <Button size="massive" basic color="red" onClick={() => this.applyFilter('Convolute',
                                [
                                    1 / 9, 1 / 9, 1 / 9,
                                    1 / 9, 1 / 9, 1 / 9,
                                    1 / 9, 1 / 9, 1 / 9
                                ], false)}>
                                Blur
                            </Button>
                        </Button.Group>
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
