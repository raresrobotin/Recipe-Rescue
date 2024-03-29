import "./style.css";

console.warn("start app");

let allRecipes = [];

function $(selector) {
  return document.querySelector(selector);
}

function fetchRecipes(){
  return fetch("http://localhost:3000/recipes.json", {
    
  }
}

/*function searchRecipes() {
  const ingredientInput = document.getElementById("ingredientInput").value.toLowerCase();
  const searchedRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredientInput))
  );

  displayRecipes(searchedRecipes);
}*/

function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  recipes.forEach(recipe => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");
    recipeElement.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;
    recipeList.appendChild(recipeElement);
  });
}

fetch("recipes.json");
