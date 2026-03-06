# Project Udaan Context

## Overview
Udaan is a full-stack flight and travel dashboard application. It follows a monorepo structure with a React-based frontend and a Python-based backend.

## Project Structure
- **/project**: Frontend application.
  - **Tech Stack**: React, Vite, TypeScript, Tailwind CSS.
  - **Key Features**: Interactive dashboard, flight search UI, theme toggling, multi-language support.
- **/backend**: Backend API services.
  - **Tech Stack**: Python, Flask.
  - **Modules**:
    - `app.py`: Main entry point for the Flask server.
    - `aviation_api.py` & `travelpayouts_api.py`: External API integrations for flight data.
    - `routes.py`: API endpoint definitions.
- **Root**:
  - `CONTEXT.md`: This file, providing high-level project information.
  - `.gitignore`: Configured for both Node.js and Python environments.

## External Integrations
- AviationStack API
- TravelPayouts API

## Repository Information
- **Remote**: [https://github.com/GauravGit-007/Udaan](https://github.com/GauravGit-007/Udaan)
- **Branch Strategy**: Main branch for production-ready code.
