# Next.js Application

A modern web application built with **Next.js** and managed using **Yarn**.

## Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** — LTS version recommended
- **Yarn** — package manager
- **Git**

Check your installed versions:

```bash
node --version
yarn --version
git --version
```

---

## 1. Install Node.js

Download and install the latest **LTS version of Node.js** from:

https://nodejs.org/

Verify the installation:

```bash
node --version
npm --version
```

> It is recommended to use an active LTS version of Node.js for development and deployment.

### Using nvm (Recommended)

If you work with multiple Node.js projects, using `nvm` is recommended.

Install and verify `nvm`, then install Node.js:

```bash
nvm install --lts
nvm use --lts
```

Verify:

```bash
node --version
npm --version
```

---

## 2. Configure Yarn

This project uses **Yarn** as its package manager.

### Option A — Corepack (Recommended)

Modern Node.js versions include Corepack.

Enable it:

```bash
corepack enable
```

Verify Yarn:

```bash
yarn --version
```

If the project specifies a Yarn version in `package.json`, Corepack will use the configured version.

For example:

```json
{
  "packageManager": "yarn@4.9.4"
}
```

If a specific version is required, activate it with:

```bash
corepack prepare yarn@4.9.4 --activate
```

Replace `4.9.4` with the version required by the project.

### Option B — Install Yarn globally

If Corepack is not available:

```bash
npm install --global yarn
```

Verify:

```bash
yarn --version
```

> Use the Yarn version specified by the project's `package.json` whenever possible.

---

## 3. Clone the Repository

Clone the project:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd <project-directory>
```

---

## 4. Install Dependencies

Install all project dependencies using Yarn:

```bash
yarn install
```

This installs the packages defined in:

```text
package.json
```

and uses the project's lock file:

```text
yarn.lock
```

### Important

If `yarn.lock` already exists, do not delete it unnecessarily.

The lock file ensures that developers and CI/CD environments install consistent dependency versions.

---

## 5. Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

If `.env.example` does not exist, create:

```text
.env.local
```

Add the required environment variables.

Example:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API
API_BASE_URL=http://localhost:8080

# Public client-side configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Environment File Usage

Next.js commonly uses:

```text
.env
.env.local
.env.development
.env.production
.env.test
```

For local development, `.env.local` is generally recommended.

### Important Security Rule

Never commit secrets to Git.

Do **not** commit:

```text
.env.local
.env.production
```

Make sure sensitive environment files are included in `.gitignore`.

Only variables prefixed with:

```text
NEXT_PUBLIC_
```

are exposed to the browser.

Therefore, never put passwords, API secrets, private keys, or other sensitive credentials in `NEXT_PUBLIC_*` variables.

---

## 6. Run the Application in Development

Start the Next.js development server:

```bash
yarn dev
```

By default, the application will be available at:

```text
http://localhost:3000
```

Open the URL in your browser.

### Run on a Different Port

```bash
yarn dev -p 3001
```

The application will then be available at:

```text
http://localhost:3001
```

---

## 7. Available Yarn Commands

The exact commands depend on the project's `package.json`.

Typical commands include:

| Command | Description |
|---|---|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests, if configured |
| `yarn install` | Install dependencies |
| `yarn add <package>` | Add a dependency |
| `yarn add -D <package>` | Add a development dependency |
| `yarn remove <package>` | Remove a dependency |

---

## 8. Add a Dependency

To install a production dependency:

```bash
yarn add <package-name>
```

Example:

```bash
yarn add axios
```

To install a development dependency:

```bash
yarn add -D <package-name>
```

Example:

```bash
yarn add -D prettier
```

---

## 9. Remove a Dependency

```bash
yarn remove <package-name>
```

Example:

```bash
yarn remove axios
```

---

## 10. Build the Application

Before creating a production deployment, create a production build:

```bash
yarn build
```

Next.js will:

1. Compile the application
2. Optimize the application
3. Generate the production output
4. Perform build-time validation

The production build is generated in:

```text
.next/
```

Do not manually modify the `.next` directory.

---

## 11. Run the Production Build Locally

After successfully running:

```bash
yarn build
```

start the production server:

```bash
yarn start
```
