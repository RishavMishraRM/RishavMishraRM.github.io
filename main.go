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

type Education struct {
	Degree      string
	Institution string
	Year        string
	Grade       string
}

type PortfolioData struct {
	Name       string
	Label      string
	Bio        string
	Experiences []Experience
	Projects   []Project
	Education  []Education
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
		Label: "Product Manager | System Analyst | API & Digital Payments Expert",
		Bio:   "Professional with 3.5+ years of experience in the Payment Industry (BFSI), specializing in Digital Banking, API Banking, and Core Banking systems. Currently leading Generative AI initiatives to enhance customer interactions. Expert in managing end-to-end digital payment ecosystem journeys and driving Go-to-Market strategies.",
		Experiences: []Experience{
			{
				Company:     "HDFC Bank",
				Role:        "System Analyst",
				Duration:    "July 2022 - Present",
				Description: "Leading Core Credit Card Platform & API Banking initiatives. Managing Fraud Prevention ML projects and Generative AI Call Bots. Delivered strategic projects across channels and designed omnichannel credit card journeys. Key achievements include launching Smart EMI on WhatsApp and driving Mobile Banking modernization.",
			},
			{
				Company:     "HighRadius",
				Role:        "Data Analyst Trainee",
				Duration:    "Aug 2021 - July 2022",
				Description: "Developed real-time dashboards using Tableau for GTM decision-making. Streamlined data pipelines using SQL and Snowflake. Conducted POCs for ML models predicting project costs.",
			},
			{
				Company:     "Wipro",
				Role:        "Turbo Trainee",
				Duration:    "March 2022 - July 2022",
				Description: "Developed a web-based ATM simulator using HTML/CSS/JS and a Java-based movie ticket booking system.",
			},
		},
		Projects: []Project{
			{
				Title:       "Generative AI Conversational Agent",
				Description: "Engineered a prompt-based conversational AI bot to automate customer interactions for Lending and Collections.",
				Tags:        []string{"GenAI", "LLM", "Python", "Automation"},
				Link:        "#",
			},
			{
				Title:       "Smart EMI on WhatsApp",
				Description: "Launched India’s first end-to-end financial transaction over chat, increasing engagement and setting a benchmark for conversational banking.",
				Tags:        []string{"WhatsApp API", "Fintech", "Product Launch"},
				Link:        "#",
			},
			{
				Title:       "Loan On Card Platform",
				Description: "Designed and implemented customer journeys handling 5M+ hits and ₹400B+ monthly disbursals.",
				Tags:        []string{"Banking Architecture", "Scale", "Digital Journey"},
				Link:        "#",
			},
		},
		Education: []Education{
			{
				Degree:      "M.Tech in Artificial Intelligence & Data Science",
				Institution: "Indian Institute of Technology, Patna",
				Year:        "2026 (Pursuing)",
				Grade:       "",
			},
			{
				Degree:      "B.Tech in Computer Science & Engineering",
				Institution: "SRM Institute of Science & Technology, Chennai",
				Year:        "2022",
				Grade:       "9 CGPA",
			},
		},
		Socials: []Social{
			{Platform: "GitHub", URL: "https://github.com/RishavMishraRM"},
			{Platform: "LinkedIn", URL: "https://linkedin.com/in/rishavkumarmishra"},
			{Platform: "Email", URL: "mailto:rishav.mishra.rkm@gmail.com"},
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
