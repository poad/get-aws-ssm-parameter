/**
 * AWS Systems Manager Parameter Store から値を取得する GitHub Actions カスタムアクション
 *
 * このアクションは指定された Parameter Store のパラメータ値を取得し、
 * 出力として設定します。SecureString パラメータの場合は、復号化オプションを
 * 指定することで復号化された値を取得できます。
 *
 * @example
 * uses: your-action-name
 * with:
 *   parameter-name: '/app/prod/api-key'
 *   aws-region: 'us-east-1'
 *   decryption: true
 */
import * as core from '@actions/core';
import createClient from './client.js';

/**
 * アクションのメインロジックを実行します。
 * 入力パラメータを取得し、AWS SSM クライアントを使用してパラメータ値を取得します。
 * 取得した値は GitHub Actions の出力として設定されます。
 *
 * 必要な入力:
 * - parameter-name: SSM パラメータの完全な名前
 *
 * オプションの入力:
 * - aws-region: AWS リージョン（未指定時は認証情報のデフォルトリージョンを使用）
 * - decryption: SecureString パラメータを復号化するかどうか（デフォルト: false）
 *
 * 出力:
 * - value: 取得したパラメータ値
 *
 * @throws エラーが発生した場合、アクションは失敗としてマークされます
 */
const run = async (): Promise<void> => {
  try {
    // パラメータ名を取得（必須）
    const parameterName: string = core.getInput('parameter-name', {
      required: true,
      trimWhitespace: true,
    });
    core.debug(`Parameter name is ${parameterName}.`);

    // リージョンを取得（オプション）
    const region: string = core.getInput('aws-region');
    core.debug(region ? `region is ${region} ` : 'Use the credential\'s region');

    // 復号化フラグを取得
    const decryption = core.getBooleanInput('decryption');
    core.debug(`decryption is ${decryption} `);

    // SSM クライアントを作成してパラメータ値を取得
    const client = createClient(region);
    const value = await client.getParameterValue(parameterName, decryption);
    core.setOutput('value', value);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run().catch((error) => {
  if (error instanceof Error) core.setFailed(error.message);
});
