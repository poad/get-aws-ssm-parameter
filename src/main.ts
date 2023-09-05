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

		const client = createClient(region);
		client
			.getParameterValue(parameterName)
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
