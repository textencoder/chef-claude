import { useState } from "react";
import "./main.css";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const ingredientsListItems = ingredients.map(ingredient => {
    return <li key={ingredient}>{ingredient}</li>
  })

  const addIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return (
    <main>
    <form action={addIngredient}>
      <input
        type="text"
        placeholder="e.g. oregano"
        aria-label="Add ingredient"
        name="ingredient"
      />
      <button type="submit">+ Add ingredient</button>
    </form>

    <ul>
      {ingredientsListItems}
    </ul>

    </main>
  );
}
