# Rural Health Backend

This is a production-ready backend skeleton for the rural healthcare web app, built with FastAPI.

## Tech Stack

* **Python:** 3.11+
* **Web Framework:** FastAPI
* **ASGI Server:** Uvicorn
* **Database:** SQLite (dev) / PostgreSQL (prod) via SQLAlchemy
* **Data Models:** Pydantic
* **Migrations:** Alembic (optional)
* **Voice:** Vosk (STT) and pyttsx3/Coqui (TTS) stubs

## Repository Layout

* `app/`: Main application code, including FastAPI routers, models, and services.
* `tests/`: Unit and integration tests.
* `alembic/`: Database migrations.
* `.env.example`: Example environment variables.
* `requirements.txt`: Python dependencies.
* `Dockerfile`: Docker container configuration.
* `docker-compose.yml`: For easy local setup with Postgres and other services.

## Local Setup (Development)

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd rural-health-backend
    ```

2.  **Set up a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables:**
    ```bash
    cp .env.example .env
    ```
    You can edit `.env` to change settings like the database URL.

5.  **Run the application:**
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```
    The API will be available at `http://localhost:8000`. You can access the interactive OpenAPI documentation at `http://localhost:8000/api/v1/docs`.

## API Contracts

The API follows the `/api/v1` base URL. Refer to the OpenAPI docs or the `routers/` directory for a full list of endpoints and their contracts.

## Deployment

A simple `Dockerfile` is provided for containerization. For production use, you can deploy the container to a service like Google Cloud Run, AWS Fargate, or a standard VM. The `docker-compose.yml` file is useful for setting up a local development environment with a PostgreSQL database.

## Quick Test

You can use `curl` or a tool like Postman to test the endpoints.

**Test `symptoms/analyze`:**
```bash
curl -X POST "http://localhost:8000/api/v1/symptoms/analyze" \
-H "Content-Type: application/json" \
-d '{"text": "sar dard aur bukhaar hai", "lang": "hi"}'