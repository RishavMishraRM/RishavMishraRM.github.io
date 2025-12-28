# Portfolio Website

This creates a personal portfolio website using Go templates and GitHub Pages.

## Technical Stack
- **Go (Golang)**: Used as a static site generator.
- **HTML/CSS**: Custom responsive design with CSS Variables and Flexbox/Grid.
- **GitHub Actions**: Automates the build and deployment process.

## How it works
1. `main.go` contains the portfolio data and logic to render `templates/index.html`.
2. Running `go run main.go` serves the site locally at `http://localhost:8080`.
3. Running `go run main.go -build` generates a static `index.html` file.
4. The GitHub Action workflow `.github/workflows/deploy.yml` runs the build command and deploys the output to the `gh-pages` branch.

## Local Development
To run this locally, you need Go installed.

```bash
go run main.go
```

To build static site manually:
```bash
go run main.go -build
```

## Deployment
Pushing to the `main` branch automatically triggers the deployment action.
Make sure to configure your GitHub Repo Settings -> Pages to serve from the `gh-pages` branch.
