pipeline {
    agent { label 'agent-node' }
    stages {
        stage('Continuous Integration') {
            steps {
                git branch: 'main', url: 'https://github.com/JossBvd/TP_Frontend_deployment_cda'
            }
        }
        stage('Sonarcube') {
            step {
                sh """
                sonar-scanner \
                -Dsonar.projectKey=jocelyn-td-frontend \
                -Dsonar.sources=. \
                -Dsonar.host.url=https://669b-212-114-26-208.ngrok-free.app \
                -Dsonar.token=${SONAR_TOKEN}
                """
            }
        }
        stage('Deploy via FTP') {
            steps {
                sh '''
                    lftp -d -u $jocelyn_ftp_nom,$jocelyn_ftp_mdp ftp-jocelyn2.alwaysdata.net -e "
                        mirror -R /home/jenkins/workspace/jocelyn-td-frontend/ www/;
                        bye
                    "
                '''
            }
        }
        stage('Install Node') {
            steps {
                sh """
                    sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no jocelyn2@ssh-jocelyn2.alwaysdata.net '
                        cd ~/www && npm install --no-dev &&
                        echo "API_URL=https://jocelyn1.alwaysdata.net/api/podcast.php" > .env
                    '
                """
            }
        }
    }
}