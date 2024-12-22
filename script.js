document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const searchBar = document.getElementById('search-bar');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    function renderRecipes(recipesToRender) {
        recipeList.innerHTML = '';
        recipesToRender.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            recipeList.appendChild(li);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const recipeName = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value;
        const cookingSteps = document.getElementById('cooking-steps').value;
        const category = document.getElementById('category').value;

        const newRecipe = {
            name: recipeName,
            ingredients: ingredients,
            steps: cookingSteps,
            category: category
        };

        recipes.push(newRecipe);
        saveToLocalStorage();
         renderRecipes(recipes);
        recipeForm.reset();
    });

    recipeList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            recipes.splice(index, 1);
            saveToLocalStorage();
            renderRecipes(recipes);
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const recipe = recipes[index];
            document.getElementById('recipe-name').value = recipe.name;
            document.getElementById('ingredients').value = recipe.ingredients;
            document.getElementById('cooking-steps').value = recipe.steps;
            document.getElementById('category').value = recipe.category;
            recipes.splice(index, 1);
            saveToLocalStorage();
            renderRecipes(recipes);
        }
    });

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.category.toLowerCase().includes(searchTerm)
        );
        renderRecipes(filteredRecipes);
    });

    renderRecipes(recipes);
});