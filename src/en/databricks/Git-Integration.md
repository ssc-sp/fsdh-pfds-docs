# Git/GitHub Integration with Databricks

## Pre-requisites

- Familiarity with Git version control.
- Have access to a Git repository - the creation and access to a repository is outside the scope of this guide.

## Why use Git/GitHub

- Better version control than built-in change tracker.
- Manage code and notebooks outside Databricks.
- Collaboration across multiple workspaces.

## Workbook vs Repository

- Once you connect Git to Databricks, you can create and use notebooks like normal and also push them to GitHub.
- Workbook files in Git have a slightly different syntax than standard Jupyter Notebooks.

## Part 1: Setup Git/GitHub with Databricks

Navigate to your Settings from the top right drop down.

![image](./img/git-settings.png)

Select Linked Accounts in the left-hand sidebar.

![image](./img/git-linked-accounts.png)
Select your preferred Git provider and follow the prompts to link your account. Typically, you will need to provide your username and a token generated from your Git provider.

For GitHub, the access tokens can be created in Settings / Personal Access Token / Tokens (classic). On this page, click "Generate new token" then "Generate new token (classic)".
![image](./img/git-TokenScopes.png)

As a security best practice, we do recommend configuring an expiration date of less than a year. Tokens can easily be regenerated following expiration by following these steps.

The scopes required are `repo` and `workflow` (optional for GitHub Actions workflows)
![image](./img/git-tokens.png)

If the token and access permissions are correctly configured - you should see a green mark in the settings page
![image](./img/git-status.png)

## Part 2: Accessing and Modifying Repositories

To clone a repository, you will need its HTTPS access link, and its branch. In your workspace, click "Create" and then "Git folder" in the dropdown menu.
![image](./img/git-clone-repo.png)

Input the Git repository URL and then click Create Git folder.
![image](./img/git-menu.png)

Once this is configured, you can see the folder in your workspace and navigate into it.

Changes done from Databricks can be pushed to the repository using the built-in Git menu. Access it by right clicking in your repo files and clicking "Git...".
![image](./img/git-menu-2.png)

This screen will allow you to commit and push changes, as well as pull existing changes.
![image](./img/git-menu-3.png)

## Resolving Conflicts

If multiple commits impact the same code, there could be a conflict issue. The following message will appear while attempting to pull code:

![image](./img/git-MergeConflict.png)

Select "Resolve conflict using PR", which opens the following:

![image](./img/git-MergeConflict2.png)
This step will ask you to create a new branch where your changes will be committed. Enter a branch name and a commit message then commit the messages again. If successful, you'll see the following message. You can follow the link in that message to make your changes.

![image](./img/git-MergeConflict3.png)

<!-- ## Automating Git pulls

?? -->
