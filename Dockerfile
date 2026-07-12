FROM python:3.10-slim

# Set environment variables to prevent Python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend files (including app.py and the models folder)
COPY backend/ ./backend/

# Set working directory to backend so app.py can locate 'models/' relatively
WORKDIR /app/backend

# Hugging Face Spaces requires the app to run on port 7860
EXPOSE 7860

# Start the application using gunicorn on port 7860
CMD ["gunicorn", "-b", "0.0.0.0:7860", "--timeout", "120", "app:app"]
