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
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});



class Main extends Component {
  constructor(props) {
    super(props)
      
    };

    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
    }

    render(){

      const HomePage = () => {
        return(
          <div>
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            />
          </div>
        )
      }

      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dId,10))[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dId,10))}
              commentsErrMess={this.props.comments.errMess} 
              addComment={this.props.addComment}
              />
        );
      };
      
      return (
        <div>
          <Header/>
           <Switch>
             <Route path="/home" component={HomePage} />
             <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />  
             <Route path='/menu/:dId' component={DishWithId} />
             <Route exact path="/about" component={() => <About leaders={this.props.leaders}/>} />
             <Route exact path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
             <Redirect to="/home" />
           </Switch>
          <Footer/>
        </div>
      );

    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Main));
