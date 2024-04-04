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

var viewButtons = document.querySelectorAll(".view-btn");
viewButtons.forEach(button => {
  button.addEventListener("click", function () {
    var modal = document.getElementById("myModal");
    var modalTitle = document.getElementById("modal-title");
    var recipeTitleId = button.previousElementSibling.id;
    var recipeTitleElement = document.getElementById(recipeTitleId);
    modalTitle.textContent = recipeTitleElement.textContent;
    modal.style.display = "block";
    var closeModalBtn = document.querySelector(".close");
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });
});

// Event listener to open the modal when button is clicked
document.getElementById("openModal").addEventListener("click", function () {
  var modal = document.getElementById("modal1");
  modal.style.display = "block";
});

// Close modal when "x" button is clicked
document.querySelector(".close1").addEventListener("click", function () {
  var modal = document.getElementById("modal1");
  modal.style.display = "none";
});

if (window.location.hash === "#modal1") {
  window.location.hash = "";
}
