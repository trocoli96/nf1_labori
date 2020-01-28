import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router-dom';

function Page404() {

    return (
        <Container>
            <Grid container>
                <Grid item><p>404.</p></Grid>
            </Grid>
            <Grid container>
                <Grid item><p>We would like to say that this page exist, but not.</p></Grid>
            </Grid>

        </Container>
    )

}

export default withRouter(Page404);