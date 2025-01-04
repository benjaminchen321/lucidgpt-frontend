import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Add global TextEncoder and TextDecoder for compatibility with Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
require("jest-fetch-mock").enableMocks();
