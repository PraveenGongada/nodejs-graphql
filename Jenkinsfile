pipeline {
    agent {
        label 'github'
    }
    tools {
        nodejs 'NodeJs'
    }

    stages{
        stage('Git Checkout') {
            steps {
                sh 'git clone https://github.com/PraveenGongada/nodejs-graphql.git'
            }
        }

        stage('npm install') {
            steps {
                dir('nodejs-graphql') {
                    sh 'npm install'
                }
            }
        }
    }

    post{
        always {
            sh 'rm -rf nodejs-graphql'
        }
    }
}