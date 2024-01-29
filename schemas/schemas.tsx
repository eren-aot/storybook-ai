import { z } from "zod";

export const StoryCreationSchema = z.object({
    story : z.string().min(5, "Story is required and should be more than 5 characters"),
    sideCharacter: z.string(),
    moralStory: z.string(),
});

export const ReceipesCreationSchema = z.object({
    recipe : z.string().min(5, "Recipe is required and should be more than 5 characters"),
    ingredients : z.string(),
    restriction : z.string(),
    cookingTime : z.enum(["10min","25min","30min"]),
    numberOfIngredients : z.enum(["5","7","10"]),
    levelOfDifficulty : z.enum(["easy","medium","hard"]),
})