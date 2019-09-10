import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  id("org.springframework.boot") version "2.1.8.RELEASE"
  id("io.spring.dependency-management") version "1.0.8.RELEASE"
  kotlin("jvm") version "1.2.71"
  kotlin("plugin.spring") version "1.2.71"
  kotlin("plugin.jpa") version "1.2.71"
  jacoco
}

group = "com.sos"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  runtimeOnly("com.h2database:h2")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs = listOf("-Xjsr305=strict")
    jvmTarget = "1.8"
  }
}

tasks.jacocoTestReport {
  reports {
    xml.isEnabled = true
    html.isEnabled = false
  }
}

val testCoverage by tasks.registering {
  group = "verification"
  description = "Runs the unit tests with coverage."
  dependsOn(":test", ":jacocoTestReport")
  tasks.findByName("jacocoTestReport")?.mustRunAfter(tasks.findByName("test"))
}
