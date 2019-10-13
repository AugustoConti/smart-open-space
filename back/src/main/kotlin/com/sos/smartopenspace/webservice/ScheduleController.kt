package com.sos.smartopenspace.webservice

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Slot
import com.sos.smartopenspace.service.OpenSpaceService
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.handler.TextWebSocketHandler

@Component
class ScheduleHandler(private val openSpaceService: OpenSpaceService) : TextWebSocketHandler() {
  private val sessionList = mutableMapOf<WebSocketSession, Long>()

  override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
    sessionList -= session
  }

  override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
    val id = ObjectMapper().readTree(message.payload).asLong()
    sessionList[session] = id
    emit(session, openSpaceService.findSlotsById(id))
  }

  fun sendFor(os: OpenSpace) {
    val slots = os.slots.toList()
    sessionList.filterValues { it == os.id }.keys.forEach { emit(it, slots) }
  }

  private fun emit(session: WebSocketSession, slots: List<Slot>) =
    session.sendMessage(TextMessage(jacksonObjectMapper().writeValueAsString(slots)))
}

@Configuration
@EnableWebSocket
class WSConfig(private val scheduleHandler: ScheduleHandler) : WebSocketConfigurer {
  override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
    registry
      .addHandler(scheduleHandler, "/scheduleSocket")
      .setAllowedOrigins("http://localhost:1234", "https://smartopenspace.herokuapp.com")
      .withSockJS()
  }
}