import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const clearState = () => {
    setTitle("");
    setUrl("");
  };

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
      .then(res => {
        fetchRecipes();
        clearState();
      })
      .catch(e => console.log(e));
  };

  const deleteRecipe = id => {
    axios
      .post(`https://recipes-111.herokuapp.com/recipes/${id}`)
      .then(() => {
        fetchRecipes();
      })
      .catch(e => console.log(e));
  };

  const randomRecipe = () => {
    const len = recipes.length;
    const index = Math.floor(Math.random() * len);
    console.log(index, recipes[index]?.title);
    alert(
      `Das Rezept: ${recipes[index]?.title} und die Homepage: ${recipes[index]?.url}`
    );
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Rezepte!</header>
      <div className="App-content">
        <button type="button" onClick={randomRecipe}>
          Zufaelliges Gericht waehlen
        </button>
        <form className="App-form" onSubmit={postRecipe}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={title}
            placeholder="Enter Recipe Title"
            onChange={e => setTitle(e.target.value)}
          />

          <label htlmFor="url">Url</label>
          <input
            name="title"
            value={url}
            placeholder="Enter Recipe Url"
            onChange={e => setUrl(e.target.value)}
          />

          <button
            style={{ width: "150px", marginTop: "10px" }}
            type="button"
            onClick={postRecipe}
          >
            Rezept senden
          </button>
        </form>
        {recipes.map(recipe => {
          const id = recipe._id;
          return (
            <div key={recipe.title}>
              <p>{recipe.title}</p>
              <a target="blank" href={recipe.url}>
                Take me to it!
              </a>
              <button
                type="button"
                onClick={() => {
                  deleteRecipe(id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
