import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

class Main extends Component {
  constructor(props) {
    super(props)
      
    };

    render(){

      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dId,10))} />
        );
      };

      const HomePage = () => {
        return(
          <div>
            <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            />
          </div>
        )
      }
      return (
        <div>
          <Header/>
           <Switch>
             <Route path="/home" component={HomePage} />
             <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />  
             <Route path='/menu/:dId' component={DishWithId} />
             <Route exact path="/about" component={() => <About leaders={this.props.leaders}/>} />
             <Route exact path="/contact" component={Contact} />
             <Redirect to="/home" />
           </Switch>
          <Footer/>
        </div>
      );

    }
}

export default (connect(mapStateToProps)(Main));
