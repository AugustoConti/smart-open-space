package com.sos.smartopenspace.services

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.persistence.RoomRepository
import com.sos.smartopenspace.persistence.TalkRepository
import com.sos.smartopenspace.websockets.QueueSocket
import com.sos.smartopenspace.websockets.ScheduleSocket
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TalkService(
  private val openSpaceRepository: OpenSpaceRepository,
  private val talkRepository: TalkRepository,
  private val roomRepository: RoomRepository,
  private val userService: UserService,
  private val scheduleSocket: ScheduleSocket,
  private val queueSocket: QueueSocket
) {
  private fun findUser(userID: Long) = userService.findById(userID)
  private fun findOpenSpace(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()
  private fun findTalk(id: Long) = talkRepository.findByIdOrNull(id) ?: throw TalkNotFoundException()
  private fun findRoom(id: Long) = roomRepository.findByIdOrNull(id) ?: throw RoomNotFoundException()

  fun scheduleTalk(talkID: Long, roomID: Long, hour: Int): OpenSpace {
    val os = findTalk(talkID).schedule(hour, findRoom(roomID))
    scheduleSocket.sendFor(os)
    return os
  }

  fun nextTalk(userID: Long, osID: Long): OpenSpace {
    val os = findOpenSpace(osID).nextTalk(findUser(userID))
    queueSocket.sendFor(os)
    return os
  }
}
