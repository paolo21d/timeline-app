package pl.app.timeline.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.app.timeline.api.model.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
