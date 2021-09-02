import common.BranchNodeBuild
import common.FinalReleaseNodeBuild
import common.ReleaseCandidateNodeBuild
import common.SnapshotNodeBuild
import common.VbkInternalDocker
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.projectFeatures.githubConnection

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.

VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.

To debug settings scripts in command-line, run the

    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate

command and attach your debugger to the port 8000.

To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2021.1"

object GlobalSettings {
    val allProjectConfigs = listOf(web)
}

project {
    buildType(ReleaseCandidateNodeBuild())
    buildType(FinalReleaseNodeBuild())

    buildType(BranchNodeBuild(web))
    buildType(SnapshotNodeBuild(web))

    params {
        text("gradle-params", "", allowEmpty = true)
    }

    features {
        githubConnection {
            id = "PROJECT_EXT_3"
            displayName = "GitHub.com"
            clientId = "aea933b75a17f9296e61"
            clientSecret = "credentialsJSON:0691c9bc-868a-4395-b02d-1b5059700f8e"
        }
        with(VbkInternalDocker) { registerFeature() }
    }
}
