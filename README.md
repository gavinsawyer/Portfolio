

# GavinSawyer.dev

This repo is an Nx workspace and local Firebase project. The default Nx project is my personal website. The Firebase Cloud Functions enable home automations with Shortcuts, and showing my devices' Focus in real-time on the website.

- [Go to Website](apps/website)
- [Go to Cloud Functions](functions)

## Clone

In order to clone this project,

- Clone this repo locally.
- Create and configure a Firebase project.
  - Structure database in Cloud Firestore.
  - Enable AppCheck for Cloud Firestore.
  - Enable necessary APIs in Google Cloud Platform, restrict public API keys to your domain and localhost:4200.
- Create a reCAPTCHA v3 site.
  - Add your domain and localhost:4200 to your reCAPTCHA registration.
- Replace the following data with yours:
  - my Firebase project ID `portfolio-a59e2`
  - my Firebase project region `us-central1`
  - my Firebase and reCAPTCHA API keys (see [apps/website/src/environments](apps/website/src/environments)).
- Run `nx deploy`.

## CI/CD

This repo is configured for CI/CD with Nx, Firebase Hosting, and GitHub Actions. 
