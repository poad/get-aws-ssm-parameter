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
      uses: poad/get-aws-ssm-parameter@v2.0.0
      with: 
        parameter-name: /example/parameter
        aws-region: us-west-2
  
    - name: 'Another example step'
      run: echo ${{ steps.parameter.outputs.value }}
```

## Additional Arguments

See [action.yml](action.yml) for more details.

## Outputs

The action outputs an string to the action output named `value`.  You can access and manipulate this data using [workflow expressions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/contexts-and-expression-syntax-for-github-actions#steps-context).

## Contributing

We welcome your interest in contributing to this project. Please read the [Contribution Guidelines](CONTRIBUTING.md) for more guidance.

## License

Any contributions made under this project will be governed by the [MIT License](LICENSE)
