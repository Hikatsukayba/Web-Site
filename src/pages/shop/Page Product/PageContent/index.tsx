import { Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


//project import
import ImgContainer from "./ImgContainer";
import ProductInf from "./InfProduct";



function PageContent() {
    const {id}=useParams();
    const {data}=useQuery({
        queryKey:['get','product',id],
        queryFn:async ({ queryKey }:any) => {
            return await axios.get(`http://127.0.0.1:8000/api/products/${queryKey[2]}`);
        }
    })
    return ( <Grid container>
        <Grid item xs={6}><ImgContainer imgArray={data?.images} /></Grid>
        <Grid item xs={6}><ProductInf/></Grid>
    </Grid> );
}

export default PageContent;