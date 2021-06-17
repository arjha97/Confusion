import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { COMMENTS } from '../shared/comments';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';


class Main extends Component {
  constructor(props) {
    super(props)
       this.state = {
        dishes: DISHES,
        leaders: LEADERS,
        promotions: PROMOTIONS,
        comments: COMMENTS
      };
    };

    

   

    render(){

      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dId,10))[0]} 
              comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dId,10))} />
        );
      };

      const HomePage = () => {
        return(
          <div>
            <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            />
          </div>
        )
      }
      return (
        <div>
          <Header/>
           <Switch>
             <Route path="/home" component={HomePage} />
             <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />  
             <Route path='/menu/:dId' component={DishWithId} />
             <Route exact path="/about" component={() => <About leaders={this.state.leaders}/>} />
             <Route exact path="/contact" component={Contact} />
             <Redirect to="/home" />
           </Switch>
          <Footer/>
        </div>
      );

    }
}

export default Main;
