// import React from 'react';

// export default class PlaidLink extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       handler: null
//     };
//   }

//   setLink() {
//     return Plaid.create({
//       clientName: this.props.clientName,
//       env: this.props.env,
//       key: this.props.public_key,
//       product: this.props.product,
//       onSuccess: this.props.onSuccess,
//       onExit: this.props.onExit
//     });
//   }

//   componentDidMount() {
//     this.setState({ handler: this.setLink() });
//   }

//   render() {
//     return (
//       <div className="linkContent">
//         <h1 className="linkContent__header">Link your account</h1>
//         <button className="link-btn" onClick={() => this.state.handler.open()}>Link</button>
//       </div>
//     );
//   }
// }
