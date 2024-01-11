import { Observable, ReplaySubject, filter, map } from "rxjs";
import { Injectable } from "@nestjs/common";
import { Fire } from "src/fire/fire.entity";

export const CREATED = "created";
export const UPDATED = "updated";
export const DELETED = "deleted";
export type EventType = typeof CREATED | typeof UPDATED | typeof DELETED;

type FireCreatedEvent = {
  type: typeof CREATED;
  data: Fire;
};

type FireUpdateData = {
  id: number;
  intensity: number;
};
type FireUpdateEvent = {
  type: typeof UPDATED;
  data: FireUpdateData;
};

type FireDeletedData = {
  id: number;
};
type FireDeletedEvent = {
  type: typeof DELETED;
  data: FireDeletedData;
};

export type FireEvent = FireCreatedEvent | FireUpdateEvent | FireDeletedEvent;

@Injectable()
export class EventService {
  private readonly $events = new ReplaySubject<FireEvent>();

  private constructor(fires: FireEvent[]) {
    fires.forEach((event) => this.$events.next(event));
  }

  static init(): EventService {
    return new EventService([]);
  }

  inLive(): Observable<FireEvent> {
    return this.$events.asObservable();
  }

  listen<T extends FireEvent["type"]>(
    domain: T,
  ): Observable<Extract<FireEvent, { type: T }>> {
    return filterEvents(domain, this.$events);
  }

  publish(event: FireEvent): void {
    this.$events.next(event);
  }

  get firesCreated(): Observable<Fire> {
    return this.listen(CREATED).pipe(map(({ data }) => data));
  }

  get firesUpdated(): Observable<FireUpdateData> {
    return this.listen(UPDATED).pipe(map(({ data }) => data));
  }

  get firesDeleted(): Observable<FireDeletedData> {
    return this.listen(DELETED).pipe(map(({ data }) => data));
  }
}

export function filterEvents<T extends FireEvent["type"]>(
  type: T,
  $domainEvent: Observable<FireEvent>,
): Observable<Extract<FireEvent, { type: T }>> {
  return $domainEvent.pipe(
    filter(
      (event): event is Extract<FireEvent, { type: T }> => event.type === type,
    ),
  );
}
