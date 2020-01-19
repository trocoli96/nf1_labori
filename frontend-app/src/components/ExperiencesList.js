import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";

function ExperiencesList() {



    return (
        <Grid container>
            <Grid item>
                <p>Titulo del empleo</p>
                <p>Empresa</p>
                <p>Fechas</p>
                <p>Sitio</p>
                <p>Descripción</p>
                <hr/>
            </Grid>
        </Grid>
    )
}

export default ExperiencesList;

