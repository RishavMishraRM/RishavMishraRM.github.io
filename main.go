package main

import (
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type Project struct {
	Title       string
	Description string
	Link        string
	Tags        []string
}

type Experience struct {
	Company     string
	Role        string
	Duration    string
	Description string
}

type PortfolioData struct {
	Name       string
	Label      string
	Bio        string
	Experiences []Experience
	Projects   []Project
	Socials    []Social
}

type Social struct {
	Platform string
	URL      string
}

func main() {
	build := flag.Bool("build", false, "Generate static index.html")
	flag.Parse()

	data := PortfolioData{
		Name:  "Rishav Kumar Mishra",
		Label: "Banking Professional & Tech Enthusiast",
		Bio:   "A dedicated banking professional with expertise in financial operations, now bridging the gap between finance and technology. Passionate about building efficient solutions and exploring the world of software development.",
		Experiences: []Experience{
			{
				Company:     "Banking Sector",
				Role:        "Banking Operations Specialist",
				Duration:    "2020 - Present",
				Description: "Managing day-to-day banking operations, ensuring compliance with regulations, and delivering exceptional customer service. Analyzing financial data to support decision-making processes.",
			},
			{
				Company:     "Financial Institution",
				Role:        "Analyst Intern",
				Duration:    "2019 - 2020",
				Description: "Assisted in credit analysis, risk assessment, and portfolio management tasks.",
			},
		},
		Projects: []Project{
			{
				Title:       "Portfolio Website",
				Description: "A high-performance personal portfolio website built with Go, featuring responsive design and automated deployment.",
				Tags:        []string{"Go", "HTML5", "CSS3", "GitHub Actions"},
				Link:        "#",
			},
			{
				Title:       "Financial Calculator",
				Description: "A utility tool for calculating loan EMIs and investment returns, showcasing the intersection of finance and coding.",
				Tags:        []string{"JavaScript", "Math"},
				Link:        "#",
			},
		},
		Socials: []Social{
			{Platform: "GitHub", URL: "https://github.com/RishavMishraRM"},
			{Platform: "LinkedIn", URL: "https://linkedin.com"},
			{Platform: "Email", URL: "mailto:rishav@example.com"},
		},
	}

	tmpl, err := template.ParseFiles(filepath.Join("templates", "index.html"))
	if err != nil {
		log.Fatalf("Error parsing template: %v", err)
	}

	if *build {
		f, err := os.Create("index.html")
		if err != nil {
			log.Fatalf("Error creating index.html: %v", err)
		}
		defer f.Close()

		err = tmpl.Execute(f, data)
		if err != nil {
			log.Fatalf("Error executing template: %v", err)
		}
		fmt.Println("Static site generated: index.html")
	} else {
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			err := tmpl.Execute(w, data)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
		})

		fs := http.FileServer(http.Dir("static"))
		http.Handle("/static/", http.StripPrefix("/static/", fs))

		fmt.Println("Server started at http://localhost:8080")
		log.Fatal(http.ListenAndServe(":8080", nil))
	}
}
