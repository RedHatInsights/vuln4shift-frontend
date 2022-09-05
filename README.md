![travis](https://app.travis-ci.com/RedHatInsights/vuln4shift-frontend.svg?branch=master)

# Vulnerability for OpenShift frontend
Red Hat Vulnerability for OpenShift service is used to assess and monitor the status of security vulnerabilities on OpenShift clusters, understand the level of exposure of infrastructure, and plan a course of action. This is the front-end repository for this service.

## First time setup
1. Make sure you have [`Node.js`](https://nodejs.org/en/) version >= 16 installed
2. Run [script to patch your `/etc/hosts`](https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh)
3. Make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac)

## Running locally
1. Install dependencies with `npm install`
2. Run development server with `npm run start:proxy:beta`
3. Local version of the app will be available at https://stage.foo.redhat.com:1337/beta/openshift/insights/vulnerability/

## Testing
[Jest](https://jestjs.io/) and [Cypress](https://cypress.io/) are used as the testing frameworks
- ```npm run test:ct``` - run all Cypress tests
- ```npx cypress open --component``` - open Cypress in the component testing mode.
- ```npm run test``` - run all Jest tests
- ```npm run test -- testName``` - run tests for all components matching `testName`
- ```npm run lint``` - run linter
- ```npm run test -- -u``` - run all tests and update snapshots
- ```npm run test -- --watch``` - run tests in watch mode

## Code Coverage
1. Make sure ```npm run test``` and ```npm run test:ct``` are ran before the coverage
2. Run ```npm run coverage```

## Deploying
Any push to the following branches will trigger a build in [vuln4shift-frontend-build repository](https://github.com/RedHatInsights/vuln4shift-frontend-build) which will deploy to corresponding environment. Travis is used to deploy the application.

| Push to branch in this repo  | Updated branch in build repo  | Environment       | Available at
| :--------------------------- | :---------------------------- | :---------------- | :-----------
| master                       | stage-beta                    | stage beta        | https://console.stage.redhat.com/beta
| stage-stable                 | stage-stable                  | stage stable      | https://console.stage.redhat.com
| prod-beta                    | prod-beta                     | production beta   | https://console.redhat.com/beta 
| prod-stable                  | prod-stable                   | production stable | https://console.redhat.com

## Design System
This project uses [Patternfly React](https://github.com/patternfly/patternfly-react).

## Insights Components
This app imports components from [Insights Front-end Components library](https://github.com/RedHatInsights/frontend-components). ESI tags are used to import [Insights Chrome](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer. These libraries are described in the [Platform experience documentation](http://front-end-docs-insights.apps.ocp4.prod.psi.redhat.com/).
