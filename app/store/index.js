import { configureStore } from "@reduxjs/toolkit";
import configStore from "./reducers";

let store = configureStore(configStore);

export default store;
