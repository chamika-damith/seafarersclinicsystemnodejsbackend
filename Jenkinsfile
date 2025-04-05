pipeline {
	agent any

    stages {
		stage('SCM Checkout') {
			steps {
				retry(3) {
					git branch: 'master', url: 'https://github.com/chamika-damith/seafarersclinicsystemnodejsbackend'
                }
            }
        }
        stage('Build Docker Image') {
			steps {
				bat 'docker build -t chamikadamith/clinic-app:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
			steps {
				withCredentials([string(credentialsId: 'clinicapp-dockerhubpass', variable: 'cdd-docker')]) {
					script {
						bat "docker login -u chamikadamith -p %cdd-docker%"
                    }
                }
            }
        }
        stage('Push Image') {
			steps {
				bat 'docker push chamikadamith/clinic-app:%BUILD_NUMBER%'
            }
        }
    }
    post {
		always {
			bat 'docker logout'
        }
    }
}