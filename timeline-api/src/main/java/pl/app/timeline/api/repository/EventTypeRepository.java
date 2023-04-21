package pl.app.timeline.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.app.timeline.api.model.entity.EventType;

import java.util.Optional;

@Repository
public interface EventTypeRepository extends JpaRepository<EventType, Long> {
    Optional<EventType> findByName(String eventTypeName);
}
