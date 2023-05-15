import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, AiFillStar } from "react-icons/all";
import axios from "axios";
import { CardActionArea, Rating } from "@mui/material";

const CardShop = ({ image, title, price, rate, bio, id }: any) => {
  const handlerAdd = async () => {
    const cart_id = localStorage.getItem("cart-id");
    console.log(cart_id);
    const body = {
      cont_id: id,
      quantity: 1,
    };
    await axios.post(`/api/shoppingcarts/${cart_id}/itemscart/`, body);
  };
  return (
    <Card style={{ position: "relative", zIndex: "modal",boxShadow:'' }}>
      <CardActionArea href="/">
        <CardMedia
          sx={{ height: 140 }}
          image={`http://127.0.0.1:8000${image}`}
          title="green iguana"
          src={`http://127.0.0.1:8000${image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color={"text.secondary"}
            component="div"
          >
            {price} MAD
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color={"text.secondary"}
            component="div"
          >
            Bio: {bio}%
          </Typography>
          <Rating name="disabled" value={rate} readOnly />
        </CardContent>
      </CardActionArea>
      <IconButton
        style={{
          color: "#07d111",
          position: "absolute",
          zIndex: "tooltip",
          bottom: 10,
          right: 10,
          borderRadius:'50%',
          border:'1px solid #07d111',
        }}
      >
        <FaShoppingCart />
      </IconButton>
    </Card>
  );
};


export default CardShop;
