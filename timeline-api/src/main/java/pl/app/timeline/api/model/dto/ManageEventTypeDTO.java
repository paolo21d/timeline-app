package pl.app.timeline.api.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record ManageEventTypeDTO(
        @NotBlank(message = "name is required") @Size(min = 6, message = "name min length is 6") String name,
        @NotBlank(message = "colour is required") String colour) {
}
