pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            steps {
                script {
                    app = docker.build("gwho0212/countfit-frontend:${env.BUILD_NUMBER}", "./frontend")
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['countfit-backend-ec2-ssh-key']) {
                    sh '''
ssh -o StrictHostKeyChecking=no ubuntu@15.164.169.82 <<EOF
docker pull gwho0212/countfit-frontend:latest
docker stop countfit-frontend || true
docker rm countfit-frontend || true
docker run -d --name countfit-frontend -p 80:80 gwho0212/countfit-frontend:latest
EOF
            '''
                }
            }
        }


    }
}
