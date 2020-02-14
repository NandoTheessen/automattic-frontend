import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const fetchRecipes = () => {
    axios
      .get("https://recipes-111.herokuapp.com/recipes")
      .then(res => setRecipes(res.data))
      .catch(e => {
        console.log("Error fetching recipes!", e);
      });
  };

  const postRecipe = () => {
    axios
      .post("https://recipes-111.herokuapp.com/recipes", {
        url: url,
        title: title
      })
      .then(res => fetchRecipes())
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <div className="App">
      <header className="App-header">Rezepte!</header>
      <div className="App-content">
        <form onSubmit={postRecipe}>
          <label htmlFor="title">
            <input
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <label htlmFor="url">
            <input
              name="title"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </label>
          <button type="button" onClick={postRecipe}>
            Rezept senden
          </button>
        </form>
        {recipes.map(recipe => {
          return (
            <div key={recipe.title}>
              <p>{recipe.title}</p>
              <a target="blank" href={recipe.url}>
                Take me to it!
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
