# ConnectWM: Connect With Me

ConnectWM is a React-based web application designed to help you connect with others.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.19.0 recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/connectwm.git
   cd connectwm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:
```bash
npm run build
```
The production-ready files will be in the `build/` directory.

### Running Tests

To run the test suite:
```bash
npm test
```

## Deployment

This project is configured for automated deployment to Netlify via GitHub Actions.

### Automated Deployment

Deployments are triggered automatically when a new tag matching the pattern `v*` (e.g., `v1.0.0`) is pushed to the repository.

To deploy a new version:

1. Create a new tag:
   ```bash
   git tag v1.0.0
   ```

2. Push the tag to GitHub:
   ```bash
   git push origin v1.0.0
   ```

The GitHub Action will then:
- Install dependencies.
- Trigger a Netlify build using the `NETLIFY_BUILD_HOOK` secret.
- Notify a Discord channel via the `DISCORD_WEBHOOK_URL` secret upon success.

### Configuration

The following secrets must be configured in your GitHub repository:
- `NETLIFY_BUILD_HOOK`: The build hook URL from your Netlify site settings.
- `DISCORD_WEBHOOK_URL`: The webhook URL for your Discord channel notifications.
