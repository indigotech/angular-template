# Contributing to Template Angular

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Template Angular,
which is hosted in the [Template Angular Repository](https://github.com/indigotech/angular-template) on GitHub.
These are just guidelines, not rules, use your best judgment and feel free to
propose changes to this document in a pull request. :smile:

## Roadmap
* You can follow the roadmap *(COMING SOON)* :world_map:

## Submitting Issues

* You can create an issue [here](https://github.com/indigotech/angular-template/issues), but
  before doing that please read the notes below on submitting issues,
  and include as many details as possible with your report.
* The issue title should contain the issue type, like in the following example: `[BUG] Endpoint does not work`.
* Include screenshots or pieces of code whenever possible, they are very helpful. :blush:
* Also don't forget to read and comment on open issues. :stuck_out_tongue_winking_eye:

## Pull Requests

* Use the following examples branch name pattern:
  - `feature/add-endpoint`  
  - `bugfix/missing-fields`
  - `enhancement/add-fields`
  - `docs/update-readme`
  - `chore/config-staging`
* Reference issues when creating the pull request. Make sure to add a reference to the issue like this: `References #48`
  (avoid using GH's keywords that automatically closes issues - complete list [here](https://help.github.com/articles/closing-issues-using-keywords/)).
* Make sure to create tests for all features added. Also run the tests before commiting any changes: `yarn run test`.
* Verify if there are any documents in need of updates.
* Include screenshots and animated GIFs in your pull request whenever possible.
* Review open pull requests. It really helps. :wink:

## Git Commit Messages

* Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) pattern:
  * More details on the [site documentation](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification)
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```
* Use the present tense ("Add feature" not "Added feature")
* Limit the first line to 72 characters or less  
