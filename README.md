# Introduction

1. [ContentService.io](http://contentservice.io) adds CMS functionality to VueJS and Nuxt projects.

2. ContentService can be extended with custom _widgets_, allowing you to create reusable, application-specific widgets.

3. This project provides a template for creating **npm** packages of reusable custom widgets.

# What you get

When you use this template, you will get an npm package that can be used in VueJS and Nuxt projects:

- Example widget added to the toolbox on pages that use contentservice.io.

- Example Vuex store.

- Example code calling a remote service.

- Example code to read config files.

- Example Nuxt plugin.

- Build scripts.

- A local test harness.

- testing framework.



# Getting Started

Clone this project, and push it to your own repo, then play at will:

    git clone https://github.com/tooltwist/vue-whatever.git myProject
    cd myProject
    rm -rf .git; git add .; git commit -m 'Cloned from vue-whatever'
    git add remote origin <your repos URL>
    git push origin master
    
Update `package.json` with your project name, edit the code and commit to github, then publish at will:

    npm build-bundle
    npm patch-release

[See the wiki](https://github.com/tooltwist/vue-whatever/wiki) for a full description of how to use this template.
