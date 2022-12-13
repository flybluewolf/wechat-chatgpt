FROM python:3
WORKDIR /app
ARG POETRY_VERSION=1.2.2
RUN apt-get update && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs chromium-browser && \
    rm -rf /var/cache/apk/* && \
    pip3 install --no-cache-dir poetry && \
    rm -rf ~/.cache/
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY pyproject.toml ./
COPY poetry.lock ./
# Install dependencies
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN poetry install && npm install && npm i puppeteer && rm -rf ~/.npm/
COPY . .
CMD ["npm", "run", "dev"]
