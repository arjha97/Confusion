import React  from "react";
import { Card, CardImgOverlay, CardImg, CardTitle } from 'reactstrap';

function RenderMenu({dish, onClick}){
   return(
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.category} />
      <CardImgOverlay className="ml-4">
          <CardTitle>{dish.name}</CardTitle>
          <p>{dish.description}</p>
      </CardImgOverlay> 
    </Card> 
   )
}

 const Menu = (props) => {
   
   const menu = props.dishes.map((dish) => {
           return (
               <div key={dish.id} className="col-12 col-md-5 mt-1">
                 <RenderMenu dish={dish} onClick={props.onClick} /> 
               </div>
           )
       });
       
      return(
         <div className="container">
           <div className="row">
               {menu}
           </div>  
         </div>
       );
 }


export default Menu;