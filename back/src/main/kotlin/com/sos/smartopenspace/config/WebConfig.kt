package com.sos.smartopenspace.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
  override fun addCorsMappings(registry: CorsRegistry) {
    registry
      .addMapping("/**")
      .allowedMethods("GET", "PUT", "POST")
      .allowedOrigins("http://localhost:1234", "https://smartopenspace.herokuapp.com")
  }
}
