package com.sos.smartopenspace.helpers
import javax.validation.constraints.*

class CreateReviewDTO(
  @field:NotNull
  @field:Max(5)
  @field:Min(1)
  val grade: Int,

  val comment: String
)