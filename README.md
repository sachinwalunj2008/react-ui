# React UI

React UI component library for use at [Pattern](https://pattern.com).

## Development

There are 2 ways to run this project:
1. Run `yarn dev` and set a frontend override in the application you are working with (Predict, Shelf, etc) in order to see your updates.
2. Run `yarn storybook` to see a local instance of our Library in Storybook.

When making updates, it is important to get changes approved by the UX team and front-end team leads. Please utilize Chromatic to demo your updates before getting your PRs raised. Chromatic command - `npx chromatic --project-token=cb8f4bc760a6`. This will allow you to get quick feedback on UI / UX before getting your code reviewed.

## Adding/Updating Types

Typescript typechecking happens at build-time, so setting a frontend override won't help with typechecking. To ensure your types still work, you'll need to:

- `yalc publish` **in this repo**

- `yalc link @patterninc/react-ui` **in the repo where the code will be tested (shelf/predict/marketshare/etc.)**

After that, you can easily push out updates/changes from here (react-ui) to the other repos by doing:

- `yalc push --scripts`

Note: you can either install `yalc` globally, or prefix all the previous commands with `npx`, e.g. `npx yalc publish`

## Updating package.json version

Do either of the following:

- Run `npm version patch`
- Manually update the `package.json` version field by opening `package.json` and incrementing the last number

## Removing yalc from Apps

Once you've tested the types, run

- `yalc remove @patterninc/react-ui`

in the repo where this code was tested (Predict/Shelf/Marketshare/etc) to remove yalc changes


# Workflow for Publishing NPM Versions and Bumping Related Repositories Versions

[npm-publish.yml](https://github.com/patterninc/react-ui/blob/master/.github/workflows/npm-publish.yml) Github workflow automates the process of publishing a new version of a react-ui package to NPM and bumping the version in another repository. The workflow will run whenever a new commit is pushed to a master branch in react-ui Git repository. It automatically updates the versions of the following repositories.

- predict
- shelf-ui
- marketshare-ui
- toggle
- admin
- connect

## The steps below describe how to bump the version of a newly added react repository.

__Step 1: Add Github Actions Workflow to new repository.__

Copy the [workflow file](https://github.com/patterninc/admin/blob/main/.github/workflows/react-ui-package-upgrade.yml) from the admin repository and replace the repo name with the new repo name from the workflow file and push to master/main branch of repository

__Step 2: Modify the npm-publish.yml Workflow to include the new repository version upgrade.__

Inside the npm-publish.yml workflow, add a new job before "notify-slack-on-failure"
```yaml
  <new-repo-name>-upgrade-package:
    needs: [publish]
    runs-on: ubuntu-latest
    name: <new-repo-name>-upgrade-package
    if: needs.publish.outputs.publish_type != 'none'
    steps:
      - name: Execute <new-repo-name> GHA workflow to upgrade react-ui package with latest version
        uses: convictional/trigger-workflow-and-wait@v1.3.0
        with:
          owner: patterninc
          repo: <new-repo-name>
          github_token: ${{ secrets.GHA_RUNNER_TOKEN }}
          workflow_file_name: react-ui-package-upgrade.yml
          ref: main     
```
We can enable react-ui version bumping for new repositories by making the changes listed above.