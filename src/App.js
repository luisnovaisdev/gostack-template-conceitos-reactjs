import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title: "Titulo teste",
      url: "Url teste",
      techs: ["NodeJs", "ReactJs", "ReactNative"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    

    try {
      await api.delete(`repositories/${id}`);
      
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      if(repositoryIndex < 0){
        alert('Repositorio não existe');
      }else{
        repositories.splice(repositoryIndex, 1);
        setRepositories([...repositories])
      }
      
    } catch (error) {
      alert(error);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
