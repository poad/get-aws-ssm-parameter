import { fail } from "assert";
import * as cp from "child_process";
import * as path from "path";
import { expect, test } from "@jest/globals";
import * as process from "process";
import createClient from "../src/client";

test("throws Parameter not found", async () => {
  const client = createClient("us-west-2");
  await expect(client.getParameterValue("not_found")).rejects.toThrow("");
});

test("Get Parameter", async () => {
  const client = createClient("us-west-2");
  const value = await client.getParameterValue("/get-aws-ssm-parameter/test");
  expect(value).toBe("test");
});

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  process.env["INPUT_PARAMETER-NAME"] = "/get-aws-ssm-parameter/test";
  process.env["INPUT_AWS-REGION"] = "us-west-2";
  process.env["INPUT_DECRYPTION"] = "false";
  const np = process.execPath;
  const ip = path.join(__dirname, "..", "lib", "main.js");

  try {
    const options: cp.ExecFileSyncOptions = {
      env: process.env,
    };
    const ret = cp.execFileSync(np, [ip], options).toString();
    console.log(ret);
  } catch (error) {
    console.error(error);
    fail(error);
  }
});
