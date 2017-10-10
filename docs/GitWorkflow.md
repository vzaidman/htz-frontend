# Git Workflow

For a short, printable cheatsheet of useful commands, see [here](#cheatsheet).

_**Note:** The examples used throughout this document assume you have the Haaretz [`.gitconfig` file](https://github.com/Haaretz/htz-dotfiles/blob/master/.gitconfig) installed. Many of them use aliases, which will not be available with a vanilla installation of Git._   
_If it is not installed on your machine, See installation instructions [here](https://github.com/Haaretz/htz-dotfiles)._

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic workflow](#basic-workflow)
  - [Rules of Thumb](#rules-of-thumb)
- [Commits](#commits)
  - [Committing with Commitizen](#committing-with-commitizen)
  - [Manual Commit Messages](#manual-commit-messages)
- [Git Hooks](#git-hooks)
  - [commit-msg](#commit-msg)
  - [post-checkout](#post-checkout)
  - [pre-commit](#pre-commit)
  - [pre-push](#pre-push)
- [Cheatsheet](#cheatsheet)
- [Squashing Commits](#squashing-commits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic workflow

### Rules of Thumb

* Code changes must never be committed directly to `master`, use `feature` and `hotfix` branches
  prolifically.
* Each distinct piece of functionality should be developed in its own, independent `feature` branch.<br />
  To create a new feature branch run:
  ```sh
  git feature <branch-name>
  ```
  The name will automatically be prefixed with `feature/`.
* Rebase your branch onto `master` at least once a day to avoid mega-merges and hard to resolve 
  conflicts. To do so, run the following *from your feature branch*:
  ```sh
  # In feature branch
  git stash && git upmaster && git rebase master
  ```
  If any conflicts come up, resolve them, `git add` the resolved file(s) and `git rebase --continue`
* Preferably use Commitizen to make your commits ([see here](#committing-with-commitizen))
* It is okay to make work-in-progress commits, just mark them as `WIP` type.
* If you did make work-in-progress commits, make sure to [squash all commits related to a single 
  issue into a single commit](#squashing-commits) using interactive rebase.


## Commits

This repository follows the [Convential Commit](https://conventionalcommits.org/) standard
in order to enable smoother automated release process and adherence to the [SemVer](http://semver.org/)
convention.

### Committing with Commitizen

To ease the authoring of commit messages, `yarn gc` (`gc` stands for git commit) will fire a 
Commitizen-powered wizard, that will walk you thorough inputing all the needed information, 
and will format the message based on the convention.

Loosing carefully crafted commit messages as a result of failing tests set in a `precommit` hook 
(we have some) can be a pretty frustrating experience, as you will be forced to rewrite your 
commit message.

Worry not! Commitizen has your back. Fix what needs to be fixed for the tests to pass, and run 
`yarn gc --retry`. The previous commit message will be used.

**Note:** The retry cache may be cleared when upgrading commitizen versions, upgrading adapters, or if 
you delete the commitizen.json file in your home or temp directory. Additionally, the commit cache 
uses the filesystem path of the repo, so if you move a repo or change its path, you will not be 
able to retry a commit. This is an edge case, but might be confusing if you have scenarios where 
you are moving folders that contain repos.

### Manual Commit Messages

If, for some reason, you would rather manually write your commit message, they will be automatically 
validated and must comply with the following convention:

```git
type(scope): subject line # scope is optional

affects: <package-name> # <- packages affected by the commit
body # optional detailed description of the changes in the commit

footer? # optional meta-data about the commit, e.g., closed issues.
```

The rules defined in [@haaretz/commitlint-config](https://www.github.com/Haaretz/commitlint-config-htz)
regarding the formatting of `type`, `scope` and `subject` will also be confirmed.

## Git Hooks

The repository uses `Husky` to manage the use of shareable git hooks (they usually reside in the 
`.git` directory, and therefore are personal and not part of the committed code).

The hooks are defined as scripts of the corresponding name in the root `package.json`.

### commit-msg

Validates commit messages (See [above](#manual-commit-messages)).

### post-checkout

When branching out of a branch that isn't `master`, make sure this is actually what the user 
intends to do.

### pre-commit

* Lint staged files (but not others)
* Run only tests related to staged files.
* Warn when trying to commit directly to master (can always be bypassed with the -n flag)
* Warn when trying to commit files with unresolved merge conflicts

### pre-push

Prevent destructive `push`es (a push that rewrites history, or deletes a branch) to permanent, 
shared branches, like `master` and `dev`.

## Cheatsheet

Some useful commands available with the Haaretz 
[`.gitconfig` file](https://github.com/Haaretz/htz-dotfiles/blob/master/.gitconfig):

| Command | Notes | Used for |
| --- | --- | --- |
| `git co` | `git checkout` | |
| `git mb <branch>` or `git merge-baranch` | Merges `<branch>` into the branch you are currently in, using the no-fast-forward strategy. | Merging temporary branches back into `master`, while keeping a tidy tree structure. |
| `git db <branch>` | Deletes `<branch>` from both the local repo and from origin. | Discarding stale temporary branches _after_ they have been merged into the primary branch(es). |
| `git feature <branch>` | Syncs `master` with `origin` and checks out a new branch from it | Creating new `feature` branches. |
| `git hofix <branch>` | Syncs tags with `origin` and checks out a new branch from the latest tag in the refs | Creating new `hotfix` branches. |
| `git upmaster` | Checks out `master`, syncs it with origin and checks out the branch you were originally on. | Preparing for rebasing a branch onto `master`, just before it is ready to be merged back. |

## Squashing Commits

In order to keep the master branch easy to navigate, and more straight-forward to revert changes, 
it is asked that you squash your commits down to a few, or one, discreet changesets before 
submitting a pull request. Small features or bug fixes will usually only need one commit, while a 
larger feature might contain a few separate improvements that is easier to track through different 
commits.

Once you have rebased your work on top of the latest state of master, you may have several commits 
related to the issue you were working on. Once everything is done, squash them into a single commit 
with a descriptive message, adhering to the [`commit-msg` standard](manual-commit-messages).

Assuming the your branch has six commits, to merge all related ones together, do the following:
```sh
$ git rebase -i HEAD~6
```

In the text editor that comes up, group relevant commits together by changing the order of the lines
and replace the words "pick" with "squash" next to the commits you want to squash into the commit 
before it. Save and close the editor, and git will combine the "squash"'ed commits with the one 
before it. 

Git will then open another editor where you should write a new commit message describing all the 
squashed commits, for example:
```git
feat(login): validate user input

affects: @haaretz/haaretz.co.il 
* Send email to user-provided email
* Add email validation logic and ui
* Present clearer error messages when things go wrong

closes: #157
```

**Important**: When squashing commits that had already been pushed to `origin`, you will have to force 
the push to your branch. Bare in mind that force pushes can cause problems when several people work 
on the same branch. While still not 100% safe, for a safer alternative to `push --force` use:
```sh
$ git push --force-with-lease origin branch-name
```

**Protip:** You can always edit your last commit message, before pushing, by using:
```sh
$ git commit --amend
```

**See also:**
[Git Book Chapter 6.4: Git Tools - Rewriting History](http://git-scm.com/book/en/Git-Tools-Rewriting-History)
