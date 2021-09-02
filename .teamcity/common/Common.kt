package common

data class ProjectConfig(
    val displayName: String,
    val name: String,
    val directory: String,
    val triggerRules: List<String> = commonTriggerRules,
    val dockerDeployments: List<DockerDeploymentConfig>
)

val commonTriggerRules = listOf(
    "+:common/**",
    "+:buildSrc/**",
    "+:.teamcity/common/**",
    "+:.teamcity/settings.kts",
    "+:build.gradle.kts",
    "+:settings.gradle.kts"
)

fun buildTriggerRules(projectConfig: ProjectConfig): String =
    (listOf("+:${projectConfig.directory}/**") + projectConfig.triggerRules).joinToString("\n", "", "\n")
