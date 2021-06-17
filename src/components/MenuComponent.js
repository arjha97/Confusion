import React  from "react";
import { Link } from "react-router-dom";
import { Card, CardImgOverlay, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function RenderMenu({dish}){
   return(
    <Link to={`/menu/${dish.id}`}>
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.category} />
        <CardImgOverlay className="ml-4">
            <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay> 
      </Card>
    </Link>  
   )
}

 const Menu = (props) => {
   
   const menu = props.dishes.map((dish) => {
           return (
               <div key={dish.id} className="col-12 col-md-5 mt-1">
                 <RenderMenu dish={dish} /> 
               </div>
           )
       });
       
      return(
         <div className="container">
           <div className="row">
             <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
             </Breadcrumb>
             <div className="col-12">
                <h3>Menu</h3>
                <hr />
             </div>
           </div>
           <div className="row">
               {menu}
           </div>  
         </div>
       );
 }


export default Menu;