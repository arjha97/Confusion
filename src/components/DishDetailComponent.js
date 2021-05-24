import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);

    }

    renderDish(dish){
        if(dish != null){
           return (
               <Card>
                   <CardImg width="100%" src={dish.image} alt={dish.category} />
                   <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           )
        }else{
            return (
                <div></div>
            )
        }
    }

    // renderComments(comments){
    //     if(comments == null){
    //         return(
    //             <div></div>
    //         );
    //     }

    //     const cmnts = comments.map(comment => {
    //         return(
    //             <li key={comment.id}>
    //                 <p>{comment.comment}</p>
    //             </li>
    //         )
    //     });

    //     return (
    //         <div className='col-12 col-md-5 m-1'>
    //             <h4> Comments </h4>
    //             <ul className='list-unstyled'>
    //                 {cmnts}
    //             </ul>

    //         </div>
    //     )
    // }    

    renderComments(comments) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }


    render(){

        const { dish } = this.props;

       console.log(dish);

        return(
            <div className="container">
                <div className="row">
                  <div className="col-12 col-md-5 m-1'">
                    {this.renderDish(dish)}
                  </div>
                   {this.renderComments(dish?.comments)}
                </div>
            </div>
        )
    }
};

export default DishDetail;