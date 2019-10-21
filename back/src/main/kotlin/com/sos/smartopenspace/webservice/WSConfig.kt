package com.sos.smartopenspace.webservice

import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry

@Configuration
@EnableWebSocket
class WSConfig(
  private val scheduleHandler: ScheduleHandler,
  private val queueHandler: QueueHandler
) : WebSocketConfigurer {
  override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
    registry
      .addHandler(scheduleHandler, "/scheduleSocket")
      .setAllowedOrigins("http://localhost:1234", "https://smartopenspace.herokuapp.com")
      .withSockJS()
    registry
      .addHandler(queueHandler, "/queueSocket")
      .setAllowedOrigins("http://localhost:1234", "https://smartopenspace.herokuapp.com")
      .withSockJS()
  }
}
