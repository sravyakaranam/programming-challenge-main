// src/components/FarmList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmList: React.FC = () => {
  const [farms, setFarms] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/farms')
      .then(response => {
        setFarms(response.data);
      })
      .catch(error => {
        console.error('Error fetching farms:', error);
      });
  }, []);

  return (
    <div>
      <h2>Farm List</h2>
      <ul>
        {farms.map(farm => (
          <li key={farm.id}>{farm.name} - Total Animals: {farm.total_animals}</li>
        ))}
      </ul>
    </div>
  );
};

export default FarmList;
