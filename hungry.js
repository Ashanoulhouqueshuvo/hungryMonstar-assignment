const getServerdata = async api => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

const displayIngredients = detailsInfo => {
    for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`;
        const ingredientMeasure = `strMeasure${i}`;

        if(detailsInfo[ingredient]){
            const listItem = document.createElement("li");
            listItem.innerHTML = `<img src="images/377-3771706.png"> <p>${detailsInfo[ingredientMeasure]} ${detailsInfo[ingredient]}</p>`;
            document.getElementById("ingredients-list").appendChild(listItem);
        }
    }
}

const displayMealDetails = mealId => {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const detailsSection = document.getElementById("details-area");

    getServerdata(api).then(data => {
        const detailsInfo = data.meals[0];
        const info = `
            <div>
                <img src="${detailsInfo.strMealThumb}">
                <h1>${detailsInfo.strMeal}</h1>
                <h4>Ingredients</h4>
                <ul id="ingredients-list"></ul>
            </div>
        `;

        detailsSection.innerHTML = info;
        displayIngredients(detailsInfo);
    }).catch(error => {
        document.getElementById("error-message").innerText = "Lost Network";
        document.getElementById("error-message").style.display = "block";
    });
}

const displaySearchResult = mealName => {
    let api;
    const resultSection = document.getElementById("search-results-area");

    if(mealName.length == 1){
        api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`;
    } else{
        api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    }

    getServerdata(api).then( data => {
        data.meals.map(meal => {
            const mealDiv = document.createElement("div");
            const mealInfo = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}<h3>
            `;
            mealDiv.innerHTML = mealInfo;
            resultSection.appendChild(mealDiv);

            mealDiv.addEventListener("click", () => {
                document.getElementById("search-bar").style.display = "none";
                document.getElementById("search-results-area").style.display = "none";
                document.getElementById("details-area").style.display = "block";

                displayMealDetails(meal.idMeal);
            });
        });
    }).catch(error => {
        document.getElementById("error-message").style.display = "block";
    });
}

const getInputValue = () => document.getElementById("meal-input").value;

document.getElementById("search-btn").addEventListener("click", () => {
    document.getElementById("search-results-area").innerHTML = '';
    document.getElementById("error-message").style.display = "none";
    const mealName = getInputValue();
    displaySearchResult(mealName);
});