import mongoose from "mongoose";
import { validateProblem } from "./validators.js";

import 'dotenv/config'

const mongoDB =  process.env.MONGODB_URI;
// Done -> enum 
// links , tags -> array of strings 
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  tags: String,
  links: String,
  done: Boolean,
});

export async function connect() {

  try {
    await mongoose
      .connect(mongoDB)
      .then(() => console.log("Connected to database"));
  } catch {
    console.log("Cant connect bruh");
  }
}

export async function getData() {
  await connect();
  let response = { msg: "got no Data !" };

  try {
    const Problems = mongoose.model("problem", ProblemSchema);
    response = await Problems.find({})
      .sort({ id: "asc" })
      .lean()
      .then((res) => {
        console.log("Data recieved !");
        return res;
      });
  } catch {
    console.log("error line number 37");
  }
  return response;
}

export async function getProblemByID(ID) {
  await connect();
  let response = { msg: "got no Data !" };

  try {
    const Problems = mongoose.model("problem", ProblemSchema);

    response = await Problems.findOne({ id: ID })
      .lean()
      .then((res) => {
        console.log("Data recieved !");
        return res;
      });
  } catch (error) {

    console.error(error);
  }
  return response;
}

export async function addNewProblem(problem) {
  if (!validateProblem(problem)) {
    return { msg: "Bad Request" };
  }
  await connect();
  try {
    const Problems = mongoose.model("problem", ProblemSchema);
    const newProblem = new Problems(problem);
    await newProblem.save();
  } catch (err) {
    console.error(err);
  }
}
export async function deleteProblemById(id) {
  await connect();
  try {
    const Problems = mongoose.model("problem", ProblemSchema);
    await Problems.deleteOne({ id }).exec();
  } catch (err) {
    console.error(err);
  }
}

export async function editProblem(id,problem) {
  await connect();
  const Problem = mongoose.model("problem", ProblemSchema);
  const filter = { id };
  const update = problem;

  await Problem.findOneAndUpdate(filter, update)
    .exec()
    .then((res) => console.log("Done Edit ", res))
    .catch((err) => console.error(err));
}