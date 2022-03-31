## Description
The action is alomost identical to https://github.com/bruceadams/get-release with the addition of the possibility to pass the release tag as an argument.

## Usage

Example usage:
```
- name: Get release
  uses: mainframe2/get-release-gh-action@main
  with:
    tag: v0.1.20
  env:
    GITHUB_TOKEN: ${{ github.token }}

- name: Upload release binary
  uses: actions/upload-release-asset@v1.0.2
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    upload_url: ${{ steps.get_release.outputs.upload_url }}
    ...
