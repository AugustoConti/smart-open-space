package com.sos.smartopenspace.services

import com.sos.smartopenspace.domain.NotFoundException
import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Talk
import com.sos.smartopenspace.domain.Track
import com.sos.smartopenspace.helpers.CreateTalkDTO
import com.sos.smartopenspace.persistence.*
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
        private val trackRepository: TrackRepository,
        private val userService: UserService,
        private val scheduleSocket: ScheduleSocket,
        private val queueSocket: QueueSocket,
        private val slotRepository: SlotRepository
) {
  private fun findUser(userID: Long) = userService.findById(userID)
  private fun findOpenSpace(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()
  private fun findTalk(id: Long) = talkRepository.findByIdOrNull(id) ?: throw TalkNotFoundException()
  private fun findRoom(id: Long) = roomRepository.findByIdOrNull(id) ?: throw RoomNotFoundException()
  private fun findSlot(slotID: Long) = slotRepository.findByIdOrNull(slotID) ?: throw NotFoundException("No se encontro el slot con el id ${slotID}")

  fun scheduleTalk(talkID: Long, userID: Long, slotID: Long, roomID: Long): OpenSpace {
    val openSpace = findTalk(talkID).schedule(findUser(userID), findSlot(slotID), findRoom(roomID))
    scheduleSocket.sendFor(openSpace)
    return openSpace
  }


  fun exchangeTalk(talkID: Long, roomID: Long, slotID: Long): OpenSpace {
    val openSpace = findTalk(talkID).exchange(findRoom(roomID), findSlot(slotID))
    scheduleSocket.sendFor(openSpace)
    return openSpace
  }

  fun nextTalk(userID: Long, osID: Long): OpenSpace {
    val openSpace = findOpenSpace(osID).nextTalk(findUser(userID))
    queueSocket.sendFor(openSpace)
    return openSpace
  }

  fun voteTalk(talkID: Long, userID: Long): Talk {
    val aTalk = findTalk(talkID)
    val aUser = findUser(userID)
    aTalk.addVoteBy(aUser)
    return aTalk
  }

  fun updateTalk(talkId: Long, userId: Long, createTalkDTO: CreateTalkDTO): Talk {
    val talk = findTalk(talkId)
    val track: Track? = findTrack(createTalkDTO.trackId)
    val user = findUser(userId)

    user.checkOwnershipOf(talk)
    talk.update(
      name = createTalkDTO.name,
      description = createTalkDTO.description,
      meetingLink = createTalkDTO.meetingLink,
      track = track
    )

    return talk
  }
  
  fun unvoteTalk(talkID: Long, userID: Long): Talk {
    val talk = findTalk(talkID)
    val user = findUser(userID)

    talk.removeVoteBy(user)

    return talk
  }

  private fun findTrack(trackId: Long?): Track? {
    val track: Track? = trackId?.let {
      findTrackById(it)
    }
    return track
  }

  @Transactional(readOnly = true)
  fun findTrackById(id: Long) = trackRepository.findByIdOrNull(id) ?: throw TrackNotFoundException()


    fun getTalk(talkID: Long): Talk {
      return findTalk(talkID)
    }
}
