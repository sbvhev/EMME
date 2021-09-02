package common

import Settings.GlobalSettings.allProjectConfigs
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import jetbrains.buildServer.configs.kotlin.v2019_2.DslContext
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.dockerSupport
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.sshAgent
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.gradle
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

abstract class NodeBuild(
    name: String,
    val projectConfig: ProjectConfig?,
    val gradleBaseTask: String,
    val buildBranchFilter: String?,
    val specialTag: String? = null,
    val triggerOnPush: Boolean = false
) : BuildType({
    id("${projectConfig?.displayName ?: ""}_$name".replace(" ", "_"))
    this.name = name

    vcs {
        root(DslContext.settingsRoot)
        if (buildBranchFilter != null) {
            branchFilter = buildBranchFilter.replace("refs/heads/master", "<default>")
        }
    }

    steps {
        val gradleTaskPrefix = projectConfig?.let { ":${it.directory}:" } ?: ""
        
        gradle {
            this.name = "Gradle - Execute yarn_run_build"
            tasks = "$gradleBaseTask ${gradleTaskPrefix}yarn_run_build"
            buildFile = "build.gradle.kts"
        }
        if (projectConfig != null) {
            deployDocker(projectConfig, specialTag)
        } else {
            for (project in allProjectConfigs) {
                deployDocker(project, specialTag)
            }
        }
    }

    if (triggerOnPush) {
        val finalBranchFilter = buildBranchFilter ?: ""
        triggers {
            vcs {
                branchFilter = finalBranchFilter
                perCheckinTriggering = false
                groupCheckinsByCommitter = true
                enableQueueOptimization = true
                if (projectConfig != null) {
                    triggerRules = buildTriggerRules(projectConfig)
                }
            }
        }
    }

    features {
        sshAgent {
            teamcitySshKey = "emme-retail-web-gh"
        }
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = VbkInternalDocker.featureId
            }
        }
    }
})

class BranchNodeBuild(
    projectConfig: ProjectConfig
) : NodeBuild(
    name = "Branch",
    projectConfig = projectConfig,
    gradleBaseTask = "devSnapshot",
    buildBranchFilter = """
        +:refs/heads/*
        -:refs/heads/master
    """.trimIndent(),
    triggerOnPush = true
)

class SnapshotNodeBuild(
    projectConfig: ProjectConfig
) : NodeBuild(
    name = "Snapshot",
    projectConfig = projectConfig,
    gradleBaseTask = "devSnapshot",
    buildBranchFilter = """
        +:refs/heads/master
    """.trimIndent(),
    specialTag = "snapshot",
    triggerOnPush = true
)

class ReleaseCandidateNodeBuild : NodeBuild(
    name = "Release Candidate",
    projectConfig = null,
    gradleBaseTask = "candidate",
    buildBranchFilter = """
        +:refs/heads/master
    """.trimIndent(),
    specialTag = "rc",
    triggerOnPush = false
)

class FinalReleaseNodeBuild : NodeBuild(
    name = "Final Release",
    projectConfig = null,
    gradleBaseTask = "final",
    buildBranchFilter = """
        +:refs/heads/master
    """.trimIndent(),
    specialTag = "latest",
    triggerOnPush = false
)