import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(e){
    setFilters({type: e.target.value});
    //console.log(filters);
  }

  function onFindPetsClick(){
    if(filters.type === "all"){
      fetch(`http://localhost:3001/pets`)
      .then(r => r.json())
      .then(data => setPets(data));
    }
    else{
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(r => r.json())
      .then(data => setPets(data));
    }
    
  }

  function onAdoptPet(id){
    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({isAdopted: true})
    })
    .then(r => r.json())
    .then(data => console.log(data));
    
    // const changePet = pets.filter(pet => pet.id === id);
    // changePet.isAdopted = true;
    // console.log(changePet);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
