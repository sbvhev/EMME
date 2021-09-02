package common

import jetbrains.buildServer.configs.kotlin.v2019_2.ProjectFeatures
import jetbrains.buildServer.configs.kotlin.v2019_2.projectFeatures.dockerRegistry
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildSteps
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.dockerCommand

abstract class DockerRepository(
    val featureId: String,
    val name: String,
    val url: String,
    val userName: String,
    val password: String
) {
    fun ProjectFeatures.registerFeature() = dockerRegistry {
        id = this@DockerRepository.featureId
        name = this@DockerRepository.name
        url = this@DockerRepository.url
        userName = this@DockerRepository.userName
        password = this@DockerRepository.password
    }
}

object VbkInternalDocker : DockerRepository(
    featureId = "VBK_INTERNAL_DOCKER_REGISTRY",
    name = "VBK Internal Docker Registry",
    url = "docker-internal.veriblock.com",
    userName = "veriblock",
    password = "credentialsJSON:8f435647-4cc3-4354-9146-bfc754e32edc"
)

class DockerDeploymentConfig(
    val displayName: String? = null,
    val dockerfilePath: String? = null,
    val imageName: String? = null,
    val extraBuildArgs: String = ""
)

fun BuildSteps.deployDocker(
    projectConfig: ProjectConfig,
    specialTag: String?
) {
    for (deployment in projectConfig.dockerDeployments) {
        deployDocker(projectConfig, deployment, specialTag)
    }
}

fun BuildSteps.deployDocker(
    projectConfig: ProjectConfig,
    deployment: DockerDeploymentConfig,
    specialTag: String? = null
) {
    val displayName = deployment.displayName ?: projectConfig.displayName
    val dockerfilePath = deployment.dockerfilePath ?: "${projectConfig.directory}/Dockerfile"
    val imageName = deployment.imageName ?: projectConfig.name

    val nameAndTag = "${VbkInternalDocker.url}/$imageName"
    // Add latest if we're in a final version or snapshot if we're in the main branch
    val allNamesAndTags = """
        ${specialTag?.let { "$nameAndTag:$it" } ?: ""}
        $nameAndTag:%build.number%
    """.trimIndent()

    dockerCommand {
        name = "Build $displayName Docker Image"
        commandType = build {
            source = file {
                path = dockerfilePath
            }
            namesAndTags = allNamesAndTags
            commandArgs = "--pull " + deployment.extraBuildArgs
        }
    }
    dockerCommand {
        name = "Push $displayName Docker Image"
        commandType = push {
            namesAndTags = allNamesAndTags
            removeImageAfterPush = true
        }
        param("dockerfile.path", dockerfilePath)
    }
}
