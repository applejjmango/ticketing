# 각 서비스에 맞게 파일 수정

### 1. package.json

- ` name: <microservice name>`

### 2. Install Deps

- `npm install`

### 3. Build image, push to DockerHub, so that Skaffold can download the latest image from the Docker Hub

- ` docker build -t playbuilder/<microservice name> .`
- `docker push playbuilder/<microservice name>`

---

Step 3 are only required when running Docker on the local machine
