package pl.app.timeline.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.app.timeline.api.model.excpetion.EventTypeDeleteException;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "event_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventType {
    @Id
    @SequenceGenerator(name = "event_type_seq", sequenceName = "event_type_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_type_seq")
    private Long typeId;
    @Column(unique = true)
    private String name;
    private String colour;
    @JsonIgnore
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "eventType")
    List<Event> events;

    @PreRemove
    public void canRemoveEventType() {
        if (events != null && !events.isEmpty()) {
            throw new EventTypeDeleteException(typeId);
        }
    }
}
