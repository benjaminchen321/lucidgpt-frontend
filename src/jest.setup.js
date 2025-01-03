import { TextEncoder, TextDecoder } from "util";
import fetchMock from "jest-fetch-mock";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Enable fetch mocks
fetchMock.enableMocks();
