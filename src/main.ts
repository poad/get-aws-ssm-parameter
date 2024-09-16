import * as core from "@actions/core";
import "source-map-support/register";
import createClient from "./client";

function run(): void {
  try {
    const parameterName: string = core.getInput("parameter-name", {
      required: true,
      trimWhitespace: true,
    });
    core.debug(`Parameter name is ${parameterName}.`);

    const region: string = core.getInput("aws-region");
    core.debug(region ? `region is ${region} ` : "Use the credential's region");

    const decryption =
      core.getBooleanInput("decryption", { required: false }) ?? false;
    core.debug(
      decryption !== undefined
        ? `decryption is ${decryption} `
        : "No decryption",
    );

    const client = createClient(region);
    client
      .getParameterValue(parameterName, decryption)
      .then((value) => core.setOutput("value", value))
      .catch((error) => {
        if (error instanceof Error) core.setFailed(error.message);
      });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
