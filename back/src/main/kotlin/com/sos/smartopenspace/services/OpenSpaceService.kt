package com.sos.smartopenspace.services

import com.sos.smartopenspace.domain.*
import com.sos.smartopenspace.helpers.CreateTalkDTO
import com.sos.smartopenspace.helpers.OpenSpaceDTO
import com.sos.smartopenspace.persistence.*
import com.sos.smartopenspace.websockets.QueueSocket
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class OpenSpaceService(
  private val openSpaceRepository: OpenSpaceRepository,
  private val talkRepository: TalkRepository,
  private val trackRepository: TrackRepository,
  private val userService: UserService,
  private val queueSocket: QueueSocket,
  private val updatableItemCollectionService: UpdatableItemCollectionService
) {
  private fun findUser(userID: Long) = userService.findById(userID)

  fun create(userID: Long, openSpaceDTO: OpenSpaceDTO): OpenSpace {
    val openSpace = OpenSpace(
      name = openSpaceDTO.name,
      rooms = openSpaceDTO.rooms.toMutableSet(),
      slots = openSpaceDTO.slots.toMutableSet(),
      description = openSpaceDTO.description,
      tracks = openSpaceDTO.tracks.toMutableSet()
    )
    findUser(userID).addOpenSpace(openSpace)
    return openSpaceRepository.save(openSpace)
  }

  fun update(userID: Long, openSpaceID: Long, openSpaceDTO: OpenSpaceDTO): OpenSpace? {
    val openSpace = findById(openSpaceID)
    val user = findUser(userID)

    openSpace.updateRooms(
      updatableItemCollectionService.getNewItems(openSpaceDTO.rooms),
      updatableItemCollectionService.getDeletedItems(openSpaceDTO.rooms, openSpace.rooms)
    )
    openSpace.updateSlots(
      updatableItemCollectionService.getNewItems(openSpaceDTO.slots),
      updatableItemCollectionService.getDeletedItems(openSpaceDTO.slots, openSpace.slots)
    )
    openSpace.updateTracks(
      updatableItemCollectionService.getNewItems(openSpaceDTO.tracks),
      updatableItemCollectionService.getDeletedItems(openSpaceDTO.tracks, openSpace.tracks)
    )
    openSpace.removeInvalidAssignedSlots()

    openSpace.update(
      user,
      name = openSpaceDTO.name,
      description = openSpaceDTO.description
    )

    return openSpace
  }

  fun delete(userID: Long, openSpaceID: Long): Long {
    val user = findUser(userID)
    val openSpace = findById(openSpaceID)

    user.checkOwnershipOf(openSpace)

    openSpaceRepository.delete(openSpace)

    return openSpace.id
  }

  @Transactional(readOnly = true)
  fun findAllByUser(userID: Long) = openSpaceRepository.findAllByOrganizerId(userID)

  @Transactional(readOnly = true)
  fun findById(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()

  @Transactional(readOnly = true)
  fun findTrackById(id: Long) = trackRepository.findByIdOrNull(id) ?: throw TrackNotFoundException()

  private fun findByTalk(talkID: Long) = openSpaceRepository.findFirstOpenSpaceByTalkId(talkID)
  private fun findTalk(id: Long) = talkRepository.findByIdOrNull(id) ?: throw TalkNotFoundException()

  @Transactional(readOnly = true)
  fun findTalks(id: Long) = talkRepository.findAllByOpenSpaceIdOrderedByVotes(id).mapNotNull { it }

  fun createTalk(userID: Long, osID: Long, createTalkDTO: CreateTalkDTO): Talk {
    val user = findUser(userID)
    val talk = createTalkFrom(createTalkDTO, user=user)
    findById(osID).addTalk(talk)
    return talk
  }

  @Transactional(readOnly = true)
  fun findTalksOfUserInOpenSpace(userID: Long, openSpaceId: Long): List<Talk> {
    val openSpace = findById(openSpaceId)
    val user = findUser(userID)
    return openSpace.getUserTalks(user)
  }

  @Transactional(readOnly = true)
  fun findAssignedSlotsById(id: Long) = findById(id).assignedSlots.toList()


  fun activateQueue(userID: Long, osID: Long) =
    findById(osID).activeQueue(findUser(userID))

  fun finishQueue(userID: Long, osID: Long) =
    findById(osID).finishQueuing(findUser(userID))

  fun enqueueTalk(userID: Long, talkID: Long): OpenSpace {
    val talk = findTalk(talkID)
    val openSpace = findByTalk(talkID)
    checkPermissions(talk, userID, openSpace)
    openSpace.enqueueTalk(talk)
    queueSocket.sendFor(openSpace)
    return openSpace
  }

    private fun checkPermissions(
        talk: Talk,
        userID: Long,
        openSpace: OpenSpace
    ) {
        (!userIsSpeakerOf(talk, userID) && userIsOrganizerOf(openSpace, userID)) && throw TalkNotFoundException()
    }

    private fun userIsOrganizerOf(openSpace: OpenSpace, userID: Long) =
        openSpace.organizer.id != userID

    private fun userIsSpeakerOf(talk: Talk, userID: Long) = talk.speaker.id == userID


  fun toggleCallForPapers(openSpaceId: Long, userID: Long): OpenSpace {
    val openSpace = findById(openSpaceId)
    val user = findUser(userID)
    openSpace.toggleCallForPapers(user)
    return openSpace
  }

  private fun createTalkFrom(createTalkDTO: CreateTalkDTO, user: User): Talk {
    val track: Track? = findTrack(createTalkDTO.trackId)
    return Talk(
      name = createTalkDTO.name,
      description = createTalkDTO.description,
      meetingLink = createTalkDTO.meetingLink,
      track = track,
      speaker = user,
      documents = createTalkDTO.documents.toMutableSet()
    )
  }

  private fun findTrack(trackId: Long?): Track? {
    val track: Track? = trackId?.let {
      findTrackById(it)
    }
    return track
  }

  @Transactional
  fun deleteTalk(talkID: Long, openSpaceID: Long, userID: Long): Talk {
    val openSpace = findById(openSpaceID)
    val user = findUser(userID)
    val talk = findTalk(talkID)
    user.checkOwnershipOf(talk)

    openSpace.removeTalk(talk)
    talkRepository.delete(talk)
    return talk
  }

}
