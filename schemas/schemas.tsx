import { z } from "zod";

export const StoryCreationSchema = z.object({
    story : z.string().min(5, "Story is required and should be more than 5 characters"),
    sideCharacter: z.string(),
    moralStory: z.string(),
});

export const receipesCreationSchema = z.object({
    recipe : z.string().min(5, "Recipe is required and should be more than 5 characters"),
    ingredients : z.string(),
    restriction : z.string(),
    cookingTime : z.enum(["10 minutes","between 20 to 30 minutes","more than 30 minutes"]),
    numberOfIngredients : z.enum(["less than 5 ingredients","between 5 to 10 ingredients","more than 10 ingredients"]),
    levelOfDifficulty : z.string(),
})