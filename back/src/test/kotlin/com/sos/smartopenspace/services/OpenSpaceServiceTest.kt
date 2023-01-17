package com.sos.smartopenspace.services

import com.sos.smartopenspace.helpers.OpenSpaceDTO
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.persistence.TalkRepository
import com.sos.smartopenspace.persistence.TrackRepository
import com.sos.smartopenspace.websockets.QueueSocket
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional

@ActiveProfiles("test")
@Transactional
class OpenSpaceServiceTest {

    @Test
    fun `returns null if the open space is not found`() {
        val openSpaceService = OpenSpaceService(mock(OpenSpaceRepository::class.java), mock(TalkRepository::class.java), mock(TrackRepository::class.java), mock(UserService::class.java), mock(QueueSocket::class.java))

        val result = openSpaceService.update(234, OpenSpaceDTO("a name", emptySet(), emptySet(), emptySet()))

        Assertions.assertNull(result)
    }
}