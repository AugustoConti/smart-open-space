package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.persistence.RoomRepository
import com.sos.smartopenspace.persistence.TalkRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

class OpenSpaceNotFoundException : RuntimeException("OpenSpace no encontrado")
class TalkNotFoundException : RuntimeException("Charla no encontrada")
class RoomNotFoundException : RuntimeException("Sala no encontrada")

@Service
@Transactional
class OpenSpaceService(
  private val openSpaceRepository: OpenSpaceRepository,
  private val talkRepository: TalkRepository,
  private val roomRepository: RoomRepository,
  private val userService: UserService
) {
  fun create(openSpace: OpenSpace) = openSpaceRepository.save(openSpace)

  fun findAllByUser(userID: Long) = userService.findById(userID).openSpaces.toList()

  fun findById(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()

  fun createTalk(userID: Long, osID: Long, talk: Talk) {
    findById(osID).addTalk(talk)
    userService.findById(userID).addTalk(talk)
  }

  fun findTalks(userID: Long, osID: Long) = talkRepository.findAllBySpeakerIdAndOpenSpaceId(userID, osID)

  private fun findTalk(id: Long) = talkRepository.findByIdOrNull(id) ?: throw TalkNotFoundException()

  private fun findRoom(id: Long) = roomRepository.findByIdOrNull(id) ?: throw RoomNotFoundException()

  fun scheduleTalk(talkID: Long, roomID: Long, hour: Int) =
    findTalk(talkID).schedule(hour, findRoom(roomID))
}
