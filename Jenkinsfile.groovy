import groovy.json.JsonSlurper

node {
    properties(
            [
//                    parameters([
//                            string(name: 'MAVEN_ADDITIONAL_PARAM', defaultValue: '', description: 'additional parameters to maven command line, i.e. "-X" to add debug information to the log')
//                    ]),
pipelineTriggers([
        triggers: [
                [
                        $class      : 'hudson.triggers.SCMTrigger',
                        scmpoll_spec: 'H/3 * * * *'
                ]
        ]
]),
[$class  : 'BuildDiscarderProperty',
 strategy:
         [$class               : 'LogRotator',
          artifactDaysToKeepStr: '',
          artifactNumToKeepStr : '',
          daysToKeepStr        : '',
          numToKeepStr         : '10']
],
disableConcurrentBuilds()
            ])
    catchError {
        withDockerServer([uri: 'unix:///var/run/docker.sock']) {
            // some block

            withEnv(["PATH+NODE=${tool 'node-8.9'}/bin"]) {
                stage("Initialize") {
                    checkout scm
                    stage('Prepare') {
                        env.test_command = "yarn test:deploy"
                    }
                    stage('Build') {
                        sh '''
                    #!/usr/bin/env bash
                    set -e
                    docker ps
                    docker-compose build                    
                    '''
                    }
                    stage('Test') {
                        sh 'docker-compose run htz_react ${test_command}'
                    }
                    stage('Deploy') {
                        sh '''#!/usr/bin/env bash
                    set -e                    
                    #docker-compose push
                    export version=${container_version}
                    #docker-compose push
                    '''
                    }
                }
            }

            stage('Post-Build') {
                sh 'docker-compose down -v'
                //step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'maoz@leadspace.com', sendToIndividuals: true])
                step([$class                  : 'Mailer',
                      notifyEveryUnstableBuild: true,
                      recipients              : emailextrecipients([[$class: 'CulpritsRecipientProvider'],
                                                                    [$class: 'RequesterRecipientProvider']])])
            }
        }
    }
}
