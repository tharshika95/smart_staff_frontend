pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/tharshika95/smart_staff_frontend.git'  // Repository URL
        DOCKER_CONTAINER_NAME = 'smart-staff-frontend-app'                      // Docker container name
        DOCKER_HUB_CREDENTIALS = 'smart-staff-frontend-docker-hub-credentials' // Docker Hub credentials ID
        PORT = '80'                                                           // Exposed port
        HOST_PORT = '4200'
        VERSION = getVersion(GIT_BRANCH)  // Use GIT_BRANCH built-in Jenkins variable
        DOCKER_IMAGE_NAME = getTagName(VERSION, BUILD_NUMBER)  // Docker image name
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
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker tag ${DOCKER_IMAGE_NAME} $DOCKER_USER/${DOCKER_IMAGE_NAME}:latest
                    docker push $DOCKER_USER/${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        stage('Deploy') {
            steps {
                // Stop and remove the existing container, then run a new one
                bat """
                docker stop ${DOCKER_CONTAINER_NAME} || true
                docker rm ${DOCKER_CONTAINER_NAME} || true
                docker run -d --name ${DOCKER_CONTAINER_NAME} -p ${HOST_PORT}:${PORT} ${DOCKER_IMAGE_NAME}
                """
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
