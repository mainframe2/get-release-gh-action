const core = require("@actions/core");
const { getOctokit, context } = require("@actions/github");

async function run() {
  try {
    const github = getOctokit(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;
    const tag = core.getInput('tag');

    const getReleaseResponse = await github.repos.getReleaseByTag({ owner, repo, tag });

    const {
      data: {
        id: releaseId,
        html_url: htmlUrl,
        upload_url: uploadUrl,
        name: name,
        body: body,
        draft: draft,
        prerelease: prerelease,
        assets,
      }
    } = getReleaseResponse;

    console.log(`Got release info: '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${name}', '${draft}', '${prerelease}', '${body}', '${JSON.stringify(assets)}'`);

    core.setOutput("id", releaseId.toString());
    core.setOutput("html_url", htmlUrl);
    core.setOutput("upload_url", uploadUrl);
    core.setOutput("tag_name", tag);
    core.setOutput("name", name);
    core.setOutput("body", body);
    core.setOutput("draft", draft);
    core.setOutput("prerelease", prerelease);
    core.setOutput("assets", assets);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

run();
