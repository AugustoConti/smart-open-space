package com.sos.smartopenspace.domain

import java.net.URL
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.NotEmpty

@Entity
class Document(
  @Id
  @GeneratedValue
  val id: Long = 0,

  @field:NotEmpty()
  var name: String,

  @Column(columnDefinition="VarChar")
  var link: URL? = null
)