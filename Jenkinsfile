pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/tharshika95/smart_staff_frontend.git'  // Repository URL
        DOCKER_CONTAINER_NAME = 'smart-staff-frontend-app'                      // Docker container name
        DOCKER_CREDENTIALS_ID = 'smart-staff-frontend-docker-hub-credentials' // Docker Hub credentials ID
        PORT = '80'                                                     // Exposed port                                             // Git branch variable (example: 'main' or 'feature-branch')
        VERSION = getVersion(GITBRANCH)
        DOCKER_IMAGE_NAME = getTagName(VERSION, BUILD_NUMBER)                       // Docker image name
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                bat 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular application
                bat 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                bat "docker build -t ${DOCKER_IMAGE_NAME} ."
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
                        bat "docker push ${DOCKER_IMAGE}:${TAG}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}


def getVersion(String gitBranch) {
    def parts = gitBranch.tokenize('/')
    return parts[-1]  // Return the last part of the branch name
}

def getTagName(String version, String buildId) {
    def tagname = version + '-' + buildId
    return tagname  // Return the tag name
}
