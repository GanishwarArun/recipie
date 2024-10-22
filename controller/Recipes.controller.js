const { response } = require('express');
const RecipeModel = require('../model/Recipe.model');
const RecipesRouter = require('express').Router();

//fetches all the recipes
RecipesRouter.get('/', async (request, response) => {
    try {
        const results = await RecipeModel.find();
        return response.status(200).json({
            message: 'Recipes fetched successfully',
            data: results
        });
    } catch (e) {
        return response.status(500).json({
            message: 'Request failed',
            error: error.message
        });
    }
});


// Fetches a recipe by Id 
RecipesRouter.get("/:recipeId", async (request, response) => {
    try {
        const recipe = await RecipeModel.findById(request.params.recipeId);
        if (!recipe) {
            return response.status(404).json({
                message: "Recipe not found"
            });
        }
        return response.status(200).json({
            message: "Recipe fetched successfully",
            data: recipe
        });
    } catch (error) {
        return response.status(500).json({
            message: "Request failed",
            error: error.message
        });
    }
});

// Create a new Recipe
RecipesRouter.post("/createRecipe", async (request, response) => {
  try {
    const { name, description, ingredients } = request.body;

    // Check for existing recipe by name
    const existingRecipe = await RecipeModel.findOne({ name });
    if (existingRecipe) {
      return response.status(400).json({
        message: "Recipe with this name already exists.",
      });
    }

    const newRecipe = new RecipeModel({ name, description, ingredients });
    const savedRecipe = await newRecipe.save();

    return response.status(201).json({
      message: "Recipe created successfully",
      result: savedRecipe,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Request failed",
      error: error.message,
    });
  }
});


// Update a recipe by ID 
RecipesRouter.put("/updateRecipe/:recipeId", async (request, response) => {
    try {
        const recipeId = request.params.recipeId.trim();
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(request.params.recipeId, request.body, { new: true });
        if (!updatedRecipe) {
            return response.status(404).json({
                message: "Recipe not found"
            });
        }
        return response.status(200).json({
            message: "Recipe updated successfully",
            data: updatedRecipe
        });
    } catch (error) {
        return response.status(500).json({
            message: "Request failed",
            error: error.message
        });
    }
});

//Delete a recipe by ID
// Ensure the delete route matches the path used in Postman
RecipesRouter.delete('/deleteRecipe/:recipeId', async (request, response) => {
    try {
         const recipeId = request.params.recipeId.trim(); 
        const deletedRecipe = await RecipeModel.findByIdAndDelete(request.params.recipeId);
        if (!deletedRecipe) {
            return response.status(404).json({
                message: 'Recipe not found'
            });
        }
        return response.status(200).json({
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Failed to delete recipe',
            error: error.message
        });
    }
});


module.exports = RecipesRouter;