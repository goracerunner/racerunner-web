# Contributing to Race Runner

Thank you for taking the time to contribute to Race Runner!
The following is a set of guidelines for how to contribute new features or
bug fixes to this project. Please take the time to review these carefully
before submitting any code.

## Repository conventions

### Git workflow

This project follows a slightly modified [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.
Please be familiar with this branching model before proceeding.

This project mainly utilises the `master`, `develop` and `feature` branch types
from the GitFlow workflow, with slight changes outlined below. Other features, such
as `release` branches and `hotfix` branches, are rarely necessary and discouraged
for the purposes of this project.

Please ensure that the commit and merging conventions are followed strictly
as the the [changelog](CHANGELOG.md) is generated directly from the `master`
branch's commit history.

**feature/\***

Feature branches are where most of the commits will go. Each feature branch
should contain changes for **one** feature. Commits on feature branches are
**not** published to the change log. When a feature is complete, a merge
request should be made to the `develop` branch. The commit should be
**squashed on merge**, with the squash commit's message following the
[conventional commits specification](https://www.conventionalcommits.org)
to be published in the changelog. See the **Commit messages** section below
for more information.

**develop**

The `develop` branch can be seen as a 'staging' area for the `master` branch.
It receives merge requests from `feature` branches and should only contain clean,
squashed commits that outline one feature each. To start a release, ensure that
features to be released have been merged into this branch, then follow the
instructions found in the [release document](RELEASE.md).

**master**

The `master` branch will contain the release history of the project and will be
tagged with each release. It should only contain three types of commits:

- release commits (which should be tagged)
- merge commits (from the `develop` branch)
- squashed commits (which are automatically merged from the `develop` branch)

Squashed commits from the `develop` branch should follow the
[conventional commits specification](https://www.conventionalcommits.org)
and will be reflected in the [changelog](CHANGELOG.md), so it is extremely
important that this is kept clean and accurate.

### Example

Use the command `yarn graph` to view a graph of the repository.
See the following for an example of what a graph using this workflow should look like:

```
* c48fab0 (HEAD -> develop, tag: v0.0.2, master) chore(release): 0.0.2
*   702888c Merge branch 'develop' into 'master'
|\
| *   132116e Merge branch 'feature/feature-3' into 'develop'
| |\
|/ /
| * c6a0795 feat: feature 3 (squashed)
|/
| * a7c8769 (feature/feature-3) feat: add feature 3
| * f51d0a7 feat: add feature 3
|/
* e3b941d (tag: v0.0.1) chore(release): 0.0.1
*   e37ce46 Merge branch 'develop' into 'master'
|\
| *   ca546e5 Merge branch 'feature/feature-2' into 'develop'
| |\
| | * 19517e9 feat: create feature 2 (squashed)
| |/
| | * 67621b6 (feature/feature-2) chore: finish feature 2
| | * 3b0595b feat: work on feature 2
| |/
| *   92010ef Merge branch 'feature/feature-1' into 'develop'
| |\
|/ /
| * 5218c9b feat: create feature 1 (this is a squashed commit of the feature/feature-1 branch onto develop)
|/
| * d8130b7 (feature/feature-1) feat: finish feature 1
| * 8e6f4a8 feat: more commits for feature 1
| * ab27a91 feat: work on feature 1
|/
* 4cdbdc8 ...
```

### Commit messages

Commit messages in this repository should follow the conventional commits specification,
outlined [here](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).
It is highly recommended that this specification is followed in order to keep a clean
history, and **must be used** when creating commit messages (usually done on squash commit
messages on Gitlab.com) that need to be recorded in the change log.

**Project specific notes**

The `type` field should be one of the following (with their meaning enclosed in parentheses),
and should be followed by a commit subject no be longer than 72 characters.

```
COMMIT TYPES

feat (new feature)
fix (bug fix)
docs (changes to documentation)
style (formatting, missing semi colons, etc; no code change)
refactor (refactoring production code)
test (adding missing tests, refactoring tests; no production code change)
chore (updating CI tasks etc; no production code change)
revert (reverting a previous commit)
```

If the commit **contains a breaking change**, the type **MUST** be followed by an
exclamation mark (!) and the message body should contain "BREAKING CHANGE: "
followed by more information about the breaking change.
For example:

```
feat!: change to user data model

BREAKING CHANGE: user data models now combine the 'firstname' and 'lastname' fields into a single 'name' field.
```
