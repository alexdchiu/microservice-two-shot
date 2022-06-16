import React from 'react'

function ShoesColumn(props) {
    return (
      <div className="col">
        {props.list.map(data => {
          const shoe = data.shoe;
          return (
            <div key={shoe.href} className="card mb-3 shadow">
              {/* <img src={shoe.picurl} className="card-img-top" /> */}
              <div className="card-body">
                <h5 className="card-title">{shoe.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {shoe.manufacturer}
                </h6>
                <p className="card-text">
                  {shoe.color}
                </p>
              </div>
              <div className="card-footer">
                {shoe.bin}
              </div>
            </div>
          );
        })}
      </div>
    );
  }



class ShoesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        shoeColumns: [[], [], []],
      };
    }

async componentDidMount() {
    const url = 'http://localhost:8080/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();
        console.log('data ', data)

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }
        console.log('requests: ', requests)

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);
        console.log('responses: ', responses)

        // Set up the "columns" to put the conference
        // information into
        const shoeColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoeColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({shoeColumns: shoeColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <h2>Shoe List</h2>
          <div className="row">
            {this.state.shoeColumns.map((shoeList, index) => {
              return (
                <ShoesColumn key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }

}

export default ShoesList;