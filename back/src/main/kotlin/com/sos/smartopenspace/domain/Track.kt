package com.sos.smartopenspace.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.sos.smartopenspace.Validators.HexColor
import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

@Entity
data class Track(
    @field:NotEmpty
    val name: String,

    @field:Size(max=500)
    val description: String = "",

    @field:HexColor
    val color: String,
    @Id
    @GeneratedValue
    var id: Long = 0
) {
    @JsonIgnore
    @OneToMany(mappedBy = "track", cascade = [CascadeType.ALL])
    val talks: MutableSet<Talk> = mutableSetOf()
}