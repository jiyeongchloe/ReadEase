# ReadEase
**Inclusive Technology CMSC 20370 Project**

**Authors:** Chloe Lee, Tiffany Lee, Soyoon Moon

## Local Setup
1. Create a directory on your local machine (or run the following command where you want the repo to be cloned)
2. Run `git clone git@github.com:jiyeongchloe/ReadEase.git`
3. Done!

## Testing / Running the Extension
1. Go to <chrome://extensions/>
2. Toggle `Developer mode` near the top right corner of the page
3. Click on `Load unpacked` near the top left corner of the page
4. Select the directory that you have cloned the repo to
5. The extension should now be added

> [!WARNING] 
> Whenever you make changes to the files, make sure to click on the circle loading button to make sure changes are reflected in the web browser


## Dev / Commit Guidelines
To keep everything organized, let's use branches for adding new features instead of committing everything to `main` immediately.

Here is the [project board](https://github.com/users/jiyeongchloe/projects/1)
- Add issues directly to the to-do column or convert drafts from the backlog into an issue
- updates on progress as comments on the issues would be helpful
- maybe only do PR after the task is done? or should we do micro PRs within branches as well?
- should we do PR reviews?


### Creating a Branch
- Option 1: On the main page of the repository, click on the dropdown branch menu near the top left corner. Enter a name for the new branch in the textbox and click `create ___ branch from dev`
- Option 2: In the terminal, `cd` to the root of the repository and run `git branch <name of new branch>`


### Best Practices
- Run `git pull` before you do anything to make sure your local repo is up to date
- Use identifying names for branches, preferably in the form `COMPONENT/DESCRIPTION` so we can find it easily
    - ex) `text/fix-font-bug`


### Checking Current Branch
Run `git branch --show-current` in terminal


### Switching Branches
Run `git switch <name of branch you want to switch to>`


### Committing and Pushing Changes
> [!IMPORTANT] 
> Make sure to commit changes in the appropriate branch

Run the following:
1. `git add .`
2. `git commit -m "description here"`
3. `git pull` !! important: run `git pull` after you commit
5. `git push`
    - may have to run `git push origin HEAD`


### Pull Requests (PRs)
When submitting a PR, link the respective issue and add someone as the reviewer. Post update on kakaotalk.

If you are added as the reviewer, run that branch as an extension (instructions above) to make sure everything runs correctly and either approve & merge or comment on anything you think should be changed and request changes.
