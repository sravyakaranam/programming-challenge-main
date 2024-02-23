import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';

const App: React.FC = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const [otherData, setOtherData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/farms')
      .then(response => {
        setFarms(response.data.farms); // Extract farms data from response
        setOtherData(response.data.other_data); // Extract other_data from response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1 id="heading">Animal Movement Tracker</h1>
      <div>
        <h2 id="population">POPULATION</h2>
        <table>
          <thead>
            <tr>
              <th>Premise ID</th>
              <th>Total Animals</th>
            </tr>
          </thead>
          <tbody>
            {farms.map((farm: any, index: number) => (
              <tr key={index}>
                <td>{farm.premiseid}</td>
                <td>{farm.total_animal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 id="movement">MOVEMENT</h2>
        <table>
          <thead>
            <tr>
              <th>New Origin Premise ID</th>
              <th>New Destination Premise ID</th>
              <th>Number of Items Moved</th>
            </tr>
          </thead>
          <tbody>
            {otherData.map((data: any, index: number) => (
              <tr key={index}>
                <td>{data.new_originpremid}</td>
                <td>{data.new_destinationpremid}</td>
                <td>{data.new_numitemsmoved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
