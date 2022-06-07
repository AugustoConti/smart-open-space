package com.sos.smartopenspace.controllers

import com.jayway.jsonpath.JsonPath
import com.sos.smartopenspace.aUser
import com.sos.smartopenspace.anOpenSpace
import com.sos.smartopenspace.anOpenSpaceWith
import com.sos.smartopenspace.domain.*
import com.sos.smartopenspace.generateTalkBody
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.persistence.RoomRepository
import com.sos.smartopenspace.persistence.TalkRepository
import com.sos.smartopenspace.persistence.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import java.time.LocalTime

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TalkControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc


    @Autowired
    lateinit var userRepository: UserRepository
    @Autowired
    lateinit var openSpaceRepository: OpenSpaceRepository
    @Autowired
    lateinit var talkRepository: TalkRepository
    @Autowired
    lateinit var roomRepository: RoomRepository

    @Test
    fun `schedule a talk returns an ok status response`() {
        val organizer = anySavedUser()
        val talk = anySavedTalk()
        val room = anySavedRoom()
        openSpaceRepository.save(anOpenSpaceWith(talk, organizer, room))
        val time = LocalTime.parse("09:00")

        mockMvc.perform(
                MockMvcRequestBuilders.put("/talk/schedule/${organizer.id}/${talk.id}/${room.id}/${time}")
        ).andExpect(MockMvcResultMatchers.status().isOk)

    }

    @Test
    fun `when a talk cannot be scheduled it should return a bad request response`() {
        val organizer = anySavedUser()
        val talk = anySavedTalk()
        val speaker = aSavedUserWithTalk(talk)
        val room = anySavedRoom()
        val time = LocalTime.parse("09:00")
        openSpaceRepository.save(anOpenSpaceWith(talk, organizer, room))


        mockMvc.perform(
                MockMvcRequestBuilders.put("/talk/schedule/${speaker.id}/${talk.id}/${room.id}/${time}")
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `Asking for an specific talk returns an ok status`() {
        val organizer = anySavedUser()
        val talk = anySavedTalk()
        userRepository.save(anyUser(talk))
        val room = anySavedRoom()
        openSpaceRepository.save(anyOpenSpaceWith(talk, organizer, room))

        mockMvc.perform(
            MockMvcRequestBuilders.get("/talk/${talk.id}")
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(talk.id))
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(talk.name))
    }

    @Test
    fun `Asking for a talk that not exist returns a bad request`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/talk/77777")
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }


    @Test
    fun `can update a talk correctly`() {
        val user = userRepository.save(aUser())
        val anOpenSpace = anOpenSpace()
        user.addOpenSpace(anOpenSpace)
        anOpenSpace.toggleCallForPapers(user)
        openSpaceRepository.save(anOpenSpace)

        val aTalk = Talk("a talk")
        anOpenSpace.addTalk(aTalk)
        user.addTalk(aTalk)
        talkRepository.save(aTalk)

        val changedDescription = "a different description"
        val entityResponse = mockMvc.perform(
            MockMvcRequestBuilders.put("/talk/${aTalk.id}/user/${user.id}")
                .contentType("application/json")
                .content(generateTalkBody(description = changedDescription))
        ).andExpect(MockMvcResultMatchers.status().isOk).andReturn().response

        val talkId = JsonPath.read<Int>(entityResponse.contentAsString, "$.id")

        mockMvc.perform(
            MockMvcRequestBuilders.get("/openSpace/talks/${anOpenSpace.id}")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(talkId))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value(changedDescription))
    }

    @Test
    fun `updating an inexistent talk returns a bad request status`() {
        val user = userRepository.save(aUser())
        val anOpenSpace = anOpenSpace()
        user.addOpenSpace(anOpenSpace)
        anOpenSpace.toggleCallForPapers(user)
        openSpaceRepository.save(anOpenSpace)
        val inexistentTalkId = 789

        mockMvc.perform(
            MockMvcRequestBuilders.put("/talk/${inexistentTalkId}/user/${user.id}")
                .contentType("application/json")
                .content(generateTalkBody())
        ).andExpect(MockMvcResultMatchers.status().is4xxClientError)
    }
    
    fun `a talk voted by user return an ok status response`() {
        val aUser = anySavedUser()
        val talk = anySavedTalk()
        aUser.addTalk(talk)

        mockMvc.perform(
                MockMvcRequestBuilders.put("/talk/${talk.id}/user/${aUser.id}/vote")
        ).andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.votes").value(1))
    }

    @Test
    fun `a talk unvoted by a user returns an ok status response`() {
        val aUser = anySavedUser()
        val talk = anySavedTalk()
        aUser.addTalk(talk)
        talk.beingVoted(aUser)
        talkRepository.save(talk)

        mockMvc.perform(
            MockMvcRequestBuilders.put("/talk/${talk.id}/user/${aUser.id}/unvote")
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.votes").value(0))
    }

    private fun anySavedRoom() = roomRepository.save(Room("Sala"))

    private fun anySavedTalk() = talkRepository.save(Talk("Charla"))

    private fun anySavedUser() = userRepository.save(aUser())

    private fun aSavedUserWithTalk(talk: Talk) =
            userRepository.save(aUser(mutableSetOf(), mutableSetOf(talk)))

}