import { useState, useRef, useEffect } from "react";
import "./main.css";
import { getRecipeFromMistral } from "../../ai";
import ReactMarkdown from "react-markdown";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(false);

  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"});
    }
  }, [recipe])

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown);
  }

  const addIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  return (
    <main>
      <form action={addIngredient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button type="submit">+ Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipe={recipe}
          setRecipe={setRecipe}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  );
}

function IngredientsList({ ingredients, setIngredients, recipe, setRecipe, getRecipe, ref }) {
  const ingredientsListItems = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

  

  return (
    <section>
      <h2>Ingredients on hand:</h2>

      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>

      {ingredients.length > 3 && (
        <div className="get-recipe-container" ref={ref}>
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}

function ClaudeRecipe({ recipe }) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude recommends:</h2>
      <ReactMarkdown>{ recipe }</ReactMarkdown>
    </section>
  );
}


