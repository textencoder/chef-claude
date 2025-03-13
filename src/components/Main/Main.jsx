import { useState } from "react";
import "./main.css";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const ingredientsListItems = ingredients.map(ingredient => {
    return <li key={ingredient}>{ingredient}</li>
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");
    console.log(newIngredient);
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return (
    <main>
    <form action="" onSubmit={handleSubmit}>
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
