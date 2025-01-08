# express-v5-sentry

- Node.js v22
- ESM
- Express v5
- Sentry JavaScript SDK v8

Run the app:

```shell
$ nvm use
$ npm install
$ node --import ./instrument.js .
[Sentry] express is not instrumented. This is likely because you required/imported express before calling `Sentry.init()`.
👂
```

Now, if you comment out lines related to `@sentry/profiling-node`:

```diff
diff --git a/instrument.js b/instrument.js
index 1c666d1..c35299c 100644
--- a/instrument.js
+++ b/instrument.js
@@ -1,13 +1,13 @@
 import * as Sentry from "@sentry/node";
-import { nodeProfilingIntegration } from '@sentry/profiling-node';
+// import { nodeProfilingIntegration } from '@sentry/profiling-node';

 // Ensure to call this before importing any other modules!
 Sentry.init({
   dsn: "https://public@sentry.example.com/1",
-  integrations: [
-    // Add our Profiling integration
-    nodeProfilingIntegration(),
-  ],
+  // integrations: [
+  //   // Add our Profiling integration
+  //   nodeProfilingIntegration(),
+  // ],

   // Add Tracing by setting tracesSampleRate
   // We recommend adjusting this value in production
```

and try running the app again, you'll get a different warning:

```shell
$ node --import ./instrument.js .
[Sentry] express is not instrumented. Please make sure to initialize Sentry in a separate file that you `--import` when running node, see: https://docs.sentry.io/platforms/javascript/guides/express/install/esm/.
👂
```

Finally, if you also comment out `tracesSampleRate`:

```diff
diff --git a/instrument.js b/instrument.js
index c35299c..e774a90 100644
--- a/instrument.js
+++ b/instrument.js
@@ -11,7 +11,7 @@ Sentry.init({

   // Add Tracing by setting tracesSampleRate
   // We recommend adjusting this value in production
-  tracesSampleRate: 1.0,
+  // tracesSampleRate: 1.0,

   // Set sampling rate for profiling
   // This is relative to tracesSampleRate

```

and try running the app once more, you'll get no warning:

```shell
$ node --import ./instrument.js .
👂
```
