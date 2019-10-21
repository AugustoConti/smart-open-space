package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.persistence.TalkRepository
import com.sos.smartopenspace.webservice.QueueHandler
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
  private val userService: UserService,
  private val queueHandler: QueueHandler
) {
  private fun findUser(userID: Long) = userService.findById(userID)

  fun create(userID: Long, openSpace: OpenSpace): OpenSpace {
    openSpace.organizer = findUser(userID)
    return openSpaceRepository.save(openSpace)
  }

  @Transactional(readOnly = true)
  fun findAllByUser(userID: Long) = findUser(userID).openSpaces.toList()

  @Transactional(readOnly = true)
  fun findById(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()

  fun createTalk(userID: Long, osID: Long, talk: Talk): Talk {
    findById(osID).addTalk(talk)
    findUser(userID).addTalk(talk)
    return talk
  }

  @Transactional(readOnly = true)
  fun findTalksByUser(userID: Long, osID: Long) = talkRepository.findAllBySpeakerIdAndOpenSpaceId(userID, osID)

  @Transactional(readOnly = true)
  fun findSlotsById(id: Long) = findById(id).slots.toList()

  @Transactional(readOnly = true)
  fun findTalks(id: Long) = findById(id).talks.toList()

  fun activateQueue(userID: Long, osID: Long) =
    findById(osID).activeQueue(findUser(userID))

  private fun findTalk(id: Long) = talkRepository.findByIdOrNull(id) ?: throw TalkNotFoundException()

  fun enqueueTalk(userID: Long, talkID: Long): OpenSpace {
    val talk = findTalk(talkID)
    talk.speaker.id != userID && throw TalkNotFoundException()
    val os = talk.enqueue()
    queueHandler.sendFor(os)
    return os
  }
}
