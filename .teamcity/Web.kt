import common.DockerDeploymentConfig
import common.ProjectConfig

val web = ProjectConfig(
    displayName = "EMME Retail Web",
    name = "emme-retail-web",
    directory = "",
    dockerDeployments = listOf(DockerDeploymentConfig())
)