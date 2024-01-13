# GTrello
GTrello is a GMail add-on, which adds Trello integration.

Project was created to solve single problem: gather all tasks in single place.  
I'm heavy user of both Trello and Google tasks to schedule tasks,  
I was lacking a feature to have them under one roof.

Currently add-on displays Trello Cards from list the name user provided on 'Token' screen from every starred board user is member of.
This is actively developed and behavior will be customizable

I simply lost the grasp of many tasks I have on my GTasks and Trello boards, thus simple aggreagtion under one roof is a huge help for me.

## Installation
Application is not published publicly.  
In order to install, following setups must be made:
1. Install GTrello as GMail add-on
2. Enable Trello access
3. Authorize GTrello to Trello

### Install GTrello as GMail add-on
Mind that the setup is not idempotent, multiple runs will yield multiple projects.  
Add-on is installed as developer add-on
```
> git clone https://github.com/kiemlicz/gtrello.git
> npm install @google/clasp -g
> # run setup providing Timezone i.e. ./setup.sh Europe/Warsaw
> ./setup.sh Your/Timezone
> clasp push
```

To enable add-on, [follow official guide](https://developers.google.com/apps-script/add-ons/how-tos/testing-workspace-addons#install_an_unpublished)  
In short:  
1. Navigate to [AppScript](https://script.google.com/home) GTrello project
1. Deploy -> Test Deployments -> Install

Somewhere along the setup or publish you might be asked to enable AppScript API which must be done.
If not then navigate to [GCloud](https://console.cloud.google.com/), setup dedicated project and find `Apps Script API` -> `Enable`

### Enable Trello access
To enable Trello API access, create [new integration](https://trello.com/power-ups/admin), name it `GTrello`

### Authorize Trello
Once the add-on is installed:  
- `Authorize access`
- then provide API key from Trello (`GTrello` power-up, `API key` tab) and follow authorization dialog.
  Copy token, close the window and paste token to GTrello add-on.  
  Provide the Trello list name.  
  All cards from all user's boards from that particular list will be displayed.

### Developing
Simply after changes run
```
> clasp push
```

## Alternative solutions
Alternatively, tasks can be kept only under Trello with some help of `ifttt`-kind of services, however they come with limitations like: time delay, a bit tedious setup, paywall

# References
- [Clasp](https://developers.google.com/apps-script/guides/clasp) is a tool used to develop AppScript locally, otherwise web interface must be used.
- [Issue](https://issuetracker.google.com/issues/111312904) that made possible creating add-ons without requirement of selecting particular e-mails.
