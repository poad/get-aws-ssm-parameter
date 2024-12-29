/**
 * AWS Systems Manager Parameter Store クライアントを作成します。
 * パラメータ値の取得機能を提供するクライアントインスタンスを返します。
 *
 * @param region - AWS リージョン (例: 'ap-northeast-1')
 * @returns パラメータ取得機能を持つクライアントオブジェクト
 *
 * @example
 * const ssmClient = createClient('ap-northeast-1');
 * const value = await ssmClient.getParameterValue('/my/parameter');
 */
import * as ssm from '@aws-sdk/client-ssm';

function createClient(region: string) {
  const client = new ssm.SSMClient({
    region,
  });

  /**
   * Parameter Store からパラメータ値を取得します。
   *
   * @param parameterName - パラメータ名 (パスを含む完全な名前)
   * @param secure - SecureString型パラメータの場合はtrueを指定。この場合、値は自動的に復号化されます。
   * @returns パラメータ値。パラメータが存在しない場合はundefined
   *
   * @example
   * // 通常のパラメータの取得
   * const value = await getParameterValue('/app/dev/db-url');
   *
   * // SecureStringパラメータの取得
   * const secret = await getParameterValue('/app/dev/db-password', true);
   */
  async function getParameterValue(
    parameterName: string,
    secure?: boolean,
  ): Promise<string | undefined> {
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
