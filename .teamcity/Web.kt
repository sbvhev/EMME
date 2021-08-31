import common.DockerDeploymentConfig
import common.ProjectConfig
import common.configureNodeProject
import jetbrains.buildServer.configs.kotlin.v2019_2.Project

val web = ProjectConfig(
    displayName = "EMME Retail Web",
    name = "emme-retail-web",
    directory = "",
    dockerDeployments = listOf(DockerDeploymentConfig())
)

object WebProject : Project({
    configureNodeProject(web)
})
