gradle.startParameter.showStacktrace = ShowStacktrace.ALWAYS

plugins {
    id("nebula.release") version "15.3.1"
    id("com.github.node-gradle.node") version "3.0.0"
}

allprojects {
    repositories {
        mavenLocal()
        mavenCentral()
    }
}

tasks.named("release").configure {
    dependsOn.removeIf {
        it.toString().contains("npm_run_build")
    }
}

tasks.named("releaseCheck").configure {
    doLast {
        // Print version to configure TeamCity
        println("##teamcity[buildNumber \'${prettyVersion()}\']")
    }
}

tasks.wrapper {
    gradleVersion = "7.1.1"
}

node {
    version.set("14.15.1")
    npmVersion.set("6.14.0")
    download.set(true)
}

fun Project.prettyVersion(): String {
    var version = rootProject.version.toString()
    if (version.contains("+")) {
        version = version.substring(0, version.length - 8).replace("+", ".")
        if (version.endsWith("main")) {
            version = version.substring(0, version.length - 5)
        }
        if (version.endsWith(".dev.0")) {
            version = version.substringBefore(".dev.0")
        }
    }
    return version
}

