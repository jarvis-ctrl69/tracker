
# Azure Cloud Expense Tracker — Automated Static Web Deployment

A lightweight, client-side expense tracking web application built to demonstrate end-to-end **Cloud Deployment, Infrastructure Provisioning via Azure CLI, and Automated CI/CD** using **GitHub Actions** and **Azure Static Web Apps**.

🔗 **Live Production URL:** [https://azurestaticapps.net](https://azurestaticapps.net)

---

## Architecture & CI/CD Workflow

```text
┌─────────────────────┐      git push       ┌──────────────────────────┐
│  Local Workspace    │ ──────────────────► │  GitHub Repository       │
│  (VS Code + Git)    │                     │  (jarvis-ctrl69/tracker) │
└─────────────────────┘                     └────────────┬─────────────┘
                                                         │
                                                         │ Webhook Trigger
                                                         ▼
┌─────────────────────┐    HTTPS / CDN      ┌──────────────────────────┐
│  Azure Static Web   │ ◄────────────────── │  GitHub Actions CI/CD    │
│  Apps (Free Tier)   │    Auto-Deploy      │  (.github/workflows)     │
└─────────────────────┘                     └──────────────────────────┘
```

---

## Technologies & Cloud Services Used

* **Cloud Platform:** Microsoft Azure (`Azure for Students` Subscription)
* **Hosting Service:** Azure Static Web Apps (Free SKU, Global CDN, Managed SSL/TLS)
* **Infrastructure Provisioning:** Azure CLI (`az group`, `az staticwebapp`)
* **CI/CD Automation:** GitHub Actions (`azure-static-web-apps-jolly-stone-0148dec00.yml`)
* **Frontend Stack:** HTML5, CSS3, Vanilla JavaScript (DOM Manipulation & Browser `LocalStorage`)
* **Version Control:** Git & GitHub

---

## Infrastructure & Deployment Steps

1. **Resource Group Provisioning (Azure CLI):**
   Created a dedicated resource group in `centralindia` to isolate project resources and manage lifecycle costs:
   ```bash
   az group create --name trackerapp --location centralindia
   ```

2. **Static Web App Provisioning & CI/CD Integration:**
   Linked the `jarvis-ctrl69/tracker` repository (`main` branch) to Azure Static Web Apps (`tracker`), automatically injecting the GitHub Actions workflow file into `.github/workflows/`.

3. **Continuous Deployment Verification:**
   Modified the application header locally, rebased remote workflow changes, and pushed to `main`—verifying zero-downtime automated redeployment on `jolly-stone-0148dec00.8.azurestaticapps.net`.

---

## Incident & Troubleshooting Log

### 1. Remote Branch Rejection on Push (`! [rejected] main -> main (fetch first)`)
* **Cause:** Azure Static Web Apps committed the `.github/workflows` YAML file directly to the remote `main` branch during provisioning, causing local and remote histories to diverge.
* **Resolution:** Executed `git pull --rebase origin main` to integrate the workflow commit cleanly before pushing local updates.

---

## Key DevOps Lessons Learned

* **Single Source of Truth:** Every production change flows exclusively through Git commits and automated GitHub Actions pipelines rather than manual uploads.
* **Security Hygiene:** Scoped tokens used for CLI-to-GitHub authentication must be short-lived and revoked immediately after provisioning.
* **Clean Teardown:** Grouping all application resources inside `trackerapp` allows complete environment cleanup with a single command (`az group delete --name trackerapp`).

*IMPORTANT NOTE : THE APP WILL BE LIVE ONLY TILL 14-11-2026 [ Reason :cost management ]