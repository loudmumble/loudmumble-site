.PHONY: all install build build-dev dev preview lint test clean help

all: install build ## Install deps + build

install: ## Install dependencies
	npm install

build: ## Build for production (Vite)
	npm run build

build-dev: ## Build in development mode
	npm run build:dev

dev: ## Start Vite dev server
	npm run dev

preview: ## Preview production build
	npm run preview

lint: ## Run ESLint
	npm run lint

test: ## Run Vitest
	npm test

clean: ## Remove build artifacts
	rm -rf node_modules dist

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
