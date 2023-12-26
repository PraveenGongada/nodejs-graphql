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
                step([$class: 'GitHubCommitStatusSetter', reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/PraveenGongada/nodejs-graphql'], contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'continuous-integration/jenkins/build-status'], statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: 'Build is running', state: 'PENDING']] ] ])
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
        success{
            step([$class: 'GitHubCommitStatusSetter', reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/PraveenGongada/nodejs-graphql'], contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'continuous-integration/jenkins/build-status'], statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: 'Build succeeded', state: 'SUCCESS']] ] ])
        }
        failure{
            step([$class: 'GitHubCommitStatusSetter', reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/PraveenGongada/nodejs-graphql'], contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'continuous-integration/jenkins/build-status'], statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: 'Build failed', state: 'FAILURE']] ] ])
        }
    }
}