import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model("Form", formSchema);

app.post("/api/form", async (req, res) => {
  const formData = new Form(req.body);
  try {
    await formData.save();
    res.status(201).send("Form data saved");
  } catch (error) {
    res.status(400).send("Error saving form data");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
