import * as ssm from '@aws-sdk/client-ssm';

const createClient = (region: string) => {
  const client = new ssm.SSMClient({
    region,
  });
  const getParameterValue = async (
    parameterName: string,
    secure?: boolean,
  ): Promise<string | undefined> => {
    const resp = await client.send(
      new ssm.GetParameterCommand({
        Name: parameterName,
        WithDecryption: secure,
      }),
    );

    if (resp.Parameter) {
      return resp.Parameter.Value;
    }
    return undefined;
  };
  return {
    getParameterValue,
  };
};

export default createClient;
