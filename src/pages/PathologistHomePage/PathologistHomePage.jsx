import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PathologyService from '../../services/pathology.service'; 

function PathologyHome() {
  const [pathologies, setPathologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    PathologyService.getAllPathologies()
      .then(data => {
        setPathologies(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching pathologies:', err);
        setError('Error fetching pathologies');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Patologías</h2>
      <ul>
        {pathologies.map(pathology => (
          <li key={pathology._id}>
            <Link to={`/edit/pathology/${pathology._id}`}>{pathology.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PathologyHome;
