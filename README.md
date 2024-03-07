# webhooks-gh

This is a simple script for launching a nodejs server to ingest events from github webhooks. Validates based on the sha1 hashes sent with webhook events. Requires a few env variables:

- `SECRET` - The secret provided when setting up a github webhook
- `PORT` - The port to listen on. By default, requests are over HTTP (port 80). 
- `POST_PATH` - Route for the given event. E.g. `/github-listener` or some such.
- `SCRIPT_PATH` - Target shell script to be executed once the request has been validated. 
