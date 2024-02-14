# ReadEase
Inclusive Technology CMSC 20370 Project

Authors: Chloe Lee, Tiffany Lee, Soyoon Moon

## Local Setup
1. Create a directory on your local machine (or run the following command where you want the repo to be cloned)
2. Run `git clone git@github.com:jiyeongchloe/ReadEase.git`
3. Done!

## Dev / Commit Guidelines
To keep everything organized, let's use branches for adding new features instead of committing everything to `main` immediately.

**Creating a Branch**
- Option 1: On the main page of the repository, click on the dropdown branch menu near the top left corner. Enter a name for the new branch in the textbox and click `create ___ branch from dev`
- Option 2: In the terminal, `cd` to the root of the repository and run `git branch <name of new branch>`

**Best Practices**
- Run `git pull` before you do anything to make sure your local repo is up to date
- Use identifying names for branches, preferably in the form `COMPONENT/DESCRIPTION` so we can find it easily
    - ex) `text/fix-font-bug`

**Checking Current Branch**

Run `git branch --show-current` in terminal

**Switching Branches**

Run `git switch <name of branch you want to switch to>`

**Committing and Pushing Changes**

> [!IMPORTANT] 
> Make sure to commit changes in the appropriate branch

Run the following:
1. `git add .`
2. `git commit -m "description here"`
3. `git pull` !! important: run `git pull` after you commit
4. `git push`
    - may have to run `git push --set-upstream origin <branch name>`

## Testing / Running the Extension
1. Go to [chrome://extensions]
2. Toggle `Developer mode` near the top right corner of the page
3. Click on `Load unpacked` near the top left corner of the page
4. Select the directory that you have cloned the repo to
5. The extension should now be added

> [!WARNING] 
> Whenever you make changes to the files, make sure to click on the circle loading button to make sure changes are reflected in the web browser

