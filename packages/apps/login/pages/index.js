/* eslint-disable */
import React from 'react';
import MainLayout from '../layouts/MainLayout';

//
// class Index extends React.Component {
// //   state = {
// //     hasMounted: false,
// //   };
// // shouldComponentUpdate(){
// //   return false
// // }
// //   componentDidMount() {
// //     this.setState({ hasMounted: true, });
// //   }
//
//   render() {
//
//     return(
//       <div><MainLayout /></div>)
//   }
// }
const Index = () => <MainLayout>{currentState => currentState()}</MainLayout>;

export default Index;
