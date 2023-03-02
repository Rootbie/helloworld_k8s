pipeline{
    agent any
    environment {
        DOCKER_IMAGE_TAG = getNewTag()
    }

    stages{
        stage('1. Build image from Dockerfile'){
            steps {
                sh "docker build . -t trinh00thien/my-docker-app:${DOCKER_IMAGE_TAG} "
            }
        }

        stage('2. Push docker image to dockerhub'){
            steps {
                sh "docker image push trinh00thien/my-docker-app:${DOCKER_IMAGE_TAG}"
            }
        }

        stage('3. Deploy docker image to k8s'){
            steps {
                sh "chmod +x changeTag.sh"
                sh "./changeTag.sh ${DOCKER_IMAGE_TAG}"

                sshagent(['instanceForDocker']){
                    sh "scp -o StrictHostKeyChecking=no services.yml node-app-pod.yml ubuntu@172.31.48.203:/home/ubuntu"

                    script {
                        try {
                            sh "ssh ubuntu@0.0.0.0 kubectl create -f ."
                        } catch(error) {
                            sh "ssh ubuntu@0.0.0.0 kubectl apply -f ."
                        }
                    }
                }
            }

        }
    }
}

def getNewTag(){
    def tag = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}
