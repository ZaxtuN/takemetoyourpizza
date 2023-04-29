import React, { useEffect, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import PizzaSidebar from "../PizzaSidebar/PizzaSidebar";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddPizzaShop = () => {
  const [pizzaShopName, setPizzaShopName] = useState("");
  const [pizzaShopDescription, setPizzaShopDescription] = useState("");
  const [pizzaShopBorough, setPizzaShopBorough] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleAddPizzaShop() {
    try {
      await addDoc(collection(db, "PizzaShops"), {
        pizzaShopName: pizzaShopName,
        pizzaShopDescription: pizzaShopDescription,
        pizzaShopBorough: pizzaShopBorough,
      });
      navigate("/PizzaShops");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <ProSidebarProvider>
        <PizzaSidebar />
        {error && <Alert severity="error">{error}</Alert>}
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">New Pizza Shop: </h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="pizzaShopName"
                placeholder="Name of Pizza Shop: "
                onChange={(e) => {
                  setPizzaShopName(e.target.value);
                }}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="pizzaShopDescription"
                placeholder="Description of Pizza Shop: "
                onChange={(e) => {
                  setPizzaShopDescription(e.target.value);
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="PizzaBorough">Pizza Shop Borough </InputLabel>
                <Select
                  labelId="pizzaShopBorough"
                  id="pizzaShopBorough"
                  value={pizzaShopBorough}
                  label="Pizzas Shop Borough"
                  onChange={(e) => {
                    setPizzaShopBorough(e.target.value);
                  }}
                >
                  <MenuItem value={"Bronx"}>Bronx</MenuItem>
                  <MenuItem value={"Brooklyn"}>Brooklyn</MenuItem>
                  <MenuItem value={"Queens"}>Queens</MenuItem>
                  <MenuItem value={"Manhattan"}>Manhattan</MenuItem>
                  <MenuItem value={"Staten Island"}>Staten Island</MenuItem>
                  <MenuItem value={"NJ: Hoboken/JerseyCity"}>
                    NJ: Hoboken/JerseyCity
                  </MenuItem>
                </Select>
              </FormControl>
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 createAccountButton"
                onClick={handleAddPizzaShop}
              >
                Submit New Pizza Shop
              </button>
            </div>
          </div>
        </div>
      </ProSidebarProvider>
    </>
  );
};

export default AddPizzaShop;
