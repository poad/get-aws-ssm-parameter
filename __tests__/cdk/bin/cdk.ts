#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack.js";

const app = new cdk.App();
new CdkStack(app, "get-aws-ssm-parameter-test-stack-oregon", {
  env: { region: "us-west-2" },
});
new CdkStack(app, "get-aws-ssm-parameter-test-stack-tokyo", {
  env: { region: "ap-northeast-1" },
});
