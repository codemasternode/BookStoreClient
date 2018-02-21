import React from 'react';
import '../style/Home.css';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      array: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/books`)
      .then(respone => respone.json())
      .then(respone => this.setState({
        array: respone
      }))
    console.log(this.state.array)
  }

  render() {
    return (


      <div className="container">
        <div className="content">
          <ul>
            {this.state.array.map(item =>
              <li key={item.id} className="row">
                <div className="col-md-3 col-lg-3 col-sm-12 img-wrapper">
                  <img src={item.pictureLink} />
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 item-wrapper">
                  <div className="top-wrapper">
                    <h1>{item.name}</h1>
                    <h2>{item.author.name} {item.author.surname}</h2>
                  </div>
                  <div className="text-wrapper">
                    <p>{item.description}</p>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>
      </div>

    )
  }
}

export default Home;
