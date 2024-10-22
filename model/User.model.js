const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 15,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});


const UserModel = mongoose.model("user", UserSchema);

async function main() {
    const mongoDBURI = "mongodb://localhost:27017/recipes";
    
    try {
        await mongoose.connect(mongoDBURI);
        const response = await UserModel.findByIdAndDelete("67127645715bbd6a9f93cdf3");
        console.log(response);
    }
    catch (error) {
        console.log(error.message);
    }
}

main();