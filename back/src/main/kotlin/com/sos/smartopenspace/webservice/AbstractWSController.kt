package com.sos.smartopenspace.webservice

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.sos.smartopenspace.model.OpenSpace
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler

abstract class AbstractWSController<T> : TextWebSocketHandler() {
  private val sessionList = mutableMapOf<WebSocketSession, Long>()

  override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
    sessionList -= session
  }

  abstract fun getData(id: Long): T

  abstract fun getData(os: OpenSpace): T

  override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
    val id = ObjectMapper().readTree(message.payload).asLong()
    sessionList[session] = id
    emit(session, getData(id))
  }

  fun sendFor(os: OpenSpace) {
    val data = getData(os)
    sessionList.filterValues { it == os.id }.keys.forEach { emit(it, data) }
  }

  private fun emit(session: WebSocketSession, data: T) =
    session.sendMessage(TextMessage(jacksonObjectMapper().writeValueAsString(data)))
}