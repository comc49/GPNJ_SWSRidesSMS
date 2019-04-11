
# Set up
## Run
npm install

or

yarn


## Config
You need to create a config.json file in the root directory with this JSON structure

{
    "TWILIO_AUTH_TOKEN": "",
    "TWILIO_ACCOUNT_SID": "",
    "TWILIO_PHONE_NUMBER": ""
}

## Deploy
you must have GCloud CDK installed
run `gcloud functions deploy reply --trigger-http`


