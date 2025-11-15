const getsearchBtn = document.getElementById('searchBtn');
const getSearchBar = document.getElementById('formControl');
const getForm = document.getElementById('form');
const mealsDisplay = document.getElementById('display');
const recipiesDisplay = document.getElementById("fullRecipies");
const describe = document.getElementById('describe');
const dataError = document.getElementById('dataNotFound');
const dataBlank = document.getElementById('dataBlank');



getForm.addEventListener('submit',async function(e){
    e.preventDefault();
    let searchVal = getSearchBar.value;

    if(searchVal.trim()){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`;

    await fetch(url)
        .then(response=>response.json())
            .then(data=>{

                if(data.meals === null){
                    describe.style.display = "none";
                    dataError.style.display='block';
                    dataBlank.style.display="none";
                    mealsDisplay.style.display="none";
                    recipiesDisplay.style.display='none';
                }else{
                    console.log(data);
                    describe.style.display = "none";
                    dataError.style.display='none';
                    dataBlank.style.display="none"
                    mealsDisplay.style.display="flex"
                    mealsDisplay.innerHTML = data.meals.map(meal=>`<img src="${meal.strMealThumb}" alt="${meal.strMeal}" data-idmeal=${meal.idMeal} class="displayImg" loading="lazy"/>`).join('');
                    recipiesDisplay.style.display="none";
                }

                
            }).catch(err=>console.log(err));
    }else{
        describe.style.display = "none";
        dataBlank.style.display="block"
        dataError.style.display='none';
        recipiesDisplay.style.display="none";
        }

        getSearchBar.value="";
        getSearchBar.focus();
});

mealsDisplay.addEventListener('click',async function(e){
    let foodId = e.target.getAttribute('data-idmeal');
    // console.log(foodId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`

     await fetch(url)
        .then(response=>response.json())
                .then(data=>{

                    const food = data.meals[0];
                    mealsDisplay.style.display="none";
                    recipiesDisplay.style.display="flex";

                    fullFoodRecipies(food);

                    // console.log(data);
                }).catch(err=>console.log(err));
});

function fullFoodRecipies(food){
    let ingredient = [];

    for(let x = 1; x <= 20; x++){
        if(food[`strIngredient${x}`]){
            ingredient.push(`${food[`strIngredient${x}`]} = ${food[`strMeasure${x}`]}`);
        }            
    }


    recipiesDisplay.innerHTML = `
        <div class="meal">
            <img src="${food.strMealThumb}" alt="${food.strMeal}" class="mealImg">
            
        </div>
        <div class="recipiesBox">
            <h2>${food.strMeal}</h2>
                <p class="recipies">
                    ${food.strInstructions}                    
                </p>
        </div>
        <div class="ingredientBox">
            <h2 class="ingredientHead">Main Ingredients</h2>
                <ol class="ingredientList">
                    ${ingredient.map(ingredient=>`<li>${ingredient}</li>`).join('')} 
                </ol>
        </div> 
     `
}

