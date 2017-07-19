import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../../actions/weather';
import './App.css';

class App extends Component {
   componentDidMount() {
      this.props.fetchWeather();
   }

   render() {
      return (
         <div className="App">
            <h1>Pants Pal</h1>
            <div>{`${this.props.isFetching}`}</div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isFetching: state.location.isFetching || state.weather.isFetching || state.position.isFetching
   };
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchWeather: () => dispatch(fetchWeather())
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
