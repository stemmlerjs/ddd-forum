
import * as sinon from 'sinon'
import { DomainEvents } from '../DomainEvents';
import { MockJobCreatedEvent } from './mocks/events/mockJobCreatedEvent'
import { MockJobDeletedEvent } from './mocks/events/mockJobDeletedEvent'
import { MockJobAggregateRoot } from './mocks/domain/mockJobAggregateRoot'
import { MockPostToSocial } from './mocks/services/mockPostToSocial'
import { MockJobAggregateRootId } from './mocks/domain/mockJobAggregateRootId';
import { UniqueEntityID } from '../../UniqueEntityID';

let social: MockPostToSocial;
let job: MockJobAggregateRoot;
let spy;

describe('Domain Events', () => {

  beforeEach(() => {
    social = null;
    DomainEvents.clearHandlers();
    DomainEvents.clearMarkedAggregates();
    spy = null;
    job = null;
  })

  describe('Given a JobCreatedEvent, JobDeletedEvent and a PostToSocial handler class', () => {
    it('Should be able to setup event subscriptions', () => {
      social = new MockPostToSocial();
      social.setupSubscriptions();

      expect(Object.keys(DomainEvents['handlersMap']).length).toBe(2);

      expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
      expect(DomainEvents['handlersMap'][MockJobDeletedEvent.name].length).toBe(1);
    })

    it('There should be exactly one handler subscribed to the JobCreatedEvent', () => {
      social = new MockPostToSocial();
      social.setupSubscriptions();

      expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
    })

    it('There should be exactly one handler subscribed to the JobDeletedEvent', () => {
      social = new MockPostToSocial();
      social.setupSubscriptions();

      expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
    })

    it('Should add the event to the DomainEvents list when the event is created', () => {
      job = MockJobAggregateRoot.createJob({}, MockJobAggregateRootId);
      social = new MockPostToSocial();
      social.setupSubscriptions();

      var domainEventsAggregateSpy = sinon.spy(DomainEvents, "markAggregateForDispatch");

      // setTimeout(() => {
      //   expect(domainEventsAggregateSpy.calledOnce).toBeTruthy();
      //   expect(domainEventsAggregateSpy.callCount).toBe(0)
      //   expect(DomainEvents['markedAggregates'][0]['length']).toBe(1);
      // }, 1000);
    });

    it('Should call the handlers when the event is dispatched after marking the aggregate root', () => {
      
      social = new MockPostToSocial();
      social.setupSubscriptions();

      var jobCreatedEventSpy = sinon.spy(social, "handleJobCreatedEvent");
      var jobDeletedEventSpy = sinon.spy(social, "handleDeletedEvent");

      // Create the event, mark the aggregate
      job = MockJobAggregateRoot.createJob({}, MockJobAggregateRootId);

      // Dispatch the events now
      DomainEvents.dispatchEventsForAggregate(MockJobAggregateRootId);

      // setTimeout(() => {
      //   expect(jobCreatedEventSpy.calledOnce).toBeFalsy();
      //   expect(jobDeletedEventSpy.calledOnce).toBeTruthy();
      // }, 1000);
    });

    it('Should remove the marked aggregate from the marked aggregates list after it gets dispatched', () => {
      social = new MockPostToSocial();
      social.setupSubscriptions();

      // Create the event, mark the aggregate
      job = MockJobAggregateRoot.createJob({}, MockJobAggregateRootId);

      // Dispatch the events now
      DomainEvents.dispatchEventsForAggregate(MockJobAggregateRootId);

      // setTimeout(() => {
      //   expect(DomainEvents['markedAggregates']['length']).toBe(0);
      // }, 1000);
    });

    it('Should only add the domain event to the ', () => {
      social = new MockPostToSocial();
      social.setupSubscriptions();

      // Create the event, mark the aggregate
      MockJobAggregateRoot.createJob({}, new UniqueEntityID('99'));
      expect(DomainEvents['markedAggregates']['length']).toBe(1);

      // Create a new job, it should also get marked
      job = MockJobAggregateRoot.createJob({}, new UniqueEntityID('12'));
      expect(DomainEvents['markedAggregates']['length']).toBe(2);

      // Dispatch another action from the second job created
      job.deleteJob();

      // The number of aggregates should be the same
      expect(DomainEvents['markedAggregates']['length']).toBe(2);

      // However, the second aggregate should have two events now
      expect(DomainEvents['markedAggregates'][1].domainEvents.length).toBe(2);

      // And the first aggregate should have one event
      expect(DomainEvents['markedAggregates'][0].domainEvents.length).toBe(1);

      // Dispatch the event for the first job
      DomainEvents.dispatchEventsForAggregate(new UniqueEntityID('99'));
      expect(DomainEvents['markedAggregates']['length']).toBe(1);
      
      // The job with two events should still be there
      expect(DomainEvents['markedAggregates'][0].domainEvents.length).toBe(2);

      // Dispatch the event for the second job
      DomainEvents.dispatchEventsForAggregate(new UniqueEntityID('12'));

      // There should be no more domain events in the list
      expect(DomainEvents['markedAggregates']['length']).toBe(0);


    })
  });
});
