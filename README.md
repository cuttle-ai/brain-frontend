# BrainFrontend

Frontend of the brain application written in Angular

## Prerequisite

You would require the following to be installed in your system

- [node](https://nodejs.org/en/)
- [go](https://golang.org/)

## Installation

Add the following variables to your .bashrc or .zshrc in your home directory

```
export VAULT_ROOT_KEY='get-the-vault-root-token-from-development-team'
export CUTTLE_AI_CONFIG_VAULT_TOKEN=$VAULT_ROOT_KEY
export CUTTLE_AI_CONFIG_VAULT_ADDRESS='https://vault.cuttle.ai'
export CUTTLE_AI_CONFIG_VAULT_DEFAULT_PATH='cuttle-ai-development'
```

```bash
git clone https://github.com/cuttle-ai/file-uploader-service
cd file-uploader-service
sh setup.sh
cd ../brain-frontend
sudo npm install -g @angular/cli
npm i
```

## Usage

Navigate into the project directory and run the following command

```bash
cd ../auth-service && go run main.go
```

Open another terminal session in the project directory and run the following command

```bash
cd npm start
```
