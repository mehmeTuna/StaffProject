import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import {Container, Paper, Typography, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import CareerDefineModal from "./Career/CareerDefine";

const styles = theme => ({
    paperTitleFontStyle: {
        fontWeight: 500,
        color: "#424242"
    },
    content: {
        marginTop: 10
    },

});

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {
                title: "Kullanıcıya gösterilmek istenen mesajlar"
            },
            careerisDefined: false
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Container>
                <Grid container direction="column" justify="center" alignItems="center">
                    {this.state.message !== undefined && <Container>
                        <Paper>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Typography variant="h5" component="h3">
                                    {this.state.message.title}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Container>}
                    <Container className={classes.content}>
                        iş modeli tanımlı ve kullanıcı yoksa iş modeli tanımlı butonunu kaldır ve yerine
                        kullanıcı modeli tanımla butonu koy

                        {this.state.careerisDefined === false && <CareerDefineModal/>}
                    </Container>
                </Grid>
            </Container>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);