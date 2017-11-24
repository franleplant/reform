import buildApi from "./buildApi";
import buildReadme from "./buildReadme";

const README_TEMPLATE = "./README.tpl.md";
const README_OUTPUT = "../README.md";
const API_OUTPUT = "../API.md";

buildApi(API_OUTPUT);
buildReadme(README_TEMPLATE, README_OUTPUT);
