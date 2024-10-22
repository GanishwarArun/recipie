const express = require("express");
const fs = require("fs");
const multer = require("multer");
const RecipeModel = require("../model/Recipe.model");
const router = express.Router();

// Setup multer for file upload
const upload = multer({ dest: "uploads/" });

// Fetch all recipes
router.get("/", async (req, res) => {
  try {
    const results = await RecipeModel.find();
    return res.status(200).json({
      message: "Recipes fetched successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Request failed",
      error: error.message,
    });
  }
});

// Fetch a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }
    return res.status(200).json({
      message: "Recipe fetched successfully",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Request failed",
      error: error.message,
    });
  }
});

// Create a new recipe
router.post("/createRecipe", async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;

    const existingRecipe = await RecipeModel.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({
        message: "Recipe with this name already exists.",
      });
    }

    const newRecipe = new RecipeModel({ name, description, ingredients });
    const savedRecipe = await newRecipe.save();

    return res.status(201).json({
      message: "Recipe created successfully",
      result: savedRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Request failed",
      error: error.message,
    });
  }
});

// Update a recipe by ID
router.put("/updateRecipe/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId.trim();
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }
    return res.status(200).json({
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Request failed",
      error: error.message,
    });
  }
});

// Delete a recipe by ID
router.delete("/deleteRecipe/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId.trim();
    const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }
    return res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
});

// Import recipes from a JSON file
router.post("/import", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    await RecipeModel.insertMany(jsonData);
    res.status(200).json({ message: "Data imported successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to import data",
      error: error.message,
    });
  }
});

module.exports = router;

// const { response } = require('express');
// const RecipeModel = require('../model/Recipe.model');
// const RecipesRouter = require('express').Router();

// //fetches all the recipes
// RecipesRouter.get('/', async (request, response) => {
//     try {
//         const results = await RecipeModel.find();
//         return response.status(200).json({
//             message: 'Recipes fetched successfully',
//             data: results
//         });
//     } catch (e) {
//         return response.status(500).json({
//             message: 'Request failed',
//             error: error.message
//         });
//     }
// });

// // Fetches a recipe by Id
// RecipesRouter.get("/:recipeId", async (request, response) => {
//     try {
//         const recipe = await RecipeModel.findById(request.params.recipeId);
//         if (!recipe) {
//             return response.status(404).json({
//                 message: "Recipe not found"
//             });
//         }
//         return response.status(200).json({
//             message: "Recipe fetched successfully",
//             data: recipe
//         });
//     } catch (error) {
//         return response.status(500).json({
//             message: "Request failed",
//             error: error.message
//         });
//     }
// });

// // Create a new Recipe
// RecipesRouter.post("/createRecipe", async (request, response) => {
//   try {
//     const { name, description, ingredients } = request.body;

//     // Check for existing recipe by name
//     const existingRecipe = await RecipeModel.findOne({ name });
//     if (existingRecipe) {
//       return response.status(400).json({
//         message: "Recipe with this name already exists.",
//       });
//     }

//     const newRecipe = new RecipeModel({ name, description, ingredients });
//     const savedRecipe = await newRecipe.save();

//     return response.status(201).json({
//       message: "Recipe created successfully",
//       result: savedRecipe,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: "Request failed",
//       error: error.message,
//     });
//   }
// });

// // Update a recipe by ID
// RecipesRouter.put("/updateRecipe/:recipeId", async (request, response) => {
//     try {
//         const recipeId = request.params.recipeId.trim();
//         const updatedRecipe = await RecipeModel.findByIdAndUpdate(request.params.recipeId, request.body, { new: true });
//         if (!updatedRecipe) {
//             return response.status(404).json({
//                 message: "Recipe not found"
//             });
//         }
//         return response.status(200).json({
//             message: "Recipe updated successfully",
//             data: updatedRecipe
//         });
//     } catch (error) {
//         return response.status(500).json({
//             message: "Request failed",
//             error: error.message
//         });
//     }
// });

// //Delete a recipe by ID
// // Ensure the delete route matches the path used in Postman
// RecipesRouter.delete('/deleteRecipe/:recipeId', async (request, response) => {
//     try {
//          const recipeId = request.params.recipeId.trim();
//         const deletedRecipe = await RecipeModel.findByIdAndDelete(request.params.recipeId);
//         if (!deletedRecipe) {
//             return response.status(404).json({
//                 message: 'Recipe not found'
//             });
//         }
//         return response.status(200).json({
//             message: 'Recipe deleted successfully'
//         });
//     } catch (error) {
//         return response.status(500).json({
//             message: 'Failed to delete recipe',
//             error: error.message
//         });
//     }
// });

// module.exports = RecipesRouter;
