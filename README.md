# GitHub Action to get value from AWS Systems Manager Parameter Store

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![version](https://img.shields.io/github/v/release/poad/get-aws-ssm-parameter?display_name=tag&include_prereleases&sort=semver)](VERSION)

## Usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: 'Get value from Parameter Store'
      id: parameter
      uses: poad/get-aws-ssm-parameter@v3.1.0
      with: 
        parameter-name: /example/parameter
        aws-region: us-west-2
        decryption: false
  
    - name: 'Another example step'
      run: echo ${{ steps.parameter.outputs.value }}
```

### Ignoring parameter not found error

When `ignore-parameter-not-found` is set to `true`, the action will not fail even if the specified parameter does not exist. The output `value` will be an empty string.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: 'Get value from Parameter Store (may not exist)'
      id: parameter
      uses: poad/get-aws-ssm-parameter@v3.1.0
      with: 
        parameter-name: /example/optional-parameter
        aws-region: us-west-2
        decryption: false
        ignore-parameter-not-found: true
  
    - name: 'Check if parameter exists'
      run: |
        if [ -n "${{ steps.parameter.outputs.value }}" ]; then
          echo "Parameter exists: ${{ steps.parameter.outputs.value }}"
        else
          echo "Parameter does not exist"
        fi
```

## Additional Arguments

| Name | Required | Default | Description |
| ---- | -------- | ------- | ----------- |
| `parameter-name` | true | - | Parameter name |
| `aws-region` | true | - | AWS region |
| `decryption` | true | false | Value specified for WithDecryption |
| `ignore-parameter-not-found` | false | false | If true, the action will not fail when the specified parameter does not exist |

## Outputs

The action outputs an string to the action output named `value`.  You can access and manipulate this data using [workflow expressions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/contexts-and-expression-syntax-for-github-actions#steps-context).

## Contributing

We welcome your interest in contributing to this project. Please read the [Contribution Guidelines](CONTRIBUTING.md) for more guidance.

## License

Any contributions made under this project will be governed by the [MIT License](LICENSE)

## Security Policy

See [SECURITY.md](./SECURITY.md).
