import mongoose from "mongoose";

const configOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://patelparth31795:rAOZjxjemPBR2FRc@cluster0.qlsrxta.mongodb.net/next-ecommerce-app";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
