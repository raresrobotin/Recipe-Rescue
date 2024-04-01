import "./style.css";
console.warn("start app");

function filterRecipes() {
  var ingredients = document.getElementById("ingredientsInput").value;
  var type = document.getElementById("typeInput").value;
  var time = document.getElementById("timeInput").value;

  fetch("recipes.json")
    .then(response => response.json())
    .then(recipes => {
      var filteredRecipes = recipes.filter(recipe => {
        return (
          (recipe.ingredients.includes(ingredients) || !ingredients) &&
          (recipe.type.includes(type) || !type) &&
          (recipe.time.includes(time) || !time)
        );
      });

      displayRecipes(filteredRecipes);
    })
    .catch(error => console.error("Error fetching recipes:", error));
}

function displayRecipes(recipes) {
  var recipeResults = document.getElementById("recipe-results");
  recipeResults.innerHTML = "";

  recipes.forEach(recipe => {
    var div = document.createElement("div");
    div.innerHTML = `
      <img class="recipe-img" src="${recipe.image}" alt="${recipe.name}" height="160px" />
      <h1>${recipe.name}</h1>
      <button type="menu">View</button>
    `;
    recipeResults.appendChild(div);
  });
}
