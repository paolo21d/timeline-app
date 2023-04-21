package pl.app.timeline.api.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @SequenceGenerator(name = "event_seq", sequenceName = "event_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_seq")
    private Long eventId;
    private String name;
    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private EventType eventType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String shortDescription;
    private String longDescription;
    @Column(name = "image_url")
    private String imageURL;
    private Instant createDateTime;
}
