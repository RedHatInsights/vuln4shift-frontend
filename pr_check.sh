#!/bin/bash

# --------------------------------------------
# Export vars for helper scripts to use
# --------------------------------------------
# name of app-sre "application" folder this component lives in; needs to match for quay
export COMPONENT="ocp-vulnerability"
# IMAGE should match the quay repo set by app.yaml in app-interface
export IMAGE="quay.io/cloudservices/vuln4shift-frontend"
export WORKSPACE=${WORKSPACE:-$APP_ROOT} # if running in jenkins, use the build's workspace
export APP_ROOT=$(pwd)
export NODE_BUILD_VERSION=22
COMMON_BUILDER=https://raw.githubusercontent.com/RedHatInsights/insights-frontend-builder-common/master

set -exv
# source is preferred to | bash -s in this case to avoid a subshell
source <(curl -sSL $COMMON_BUILDER/src/frontend-build.sh)

# Install bonfire repo/initialize
CICD_URL=https://raw.githubusercontent.com/RedHatInsights/bonfire/master/cicd
# shellcheck source=/dev/null
curl -s $CICD_URL/bootstrap.sh > .cicd_bootstrap.sh && source .cicd_bootstrap.sh

export DEPLOY_FRONTENDS="true"
export IQE_ENV="ephemeral"
export IQE_SELENIUM="true"
export IQE_CJI_TIMEOUT="30m"
export REF_ENV="insights-stage"
export COMPONENTS_W_RESOURCES="vuln4shift-backend"
export COMPONENT_NAME="vuln4shift-frontend"

IQE_PLUGINS="ocp-vulnerability"
IQE_MARKER_EXPRESSION="smoke_ui"
IQE_FILTER_EXPRESSION=""
IQE_IMAGE_TAG="ocp-vulnerability"

# Run smoke tests
# shellcheck source=/dev/null
source "${CICD_ROOT}/deploy_ephemeral_env.sh"
# shellcheck source=/dev/null
export COMPONENT_NAME="vuln4shift-backend"
source "${CICD_ROOT}/cji_smoke_test.sh"
# shellcheck source=/dev/null
source "${CICD_ROOT}/post_test_results.sh"