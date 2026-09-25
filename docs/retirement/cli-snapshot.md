# CLI snapshot: `users-role-nx`

Captured 2026-09-25T00:29Z with read-only calls by `scripts/retirement-capture/app/cli-snapshot.sh`.
Redacted before writing: emails and UIDs other than the walkthrough account, tokens, API keys, the password-hash signer key, billing account IDs.

## Billing linkage

```console
$ gcloud billing projects describe users-role-nx
billingAccountName: billingAccounts/XXXXXX-XXXXXX-XX291D
billingEnabled: true
name: projects/users-role-nx/billingInfo
projectId: users-role-nx
```

## Enabled services

```console
$ gcloud services list --enabled --project users-role-nx --format='value(config.name)' | sort
appengine.googleapis.com
appenginereporting.googleapis.com
artifactregistry.googleapis.com
bigquery.googleapis.com
bigquerymigration.googleapis.com
bigquerystorage.googleapis.com
cloudapis.googleapis.com
cloudbilling.googleapis.com
cloudbuild.googleapis.com
cloudfunctions.googleapis.com
cloudresourcemanager.googleapis.com
cloudtrace.googleapis.com
containerregistry.googleapis.com
datastore.googleapis.com
deploymentmanager.googleapis.com
eventarc.googleapis.com
fcm.googleapis.com
fcmregistrations.googleapis.com
firebaseappdistribution.googleapis.com
firebasedynamiclinks.googleapis.com
firebaseextensions.googleapis.com
firebase.googleapis.com
firebasehosting.googleapis.com
firebaseinstallations.googleapis.com
firebaseremoteconfig.googleapis.com
<redacted-uid>.googleapis.com
firebaserules.googleapis.com
firestore.googleapis.com
identitytoolkit.googleapis.com
logging.googleapis.com
mobilecrashreporting.googleapis.com
monitoring.googleapis.com
pubsub.googleapis.com
run.googleapis.com
runtimeconfig.googleapis.com
securetoken.googleapis.com
servicemanagement.googleapis.com
serviceusage.googleapis.com
source.googleapis.com
sql-component.googleapis.com
storage-api.googleapis.com
storage-component.googleapis.com
storage.googleapis.com
testing.googleapis.com
```

## Cloud Functions: api

```console
$ gcloud functions describe api --region us-central1 --project users-role-nx --format=yaml
buildConfig:
  build: projects/267012633634/locations/us-central1/builds/4b19cfd1-adc0-4f70-b4cb-9a63894be533
  dockerRegistry: ARTIFACT_REGISTRY
  dockerRepository: projects/users-role-nx/locations/us-central1/repositories/gcf-artifacts
  entryPoint: api
  environmentVariables:
    GOOGLE_NODE_RUN_SCRIPTS: ''
  runtime: nodejs22
  source:
    storageSource:
      bucket: gcf-v2-sources-267012633634-us-central1
      generation: '1790132090187982'
      object: api/function-source.zip
  sourceProvenance:
    resolvedStorageSource:
      bucket: gcf-v2-sources-267012633634-us-central1
      generation: '1790132090187982'
      object: api/function-source.zip
createTime: '2023-11-11T04:41:55.748851529Z'
environment: GEN_2
labels:
  deployment-tool: cli-firebase
  firebase-functions-codebase: usersrole-nx-functions
  firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
name: projects/users-role-nx/locations/us-central1/functions/api
satisfiesPzi: true
serviceConfig:
  allTrafficOnLatestRevision: true
  availableCpu: '1'
  availableMemory: 256Mi
  environmentVariables:
    EVENTARC_CLOUD_EVENT_SOURCE: projects/users-role-nx/locations/us-central1/services/api
    FIREBASE_CONFIG: '{"projectId":"users-role-nx","storageBucket":"users-role-nx.firebasestorage.app","locationId":"us-central"}'
    FIRESTORE_PREFER_REST: 'true'
    FUNCTION_REGION: us-central1
    FUNCTION_TARGET: api
    GCLOUD_PROJECT: users-role-nx
    LOG_EXECUTION_ID: 'true'
  ingressSettings: ALLOW_ALL
  maxInstanceCount: 20
  maxInstanceRequestConcurrency: 80
  revision: api-00021-zaf
  service: projects/users-role-nx/locations/us-central1/services/api
  serviceAccountEmail: <redacted-email>
  timeoutSeconds: 60
  uri: https://api-zm7bvbr4yq-uc.a.run.app
state: ACTIVE
updateTime: '2026-09-23T02:56:33.265304984Z'
url: https://us-central1-users-role-nx.cloudfunctions.net/api
```

## Cloud Functions: beforecreated

```console
$ gcloud functions describe beforecreated --region us-central1 --project users-role-nx --format=yaml
buildConfig:
  build: projects/267012633634/locations/us-central1/builds/4b19cfd1-adc0-4f70-b4cb-9a63894be533
  dockerRegistry: ARTIFACT_REGISTRY
  dockerRepository: projects/users-role-nx/locations/us-central1/repositories/gcf-artifacts
  entryPoint: beforecreated
  environmentVariables:
    GOOGLE_NODE_RUN_SCRIPTS: ''
  runtime: nodejs22
  source:
    storageSource:
      bucket: gcf-v2-sources-267012633634-us-central1
      generation: '1790132169353893'
      object: beforecreated/function-source.zip
  sourceProvenance:
    resolvedStorageSource:
      bucket: gcf-v2-sources-267012633634-us-central1
      generation: '1790132169353893'
      object: beforecreated/function-source.zip
createTime: '2023-11-11T04:42:43.062973137Z'
environment: GEN_2
labels:
  deployment-blocking: before-create
  deployment-tool: cli-firebase
  firebase-functions-codebase: usersrole-nx-functions
  firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
name: projects/users-role-nx/locations/us-central1/functions/beforecreated
satisfiesPzi: true
serviceConfig:
  allTrafficOnLatestRevision: true
  availableCpu: '1'
  availableMemory: 256Mi
  environmentVariables:
    EVENTARC_CLOUD_EVENT_SOURCE: projects/users-role-nx/locations/us-central1/services/beforecreated
    FIREBASE_CONFIG: '{"projectId":"users-role-nx","storageBucket":"users-role-nx.firebasestorage.app","locationId":"us-central"}'
    FIRESTORE_PREFER_REST: 'true'
    FUNCTION_REGION: us-central1
    FUNCTION_SIGNATURE_TYPE: http
    FUNCTION_TARGET: beforecreated
    GCLOUD_PROJECT: users-role-nx
    LOG_EXECUTION_ID: 'true'
  ingressSettings: ALLOW_ALL
  maxInstanceCount: 20
  maxInstanceRequestConcurrency: 80
  revision: beforecreated-00018-coy
  service: projects/users-role-nx/locations/us-central1/services/beforecreated
  serviceAccountEmail: <redacted-email>
  timeoutSeconds: 60
  uri: https://beforecreated-zm7bvbr4yq-uc.a.run.app
state: ACTIVE
updateTime: '2026-09-23T02:56:28.471852565Z'
url: https://us-central1-users-role-nx.cloudfunctions.net/beforecreated
```

## Cloud Run services

```console
$ gcloud run services list --project users-role-nx --format='table(metadata.name,status.url,status.latestReadyRevisionName)'
NAME           URL                                            LATEST_READY_REVISION_NAME
api            https://api-zm7bvbr4yq-uc.a.run.app            api-00021-zaf
beforecreated  https://beforecreated-zm7bvbr4yq-uc.a.run.app  beforecreated-00018-coy
```

## Cloud Run: api

```console
$ gcloud run services describe api --region us-central1 --project users-role-nx --format=yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    cloudfunctions.googleapis.com/function-id: api
    run.googleapis.com/build-base-image: us-central1-docker.pkg.dev/serverless-runtimes/google-22-full/runtimes/nodejs22
    run.googleapis.com/build-enable-automatic-updates: 'false'
    run.googleapis.com/build-environment-variables: '{"GOOGLE_NODE_RUN_SCRIPTS":""}'
    run.googleapis.com/build-function-target: api
    run.googleapis.com/build-image-uri: us-central1-docker.pkg.dev/users-role-nx/gcf-artifacts/users--role--nx__us--central1__api:version_1
    run.googleapis.com/build-name: projects/267012633634/locations/us-central1/builds/4b19cfd1-adc0-4f70-b4cb-9a63894be533
    run.googleapis.com/build-source-location: gs://gcf-v2-sources-267012633634-us-central1/api/function-source.zip#1790132090187982
    run.googleapis.com/client-name: cli-firebase
    run.googleapis.com/custom-audiences: '["https://us-central1-users-role-nx.cloudfunctions.net/api"]'
    run.googleapis.com/ingress: all
    run.googleapis.com/ingress-status: all
    run.googleapis.com/operation-id: 14481fd7-1921-4f2e-8e9f-51567e492169
    run.googleapis.com/urls: '["https://api-267012633634.us-central1.run.app","https://us-central1-users-role-nx.cloudfunctions.net/api","https://api-zm7bvbr4yq-uc.a.run.app"]'
    serving.knative.dev/creator: <redacted-email>
    serving.knative.dev/lastModifier: <redacted-email>
  creationTimestamp: '2023-11-11T04:42:40.953041Z'
  generation: 21
  labels:
    cloud.googleapis.com/location: us-central1
    firebase-functions-codebase: usersrole-nx-functions
    firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
    goog-cloudfunctions-runtime: nodejs22
    goog-managed-by: cloudfunctions
  name: api
  namespace: '267012633634'
  resourceVersion: AAZcHaFeELI
  selfLink: /apis/serving.knative.dev/v1/namespaces/267012633634/services/api
  uid: 9dc35d40-6180-4bd3-8013-a330abbcf984
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '20'
        cloudfunctions.googleapis.com/trigger-type: HTTP_TRIGGER
        run.googleapis.com/client-name: cli-firebase
        run.googleapis.com/startup-cpu-boost: 'true'
      labels:
        firebase-functions-codebase: usersrole-nx-functions
        firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
        run.googleapis.com/startupProbeType: Default
      name: api-00021-zaf
    spec:
      containerConcurrency: 80
      containers:
      - env:
        - name: FIREBASE_CONFIG
          value: '{"projectId":"users-role-nx","storageBucket":"users-role-nx.firebasestorage.app","locationId":"us-central"}'
        - name: GCLOUD_PROJECT
          value: users-role-nx
        - name: FIRESTORE_PREFER_REST
          value: 'true'
        - name: EVENTARC_CLOUD_EVENT_SOURCE
          value: projects/users-role-nx/locations/us-central1/services/api
        - name: FUNCTION_TARGET
          value: api
        - name: LOG_EXECUTION_ID
          value: 'true'
        - name: FUNCTION_REGION
          value: us-central1
        image: us-central1-docker.pkg.dev/users-role-nx/gcf-artifacts/users--role--nx__us--central1__api:version_1
        name: worker
        ports:
        - containerPort: 8080
          name: http1
        resources:
          limits:
            cpu: '1'
            memory: 256Mi
        startupProbe:
          failureThreshold: 1
          periodSeconds: 240
          tcpSocket:
            port: 8080
          timeoutSeconds: 240
      serviceAccountName: <redacted-email>
      timeoutSeconds: 60
  traffic:
  - latestRevision: true
    percent: 100
status:
  address:
    url: https://api-zm7bvbr4yq-uc.a.run.app
  conditions:
  - lastTransitionTime: '2026-09-23T02:56:31.367346Z'
    status: 'True'
    type: Ready
  - lastTransitionTime: '2026-09-23T02:56:24.191836Z'
    status: 'True'
    type: ConfigurationsReady
  - lastTransitionTime: '2026-09-23T02:56:31.312049Z'
    status: 'True'
    type: RoutesReady
  latestCreatedRevisionName: api-00021-zaf
  latestReadyRevisionName: api-00021-zaf
  observedGeneration: 21
  traffic:
  - latestRevision: true
    percent: 100
    revisionName: api-00021-zaf
  url: https://api-zm7bvbr4yq-uc.a.run.app
```

## Cloud Run: beforecreated

```console
$ gcloud run services describe beforecreated --region us-central1 --project users-role-nx --format=yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    cloudfunctions.googleapis.com/function-id: beforecreated
    run.googleapis.com/build-base-image: us-central1-docker.pkg.dev/serverless-runtimes/google-22-full/runtimes/nodejs22
    run.googleapis.com/build-enable-automatic-updates: 'false'
    run.googleapis.com/build-environment-variables: '{"GOOGLE_NODE_RUN_SCRIPTS":""}'
    run.googleapis.com/build-function-target: beforecreated
    run.googleapis.com/build-image-uri: us-central1-docker.pkg.dev/users-role-nx/gcf-artifacts/users--role--nx__us--central1__api:version_1
    run.googleapis.com/build-name: projects/267012633634/locations/us-central1/builds/4b19cfd1-adc0-4f70-b4cb-9a63894be533
    run.googleapis.com/build-source-location: gs://gcf-v2-sources-267012633634-us-central1/beforecreated/function-source.zip#1790132169353893
    run.googleapis.com/client-name: cli-firebase
    run.googleapis.com/custom-audiences: '["https://us-central1-users-role-nx.cloudfunctions.net/beforecreated"]'
    run.googleapis.com/ingress: all
    run.googleapis.com/ingress-status: all
    run.googleapis.com/operation-id: 20e96390-6b0a-4ef6-9942-2de5780fa3d6
    run.googleapis.com/urls: '["https://beforecreated-267012633634.us-central1.run.app","https://us-central1-users-role-nx.cloudfunctions.net/beforecreated","https://beforecreated-zm7bvbr4yq-uc.a.run.app"]'
    serving.knative.dev/creator: <redacted-email>
    serving.knative.dev/lastModifier: <redacted-email>
  creationTimestamp: '2023-11-11T04:42:43.655906Z'
  generation: 18
  labels:
    cloud.googleapis.com/location: us-central1
    deployment-blocking: before-create
    firebase-functions-codebase: usersrole-nx-functions
    firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
    goog-cloudfunctions-runtime: nodejs22
    goog-managed-by: cloudfunctions
  name: beforecreated
  namespace: '267012633634'
  resourceVersion: AAZcHaEuc50
  selfLink: /apis/serving.knative.dev/v1/namespaces/267012633634/services/beforecreated
  uid: 090ebdb6-5e9c-4281-8221-b1c78a254a37
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '20'
        cloudfunctions.googleapis.com/trigger-type: HTTP_TRIGGER
        run.googleapis.com/client-name: cli-firebase
        run.googleapis.com/startup-cpu-boost: 'true'
      labels:
        deployment-blocking: before-create
        firebase-functions-codebase: usersrole-nx-functions
        firebase-functions-hash: 991dfe184566426b2ba66210f995b98a01e44e6f
        run.googleapis.com/startupProbeType: Default
      name: beforecreated-00018-coy
    spec:
      containerConcurrency: 80
      containers:
      - env:
        - name: FIREBASE_CONFIG
          value: '{"projectId":"users-role-nx","storageBucket":"users-role-nx.firebasestorage.app","locationId":"us-central"}'
        - name: GCLOUD_PROJECT
          value: users-role-nx
        - name: FIRESTORE_PREFER_REST
          value: 'true'
        - name: EVENTARC_CLOUD_EVENT_SOURCE
          value: projects/users-role-nx/locations/us-central1/services/beforecreated
        - name: FUNCTION_TARGET
          value: beforecreated
        - name: FUNCTION_SIGNATURE_TYPE
          value: http
        - name: LOG_EXECUTION_ID
          value: 'true'
        - name: FUNCTION_REGION
          value: us-central1
        image: us-central1-docker.pkg.dev/users-role-nx/gcf-artifacts/users--role--nx__us--central1__api:version_1
        name: worker
        ports:
        - containerPort: 8080
          name: http1
        resources:
          limits:
            cpu: '1'
            memory: 256Mi
        startupProbe:
          failureThreshold: 1
          periodSeconds: 240
          tcpSocket:
            port: 8080
          timeoutSeconds: 240
      serviceAccountName: <redacted-email>
      timeoutSeconds: 60
  traffic:
  - latestRevision: true
    percent: 100
status:
  address:
    url: https://beforecreated-zm7bvbr4yq-uc.a.run.app
  conditions:
  - lastTransitionTime: '2026-09-23T02:56:28.246941Z'
    status: 'True'
    type: Ready
  - lastTransitionTime: '2026-09-23T02:56:23.062551Z'
    status: 'True'
    type: ConfigurationsReady
  - lastTransitionTime: '2026-09-23T02:56:28.190970Z'
    status: 'True'
    type: RoutesReady
  latestCreatedRevisionName: beforecreated-00018-coy
  latestReadyRevisionName: beforecreated-00018-coy
  observedGeneration: 18
  traffic:
  - latestRevision: true
    percent: 100
    revisionName: beforecreated-00018-coy
  url: https://beforecreated-zm7bvbr4yq-uc.a.run.app
```

## Identity Toolkit config

```console
$ api https://identitytoolkit.googleapis.com/admin/v2/projects/users-role-nx/config | strip_secrets
{
  "name": "projects/267012633634/config",
  "signIn": {
    "email": {
      "enabled": true,
      "passwordRequired": true
    }
  },
  "notification": {
    "sendEmail": {
      "method": "DEFAULT",
      "resetPasswordTemplate": {
        "senderLocalPart": "noreply",
        "subject": "Reset your password for %APP_NAME%",
        "body": "<p>Hello,</p>\n<p>Follow this link to reset your %APP_NAME% password for your %EMAIL% account.</p>\n<p><a href='%LINK%'>%LINK%</a></p>\n<p>If you didn’t ask to reset your password, you can ignore this email.</p>\n<p>Thanks,</p>\n<p>Your %APP_NAME% team</p>",
        "bodyFormat": "HTML",
        "replyTo": "noreply"
      },
      "verifyEmailTemplate": {
        "senderLocalPart": "noreply",
        "subject": "Verify your email for %APP_NAME%",
        "body": "<p>Hello %DISPLAY_NAME%,</p>\n<p>Follow this link to verify your email address.</p>\n<p><a href='%LINK%'>%LINK%</a></p>\n<p>If you didn’t ask to verify this address, you can ignore this email.</p>\n<p>Thanks,</p>\n<p>Your %APP_NAME% team</p>",
        "bodyFormat": "HTML",
        "replyTo": "noreply"
      },
      "changeEmailTemplate": {
        "senderLocalPart": "noreply",
        "subject": "Your sign-in email was changed for %APP_NAME%",
        "body": "<p>Hello %DISPLAY_NAME%,</p>\n<p>Your sign-in email for %APP_NAME% was changed to %NEW_EMAIL%.</p>\n<p>If you didn’t ask to change your email, follow this link to reset your sign-in email.</p>\n<p><a href='%LINK%'>%LINK%</a></p>\n<p>Thanks,</p>\n<p>Your %APP_NAME% team</p>",
        "bodyFormat": "HTML",
        "replyTo": "noreply"
      },
      "callbackUri": "https://users-role-nx.firebaseapp.com/__/auth/action",
      "dnsInfo": {
        "customDomainState": "NOT_STARTED",
        "domainVerificationRequestTime": "1970-01-01T00:00:00Z"
      },
      "revertSecondFactorAdditionTemplate": {
        "senderLocalPart": "noreply",
        "subject": "You've added 2 step verification to your %APP_NAME% account.",
        "body": "<p>Hello %DISPLAY_NAME%,</p>\n<p>Your account in %APP_NAME% has been updated with %SECOND_FACTOR% for 2-step verification.</p>\n<p>If you didn't add this 2-step verification, click the link below to remove it.</p>\n<p><a href='%LINK%'>%LINK%</a></p>\n<p>Thanks,</p>\n<p>Your %APP_NAME% team</p>",
        "bodyFormat": "HTML",
        "replyTo": "noreply"
      }
    },
    "sendSms": {
      "smsTemplate": {
        "content": "%LOGIN_CODE% is your verification code for %APP_NAME%."
      }
    },
    "defaultLocale": "en"
  },
  "quota": {},
  "monitoring": {
    "requestLogging": {}
  },
  "multiTenant": {},
  "authorizedDomains": [
    "localhost",
    "users-role-nx.firebaseapp.com",
    "users-role-nx.web.app"
  ],
  "subtype": "IDENTITY_PLATFORM",
  "client": {
    "apiKey": "<redacted>",
    "permissions": {},
    "firebaseSubdomain": "users-role-nx"
  },
  "mfa": {
    "state": "DISABLED"
  },
  "blockingFunctions": {
    "triggers": {
      "beforeCreate": {
        "functionUri": "https://beforecreated-zm7bvbr4yq-uc.a.run.app",
        "updateTime": "2023-11-15T01:10:27.577Z"
      }
    },
    "forwardInboundCredentials": {}
  },
  "smsRegionConfig": {},
  "emailPrivacyConfig": {},
  "defaultHostingSite": "users-role-nx"
}
```

## Identity Toolkit: built-in IdPs (Google, GitHub, Twitter, ...)

```console
$ api https://identitytoolkit.googleapis.com/admin/v2/projects/users-role-nx/defaultSupportedIdpConfigs | strip_secrets
{
  "defaultSupportedIdpConfigs": [
    {
      "name": "projects/267012633634/defaultSupportedIdpConfigs/github.com",
      "enabled": true,
      "clientId": "f681c882c5aadd9b57a9"
    },
    {
      "name": "projects/267012633634/defaultSupportedIdpConfigs/google.com",
      "enabled": true,
      "clientId": "267012633634-n7tt8ottsa0gco9kis3t2sjjh12ai8fc.apps.googleusercontent.com"
    }
  ]
}
```

## Identity Toolkit: OAuth/OIDC IdPs

```console
$ api https://identitytoolkit.googleapis.com/admin/v2/projects/users-role-nx/oauthIdpConfigs | strip_secrets
{}
```

## Auth user count (count only, no user records)

```console
$ api -X POST -d '{"returnUserInfo": false}' https://identitytoolkit.googleapis.com/v1/projects/users-role-nx/accounts:query | jq '{recordsCount}'
{
  "recordsCount": "28"
}
```

## App Check enforcement

```console
$ api https://firebaseappcheck.googleapis.com/v1/projects/users-role-nx/services | jq .
{
  "error": {
    "code": 403,
    "message": "Firebase App Check API has not been used in project users-role-nx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/firebaseappcheck.googleapis.com/overview?project=users-role-nx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "SERVICE_DISABLED",
        "domain": "googleapis.com",
        "metadata": {
          "activationUrl": "https://console.developers.google.com/apis/api/firebaseappcheck.googleapis.com/overview?project=users-role-nx",
          "service": "firebaseappcheck.googleapis.com",
          "consumer": "projects/users-role-nx",
          "serviceTitle": "Firebase App Check API",
          "containerInfo": "users-role-nx"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.LocalizedMessage",
        "locale": "en-US",
        "message": "Firebase App Check API has not been used in project users-role-nx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/firebaseappcheck.googleapis.com/overview?project=users-role-nx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry."
      },
      {
        "@type": "type.googleapis.com/google.rpc.Help",
        "links": [
          {
            "description": "Google developers console API activation",
            "url": "https://console.developers.google.com/apis/api/firebaseappcheck.googleapis.com/overview?project=users-role-nx"
          }
        ]
      }
    ]
  }
}
```

## Hosting sites, channels, releases

```console
$ hosting_summary
# projects/users-role-nx/sites/users-role-nx
{
  "defaultUrl": "https://users-role-nx.web.app",
  "type": "DEFAULT_SITE",
  "appId": "1:267012633634:web:b1a938b1ab87883bd4c67b"
}
# channels
live	https://users-role-nx.web.app	never	FINALIZED	2026-09-22T17:37:33.455Z
# last 10 releases
2026-09-22T17:37:33.455Z	DEPLOY	0e7cc1735bb2dfa1	FINALIZED	37
2026-09-22T17:04:53.418Z	DEPLOY	2491590dff77d526	FINALIZED	37
2026-09-22T06:47:57.880Z	DEPLOY	e606125dfa762449	FINALIZED	37
2026-09-22T06:40:01.929Z	DEPLOY	146b6bcdc5df3efc	FINALIZED	37
2026-09-22T06:28:43.625Z	DEPLOY	1e181fe8577e419c	FINALIZED	37
2026-09-22T06:03:21.184Z	DEPLOY	c1eaec0b4a55125e	FINALIZED	37
2026-09-22T05:48:51.041Z	DEPLOY	c33abb1de8741d85	FINALIZED	37
2026-09-22T05:45:53.428Z	DEPLOY	5ccd64c62327fb76	FINALIZED	37
2026-09-22T05:16:45.322Z	DEPLOY	6fea93355e9fe90c	FINALIZED	37
2026-09-22T05:11:57.054Z	DEPLOY	582d914f7c5b1aab	FINALIZED	37
```

## Security rules releases and sources (Storage, Firestore)

```console
$ rules_summary
projects/users-role-nx/releases/cloud.firestore	projects/users-role-nx/rulesets/7eae9596-3bb3-45b4-8bf9-107d55ab57d6	2023-11-16T06:03:25.484206Z
# projects/users-role-nx/rulesets/7eae9596-3bb3-45b4-8bf9-107d55ab57d6
--- firestore.rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{user} {
    	allow create: if request.auth.uid != null;
      allow read, write, update, delete: if request.auth.uid == user || isAdminOrManager();
    }

    function isAdminOrManager() {
    	return request.auth.token.roles.hasAny(["manager", "admin"]);
    }
  }
}
```

## Firestore databases

```console
$ gcloud firestore databases list --project users-role-nx --format=yaml
---
appEngineIntegrationMode: DISABLED
concurrencyMode: PESSIMISTIC
createTime: '2023-11-06T03:53:37.835048Z'
databaseEdition: STANDARD
deleteProtectionState: DELETE_PROTECTION_DISABLED
earliestVersionTime: '2026-09-24T23:30:01.331045Z'
enhancedTextSearchQueryMode: ENHANCED_QUERY_MODE_ENABLED
etag: INDP8Ii9iJcDMMeakI2/0JYD
freeTier: true
keyPrefix: s
locationId: nam5
name: projects/users-role-nx/databases/(default)
pointInTimeRecoveryEnablement: POINT_IN_TIME_RECOVERY_DISABLED
realtimeUpdatesMode: REALTIME_UPDATES_MODE_ENABLED
type: FIRESTORE_NATIVE
uid: 64a8ec04-06a0-4701-b385-6a3b6e165c2f
updateTime: '2023-11-06T03:53:37.835048Z'
versionRetentionPeriod: 3600s
```

## Realtime Database instances

```console
$ api https://firebasedatabase.googleapis.com/v1beta/projects/users-role-nx/locations/-/instances | jq .
{
  "error": {
    "code": 403,
    "message": "Firebase Realtime Database Management API has not been used in project users-role-nx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/firebasedatabase.googleapis.com/overview?project=users-role-nx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "SERVICE_DISABLED",
        "domain": "googleapis.com",
        "metadata": {
          "containerInfo": "users-role-nx",
          "service": "firebasedatabase.googleapis.com",
          "consumer": "projects/users-role-nx",
          "activationUrl": "https://console.developers.google.com/apis/api/firebasedatabase.googleapis.com/overview?project=users-role-nx",
          "serviceTitle": "Firebase Realtime Database Management API"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.LocalizedMessage",
        "locale": "en-US",
        "message": "Firebase Realtime Database Management API has not been used in project users-role-nx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/firebasedatabase.googleapis.com/overview?project=users-role-nx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry."
      },
      {
        "@type": "type.googleapis.com/google.rpc.Help",
        "links": [
          {
            "description": "Google developers console API activation",
            "url": "https://console.developers.google.com/apis/api/firebasedatabase.googleapis.com/overview?project=users-role-nx"
          }
        ]
      }
    ]
  }
}
```

## Cloud Storage buckets

```console
$ gcloud storage buckets list --project users-role-nx --format='table(name,location,storage_class,creation_time)'
NAME                                                                LOCATION     STORAGE_CLASS  CREATION_TIME
gcf-v2-sources-267012633634-us-central1                             US-CENTRAL1                 2023-11-09T05:16:21+0000
gcf-v2-uploads-267012633634-us-central1                             US-CENTRAL1                 2023-11-09T05:16:20+0000
gcf-v2-uploads-267012633634.us-central1.cloudfunctions.appspot.com  US-CENTRAL1                 2026-07-04T23:48:52+0000
staging.users-role-nx.appspot.com                                   US                          2023-11-11T03:11:21+0000
users-role-nx.appspot.com                                           US                          2023-11-11T03:11:21+0000
```

## Artifact Registry repositories and sizes

```console
$ gcloud artifacts repositories list --project users-role-nx --format='table(name.basename(),format,location,sizeBytes.size(units_out=M):label=SIZE_MB,updateTime)'
Listing items under project users-role-nx, across all locations.

REPOSITORY     FORMAT  LOCATION  SIZE_MB  UPDATE_TIME
gcf-artifacts  DOCKER            0        2026-09-24T04:10:16
```

## IAM service accounts (key IDs only, never key material)

```console
$ service_accounts
EMAIL                                                          DISPLAY NAME                              DISABLED
<redacted-email>                      App Engine default service account        False
<redacted-email>  GitHub Actions (jdwillmsen/usersrole-nx)  False
<redacted-email>             Default compute service account           False
<redacted-email>  firebase-adminsdk                         False
# keys for <redacted-email> (IDs and validity only)
KEY_ID                                    KEY_TYPE        CREATED_AT            EXPIRES_AT            DISABLED
7ce9edb36e0fd25f3a9488c7a39d8592d6fd6a8f  SYSTEM_MANAGED  2025-08-28T06:16:04Z  2027-09-10T18:33:30Z
# keys for <redacted-email> (IDs and validity only)
KEY_ID                                    KEY_TYPE        CREATED_AT            EXPIRES_AT            DISABLED
818eda8a0025af186972ad90573f384cd852114f  USER_MANAGED    2023-11-06T06:17:37Z  9999-12-31T23:59:59Z
677b1f17e32265d27cb1aaa65cdc3d460f3ee186  USER_MANAGED    2023-11-16T03:19:54Z  9999-12-31T23:59:59Z
7991a60a32e880faeac2655cf6ed48104780083c  SYSTEM_MANAGED  2025-08-06T23:42:38Z  2027-08-31T17:33:18Z
# keys for <redacted-email> (IDs and validity only)
KEY_ID                                    KEY_TYPE        CREATED_AT            EXPIRES_AT            DISABLED
46de79f5a75e0739c6c9ff412243f3f1c2f13018  SYSTEM_MANAGED  2025-09-09T04:05:12Z  2027-09-22T08:20:17Z
# keys for <redacted-email> (IDs and validity only)
KEY_ID                                    KEY_TYPE        CREATED_AT            EXPIRES_AT            DISABLED
e86d212d4d03f4f39c28fb463919f49edad0629d  SYSTEM_MANAGED  2025-08-13T10:59:55Z  2027-09-10T00:08:15Z
```
