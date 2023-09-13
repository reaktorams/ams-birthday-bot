# Bun Birthday Reminder App

This Bun application is a birthday reminder that checks [a Google Sheets document](https://docs.google.com/spreadsheets/d/1adG43W9XnsAoTlPLgJ2Hi04xi9q4FhunddWeCDwz1W8/edit#gid=0) for birthdays and sends a Slack notification with a birthday message and a random GIF to the designated Slack channel.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/reaktorams/birthday-reminder-app.git
   ```

2. Install the dependencies:

   ```bash
   cd birthday-reminder-app
   bun i
   ```

3. Set up the environment variables:

   Rename the `.env.example` file to `.env` and update the following values:

   - `SPREADSHEET_ID`: The ID of the Google Sheets document containing the birthday data.
   - `GIPHY_API_KEY`: Your GIPHY API key.
   - `SLACK_CHANNEL_URL`: The webhook URL for your Slack channel.
   - `GOOGLE_CLIENT_OPTIONS`: The base64 encoded Google service account JSON data to authenticate with.

4. Start the application:

   ```bash
   bun run start
   ```

## Usage

The application runs as a Bun server. It also includes a scheduled cron job that executes every day at 08:00 (timezone: Europe/Amsterdam) to check the birthday list.

When the cron job runs, it fetches the data from the specified Google Sheets document and compares the current date with the birthdates in the sheet. If a match is found, it retrieves a random GIF related to birthdays and posts a birthday message to the Slack channel specified in the environment variables.

## Deployment on Fly.io

1. Install the Fly.io command-line tool (CLI) by following the instructions provided in the Fly.io documentation. (`brew install flyctl`)

2. Deploy the application:

   ```bash
   flyctl deploy
   ```

3. To update or add any environment variables:

   ```bash
   flyctl secrets set SPREADSHEET_ID=<spreadsheet-id>
   flyctl secrets set GIPHY_API_KEY=<giphy-api-key>
   flyctl secrets set SLACK_CHANNEL_URL=<slack-channel-url>
   flyctl secrets set GOOGLE_CLIENT_OPTIONS=<base64-encoded-google-auth-json>
   ```

   Replace <spreadsheet-id>, <giphy-api-key>, <slack-channel-url> and <base64-encoded-google-auth-json> with the appropriate values. These secrets correspond to the environment variables used in the application.
