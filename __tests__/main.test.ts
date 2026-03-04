import { expect, test, vi } from "vitest";

class MockParameterNotFoundError extends Error {
  constructor(parameterName: string) {
    super(`Parameter '${parameterName}' not found`);
    this.name = "ParameterNotFoundError";
  }
}

vi.mock("@actions/core");
vi.mock("../src/client.js");

import createClient from "../src/client.js";
import * as core from "@actions/core";

test("ignore-parameter-not-found: true with parameter exists - should return value", async () => {
  vi.clearAllMocks();
  const mockGetParameterValue = vi.fn().mockResolvedValue("test-value");
  vi.mocked(createClient).mockReturnValue({
    getParameterValue: mockGetParameterValue,
  } as unknown as ReturnType<typeof createClient>);

  vi.mocked(core.getInput).mockImplementation((name: string) => {
    if (name === "parameter-name") return "/test/exists";
    if (name === "aws-region") return "us-west-2";
    if (name === "decryption") return "false";
    if (name === "ignore-parameter-not-found") return "true";
    return "";
  });
  vi.mocked(core.getBooleanInput).mockImplementation((name: string) => {
    if (name === "decryption") return false;
    if (name === "ignore-parameter-not-found") return true;
    return false;
  });

  const { run } = await import("../src/main.js");
  await run();

  expect(core.setOutput).toHaveBeenCalledWith("value", "test-value");
  expect(core.setFailed).not.toHaveBeenCalled();
});

test("ignore-parameter-not-found: true with parameter not found - should not error and return empty string", async () => {
  vi.clearAllMocks();
  const mockGetParameterValue = vi.fn().mockRejectedValue(
    new MockParameterNotFoundError("/test/not-found")
  );
  vi.mocked(createClient).mockReturnValue({
    getParameterValue: mockGetParameterValue,
  } as unknown as ReturnType<typeof createClient>);

  vi.mocked(core.getInput).mockImplementation((name: string) => {
    if (name === "parameter-name") return "/test/not-found";
    if (name === "aws-region") return "us-west-2";
    if (name === "decryption") return "false";
    if (name === "ignore-parameter-not-found") return "true";
    return "";
  });
  vi.mocked(core.getBooleanInput).mockImplementation((name: string) => {
    if (name === "decryption") return false;
    if (name === "ignore-parameter-not-found") return true;
    return false;
  });

  const { run } = await import("../src/main.js");
  await run();

  expect(core.setOutput).toHaveBeenCalledWith("value", "");
  expect(core.warning).toHaveBeenCalledWith("Parameter '/test/not-found' not found");
  expect(core.setFailed).not.toHaveBeenCalled();
});

test("ignore-parameter-not-found: false with parameter not found - should error", async () => {
  vi.clearAllMocks();
  const mockGetParameterValue = vi.fn().mockRejectedValue(
    new MockParameterNotFoundError("/test/not-found")
  );
  vi.mocked(createClient).mockReturnValue({
    getParameterValue: mockGetParameterValue,
  } as unknown as ReturnType<typeof createClient>);

  vi.mocked(core.getInput).mockImplementation((name: string) => {
    if (name === "parameter-name") return "/test/not-found";
    if (name === "aws-region") return "us-west-2";
    if (name === "decryption") return "false";
    if (name === "ignore-parameter-not-found") return "false";
    return "";
  });
  vi.mocked(core.getBooleanInput).mockImplementation((name: string) => {
    if (name === "decryption") return false;
    if (name === "ignore-parameter-not-found") return false;
    return false;
  });

  const { run } = await import("../src/main.js");
  await run();

  expect(core.setFailed).toHaveBeenCalledWith("Parameter '/test/not-found' not found");
});
