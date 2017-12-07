import React, {Component} from "react";
import {connect} from "react-redux";
import {Grid, Segment} from "semantic-ui-react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

class EditorScreen extends Component {
    render() {
        console.log(this.props.image);
        return (
            <Segment>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={10}>

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

const mapStateToProps = state => ({
    image: state.image,
});

export default connect(mapStateToProps)(EditorScreen);